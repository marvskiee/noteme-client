import React, { useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { externalStyle } from "../style/externalStyle";
import config from "../config/axios_config";

const SelectedNote = (props) => {
  const mounted = useRef();

  const deleteHandler = () => {
    Alert.alert(
      "Delete this note",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel" },
        {
          text: "Ok",
          onPress: async () => {
            config
              .delete("note/delete/" + props.get_selected._id)
              .then((response) => {
                if (response.data.status == "ok") {
                  props.action("notes");
                }
              })
              .catch((e) =>
                console.log("Warning Occur in SelectedNote.js: " + e.message)
              );
          },
        },
      ]
    );
  };
  return (
    <View style={styles.containerNotCenter}>
      <View style={[styles.composeNav, { height: 79 }]}>
        <TouchableOpacity onPress={() => props.action("notes")}>
          <Image
            style={[styles.navAvatar, { width: 30, height: 30 }]}
            source={require("../assets/back.png")}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => props.action("edit-note")}>
            <Image
              style={[
                styles.navAvatar,
                { marginHorizontal: 10, width: 30, height: 30 },
              ]}
              source={require("../assets/edit.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteHandler}>
            <Image
              style={[
                styles.navAvatar,
                { marginHorizontal: 10, width: 30, height: 30 },
              ]}
              source={require("../assets/delete.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[{ paddingHorizontal: 20, paddingVertical: 10, width: "100%" }]}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            padding: 10,
            fontSize: 15,
          }}
        >
          {props.get_selected.title}
        </Text>
        <Text style={[styles.cardBody, { padding: 10, fontSize: 15 }]}>
          {props.get_selected.body}
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create(externalStyle);

export default SelectedNote;
