export default function Button({ el, size, responsive, color, onClick, href, target, children }) {
  let classes = ["text-redrose", "font-bold", "focus:outline-none", "focus:ring-2", "focus:ring-offset-2"];
  if (size === "large") {
    classes.push("py-3", "px-12", "rounded-xl", "text-lg");
  } else {
    classes.push("py-2", "px-6", "rounded-lg", "text-medium");
  }
  if (color === "dark") {
    classes.push("text-white", "bg-slate-900", "hover:bg-slate-700", "focus:ring-slate-900");
  }
  if (color === "primary") {
    classes.push("text-white", "bg-indigo-500", "hover:bg-indigo-600", "focus:ring-indigo-500");
  }
  if (responsive === "true") {
    classes.push("w-full", "sm:w-max");
  }
  if (color === "primary-outline") {
    classes.push(
      "text-indigo-500",
      "bg-white",
      "border",
      "border solid",
      "border-indigo-500",
      "focus:border-indigo-600",
      "focus:text-indigo-600"
    );
  }
  let element = (
    <button className={classes.join(" ")} onClick={onClick}>
      {children}
    </button>
  );
  if (el === "a") {
    element = (
      <a className={classes.join(" ")} href={href} target={target}>
        {children}
      </a>
    );
  }
  return element;
}
