import Image from "next/image";

// assets
import Hyperscale from "../../public/hyperscale.svg";
import Backslash from "../../public/backslash.svg";
const Footer: React.FunctionComponent = () => {
  return (
    <div className="w-full bg-[#FBFBFF] flex justify-center px-4 py-6 md:py-10">
      <div className="w-screen max-w-7xl flex flex-wrap justify-center px-3">
        <div className="flex items-center justify-center md:justify-start grow basis-full md:basis-1">
          <a
            href=""
            className="rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-opacity-30"
            rel="external noreferrer"
            target=""
          >
            Home
          </a>{" "}
          <div className="w-4 mx-4 pt-1">
            <Image src={Backslash} height="" alt=""></Image>
          </div>
          <a
            href="https://twitter.com/HyperscaleFund"
            className="rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-opacity-30"
            rel="external noreferrer"
            target="_blank"
          >
            Twitter
          </a>
          <div className="w-4 mx-4 pt-1">
            <Image src={Backslash} height="" alt=""></Image>
          </div>
          <a
            href="https://discord.com/invite/pVSbzYny2c"
            className="rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-opacity-30"
            rel="external noreferrer"
            target="_blank"
          >
            Discord
          </a>
        </div>
        <div className="flex justify-center grow basis-full md:basis-1 mt-4 md:mt-0">
          <Image src={Hyperscale} width="95" alt=""></Image>
        </div>
        <div className="grow basis-0 md:basis-1" />
      </div>
    </div>
  );
};

export default Footer;
