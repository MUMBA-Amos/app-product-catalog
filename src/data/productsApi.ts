import { ProductResponse, ApiProduct } from "./types";


// The address of the API we get product data from.
// Each function below adds its own path onto the end of this.
const BASE_URL = "https://dummyjson.com";

export async function fetchProducts(skip: number): Promise<ProductResponse>{
    const response = await fetch(`${BASE_URL}/products?limit=20&skip=${skip}`);
    if (!response.ok){
        throw new Error(`Failed to fetch products:
    ${response.status}`);
    }
    return response.json();
}


export async function fetchProduct(id: number):Promise<ApiProduct>{
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok){
        throw new Error(`Failed to fetch products:
    ${response.status}`);
    }
    return response.json();
}


export async function searchProducts(query: string):Promise<ProductResponse>{
    const response = await fetch(`${BASE_URL}/products/search?q=${query}`);
    if (!response.ok){
        throw new Error(`Failed to fetch products:
    ${response.status}`);
    }
    return response.json();
    

}