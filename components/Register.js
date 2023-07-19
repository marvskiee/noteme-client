import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import tw from "twrnc";

import { externalStyle } from "../style/externalStyle";
import config from "../config/axios_config";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const message = useRef();
  const isSuccess = useRef();
  const [loading, setLoading] = useState(false);
  const nameHandler = (value) => {
    setName(value);
  };
  const emailHandler = (value) => {
    setEmail(value);
  };
  const passwordHandler = (value) => {
    setPassword(value);
  };
  const confirmPasswordHandler = (value) => {
    setConfirmPassword(value);
  };

  const onSubmit = async () => {
    setLoading(true);
    message.current = [];
    const user = {
      name,
      email,
      password,
      confirmPassword,
    };
    await config
      .post("user/register", user)
      .then((res) => {
        if (res.data.status == "ok") {
          isSuccess.current = true;
          console.log("succcess");
        } else {
          isSuccess.current = false;
        }
        message.current = res.data?.message;
      })
      .catch((error) => {
        isSuccess.current = false;
        message.current = error?.message;
      });
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.splashForm}>
        <Text style={styles.splashText1}>Create an account</Text>
        {message.current?.length > 0 && (
          <View
            style={tw`px-4 py-3 rounded-md ${
              isSuccess.current ? "bg-emerald-100" : "bg-rose-100"
            }`}
          >
            {message.current?.map((data, key) => (
              <Text
                key={key}
                style={tw`${
                  isSuccess.current ? "text-emerald-500" : "text-rose-500"
                } py-1`}
              >
                {data}
              </Text>
            ))}
          </View>
        )}
        <TextInput
          style={tw`mt-2 bg-slate-100 px-4 py-2 rounded-md`}
          onChangeText={nameHandler}
          placeholder="Name"
          autoFocus={true}
        />
        <TextInput
          style={tw`mt-2 bg-slate-100 px-4 py-2 rounded-md`}
          onChangeText={emailHandler}
          placeholder="Email"
        />
        <TextInput
          style={tw`mt-2 bg-slate-100 px-4 py-2 rounded-md`}
          onChangeText={passwordHandler}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextInput
          style={tw`mt-2 bg-slate-100 px-4 py-2 rounded-md`}
          onChangeText={confirmPasswordHandler}
          placeholder="Confirm Password"
          secureTextEntry={true}
        />
        <View style={tw`p-4 bg-slate-900 rounded-md mt-4`}>
          {!loading ? (
            <Text
              style={tw`text-white text-center font-bold`}
              onPress={onSubmit}
            >
              Sign Up
            </Text>
          ) : (
            <Text style={tw`text-white text-center font-bold`}>
              Analyzing Data...
            </Text>
          )}
        </View>
        <Text style={styles.text} onPress={() => props.action("notes")}>
          Already have an account? &nbsp;
          <Text
            style={tw`text-indigo-500 underline`}
            onPress={() => props.action("login")}
          >
            Login here
          </Text>
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create(externalStyle);
export default Register;
