import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Imaginate",
    description: "AI powered image generator",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <head>
                    <link
                        rel="shortcut icon"
                        href="/logo.png"
                        type="image/x-icon"
                    />
                </head>
                <body className={inter.className}>
                    {children}
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    );
}
