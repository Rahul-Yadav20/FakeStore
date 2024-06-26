import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard';
import { MoonLoader } from 'react-spinners';
import {motion} from 'framer-motion'
const CategoryPage = () => {
  // empty state variable to store all products
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const {category} = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      }
      );
  }, [category])

  return (
    <div className="p-4 dark:bg-slate-400 dark:text-white pb-10">
      <h1 className="text-3xl text-center font-medium mb-4">Products</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          {/* Loader */}
          <MoonLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : <motion.div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6" initial={{ translateY: "-20px", opacity: 0.5 }} animate={{
        translateY: "0px", opacity: 1, transition: {
          duration: 1
        }
      }}>
        {/* Using map method to select each element or product from the products array */}
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
      }

    </div>
  );
}

export default CategoryPage
