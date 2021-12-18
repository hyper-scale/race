function FormHeader({ days }) {
  days = 2;
  return (
    <div className="mx-auto flex flex-col space-y-4">
      <h1 className="mx-auto text-5xl text-gray-900">Enter the DAO race!</h1>
      <p1 className="mx-auto text-[#767676]">Hyperscale Application (next race in {days} days)</p1>
    </div>
  );
}

export default FormHeader;
