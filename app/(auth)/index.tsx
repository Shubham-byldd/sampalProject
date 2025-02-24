import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

const LoginScreeen = () => {
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
          router.push({
            pathname: "/(auth)/register",
            params: { id: 1, name: "shubham" },
          });
        }}
      >
        <Text style={{ fontSize: 16, color: "black" }}>Login screen</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreeen;
