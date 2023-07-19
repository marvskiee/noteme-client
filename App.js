import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { externalStyle } from "./style/externalStyle";
import tw from "twrnc";

import Register from "./components/Register";
import Login from "./components/Login";
import Compose from "./components/Compose";
import Profile from "./components/Profile";
import Shared from "./components/Shared";
import Notes from "./components/Notes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectedNote from "./components/SelectedNote";
import EditNote from "./components/EditNote";
import colors from "./config/colors";
const App = () => {
  //loading state
  const [loading, setLoading] = useState(true);

  //notes container
  const [notes, setNotes] = useState([]);
  //cache new user
  const [cache, setCache] = useState("");

  //profile container
  const [profile, setProfile] = useState(null);

  //switch page
  const [page, setPage] = useState("splash");
  const switchPage = (newPage) => {
    setPage(newPage);
  };

  //setup token
  const [token, setToken] = useState("");
  const updateToken = (value) => {
    setToken(value);
  };

  //check if token exist
  const getData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      const storedCache = await AsyncStorage.getItem("cache");
      if (storedToken !== null) {
        setToken(storedToken);
      }
      if (storedCache !== null) {
        setCache(storedCache);
      }
    } catch (e) {
      console.log("Warning Occur in App.js: " + e.message);
    } finally {
      setLoading(false);
    }
  };
  //setup splash screen for new user
  const storeData = async () => {
    try {
      await AsyncStorage.setItem("cache", "true");
    } catch (e) {
      console.log("App.js: " + e);
    } finally {
      switchPage("register");
    }
  };

  //selected note
  const [selectedNote, setSelectedNote] = useState("");

  //component life cycle mount
  const mounted = useRef();
  useEffect(() => {
    const load = async () => {
      if (!mounted.current) {
        mounted.current = true;
        await getData();
      } else {
        if (page == "splash") {
          if (cache == "true") {
            if (token) {
              setPage("notes");
            } else {
              setPage("login");
            }
          }
        }
      }
    };
    load();
  });

  if (page == "splash") {
    if (!loading) {
      return (
        <View
          style={{
            width: "100%",
            padding: 40,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text style={tw`mb-3 text-4xl text-indigo-600 font-bold`}>
            Note Me
          </Text>
          <Text style={tw`text-slate-600 leading-6 my-1`}>
            is a simple and awesome notepad app. It gives you a quick and simple
            notepad editing experience when you write notes
          </Text>
          <View style={tw`p-4 bg-slate-900 rounded-md mt-4`}>
            <Text
              style={tw`text-white text-center font-bold`}
              onPress={() => {
                storeData();
              }}
            >
              Start Now
            </Text>
          </View>
          <StatusBar style="auto" />
        </View>
      );
    } else {
      return (
        <View>
          <Text></Text>
        </View>
      );
    }
  } else if (page == "register") {
    return <Register action={switchPage} />;
  } else if (page == "login") {
    return (
      <Login action={switchPage} get_token={token} set_token={updateToken} />
    );
  } else if (page == "notes") {
    return (
      <Notes
        action={switchPage}
        get_notes={notes}
        set_notes={setNotes}
        get_token={token}
        set_selected={setSelectedNote}
        get_selected={selectedNote}
      />
    );
  } else if (page == "profile") {
    return (
      <Profile
        action={switchPage}
        set_notes={setNotes}
        set_profile={setProfile}
        get_profile={profile}
        get_token={token}
        set_token={updateToken}
      />
    );
  } else if (page == "shared") {
    return <Shared action={switchPage} />;
  } else if (page == "compose") {
    return (
      <Compose
        action={switchPage}
        data={notes}
        setData={setNotes}
        get_token={token}
      />
    );
  } else if (page == "selected-note") {
    return <SelectedNote action={switchPage} get_selected={selectedNote} />;
  } else if (page == "edit-note") {
    return (
      <EditNote
        action={switchPage}
        get_selected={selectedNote}
        set_selected={setSelectedNote}
      />
    );
  }
};
const styles = StyleSheet.create(externalStyle);
export default App;
