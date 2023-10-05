"use client";
import { useState } from "react";
import Footer from "@/components/Footer/Footer";
import AppBar from "@/components/AppBar/AppBar";
import AppBarMDItem from "@/components/AppBar/AppBarMDItem";
import AppBarMD from "@/components/Modals/AppBarMD/AppBarMD";

function MainLayout({ children }: { children: React.ReactNode }) {
  const [isShowAppBarMD, setIsShowAppBarMD] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center bg-mainBackground w-full bg-cover bg-bottom bg-fixed">
      <div>
        <div className="flex">
          <AppBar className="hidden lg:block pl-4" />
          <div className="p-4">
            <div className="lg:hidden">
              <AppBarMDItem
                isShowAppBarMD={isShowAppBarMD}
                setIsShowAppBarMD={setIsShowAppBarMD}
              />
              {/* {isShowAppBarMD && <AppBarMD setIsShow={setIsShowAppBarMD} />} */}
            </div>
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
