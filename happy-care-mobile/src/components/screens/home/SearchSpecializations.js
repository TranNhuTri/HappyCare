import React, { useEffect } from 'react';
import { FlatList, VStack, Text, Center, Pressable } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { specService } from '../../../redux/services';
import { HCUpdateHeader } from '../../layout';
import { uiActions } from '../../../redux/actions';
import { ScreenName } from '../../../api/common';

export const SearchSpecializations = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { specs } = useSelector((state) => state.spec);
  const { symptomIdsSelected } = route.params;

  useEffect(() => {
    specService.getSpecsBySymptomKeyword(symptomIdsSelected);
  }, [symptomIdsSelected]);

  const onBackScreenHandler = () => {
    dispatch(uiActions.navigateScreen(ScreenName.home));
    navigation.navigate(ScreenName.home);
  };

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [navigation]);

  const SearchDoctorBySpecializations = () => {
    console.log('SearchDoctorBySpecializations');
  };

  return (
    <VStack w="100%" h="100%">
      <HCUpdateHeader
        headerTitle="Tìm kiếm chuyên khoa"
        onBackScreenHandler={onBackScreenHandler}
      />
      <Center>
        <Text fontSize="md" bold color="blue.700" textAlign="center">
          Đã tìm thấy {specs.length} chuyên khoa bạn cần
        </Text>
      </Center>
      <Center>
        <FlatList
          p="4"
          numColumns={1}
          data={specs}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <Pressable
              w="80"
              h="10"
              m="2"
              bg="blue.700"
              alignItems="center"
              borderRadius="md"
              flexDirection="row"
              _pressed={{
                bg: 'blue.600',
              }}
              onPress={SearchDoctorBySpecializations}
            >
              <Text ml="4" color="white" fontSize="lg" fontWeight="bold">
                {index + 1}
              </Text>
              <Text ml="4" color="white" fontSize="md">
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      </Center>
    </VStack>
  );
};
