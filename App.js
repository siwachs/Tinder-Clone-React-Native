import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";

//Navigation
import { NavigationContainer } from "@react-navigation/native";

//Custom StackNavigator
import StackNavigator from "./StackNavigator";

//Context...
import { AuthProvider } from "./hooks/useAuth";

//Supress All Warnings...
LogBox.ignoreAllLogs();

//Tailwind CSS
import { TailwindProvider } from "tailwindcss-react-native";

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </TailwindProvider>
      <StatusBar style="auto" hidden={false} />
    </NavigationContainer>
  );
}

{
  /* HOC -->Higher order component -->It wrap chid component.The parent inject all of the functionalty to children. */
}
