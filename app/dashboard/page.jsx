// "use client";

// import { useEffect, useState, useRef } from "react";
// import { getSession, signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import StockModal from "@/components/StockModal";
// import useProducts from "@/utils/useProducts";
// import axios from "axios";

// export default function DashboardPage() {
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // modal states
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [modalType, setModalType] = useState("in");

//   const { fetchProducts } = useProducts();

//   // mobile & action menu states
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [openActionId, setOpenActionId] = useState(null);

//   // refs for click-outside handling
//   const mobileMenuRef = useRef(null);
//   const actionMenuRef = useRef(null);

//   // -------------------------------
//   // Load session + initial products
//   // -------------------------------
//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       const s = await getSession();
//       if (!s) {
//         router.push("/");
//         return;
//       }
//       if (mounted) setLoading(false);
//     }
//     load();
//     return () => (mounted = false);
//   }, [router]);

//   useEffect(() => {
//     // fetchProducts should accept (setProducts, session)
//     if (status === "loading") return;
//     fetchProducts(setProducts, session);
//   }, [fetchProducts, session, status]);

//   // Close mobile menu / action menus on outside click
//   useEffect(() => {
//     function handleClick(e) {
//       if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
//         setMobileMenu(false);
//       }
//       // For action menu: if clicked outside any open action menu, close it
//       if (actionMenuRef.current && !actionMenuRef.current.contains(e.target)) {
//         setOpenActionId(null);
//       }
//     }
//     document.addEventListener("click", handleClick);
//     return () => document.removeEventListener("click", handleClick);
//   }, []);

//   // If modal opens, close any open menus
//   useEffect(() => {
//     if (modalOpen) {
//       setMobileMenu(false);
//       setOpenActionId(null);
//     }
//   }, [modalOpen]);

//   // -------------------------------
//   // Open Stock Modal
//   // -------------------------------
//   function openStockModal(product, type) {
//     setSelectedProduct(product);
//     setModalType(type);
//     setModalOpen(true);
//   }

//   function toggleActionMenu(id) {
//     setOpenActionId((prev) => (prev === id ? null : id));
//   }

//   // -------------------------------
//   // Update Stock after Modal Submit
//   // -------------------------------
//   async function updateStock(amount) {
//     if (!selectedProduct) return;

//     try {
//       const res = await axios.put(
//         "/api/products",
//         {
//           id: selectedProduct.id,
//           amount,
//           type: modalType === "in" ? "add" : "remove",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${session?.user?.token}`,
//           },
//         }
//       );

//       if (res?.data?.success) {
//         setModalOpen(false);
//         fetchProducts(setProducts, session);
//       } else {
//         alert(res?.data?.message || "Failed to update stock");
//       }
//     } catch (err) {
//       console.error("updateStock error:", err);
//       alert("Failed to update stock");
//     }
//   }

//   if (loading) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
//       {/* Top Bar */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>

//         {/* Desktop Buttons */}
//         <div className="hidden sm:flex gap-3">
//           <button
//             onClick={() => router.push("/add-product")}
//             className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-md"
//           >
//             + Add Product
//           </button>

//           <button
//             onClick={() => signOut({ callbackUrl: "/" })}
//             className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-md"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Mobile Hamburger */}
//         <div className="sm:hidden relative" ref={mobileMenuRef}>
//           <button
//             aria-label="Open menu"
//             onClick={() => setMobileMenu((v) => !v)}
//             className="p-2 bg-gray-800 text-white rounded-md"
//           >
//             {/* simple hamburger icon */}
//             <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//               <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>

//           {/* Mobile Dropdown */}
//           {mobileMenu && (
//             <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-44 z-20">
//               <button
//                 onClick={() => {
//                   setMobileMenu(false);
//                   router.push("/add-product");
//                 }}
//                 className="w-full px-4 py-3 text-left hover:bg-gray-50"
//               >
//                 + Add Product
//               </button>

//               <button
//                 onClick={() => signOut({ callbackUrl: "/" })}
//                 className="w-full px-4 py-3 text-left hover:bg-gray-50 text-red-600"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[640px] sm:min-w-0">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="py-3 px-4 text-left text-sm sm:text-base">Name</th>
//                 <th className="py-3 px-4 text-left text-sm sm:text-base">Price</th>
//                 <th className="py-3 px-4 text-left text-sm sm:text-base">Qty</th>
//                 <th className="py-3 px-4 text-center text-sm sm:text-base">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {products.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="text-center py-6">
//                     No products added yet.
//                   </td>
//                 </tr>
//               )}

//               {products.map((p) => (
//                 <tr key={p.id} className="border-b">
//                   <td className="py-3 px-4 text-sm sm:text-base max-w-xs truncate">{p.name}</td>
//                   <td className="py-3 px-4 text-sm sm:text-base">₹ {p.price}</td>
//                   <td className="py-3 px-4 text-sm sm:text-base">{p.quantity}</td>

//                   <td className="py-3 px-4 text-center relative">
//                     {/* Desktop action buttons */}
//                     <div className="hidden sm:flex justify-center gap-2">
//                       <button
//                         className="bg-blue-600 hover:bg-blue-700 transition text-white px-3 py-1 rounded"
//                         onClick={() => openStockModal(p, "in")}
//                       >
//                         Stock In
//                       </button>

//                       <button
//                         className="bg-orange-500 hover:bg-orange-600 transition text-white px-3 py-1 rounded"
//                         onClick={() => openStockModal(p, "out")}
//                       >
//                         Stock Out
//                       </button>
//                     </div>

//                     {/* Mobile three-dot menu */}
//                     <div className="sm:hidden inline-block" ref={actionMenuRef}>
//                       <button
//                         aria-label="Row actions"
//                         onClick={() => toggleActionMenu(p.id)}
//                         className="px-2 py-1 text-2xl leading-none"
//                       >
//                         ⋮
//                       </button>

//                       {openActionId === p.id && (
//                         <div className="absolute right-4 top-10 bg-gray-400 rounded shadow-lg w-36 z-30">
//                           <button
//                             onClick={() => {
//                               toggleActionMenu(null);
//                               openStockModal(p, "in");
//                             }}
//                             className="block w-full text-left px-4 py-2 hover:bg-gray-50"
//                           >
//                             Stock In
//                           </button>

//                           <button
//                             onClick={() => {
//                               toggleActionMenu(null);
//                               openStockModal(p, "out");
//                             }}
//                             className="block w-full text-left px-4 py-2 hover:bg-gray-50"
//                           >
//                             Stock Out
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal Component */}
//       <StockModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={updateStock} type={modalType} />
//     </div>
//   );
// }



"use client";

import { useEffect, useState, useRef } from "react";
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

  // mobile & action menu states
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openActionId, setOpenActionId] = useState(null);

  // refs
  const mobileMenuRef = useRef(null);

  // load session
  useEffect(() => {
    let mounted = true;

    async function load() {
      const s = await getSession();
      if (!s) {
        router.push("/");
        return;
      }
      if (mounted) setLoading(false);
    }

    load();
    return () => (mounted = false);
  }, [router]);

  // fetch products
  useEffect(() => {
    if (status === "loading") return;
    fetchProducts(setProducts, session);
  }, [fetchProducts, session, status]);

  // Close mobile & actions when clicking outside
  useEffect(() => {
    function handleClick(e) {
      // ---- Mobile menu close ----
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenu(false);
      }

      // ---- Action menu close (for each row) ----
      // If click target is NOT inside action menu area
      if (!e.target.closest(".action-menu-area")) {
        setOpenActionId(null);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Close menus when modal opens
  useEffect(() => {
    if (modalOpen) {
      setMobileMenu(false);
      setOpenActionId(null);
    }
  }, [modalOpen]);

  // open stock modal
  function openStockModal(product, type) {
    setSelectedProduct(product);
    setModalType(type);
    setModalOpen(true);
  }

  function toggleActionMenu(id) {
    setOpenActionId((prev) => (prev === id ? null : id));
  }

  // update stock
  async function updateStock(amount) {
    if (!selectedProduct) return;

    try {
      const res = await axios.put(
        "/api/products",
        {
          id: selectedProduct.id,
          amount,
          type: modalType === "in" ? "add" : "remove",
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );

      if (res?.data?.success) {
        setModalOpen(false);
        fetchProducts(setProducts, session);
      } else {
        alert(res?.data?.message || "Failed to update stock");
      }
    } catch (err) {
      console.error("updateStock error:", err);
      alert("Failed to update stock");
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex gap-3">
          <button
            onClick={() => router.push("/add-product")}
            className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-md"
          >
            + Add Product
          </button>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden relative" ref={mobileMenuRef}>
          <button
            aria-label="Open menu"
            onClick={() => setMobileMenu((v) => !v)}
            className="p-2 bg-gray-800 text-white rounded-md"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {mobileMenu && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-44 z-20">
              <button
                onClick={() => {
                  setMobileMenu(false);
                  router.push("/add-product");
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50"
              >
                + Add Product
              </button>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] sm:min-w-0">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                 <th className="py-3 px-4 text-left">Price</th> 
                <th className="py-3 px-4 text-left">Qty</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    No products added yet.
                  </td>
                </tr>
              )}

              {products.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="py-3 px-4 max-w-xs truncate">{p.name}</td>
                   <td className="py-3 px-4">₹ {p.price}</td> 
                  <td className="py-3 px-4">{p.quantity}</td>

                  <td className="py-3 px-4 text-center relative">
                    {/* Desktop actions */}
                    <div className="hidden sm:flex justify-center gap-2">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        onClick={() => openStockModal(p, "in")}
                      >
                        Stock In
                      </button>

                      <button
                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded"
                        onClick={() => openStockModal(p, "out")}
                      >
                        Stock Out
                      </button>
                    </div>

                    {/* Mobile Actions (3 dots) */}
                    <div className="sm:hidden inline-block action-menu-area">
                      <button
                        aria-label="Row actions"
                        onClick={() => toggleActionMenu(p.id)}
                        className="px-2 py-1 text-2xl leading-none"
                      >
                        ⋮
                      </button>

                      {openActionId === p.id && (
                        <div className="absolute right-4 top-10 bg-blue-600 text-white rounded shadow-lg w-36 z-30 action-menu-area">
                          <button
                            onClick={() => {
                              setOpenActionId(null);
                              openStockModal(p, "in");
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Stock In
                          </button>

                          <button
                            onClick={() => {
                              setOpenActionId(null);
                              openStockModal(p, "out");
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Stock Out
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <StockModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={updateStock} type={modalType} />
    </div>
  );
}



