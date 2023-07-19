import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { externalStyle } from "../style/externalStyle";
import config from "../config/axios_config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const message = useRef();
  const [loading, setLoading] = useState(false);

  const emailHandler = (value) => {
    setEmail(value);
  };
  const passwordHandler = (value) => {
    setPassword(value);
  };

  const mounted = useRef();
  useEffect(() => {
    const load = async () => {
      if (!mounted.current) {
        mounted.current = true;
      } else {
        if (props.get_token) {
          props.action("notes");
        }
        // do componentDidUpdate logic
      }
    };
    load();
  });

  const storeData = async (token) => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (e) {
      // saving error
    } finally {
      props.set_token(token);
    }
  };
  const onSubmit = async () => {
    setLoading(true);
    message.current = [];

    const user = {
      email,
      password,
    };
    await config
      .post("user/login", user)
      .then((res) => {
        if (res.data.status == "ok") {
          storeData(res.data._id);
        } else {
          message.current = res.data?.message;
        }
      })
      .catch((error) => {
        console.log(error);
        message.current = error?.message;
      });
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.splashForm}>
        <Text style={styles.splashText1}>Welcome back</Text>
        {message?.current &&
          message?.current?.map((data, key) => (
            <View key={key} style={tw`px-4 py-3 rounded-md bg-rose-100`}>
              <Text style={tw`text-rose-500 py-1`}>{data}</Text>
            </View>
          ))}
        <TextInput
          style={tw`mt-2 bg-slate-100 px-4 py-2 rounded-md`}
          onChangeText={emailHandler}
          placeholder="Email"
          autoFocus={true}
        />
        <TextInput
          style={tw`mt-2 bg-slate-100 px-4 py-2 rounded-md`}
          onChangeText={passwordHandler}
          placeholder="Password"
          secureTextEntry={true}
        />
        <View style={tw`p-4 bg-slate-900 rounded-md mt-4`}>
          {!loading ? (
            <Text
              style={tw`text-white text-center font-bold`}
              onPress={onSubmit}
            >
              Log In
            </Text>
          ) : (
            <Text style={tw`text-white text-center font-bold`}>
              Fetching Data...
            </Text>
          )}
        </View>
        <Text style={styles.text} onPress={() => props.action("notes")}>
          Don't have an account?&nbsp;
          <Text
            style={tw`text-indigo-500 underline`}
            onPress={() => props.action("register")}
          >
            Register here
          </Text>
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create(externalStyle);
export default Login;
