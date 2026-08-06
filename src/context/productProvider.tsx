import { Product, ProductFormData } from "@/types/product";
import { productExist } from "@/utils/products";
import { ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProductContext } from "./productContext";

  
interface Props {
    children: ReactNode
}
  

  
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
  