export interface IVoter {
  voter: string;
  image: string;
  power?: any;
  username?: string;
}
const Voter: React.FunctionComponent<IVoter> = ({ voter, image, power }: IVoter) => {
  return (
    <div className="flex flex-row items-center w-[fit-content]">
      <div>
        <div className="h-8 w-8 bg-gray-300 h-full rounded-full"></div>
      </div>
      <div className="bg-gray-200 text-sm rounded-full px-2 font-medium text-gray-400 w-[fit-content]">{power}</div>
      <div className="flex-1 px-4 font-semibold text-gray-600">@{voter}</div>
    </div>
  );
};
export default Voter;
