import React, { Fragment, useState } from "react";
import axios from "../request/axios";
import Message from "./Message";
import Progress from "./Progress";
import { isEmpty, parseInt } from 'lodash';

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e)=>{
    if(e.target.files.length) {
        setFile(e.target.files[0]);
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
        const res = await axios.post("/upload", formData, {
            onUploadProgress: (ProgressEvent) => {
                setUploadPercentage(
                    parseInt(Math.round((ProgressEvent.loaded * 100)/ProgressEvent.total)
                ));
            },
        });
        // clear percentage
        setTimeout(()=> setUploadPercentage(0), 5000)
        const {fileName ,filePath } = res.data;
        setUploadedFile({ fileName, filePath });
        setMessage("File Uploaded");
    } catch (error) {
        if(error.response){
            const {status, data} = error.response;
            if(status === 400) {
                setMessage(`Bad Request: ${data.error}`)
            } else if (status === 500) {
                setMessage(`Server Error: ${data.error}`)
            }  else {
                setMessage(data.error)
            }
        } else {
            setMessage(`An unexpected error occurred`)
        }

        setUploadPercentage(0);

    }
  };

  return (
    <Fragment>
      {message && <Message msg={message} setMessage={setMessage}/>}
      <form onSubmit={onSubmit}>
        <div className="import-group mb-3">
          <input type="file" className="form-control" onChange={onChange} />
        </div>
        <Progress percent={uploadPercentage} />
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {!isEmpty(uploadedFile) && (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img
              alt="uploaded file"
              style={{ width: "100%" }}
              src={uploadedFile.filePath}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default FileUpload;
