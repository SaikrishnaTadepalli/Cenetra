import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { getUploadUrl, uplaodMedia } from "../redux/mediaSlice";

const ImageUploadFromMobile = ({ studentID }) => {
  const dispatch = useDispatch();
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);

  useEffect(() => {
    async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    };
  }, []);
  const onUpload = async () => {
    setIsUploading(true);
    setIsDisabled(true);
    setIsSuccess(false);

    //setIsUploadDisabled(true);
    const teacherID = localStorage.getItem("teacherID");

    uploadFiles.forEach(async (file, idx) => {
      dispatch(getUploadUrl({ teacherID, studentID }))
        .then(async (response) => {
          // console.log(response.payload.data);
          const data = JSON.parse(response.payload.data.getS3UploadUrl);
          const uploadURL = data.uploadURL;
          const fileName2 = data.fileName;

          const fileName = file.uri.split("/").pop();
          //   const object = {
          //     fileName: fileProperties[1],
          //     type: fileProperties[0],
          //     uri: fileProperties,
          //   };

          //await new Promise((resolve) => setTimeout(resolve, 15000));
          console.log(
            "File---------",
            fileName,
            "-----",
            fileName2,
            file,
            uploadURL
          );
          //   await fetch(uploadURL, {
          //     method: "PUT",
          //     headers: {
          //       "Content-Type": file.type,
          //     },
          //     body: file,
          //   })
          //     .then((response) => {
          //       // console.log(response);
          //       if (response.status === 200) {
          //         dispatch(uplaodMedia({ teacherID, studentID, fileName }))
          //           .then((response) => {
          //             if (!response.error) {
          //               if (idx === uploadFiles.length - 1) {
          //                 setIsSuccess(true);
          //                 setIsUploading(false);
          //                 setUploadFiles([]);
          //                 //setIsUploadDisabled(false);
          //                 setIsDisabled(false);
          //               }
          //             }
          //           })
          //           .catch((error) =>
          //             console.error("error while uploading to database", error)
          //           );
          //       }
          //     })
          //     .catch((error) =>
          //       console.error("error while uploading to s3", error)
          //     );
        })
        .catch((error) => console.error(error));
    });
  };
  const handleChoosePhotos = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    const newFiles = [];
    result.assets.forEach((file) => {
      newFiles.push(file);
    });
    setUploadFiles(newFiles);
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to internal storage.</Text>;
  }

  const files = uploadFiles.map((file) => (
    <View key={file.fileName}>
      <Text>{file.fileName}</Text>
    </View>
  ));
  console.log(uploadFiles[0]);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <TouchableOpacity onPress={handleChoosePhotos} style={styles.upload}>
        <Text>Choose Photo</Text>
      </TouchableOpacity>
      <View>{files}</View>
      {isUploading ? <Text>Uploading images....</Text> : null}
      {isSuccess ? <Text>Successfully uploaded images!</Text> : null}
      <TouchableOpacity
        onPress={onUpload}
        style={[
          styles.uploadButtonContainer,
          { opacity: isDisabled ? 0.5 : 1 },
        ]}
        //disabled={isDisabled}
      >
        <Text style={styles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageUploadFromMobile;

const styles = StyleSheet.create({
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
    marginBottom: 20,
    alignItems: "center",
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
