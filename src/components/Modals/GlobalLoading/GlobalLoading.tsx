import { HashLoader } from "react-spinners";
function GlobalLoading() {
  return (
    <div className="z-30 flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-main-whileColor-30">
      <HashLoader color="#9114c7" />
    </div>
  );
}

export default GlobalLoading;
