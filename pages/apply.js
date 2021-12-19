import Layout from "../components/Layout";
import ApplicationForm from "../components/ApplicationForm/ApplicationForm";
import { getSession } from "next-auth/react";

export default function Apply({}) {
  return (
    <div>
      <Layout narrow={false} className="w-screen px-4 xl:px-0 px-4 xl:px-0">
        <ApplicationForm />
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const userSession = await getSession(context);
  if (!userSession) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { userSession },
  };
}
