"use client";
import { useSelector } from "react-redux";
import Footer from "@/components/Footer";
import AppBar from "@/components/AppBar";
import { isOpenSearchModalSelector } from "@/redux-toolkit/selectors/searchSelector";
import SearchModal from "@/components/SearchModal";
function MainLayout({ children }: { children: string }) {
  const isOpenSeachModal = useSelector(isOpenSearchModalSelector);
  return (
    <div className="bg-mainBackground w-full bg-cover bg-bottom bg-fixed">
      <div className="flex pt-4 px-[24px]">
        <AppBar />
        <div className="flex-1">{children}</div>
      </div>
      <Footer />
      {isOpenSeachModal && <SearchModal />}
    </div>
  );
}

export default MainLayout;
