import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Header from "@/components/UI/header";
// import Footer from "@/components/UI/footer";
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "I'm Nantais - Staging",
  description: "French Music Culture App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
      <script defer src="https://cloud.umami.is/script.js" data-website-id="a7c6f63e-3b83-46f4-864c-3c05207f3d68"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-blue-500 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <Header /> */}
          <Toaster position="top-right" reverseOrder={false} />
          {children}
          {/* <Footer />
        </div> */}
      </body>
    </html>
  );
}
