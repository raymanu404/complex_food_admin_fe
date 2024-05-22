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

export { saveArrayToLocalStorage, getArrayFromLocalStorage, removeArrayFromLocalStorage }
