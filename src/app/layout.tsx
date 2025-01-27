import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Injector from "@/components/injection/injector";
import { PlayerProvider } from "@/modules/context/player_context";
import bg from "../../public/images/bg_bota.png";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full overflow-x-auto min-h-screen`}
        style={{
          backgroundImage: `url(${bg.src})`,
          width: "100%",
          height: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // A imagem ficará fixa
        }}
      >
        <Toaster position="bottom-center" />

        <Injector>
          <PlayerProvider>{children}</PlayerProvider>
        </Injector>
      </body>
    </html>
  );
}
