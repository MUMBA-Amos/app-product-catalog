import { useProducts } from "../../hooks/useProducts";
import {View, Text, FlatList,TextInput,Pressable} from "react-native";


export function ProductListScreen({navigation}:any){
    const {state,loadMore,query,setQuery} = useProducts();

    if (state.status ==="loading"){
        return <Text>Loading....</Text>;
    }

    if(state.status ==="empty"){
        return <Text>No products found</Text>;
    }

    if (state.status === "error") {
    return <Text>{state.message}</Text>;
    }


    return(
        <View style={{flex:1}}>
        <TextInput
        placeholder="Search products"
        value={query}
        onChangeText={setQuery}
        style={{ padding: 12, borderWidth: 1, margin: 12 }}
        />

        <FlatList
        data={state.products}
        keyExtractor={(item)=> item.id.toString()}
            renderItem={({item}) => (
            <Pressable onPress={() => navigation.navigate("Detail", { id: item.id })}>
                <Text>{item.title}</Text>
            </Pressable>
)}        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        />
        </View>

        
    )




}



