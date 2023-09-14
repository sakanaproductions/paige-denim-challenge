'use client';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation'

type Product = {
  id: string,
  sku: string, 
  name: string,
  type: string,
  description: string,
  color: string,
  price: number
}

type FormData = {
  name: string
  type: string
  description: string,
  color: string,
  price: number
}

export default function Page({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  useEffect(() =>{
    try {
      fetch('https://gist.githubusercontent.com/sakanaproductions/891d1e4a384583b6a4ce9d33daca8043/raw/d518ac96a5e1053826be4565a02c110ee14ab677/product-fixtures.json')
        .then(async (response: Response) => {
          const products: Product[] = await response.json()
          const product = products.find((product: any) => product.id === params.id)
          setProduct(product as Product);
        })
    } catch (e) {
      console.error(e);
     }
  }, [params.id]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    alert('Data Saved');
    router.back();
    console.log(data);
  }


  return (
    <>
      {product && (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-gray-700 text-sm font-bold mb-2">Name</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={product.name} {...register("name", { required: true, maxLength: 56 })} />
          {errors.name?.type === "maxLength" && (
            <p role="alert">Name is too long</p>
          )}
          {errors?.name?.type === "required" && (
            <p role="alert">Name is required</p>
          )}
          <label className="text-gray-700 text-sm font-bold my-2">Type</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={product.type} {...register("type", { required: true, maxLength: 56 })} />
          {errors.type?.type === "maxLength" && (
            <p role="alert">Type is too long</p>
          )}
          {errors.type?.type === "required" && (
            <p role="alert">Type is required</p>
          )}
          <label className="text-gray-700 text-sm font-bold my-2">Description</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={product.description} {...register("description", { required: true, maxLength: 56 })} />
          {errors.description?.type === "maxLength" && (
            <p role="alert">Description is too long</p>
          )}
          {errors.description?.type === "required" && (
            <p role="alert">Description is required</p>
          )}
          <label className="text-gray-700 text-sm font-bold my-2">Color</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={product.color} {...register("color", { required: true, maxLength: 56 })} />
          {errors.color?.type === "maxLength" && (
            <p role="alert">Color is too long</p>
          )}
          {errors.color?.type === "required" && (
            <p role="alert">Color is required</p>
          )}
          <label className="text-gray-700 text-sm font-bold my-2">Price</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" defaultValue={product.price} {...register("price", { required: true, min: 0 })} />
          {errors.price && (
            <p role="alert">Price is required and must be greater than 0</p>
          )}

          <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="submit" />
        </form>
      )}
    </>
  )
}