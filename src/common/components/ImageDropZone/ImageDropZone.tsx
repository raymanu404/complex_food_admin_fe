/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleImageError } from '@/common/utils/helpers'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Spinner from '../Spinner/Spinner'
import { FlexBoxCentered } from '@/common/styles/styled-components'

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
  transition: 'border .24s ease-in-out',
}

const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

const allowedFiles = ['.jpeg', '.png']

interface PropsI {
  fileHandler: (file: File) => void
  src?: string
  isLoading?: boolean
}

const ImageDropZone = ({ fileHandler, src, isLoading }: PropsI) => {
  const [previewFile, setPreviewFile] = useState<string | undefined>(src)

  const onDropHandler = useCallback(
    (acceptedFiles: Array<File>) => {
      const reader = new FileReader()
      const file = acceptedFiles[0]
      reader.onload = function () {
        const result = reader.result // This will be a data URL
        if (typeof result === 'string') {
          setPreviewFile(result)
        }

        fileHandler(file)
      }

      reader.readAsDataURL(file)
    },
    [fileHandler]
  )

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: { 'image/*': allowedFiles },
    onDrop: (acceptedFiles) => onDropHandler(acceptedFiles),
  })

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>{`Drag 'n' drop ${allowedFiles.map((x) => x + ' ')} files here, or click to select files`}</p>
      </div>

      <FlexBoxCentered>
        {isLoading && <Spinner size={'3.5rem'} />}
        {previewFile && !isLoading && (
          <img
            src={previewFile}
            height={300}
            width={300}
            alt="file-upload"
            style={{ objectFit: 'contain' }}
            onError={handleImageError}
          />
        )}
      </FlexBoxCentered>
    </div>
  )
}

export default ImageDropZone
