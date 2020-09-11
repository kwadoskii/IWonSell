import React, { useState, useRef, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import * as yup from "yup";

import ActivityIndicator from "../components/ActivityIndicator";
import { AppFormField, AppForm, SubmitButton } from "../components/forms";
import MessageBubble from "../components/MessageBubble";
import messageApi from "../api/messages";
import Screen from "../components/Screen";
import AuthContext from "../auth/context";

const validationSchema = yup.object().shape({
  chat: yup.string().required().trim().label("Chat"),
});

export default function MessageDetailsScreen({ route }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const _flatlist = useRef(null);
  const { user } = useContext(AuthContext);

  const getInitialMessages = async () => {
    const response = await messageApi.getOneMessage(route.params.messageId);
    setMessages(response.data.data.messages);
    setLoading(false);
  };

  useEffect(() => {
    getInitialMessages();
  }, []);

  const handleSubmit = async ({ chat }, { resetForm }) => {
    const date = new Date();
    // const newMsg = {
    //   message: chat,
    //   buyerSeller: user.id,
    //   _id: Math.floor(Math.random() * 200),
    //   time: date.toDateString().substr(4, 6) + ", " + date.toTimeString().substr(0, 5),
    // };
    const pathe = route.params.item;

    const newMsg = {
      message: chat,
      buyerSeller: user.id,
      seller: pathe.seller._id,
      buyer: pathe.buyer._id,
      listing: pathe.listing._id,
      time: date,
    };

    const response = await messageApi.postMessage(newMsg);

    if (response.ok) {
      setMessages((prevMsgs) => [
        ...prevMsgs,
        { ...newMsg, _id: Math.floor(Math.random() * 200) },
      ]);
      resetForm();
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <MessageBubble msg={item} />}
          keyExtractor={(messages) => messages._id.toString()}
          ref={_flatlist}
          onContentSizeChange={() => _flatlist.current.scrollToEnd()}
          showsVerticalScrollIndicator={false}
          scrollToEnd
        />

        <AppForm
          initialValues={{ chat: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View style={{ width: "80%", marginHorizontal: 10, marginLeft: 10 }}>
              <AppFormField
                multiline
                name="chat"
                noError
                placeholder="Type your message here"
              />
            </View>
            <View style={{ width: "20%", marginRight: 15 }}>
              <SubmitButton title="send" />
            </View>
          </View>
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -18,
    paddingHorizontal: 10,
  },
});
