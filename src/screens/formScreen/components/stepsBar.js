import { useContext } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
} from "react-native";
import { FormContext } from "../../../store/FormContext";
import { ACTION_TYPES } from "../../../store/reducer";
import { imageIconMapping } from "../constants";
import { grey, lightPrimary, primary } from "../../../styles/colors";

const StepsBar = ({ scrollViewRef }) => {
  const { state, dispatch } = useContext(FormContext);
  const countAnsweredInputs = (questions) => {
    return questions.reduce((stepAnswered, question) => {
      const answeredInQuestion = question.inputs.reduce(
        (inputAnswered, input) => {
          return inputAnswered + (input.answer !== null ? 1 : 0);
        },
        0
      );
      return stepAnswered + answeredInQuestion;
    }, 0);
  };
  const handleStepPress = (index) => {
    dispatch({
      payload: [
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: `currentStep`,
          value: index,
        },
      ],
    });

    scrollViewRef.current?.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
  };
  const getIconSource = (item, index) => {
    const progress =
      (countAnsweredInputs(item.questions) * 100) / item.questions.length;
    const isComplete = progress === 100;

    if (state.currentStep === index) {
      return isComplete
        ? imageIconMapping[index].complete
        : imageIconMapping[index].active;
    } else {
      return isComplete
        ? imageIconMapping[index].complete
        : imageIconMapping[index].default;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16 }}>
        Step {state.currentStep + 1} : Fill Form
      </Text>
      <View style={styles.progressContainer}>
        {state.steps.map((item, index) => (
          <View style={[styles.stepWrapper]} key={index}>
            <View style={{ width: "100%" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.circleContainer}
                  onPress={() => handleStepPress(index)}
                >
                  <View
                    style={[
                      styles.circle,
                      state.currentStep >= index && styles.activeCircle,
                      (countAnsweredInputs(item.questions) * 100) /
                        item.questions.length ==
                        100 && styles.completeCircle,
                    ]}
                  >
                    <Image
                      source={getIconSource(item, index)}
                      style={{ width: 17, height: 17 }}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>

                {index < state.steps.length - 1 && (
                  <View style={styles.lineContainer}>
                    <Animated.View
                      style={[
                        StyleSheet.absoluteFill,
                        styles.line,
                        {
                          backgroundColor: primary,
                          width: `${
                            (countAnsweredInputs(item.questions) * 100) /
                            item.questions.length
                          }%`,
                        },
                        state.currentStep > index && styles.activeLine,
                      ]}
                    />
                  </View>
                )}
              </View>
              <Text
                style={[
                  styles.label,
                  state.currentStep >= index && styles.activeLabel,
                ]}
              >
                {item.step}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
const screenWidth = Dimensions.get("window").width;
const stepWidth = (screenWidth * 0.8) / 3;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    // flex: 1,
    // borderWidth: 1,
    // borderColor: "red",
    paddingVertical: 30,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: screenWidth * 0.8,
    marginTop: 20,
    justifyContent: "center",
    marginLeft: "15%",
  },
  stepWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: stepWidth,
    // borderWidth: 1,
    // borderColor: "blue",
  },
  circleContainer: {
    alignItems: "center",
    zIndex: 1,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: grey,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5, //#CAEDE9
  },
  activeCircle: {
    backgroundColor: lightPrimary,
  },
  completeCircle: { backgroundColor: primary },
  lineContainer: {
    flex: 1,
    height: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: grey,
  },
  line: {
    height: "100%",
    width: "100%",
  },
  activeLine: {
    width: "100%",
    backgroundColor: primary,
  },
  label: {
    color: "#9e9e9e",
    marginTop: 5,
    marginHorizontal: -10,
  },
  activeLabel: {
    color: primary,
  },
});

export default StepsBar;
