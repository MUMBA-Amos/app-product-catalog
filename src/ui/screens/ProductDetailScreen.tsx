import { View, Text, Image, ScrollView } from "react-native";
import { useProduct } from "../../hooks/useProduct";

export function ProductDetailScreen({ route }: any) {
    const { id } = route.params;
    const { state } = useProduct(id);

    if (state.status === "loading") {
        return <Text>Loading...</Text>;
    }

    if (state.status === "error") {
        return (
            <View style={{ padding: 24, alignItems: "center" }}>
                <Text style={{ marginBottom: 12 }}>
                    Couldn't load this product. Check your connection.
                </Text>
            </View>
        );
    }

    return (
        <ScrollView style={{ backgroundColor: "#FFD3BF" }}>

            {state.product.images.length > 1 && (
                <Text style={{ textAlign: "center", paddingTop: 12, fontSize: 12, color: "#666" }}>
                    Swipe for more images
                </Text>
            )}
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                {state.product.images.map((uri) => (
                    <Image
                        key={uri}
                        source={{ uri }}
                        style={{ width: 400, height: 300 }}
                        resizeMode="contain"
                    />
                ))}
            </ScrollView>

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
