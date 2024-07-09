import { Formik } from "formik";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
  ScrollView,
  Pressable,
} from "react-native";
import RadioButton from "../../components/radioButton";
import { useRef } from "react";
import { FormContext } from "../../store/FormContext";
import { ACTION_TYPES } from "../../store/reducer";
import AppSelect from "../../components/appSelect";

const FormScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef(null);
  const questionPositions = useRef([]);
  const { state, dispatch } = useContext(FormContext);

  const handleOptionSelect = (
    setFieldValue,
    questionId,
    inputId,
    optionId,
    inputIndex,
    index
  ) => {
    dispatch({
      payload: [
        {
          type: ACTION_TYPES.UPDATE_PROP,
          prop: `steps.${currentStep}.questions.${index}.inputs.${inputIndex}.answer`,
          value: optionId,
        },
      ],
    });

    setFieldValue(`${questionId}_${inputId}`, optionId);

    if (index < state.steps[currentStep].questions.length - 1) {
      const nextQuestionPosition = questionPositions.current[index + 1];

      if (nextQuestionPosition) {
        scrollViewRef.current.scrollTo({
          x: 0,
          y: nextQuestionPosition.y,
          animated: true,
        });
      }
    } else {
      if (currentStep < state.steps.length - 1) {
        setCurrentStep((prevState) => prevState + 1);
        scrollViewRef.current.scrollTo({
          x: 0,
          y: 0,
          animated: true,
        });
      }
    }
  };
  const handleLayout = (index, event) => {
    const layout = event.nativeEvent.layout;
    questionPositions.current[index] = layout;
  };
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={{ fontSize: 16 }}>Step {currentStep + 1} : Fill Form</Text>
        <View style={styles.progressContainer}>
          {state.steps.map((item, index) => (
            <View style={[styles.stepWrapper]} key={index}>
              <View style={{ width: "100%" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.circleContainer}
                    onPress={() => {
                      setCurrentStep(index);
                      scrollViewRef.current.scrollTo({
                        x: 0,
                        y: 0,
                        animated: true,
                      });
                    }}
                  >
                    <View
                      style={[
                        styles.circle,
                        currentStep >= index && styles.activeCircle,
                      ]}
                    >
                      <Text>{index + 1}</Text>
                    </View>
                  </TouchableOpacity>

                  {index < state.steps.length - 1 && (
                    <View style={styles.lineContainer}>
                      <Animated.View
                        style={[
                          StyleSheet.absoluteFill,
                          styles.line,
                          {
                            backgroundColor: "#3EBDAC",
                            width: `${
                              (countAnsweredInputs(item.questions) * 100) /
                              item.questions.length
                            }%`,
                          },
                          currentStep > index && styles.activeLine,
                        ]}
                      />
                    </View>
                  )}
                </View>
                <Text
                  style={[
                    styles.label,
                    currentStep >= index && styles.activeLabel,
                  ]}
                >
                  {item.step}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <Formik
        initialValues={{}}
        onSubmit={(values) => {
          console.log(state.steps);
        }}
      >
        {(formikBag) => (
          <View style={{ flex: 1 }}>
            <ScrollView
              style={{
                flex: 1,
              }}
              contentContainerStyle={{ alignItems: "center" }}
              ref={scrollViewRef}
            >
              <View style={{ flex: 1, width: "90%" }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginVertical: 40,
                  }}
                >
                  {state.steps[currentStep].step}
                </Text>
                {state.steps[currentStep].questions.map((q, index) => {
                  if (
                    q.id == 6 &&
                    (formikBag.values[`5_1`] == 2 || !formikBag.values[`5_1`])
                  )
                    return null;
                  return (
                    <View
                      key={index}
                      onLayout={(event) => handleLayout(index, event)}
                    >
                      <View
                        style={{
                          marginVertical: 20,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            marginVertical: 20,
                          }}
                        >
                          {q.question}
                        </Text>
                        {q.description && (
                          <Text
                            style={{
                              fontSize: 14,
                              color: "#595C5E",
                            }}
                          >
                            {q.description}
                          </Text>
                        )}
                      </View>

                      {q.inputs.map((input, inputIndex) => {
                        return (
                          <View key={inputIndex}>
                            {input.type === "select" ? (
                              <AppSelect
                                label={input.label}
                                selectedValue={
                                  formikBag.values[`${q.id}_${input.id}`]
                                }
                                onValueChange={(value) => {
                                  console.log(value);
                                  formikBag.setFieldValue(
                                    `${q.id}_${input.id}`,
                                    value
                                  );
                                }}
                                options={input.options}
                                // style={styles.select}
                              />
                            ) : (
                              input.options.map((option, i) => {
                                return (
                                  <RadioButton
                                    key={i}
                                    label={option.label}
                                    selected={
                                      formikBag.values[`${q.id}_${input.id}`] ==
                                      option.id
                                    }
                                    onPress={() =>
                                      handleOptionSelect(
                                        formikBag.setFieldValue,
                                        q.id,
                                        input.id,
                                        option.id,
                                        inputIndex,
                                        index
                                      )
                                    }
                                  />
                                );
                              })
                            )}
                          </View>
                        );
                      })}
                    </View>
                  );
                })}

                {/* <PersonalStep {...formikBag} /> */}
              </View>
            </ScrollView>
            {currentStep === state.steps.length - 1 && (
              <Pressable
                style={{
                  borderRadius: 7,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  paddingVertical: 10,
                  flexDirection: "row",
                  backgroundColor:
                    (formikBag.values[`5_1`] == 1 &&
                      (!formikBag.values[`6_1`] || !formikBag.values[`6_2`])) ||
                    !formikBag.values[`5_1`]
                      ? "#F2F5F9"
                      : "#3EBDAC",
                  height: 58,
                  width: "90%",
                }}
                onPress={formikBag.handleSubmit}
                disabled={
                  (formikBag.values[`5_1`] == 1 &&
                    (!formikBag.values[`6_1`] || !formikBag.values[`6_2`])) ||
                  !formikBag.values[`5_1`]
                }
              >
                <Text
                  style={{
                    color:
                      (formikBag.values[`5_1`] == 1 &&
                        (!formikBag.values[`6_1`] ||
                          !formikBag.values[`6_2`])) ||
                      !formikBag.values[`5_1`]
                        ? "black"
                        : "white",
                  }}
                >
                  Review Profile
                </Text>
              </Pressable>
            )}
          </View>
        )}
      </Formik>
    </SafeAreaView>
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
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5, //#CAEDE9
  },
  activeCircle: {
    backgroundColor: "#CAEDE9",
  },
  lineContainer: {
    flex: 1,
    height: 4,
    justifyContent: "center",
    alignItems: "center",

    // height: 20,
    // flexDirection: "row",
    // width: "100%",
    backgroundColor: "#F3F4F5",
    // borderColor: "#000",
    // borderWidth: 2,
    // borderRadius: 5,
  },
  line: {
    height: "100%",
    width: "100%",
    // backgroundColor: "#F3F4F5",
  },
  activeLine: {
    width: "100%",
    backgroundColor: "#3EBDAC",
  },
  label: {
    color: "#9e9e9e",
    marginTop: 5,
    marginHorizontal: -10,
    // textAlign: "center",
  },
  activeLabel: {
    color: "#3EBDAC",
  },
});

export default FormScreen;
