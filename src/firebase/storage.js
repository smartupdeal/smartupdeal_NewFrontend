/* eslint-disable import/prefer-default-export */
import {
  getDownloadURL,
  getStorage,
  ref,
  StorageError,
  uploadBytes,
} from "firebase/storage";


import ClientApp from './firebaseClient'
// fireStoreStorage ="https://firebasestorage.googleapis.com/v0/b/mern-store-7288b.appspot.com/o/"


const isStorageError = (error) => {
  return error.StorageError === true;
};

export const uploadToFireStorage = async (
  file,
  fileName
) => {
  const storage = getStorage(ClientApp);
  console.log(fileName)

  const fileRef = ref(storage, fileName);
  try {
    const snapshot = await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    return downloadUrl.slice(downloadUrl.indexOf("/b/") + 3);
    // return downloadUrl
  } catch (error) {
    let StoreError;
    if (isStorageError(error)) {
      switch (error.code) {
        case "storage/unauthorized":
          StoreError = "user doesn't have permission to access the object";
          break;
        case "storage/canceled":
          StoreError = "User canceled the upload";
          break;
        case "storage/unknown":
          StoreError = "Unknown error occurred, inspect error.serverResponse";
          break;
        default:
          StoreError = error.message;
      }
    }
    if (process.env.NODE_ENV !== "production") {
      throw new Error(`${StoreError}`);
    }
    return null;
  }
};
