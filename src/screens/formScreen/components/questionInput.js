import { View } from "react-native";
import AppSelect from "../../../components/appSelect";
import RadioButton from "../../../components/radioButton";
import { useContext } from "react";
import { FormContext } from "../../../store/FormContext";
import { ACTION_TYPES } from "../../../store/reducer";

const QuestionInput = ({
  question,
  questionIndex,
  input,
  inputIndex,
  values,
  setFieldValue,
  scrollViewRef,
  questionPositions,
}) => {
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
          prop: `steps.${state.currentStep}.questions.${index}.inputs.${inputIndex}.answer`,
          value: optionId,
        },
      ],
    });

    setFieldValue(`${questionId}_${inputId}`, optionId);

    if (index < state.steps[state.currentStep].questions.length - 1) {
      const nextQuestionPosition = questionPositions.current[index + 1];

      if (nextQuestionPosition) {
        scrollViewRef.current?.scrollTo({
          x: 0,
          y: nextQuestionPosition.y,
          animated: true,
        });
      }
    } else {
      if (state.currentStep < state.steps.length - 1) {
        dispatch({
          payload: [
            {
              type: ACTION_TYPES.UPDATE_PROP,
              prop: `currentStep`,
              value: (v) => v + 1,
            },
          ],
        });
        scrollViewRef.current?.scrollTo({
          x: 0,
          y: 0,
          animated: true,
        });
      }
    }
  };

  return (
    <View>
      {input.type === "select" ? (
        <AppSelect
          label={input.label}
          selectedValue={values[`${question.id}_${input.id}`]}
          onValueChange={(value) => {
            setFieldValue(`${question.id}_${input.id}`, value);
          }}
          options={input.options}
        />
      ) : (
        input.options.map((option, i) => {
          return (
            <RadioButton
              key={i}
              label={option.label}
              selected={values[`${question.id}_${input.id}`] == option.id}
              onPress={() =>
                handleOptionSelect(
                  setFieldValue,
                  question.id,
                  input.id,
                  option.id,
                  inputIndex,
                  questionIndex
                )
              }
            />
          );
        })
      )}
    </View>
  );
};

export default QuestionInput;
