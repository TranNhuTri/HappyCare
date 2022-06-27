import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { ChatRoomHeader } from './ChatRoomHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { socketService } from '../../../../api/services';
import { chatService } from '../../../../redux/services';
import { uiActions } from '../../../../redux/actions';
import { Role } from '../../../../api/common';

export const ChatRoom = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { id, role } = useSelector((state) => state.user);
  const [roomId, setRoomId] = useState(null);

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [navigation]);

  useEffect(() => {
    const joinChatRoom = async () => {
      const verifyRoomId = await chatService.verifyRoom({
        memberId: role === Role.member ? id : route.params.doctor.id,
        doctorId: role === Role.member ? route.params.doctor.id : id,
      });

      if (verifyRoomId) {
        socketService.emitJoinChatRoom({
          userId: id,
          roomId: verifyRoomId,
        });
        setRoomId(verifyRoomId);
      } else {
        dispatch(
          uiActions.showErrorUI({
            title: 'Cannot join chat room',
            message: 'Update your profile before joining the room',
          })
        );
        navigation.goBack();
      }
    };

    joinChatRoom();
  }, [dispatch, id, navigation, role, route.params.doctor.id]);

  return (
    <>
      <ChatRoomHeader navigation={navigation} route={route} />
      <MessageList navigation={navigation} route={route} roomId={roomId} />
      <ChatInput navigation={navigation} route={route} roomId={roomId} />
      <KeyboardSpacer />
    </>
  );
};
