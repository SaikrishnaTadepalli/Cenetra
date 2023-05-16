import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDropzone } from "react-dropzone";

const DragAndDrop = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
  });

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
          <Text>Upload</Text>
        </div>
      </View>
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
