import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { CartContextProvider } from "@/components/providers/CartContext/CartContext";
import AuthProvider from "@/components/providers/AuthProvider/AuthProvider";
import { SearchProvider } from "@/components/providers/SearchProvider/SearchProvider";
import { Toaster } from "react-hot-toast";
import VoiceflowAI from "@/components/VoiceflowAI/VoiceflowAI";

export const metadata = {
  title: "Eagle Collections African Fabrics Store",
  description:
    "online store for all African fashion fabrics attires, jewelries and accessories in Houston, Texas",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en " className="bg-light-grey font-muktaFont text-dark-green">
        <body className="flex flex-col min-h-screen">
          <Toaster position="top-right" />
          <AuthProvider>
            <CartContextProvider>
              <SearchProvider>
                <Navbar />
                <div className="flex-grow">{children}</div>
                <Footer />
              </SearchProvider>
            </CartContextProvider>
          </AuthProvider>
          <VoiceflowAI />
        </body>
      </html>
    </>
  );
}
