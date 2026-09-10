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
    <ScrollView>
      <Image
        source={{ uri: state.product.thumbnail }}
        style={{ width: "100%", height: 300 }}
      />
      <Text>{state.product.title}</Text>
      <Text>${state.product.price}</Text>
      <Text>Rating: {state.product.rating}</Text>
      <Text>{state.product.description}</Text>
    </ScrollView>
  );

}