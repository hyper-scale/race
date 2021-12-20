import Input from "./Input";
import TextArea from "./TextArea";
import LinksModule from "./LinksModule";
import FormFooter from "./FormFooter";
import FileUploader from "./FileUploader";

function FormikController(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textArea":
      return <TextArea {...rest} />;
    case "links":
      return <LinksModule {...rest} />;
    case "footer":
      return <FormFooter {...rest} />;
    case "upload":
      return <FileUploader {...rest} />;
    default:
      return null;
  }
}
export default FormikController;
