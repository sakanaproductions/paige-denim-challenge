'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link'


export default function Page() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [curColor, setCurColor] = useState('');

  useEffect(() =>{
    try {
      fetch('https://gist.githubusercontent.com/sakanaproductions/891d1e4a384583b6a4ce9d33daca8043/raw/d518ac96a5e1053826be4565a02c110ee14ab677/product-fixtures.json')
        .then(async (response: Response) => {
          const products = await response.json()
          setProducts(products);
          setFilteredProducts(products);

          const uniqueColors = [ ...new Set(products.map((product: any) => product.color)) ] as any;
          setColors(uniqueColors);
        })
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() =>{
    if (curColor) {
      const filtered = products.filter((product: any) => product.color === curColor);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [curColor, products]);

  const handleColorChange = (e: any) => {
    setCurColor(e.target.value);
  };

  return (
    <>
      {products.length === 0 && 
        <div>Loading Products</div>
      }
      {products.length > 0 && (
        <div className="grow">
          <h1>Products</h1>
          <select onChange={handleColorChange}>
            <option value="">All Colors</option>
            {colors.map((color: any, index) => 
              <option key={index} value={color}>{ color }</option>
            )}
          </select>
          <table className="table-auto">
            <thead>
              <tr>
                <th className='px-4 py-2'>Name</th>
                <th className='px-4 py-2'>Color</th>
                <th className='px-4 py-2'>Type</th>
                <th className='px-4 py-2'>Price</th>
                <th className='px-4 py-2'></th>
              </tr>
            </thead>
              <tbody>
              {filteredProducts?.map((product: any, index) => 
                <tr key={index}>
                  <td className='px-4 py-2'>{ product.name }</td>
                  <td className='px-4 py-2'>{ product.color }</td>
                  <td className='px-4 py-2'>{ product.type }</td>
                  <td className="text-right px-4 py-2">{ product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }</td>
                  <td className='px-4 py-2'><Link href={`/product-detail/${product.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</Link></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}