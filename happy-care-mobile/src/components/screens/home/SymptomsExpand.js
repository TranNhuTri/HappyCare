import React, { useEffect, useState } from 'react';
import { FlatList, Text, VStack, Pressable, Button } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../../redux/actions';
import { HCUpdateHeader } from '../../layout';
import { ScreenName } from '../../../api/common';
import { symptomsService } from '../../../redux/services';

export const SymptomsExpand = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentScreen } = useSelector((state) => state.ui);
  const { symptoms } = useSelector((state) => state.symptoms);
  const [symptomSelected, setSymptomsSelected] = useState([]);

  useEffect(() => {
    symptomsService.getSymptoms();
  }, []);

  useEffect(() => {
    if (currentScreen !== ScreenName.symptomsExpand) {
      return navigation.navigate(currentScreen);
    }
  }, [currentScreen, navigation]);

  const onBackScreenHandler = () => {
    dispatch(uiActions.navigateScreen(ScreenName.home));
  };

  const itemHandler = (id) => {
    if (symptomSelected.includes(id)) {
      const symptomsList = symptomSelected.filter((item) => item !== id);
      setSymptomsSelected(symptomsList);
    } else if (symptomSelected.length < 3) {
      setSymptomsSelected([...symptomSelected, id]);
    }
  };

  const searchDoctor = () => {
    console.log(symptomSelected);
  };

  return (
    <VStack w="100%" h="100%">
      <HCUpdateHeader
        headerTitle={`Triệu chứng của bạn là gì? (${symptomSelected.length})/3`}
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
              bg={symptomSelected.includes(item._id) ? 'purple.600' : '#dddddd'}
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
              <Text color={symptomSelected.includes(item._id) ? '#dddddd' : 'black'}>
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
            color: 'purple.600',
            fontSize: '14px',
          }}
          _pressed={{
            _text: { color: 'white' },
            bg: 'purple.600',
          }}
          onPress={searchDoctor}
          isDisabled={symptomSelected.length !== 3}
        >
          Tìm kiếm bác sĩ
        </Button>
      </VStack>
    </VStack>
  );
};
