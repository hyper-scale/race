import { Field, useFormikContext } from "formik";
import React from "react";
import { ListGroup, ListGroupItem, Row, Button } from "reactstrap";

let Dropzone = null;

export class FileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { files: [] };
    this.dz = null;
  }

  async uploadFile(file) {
    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };
    const response = await fetch(`api/uploads`, requestOptions);
    return response.json(); // parses JSON response into native JavaScript objects
  }

  componentDidMount() {
    Dropzone = Dropzone || require("dropzone").default;
    Dropzone.autoDiscover = false;
    this.dz = new Dropzone(document.getElementById("dropzone-multiple"), {
      url: "/",
      addRemoveLinks: false,
      method: "post",
      chunking: true,
      forceChunking: true,
      maxFiles: 2,
      maxFilesize: 100, // mb
      acceptedFiles: null,
      autoQueue: false,
      autoProcessQueue: false,
      previewsContainer: document.getElementsByClassName("dz-preview-multiple")[0],
      previewTemplate: document.getElementsByClassName("dz-preview-multiple")[0].innerHTML,
    });
    this.dz.on("addedfile", (file) => {
      // TODO: file validation
      console.log(`addedfile ${file}`);

      this.uploadFile(file)
        .then((response) => {
          const url = response.url;
          if (url) {
            this.props.values.helpfulUploads.push({
              url: url,
              filename: file.name,
              size: file.size,
            });
          }
        })
        .catch((error) => console.log("error", error));
    });

    this.dz.on("removedfile", (removedFile) => {
      // TODO: improve flow, do we really want to depend on file name?
      this.props.values.helpfulUploads = this.props.values.helpfulUploads.filter(
        (x) => x.filename !== removedFile.name
      );
    });
  }

  render() {
    const { label, name } = this.props;
    return (
      <div className="flex flex-col">
        <div className="flex flex-row space-x-10 justify-between">
          <label htmlFor={name} className="mb-2 font-bold">
            {label}
          </label>
        </div>

        <div className="space-y-4">
          <div
            className="p-4 flex flex-row space-x-3 rounded-lg dropzone dropzone-multiple"
            id="dropzone-multiple"
            style={{ background: "#010C4B0D" }}
          >
            <div className="w-full flex flex-row  justify-between items-center dz-message" data-dz-message>
              <div className="flex flex-row space-x-4">
                <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.0014 13.9995L12.0014 9.9995M12.0014 9.9995L8.00143 13.9995M12.0014 9.9995L12.0014 18.9995M20.3914 16.3895C21.3668 15.8578 22.1373 15.0164 22.5813 13.9981C23.0253 12.9799 23.1176 11.8427 22.8436 10.7662C22.5696 9.68964 21.9449 8.73501 21.0681 8.05294C20.1913 7.37088 19.1123 7.00023 18.0014 6.9995H16.7414C16.4387 5.82874 15.8746 4.74183 15.0914 3.82049C14.3082 2.89915 13.3263 2.16735 12.2195 1.6801C11.1128 1.19286 9.90998 0.962854 8.70154 1.00738C7.49311 1.0519 6.31049 1.3698 5.2426 1.93716C4.17471 2.50453 3.24934 3.3066 2.53605 4.28308C1.82276 5.25956 1.34012 6.38503 1.1244 7.57489C0.908695 8.76475 0.96553 9.98803 1.29064 11.1528C1.61575 12.3175 2.20067 13.3934 3.00143 14.2995"
                    stroke="#767676"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* <Field
                // name="helpfulUploads"
                // key="helpfulUploads"
                // className="file hidden"
                style={{ display: "none" }}
                type="file"
                // id="helpfulUploads"
                // value={initialValues.helpfulUploads}
                multiple
              /> */}
                <label className="text-[#767676] text-[16px]" style={{ color: "" }}>
                  Drag and drop some files...
                </label>
              </div>
              <button type="button" className="" htmlFor="files" style={{ color: "#5F75EE" }}>
                Browse
              </button>
            </div>
          </div>

          <div className=" ">
            <label className="font-bold">Attachments:</label>
            <ListGroup className="w-full dz-preview dz-preview-multiple list-group-lg" flush>
              <ListGroupItem className="px-0">
                <Row className="align-items-center">
                  <div className=" col ml--3">
                    <label className="text-[#5F75EE] mb-1" data-dz-name />
                    <Button className="flex flex-row float-right font-bold not-italic text-[#767676]" data-dz-remove>
                      <i className="not-italic font-normal" data-dz-remove>
                        delete
                      </i>
                    </Button>
                  </div>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUploader;
