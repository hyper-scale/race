/* eslint-disable react/jsx-no-comment-textnodes */
import Image from "next/image";

export default function Footer() {

  return (
    <footer className="footer relative pt-1 border-b-2 border-blue-700">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-x-4 text-sm font-bold">
          <a
            href="https://beta.hyperscalefund.com"
            className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-opacity-30"
          >
            Home
          </a>
          <span className="separator"> // </span>
          <a
            href="https://twitter.com/HyperscaleFund"
            className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-opacity-30"
            rel="external noreferrer"
            target="_blank"
          >
            Twitter
          </a>
          <span className="separator"> // </span>
          <a
            href="https://discord.com/invite/pVSbzYny2c"
            className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-opacity-30"
            rel="external noreferrer"
            target="_blank"
          >
            Discord
          </a>
          <span className="ml-44">
            <a href="https://beta.hyperscalefund.com">
              <Image src="/hyperscale.svg" width="150" height="80" alt="" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
