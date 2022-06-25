import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
  Box,
  VStack,
  HStack,
  KeyboardAvoidingView,
  IconButton,
  CheckIcon,
  Icon,
  Avatar,
  Select,
  FlatList,
  Text,
  Pressable,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { uiActions } from '../../../../redux/actions';
import { specService } from '../../../../redux/services';
import { ScreenName, BottomBarHeight } from '../../../../api/common';

export const SearchDoctor = ({ navigation }) => {
  const dispatch = useDispatch();
  const { specs } = useSelector((state) => state.spec);
  const { onlineDoctors } = useSelector((state) => state.socket);
  const { doctors } = useSelector((state) => state.role);

  const [filterDoctors, setFilterDoctors] = useState(doctors);
  const [selectedSpec, setSelectedSpec] = useState('');

  useEffect(() => {
    specService.getAllSpecs();
  }, []);

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [navigation]);

  const onBackScreenHandler = () => {
    dispatch(uiActions.navigateScreen(ScreenName.chatLobby));
    navigation.navigate(ScreenName.chatLobby);
  };

  const onChangeSelectedSpec = (spec) => {
    setSelectedSpec(spec);
    const filteredDoctors = doctors.filter((doctor) => doctor.specializations.includes(spec));
    setFilterDoctors(filteredDoctors);
  };

  const onSelectDoctorHandler = () => {
    console.log('onSelectDoctorHandler');
  };

  return (
    <KeyboardAvoidingView
      h={{
        base: '100%',
        lg: 'auto',
      }}
      behavior={Platform.OS === 'ios' && 'padding'}
      mb={BottomBarHeight + 10}
    >
      <VStack pt={2} px={1} w="100%" h="90%">
        <HStack w="100%" h="50px" alignItems="center">
          <IconButton
            icon={<Icon as={Entypo} name="chevron-left" />}
            borderRadius="full"
            onPress={onBackScreenHandler}
            _icon={{
              color: 'black',
              size: 'md',
            }}
            _pressed={{
              bg: 'blue.200:alpha.20',
            }}
          />
          <Box w="90%">
            <Select
              selectedValue={selectedSpec}
              minWidth="200"
              borderWidth={0}
              accessibilityLabel="Tất cả chuyên khoa"
              placeholder="Tất cả chuyên khoa"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              onValueChange={onChangeSelectedSpec}
            >
              {specs.map((spec) => (
                <Select.Item key={spec.id} label={spec.name} value={spec.name} />
              ))}
            </Select>
          </Box>
        </HStack>
        <FlatList
          mb={5}
          pt={5}
          px={3}
          data={filterDoctors}
          renderItem={({ item }) => (
            <Pressable w="90%" h="80px" mr={1} onPress={onSelectDoctorHandler}>
              <HStack alignItems="center" space={3}>
                <Avatar
                  bg="blue.600"
                  alignSelf="center"
                  size="md"
                  p="2px"
                  source={{
                    uri: item.avatar,
                  }}
                >
                  {onlineDoctors.includes(item.id) && <Avatar.Badge bg="green.600" />}
                </Avatar>
                <VStack alignContent="center">
                  <Text fontSize="12px" fontWeight={500}>
                    {item.fullname}
                  </Text>
                  <Text fontSize="10px">{item.specializations.join(',')}</Text>
                </VStack>
              </HStack>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      </VStack>
    </KeyboardAvoidingView>
  );
};
