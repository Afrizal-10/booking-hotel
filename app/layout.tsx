import type {Metadata} from "next";
import {Raleway} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import {SessionProvider} from "next-auth/react";
// import auth from "@/auth";
import {auth} from "@/auth";

const raleway = Raleway({
  variable: "--font-Raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Online Booking Hotel",
};

export default async function RootLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <SessionProvider session={session}>
          <Navbar />
          {children} {/* Render konten halaman lain di sini */}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
