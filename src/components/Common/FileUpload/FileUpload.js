import React from 'react';
import { useUploadFiles, useRemoveFile, DEFAULT_MAX_FILE_SIZE_IN_BYTES } from '../../../utils/uploadFileHook';
import { Row, Col } from 'reactstrap';

import Button from '../Button';

// DEFAULT_MAX_FILE_SIZE_IN_BYTES

const KILO_BYTES_PER_BYTE = 1000;
const convertBytesToKB = bytes => Math.round(bytes / KILO_BYTES_PER_BYTE);
function FileUpload({
  label,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  updateFilesCb,
  fileUploaded,
  
  ...otherProps
}) {
  const [files, setFiles] = React.useState({});
  const [overSized, setOverSized] = React.useState(false);

  const fileInputField = React.useRef(null);

  const fileUpload = useUploadFiles();
  const removeFile = useRemoveFile();
  const handleUploadBtnClick = () => {
    fileInputField.current?.click();
  };


  return (
    <>
      <Row>
        {fileUploaded && !overSized && (
          <Col>
            <Row>
              {Object.keys(files).map((fileName, index) => {
                let file = files[fileName];
                let isImageFile = file.type.split('/')[0] === 'image';
                return (
                  <Col xs="3" lg='2' key={index.toString()} className='upload__img__preview'>
                    {isImageFile && (
                      <>
                        <img src={URL.createObjectURL(file)} alt={`file preview ${index}`} />
                        <div className='upload__file_metadata'>
                          <span>{file.name}</span>
                          <aside>
                            <span>{convertBytesToKB(file.size)} kb</span>
                            <img
                              src='/images/trash.png'
                              onClick={() => removeFile(file.name, files, setFiles, updateFilesCb)}
                            />
                          </aside>
                        </div>
                      </>
                    )}
                  </Col>
                );
              })}
            </Row>
          </Col>
        )}

        <Col lg='12'>
          <Button type='button' className="upload__button" text='upload image' onClick={handleUploadBtnClick} />

          <input
            className='upload__input'
            type='file'
            ref={fileInputField}
            onChange={e => fileUpload(e, files, setFiles, updateFilesCb, setOverSized)}
            title=''
            value=''
            name={'image'}
            required

            {...otherProps}
          />
        </Col>
      </Row>
    </>
  );
}

export default FileUpload;
