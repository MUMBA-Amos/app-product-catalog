import { ApiProduct } from "../data/types";
import { useState, useEffect } from "react";
import { fetchProduct } from "../data/productsApi";

type ProductDetailState =
    | { status: "loading" }
    | { status: "error"; message: string }
    | { status: "success"; product: ApiProduct };

export function useProduct(id: number) {
    const [state, setState] = useState<ProductDetailState>({ status: "loading" });

    useEffect(() => {
        fetchProduct(id)
            .then((response) => {
                setState({ status: "success", product: response });
            })
            .catch((err) => {
                setState({ status: "error", message: err.message });
            });
    }, [id]);

    return { state };
}
