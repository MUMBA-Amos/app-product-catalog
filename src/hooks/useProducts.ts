import { fetchProducts,searchProducts } from '../data/productsApi';
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
    const [query, setQuery] = useState("");

    function load(nextSkip: number, reset:boolean){

        fetchProducts(nextSkip)
          .then((response)=>{
            setTotal(response.total);
            setSkip(nextSkip+20)

            //Now we are gonna set the prev
            setState((prev)=>{
              if (!reset && prev.status ==="success"){
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
    load(skip, false);
      }
    }

   

useEffect(() => {
  const timer = setTimeout(() => {
    if (query === "") {
      setSkip(0);
      load(0,true);
    } else {
      searchProducts(query)
        .then((response) => {
          if (response.products.length === 0) {
            setState({ status: "empty" });
          } else {
            setState({ status: "success", products: response.products });
          }
        })
        .catch((err) => {
          setState({ status: "error", message: err.message });
        });
    }
  }, 400);

  return () => clearTimeout(timer);
}, [query]);



return { state, loadMore, query, setQuery };

}