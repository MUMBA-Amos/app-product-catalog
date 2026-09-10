import { fetchProducts } from '../data/productsApi';
import { ProductResponse, ApiProduct } from '../data/types'
import {useState, useEffect} from "react";

type ProductState = 
  | {status: "loading"}
  | {status: "empty"}
  | {status: "error"; message: string }
  | {status: "success"; products: ApiProduct[]};


export function useProducts(){
    const [state, setState] = useState<ProductState>({status:"loading"});

    useEffect(()=>{
        fetchProducts(0)
          .then((response)=>{
            setState({status: "success", products:response.products})
          })
          .catch((err)=>{
            setState({status: "error",message: err.message});
          });

    },[]);

    return {state};
}