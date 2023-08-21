import Link from "next/link";

function AboutUs() {
  return (
    <div className="font-lato text-main-whileColor border-[5px] border-main-pink-f4 rounded-[20px] bg-main-grayColor-80 py-[24px] px-[28px] mb-[40px]">
      <Link
        href={"/home"}
        className="text-sm font-bold text-main-pink-ec cursor-pointer"
      >
        {"<"} Back
      </Link>
      <p className="text-xs font-bold mb-[20px] mt-5">Home / About us </p>
      <h1 className="font-bold">ABOUT US</h1>
      <div className="text-base font-bold font-nunito text-justify">
        <p>
          Welcome to Zeraverse.io! We are passionate about bringing you the best
          gaming experience possible, and we do that by offering a unique
          synchronous experience across games & devices.
        </p>
        <br />
        <p>
          Our vision is to create a platform where players can enjoy their
          favorite games & earn rewards seamlessly across multiple games &
          devices, without ever missing a beat. Whether you&apos;re playing on
          your desktop, tablet, or mobile phone, our rewards system are designed
          to work flawlessly and synchronously, so you can play a game and bring
          the coin erned to other games, no matter which game you play.
        </p>
        <br />
        <p>
          We believe that gaming should be an immersive, social experience, and
          that&apos;s why we&apos;ve built our portal to be more than just a
          collection of games. Our community features allow you to chat in a
          group with other players, share your achievements, and showing your
          results in a Hall of Fame. We&apos;re constantly innovating and adding
          new features to make your gaming experience even more enjoyable.
        </p>
        <br />
        <p>
          At our core, we&apos;re gamers just like you, and we&apos;re committed
          to bringing you the best possible gaming experience. So come join us,
          and let&apos;s game together!
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
