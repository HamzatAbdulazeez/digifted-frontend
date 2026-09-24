import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export const metadata = {
  title: "Digifted Hub — Your Vision, Amplified",
  description:
    "Digifted Creations Hub Limited is a leading multimedia and creative production company for visionary creators, businesses, and brands in Lagos, Nigeria.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
