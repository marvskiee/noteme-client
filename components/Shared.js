import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { externalStyle } from "../style/externalStyle";
import BottomNav from "./BottomNav";
import TopNav from "./TopNav";
const Shared = (props) => {
  return (
    <View style={styles.container}>
      <TopNav action={props.action} />
      <Text style={[styles.navLogo, styles.text]}>Maintenance</Text>
      <BottomNav action={props.action} />
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create(externalStyle);
export default Shared;
