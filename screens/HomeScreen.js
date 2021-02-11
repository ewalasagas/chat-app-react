import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet,  View,  Platform, KeyboardAvoidingView } from 'react-native';
import io from "socket.io-client";
import {GiftedChat} from 'react-native-gifted-chat';


export default function HomeScreen() {

    const [messateToSend, setMessageToSend] = useState("");
    const [recvMessage, setRecvMessage] = useState([]);
    const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://192.168.1.7:3001");
    socket.current.on("message", message => {
        setRecvMessage(prevState => [...prevState, message]);
    });
    setRecvMessage([
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
        },
    ])

  },[])

    const sendMessage = () => {
        socket.current.emit("message", messateToSend);
        setMessageToSend("");
    };

    
  return (
    <View style={{flex: 1}}>
    <GiftedChat
        messages={recvMessage}
        //onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      { Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
