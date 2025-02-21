import { Product } from "@/types/products"

export function addToCart(product: Product, quantity: number) {
    const cart = getCartItems() || [];
    const existingItem = cart.find((item) => item._id === product._id && item.selectedColor === product.selectedColor && item.selectedSize === product.selectedSize);
  
    if (existingItem) {
      if (existingItem.quantity != null) {
        existingItem.quantity += quantity;
      }
    } else {
      cart.push({ ...product, quantity });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  


export const removeFromCart = (productId:string) =>{
    let cart : Product[] = JSON.parse(localStorage.getItem("cart")||"[]")

  cart=  cart.filter (item => item._id !== productId)

    localStorage.setItem("cart",JSON.stringify(cart))
}


export const updateCartQuantity = (productId:string, stock:number) =>{
    const cart :Product[] = JSON.parse(localStorage.getItem("cart")||"[]")

    const productIndex = cart.findIndex(item=> item._id === productId)

        if(productIndex > -1){
            cart[productIndex].quantity = stock; 
            localStorage.setItem('cart',JSON.stringify(cart))
        }
    
}
export const getCartItems = ():Product[]=>{
    return JSON.parse(localStorage.getItem("cart")||"[]")
}
