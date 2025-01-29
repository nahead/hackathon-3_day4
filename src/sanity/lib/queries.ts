import { defineQuery } from "next-sanity";

export const allproducts=defineQuery(`
   *[_type=="products"]{
       _id,
       name,
       description,
       price,
       "imageUrl" : image.asset->url,
       category,
       discountPercent,
       "isNew": new,
       colors,
       sizes
     }
    `)
    export const fourproduct=defineQuery(`
        *[_type=="products"][1..4]{
            _id,
            name,
            description,
            price,
            "imageUrl" : image.asset->url,
            category,
            discountPercent,
            "isNew": new,
            colors,
            sizes
          }
         `)
         export const fourproduct1=defineQuery(`
          *[_type=="products"][10..13]{
              _id,
              name,
              description,
              price,
              "imageUrl" : image.asset->url,
              category,
              discountPercent,
              "isNew": new,
              colors,
              sizes
            }
           `)
           