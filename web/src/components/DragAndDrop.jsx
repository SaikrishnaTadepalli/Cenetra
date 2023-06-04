import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { getUploadUrl, uplaodMedia } from "../redux/mediaSlice";

const DragAndDrop = ({ studentID }) => {
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { teacherID } = useSelector((state) => state.auth);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
  });
  const onUpload = () => {
    setIsUploading(true);

    acceptedFiles.forEach(async (file, idx) => {
      dispatch(getUploadUrl({ teacherID, studentID }))
        .then(async (response) => {
          // console.log(response.payload.data);
          const data = JSON.parse(response.payload.data.getS3UploadUrl);
          const uploadURL = data.uploadURL;
          const fileName = data.fileName;
          await new Promise((resolve) => setTimeout(resolve, 15000));
          await fetch(uploadURL, {
            method: "PUT",
            headers: {
              "Content-Type": file.type,
            },
            body: file,
          })
            .then((response) => {
              // console.log(response);
              if (response.status === 200) {
                dispatch(uplaodMedia({ teacherID, studentID, fileName }))
                  .then((response) => {
                    if (!response.error) {
                      if (idx === acceptedFiles.length - 1) {
                        setIsSuccess(true);
                        setIsUploading(false);
                        setTimeout(() => setIsSuccess(false), 2000);
                      }
                    }
                  })
                  .catch((error) =>
                    console.error("error while uploading to database", error)
                  );
              }
            })
            .catch((error) =>
              console.error("error while uploading to s3", error)
            );
        })
        .catch((error) => console.error(error));
    });
  };

  const files = acceptedFiles.map((file) => (
    <View key={file.name}>
      <Text>{file.name}</Text>
    </View>
  ));
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div
          {...getRootProps({ className: "dropzone" })}
          style={styles.dropzone}
        >
          <Text>Drag and Drop</Text>
        </div>
        <Text>or</Text>
        <div {...getRootProps({ className: "dropzone" })} style={styles.upload}>
          <Text>Select Pictures</Text>
        </div>
      </View>
      {isUploading ? <Text>Uploading images....</Text> : null}
      {isSuccess ? <Text>Successfully uploaded images!</Text> : null}
      <TouchableOpacity onPress={onUpload} style={styles.upload}>
        <Text>Upload</Text>
      </TouchableOpacity>
      <View>{files}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  dropzone: {
    borderWidth: 2,
    borderColor: "#d3d3d3",
    borderStyle: "dashed",
    borderRadius: 4,
    padding: 5,
    paddingRight: 20,
    paddingLeft: 20,
    margin: 20,
  },
  upload: {
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "#d3d3d3",
    borderRadius: 4,
    padding: 5,
    paddingRight: 30,
    paddingLeft: 30,
    margin: 20,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default DragAndDrop;
