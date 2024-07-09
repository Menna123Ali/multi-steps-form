import { Formik } from "formik";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { useRef } from "react";
import { FormContext } from "../../store/FormContext";
import StepsBar from "./components/stepsBar";
import StepQuestions from "./components/stepQuestions";
import FormButton from "./components/formButton";
import { imageMapping } from "./constants";

const FormScreen = () => {
  const scrollViewRef = useRef(null);

  const { state } = useContext(FormContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StepsBar scrollViewRef={scrollViewRef} />
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
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginVertical: 25,
                    }}
                  >
                    {state.steps[state.currentStep].step}
                  </Text>
                  <Image
                    source={imageMapping[state.currentStep]}
                    resizeMode="cover"
                  />
                </View>
                <StepQuestions {...formikBag} scrollViewRef={scrollViewRef} />
              </View>
            </ScrollView>
            <FormButton {...formikBag} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default FormScreen;
