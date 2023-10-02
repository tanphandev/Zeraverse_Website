import Footer from "@/components/Footer/Footer";
import AppBar from "@/components/AppBar/AppBar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center bg-mainBackground w-full bg-cover bg-bottom bg-fixed">
      <div>
        <div className="flex">
          <AppBar className="hidden lg:block pl-4" />
          <div className="p-4">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
