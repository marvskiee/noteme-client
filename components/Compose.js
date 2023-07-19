import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { externalStyle } from "../style/externalStyle";
import BottomNav from "./BottomNav";
import config from "../config/axios_config";
import colors from "../config/colors";
import tw from "twrnc";

const Compose = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saveBtn, setSaveBtn] = useState(false);
  const user_id = props.get_token;
  const saveHandler = async () => {
    if (saveBtn) {
      await config
        .post("note/add/", { title, body, user_id })
        .then((res) => {
          ToastAndroid.show("Note Saved!", ToastAndroid.LONG);
          props.action("notes");
        })
        .catch((err) =>
          console.log("Warning Error Occur in Compose.js: " + err.message)
        );
    }
  };
  useEffect(() => {
    checker();
  });
  const titleOnchangeHandler = (e) => {
    setTitle(e);
  };
  const bodyOnchangeHandler = (e) => {
    setBody(e);
  };
  const checker = () => {
    if (title.trim().length > 0 && body.trim().length > 0) {
      setSaveBtn(true);
    } else {
      setSaveBtn(false);
    }
  };
  return (
    <View style={styles.containerNotCenter}>
      <View style={styles.composeNav}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => props.action("notes")}>
            <Image
              style={[styles.navAvatar, styles.backButton]}
              source={require("../assets/back.png")}
            />
          </TouchableOpacity>
          <Text style={tw`text-slate-900 text-2xl font-bold`}>Compose</Text>
        </View>
        <View>
          <Text
            style={{
              padding: 10,
              color: !saveBtn ? colors.gray : "#000",
            }}
            onPress={saveHandler}
          >
            Save
          </Text>
        </View>
      </View>
      <View
        style={[{ paddingHorizontal: 20, paddingVertical: 10, width: "100%" }]}
      >
        <TextInput
          selectionColor={"blue"}
          style={{ paddingVertical: 10, paddingHorizontal: 10, fontSize: 15 }}
          placeholder="Title"
          //   value={title}
          onChangeText={titleOnchangeHandler}
        />
        <View style={[styles.composeBody]}>
          <TextInput
            style={{
              lineHeight: 100,
              paddingVertical: 10,
              paddingHorizontal: 10,
              height: "100%",
              textAlignVertical: "top",
              fontSize: 15,
            }}
            multiline={true}
            // value={body}
            autoFocus={true}
            onChangeText={bodyOnchangeHandler}
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create(externalStyle);
export default Compose;
