import VideoLoop from "@/components/videoloop";
import Image from "next/image";
import gro from "../../public/grocommunity.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-[-30px] h-[90vh] overflow-hidden sc flex flex-col md:flex-row gap-14 items-center grid-container ">
      <div className="h-full md:h-[90vh] w-full flex flex-col justify-between  md:py-0">
        <div className=" md:w-[80%] mt-20">
          <Link href="/">
            <Image
              src={gro}
              alt="Loop 1"
              layout="responsive"
              width={1000}
              height={1000}
              className=" mx-auto"
            />
            <p className=" py-4 text-[15px] text-[#FFD626] font-bold">
              - .... . / -.-. --- -.. . / - --- / ... ..- -.-. -.-. . ... ... /
              .--. .- ... ... .. <br />
              --- -. / - --- --. . - .... . .-. -. . ... ... / --. .-. .. –
            </p>
          </Link>
        </div>
        <div className="md:hidden w-full h-full py-">
          <VideoLoop />
        </div>
        <div className="text-center mb-4">
          <p className="text-white font-semibold text-[16px] md:text-[20px] text-left">
            We boost and accelerate early-stage entrepreneurs through <br />
            value-creating activities and inspiring people. <br />
            All to clarify their goals and realize their dreams! <br />
            {/* <span className="font-normal">
              Designed by
              <a href="https://www.forssdigital.com/"> Forss Digital</a>
            </span> */}
          </p>
        </div>
      </div>
      <div className="w-full h-full z-10 hidden md:block">
        <VideoLoop />
      </div>
    </div>
  );
}
