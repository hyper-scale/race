import { useState } from "react";
import { Form, Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import FormHeader from "./FormHeader";
import FormikController from "./FormikController";

const ApplicationForm = ({}) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      {
        title: "Do you have any files to share?",
        control: "upload",
      },
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
    links: Yup.array().of(Yup.string().url("Must be a valid url (e.g. http://...)")),
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
    links: [],
    referral: "",
    helpfulUploads: [],
  };

  const onSubmit = (values, actions) => {
    fetch(`/api/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        additionalDetails: values.extraInfo,
        emailAddress: values.email,
        evidenceOfExceptionalAbility: values.founderAbility,
        founderBackground: values.founderBackground,
        helpfulLinks: values.links.filter((link) => link),
        productPitch: values.pitchProject,
        projectName: values.projectName,
        projectTweet: values.pitchTweet,
        referral: values.referral,
        helpfulUploads: values.helpfulUploads,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setErrorMessage(null);
          setSuccessMessage(`We've received your application. Thank you!`);
        } else {
          throw "Request failed.";
        }
      })
      .catch((error) => {
        setErrorMessage(`We could not save your application. It failed with error: ${error}. Please try again.`);
        setSuccessMessage(null);
      })
      .finally((response) => {
        actions.setSubmitting(false);
        actions.resetForm();
        window.scrollTo(0, 0);
      });
  };

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
            {(errorMessage || successMessage) && (
              <div className="mb-4 rounded-sm">
                {errorMessage && <p className="bg-red-100 p-3">{errorMessage}</p>}
                {successMessage && <p className="bg-lime-100 p-3">{successMessage}</p>}
              </div>
            )}
            <FormHeader />
            <Formik initialValues={initialValues} validationSchema={ApplicationSchema} onSubmit={onSubmit}>
              {({ values }) => (
                <Form className="flex flex-col py-10 space-y-6">
                  <FieldArray>
                    {() =>
                      formValues.form.map((element, index) => (
                        <div className="flex flex-col" key={index}>
                          <FormikController
                            control={element.control}
                            type={element.type}
                            label={element.title}
                            name={element.name}
                            placeholder={element.placeholder}
                            height={element.height}
                            values={values}
                          />
                        </div>
                      ))
                    }
                  </FieldArray>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
