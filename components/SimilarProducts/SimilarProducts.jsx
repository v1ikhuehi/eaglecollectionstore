import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function SimilarProducts({ searchCategory }) {
  const [category, setCategory] = useState([]);
  const containerRef = useRef(null);

  if (searchCategory === "Shoes and Bags") {
    searchCategory = "shoesandbags";
  } else if (searchCategory === "Men Shoes") {
    searchCategory = "menshoes";
  } else if (searchCategory === "Men Hats") {
    searchCategory = "menhats";
  } else if (searchCategory === "Men Fabrics") {
    searchCategory = "menfabrics";
  } else if (searchCategory === "Uncategorized") {
    searchCategory = "allproducts";
  }

  searchCategory = searchCategory?.toLowerCase();

  const getCategory = async () => {
    const response = await axios.get(`/api/${searchCategory}`);
    setCategory(response.data);
  };

  useEffect(() => {
    getCategory();
  }, [searchCategory]);

  if (!category.length) {
    return (
      <div className=" mx-5 text-center py-10 ">
        <h1 className="font-bold py-2 text-lg">
          No Similar products available
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bold pt-2 text-lg text-center">Similar products</h1>
      <div
        className=" flex justify-between items-center m-5 mt-2 overflow-x-auto"
        ref={containerRef}
      >
        {category && (
          <div className="flex gap-2 ">
            {category.map((productCategory) => (
              <div
                key={productCategory._id}
                className="p-2 rounded-md bg-white shadow-sm w-[150px]"
              >
                <div className="mb-2 scale-100 hover:scale-105 transition-transform duration-300">
                  <Link href={`/product/${productCategory._id}`}>
                    {productCategory?.newPrice && (
                      <span className="bg-sharp-pink text-white px-2 absolute text-lg">
                        -
                        {Math.round(
                          (100 *
                            (productCategory?.price -
                              productCategory?.newPrice)) /
                            productCategory?.price
                        )}
                        %
                      </span>
                    )}
                    <Image
                      src={productCategory.images?.[0]}
                      alt={`${productCategory.title}`}
                      width={130}
                      height={50}
                      priority
                    />
                  </Link>
                </div>
                <div>
                  <Link href={`/product/${productCategory._id}`}>
                    <p>
                      {productCategory?.title
                        ?.trim()
                        .slice(0, 1)
                        .toUpperCase() +
                        productCategory?.title?.trim().slice(1)}
                    </p>
                  </Link>
                </div>
              </div>
            ))}{" "}
          </div>
        )}
      </div>
    </div>
  );
}
