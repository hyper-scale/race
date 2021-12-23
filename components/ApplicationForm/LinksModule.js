import { FieldArray, useFormikContext } from "formik";
import Input from "./Input";

function LinksModule(props) {
  const { name, label } = props;
  return (
    <div>
      <div id="links-sections" className="">
        <label htmlFor="email" className="mb-2 font-bold">
          {label}
        </label>
        <FieldArray key="links" className="w-200">
          {(arrayHelpers) => {
            return (
              <div className="space-y-4">
                {/* add vertical spacing at this level, eg. space-y-2 */}
                <div className="">
                  {arrayHelpers.form.values.links.map((_, index) => (
                    <Input key={index} name={`${name}.${index}`} placeholder="http://" />
                  ))}
                </div>

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
              </div>
            );
          }}
        </FieldArray>
      </div>
    </div>
  );
}

export default LinksModule;
