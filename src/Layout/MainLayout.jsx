import { Header } from "../components/Header/index";
import { Footer } from "../components/Footer/index";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
