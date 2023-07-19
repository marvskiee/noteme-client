import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { externalStyle } from "../style/externalStyle";
import tw from "twrnc";

const TopNav = (props) => {
  return (
    <View style={styles.topNav}>
      <Text style={tw`text-slate-900 text-2xl font-bold`}>Note Me</Text>
      <TouchableOpacity onPress={() => props.action("profile")}>
        <Image
          style={styles.navAvatar}
          source={require("../assets/avatar.jpg")}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create(externalStyle);
export default TopNav;
