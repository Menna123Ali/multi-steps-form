import { StatusBar } from "react-native";
import FormNavigator from "./src/navigation/formNavigator";
import { FormProvider } from "./src/store/FormContext";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <FormProvider>
        <FormNavigator />
      </FormProvider>
    </>
  );
}
