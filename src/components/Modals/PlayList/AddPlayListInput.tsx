import XmarkICon from "@/asset/icons/XmarkIcon";
import { useFormik } from "formik";
import TippyHeadless from "@tippyjs/react/headless";
import { forwardRef, useImperativeHandle, useRef } from "react";
import * as Yup from "yup";
// create schema formik
const playlistSchema = Yup.object().shape({
  playlist: Yup.string()
    .required("Not empty!")
    .matches(/^(?=.{5,})/, "Playlist must contain at least 5 characters"),
});

export const AddPlayListInput = forwardRef<
  any,
  {
    isShow: boolean;
    hideInput: React.Dispatch<React.SetStateAction<boolean>>;
    handleOnSubmit: (playlistName: string) => void;
  }
>(function Component({ isShow, hideInput, handleOnSubmit }, ref) {
  const inputRef = useRef<HTMLInputElement>(null);
  // config formik
  const formik = useFormik({
    initialValues: {
      playlist: "",
    },
    validationSchema: playlistSchema,
    onSubmit: (value) => {
      handleOnSubmit(value.playlist);
    },
  });

  useImperativeHandle(ref, () => ({
    resetValue: () => {
      formik.resetForm();
    },
    focusInput: () => {
      inputRef.current?.focus();
    },
  }));
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
      {formik.touched.playlist && formik.errors.playlist && isShow ? (
        <p className="text-justify text-main-pink-be px-2">
          {formik.errors.playlist}
        </p>
      ) : null}
      <div
        className={`${
          isShow ? "h-[60px] opacity-100 py-2 mb-1" : ""
        } transition-all duration-500 h-0 opacity-0 flex justify-between bg-main-violet-4c  pl-2 pr-4 rounded-[10px] shadow-md shadow-[#00000040]`}
      >
        <input
          ref={inputRef}
          id="playlist"
          className={`${
            isShow ? "border-[2px] py-1" : ""
          } text-base font-nunito font-medium bg-transparent outline-none px-3 border-main-violet-a7 rounded-[4px] placeholder:text-main-whileColor-50`}
          placeholder="New list"
          {...formik.getFieldProps("playlist")}
        />
        <div className={`${isShow ? "" : "hidden"} flex items-center`}>
          <button
            type="submit"
            className="text-base font-nunito font-bold text-main-pink-f4 mr-3"
          >
            Create
          </button>
          <TippyHeadless
            render={(attrs) => (
              <div
                className="flex items-center text-main-whileColor text-sm font-medium py-1 px-3 bg-[#424242] rounded-[5px]"
                tabIndex={-1}
                {...attrs}
              >
                Close
              </div>
            )}
            placement="bottom"
          >
            <XmarkICon
              className="hover:text-main-pink-be cursor-pointer transition-colors outline-none"
              width="12px"
              height="12px"
              onClick={() => {
                formik.resetForm();
                hideInput(false);
              }}
            />
          </TippyHeadless>
        </div>
      </div>
    </form>
  );
});
