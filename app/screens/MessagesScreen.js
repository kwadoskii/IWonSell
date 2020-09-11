import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemSeparator from "../components/ListItemSeparator";
import route from "../navigation/route";
import Screen from "../components/Screen";
import messageApi from "../api/messages";
import useApi from "../hooks/useApi";
import AuthContext from "../auth/context";

const initialMessages = [
  {
    id: 1,
    title: "James Okoro",
    lastMessage: "Is this still available?",
    image: require("../assets/jacket.jpg"),
    counter: 5,
  },
  {
    id: 2,
    title: "Toke Makinwa",
    lastMessage: "What is your last price?",
    image: require("../assets/couch.jpg"),
    counter: 1,
  },
  {
    id: 3,
    title: "Chime Francis",
    lastMessage: "Is it available in green?",
    image: require("../assets/chair.jpg"),
  },
  {
    id: 4,
    title: "Paul Efebe",
    lastMessage: "Please send the order ASAP",
    image: require("../assets/chair.jpg"),
  },
];

export default function MessagesScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  // const [messages, setMessages] = useState([]);
  const getMessageApi = useApi(messageApi.getMessages);
  // const messages = async () => await getMessageApi.data;

  const func = () => {
    getMessageApi.request(user.id);
    // if (!getMessageApi.loading) {
    //   setMessages(getMessageApi.data);
    // }
  };

  //this should subscribe to changes in the messaege

  useEffect(() => {
    func();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    setMessages(messages.filter((m) => m._id !== message._id));
  };

  return (
    <>
      <ActivityIndicator visible={getMessageApi.loading} />
      <Screen style={styles.container}>
        <FlatList
          data={getMessageApi.data}
          keyExtractor={(message) => message._id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.listing.title}
              subTitle={item.messages[item.messages.length - 1].message}
              image={item.listing.images[0].url}
              noChevron
              badge={item.counter}
              onPress={() =>
                navigation.navigate(route.MESSAGE_DETAILS, {
                  messageId: item._id,
                  title: item.listing.title,
                  item,
                })
              }
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={() => {
            getMessageApi.request(user.id);
          }}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -25,
    marginBottom: 25,
  },
});
