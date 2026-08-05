import { Product } from "@/types/product";



export function productExist(codigo: number,products: Product[]): boolean {
    return products.some((product) => product.codigo === codigo);

}