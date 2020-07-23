import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemSeparator from "../components/ListItemSeparator";
import Screen from "../components/Screen";

const initialMessages = [
  {
    id: 1,
    title: "Red Jacket for Sale",
    description: "Is this still available?",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "Couch",
    description: "What is your last price?",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 3,
    title: "iPhone Charge",
    description: "Is it available in green?",
    image: require("../assets/mosh.jpg"),
  },
];

export default function MessagesScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log(item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 4,
              title: "T4",
              description: "D4",
              image: require("../assets/mosh.jpg"),
            },
          ]);
          //   setRefreshing(false);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});
