import store from '../store';
import { UserUrl, Role, ScreenName } from '../../api/common';
import { SecureStoreHelper, AsyncStoreHelper } from '../../api/helper';
import { authActions, uiActions, userActions } from '../actions';
import { httpService, socketService } from '../../api/services';

class AuthService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthService();
    }

    return this.instance;
  }

  async registerNewUser(userCredentials) {
    const { email, password } = userCredentials;

    const data = {
      email,
      password,
      role: Role.member,
    };

    try {
      const url = `${UserUrl}`;
      const res = await httpService.post(url, data, false);

      if (res.success === true) {
        store.dispatch(
          uiActions.showSuccessUI({
            title: 'Register success',
            message: 'Đăng ký thành công, bạn hãy đăng nhập để sử dụng ứng dụng nhé',
          })
        );
        return true;
      }
    } catch (error) {
      store.dispatch(
        uiActions.showErrorUI({
          title: 'Error',
          message: error.message,
        })
      );
      return false;
    }
  }

  async login(userCredentials) {
    const { email, password } = userCredentials;
    const data = { email, password };
    try {
      const url = `${UserUrl}/login`;
      const res = await httpService.post(url, data, false);

      if (res.success === true) {
        const token = res.data && res.data.token;
        await SecureStoreHelper.setAuthBearerToken(token);
        socketService.emitJoinApp({ token });

        store.dispatch(uiActions.navigateScreen(ScreenName.bottomTab));
        store.dispatch(
          uiActions.showSuccessUI({
            title: 'Login success',
            message: 'Đăng nhập thành công',
            position: 'top',
          })
        );

        const user = res.data && res.data.user;
        if (user && user._id) {
          AsyncStoreHelper.setUserId(user._id);
        }
        return true;
      }
      store.dispatch(
        uiActions.showErrorUI({
          title: 'Error',
          message: res.message,
          position: 'bottom',
        })
      );
      return false;
    } catch (error) {
      store.dispatch(
        uiActions.showErrorUI({
          title: 'Error',
          message: error.message,
          position: 'bottom',
        })
      );
      return false;
    }
  }

  logout() {
    try {
      SecureStoreHelper.deleteAuthBearerToken();
      AsyncStoreHelper.removeUserId();
      socketService.emitDisconnect();

      store.dispatch(userActions.resetUserInfo());
      store.dispatch(
        authActions.setLogout({
          registerCredentials: {},
          loginCredentials: {},
          isLoggedIn: false,
        })
      );
      store.dispatch(
        uiActions.showSuccessUI({
          title: 'Logout success',
          message: 'Đăng xuất thành công',
          position: 'bottom',
        })
      );
      return true;
    } catch (error) {
      store.dispatch(
        uiActions.showErrorUI({
          title: 'Error',
          message: error.message,
          position: 'bottom',
        })
      );
      return false;
    }
  }
}

export const authService = AuthService.getInstance();
