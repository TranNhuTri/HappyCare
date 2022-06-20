import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Heading } from 'native-base';
import { userService } from '../../../redux/services';
// import { socketService } from '../../../api/services';
import { SymptomsKeyword } from './SymptomsKeyword';

export const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.user);

  useEffect(() => {
    const setUserInfoById = async () => {
      dispatch(userService.initUserInfo());
    };
    setUserInfoById();
  }, [dispatch]);

  // const getUsersInAppHandler = () => {
  //   socketService.emitGetUserInApp();
  // };

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Chào {profile.fullname}
      </Heading>
      <SymptomsKeyword navigation={navigation} />
    </Box>
  );
};
