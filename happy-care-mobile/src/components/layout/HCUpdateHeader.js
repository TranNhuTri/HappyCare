import React from 'react';
import { HStack, IconButton, Icon, Heading } from 'native-base';
import { Entypo } from '@expo/vector-icons';

export const HCUpdateHeader = (props) => {
  const { onBackScreenHandler, onSaveHandler, headerTitle } = props;

  return (
    <HStack
      w="100%"
      h="50px"
      justifyContent={onSaveHandler ? 'space-beetween' : 'flex-start'}
      alignItems="center"
    >
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
          _ios: {
            _icon: {
              size: '2xl',
            },
          },
        }}
      />
      <Heading
        size="md"
        _dark={{
          color: 'warmGray.50',
        }}
        fontWeight={600}
        lineHeight="md"
      >
        {headerTitle}
      </Heading>
      {onSaveHandler && (
        <IconButton
          icon={<Icon as={Entypo} name="save" />}
          borderRadius="full"
          onPress={onSaveHandler}
          _icon={{
            color: 'black',
            size: 'md',
          }}
          _pressed={{
            bg: 'blue.200:alpha.20',
            _ios: {
              _icon: {
                size: '2xl',
              },
            },
          }}
          _ios={{
            _icon: {
              size: '2xl',
            },
          }}
        />
      )}
    </HStack>
  );
};
