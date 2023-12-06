import { Header } from "../components/Header/index";
import { Footer } from "../components/Footer/index";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="mt-20 mb-20">{children}</main>
      <Footer />
    </>
  );
}
