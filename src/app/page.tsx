import VideoLoop from "@/components/videoloop";
import Image from "next/image";
import gro from "../../public/gro.png";

export default function Home() {
  return (
    <div className=" min-h-screen flex flex-col md:flex-row gap-14 items-center grid-container">
      <div className="h-full md:h-[85vh] w-full flex flex-col justify-between pt-5 md:py-0">
        <div className="w-[70%]">
          <Image
            src={gro}
            alt="Loop 1"
            layout="responsive"
            width={1000}
            height={1000}
            className=" mx-auto"
          />
        </div>
        <div className="md:hidden w-full h-full py-">
          <VideoLoop />
        </div>
        <div className="text-center mb-4">
          <p className="text-white font-semibold text-[16px] md:text-[20px] text-left">
            Cultivating growth through community,
            <br /> mindset, and processes to enable driven <br /> individuals to
            reach their potential. <br /> <br />
            <span className="font-normal">
              Designed by
              <a href="https://www.forssdigital.com/"> Forss Digital</a>
            </span>
          </p>
        </div>
      </div>
      <div className="w-full h-full z-10 hidden md:block">
        <VideoLoop />
      </div>
    </div>
  );
}
