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
    const [skip, setSkip]=useState(0);
    const [total, setTotal] = useState(0);


    function load(nextSkip: number){

        fetchProducts(nextSkip)
          .then((response)=>{
            setTotal(response.total);
            setSkip(nextSkip+20)

            //Now we are gonna set the prev
            setState((prev)=>{
              if (prev.status ==="success"){
                  return { status: "success", products: [...prev.products, ...response.products] };
              }
                return { status: "success", products: response.products };

            });

          })

        .catch((err)=>{
            setState({ status: "error", message: err.message });
        })
       

        


    }

    function loadMore() {
     if (skip < total) {
    load(skip);
      }
    }

    useEffect(() => {
    load(0);
    }, []);

    return {state, loadMore};


    
}