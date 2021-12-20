import { useFormikContext } from "formik";

function FormFooter({ isSubmitting }) {
  // Then inside the component body
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center space-x-2">
        <input
          className="form-checkbox border-y-4 border-indigo-500"
          type="checkbox"
          style={{ color: "#767676" }}
          required
        />

        <span className="inline-block align-middle text-sm inline-block">
          <p1 className="mx-auto font-semibold text-[16px]" style={{ color: "#AEAEAE" }}>
            I agree to the
          </p1>{" "}
          <a className="font-semibold text-[16px]" href="url" style={{ color: "#5F75EE" }}>
            {" "}
            Terms{" "}
          </a>
          <p1 className="font-semibold text-[16px]" style={{ color: "#AEAEAE" }}>
            {" "}
            and{" "}
          </p1>
          <a className="font-semibold text-[16px]" href="url" style={{ color: "#5F75EE" }}>
            {" "}
            Privacy Policy
          </a>
        </span>
      </div>
      <button
        style={{ background: "#5F75EE", color: "#fff" }}
        className="w-1/5 h-12 border border-indigo-600 rounded-xl font-bold accent-indigo-900"
        disabled={isSubmitting}
        type="submit"
      >
        Submit
      </button>
    </div>
  );
}

export default FormFooter;
