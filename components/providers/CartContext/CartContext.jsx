"use client";

import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  const [showFavoriteToast, setShowFavoriteToast] = useState(false);
  const [productIdForToast, setProductIdForToast] = useState(null);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    if (ls && ls.getItem("favorite")) {
      setFavoriteIds(JSON.parse(ls.getItem("favorite")));
    }
  }, [ls]);

  const addProduct = (product) => {
    setCartProducts((prev) => [...prev, product]);
    toast.success("product added to cart successfully", {
      style: {
        border: "1px solid #01B700",
        padding: "16px",
        color: "#01B700",
      },
      iconTheme: {
        primary: "#01B700",
        secondary: "#FFFAEE",
      },
    });
  };

  const reduceProduct = (product) => {
    setCartProducts((prev) => {
      const productPosition = prev.indexOf(product);

      if (productPosition !== -1) {
        return prev.filter((id, index) => index !== productPosition);
      }
      return prev;
    });
    toast.success("product removed from cart", {
      style: {
        border: "1px solid #01B700",
        padding: "16px",
        color: "#01B700",
      },
      iconTheme: {
        primary: "#01B700",
        secondary: "#FFFAEE",
      },
    });
  };

  const addToFavorite = (productId) => {
    setFavoriteIds((prev) => {
      const isAlreadyFavorite = prev?.includes(productId);
      let updatedFavorite = [];
      if (isAlreadyFavorite) {
        updatedFavorite = prev.filter((id) => id !== productId);
      } else {
        updatedFavorite = [...prev, productId];
      }
      ls.setItem("favorite", JSON.stringify(updatedFavorite));
      setProductIdForToast(productId);
      setShowFavoriteToast(true);
      return updatedFavorite;
    });
  };

  useEffect(() => {
    if (showFavoriteToast) {
      if (favoriteIds.includes(productIdForToast)) {
        toast.success("product added to favorites", {
          style: {
            border: "1px solid #01B700",
            padding: "16px",
            color: "#01B700",
          },
          iconTheme: {
            primary: "#01B700",
            secondary: "#FFFAEE",
          },
        });
      } else {
        toast.success("product removed from favorites", {
          style: {
            border: "1px solid #01B700",
            padding: "16px",
            color: "#01B700",
          },
          iconTheme: {
            primary: "#01B700",
            secondary: "#FFFAEE",
          },
        });
      }
    }
    setShowFavoriteToast(false);
    setProductIdForToast(null);
  }, [showFavoriteToast, productIdForToast, favoriteIds]);

  const clearCart = () => {
    setCartProducts([]);
    ls?.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        clearCart,
        addToFavorite,
        favoriteIds,
        setFavoriteIds,
        reduceProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
