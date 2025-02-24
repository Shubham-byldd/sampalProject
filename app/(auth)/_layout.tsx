import React from "react";
import { Stack, Tabs } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
    </Stack>
  );
};

export default AuthLayout;
