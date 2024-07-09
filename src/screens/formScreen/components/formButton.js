import { useContext } from "react";
import { FormContext } from "../../../store/FormContext";
import { Pressable, StyleSheet, Text } from "react-native";
import { primary } from "../../../styles/colors";

const FormButton = ({ values, handleSubmit }) => {
  const { state } = useContext(FormContext);

  return (
    <>
      {state.currentStep === state.steps.length - 1 && (
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor:
                (values[`5_1`] == 1 && (!values[`6_1`] || !values[`6_2`])) ||
                !values[`5_1`]
                  ? "#F2F5F9"
                  : primary,
            },
          ]}
          onPress={handleSubmit}
          disabled={
            (values[`5_1`] == 1 && (!values[`6_1`] || !values[`6_2`])) ||
            !values[`5_1`]
          }
        >
          <Text
            style={{
              color:
                (values[`5_1`] == 1 && (!values[`6_1`] || !values[`6_2`])) ||
                !values[`5_1`]
                  ? "black"
                  : "white",
            }}
          >
            Review Profile
          </Text>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 10,
    flexDirection: "row",
    height: 58,
    width: "90%",
  },
});
export default FormButton;
