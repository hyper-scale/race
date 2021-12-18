import { FieldArray, useFormikContext } from "formik";
import Input from "./Input";

function LinksModule(props) {
  const { name, label } = props;
  const { initialValues } = useFormikContext();
  return (
    <div className="space-y-3">
      <div id="links-sections" className="flex flex-col space-y-2">
        <label htmlFor="email" className="mb-2 font-semibold">
          {label}
        </label>
        <FieldArray key="links" className="w-200">
          {(arrayHelpers) => {
            return (
              <>
                {initialValues.links.map((_, index) => {
                  return (
                    <>
                      <Input name={`${name}.${index}`} placeholder="https://" />
                    </>
                  );
                })}
                <div>
                  <button
                    onClick={() => {
                      arrayHelpers.form.values.links.push("");
                      arrayHelpers.push({});
                    }}
                    className="p-3 mx-auto border border-indigo-600 rounded-xl text-left font-semibold"
                    style={{ color: "#5F75EE" }}
                    type="button"
                  >
                    Add link
                  </button>
                </div>
              </>
            );
          }}
        </FieldArray>
      </div>
    </div>
  );
}

export default LinksModule;
