"use client";

import { useEffect, useState, useRef } from "react";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StockModal from "@/components/StockModal";
import useProducts from "@/utils/useProducts";
import axios from "axios";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalNonce, setModalNonce] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState("in");

  const { fetchProducts } = useProducts();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [openActionId, setOpenActionId] = useState(null);

  const mobileMenuRef = useRef(null);

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

  useEffect(() => {
    if (status === "loading") return;
    fetchProducts(setProducts, session);
  }, [fetchProducts, session, status]);

  useEffect(() => {
    function handleClick(e) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenu(false);
      }
      if (!e.target.closest(".action-menu-area")) {
        setOpenActionId(null);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  function openStockModal(product, type) {
    setSelectedProduct(product);
    setModalType(type);
    setMobileMenu(false);
    setOpenActionId(null);
    setModalNonce((n) => n + 1);
    setModalOpen(true);
  }

  function toggleActionMenu(id) {
    setOpenActionId((prev) => (prev === id ? null : id));
  }

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-slate-800" />
          <p className="text-sm text-slate-500">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/80">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <header className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Overview</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">Track inventory and adjust stock in one place.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <Link
              href="/profile"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              Profile
            </Link>

            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => router.push("/add-product")}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-slate-900/20 transition hover:bg-slate-800"
              >
                Add product
              </button>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Log out
              </button>
            </div>

            <div className="relative sm:hidden" ref={mobileMenuRef}>
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={mobileMenu}
                onClick={() => setMobileMenu((v) => !v)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 shadow-sm transition hover:bg-slate-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {mobileMenu && (
                <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg shadow-slate-900/10">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenu(false);
                      router.push("/add-product");
                    }}
                    className="w-full px-4 py-3 text-left text-sm font-medium text-slate-800 transition hover:bg-slate-50"
                  >
                    Add product
                  </button>
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/5">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <h2 className="text-sm font-semibold text-slate-900">Products</h2>
            <p className="text-xs text-slate-500">{products.length} item{products.length !== 1 ? "s" : ""} in catalog</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  <th className="px-4 py-3.5 font-medium text-slate-600 sm:px-6">Name</th>
                  <th className="px-4 py-3.5 font-medium text-slate-600 sm:px-6">Price</th>
                  <th className="px-4 py-3.5 font-medium text-slate-600 sm:px-6">Qty</th>
                  <th className="px-4 py-3.5 text-center font-medium text-slate-600 sm:px-6">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {products.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-14 text-center">
                      <p className="text-slate-600">No products yet.</p>
                      <p className="mt-1 text-sm text-slate-400">Add your first product to get started.</p>
                      <button
                        type="button"
                        onClick={() => router.push("/add-product")}
                        className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                      >
                        Add product
                      </button>
                    </td>
                  </tr>
                )}

                {products.map((p) => (
                  <tr key={p.id} className="transition hover:bg-slate-50/80">
                    <td className="max-w-[10rem] truncate px-4 py-4 font-medium text-slate-900 sm:max-w-xs sm:px-6" title={p.name}>
                      {p.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 tabular-nums text-slate-700 sm:px-6">₹{p.price}</td>
                    <td className="whitespace-nowrap px-4 py-4 tabular-nums text-slate-700 sm:px-6">{p.quantity}</td>

                    <td className="relative px-4 py-4 text-center sm:px-6">
                      <div className="hidden justify-center gap-2 sm:flex">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500"
                          onClick={() => openStockModal(p, "in")}
                        >
                          Stock in
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-400"
                          onClick={() => openStockModal(p, "out")}
                        >
                          Stock out
                        </button>
                      </div>

                      <div className="inline-block sm:hidden action-menu-area">
                        <button
                          type="button"
                          aria-label="Row actions"
                          onClick={() => toggleActionMenu(p.id)}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                        >
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <circle cx="12" cy="6" r="1.5" />
                            <circle cx="12" cy="12" r="1.5" />
                            <circle cx="12" cy="18" r="1.5" />
                          </svg>
                        </button>

                        {openActionId === p.id && (
                          <div className="action-menu-area absolute right-3 top-11 z-30 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                            <button
                              type="button"
                              onClick={() => {
                                setOpenActionId(null);
                                openStockModal(p, "in");
                              }}
                              className="block w-full px-4 py-2.5 text-left text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
                            >
                              Stock in
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setOpenActionId(null);
                                openStockModal(p, "out");
                              }}
                              className="block w-full px-4 py-2.5 text-left text-sm font-medium text-amber-700 transition hover:bg-amber-50"
                            >
                              Stock out
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
      </div>

      <StockModal
        key={modalNonce}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={updateStock}
        type={modalType}
        product={selectedProduct}
      />
    </div>
  );
}
