import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ProductListScreen } from './src/ui/screens/ProductListScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProductListScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}