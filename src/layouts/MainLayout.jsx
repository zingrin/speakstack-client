import { Outlet } from "react-router";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Outlet /> {/* All pages will render here */}
      </main>
    <Footer></Footer>
    </div>
  );
};

export default MainLayout;
