import Layout from "../components/Layout";
import ApplicationForm from "../components/ApplicationForm/ApplicationForm";

export default function Apply({}) {
  return (
    <div>
      <Layout narrow={false} className="w-screen px-4 xl:px-0 px-4 xl:px-0">
        <ApplicationForm />
      </Layout>
    </div>
  );
}
