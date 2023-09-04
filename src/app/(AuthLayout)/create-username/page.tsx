"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
import * as userService from "@/services/user.service";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { staticPaths } from "@/utils/paths";
import { TOAST_MESSAGE } from "@/utils/constants";
const schema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter your name!")
    .min(2, "Name must contain at least 2 characters")
    .max(15, "Name be 20 characters or less"),
});
function CreateUserName() {
  const { token, setUsernameAuth } = useAuthContext();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: schema,
    onSubmit: (value) => {
      handleChangeUserName(value.username);
    },
  });
  const handleChangeUserName = async (username: string) => {
    try {
      if (token === null) return;
      const { data } = await userService.changeUserNameUser(username, token);
      setUsernameAuth(username);
      localStorage.setItem("username", `@${username}`);
      router.push(staticPaths.home);
      toast.success(TOAST_MESSAGE.CREATE_USER_NAME_SUCCESS);
    } catch (e: any) {
      toast.error(e.message);
      throw e;
    }
  };
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="inline-block bg-main-grayColor-70 rounded-[30px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center px-[61px] pt-[17px] pb-[40px] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.6)] shadow-main-whileColor-30"
    >
      <h1 className="text-[28px] font-bold font-nunito text-main-whileColor text-center mb-5">
        Create UserName
      </h1>
      <div className="mb-[50px]">
        <label
          htmlFor="username"
          className="text-base font-nunito font-medium text-main-whileColor block mb-2"
        >
          User Name
        </label>
        <input
          className="p-3 text-[18px] font-nunito text-main-blackColor font-semibold placeholder:text-main-whileColor-40 bg-main-whileColor rounded-[10px] w-[460px] outline-none"
          placeholder="Your Name"
          id="username"
          type="text"
          {...formik.getFieldProps("username")}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-main-pink-be max-w-[460px] text-justify">
            {formik.errors.username}
          </div>
        ) : null}
      </div>
      <button className="py-3 text-base text-main-whileColor font-nunito w-full bg-gradient-to-br from-[#f265e4] via-[#7a1dd8] to-[#5200ff] rounded-[20px]">
        Create
      </button>
    </form>
  );
}

export default CreateUserName;
