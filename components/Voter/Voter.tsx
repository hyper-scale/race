 type props={
   voter:string,
   image:string
 }
 const Voter:React.FunctionComponent<props>=({ voter, image}:props) => {
  return (
    <div className="flex flex-row items-center w-[fit-content]">
      <div>
        <div className="h-8 w-8 bg-gray-300 h-full rounded-full"></div>
      </div>
      <div className="flex-1 px-4 font-semibold text-gray-600">@{voter}</div>
    </div>
  );
}
export default Voter
