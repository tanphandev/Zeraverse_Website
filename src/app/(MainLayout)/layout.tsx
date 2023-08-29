import Footer from "@/components/Footer";
import AppBar from "@/components/AppBar";
import SearchModal from "@/components/SearchModal";
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-mainBackground w-full bg-cover bg-bottom bg-fixed">
      <div className="flex pt-4 px-[24px]">
        <AppBar />
        <div className="flex-1">{children}</div>
      </div>
      <Footer />
      <SearchModal />
    </div>
  );
}

export default MainLayout;
