import { omit, get } from 'lodash';
import * as validator from 'validator';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VStack, Center, Avatar, Icon, FormControl, Input, ScrollView } from 'native-base';
import { FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import { uiActions } from '../../../redux/actions';
import { userService } from '../../../redux/services';
import { HCUpdateHeader } from '../../layout';
import { ScreenName, BottomBarHeight } from '../../../api/common';

export const UpdateProfile = ({ navigation }) => {
  const dispatch = useDispatch();

  const { email, profile } = useSelector((state) => state.user);

  const [profileForm, setProfileForm] = useState({
    fullname: `${get(profile, 'fullname', '')}`,
    age: `${get(profile, 'age', '')}`,
    phone: `${get(profile, 'phone', '')}`,
    address: `${get(profile, 'address', '')}`,
    avatar: `${get(profile, 'avatar', '')}`,
  });
  const [errors, setErrors] = useState({});

  const onBackScreenHandler = () => {
    dispatch(uiActions.navigateScreen(ScreenName.profile));
    navigation.goBack();
  };

  const onSaveHandler = () => {
    const isFormValid = validateFormHandler();
    if (isFormValid) {
      dispatch(userService.updateUserInfo(profileForm));
      dispatch(uiActions.navigateScreen(ScreenName.profile));
      navigation.goBack();
    }
  };

  const onPickAvatarHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      const { uri } = result;
      setProfileForm({ ...profileForm, avatar: uri });
    }
  };

  const onFormChangeHandler = (type, value) => {
    setProfileForm({ ...profileForm, [type]: value });
    setErrors(omit(errors, [type]));
  };

  const validateFormHandler = () => {
    const { age, phone } = profileForm;

    if (age && !validator.isInt(age, { min: 15, max: 100 })) {
      setErrors({
        ...errors,
        age: 'Tuổi phải là số một số (lớn hơn hoặc bằng 15 và nhỏ hơn hoặc bằng 100)',
      });
      return false;
    }

    if (phone && !validator.isMobilePhone(phone, 'vi-VN')) {
      setErrors({
        ...errors,
        phone: 'Số điện thoại không hợp lệ',
      });
      return false;
    }

    return true;
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <VStack w="100%" h="100%">
        <HCUpdateHeader
          headerTitle="Cập nhật thông tin"
          onBackScreenHandler={onBackScreenHandler}
          onSaveHandler={onSaveHandler}
        />
        <Center w="100%" h="25%">
          <Avatar
            bg="teal.500"
            alignSelf="center"
            size="2xl"
            p="5px"
            source={{
              uri: profileForm.avatar,
            }}
          >
            <Avatar.Badge bg="lightBlue.600" alignItems="center" justifyContent="center">
              <Icon
                as={FontAwesome}
                name="camera"
                size="xs"
                color="primary.50"
                onPress={onPickAvatarHandler}
              />
            </Avatar.Badge>
          </Avatar>
        </Center>
        <ScrollView w="70%" h="60%" alignSelf="center" mb={BottomBarHeight + 10} space={2}>
          <FormControl isDisabled>
            <FormControl.Label
              _text={{
                color: 'blue.500',
              }}
            >
              Email
            </FormControl.Label>
            <Input
              _light={{
                bg: 'muted.50',
              }}
              _dark={{
                bg: 'coolGray.800',
              }}
              _focus={{
                bg: 'cyan.50',
              }}
              borderColor="blue.600"
              borderRadius="md"
              value={email}
              InputLeftElement={
                <Icon
                  as={<Entypo name="mail" />}
                  minWidth="25px"
                  size={5}
                  ml="4"
                  color="blue.500"
                />
              }
            />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'blue.500',
              }}
            >
              Tên
            </FormControl.Label>
            <Input
              _light={{
                bg: 'muted.50',
              }}
              _dark={{
                bg: 'coolGray.800',
              }}
              _focus={{
                bg: 'cyan.50',
              }}
              borderColor="blue.600"
              borderRadius="md"
              value={profileForm.fullname}
              InputLeftElement={
                <Icon
                  as={<Ionicons name="person" />}
                  minWidth="25px"
                  size={5}
                  ml="4"
                  color="blue.500"
                />
              }
              onChangeText={(value) => onFormChangeHandler('fullname', value)}
            />
            {errors && errors.fullname && (
              <FormControl.HelperText
                ml="1"
                _text={{
                  fontSize: 'xs',
                  color: 'red.500',
                }}
              >
                {errors && errors.fullname}
              </FormControl.HelperText>
            )}
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'blue.500',
              }}
            >
              Tuổi
            </FormControl.Label>
            <Input
              _light={{
                bg: 'muted.50',
              }}
              _dark={{
                bg: 'coolGray.800',
              }}
              _focus={{
                bg: 'cyan.50',
              }}
              borderColor="blue.600"
              borderRadius="md"
              value={profileForm.age}
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="address-card" />}
                  minWidth="25px"
                  size={5}
                  ml="4"
                  color="blue.500"
                />
              }
              onChangeText={(value) => onFormChangeHandler('age', value)}
            />
            {errors && errors.age && (
              <FormControl.HelperText
                ml="1"
                _text={{
                  fontSize: 'xs',
                  color: 'red.500',
                }}
              >
                {errors && errors.age}
              </FormControl.HelperText>
            )}
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'blue.500',
              }}
            >
              Số điện thoại
            </FormControl.Label>
            <Input
              _light={{
                bg: 'muted.50',
              }}
              _dark={{
                bg: 'coolGray.800',
              }}
              _focus={{
                bg: 'cyan.50',
              }}
              borderColor="blue.600"
              borderRadius="md"
              value={profile.phone}
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="phone" />}
                  minWidth="25px"
                  size={5}
                  ml="4"
                  color="blue.500"
                />
              }
              onChangeText={(value) => onFormChangeHandler('phone', value)}
            />
            {errors && errors.phone && (
              <FormControl.HelperText
                ml="1"
                _text={{
                  fontSize: 'xs',
                  color: 'red.500',
                }}
              >
                {errors && errors.phone}
              </FormControl.HelperText>
            )}
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{
                color: 'blue.500',
              }}
            >
              Địa chỉ
            </FormControl.Label>
            <Input
              _light={{
                bg: 'muted.50',
              }}
              _dark={{
                bg: 'coolGray.800',
              }}
              _focus={{
                bg: 'cyan.50',
              }}
              borderColor="blue.600"
              borderRadius="md"
              value={profileForm.address}
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="map-marker" />}
                  minWidth="25px"
                  size={5}
                  ml="4"
                  color="blue.500"
                />
              }
              onChangeText={(value) => onFormChangeHandler('address', value)}
            />
          </FormControl>
        </ScrollView>
      </VStack>
    </KeyboardAwareScrollView>
  );
};
