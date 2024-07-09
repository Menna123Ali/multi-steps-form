import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

const AppSelect = ({ label, selectedValue, onValueChange, options, style }) => {
  const [isFocused, setIsFocused] = useState(false);

  const floatingLabelStyle = {
    position: "absolute",
    left: 10,
    top: !isFocused && !selectedValue ? 18 : -10,
    fontSize: 12,
    color: "#595C5E",
    backgroundColor: "white",
    paddingHorizontal: 2,
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, floatingLabelStyle]}>{label}</Text>}

      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        mode="dropdown"
        style={[styles.picker, { color: selectedValue ? "black" : "gray" }]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <Picker.Item label="" value="" />
        {options.map((option) => (
          <Picker.Item key={option.id} label={option.label} value={option.id} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#0720401A",
    borderRadius: 12,
    height: 50,
    width: "100%",
    position: "relative",
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
  },
  picker: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default AppSelect;
