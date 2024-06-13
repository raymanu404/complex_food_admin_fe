/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'date-fns'
import { SyntheticEvent } from 'react'

import {
  PLACEHOLDER_IMAGE,
  SUPABASE_PRODUCTS_STORAGE_NAME,
  SUPABASE_STORAGE_PUBLIC_FOLDER,
  SUPABASE_STORAGE_RELATIVE,
  SUPABASE_URL,
} from './constants'

const formatDate = (date: Date | string): string => {
  const formattedDate = format(date, 'dd/MM/yyyy HH:mm:ss')

  return formattedDate
}

const handleImageError = (event: SyntheticEvent<HTMLImageElement | Event>) => {
  const target = event.target as HTMLImageElement

  target.src = PLACEHOLDER_IMAGE
  target.style.objectFit = 'contain'
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
  const copiedObj1 = { ...obj1 }
  const copiedObj2 = { ...obj2 }

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

const createFullPathStorageFile = (fileName: string, storageName = SUPABASE_PRODUCTS_STORAGE_NAME): string =>
  [SUPABASE_URL, SUPABASE_STORAGE_RELATIVE, storageName, SUPABASE_STORAGE_PUBLIC_FOLDER, fileName].join('/')

/**
 * Checks if the given expiration timestamp is expired.
 * @param {number} expiresAt - The expiration timestamp in milliseconds.
 * @returns {boolean} - True if expired, false otherwise.
 */
function isDateExpired(expiresAt: number): boolean {
  const currentTime = Date.now()
  return currentTime > expiresAt
}

const saveArrayToLocalStorage = (key: string, array: string[]) => {
  const jsonString = JSON.stringify(array)
  localStorage.setItem(key, jsonString)
}

// Function to retrieve an array from localStorage
const getArrayFromLocalStorage = (key: string): string[] => {
  try {
    const jsonString = localStorage.getItem(key)
    return jsonString ? JSON.parse(jsonString) : []
  } catch (error) {
    console.error('Error parsing JSON from localStorage', error)
    return []
  }
}

const removeArrayFromLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}

/**
 * Finds and returns the value of the first LocalStorage item whose key includes the partial key.
 *
 * @param {string} partialKey - The partial key to search for.
 * @returns {string | null} - The value of the matched LocalStorage item, or null if not found.
 */
function getItemByPartialKey(partialKey: string) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && (key.includes(partialKey) || key.endsWith(partialKey))) {
      return localStorage.getItem(key)
    }
  }
  return null
}

function formatNumber(num: number): string {
  if (num % 1 === 0) {
    return num.toString()
  } else {
    return num.toFixed(2)
  }
}

const formatDateToBe = (date: Date | null | undefined): string => {
  if (date) {
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2) // getMonth() returns 0-indexed month
    const day = `0${date.getDate()}`.slice(-2)
    return `${year}-${month}-${day}`
  }

  return 'invalid'
}

export {
  formatDate,
  handleImageError,
  enumToString,
  stringToEnum,
  arrayOfProps,
  arePropsEqual,
  createFullPathStorageFile,
  isDateExpired,
  saveArrayToLocalStorage,
  getArrayFromLocalStorage,
  removeArrayFromLocalStorage,
  getItemByPartialKey,
  formatNumber,
  formatDateToBe,
}
