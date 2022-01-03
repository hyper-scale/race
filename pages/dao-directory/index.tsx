import React from "react";
import Layout from "../../components/Layout";
import Breadcrumbs from "../../components/Breadcrumbs";

const breadcrumbs = [
  { url: "/", text: "Home" },
  { url: "", text: "DAO Directory" },
];

export default function DaoDirectory({}) {
  return (
    <>
      <Layout title="DAO Directory">
        <div className="hidden md:block">
          <Breadcrumbs list={breadcrumbs} />
        </div>
      </Layout>
    </>
  );
}
