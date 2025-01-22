import { PropsWithChildren } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
