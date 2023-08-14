import Footer from "@/app/components/Footer";
import AppBar from "@/app/components/AppBar";

function MainLayout({ children }: { children: string }) {
  return (
    <div className="bg-mainBackground bg-center w-full bg-cover">
      <div className="flex pt-4 px-[13px]">
        <AppBar />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
