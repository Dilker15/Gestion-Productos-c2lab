import {createContext} from "react";
import type {Product,ProductFormData} from "../types/product";
  
interface ProductContextType {
  
    products: Product[];
    addProduct:(product: ProductFormData)=>boolean;
    removeProduct:(id:string)=>void;
  
}
  
  
export const ProductContext = createContext<ProductContextType | undefined>(undefined);
  
