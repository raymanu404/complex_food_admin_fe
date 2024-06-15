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

/**
 * Converts a camelCase string to PascalCase with spaces between words.
 * @param camelCaseStr - The camelCase string to convert.
 * @returns The converted PascalCase string with spaces between words.
 */
function camelToPascalWithSpaces(camelCaseStr: string): string {
  // Split the string by uppercase letters and preserve the uppercase letters in the array
  const words = camelCaseStr.split(/(?=[A-Z])/)

  // Join the words with spaces and capitalize the first letter of the resulting string
  const pascalWithSpaces = words.join(' ')
  return pascalWithSpaces.charAt(0).toUpperCase() + pascalWithSpaces.slice(1).toLocaleLowerCase()
}

export { createAbsolutePathURLForFile, createAbsolutePathLocal, camelToPascalWithSpaces }
