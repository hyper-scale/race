import Image from "next/image";

const Spinner: React.FunctionComponent = () => {
  return (
    <div
      style={{
        animation: "spin 500ms linear infinite reverse",
        width: "30px",
        height: "30px",
      }}
    >
      <Image src="/spinner.png" width="30" height="30" alt="" />
    </div>
  );
};

export default Spinner;
