"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { CartContext } from "@/components/providers/CartContext/CartContext";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function Cart() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: session } = useSession();

  const { cartProducts, reduceProduct, clearCart } = useContext(CartContext);
  const [isCartEmpty, setIsCartEmpty] = useState(cartProducts.length === 0);

  useEffect(() => {
    const newIsCartEmpty = cartProducts.length === 0;

    if (!isCartEmpty && newIsCartEmpty) {
      clearCart();
    }

    setIsCartEmpty(newIsCartEmpty);
  }, [cartProducts, isCartEmpty, clearCart]);

  let total = 0;
  cartProducts?.map((cartProduct) => {
    if (cartProduct?.newPrice) {
      return (total += cartProduct.newPrice);
    } else {
      return (total += cartProduct.price);
    }
  });

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window?.location.href.includes("success")
    ) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  const handleGoToPayment = async (e) => {
    e.preventDefault();

    if (!name) {
      return toast.error("Name is required. Please enter name", {
        style: {
          border: "1px solid #f72585",
          padding: "16px",
          color: "#f72585",
        },
        iconTheme: {
          primary: "#f72585",
          secondary: "#FFFAEE",
        },
      });
    }
    if (!email) {
      return toast.error("Email is required. Please enter email", {
        style: {
          border: "1px solid #f72585",
          padding: "16px",
          color: "#f72585",
        },
        iconTheme: {
          primary: "#f72585",
          secondary: "#FFFAEE",
        },
      });
    }
    if (!phone) {
      return toast.error("Mobile no is required. Please enter mobile", {
        style: {
          border: "1px solid #f72585",
          padding: "16px",
          color: "#f72585",
        },
        iconTheme: {
          primary: "#f72585",
          secondary: "#FFFAEE",
        },
      });
    }
    const response = await axios.post("/api/checkout", {
      name,
      email,
      phone,
      cartProducts,
    });

    if (response.data.url) {
      window.location = response.data.url;
    }
  };

  if (isSuccess) {
    return (
      <>
        <div className="bg-white mx-5 text-center py-10 ">
          <h1 className="font-bold py-2 text-lg">
            Payment Successful! Thank you for shopping with us.
          </h1>
          <p className="mb-5">We will email you when your order is sent.</p>
          <Link
            href={"/"}
            className=" bg-dark-green rounded-md  inline-flex justify-center items-center gap-2 text-white px-3 py-1 hover:text-light-green"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
              />
            </svg>

            <p className="text-lg">Go to shop</p>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="m-5">
      <h1 className="font-bold mb-3 text-xl text-center">Shopping Cart</h1>
      {!cartProducts?.length ? (
        <div>
          {!cartProducts?.length && (
            <p className="text-center font-bold">Your Cart is empty.</p>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-2 ">
          <div className="">
            {cartProducts &&
              cartProducts.map((cartProductData, index) => (
                <div
                  key={index}
                  className=" shadow-sm rounded-md mb-2 bg-white"
                >
                  <div className="flex justify-center items-center gap-5 p-5">
                    <Link href={`/product/${cartProductData._id}`}>
                      <Image
                        src={cartProductData.images?.[0]}
                        alt={`${cartProductData.title}`}
                        width={100}
                        height={100}
                        priority
                        className="rounded-md scale-100 hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    <div className="">
                      <div className="text-light-green">
                        {cartProductData?.newPrice ? (
                          <p className="font-bold">
                            ${cartProductData?.newPrice}
                          </p>
                        ) : (
                          <p className=" font-bold ">
                            ${cartProductData.price}
                          </p>
                        )}
                      </div>

                      <p>
                        {cartProductData?.title
                          ?.trim()
                          .slice(0, 1)
                          .toUpperCase() +
                          cartProductData?.title?.trim().slice(1)}
                      </p>
                      <div>
                        {cartProductData?.colors && (
                          <div className="flex items-center gap-1">
                            <p>Color: </p>

                            <p>
                              {cartProductData?.colors
                                ?.trim()
                                .slice(0, 1)
                                .toUpperCase() +
                                cartProductData?.colors?.trim().slice(1)}
                            </p>
                          </div>
                        )}
                      </div>
                      <div>
                        {cartProductData?.sizes && (
                          <div className="flex items-center gap-1">
                            <p>Size: </p>

                            <p>
                              {cartProductData?.sizes
                                .trim()
                                .slice(0, 1)
                                .toUpperCase() +
                                cartProductData?.sizes.trim().slice(1)}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex  py-2">
                        <button
                          onClick={() => reduceProduct(cartProductData)}
                          className="flex items-center bg-dark-green px-2 rounded-md text-white hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <p>Remove</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <div className="flex gap-2 shadow-sm bg-white py-2 px-5">
              <p>Sub-total: </p>
              <div className="font-bold text-sharp-pink">${total}</div>
            </div>
          </div>
          <div className="flex flex-col p-5 rounded-md shadow-sm bg-white ">
            {!!cartProducts?.length && (
              <div className="">
                <h2 className="font-bold text-lg text-light-green">
                  Order information
                </h2>
                <form onSubmit={handleGoToPayment} className="py-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <button
                    type="submit"
                    disabled={!session}
                    className={
                      session
                        ? " bg-dark-green px-3 py-1 mt-2 rounded-md text-white text-center"
                        : "cursor-not-allowed disabled:bg-slate-300  px-3 py-1 mt-2 rounded-md text-white text-center hover:text-white"
                    }
                  >
                    Continue to payment
                  </button>
                  {!session && (
                    <p className="text-sm text-sharp-pink ml-5 pt-1">
                      *login to continue*
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
