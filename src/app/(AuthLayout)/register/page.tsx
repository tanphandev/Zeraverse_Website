import Image from "next/image";
import Logo from "@/asset/image/Logo.png";
import AuthForm from "@/components/AuthForm";

function RegisterPage() {
  return (
    <div className="inline-block bg-main-grayColor-70 rounded-[30px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center px-[61px] pt-[17px] pb-[40px] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.6)] shadow-main-whileColor-30">
      <Image className="w-[200px] h-[108px] mb-4" src={Logo} alt="Logo" />
      <AuthForm type="Register" />
    </div>
  );
}

export default RegisterPage;
