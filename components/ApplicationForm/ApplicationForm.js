import { Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import FormHeader from "./FormHeader";
import FormikController from "./FormikController";

const ApplicationForm = ({}) => {
  const TOO_SHORT = "Too short.";
  const TOO_LONG = "Too long.";
  const formValues = {
    form: [
      {
        name: "email",
        title: "Email",
        control: "input",
        type: "email",
      },
      {
        name: "projectName",
        title: "Project name",
        control: "input",
      },
      {
        name: "pitchTweet",
        title: "Pitch us your project in a tweet",
        control: "textArea",
        height: 48,
        limit: 280,
        maxLength: 280,
      },
      {
        name: "pitchProject",
        title: "Pitch us your project",
        control: "textArea",
        height: 48,
      },
      {
        name: "founderBackground",
        title: "Provide some background on each founder",
        control: "textArea",
        height: 48,
      },
      {
        name: "founderAbility",
        title: "Please state evidence of exceptional ability for each founder",
        control: "textArea",
        height: 48,
      },
      {
        name: "extraInfo",
        title: "Is there anything else we should know about?",
        control: "textArea",
        height: 48,
      },
      {
        name: "links",
        title: "Do you have any links to share?",
        control: "links",
      },
      /* DRAG & DROP UPLOAD COMPONENT GOES HERE -- can be integrated in the FormikController */
      {
        name: "referral",
        title: "Referral",
        control: "input",
        placeholder: "Optional",
      },
      {
        control: "footer",
      },
    ],
  };

  const ApplicationSchema = Yup.object().shape({
    email: Yup.string().email().required("Required"),
    projectName: Yup.string().min(1, TOO_SHORT).max(50, TOO_LONG).required("Required"),
    projectName: Yup.string().min(1, TOO_SHORT).max(50, TOO_LONG).required("Required"),
    pitchTweet: Yup.string().min(1, TOO_SHORT).max(280, TOO_LONG).required("Required"),
    pitchProject: Yup.string().min(1, TOO_SHORT).max(1000, TOO_LONG).required("Required"),
    founderBackground: Yup.string().min(1, TOO_SHORT).max(1000, "Too Long!").required("Required"),
    founderAbility: Yup.string().min(1, TOO_SHORT).max(1000, TOO_LONG).required("Required"),
    extraInfo: Yup.string().max(1000, TOO_LONG),
    referral: Yup.string().max(100, TOO_LONG),
  });

  const initialValues = {
    email: "",
    projectName: "",
    pitchTweet: "",
    pitchProject: "",
    founderBackground: "",
    founderAbility: "",
    extraInfo: "",
    links: [""],
    referral: "",
  };

  const onSubmit = (values) => console.log("Form data", values);

  return (
    <div
      id="application-form"
      className="bg-cover"
      style={{
        backgroundImage: "url('/img/application-page-BG.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div>
        <div className="w-1/2 mx-auto flex flex-col py-6">
          <div className="py-14 px-20 p-3 mb-5 drop-shadow-2xl bg-white rounded-lg">
            <FormHeader />
            <Formik initialValues={initialValues} validationSchema={ApplicationSchema} onSubmit={onSubmit}>
              {({}) => (
                <form className="flex flex-col py-10 space-y-6">
                  <FieldArray>
                    {() => {
                      return (
                        <>
                          {formValues.form.map((element, index) => {
                            return (
                              <>
                                <div className="flex flex-col">
                                  <FormikController
                                    control={element.control}
                                    type={element.type}
                                    label={element.title}
                                    name={element.name}
                                    placeholder={element.placeholder}
                                    height={element.height}
                                  />
                                </div>
                              </>
                            );
                          })}
                        </>
                      );
                    }}
                  </FieldArray>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
