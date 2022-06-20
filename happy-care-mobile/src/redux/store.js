import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui/ui.slice';
import socketReducer from './socket/socket.slice';
import authReducer from './auth/auth.slice';
import userReducer from './user/user.slice';
import roleReducer from './role/role.slice';
import specReducer from './specialization/specialization.slice';
import symptomsReducer from './symptoms/symptoms.slice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    socket: socketReducer,
    auth: authReducer,
    user: userReducer,
    role: roleReducer,
    spec: specReducer,
    symptoms: symptomsReducer,
  },
});

export default store;
