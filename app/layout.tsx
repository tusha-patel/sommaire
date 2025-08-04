import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900']
});


export const metadata: Metadata = {
  title: "Sommaire",
  description: "Sommaire is an app for summarizing pdf documents ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${fontSans.variable} antialiased`}
        >
          <div className="flex relative flex-col min-h-screen ">
            <Header />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </body>
       </html>
    </ClerkProvider>
  );
}
