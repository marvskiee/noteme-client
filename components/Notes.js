import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { externalStyle } from "../style/externalStyle";
import BottomNav from "./BottomNav";
import TopNav from "./TopNav";
import config from "../config/axios_config";
import colors from "../config/colors";
import tw from "twrnc";

const Notes = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const selectHandler = (data) => {
    props.set_selected(data);
    props.action("selected-note");
  };
  const searchHandler = (value) => {
    setSearch(value);
  };
  useEffect(() => {
    const load = async () => {
      await config
        .get("note/find/" + props.get_token)
        .then((res) => props.set_notes(res.data.message))
        .catch((e) => console.log("Warning Occur in Notes.js: " + e.message));
      setIsLoading(false);
      console.log(props.get_token);
    };
    load();
  }, []);

  const data = props.get_notes.filter((note) =>
    note?.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <View style={styles.containerNotCenter}>
      <TopNav action={props.action} />
      <ScrollView
        style={{
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <TextInput
          style={tw`mt-2 bg-slate-100 px-4 py-2 rounded-md`}
          onChangeText={searchHandler}
          placeholder="Search Title"
          autoFocus={true}
        />
        <View style={{ paddingVertical: 10 }}>
          {data?.length > 0 ? (
            data.map((data, index) => (
              <TouchableOpacity key={index} onPress={() => selectHandler(data)}>
                <View style={tw`bg-slate-100 p-4 rounded-md my-1`}>
                  <Text style={styles.cardTitle}>{data["title"]}</Text>
                  <Text style={styles.cardBody} numberOfLines={4}>
                    {data["body"]}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text
              style={{
                color: colors.gray,
                fontSize: 20,
                textAlign: "center",
                paddingVertical: 30,
              }}
            >
              {!isLoading ? "Note is Empty" : "Fetching Data..."}
            </Text>
          )}
        </View>
      </ScrollView>
      <BottomNav action={props.action} />
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create(externalStyle);
export default Notes;
