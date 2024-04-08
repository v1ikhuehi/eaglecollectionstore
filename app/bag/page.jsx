"use client";

import { CartContext } from "@/components/providers/CartContext/CartContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Bag() {
  const [bags, setBags] = useState([]);
  const [loading, setLoading] = useState(false);

  const { favoriteIds, addToFavorite } = useContext(CartContext);

  const getBags = async () => {
    try {
      const response = await axios.get("/api/bags");
      setBags(response.data);
    } catch (error) {
      console.log("error fetching data", error);
    }
  };

  useEffect(() => {
    getBags();
  }, []);

  const addFavorite = (productId) => {
    if (loading) return;

    addToFavorite(productId);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  if (!bags.length) {
    return (
      <div className=" mx-5 text-center py-10 ">
        <h1 className="font-bold py-2 text-lg">Coming soon...</h1>
      </div>
    );
  }
  return (
    <div className=" flex flex-wrap justify-center items-center gap-2 my-5">
      {bags &&
        bags.map((bag) => (
          <div
            key={bag._id}
            className="p-5 rounded-md bg-white shadow-sm w-[200px]"
          >
            <div>
              <div className="mb-2 scale-100 hover:scale-105 transition-transform duration-300">
                <Link href={`/product/${bag._id}`}>
                  {bag?.newPrice && (
                    <span className="bg-sharp-pink text-white px-2 absolute text-lg">
                      -
                      {Math.round(
                        (100 * (bag?.price - bag?.newPrice)) / bag?.price
                      )}
                      %
                    </span>
                  )}
                  <Image
                    src={bag.images?.[0]}
                    alt={`${bag.title}`}
                    width={200}
                    height={100}
                    priority
                  />
                </Link>
              </div>
              <div>
                <div className="flex justify-between items-center ">
                  {bag?.newPrice ? (
                    <div className="flex items-center gap-3">
                      <p className=" font-bold text-lg text-main-pink">
                        ${bag?.newPrice}
                      </p>
                      <p className=" font-bold line-through ">${bag?.price}</p>
                    </div>
                  ) : (
                    <p className=" font-bold text-lg text-light-green">
                      ${bag.price}
                    </p>
                  )}

                  <svg
                    onClick={() => addFavorite(bag._id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={
                      favoriteIds?.includes(bag._id)
                        ? "w-6 h-6 fill-sharp-pink text-sharp-pink cursor-pointer"
                        : "w-6 h-6 text-sharp-pink cursor-pointer"
                    }
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
                <Link href={`/product/${bag._id}`}>
                  <p>
                    {bag?.title?.trim().slice(0, 1).toUpperCase() +
                      bag?.title?.trim().slice(1)}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
