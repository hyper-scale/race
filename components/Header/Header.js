import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "../atoms/Button";

export default function Header() {
  const { data: _, status } = useSession();

  const discordBtnProps = {
    text: status === "authenticated" ? "Sign Out" : "Connect Discord",
    onClick: status === "authenticated" ? () => signOut("discord") : () => signIn("discord"),
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
          <Popover.Panel
            focus
            className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <Link href="/">
                    <a className="flex items-center gap-x-4">
                      <Image src="/logo.svg" width="60" height="60" alt="" />
                      <Image src="/hyperscale.svg" width="150" height="80" alt="" />
                    </a>
                  </Link>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close main menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="https://twitter.com/HyperscaleFund"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  rel="external noreferrer"
                  target="_blank"
                >
                  Twitter
                </a>
                <a
                  href="https://discord.com/invite/pVSbzYny2c"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  rel="external noreferrer"
                  target="_blank"
                >
                  Discord
                </a>
              </div>
              <Button color="primary" onClick={discordBtnProps.onClick}>
                {discordBtnProps.text}
              </Button>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </nav>
  );
}
