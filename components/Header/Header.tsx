import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "../atoms/Button";

const Header: React.FunctionComponent = () => {
  const { data: _, status } = useSession();
  const router = useRouter();

  const discordBtnProps = {
    text: status === "authenticated" ? "Sign Out" : "Connect Discord",
    onClick: status === "authenticated" ? () => signOut() : () => signIn("discord"),
  };

  return (
    <nav>
      <Popover className="flex items-center justify-items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-x-4">
            <Image src="/logo.svg" width="40" height="40" alt="" />
            <Image src="/hyperscale.svg" width="150" height="80" alt="" />
          </a>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center space-x-0 xl:space-x-2 text-redrose">
          <a
            href="#"
            onClick={() => router.push({ pathname: "/dao-directory" })}
            className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-opacity-30"
            rel="external noreferrer"
            target=""
          >
            DAO Directory
          </a>
          <a
            href="https://twitter.com/HyperscaleFund"
            className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-opacity-30"
            rel="external noreferrer"
            target="_blank"
          >
            Twitter
          </a>
          <a
            href="https://discord.com/invite/pVSbzYny2c"
            className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-opacity-30"
            rel="external noreferrer"
            target="_blank"
          >
            Discord
          </a>
          <Button color="primary" onClick={discordBtnProps.onClick}>
            {discordBtnProps.text}
          </Button>
        </div>
        {/* Mobile Navigation */}
        <div className="-mr-2 flex items-center md:hidden">
          <Popover.Button className="bg-white bg-opacity-30 rounded-md p-2 inline-flex items-center justify-center text-gray-600 hover:text-gray-500 hover:bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Open main menu</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel focus className="fixed inset-y-0 inset-x-0  transform origin-top-right">
            <div className="rounded-lg height-shadow-md bg-white ring-1 ring-black ring-opacity-5 ">
              <div className="px-5 pt-4 flex items-center justify-space-evenly">
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close main menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className=" px-40 pt-1 pb-3 space-y-10">
                <a
                  href="https://www.hyperscalefund.com/"
                  className="flex items-center justify-center block px-3.5 py-2 rounded-md text-base font-medium text-black hover:text-gray-900 hover:bg-gray-50"
                  rel="external noreferrer"
                  target="_blank"
                >
                  Home
                </a>
                <a
                  href="https://twitter.com/HyperscaleFund"
                  className="flex items-center justify-center block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-900 hover:bg-gray-50"
                  rel="external noreferrer"
                  target="_blank"
                >
                  Twitter
                </a>
                <a
                  href="https://discord.com/invite/pVSbzYny2c"
                  className="flex items-center justify-center block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-900 hover:bg-gray-50"
                  rel="external noreferrer"
                  target="_blank"
                >
                  Discord
                </a>
              </div>
              <div className="relative flex items-center justify-center px-36 pt-8 pb-10 space-y-1">
                <Button color="primary" onClick={discordBtnProps.onClick}>
                  {discordBtnProps.text}
                </Button>
              </div>
              <Link href="/">
                <a className="flex items-center justify-center gap-x-4 px-40 pt--40 pb-3 space-y-4">
                  <Image src="/logo.svg" width="60" height="60" alt="" />
                </a>
              </Link>
              <a className="flex items-center justify-center gap-x-4 px-24 pt--40  pb-3 space-y-1">
                <Image src="/hyperscale.svg" width="160" height="80" alt="" />
              </a>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </nav>
  );
}
export default Header;