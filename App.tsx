import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ProductListScreen } from "./src/ui/screens/ProductListScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductDetailScreen } from "./src/ui/screens/ProductDetailScreen";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "#FFD3BF" },
          headerStyle: { backgroundColor: "#FFD3BF" },
        }}
      >
        <Stack.Screen name="List" component={ProductListScreen} />
        <Stack.Screen name="Detail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator();
