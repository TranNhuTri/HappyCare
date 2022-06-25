import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  VStack,
  HStack,
  Box,
  Button,
  FlatList,
  Pressable,
  Icon,
  Center,
  Image,
  Input,
} from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { uiActions } from '../../../redux/actions';
import { userService, symptomsService } from '../../../redux/services';
import { ScreenName } from '../../../api/common';
// import { socketService } from '../../../api/services';

export const SymptomsKeyword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isShowQuestion, setIsShowQuestion] = useState(true);
  const [isShowGreat, setIsShowGreat] = useState(false);
  const [isShowNotGreat, setIsShowNotGreat] = useState(false);
  const [symptomIdsSelected, setSymptomIdsSelected] = useState([]);
  const { symptoms } = useSelector((state) => state.symptoms);

  useEffect(() => {
    symptomsService.getSymptoms();
  }, []);

  useEffect(() => {
    const setUserInfoById = async () => {
      dispatch(userService.initUserInfo());
    };
    setUserInfoById();
  }, [dispatch]);

  const handlerButtonClick = (answer) => {
    setIsShowQuestion(false);
    if (answer === true) {
      setIsShowGreat(true);
    } else {
      setIsShowNotGreat(true);
    }
  };

  const itemHandler = (id) => {
    if (symptomIdsSelected.includes(id)) {
      const symptomsList = symptomIdsSelected.filter((item) => item !== id);
      setSymptomIdsSelected(symptomsList);
    } else if (symptomIdsSelected.length < 3) {
      setSymptomIdsSelected([...symptomIdsSelected, id]);
    }
  };

  const searchDoctor = () => {
    dispatch(uiActions.navigateScreen(ScreenName.searchSpecializations));
    navigation.navigate(ScreenName.searchSpecializations, { symptomIdsSelected });
  };

  const symptomsExpand = () => {
    dispatch(uiActions.navigateScreen(ScreenName.symptomsExpand));
    navigation.navigate(ScreenName.symptomsExpand);
  };

  return (
    <Box>
      <VStack w="100%" px="4" pt="2" pb="0">
        {isShowQuestion && (
          <VStack pb="4" w="100%">
            <Text fontSize="xl" bold color="blue.700">
              Hôm nay,
            </Text>
            <Text fontSize="xl" bold color="blue.700">
              bạn cảm thấy như thế nào ?
            </Text>
            <HStack space={2} justifyContent="center">
              <Button
                bg="light.50"
                w="50%"
                h="150"
                shadow="1"
                borderRadius="md"
                _pressed={{
                  bg: 'blue.700',
                }}
                onPress={() => handlerButtonClick(true)}
              >
                <Center>
                  <Icon as={FontAwesome} name="smile-o" size="50px" color="darkBlue.800" mb="2" />
                  <Text bold fontSize="md" textAlign="center" color="darkBlue.800">
                    Tôi cảm thấy rất tuyệt vời
                  </Text>
                </Center>
              </Button>
              <Button
                alignItems="center"
                bg="light.50"
                w="50%"
                h="150"
                borderRadius="md"
                shadow="1"
                _pressed={{
                  bg: 'blue.700',
                }}
                onPress={() => handlerButtonClick(false)}
              >
                <Center>
                  <Icon as={FontAwesome} name="frown-o" size="50px" color="darkBlue.800" mb="2" />
                  <Text bold fontSize="md" textAlign="center" color="darkBlue.800">
                    Tôi cảm thấy không được khỏe
                  </Text>
                </Center>
              </Button>
            </HStack>
          </VStack>
        )}

        {isShowGreat && (
          <VStack pb="4" w="100%">
            <Text fontSize="xl" bold color="blue.700">
              Chúc bạn ngày mới tốt lành!!!
            </Text>
            <Center p="4">
              <Image size={120} alt="love" source={require('../../../assets/images/love.png')} />
            </Center>
            <Text fontSize="lg" bold color="blue.700">
              Tìm kiếm bác sĩ
            </Text>
            <Input
              _focus={{
                bg: 'white',
                borderWidth: '1',
                borderColor: 'blue.700',
              }}
              borderWidth="0"
              backgroundColor="purple.200"
              borderRadius="md"
              mt="2"
              // onChangeText={(value) => console.log(value)}
              InputLeftElement={
                <Icon
                  as={FontAwesome}
                  name="search"
                  minWidth="25px"
                  size={4}
                  ml="4"
                  color="blue.700"
                />
              }
            />
          </VStack>
        )}

        {isShowNotGreat && (
          <VStack pb="4" w="100%">
            <Text fontSize="xl" bold color="blue.700">
              Triệu chứng của bạn là gì? ({symptomIdsSelected.length}/3)
            </Text>
            <FlatList
              p="4"
              horizontal
              data={symptoms}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Pressable
                  bg={symptomIdsSelected.includes(item._id) ? 'blue.700' : '#dddddd'}
                  h="10"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="md"
                  mr="2"
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
              variant="ghost"
              mt="1"
              mx="auto"
              _text={{
                color: 'blue.700',
                fontSize: '14px',
              }}
              _pressed={{
                _text: { color: 'white' },
                bg: 'blue.700',
              }}
              onPress={symptomsExpand}
            >
              Xem thêm triệu chứng
            </Button>
            <VStack
              alignItems="center"
              p="2"
              mt="2"
              mx="auto"
              borderTopColor="blue.700"
              borderTopWidth={1}
            >
              <Button
                bg="light.50"
                p="2"
                alignItems="center"
                borderRadius="md"
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
        )}
      </VStack>
    </Box>
  );
};
