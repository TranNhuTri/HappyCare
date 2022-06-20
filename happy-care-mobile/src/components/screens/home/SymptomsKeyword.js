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
import { userService } from '../../../redux/services';
import { ScreenName } from '../../../api/common';
import { httpService } from '../../../api/services';
// import { socketService } from '../../../api/services';

export const SymptomsKeyword = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currentScreen } = useSelector((state) => state.ui);
  const [isShowQuestion, setIsShowQuestion] = useState(true);
  const [isShowGreat, setIsShowGreat] = useState(false);
  const [isShowNotGreat, setIsShowNotGreat] = useState(false);
  const [symptomSelected, setSymptomsSelected] = useState([]);
  const [symptomsList, setSymptomsList] = useState([]);

  useEffect(() => {
    if (currentScreen !== ScreenName.home) {
      return navigation.navigate(currentScreen);
    }
  }, [currentScreen, navigation]);

  useEffect(() => {
    const setUserInfoById = async () => {
      dispatch(userService.initUserInfo());
    };
    setUserInfoById();
  }, [dispatch]);

  const fetchSymptoms = () => {
    httpService
      .get('api/symptom-keyword', null, true)
      .then((res) => {
        if (res.data) {
          setSymptomsList(res.data.keywords);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchSymptoms();

    return () => {
      setSymptomsList([]);
    };
  }, []);

  const handlerButtonClick = (answer) => {
    setIsShowQuestion(false);
    if (answer === true) {
      setIsShowGreat(true);
    } else {
      setIsShowNotGreat(true);
    }
  };

  const itemHandler = (id) => {
    if (symptomSelected.includes(id)) {
      const symptoms = symptomSelected.filter((item) => item !== id);
      setSymptomsSelected(symptoms);
    } else if (symptomSelected.length < 3) {
      setSymptomsSelected([...symptomSelected, id]);
    }
  };

  const searchDoctor = () => {
    console.log(symptomSelected);
  };

  const symptomsExpand = () => {
    dispatch(uiActions.navigateScreen(ScreenName.symptomsExpand));
  };

  return (
    <Box>
      <VStack w="100%" h="90%" p="4" pt="2">
        {isShowQuestion && (
          <VStack pb="4" w="100%" h="40%">
            <Text fontSize="xl" bold color="purple.600">
              Hôm nay,
            </Text>
            <Text fontSize="xl" bold color="purple.600">
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
                  bg: 'purple.600',
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
                  bg: 'purple.600',
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
          <VStack pb="4" w="100%" h="40%">
            <Text fontSize="xl" bold color="purple.600">
              Chúc bạn ngày mới tốt lành!!!
            </Text>
            <Center p="4">
              <Image size={120} alt="love" source={require('../../../assets/images/love.png')} />
            </Center>
            <Text fontSize="lg" bold color="purple.600">
              Tìm kiếm bác sĩ
            </Text>
            <Input
              _focus={{
                bg: 'white',
                borderWidth: '1',
                borderColor: 'purple.600',
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
                  color="purple.600"
                />
              }
            />
          </VStack>
        )}

        {isShowNotGreat && (
          <VStack pb="4" w="100%">
            <Text fontSize="xl" bold color="purple.600">
              Triệu chứng của bạn là gì? ({symptomSelected.length}/3)
            </Text>
            <FlatList
              p="4"
              horizontal
              data={symptomsList}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Pressable
                  bg={symptomSelected.includes(item._id) ? 'purple.600' : '#dddddd'}
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
                  <Text color={symptomSelected.includes(item._id) ? '#dddddd' : 'black'}>
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
                color: 'purple.600',
                fontSize: '14px',
              }}
              _pressed={{
                _text: { color: 'white' },
                bg: 'purple.600',
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
              borderTopColor="purple.600"
              borderTopWidth={1}
            >
              <Button
                bg="light.50"
                p="2"
                alignItems="center"
                borderRadius="md"
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
        )}
      </VStack>
    </Box>
  );
};
