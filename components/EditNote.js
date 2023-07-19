import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";

import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { externalStyle } from "../style/externalStyle";
import config from "../config/axios_config";
import colors from "../config/colors";

const EditNote = (props) => {
  const mounted = useRef();
  const [title, setTitle] = useState(props.get_selected.title);
  const [body, setBody] = useState(props.get_selected.body);

  const submitHandler = async () => {
    const note = {
      title,
      body,
      id: props.get_selected._id,
    };
    await config
      .put("note/update", note)
      .then((res) => {
        if (res.data.status == "ok") {
          props.set_selected((prevstate) => ({
            ...prevstate,
            title: title,
            body: body,
          }));
          ToastAndroid.show("Note Updated Successfully !", ToastAndroid.LONG);
          props.action("selected-note");
        }
      })
      .catch((e) => {
        console.log("Warning Occur in EditNote.js: " + e.message);
      });
  };
  return (
    <View style={styles.containerNotCenter}>
      <View style={styles.profileNav}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => props.action("selected-note")}>
            <Image
              style={[styles.navAvatar, styles.backButton]}
              source={require("../assets/back.png")}
            />
          </TouchableOpacity>
          <Text style={tw`text-slate-900 text-2xl font-bold`}>Edit Note</Text>
        </View>
        <View>
          <Text style={styles.buttonPlain} onPress={submitHandler}>
            Submit
          </Text>
        </View>
      </View>
      <View
        style={[{ paddingHorizontal: 20, paddingVertical: 10, width: "100%" }]}
      >
        <TextInput
          style={{ paddingVertical: 10, paddingHorizontal: 10, fontSize: 15 }}
          placeholder="Title"
          value={title}
          autoFocus={true}
          onChangeText={(e) => setTitle(e)}
        />
        <View style={styles.composeBody}>
          <TextInput
            style={{
              lineHeight: 30,
              paddingVertical: 10,
              paddingHorizontal: 10,
              height: 400,
              textAlignVertical: "top",
              fontSize: 15,
            }}
            multiline
            value={body}
            onChangeText={(e) => setBody(e)}
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create(externalStyle);

export default EditNote;
