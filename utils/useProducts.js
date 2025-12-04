"use client";

import { useSession } from "next-auth/react";
import axios from "axios";
import { useCallback } from "react";

export default function useProducts() {
  const { data: session } = useSession();

  const fetchProducts = useCallback(async (setProducts, session) => {
    const token = session?.user?.token;

    if (!token) {
      console.error("Token missing");
      return;
    }

    try {
      const res = await axios.get("/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }, [session]);



 

  return { fetchProducts };
}
