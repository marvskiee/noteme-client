import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { externalStyle } from "../style/externalStyle";
const BottomNav = (props) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => props.action("compose")}>
        <Image
          style={styles.bottomButton}
          source={require("../assets/add-icon.png")}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create(externalStyle);
export default BottomNav;
