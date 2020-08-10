import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { AppFormField, AppForm } from "../components/forms";

export default function MessageDetailsScreen({ route }) {
  return (
    <Screen style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.dateContainer}>
          <AppText style={styles.date}>13-08-2020</AppText>
        </View>
        <View style={styles.buyerContainer}>
          <AppText style={styles.buyerText}>How much is the jacket?</AppText>
          <AppText style={styles.buyerTime}>12:20am</AppText>
        </View>

        <View style={styles.buyerContainer}>
          <AppText style={styles.buyerText}>
            Is this still available? I need it asap.
          </AppText>
          <AppText style={styles.buyerTime}>12:22am</AppText>
        </View>

        <View style={styles.sellerContainer}>
          <AppText style={styles.sellerText}>Sorry for the late response.</AppText>
          <AppText style={styles.sellerTime}>12:40am</AppText>
        </View>

        <View style={styles.sellerContainer}>
          <AppText style={styles.sellerText}>
            It goes for 7,000 naira only, and it is very much available.
          </AppText>
          <AppText style={styles.sellerTime}>12:40am</AppText>
        </View>

        {/*  */}
        <View style={styles.dateContainer}>
          <AppText style={styles.date}>14-08-2020</AppText>
        </View>
        <View style={styles.buyerContainer}>
          <AppText style={styles.buyerText}>How much is the jacket?</AppText>
          <AppText style={styles.buyerTime}>12:20am</AppText>
        </View>

        <View style={styles.buyerContainer}>
          <AppText style={styles.buyerText}>
            Is this still available? I need it asap.
          </AppText>
          <AppText style={styles.buyerTime}>12:22am</AppText>
        </View>

        <View style={styles.sellerContainer}>
          <AppText style={styles.sellerText}>Sorry for the late response.</AppText>
          <AppText style={styles.sellerTime}>12:40am</AppText>
        </View>

        <View style={styles.sellerContainer}>
          <AppText style={styles.sellerText}>
            It goes for 7,000 naira only, and it is very much available.
          </AppText>
          <AppText style={styles.sellerTime}>12:40am</AppText>
        </View>

        {/* three */}
        <View style={styles.dateContainer}>
          <AppText style={styles.date}>16-08-2020</AppText>
        </View>
        <View style={styles.buyerContainer}>
          <AppText style={styles.buyerText}>How much is the jacket?</AppText>
          <AppText style={styles.buyerTime}>12:20am</AppText>
        </View>

        <View style={styles.buyerContainer}>
          <AppText style={styles.buyerText}>
            Is this still available? I need it asap.
          </AppText>
          <AppText style={styles.buyerTime}>12:22am</AppText>
        </View>

        <View style={styles.sellerContainer}>
          <AppText style={styles.sellerText}>Sorry for the late response.</AppText>
          <AppText style={styles.sellerTime}>12:40am</AppText>
        </View>

        <View style={styles.sellerContainer}>
          <AppText style={styles.sellerText}>
            It goes for 7,000 naira only, and it is very much available.
          </AppText>
          <AppText style={styles.sellerTime}>12:40am</AppText>
        </View>

        {/* four */}
        <View style={styles.dateContainer}>
          <AppText style={styles.date}>18-08-2020</AppText>
        </View>
        <View style={styles.buyerContainer}>
          <AppText style={styles.buyerText}>How much is the jacket?</AppText>
          <AppText style={styles.buyerTime}>12:20am</AppText>
        </View>

        <View style={styles.buyerContainer}>
          <AppText style={styles.buyerText}>
            Is this still available? I need it asap.
          </AppText>
          <AppText style={styles.buyerTime}>12:22am</AppText>
        </View>

        <View style={styles.sellerContainer}>
          <AppText style={styles.sellerText}>Sorry for the late response.</AppText>
          <AppText style={styles.sellerTime}>12:40am</AppText>
        </View>

        <View style={styles.sellerContainer}>
          <AppText style={styles.sellerText}>
            It goes for 7,000 naira only, and it is very much available.
          </AppText>
          <AppText style={styles.sellerTime}>12:40am</AppText>
        </View>
      </ScrollView>
      <AppForm initialValues={{ chat: "" }}>
        <AppFormField name="chat" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  buyerContainer: {
    marginVertical: 6,
    paddingHorizontal: 10,
  },
  buyerText: {
    backgroundColor: colors.secondary,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 10,
    width: "70%",
  },
  buyerTime: {
    alignSelf: "flex-start",
    fontSize: 15,
    paddingTop: 2,
  },
  container: {
    marginTop: -18,
    paddingHorizontal: 10,
  },
  date: {
    fontSize: 14,
    backgroundColor: colors.light,
    padding: 6,
    color: colors.black,
    margin: 6,
    borderRadius: 10,
  },
  dateContainer: {
    alignItems: "center",
  },
  sellerContainer: {
    marginVertical: 6,
    paddingHorizontal: 10,
  },
  sellerText: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    color: "white",
    marginLeft: 10,
    padding: 10,
    width: "70%",
  },
  sellerTime: {
    alignSelf: "flex-end",
    fontSize: 15,
    paddingTop: 2,
  },
});
