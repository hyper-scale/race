import { Fragment } from "react";

export default function Breadcrumbs({ list }) {
  return (
    <div className="w-full py-6">
      <ol className="list-reset flex text-grey-dark">
        {list.map((item, i) => (
          <Fragment key={`breadcrumb-item-${i}`}>
            <li>
              {item.url ? <a href={item.url}>{item.text}</a> : <span className="font-semibold">{item.text}</span>}
            </li>
            {i < list.length - 1 && (
              <li>
                <span className="font-bold text-gray-400">
                  <img src="/arrow.svg"></img>
                </span>
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </div>
  );
}

{
  /* <svg
xmlns="http://www.w3.org/2000/svg"
className="h-6 w-6"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
> */
}
