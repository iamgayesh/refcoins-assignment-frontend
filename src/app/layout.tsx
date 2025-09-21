// src/app/layout.tsx
import "../app/globals.css";
import MainHeader from "../components/layout/MainHeader";
import MainFooter from "../components/layout/MainFooter";

export const metadata = {
  title: "Property App",
  description: "Modern Property Listing App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <MainHeader />
        <main className="flex-1">{children}</main>
        <MainFooter />
      </body>
    </html>
  );
}
