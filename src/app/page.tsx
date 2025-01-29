


import CustomerCarousel from "@/components/Customer";
import Hero from "@/components/Herro";
import FontShowcase from "@/components/Retangle";

import Dress from "./brands/page";
import Products from "./product/page";
import Topsell from "./product/sell";





export default async function Home() {

  return (
 <div>
 
  <Hero/>
   
    
    <FontShowcase/>

    <Products/>
   <Topsell/>
  
    
     <Dress/>
     <CustomerCarousel/> 



 </div>
  );
}

