import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import tw from "twrnc";

import { externalStyle } from "../style/externalStyle";
import config from "../config/axios_config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../config/colors";

const Profile = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const message = useRef();
  const isSuccess = useRef();
  const [loading, setLoading] = useState();

  const oldPasswordHandler = (e) => {
    setOldPassword(e);
  };
  const newPasswordHandler = (e) => {
    setNewPassword(e);
  };
  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e);
  };

  useEffect(() => {
    const load = async () => {
      if (props.get_token == "") {
        props.action("login");
      }
      await config
        .get("user/find/" + props.get_token)
        .then((res) => props.set_profile(res.data.message))
        .catch((err) =>
          console.log("Warning Error Occur in Profile.js: " + err.message)
        );
    };
    load();
  }, []);
  const storeData = async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (err) {
      console.log("Warning Error Occur in Profile.js: " + err.message);
    } finally {
      props.set_token("");
      props.set_notes([]);
      props.action("login");
      props.set_profile(null);
    }
  };
  const logoutHandler = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel" },
      {
        text: "Ok",
        onPress: async () => await storeData(),
      },
    ]);
  };
  const submitHandler = async () => {
    setLoading(true);
    const password = {
      oldPassword,
      newPassword,
      confirmPassword,
      id: props.get_profile._id,
      password: props.get_profile.password,
    };
    await config
      .put("user/change-password", password)
      .then((res) => {
        if (res.data.status == "ok") {
          isSuccess.current = true;
        } else {
          isSuccess.current = false;
        }
        message.current = res.data.message;
      })
      .catch((error) => (message.current = error.message));
    setLoading(false);
  };

  return (
    <View style={styles.containerNotCenter}>
      <View style={styles.profileNav}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => props.action("notes")}>
            <Image
              style={[styles.navAvatar, styles.backButton]}
              source={require("../assets/back.png")}
            />
          </TouchableOpacity>
          <Text style={tw`text-slate-900 text-2xl font-bold`}>Profile</Text>
        </View>

        <TouchableOpacity onPress={logoutHandler}>
          <Text style={styles.buttonPlain}>Logout</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ width: "100%", padding: 20 }}>
        <View style={styles.profileInfo}>
          <Image
            style={tw`rounded-full w-40 h-40`}
            source={require("../assets/avatar.jpg")}
          />
          <View style={{ margin: 20 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              {props.get_profile && props.get_profile.name}
            </Text>
            <Text style={{ paddingVertical: 10, textAlign: "center" }}>
              {props.get_profile && props.get_profile.email}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.profileHeader}>Account Information</Text>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={tw`mt-2 bg-slate-100 px-4 py-2 rounded-md`}
            value={props.get_profile && props.get_profile.name}
            editable={false}
          />
          <Text style={styles.label}>Email</Text>

          <TextInput
            style={tw`mt-2 bg-slate-100 px-4 py-2 rounded-md`}
            value={props.get_profile && props.get_profile.email}
            editable={false}
          />
        </View>
        <View>
          <Text style={styles.profileHeader}>Change Password</Text>
          {message.current?.length > 0 &&
            message.current.map((data, key) => (
              <View
                key={key}
                style={tw`px-4 py-3 rounded-md ${
                  isSuccess.current ? "bg-emerald-100" : "bg-rose-100"
                }`}
              >
                <Text
                  style={tw`${
                    isSuccess.current ? "text-emerald-500" : "text-rose-500"
                  } py-1`}
                >
                  {data}
                </Text>
              </View>
            ))}
          <Text style={styles.label}>Old Password</Text>
          <TextInput
            style={tw`mt-2 bg-slate-100 px-4 py-2 rounded-md`}
            onChangeText={oldPasswordHandler}
            secureTextEntry={true}
          />
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={tw`mt-2 bg-slate-100 px-4 py-2 rounded-md`}
            onChangeText={newPasswordHandler}
            secureTextEntry={true}
          />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={tw`mt-2 bg-slate-100 px-4 py-2 rounded-md`}
            onChangeText={confirmPasswordHandler}
            secureTextEntry={true}
          />
          <View style={tw`mb-10 p-4 bg-slate-900 rounded-md mt-4`}>
            {!loading ? (
              <Text
                style={tw`text-white text-center font-bold`}
                onPress={submitHandler}
              >
                Update Password
              </Text>
            ) : (
              <Text style={tw`text-white text-center font-bold`}>
                Saving...
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create(externalStyle);
export default Profile;
