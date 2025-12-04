// "use client";
// import axios from "axios";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { getSession, useSession } from "next-auth/react";



// export default function AddProductPage() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [sku, setSku] = useState("");
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Protect page client-side
//   useState(() => {
//     getSession().then((session) => {
//       if (!session) router.push("/");
//     });
//   });

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");

//     if (!name || !sku) {
//       setError("Name and SKU are required");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("/api/products", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           sku,
//           price: Number(price) || 0,
//           categoryId:1,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to add product");
//         setLoading(false);
//         return;
//       }

//       // Redirect to dashboard
//       router.push("/dashboard");
//     } catch (err) {
//       setError("Something went wrong");
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-2xl font-semibold mb-6 text-center">
//           Add New Product
//         </h2>

//         {error && (
//           <p className="text-red-600 text-center mb-4">{error}</p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-medium mb-1">Product Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-1">SKU</label>
//             <input
//               type="text"
//               value={sku}
//               onChange={(e) => setSku(e.target.value)}
//               className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-1">Price</label>
//             <input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-1">Stock</label>
//             <input
//               type="number"
//               value={stock}
//               onChange={(e) => setStock(e.target.value)}
//               className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
//           >
//             {loading ? "Adding..." : "Add Product"}
//           </button>

//           <button
//             type="button"
//             disabled={loading}
//             onClick={() => router.push("/dashboard")}
//             className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-grey-700"
//           >
//             {'Cancel'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";

export default function AddProductPage() {
  const router = useRouter();
  const { data: session } = useSession(); // 🔥 access token from next-auth

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Protect page on client side
  useEffect(() => {
    getSession().then((session) => {
      if (!session) router.push("/");
    });
  }, [router]);

  // ---------------------------------------------------------
  // 🔥 Submit handler (axios + token included)
  // ---------------------------------------------------------
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name || !sku) {
      setError("Name and SKU are required");
      return;
    }

    setLoading(true);

    try {
      const token = session?.user?.token; // 🔥 your saved JWT

      if (!token) {
        setError("No token found. Login again.");
        setLoading(false);
        return;
      }

      await axios.post(
        "/api/products",
        {
          name,
          sku,
          price: Number(price) || 0,
          categoryId: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add New Product
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">SKU</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => router.push("/dashboard")}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-grey-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
