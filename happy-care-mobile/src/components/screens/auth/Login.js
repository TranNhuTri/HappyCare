import { omit } from 'lodash';
import * as validator from 'validator';
import React, { useState, useEffect } from 'react';
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Image,
  Text,
  Icon,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions, authActions } from '../../../redux/actions';
import { authService } from '../../../redux/services';
import { HCIcon } from '../../../assets/images';
import { AppName, ScreenName } from '../../../api/common';
import { SecureStoreHelper, JwtHelper } from '../../../api/helper';
import { socketService } from '../../../api/services';

export const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const { loginCredentials, isLoggedIn } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function checkAuthentication() {
      const token = await SecureStoreHelper.getAuthBearerToken();
      if (!token || JwtHelper.isTokenExpired(token)) {
        dispatch(uiActions.navigateScreen(ScreenName.login));
        setIsLoading(false);
        return;
      }
      if (token) {
        socketService.emitJoinApp({ token });
        dispatch(authActions.setLoggedInStatus(!!token));
        dispatch(uiActions.navigateScreen(ScreenName.bottomTab));
        navigation.navigate(ScreenName.bottomTab);
      } else {
        setIsLoading(false);
      }
    }
    checkAuthentication();
  }, [dispatch, navigation]);

  useEffect(() => {
    setIsLoading(false);
  }, [isLoggedIn]);

  const onFormChangeHandler = (type, value) => {
    dispatch(
      authActions.setLoginCredentials({
        ...loginCredentials,
        [type]: value,
      })
    );
    setErrors(omit(errors, [type]));
  };

  const validateFormHandler = () => {
    const { email: emailInput, password: passwordInput } = loginCredentials;

    const email = emailInput && emailInput.trim();
    const password = passwordInput && passwordInput.trim();

    if (!email || (email && !validator.isEmail(email))) {
      setErrors({
        ...errors,
        email: 'Email is invalid',
      });
      return false;
    }

    if (!password) {
      setErrors({
        ...errors,
        password: 'Password is invalid',
      });
      return false;
    }

    return true;
  };

  const onSubmitHandler = async () => {
    const isFormValid = validateFormHandler();
    if (isFormValid) {
      const isLoggedSuccess = await authService.login(loginCredentials);
      if (isLoggedSuccess) {
        dispatch(uiActions.navigateScreen(ScreenName.bottomTab));
        navigation.navigate(ScreenName.bottomTab);
      }
    }
  };

  const onRegisterHandler = () => {
    dispatch(uiActions.navigateScreen(ScreenName.register));
    navigation.navigate(ScreenName.register);
  };

  return (
    <VStack bg="primary.100" alignItems="center" w="100%" h="100%" safeArea>
      {isLoading && (
        <Center mb="10" w="100%" h="100%">
          <Image mb="2" size="md" source={HCIcon.hc_icon_health_care} alt="Healthcare logo" />
        </Center>
      )}
      {!isLoading && (
        <Box p="2" mt="8" w="90%" maxW="290">
          <Center mb="10">
            <Image mb="2" size="md" source={HCIcon.hc_icon_health_care} alt="Healthcare logo" />
            <Heading
              mb="4"
              size="xl"
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}
              fontWeight={600}
            >
              {AppName}
            </Heading>
            <Heading
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="medium"
              size="xs"
            >
              {'Chào mừng bạn đến với '}
              <Heading
                size="xs"
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50',
                }}
                fontWeight={500}
              >
                {AppName}
              </Heading>
            </Heading>
          </Center>
          <VStack space={3}>
            <FormControl isRequired>
              <Input
                _light={{
                  bg: 'cyan.50',
                }}
                _dark={{
                  bg: 'coolGray.800',
                }}
                _focus={{
                  bg: 'muted.50',
                }}
                variant="rounded"
                placeholder="Email"
                value={loginCredentials.email}
                InputLeftElement={
                  <Icon as={<Ionicons name="person" />} size={5} ml="4" color="muted.400" />
                }
                onChangeText={(value) => onFormChangeHandler('email', value)}
              />
              {errors && errors.email && (
                <FormControl.HelperText
                  ml="1"
                  _text={{
                    fontSize: 'xs',
                    color: 'red.500',
                  }}
                >
                  {errors && errors.email}
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isRequired>
              <Input
                _light={{
                  bg: 'cyan.50',
                }}
                _dark={{
                  bg: 'coolGray.800',
                }}
                _focus={{
                  bg: 'muted.50',
                }}
                variant="rounded"
                type="password"
                placeholder="Password"
                value={loginCredentials.password}
                InputLeftElement={
                  <Icon as={<Ionicons name="key" />} size={5} ml="4" color="muted.400" />
                }
                onChangeText={(value) => onFormChangeHandler('password', value)}
              />
              {errors && errors.password && (
                <FormControl.HelperText
                  ml="1"
                  _text={{
                    fontSize: 'xs',
                    color: 'red.500',
                  }}
                >
                  {errors && errors.password}
                </FormControl.HelperText>
              )}
            </FormControl>
            <Button mt="2" borderRadius="3xl" colorScheme="blue" onPress={onSubmitHandler}>
              <Text bold fontSize="md" color="primary.100">
                Đăng nhập
              </Text>
            </Button>
            <Text>
              {'Chưa có tài khoản? '}
              <Text fontSize="md" fontWeight={600} color="green.600" onPress={onRegisterHandler}>
                Đăng ký
              </Text>
              {' ngay 🥰'}
            </Text>
          </VStack>
        </Box>
      )}
    </VStack>
  );
};
