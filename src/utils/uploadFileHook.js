/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

export const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const addNewFiles = (newFiles, files, setOverSized) => {
  for (let file of newFiles) {
    // if (file.size <= DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
    //     setOverSized(false)
    //     files[file.name] = file;
    // } else {
    //     setOverSized(true)
    // }
    files[file.name] = file;
  }
  return { ...files };
};

export const convertNestedObjectToArray = nestedObj => Object.keys(nestedObj).map(key => nestedObj[key]);

export const useUploadFiles = () => {
  return React.useCallback((e, files, updateFiles, updateFilesList, setOverSized) => {
    const { files: newFiles } = e.target;
    console.log('files',files);
    if (newFiles?.length) {
      let updatedFiles = addNewFiles(newFiles, files, setOverSized);

      updateFiles(updatedFiles);
      updateFilesList(convertNestedObjectToArray(updatedFiles));
    }
  }, []);
};

export const useRemoveFile = () => {
  return React.useCallback((fileName, files, updateFiles, updateFilesList) => {
    delete files[fileName];
    updateFiles({ ...files });
    updateFilesList(convertNestedObjectToArray(files));
  }, []);
};
