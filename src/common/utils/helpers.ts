/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'date-fns'
import { SyntheticEvent } from 'react'
import PlaceholderImage from '@/common/assets/placeholder-image.png'

const formatDate = (date: Date): string => {
  const formattedDate = format(date, 'dd/MM/yyyy HH:mm:ss')

  return formattedDate
}

const handleImageError = (event: SyntheticEvent<HTMLImageElement | Event>) => {
  const target = event.target as HTMLImageElement

  target.src = PlaceholderImage
  target.style.objectFit = 'contain'
  target.style.padding = '20px'
}

// Function to map enum values to strings
function enumToString(enumObject: any, value: number): string | undefined {
  return enumObject[value]
}

// Function to map strings to enum values
function stringToEnum(enumObject: any, key: string): number | undefined {
  return enumObject[key]
}

const arrayOfProps = (obj: any) =>
  Object.entries(obj).map(([key, value]) => ({
    name: key,
    value,
  }))

function arePropsEqual(obj1: any, obj2: any): boolean {
  // Deep copy obj1 and obj2 using JSON methods
  const copiedObj1 = JSON.parse(JSON.stringify(obj1))
  const copiedObj2 = JSON.parse(JSON.stringify(obj2))

  // Sort the keys of the copied objects to ensure consistent order
  const keys1 = Object.keys(copiedObj1).sort()
  const keys2 = Object.keys(copiedObj2).sort()

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false
  }

  // Check if all keys are the same
  for (let i = 0; i < keys1.length; i++) {
    const key1 = keys1[i]
    const key2 = keys2[i]
    if (key1 !== key2) {
      return false
    }
  }

  // Check if all property values are the same
  for (const key of keys1) {
    if (copiedObj1[key] !== copiedObj2[key]) {
      return false
    }
  }

  return true
}

export { formatDate, handleImageError, enumToString, stringToEnum, arrayOfProps, arePropsEqual }
