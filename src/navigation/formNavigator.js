import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import FormScreen from "../screens/formScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const FormNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Form">
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default FormNavigator;
