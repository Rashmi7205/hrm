import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HRM : Manage with ease ",
  description: "Manage with ease",
  icons:{
   icon:'/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
    appearance={{
      layout: {
        logoImageUrl: '/icons/logo.svg',
        socialButtonsVariant: 'iconButton'
      },
      variables: {
        colorText: '#0d0d0d',
        colorPrimary: '#0e78f9',
        colorBackground: '#ffffff',
        colorInputBackground: '#f9f9f9',
        colorInputText: '#060606'
      }
    }}
    >
    <html lang="en"> 
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
