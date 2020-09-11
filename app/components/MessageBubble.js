import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import AppText from "./AppText";
import AuthContext from "../auth/context";
import colors from "../config/colors";

export default function MessageBubble({ msg }) {
  const time = new Date(msg.time);
  const { user } = useContext(AuthContext);

  if (msg.buyerSeller !== user.id) {
    return (
      <View style={styles.senderContainer}>
        <AppText style={styles.senderText}>{msg.message}</AppText>
        <AppText style={styles.senderTime}>
          {time.toDateString().substr(4, 6) + ", " + time.toTimeString().substr(0, 5)}
        </AppText>
      </View>
    );
  } else {
    return (
      <View style={styles.receiverContainer}>
        <AppText style={styles.receiverText}>{msg.message}</AppText>
        <AppText style={styles.receiverTime}>
          {time.toDateString().substr(4, 6) + ", " + time.toTimeString().substr(0, 5)}
        </AppText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  senderContainer: {
    marginVertical: 6,
    paddingHorizontal: 10,
  },
  senderText: {
    alignSelf: "flex-start",
    backgroundColor: colors.secondary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    fontSize: 18,
    justifyContent: "center",
    maxWidth: "70%",
    padding: 10,
    textAlign: "left",
  },
  senderTime: {
    alignSelf: "flex-start",
    fontSize: 14,
    marginHorizontal: 4,
    paddingTop: 2,
  },
  receiverContainer: {
    marginVertical: 6,
    paddingHorizontal: 10,
  },
  receiverText: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    color: "white",
    fontSize: 18,
    justifyContent: "center",
    marginLeft: 10,
    maxWidth: "70%",
    padding: 10,
  },
  receiverTime: {
    alignSelf: "flex-end",
    fontSize: 14,
    marginHorizontal: 4,
    paddingTop: 2,
  },
});
