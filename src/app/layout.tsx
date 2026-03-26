import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./component/Navbar";
import AuthProvider from "./component/AuthProvider";
import Chatbot from '../app/component/ChatBot'


export const metadata: Metadata = {
  title: "Harmony",
  description: "Welcome to harmony ,your personalised mental care",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <Navbar />
          <div>
            <Chatbot/>
          </div>
          <div className="">{children}</div>
        </body>
      </AuthProvider>
    </html>
  );
}
