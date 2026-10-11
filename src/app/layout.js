import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "বাজার দর | Bazar Dor",
    template: "%s | বাজার দর",
  },
  description:
    "বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, বাজারভিত্তিক মূল্য এবং দামের পরিবর্তন এক নজরে দেখুন।",
};


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        <main>
          {children}
        </main>
          <Footer/>
         < ToastContainer/>
         <Toaster/>
        </body>
    </html>
  );
}
