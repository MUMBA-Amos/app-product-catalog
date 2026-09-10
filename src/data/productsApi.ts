import { ProductResponse } from "./types";

const BASE_URL = "https://dummyjson.com";

export async function fetchProducts(skip: number): Promise<ProductResponse>{

    const response = await fetch(`${BASE_URL}/products?limit=20&skip=${skip}`);

    if (!response.ok){
        throw new Error(`Failed to fetch products:
    ${response.status}`);
    }

    return response.json();
    

}