import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

const RadioButton = ({ label, selected, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
    <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
      {selected && <View style={styles.radioButtonInner} />}
    </View>
    <Text style={styles.radioButtonLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#0720401A",
    borderRadius: 12,
    padding: 20,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#595C5E",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioButtonSelected: {
    borderColor: "#000",
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 10,
    backgroundColor: "#000",
  },
  radioButtonLabel: {
    fontSize: 16,
    color: "#595C5E",
    fontSize: 14,
    lineHeight: 22,
  },
});

export default RadioButton;
