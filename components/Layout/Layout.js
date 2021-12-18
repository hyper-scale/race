import Head from "next/head";
import Header from "../Header/Header";
import Footer from "../../components/Footer";

export default function Layout({ narrow = true, title = "Hyperscale", children }) {
  const pageTitle = title !== "Hyperscale" ? `Hyperscale - ${title}` : title;

  var width = !narrow ? "" : "max-w-7xl";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div
        style={{
          backgroundImage: "url('/img/navigation-background.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-center">
          <div className="w-full max-w-7xl px-4 xl:px-0">
            <Header />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className={`w-full ${width} px-0 md:px-4 xl:px-0`}>{children}</div>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </>
  );
}
