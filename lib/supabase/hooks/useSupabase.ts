import { useEffect, useState } from "react"
import { supabase } from "../products";

export const useSupabase = () => { 
    const [products, setProducts] = useState<any>([]);
    const [filterData, setFilterData] = useState<any>([]);
    const [singleProduct, setSingleProduct] = useState<any>([]);
    const [mensProduct, setMensProduct] = useState<any>([]);
    const [womensProduct, setWomensProduct] = useState<any>([]);
    const [electronicProducts,setElectronicProducts] = useState<any>([]);
    const [backpackProducts,setBackpackProducts] = useState<any>([]);
    const [jewelleryProducts,setJewelleryProducts] = useState<any>([]);

    const getDataFromSupabase = async () => {
        let {data, error} = await supabase.from('product').select("*");
        if(data){
            setProducts(data); 
        }
        if(error){
            console.log(error);
        }
    }

    const getFilteredData = async (query:string) => {
        let {data, error} = await supabase.from('product').select("*").or(`title.ilike.%${query}%, description.ilike.%${query}%, category.ilike.%${query}%`); // cloth
        if(data){
            setFilterData(data); 
        }
        if(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getDataFromSupabase
    })

    const getSingleProduct =async (id:number)=>{
        let {data,error} = await supabase.from('product').select('*').eq('id',id);
        if(data){
            setSingleProduct(data);
        }
        if(error){
            console.log(error);
        }

    }

    const getMensClothing =async ()=>{
        let {data,error} = await supabase.from('product').select('*').ilike('category',`men's clothing`);
        if(data){
            setMensProduct(data);
        }
        if(error){
            console.log(error);
        }

    }

    const getWomensClothing =async ()=>{
        let {data,error} = await supabase.from('product').select('*').ilike('category',`women's clothing`);
        if(data){
            setWomensProduct(data);
        }
        if(error){
            console.log(error);
        }

    }

    const getElectronics =async ()=>{
        let {data,error} = await supabase.from('product').select('*').ilike('category',`electronics`);
        if(data){
            setElectronicProducts(data);
        }
        if(error){
            console.log(error);
        }

    }

    const getBackpack =async ()=>{
        let {data,error} = await supabase.from('product').select('*').ilike('category',`backpack`);
        if(data){
            setBackpackProducts(data);
        }
        if(error){
            console.log(error);
        }

    }

    const getJewellery =async ()=>{
        let {data,error} = await supabase.from('product').select('*').ilike('category',`jewellery`);
        if(data){
            setJewelleryProducts(data);
        }
        if(error){
            console.log(error);
        }

    }

   
    return {
        products, 
        getDataFromSupabase,
        filterData,
        getFilteredData,
        singleProduct,
        getSingleProduct,
        mensProduct,
        getMensClothing,
        womensProduct,
        getWomensClothing,
        electronicProducts,
        getElectronics,
        backpackProducts,
        getBackpack,
        jewelleryProducts,
        getJewellery

    };
}