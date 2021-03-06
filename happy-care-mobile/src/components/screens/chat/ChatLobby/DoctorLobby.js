import React from 'react';
import { VStack, Heading } from 'native-base';
import { ChannelList } from './ChannelList';

export const DoctorLobby = ({ navigation }) => (
  <VStack mt={5}>
    <Heading my="2" size="md" color="blue.500" fontWeight={600}>
      Danh sách tư vấn
    </Heading>
    <ChannelList navigation={navigation} />
  </VStack>
);
