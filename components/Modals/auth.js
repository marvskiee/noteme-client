import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { externalStyle } from "../style/externalStyle";
import axios from "axios";
const Auth = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.splashForm}>
        <Text style={styles.splashText1}>{props.message}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create(externalStyle);
export default Auth;
