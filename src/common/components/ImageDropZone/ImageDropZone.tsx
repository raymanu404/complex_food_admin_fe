/* eslint-disable @typescript-eslint/no-explicit-any */
import {useCallback, useMemo, useState} from 'react'
import { useDropzone} from 'react-dropzone'

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};



const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const allowedFiles =  ['.jpeg', '.png']

interface PropsI{
  fileHandler : (file:File) =>void
}

const ImageDropZone = ({fileHandler}:PropsI) => {

  const [previewFile, setPreviewFile] = useState<string | undefined>();


  const onDropHandler = useCallback((acceptedFiles: Array<File>, ) => {
    const reader = new FileReader();
  
  reader.onload =  function() {
    const result = reader.result; // This will be a data URL
    if (typeof result === 'string') {
      setPreviewFile(result);
    }

    const file = acceptedFiles[0]
    fileHandler(file)
  };
  
  reader.readAsDataURL(acceptedFiles[0]);
  }, [fileHandler])


  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: {'image/*': allowedFiles},  onDrop: (acceptedFiles, )=> onDropHandler(acceptedFiles )} );

  const style : any= useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <div className="container">
      <div {...getRootProps({style})} >
        <input {...getInputProps()} />
        <p>{`Drag 'n' drop ${allowedFiles.map(x => x + ' ')} files here, or click to select files`}</p>
      </div>
    {previewFile && <img src={previewFile} height={300} width={300} alt='file-upload' style={{objectFit:'contain'}}/>}
    </div>
  );
}

export default ImageDropZone
