import { globalLoadingSelector } from "@/store/selectors/globalLoadingSelector";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
function GlobalLoading() {
  const isLoading = useSelector(globalLoadingSelector);
  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-main-whileColor-30">
          <HashLoader color="#9114c7" />
        </div>
      )}
    </>
  );
}

export default GlobalLoading;
