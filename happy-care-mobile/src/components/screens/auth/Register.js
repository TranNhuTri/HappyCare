import { omit } from 'lodash';
import * as validator from 'validator';
import React, { useState } from 'react';
import { Center, Box, Heading, VStack, FormControl, Input, Button, Image, Text } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { uiActions, authActions } from '../../../redux/actions';
import { authService } from '../../../redux/services';
import { HCIcon } from '../../../assets/images';
import { AppName, ScreenName } from '../../../api/common';

export const Register = ({ navigation }) => {
  const dispatch = useDispatch();

  const { registerCredentials } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});

  const onFormChangeHandler = (type, value) => {
    dispatch(
      authActions.setRegisterCredentials({
        ...registerCredentials,
        [type]: value,
      })
    );
    setErrors(omit(errors, [type]));
  };

  const validateFormHandler = () => {
    const {
      email: emailInput,
      password: passwordInput,
      confirmPassword: confirmPasswordInput,
    } = registerCredentials;

    const email = emailInput && emailInput.trim();
    const password = passwordInput && passwordInput.trim();
    const confirmPassword = confirmPasswordInput && confirmPasswordInput.trim();

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

    if (!confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Confirm password is invalid',
      });
      return false;
    }

    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Password and confirm password is not match',
      });
      return false;
    }

    return true;
  };

  const onSubmitHandler = async () => {
    const isFormValid = validateFormHandler();
    if (isFormValid) {
      const isRegisterSuccess = authService.registerNewUser(registerCredentials);
      if (isRegisterSuccess) {
        dispatch(uiActions.navigateScreen(ScreenName.login));
        navigation.navigate(ScreenName.login);
      }
    }
  };

  const onNavigateLoginHandler = () => {
    dispatch(uiActions.navigateScreen(ScreenName.login));
    navigation.navigate(ScreenName.login);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <VStack bg="primary.200" alignItems="center" w="100%" h="100%">
        <Box safeArea p="2" w="90%" maxW="290">
          <Center mb="8">
            <Image mb="2" size="md" source={HCIcon.hc_icon_health_care} alt="Healthcare logo" />
            <Heading
              size="xl"
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}
              fontWeight="semibold"
            >
              {AppName}
            </Heading>
          </Center>
          <Heading
            mb="3"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            fontWeight="medium"
            size="xs"
          >
            {'Hãy đăng ký '}
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
            {' để có một sức khoẻ tốt hơn'}
          </Heading>
          <VStack space={3}>
            <FormControl isRequired>
              <FormControl.Label>Email</FormControl.Label>
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
                borderRadius="md"
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
              <FormControl.Label>Password</FormControl.Label>
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
                type="password"
                borderRadius="md"
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
            <FormControl isRequired>
              <FormControl.Label>Confirm Password</FormControl.Label>
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
                type="password"
                borderRadius="md"
                onChangeText={(value) => onFormChangeHandler('confirmPassword', value)}
              />
              {errors && errors.confirmPassword && (
                <FormControl.HelperText
                  ml="1"
                  _text={{
                    fontSize: 'xs',
                    color: 'red.500',
                  }}
                >
                  {errors && errors.confirmPassword}
                </FormControl.HelperText>
              )}
            </FormControl>
            <Button mt="2" colorScheme="tertiary" onPress={onSubmitHandler}>
              <Text bold fontSize="md" color="primary.100">
                Đăng ký
              </Text>
            </Button>
            <Text>
              {'Đã có tài khoản? '}
              <Text bold fontSize="md" color="green.600" onPress={onNavigateLoginHandler}>
                Đăng nhập
              </Text>
              {' ngay 🙋‍♂️'}
            </Text>
          </VStack>
        </Box>
      </VStack>
    </KeyboardAwareScrollView>
  );
};
