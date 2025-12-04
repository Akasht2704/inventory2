"use client";

import { useEffect, useState } from "react";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StockModal from "@/components/StockModal";
import useProducts from "@/utils/useProducts";
import axios from "axios";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession(); 

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState("in");

  const { fetchProducts } = useProducts();

  // -------------------------------
  // Load session + initial products
  // -------------------------------
  useEffect(() => {
    async function load() {
      const session = await getSession();
      if (!session) {
        router.push("/");
        return;
      }
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    fetchProducts(setProducts, session);
  }, [fetchProducts, session, status]);

  // -------------------------------
  // Fetch products
  // -------------------------------
  

  // -------------------------------
  // Open Stock Modal
  // -------------------------------
  function openStockModal(product, type) {
    setSelectedProduct(product);
    setModalType(type);
    setModalOpen(true);
  }

  // -------------------------------
  // Update Stock after Modal Submit
  // -------------------------------
  async function updateStock(amount) {
    if (!selectedProduct) return;

    const res = await axios.put("/api/products", {
       id: selectedProduct.id,
       amount,
       type: modalType === "in" ? "add" : "remove",
      },{
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        }
      }
    )
    if(res.data.success){
      setModalOpen(false);
      fetchProducts(setProducts, session);
    }
    else{
      alert("Failed to update stock");
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/add-product")}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            + Add Product
          </button>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  No products added yet.
                </td>
              </tr>
            )}

            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="py-3 px-4">{p.name}</td>
                <td className="py-3 px-4">{p.sku}</td>
                <td className="py-3 px-4">₹ {p.price}</td>
                <td className="py-3 px-4">{p.quantity}</td>

                <td className="py-3 px-4 text-center">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-3"
                    onClick={() => openStockModal(p, "in")}
                  >
                    Stock In
                  </button>

                  <button
                    className="bg-orange-500 text-white px-3 py-1 rounded"
                    onClick={() => openStockModal(p, "out")}
                  >
                    Stock Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Component */}
      <StockModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={updateStock}
        type={modalType}
      />
    </div>
  );
}
