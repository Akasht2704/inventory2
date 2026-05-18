import "./globals.css";
import Providers from "./Providers";

export const metadata = {
  title: "Akash",
  description: "Portfolio using Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
