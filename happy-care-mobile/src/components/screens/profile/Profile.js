import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  VStack,
  HStack,
  Box,
  Center,
  Heading,
  Button,
  Avatar,
  IconButton,
  Icon,
} from 'native-base';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { uiActions } from '../../../redux/actions';
import { authService } from '../../../redux/services';
import { ScreenName, Role } from '../../../api/common';

export const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { role, email, specializations, profile } = useSelector((state) => state.user);

  const onUpdateProfileHandler = () => {
    dispatch(uiActions.navigateScreen(ScreenName.updateProfile));
    navigation.navigate(ScreenName.updateProfile);
  };

  const onLogoutHandler = async () => {
    const isLogoutSuccess = await authService.logout();
    if (isLogoutSuccess) {
      dispatch(uiActions.navigateScreen(ScreenName.login));
      navigation.navigate(ScreenName.login);
    }
  };
  return (
    <Box>
      <VStack w="100%" h="100%">
        <Box w="100%" h="30%" bgColor="blue.700" roundedBottomRight="2xl" roundedBottomLeft="2xl">
          <Center h="100%">
            <Heading my="2" size="md" color="amber.100" fontWeight={600}>
              {role === Role.doctor ? 'Bác sĩ' : 'Thành viên'}
            </Heading>
            <Avatar
              bg="teal.500"
              alignSelf="center"
              size="2xl"
              p="5px"
              source={{
                uri: profile.avatar,
              }}
            >
              Avatar
            </Avatar>
            <Heading mt="2" size="xl" color="amber.100" fontWeight={600}>
              {profile.fullname}
            </Heading>
          </Center>
          <IconButton
            icon={<Icon as={FontAwesome} name="edit" />}
            position="absolute"
            top="2%"
            right="2%"
            borderRadius="full"
            onPress={onUpdateProfileHandler}
            _icon={{
              color: 'orange.50',
              size: 'md',
            }}
            _pressed={{
              bg: 'blue.200:alpha.20',
              _ios: {
                _icon: {
                  size: '2xl',
                },
              },
            }}
            _ios={{
              _icon: {
                size: '2xl',
              },
            }}
          />
        </Box>
        <Box w="100%" h="70%">
          {role === Role.doctor && (
            <VStack w="70%" h="70%" alignSelf="center" alignItems="flex-start" mt={10} space={5}>
              <HStack justifyContent="center" alignItems="center" space={8}>
                <Icon
                  as={FontAwesome}
                  name="graduation-cap"
                  minWidth="35px"
                  size="xl"
                  color="darkBlue.500"
                />
                <VStack alignContent="center">
                  <Text bold fontSize="16px">
                    Chuyên ngành
                  </Text>
                  <Text>{specializations.join(', ') || 'Chưa có'}</Text>
                </VStack>
              </HStack>
              <HStack justifyContent="center" alignItems="center" space={8}>
                <Icon as={Entypo} name="archive" minWidth="35px" size="xl" color="darkBlue.500" />
                <VStack alignContent="center">
                  <Text bold fontSize="16px">
                    Nơi công tác
                  </Text>
                  <Text>{profile.address || 'Chưa có'}</Text>
                </VStack>
              </HStack>
              <HStack justifyContent="center" alignItems="center" space={8}>
                <Icon as={Entypo} name="mail" minWidth="35px" size="xl" color="darkBlue.500" />
                <VStack alignContent="center">
                  <Text bold fontSize="16px">
                    Email
                  </Text>
                  <Text>{email}</Text>
                </VStack>
              </HStack>
              <HStack justifyContent="center" alignItems="center" space={8}>
                <Icon
                  as={FontAwesome}
                  name="address-card"
                  minWidth="35px"
                  size="xl"
                  color="darkBlue.500"
                />
                <VStack alignContent="center">
                  <Text bold fontSize="16px">
                    Tuổi
                  </Text>
                  <Text>{profile.age || 'Chưa có'}</Text>
                </VStack>
              </HStack>
              <HStack justifyContent="center" alignItems="center" space={8}>
                <Icon
                  as={FontAwesome}
                  name="phone"
                  minWidth="35px"
                  size="xl"
                  color="darkBlue.500"
                />
                <VStack alignContent="center">
                  <Text bold fontSize="16px">
                    Điện thoại
                  </Text>
                  <Text>{profile.phone || 'Chưa có'}</Text>
                </VStack>
              </HStack>
            </VStack>
          )}
          {role === Role.member && (
            <VStack w="70%" h="70%" alignSelf="center" alignItems="flex-start" mt={10} space={5}>
              <HStack justifyContent="center" alignItems="center" space={8}>
                <Icon as={Entypo} name="mail" minWidth="35px" size="xl" color="darkBlue.500" />
                <VStack alignContent="center">
                  <Text bold fontSize="16px">
                    Email
                  </Text>
                  <Text>{email}</Text>
                </VStack>
              </HStack>
              <HStack justifyContent="center" alignItems="center" space={8}>
                <Icon
                  as={FontAwesome}
                  name="address-card"
                  minWidth="35px"
                  size="xl"
                  color="darkBlue.500"
                />
                <VStack alignContent="center">
                  <Text bold fontSize="16px">
                    Tuổi
                  </Text>
                  <Text>{profile.age || 'Chưa có'}</Text>
                </VStack>
              </HStack>
              <HStack justifyContent="center" alignItems="center" space={8}>
                <Icon
                  as={FontAwesome}
                  name="phone"
                  minWidth="35px"
                  size="xl"
                  color="darkBlue.500"
                />
                <VStack alignContent="center">
                  <Text bold fontSize="16px">
                    Điện thoại
                  </Text>
                  <Text>{profile.phone || 'Chưa có'}</Text>
                </VStack>
              </HStack>
              <HStack justifyContent="center" alignItems="center" space={8}>
                <Icon
                  as={FontAwesome}
                  name="map-marker"
                  minWidth="35px"
                  size="xl"
                  color="darkBlue.500"
                />
                <VStack alignContent="center">
                  <Text bold fontSize="16px">
                    Địa chỉ
                  </Text>
                  <Text>{profile.address || 'Chưa có'}</Text>
                </VStack>
              </HStack>
            </VStack>
          )}
          <Button
            w="120px"
            size="sm"
            rounded="full"
            alignSelf="center"
            colorScheme="blue"
            onPress={onLogoutHandler}
          >
            <Text color="primary.100">Đăng xuất</Text>
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};
