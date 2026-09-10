import { useProducts } from "../../hooks/useProducts";
import {View, Text, FlatList} from "react-native";

export function ProductListScreen(){
    const {state} = useProducts();

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
        <FlatList
        data={state.products}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=><Text>{item.title}</Text>}
        />
    )




}



