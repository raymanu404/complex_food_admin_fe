import {
  SUPABASE_PRODUCTS_STORAGE_NAME,
  SUPABASE_STORAGE_CATEGORIES_FOLDER,
  SUPABASE_STORAGE_RELATIVE_URL,
} from '@/common/utils/constants'

const createAbsolutePathURLForFile = ({
  bucketId = SUPABASE_PRODUCTS_STORAGE_NAME,
  folderName = SUPABASE_STORAGE_CATEGORIES_FOLDER,
  fileName,
}: {
  fileName: string
  bucketId?: string
  folderName?: string
}) => `${SUPABASE_STORAGE_RELATIVE_URL}${bucketId}/${folderName}/${fileName}`

const createAbsolutePathLocal = ({ fileName, fileExt }: { fileName: string; fileExt: string }) =>
  `src\\common\\assets\\categories\\${fileName}${fileExt}`

export { createAbsolutePathURLForFile, createAbsolutePathLocal }
