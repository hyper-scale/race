import Layout from "../components/Layout";
import ApplicationForm from "../components/ApplicationForm/ApplicationForm";

export default function Apply({}) {
  return (
    <div>
      <Layout className="w-screen max-w-3xl px-4 xl:px-0">
        <ApplicationForm />
      </Layout>
    </div>
  );
}
