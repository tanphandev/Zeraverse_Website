function AuthLayout({ children }: { children: string }) {
  return (
    <div className="bg-authBackround bg-cover w-full h-[100vh] relative">
      {children}
    </div>
  );
}

export default AuthLayout;
