import {createContext,useContext,useEffect,useState,ReactNode} from "react";
import { v4 as uuidv4 } from "uuid";
import type {Product,ProductFormData} from "../types/product";
import { productExist } from "@/utils/products";
  
interface ProductContextType {
  
    products: Product[];
    addProduct:(product: ProductFormData)=>boolean;
    removeProduct:(id:string)=>void;
  
}
  
interface Props {
    children: ReactNode
}
  
  
const ProductContext = createContext<ProductContextType | undefined>(undefined);
  
  
export function ProductProvider({children}: Props){
    
        const [products,setProducts] =useState<Product[]>(()=>{
        const stored =localStorage.getItem("products");

        return stored? JSON.parse(stored): []
        });
  

        useEffect(()=>{
            localStorage.setItem("products",JSON.stringify(products));
        },[products]);
  
  
  
    const addProduct =(data:ProductFormData)=>{
        if (productExist(data.codigo, products)) {
          return false;
        }

        const newProduct: Product = {
            ...data,
            id: uuidv4(),
            creacion: new Date().toISOString(),
        };

        setProducts((prev) => [
            ...prev,
            newProduct,
        ]);

        return true;
    };
  
  
    const removeProduct =(id:string)=>{
      setProducts(prev=>
        prev.filter(
          product=>product.id !== id
        )
      );
    };
  
  
  return (
        <ProductContext.Provider value={{products,addProduct,removeProduct}}>

            {children}

        </ProductContext.Provider>
    )
  
  }
  
  
  export function useProducts(){
  
    const context =useContext(ProductContext);
  
    if(!context){
      throw new Error("useProducts debe usarse dentro de ProductProvider");
    }

    return context;
  
  }