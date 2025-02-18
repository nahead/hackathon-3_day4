import { createClient } from "next-sanity";

const client= createClient({
    projectId:'5c51k242',
    dataset:"production",
    useCdn:true,
    
})
export async function sanityFetch({ query, params = {} }: { query: string; params?: Record<string, number> }){
    return await client.fetch(query,params)
}