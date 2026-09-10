import { View, Text, Image, ScrollView } from "react-native";
import { useProduct } from "../../hooks/useProduct";

export function ProductDetailScreen({ route }: any) {
  const { id } = route.params;
  const { state } = useProduct(id);

  if (state.status === "loading") {
    return <Text>Loading...</Text>;
  }

  if (state.status === "error") {
    return <Text>{state.message}</Text>;
  }

  return (
    <ScrollView style={{ backgroundColor: "#FFD3BF" }}>
      <Image
        source={{ uri: state.product.thumbnail }}
        style={{ width: "100%", height: 300 }}
        resizeMode="contain"
      />

      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 4 }}>
          {state.product.title}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
          ${state.product.price}
        </Text>
        <Text style={{ fontSize: 14, color: "#666", marginBottom: 12 }}>
          Rating: {state.product.rating}
        </Text>
        <Text style={{ fontSize: 14, lineHeight: 22 }}>
          {state.product.description}
        </Text>
      </View>
    </ScrollView>
  );
}
