"use client";
import { CartContext } from "@/components/providers/CartContext/CartContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Favorite() {
  const { favoriteIds, addToFavorite } = useContext(CartContext);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (favoriteIds?.length > 0) {
      axios.post("/api/cart", { ids: favoriteIds }).then((response) => {
        setFavoriteProducts(response.data);
      });
    } else {
      setFavoriteProducts([]);
    }
  }, [favoriteIds]);

  const addFavorite = (productId) => {
    if (loading) return;

    addToFavorite(productId);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="p-5 ">
      <h1 className="font-bold mb-2 text-2xl  text-center">Saved Products</h1>
      {!favoriteProducts?.length ? (
        <div>
          {!favoriteProducts?.length && (
            <p className="text-center font-bold">No saved products.</p>
          )}
        </div>
      ) : (
        <div>
          {favoriteProducts &&
            favoriteProducts.map((favProductData) => (
              <div
                key={favProductData._id}
                className="flex mb-2 bg-white shadow-sm relative"
              >
                <div className="sm:flex gap-1  p-5 ">
                  <div>
                    {favProductData?.newPrice && (
                      <span className="bg-sharp-pink text-white px-2 text-lg absolute left-5 top-5 z-10 rounded-tl-md ">
                        -
                        {Math.round(
                          (100 *
                            (favProductData?.price -
                              favProductData?.newPrice)) /
                            favProductData?.price
                        )}
                        %
                      </span>
                    )}

                    <Link href={`/product/${favProductData._id}`}>
                      <Image
                        src={favProductData.images?.[0]}
                        alt={`${favProductData.title}`}
                        width={200}
                        height={100}
                        className="rounded-md scale-100 hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2 mt-2 sm:mt-0  px-5 ">
                    <h2 className="font-bold text-xl">
                      <p>
                        {favProductData?.title
                          ?.trim()
                          .slice(0, 1)
                          .toUpperCase() +
                          favProductData?.title?.trim().slice(1)}
                      </p>
                    </h2>
                    <p>
                      {favProductData?.description
                        .trim()
                        .slice(0, 1)
                        .toUpperCase() +
                        favProductData?.description.trim().slice(1)}
                    </p>
                    <div>
                      {favProductData?.newPrice ? (
                        <div className="flex items-center gap-3">
                          <p className=" font-bold text-lg text-main-pink">
                            ${favProductData?.newPrice}
                          </p>
                          <p className=" font-bold line-through ">
                            ${favProductData?.price}
                          </p>
                        </div>
                      ) : (
                        <p className=" font-bold text-lg text-light-green">
                          ${favProductData.price}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 justify-start items-center">
                      <p>Saved</p>
                      <svg
                        onClick={() => addFavorite(favProductData?._id)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={
                          favoriteIds.includes(favProductData?._id)
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
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
