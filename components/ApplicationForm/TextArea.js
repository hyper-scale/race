import { Field, ErrorMessage } from "formik";

function TextArea(props) {
  const { label, name, height, ...rest } = props;
  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-10 justify-between">
        <label htmlFor={name} className="mb-2 font-bold">
          {label}
        </label>
        <ErrorMessage name={name}>
          {(msg) => (
            <div className="mb-2 font-semibold text-[14px]" style={{ color: "red" }}>
              {msg}
            </div>
          )}
        </ErrorMessage>
      </div>
      <Field
        className={`p-5 h-${height} rounded-lg border-2 border-[#D8D8D8]`}
        as="textarea"
        id={name}
        name={name}
        {...rest}
      />
    </div>
  );
}

export default TextArea;
