import { useContext, useRef } from "react";
import { FormContext } from "../../../store/FormContext";
import QuestionInput from "./questionInput";
import { StyleSheet, Text, View } from "react-native";

const StepQuestions = ({ values, setFieldValue, scrollViewRef }) => {
  const { state } = useContext(FormContext);
  const questionPositions = useRef([]);

  const handleLayout = (index, event) => {
    const layout = event.nativeEvent.layout;
    questionPositions.current[index] = layout;
  };

  const isQuestionAnswered = (stepIndex, questionIndex) => {
    for (let i = 0; i < stepIndex; i++) {
      const stepQuestions = state.steps[i].questions;
      for (let j = 0; j < stepQuestions.length; j++) {
        if (stepQuestions[j].inputs.some((input) => input.answer === null)) {
          return false;
        }
      }
    }
    if (stepIndex === state.currentStep) {
      for (let i = 0; i < questionIndex; i++) {
        const question = state.steps[stepIndex].questions[i];
        if (question.inputs.some((input) => input.answer === null)) {
          return false;
        }
      }
    }
    return true;
  };
  return (
    <>
      {state.steps[state.currentStep].questions.map((q, index) => {
        if (q.id == 6 && (values[`5_1`] == 2 || !values[`5_1`])) return null;
        return (
          <View
            key={index}
            onLayout={(event) => handleLayout(index, event)}
            style={{
              opacity: !isQuestionAnswered(state.currentStep, index) ? 0.4 : 1,
              pointerEvents: !isQuestionAnswered(state.currentStep, index)
                ? "none"
                : "auto",
            }}
          >
            <View>
              <Text style={styles.questionText}>{q.question}</Text>
              {q.description && (
                <Text style={styles.description}>{q.description}</Text>
              )}
            </View>

            {q.inputs.map((input, inputIndex) => {
              return (
                <QuestionInput
                  key={inputIndex}
                  question={q}
                  questionIndex={index}
                  input={input}
                  inputIndex={inputIndex}
                  setFieldValue={setFieldValue}
                  values={values}
                  scrollViewRef={scrollViewRef}
                  questionPositions={questionPositions}
                />
              );
            })}
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    color: "#595C5E",
  },
});
export default StepQuestions;
