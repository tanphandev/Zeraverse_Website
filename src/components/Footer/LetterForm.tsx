"use client";
import { nonTokenRequireAPIs } from "@/api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiCaller from "@/api/apiCaller";
import { toast } from "react-toastify";
import useSWR from "swr";
import { use } from "react";
type FormData = {
  name: string;
  email: string;
};
// create schema formik
const newsLetterSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .required("Please enter your email!")
    .email("Invalid email!"),
});

//call api to fetch newsletter
const newsLetterFetcher = async (formData: FormData): Promise<any> => {
  const data = await ApiCaller.post(nonTokenRequireAPIs.newLetter, formData);
  return data;
};
function LetterForm() {
  //config formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: newsLetterSchema,
    onSubmit: async (value: FormData) => {
      const newsLetter = await newsLetterFetcher(value);
      if (newsLetter.success) {
        toast.success("You have successfully subscribed");
      } else {
        toast.error("You register failed");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="font-lato mr-[116px]">
      <h3 className="text-main-whileColor font-semibold mb-[11px] font-lato">
        Join our newsletter
      </h3>
      <input
        id="name"
        className="outline-none w-[296px] rounded-[10px] p-[7px] leading-[1.6] text-base text-main-blackColor block mb-[11px]"
        placeholder="Enter your name"
        {...formik.getFieldProps("name")}
      />
      {formik.touched.name && formik.errors.name ? (
        <div className="text-main-pink-be">{formik.errors.name}</div>
      ) : null}
      <input
        id="email"
        className="outline-none w-[296px] h-[40px] rounded-[10px] p-[7px] leading-[1.6] text-base text-main-blackColor mb-[11px]"
        placeholder="Enter your email"
        {...formik.getFieldProps("email")}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="text-main-pink-be">{formik.errors.email}</div>
      ) : null}
      <button
        type="submit"
        className="block text-base text-main-whileColor font-bold leading-[1.6] px-[10px] py-[5px] rounded-[10px] bg-gradient-to-tl from-[#5200FF] to-[#F265E4] "
      >
        Subscribe now
      </button>
    </form>
  );
}

export default LetterForm;
