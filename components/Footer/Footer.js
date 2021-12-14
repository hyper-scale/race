import Image from "next/image";
import Link from "next/link";

export default function Footer() {

  return (
    <footer className="footer relative pt-1">
      <div className="container mx-auto px-6">
        <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
          <div className="sm:w-2/3 text-center py-6">
              <span className="text-sm font-bold mb-2">
                <Link
                  href="/"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-opacity-30"
                >
                  Home   //
                </Link><a
                  href="https://twitter.com/HyperscaleFund"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-opacity-30"
                  rel="external noreferrer"
                  target="_blank"
                >
                  Twitter   //
                </a><a
                  href="https://discord.com/invite/pVSbzYny2c"
                  className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-opacity-30"
                  rel="external noreferrer"
                  target="_blank"
                >
                  Discord
                </a><Link href="/">
                  <a className="flex items-center gap-x-4">
                    <Image src="/hyperscale.svg" width="150" height="80" alt="" />
                  </a>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </footer>
  );
}
