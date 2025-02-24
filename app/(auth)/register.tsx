import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

const RegisterScreen = () => {
  const params = useLocalSearchParams();

  useEffect(() => {
    console.log("parse data==>", params);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable
        onPress={() => {
          router.push("/(tabs)");
        }}
      >
        <Text style={{ fontSize: 16, color: "black" }}>Next To register</Text>
      </Pressable>
    </View>
  );
};

export default RegisterScreen;
