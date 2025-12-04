import { withAuth } from "next-auth/middleware";

// Protect routes
export default withAuth({
  pages: {
    signIn: "/", // redirect to login page
  },
  // You can also add callbacks if you want role-based protection
});

// Specify paths to protect
export const config = {
  matcher: ["/dashboard/:path*", "/add-product/:path*"],
};
