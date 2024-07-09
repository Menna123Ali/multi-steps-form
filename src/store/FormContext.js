import { createContext, useReducer } from "react";
import reducer from "./reducer";

const initState = {
  steps: [
    {
      step: "Personal",
      questions: [
        {
          id: 1,
          question: "Marital Status",
          description: null,
          inputs: [
            {
              id: 1,
              label: null,
              type: "radio",
              options: [
                { id: 1, label: "Single" },
                { id: 2, label: "Engaged" },
                { id: 3, label: "Married" },
                { id: 4, label: "Divorced" },
                { id: 5, label: "Widowed" },
              ],
              answer: null,
            },
          ],
        },
        {
          id: 2,
          question: "Number of dependents",
          description: null,
          inputs: [
            {
              id: 1,
              label: null,
              type: "radio",
              options: [
                { id: 1, label: "0" },
                { id: 2, label: "1" },
                { id: 3, label: "2" },
                { id: 4, label: "+3" },
              ],
              answer: null,
            },
          ],
        },
      ],
    },
    {
      step: "Income",
      questions: [
        {
          id: 3,
          question: "Employment",
          description: null,
          inputs: [
            {
              id: 1,
              label: null,
              type: "radio",
              options: [
                { id: 1, label: "I am employed" },
                { id: 2, label: "I am unemployed" },
                { id: 3, label: "I am a full-time student" },
                { id: 4, label: "I am retired" },
                { id: 5, label: "Other" },
              ],
              answer: null,
            },
          ],
        },
        {
          id: 4,
          question: "Job Type",
          description: null,

          inputs: [
            {
              id: 1,
              label: null,
              type: "radio",
              options: [
                { id: 1, label: "Full-time" },
                { id: 2, label: "Part-time" },
                { id: 3, label: "Self-employed" },
                { id: 4, label: "Other" },
              ],
              answer: null,
            },
          ],
        },
      ],
    },
    {
      step: "Possessions",
      questions: [
        {
          id: 5,
          question: "Car Ownership",
          description: "Do you have a car registered in your name?",

          inputs: [
            {
              id: 1,
              label: null,
              type: "radio",
              options: [
                { id: 1, label: "Yes, I do." },
                { id: 2, label: "No, I don’t." },
              ],
              answer: null,
            },
          ],
        },
        {
          id: 6,
          question: "Car Details",
          description: null,
          inputs: [
            {
              id: 1,
              label: "Car Brand",
              type: "select",
              options: [
                { id: 1, label: "Volkeswagen" },
                { id: 2, label: "Nissan" },
              ],
              answer: null,
            },
            {
              id: 2,
              label: "Model Year",
              type: "select",
              options: [
                { id: 1, label: "2022" },
                { id: 2, label: "2023" },
              ],
              answer: null,
            },
          ],
        },
      ],
    },
  ],
  currentStep: 0,
};
export const FormContext = createContext();
export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};
