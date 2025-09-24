import MainHeader from "../components/layout/MainHeader";
import MainFooter from "../components/layout/MainFooter";
import ReduxProvider from "../redux/Provider";
import AuthInitializer from "../components/layout/AuthInitializer";

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
      <body className="flex flex-col min-h-screen bg-background text-foreground transition-colors">
        <ReduxProvider>
          <AuthInitializer>
            <MainHeader />
            <main className="flex-1">{children}</main>
            <MainFooter />
          </AuthInitializer>
        </ReduxProvider>
      </body>
    </html>
  );
}
