import React from 'react';
import { Platform } from 'react-native';
import { VStack, HStack, Heading, KeyboardAvoidingView, Avatar } from 'native-base';
import { useSelector } from 'react-redux';
import { DoctorLobby } from './DoctorLobby';
import { MemberLobby } from './MemberLobby';
import { BottomBarHeight, Role } from '../../../../api/common';

export const ChatLobby = ({ navigation }) => {
  const { role, profile } = useSelector((state) => state.user);

  return (
    <KeyboardAvoidingView
      h={{
        base: '100%',
        lg: 'auto',
      }}
      behavior={Platform.OS === 'ios' && 'padding'}
      mb={BottomBarHeight + 10}
    >
      <VStack pt={2} px={3} w="100%" h="100%">
        <HStack alignItems="center" space={2}>
          <Avatar
            bg="blue.600"
            alignSelf="center"
            size="md"
            p="2px"
            source={{
              uri: profile.avatar,
            }}
          />
          <Heading mt="2" size="md" color="blue.600" fontWeight={700}>
            {role === Role.doctor ? 'Tư vấn sức khoẻ' : 'Trò chuyện'}
          </Heading>
        </HStack>
        {role === Role.doctor ? (
          <DoctorLobby navigation={navigation} />
        ) : (
          <MemberLobby navigation={navigation} />
        )}
      </VStack>
    </KeyboardAvoidingView>
  );
};
