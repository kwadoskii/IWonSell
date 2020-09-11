import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";

export default function ListItem({
  backgroundColor = colors.white,
  badge = 0,
  image,
  IconComponent,
  noChevron = false,
  onPress,
  subTitle,
  style,
  title,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight onPress={onPress} underlayColor={colors.light}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: backgroundColor,
              ...style,
            },
          ]}
        >
          {IconComponent}
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <View style={styles.detailsContainer}>
            <AppText numberOfLines={1} style={styles.title}>
              {title}
            </AppText>
            {subTitle && (
              <AppText numberOfLines={2} style={styles.subTitle}>
                {subTitle}
              </AppText>
            )}
          </View>
          {!noChevron && (
            <MaterialCommunityIcons
              name="chevron-right"
              size={25}
              color={colors.medium}
            />
          )}
          {badge !== 0 && (
            <View style={styles.badgeContainer}>
              <AppText style={styles.badge}>{badge}</AppText>
            </View>
          )}
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  badge: {
    color: colors.white,
    fontSize: 16,
    padding: 5,
    fontWeight: "bold",
  },
  badgeContainer: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 40,
    justifyContent: "center",
    minHeight: 20,
    minWidth: 20,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  image: {
    borderRadius: 35,
    height: 70,
    width: 70,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "700",
  },
});
