/**
 * Browser API paths for this Next.js app.
 * Always same-origin so dashboard hits local /api/* in dev and site /api/* in production.
 * (NEXT_PUBLIC_API_URL is for server-side NextAuth → external login URL only.)
 */
export const PRODUCTS_API = "/api/products";

export function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}
