import { useProducts } from "../../hooks/useProducts";
import {
    View,
    Text,
    FlatList,
    TextInput,
    Pressable,
    Image,
} from "react-native";

export function ProductListScreen({ navigation }: any) {
    const { state, loadMore, query, setQuery } = useProducts();

    function renderContent() {
        if (state.status === "loading") return <Text>Loading....</Text>;
        if (state.status === "error") return <Text>{state.message}</Text>;
        if (state.status === "empty") return <Text>No products found</Text>;

        return (
            <FlatList
                data={state.products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => navigation.navigate("Detail", { id: item.id })}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                padding: 12,
                                alignItems: "center",
                            }}
                        >
                            <Image
                                source={{ uri: item.thumbnail }}
                                style={{ width: 56, height: 56, borderRadius: 8 }}
                            />
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text>{item.title}</Text>
                                <Text>${item.price}</Text>
                            </View>
                        </View>
                    </Pressable>
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
            />
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                placeholder="Search products"
                value={query}
                onChangeText={setQuery}
                style={{ padding: 12, borderWidth: 1, margin: 12 }}
            />
            {renderContent()}
        </View>
    );
}