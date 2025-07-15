import React, { Component } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default class Home extends Component {
  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>Home</Text>
        </View>
      </SafeAreaView>
    );
  }
}
