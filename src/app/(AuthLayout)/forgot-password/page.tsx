"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "@/asset/image/Logo.png";
import * as AuthService from "@/services/auth.service";
import { toast } from "react-toastify";
import { MODAL_NAME, TOAST_MESSAGE } from "@/utils/constants";
import { useModalContext } from "@/contexts/ModalContextProvider";

// create schema formik
const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter your email!")
    .email("Invalid email!"),
});
function ForgotPassword() {
  const router = useRouter();
  const { openModal, closeModal } = useModalContext();
  //config formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (value) => {
      handleForgotPassword({ email: value.email });
    },
  });

  const handleForgotPassword = async (forgotData: { email: string }) => {
    openModal(MODAL_NAME.LOADING);
    try {
      const { success, data } = await AuthService.forgotPassword(forgotData);
      if (success) {
        closeModal();
        toast.success(TOAST_MESSAGE.RESET_PASSWORD);
      }
    } catch (e: any) {
      closeModal();
      toast.error(e?.message);
      throw e;
    }
  };

  const handleOnClickLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/login");
  };
  return (
    <div className="inline-block bg-main-grayColor-70 rounded-[30px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center px-[61px] pt-[17px] pb-[40px]  shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.6)] shadow-main-whileColor-30">
      <Image className="w-[200px] h-[108px] mb-4" src={Logo} alt="Logo" />
      <form
        onSubmit={formik.handleSubmit}
        className="text-main-whileColor font-lato"
      >
        <h1 className="text-[28px] font-bold mb-[25px] border-b-[1px] border-main-violet-7c pb-1">
          Submit to your email
        </h1>
        <label
          htmlFor="forgotpassword"
          className="text-base font-bold leading-[1.6] block"
        >
          Please enter your email
        </label>
        <input
          id="forgotpassword"
          type="text"
          {...formik.getFieldProps("email")}
          className="bg-main-violet-ed text-main-blackColor w-[400px] h-[45px] rounded-[10px] outline-none px-3"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-main-pink-be">{formik.errors.email}</div>
        ) : null}
        <div className="flex justify-end mt-[25px]">
          <button
            onClick={handleOnClickLogin}
            className="text-[#898989] text-base font-bold leading-[1.6] px-[29px] py-[5px] bg-main-whileColor rounded-[20px] mr-4"
          >
            Back
          </button>
          <button
            type="submit"
            className="text-main-whileColor text-base font-bold leading-[1.6] px-[40px] py-[5px] bg-gradient-to-br from-[#F265E4] via-[#7270FF] to-[#5200FF] rounded-[20px]"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
