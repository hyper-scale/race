import { Fragment } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';



// components
import Leaderboard from '../components/Leaderboard/Leaderboard';

const connectWallet = () => alert(`Coming soon!`);

export default function Home() {
  return (
    <>
      <Head>
        <title>Hyperscale - DAO Race</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      
      </Head>

      <div className="flex justify-center">
        <div className="w-screen max-w-7xl">
          <nav>
            <Popover className="flex items-center justify-between">
              <Link href="/">
                <a className="flex items-center gap-x-4">
                    <Image src="/logo.svg" width="60" height="60" alt="" />
                    <Image src="/hyperscale.svg" width="150" height="80" alt="" />
                </a>
              </Link>
              {/* Desktop Navigation */}
              <div className="hidden md:flex md:items-center md:space-x-4">
                <Link href="/">
                  <a className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-opacity-30">Home</a>
                </Link>
                <Link href="/daorace">
                <a  className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-opacity-30">DAO Race</a>
                </Link>
                <a href="https://twitter.com/HyperscaleFund" className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-opacity-30" rel="external noreferrer" target="_blank">Twitter</a>
                <a href="https://discord.com/invite/pVSbzYny2c" className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-opacity-30" rel="external noreferrer" target="_blank">Discord</a>
                <button className="inline-flex items-center px-4 py-2 border border-transparent font-medium rounded shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={connectWallet}>
                Connect Discord
                </button>
              </div>
              {/* Mobile Navigation */}
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="bg-white bg-opacity-30 rounded-md p-2 inline-flex items-center justify-center text-gray-600 hover:text-gray-500 hover:bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <Transition as={Fragment} enter="duration-150 ease-out" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="duration-100 ease-in" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Popover.Panel focus className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
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
                      <Link href="/">
                        <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</a>
                      </Link>
                      <Link href="/daorace">
                      <a  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">DAO Race</a>
                      </Link>
                      <a href="https://twitter.com/HyperscaleFund" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" rel="external noreferrer" target="_blank">Twitter</a>
                      <a href="https://discord.com/invite/pVSbzYny2c" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50" rel="external noreferrer" target="_blank">Discord</a>
                    </div>
                    <button className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={connectWallet}>
                      Connect Discord
                    </button>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </nav>

          <Leaderboard />
          {/* <div className="pointer-events-none">
            <div
              className="absolute top-[-667px] left-[626px] w-[1185px] h-[1186px] opacity-20"
              style={{
                background:
                "radial-gradient(50% 50% at 50% 50%, #4FFEFE 0%, rgba(93, 186, 239, 0) 100%)",
              }}
            />
            <div
              className="absolute top-[-463px] left-[-682px] w-[931px] h-[931px] opacity-20"
              style={{
                background:
                "radial-gradient(50% 50% at 50% 50%, #ED008E 0%, rgba(239, 93, 146, 0) 100%)",
              }}
            />
            <div
              className="absolute top-[-779px] left-[-82px] w-[1287px] h-[1287px] opacity-30"
              style={{
                background:
                "radial-gradient(50% 50% at 50% 50%, #5D5FEF 0%, rgba(93, 95, 239, 0) 100%)",
              }}
            />
          </div> */}
         
        </div>
      </div>
    </>
  );
}