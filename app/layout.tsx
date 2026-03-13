import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "DevHub",
  description: "DevHub App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}