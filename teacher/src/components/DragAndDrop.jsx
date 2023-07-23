import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { getUploadUrl, uplaodMedia } from "../redux/mediaSlice";

const DragAndDrop = ({ studentID }) => {
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
  });

  const onUpload = () => {
    setIsUploading(true);
    setIsDisabled(true);
    setIsSuccess(false);
    const teacherID = localStorage.getItem("teacherID");

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
                        setUploadFiles([]);
                        setIsDisabled(false);
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
      <Text style={styles.headerText}>Media Upload</Text>
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
          <Text style={styles.text}>Drag and Drop</Text>
        </div>
        <Text style={styles.text}>OR</Text>
        <div {...getRootProps({ className: "dropzone" })} style={styles.upload}>
          <Text style={styles.text}>Select Pictures</Text>
        </div>
      </View>
      {isUploading ? <Text>Uploading images....</Text> : null}
      {isSuccess ? <Text>Successfully uploaded images!</Text> : null}
      <TouchableOpacity
        onPress={onUpload}
        style={[
          styles.uploadButtonContainer,
          { opacity: isDisabled ? 0.5 : 1 },
        ]}
        disabled={isDisabled}
      >
        <Text style={styles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>
      <View>{files}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  headerText: {
    fontFamily: "InterMedium",
    fontSize: 16,
    alignSelf: "flex-start",
  },
  text: {
    fontFamily: "InterMedium",
    fontSize: 12,
  },
  dropzone: {
    borderWidth: 2,
    borderColor: "#d3d3d3",
    borderStyle: "dashed",
    borderRadius: 4,
    margin: 20,
    paddingTop: 45,
    paddingBottom: 45,
    paddingRight: 15,
    paddingLeft: 15,
  },
  upload: {
    borderWidth: 0.5,
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "#d3d3d3",
    borderRadius: 4,
    paddingTop: 45,
    paddingBottom: 45,
    paddingRight: 15,
    paddingLeft: 15,
    margin: 20,
  },
  uploadButtonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 40,
    backgroundColor: "#23342C",
    borderRadius: 100,
    marginRight: 10,
  },
  uploadButtonText: {
    alignSelf: "center",
    color: "white",
    fontFamily: "InterMedium",
    fontSize: 14,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default DragAndDrop;
