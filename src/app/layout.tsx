import Head from "next/head";
import Nav from "./Nav";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EV Charging Point Map",
  description: "Find your nearest EV charging point",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/ksx0rrm.css" />
      </Head>
      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
