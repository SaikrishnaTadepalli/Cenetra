import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

const URL =
  "https://cenetra-media-dev-2.s3.amazonaws.com/4b474cb6f5e3fa32a0148ce04e844948?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVK7QAFNDYKPGDWWB%2F20230527%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230527T003617Z&X-Amz-Expires=300&X-Amz-Signature=5d0fc111b57cec2e42239b3bd0e4b95b1055d6f4da389b39ba9a158609cb1762&X-Amz-SignedHeaders=host";

const Uploader = () => {
  const axios = require("axios").default;
  const handleChangeStatus = ({ meta, remove }, status) => {
    console.log(status, meta);
  };

  const handleSubmit = async (files) => {
    const f = files[0];

    // PUT request: upload file to S3
    const result = await fetch(URL, {
      method: "PUT",
      body: f["file"],
    });

    console.log("SENT");
    console.log(result);
    console.log("_____");
  };

  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      maxFiles={1}
      multiple={false}
      canCancel={false}
      inputContent="Drop A File"
      styles={{
        dropzone: { width: 400, height: 200 },
        dropzoneActive: { borderColor: "green" },
      }}
    />
  );
};
<Uploader />;

export default Uploader;
