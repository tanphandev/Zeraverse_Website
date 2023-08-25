"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import FacebookColorIcon from "@/asset/icons/FacebookColorIcon";
import GoogleIcon from "@/asset/icons/GoogleIcon";
import HidePasswordIcon from "@/asset/icons/HidePasswordIcon";
import ShowPasswordIcon from "@/asset/icons/ShowPasswordIcon";
import { loginEmail } from "@/redux-toolkit/slices/authenticationSlice";
import { AppDispatch } from "@/redux-toolkit/store";
import { currentUserSelector } from "@/redux-toolkit/selectors/authenticationSelector";
// create schema formik
const LoginEmailSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please Enter your password!")
    .email("Invalid email!"),
  password: Yup.string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Password must contain at least 6 characters, have Uppercase, Lowercase"
    ),
});

function AuthForm({ type }: { type: string }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(currentUserSelector);
  // check currentUser
  if (currentUser) {
    if (!currentUser.username) {
      router.push("/create-username");
    } else {
      router.push("/");
    }
  }
  //config formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginEmailSchema,
    onSubmit: (value) => {
      const loginUser: LoginUser = {
        email: value.email,
        password: value.password,
      };
      dispatch(loginEmail(loginUser));
    },
  });
  // Go to Forgot password page
  const handleOnClickForgotPass = () => {
    router.push("/forgot-password");
  };
  // Go to Register page
  const handleOnClickRegister = () => {
    router.push("/register");
  };
  // Go to Login page
  const handleOnClickLogin = () => {
    router.push("/login");
  };
  //toggle Password Visibility event
  const togglePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="text-main-whileColor font-lato"
    >
      <div className="mb-[10px]">
        <label htmlFor="email" className="text-base font-bold block">
          Email
        </label>
        <input
          id="email"
          type="text"
          {...formik.getFieldProps("email")}
          className="bg-main-violet-ed text-main-blackColor w-[400px] h-[45px] rounded-[10px] outline-none px-3"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-main-pink-be">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="mb-1">
        <label htmlFor="password" className="text-base font-bold block">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            {...formik.getFieldProps("password")}
            type={isPasswordVisible ? "text" : "password"}
            className="bg-main-violet-ed text-main-blackColor w-[400px] h-[45px] rounded-[10px] outline-none px-3"
          />
          <button
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-[10px] -translate-y-1/2"
          >
            {isPasswordVisible ? (
              <HidePasswordIcon width="20px" height="20px" />
            ) : (
              <ShowPasswordIcon width="20px" height="20px" />
            )}
          </button>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <p className="text-justify max-w-[400px] text-main-pink-be">
            {formik.errors.password}
          </p>
        ) : null}
      </div>
      {type === "Login" ? (
        <div className="flex justify-end">
          <p
            onClick={handleOnClickForgotPass}
            className="inline text-sm font-semibold text-right text-main-violet-c4 mb-[15px] hover:text-[#6664ed] cursor-pointer"
          >
            Forgot the password ?
          </p>
        </div>
      ) : (
        <div className="flex text-center justify-center mb-[14px]">
          <input type="checkbox" className="mr-[5px]" />
          <p className="text-xs inline-block">
            I accept the{" "}
            <span className="text-main-violet-c4">Terms & Conditions</span> and{" "}
            <span className="text-main-violet-c4">Privacy</span>
          </p>
        </div>
      )}
      <button type="submit" className="w-full mb-[11px]">
        <p className=" rounded-[20px] bg-gradient-to-br from-[#F265E4] via-[#7270FF] to-[#5200FF] py-2">
          {type}
        </p>
      </button>
      <p className="text-sm font-semibold mb-[7px] text-center">
        or sign in with
      </p>
      <div className="flex justify-between mb-[16px]">
        <button className="bg-main-whileColor rounded-[20px] px-[19px] py-2">
          <GoogleIcon
            className="inline-block mr-[10px]"
            width="25px"
            height="25px"
          />{" "}
          <p className="text-xs font-normal inline-block text-main-blackColor">
            Continue with Google
          </p>
        </button>
        <button className="bg-main-whileColor rounded-[20px] px-[19px] py-2">
          <FacebookColorIcon
            className="inline-block mr-[10px]"
            width="25px"
            height="25px"
          />
          <p className="text-xs font-normal inline-block text-main-blackColor">
            Continue with Facebook
          </p>
        </button>
      </div>
      {type === "Login" ? (
        <p className="text-base font-bold text-center">
          No account yet?
          <span
            onClick={handleOnClickRegister}
            className=" text-main-violet-c4 ml-4 cursor-pointer hover:text-[#6664ed]"
          >
            Register Now!
          </span>
        </p>
      ) : (
        <p className="text-base font-bold text-center">
          Already registered?
          <span
            onClick={handleOnClickLogin}
            className=" text-main-violet-c4 ml-4 hover:text-[#6664ed] cursor-pointer"
          >
            Sign in
          </span>
        </p>
      )}
    </form>
  );
}

export default AuthForm;
