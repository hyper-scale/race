import Head from "next/head";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout({ title = "Hyperscale", children }) {
  const pageTitle = title !== "Hyperscale" ? `Hyperscale - ${title}` : title;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex justify-center">
        <div className="w-screen max-w-7xl px-4 xl:px-0">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
