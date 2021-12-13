// components
import Explanation from "../components/Explanation";
import Layout from "../components/Layout";
//
export default function Home() {
  return (
    <Layout>
      <Explanation />
      <div className="pointer-events-none">
        <div
          className="absolute top-[-667px] left-[626px] w-[1185px] h-[1186px] opacity-20"
          style={{
            background: "radial-gradient(50% 50% at 50% 50%, #4FFEFE 0%, rgba(93, 186, 239, 0) 100%)",
          }}
        />
        <div
          className="absolute top-[-463px] left-[-682px] w-[931px] h-[931px] opacity-20"
          style={{
            background: "radial-gradient(50% 50% at 50% 50%, #ED008E 0%, rgba(239, 93, 146, 0) 100%)",
          }}
        />
        <div
          className="absolute top-[-779px] left-[-82px] w-[1287px] h-[1287px] opacity-30"
          style={{
            background: "radial-gradient(50% 50% at 50% 50%, #5D5FEF 0%, rgba(93, 95, 239, 0) 100%)",
          }}
        />
      </div>
    </Layout>
  );
}
