import React, { useEffect, useState } from 'react';
import { FlatList, Text, VStack, Pressable, Button } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../redux/actions';
import { HCUpdateHeader } from '../../layout';
import { ScreenName } from '../../../api/common';
import { symptomsService } from '../../../redux/services';

export const SymptomsExpand = ({ navigation }) => {
  const dispatch = useDispatch();
  const { symptoms } = useSelector((state) => state.symptoms);
  const [symptomIdsSelected, setSymptomsSelected] = useState([]);

  useEffect(() => {
    symptomsService.getSymptoms();
  }, []);

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [navigation]);

  const onBackScreenHandler = () => {
    dispatch(uiActions.navigateScreen(ScreenName.home));
    navigation.navigate(ScreenName.home);
  };

  const itemHandler = (id) => {
    if (symptomIdsSelected.includes(id)) {
      const symptomsList = symptomIdsSelected.filter((item) => item !== id);
      setSymptomsSelected(symptomsList);
    } else if (symptomIdsSelected.length < 3) {
      setSymptomsSelected([...symptomIdsSelected, id]);
    }
  };

  const searchDoctor = () => {
    dispatch(uiActions.navigateScreen(ScreenName.searchSpecializations));
    navigation.navigate(ScreenName.searchSpecializations, { symptomIdsSelected });
  };

  return (
    <VStack w="100%" h="100%">
      <HCUpdateHeader
        headerTitle={`Triệu chứng của bạn là gì? (${symptomIdsSelected.length})/3`}
        onBackScreenHandler={onBackScreenHandler}
      />

      <VStack>
        <FlatList
          p="4"
          numColumns={3}
          data={symptoms}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Pressable
              bg={symptomIdsSelected.includes(item._id) ? 'blue.700' : '#dddddd'}
              h="10"
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
              m="1"
              p="2"
              _text={{
                color: '#dddddd',
                fontSize: '14px',
              }}
              _pressed={{
                bg: 'blue.200:alpha.20',
              }}
              onPress={() => itemHandler(item._id)}
            >
              <Text color={symptomIdsSelected.includes(item._id) ? '#dddddd' : 'black'}>
                {item.name}
              </Text>
            </Pressable>
          )}
        />
        <Button
          bg="light.50"
          p="2"
          alignItems="center"
          borderRadius="md"
          mx="auto"
          shadow="1"
          _text={{
            color: 'blue.700',
            fontSize: '14px',
          }}
          _pressed={{
            _text: { color: 'white' },
            bg: 'blue.700',
          }}
          onPress={searchDoctor}
          isDisabled={symptomIdsSelected.length === 0}
        >
          Tìm kiếm bác sĩ
        </Button>
      </VStack>
    </VStack>
  );
};
