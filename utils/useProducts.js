"use client";

import axios from "axios";
import { useCallback } from "react";
import { PRODUCTS_API, authHeaders } from "@/lib/clientApi";

export default function useProducts() {
  const fetchProducts = useCallback(async (setProducts, session) => {
    const token = session?.user?.token;

    if (!token) {
      return;
    }

    try {
      const res = await axios.get(PRODUCTS_API, {
        headers: authHeaders(token),
      });
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      const status = err?.response?.status;
      console.error("Error fetching products:", status, err?.response?.data || err.message);
      if (status === 404) {
        console.error(
          "Products API not found. Ensure app/api/products/route.js exists and restart dev server."
        );
      }
    }
  }, []);

  return { fetchProducts };
}
