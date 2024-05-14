enum CategoryProductEnum {
  Soup = 1,
  Meat,
  FoodGarnish,
  Salad,
  Desert,
  Drink,
  Standard,
}

interface ProductBeI {
  id: number
  category: number
  title: string
  description: string
  price: number
  image: string
  dateCreated: string
  dateUpdated: string
  isInStock: boolean
}

interface ProductFeI {
  id: number
  category: string
  title: string
  description: string
  price: number
  image: string
  dateCreated: Date | null
  dateUpdated: Date | null
  isInStock: boolean
}

//API RESPONSES
interface GetProductsResponseBeI {
  data: ProductBeI[]
  totalCount: number
  currentPage: number
}

//TODO: see how to update images, for now we dont update them
type ProductBodyToUpdate = Omit<ProductBeI, 'id' | 'dateUpdated' | 'dateCreated'>
type ProductBodyToCreate = Omit<ProductBeI, 'id' | 'dateUpdated' | 'dateCreated'>
type ProductFormUpdate = Omit<ProductFeI, 'id' | 'dateUpdated' | 'dateCreated' | 'category'> & {
  category: number
  file?: File
}

export { CategoryProductEnum }
export type {
  GetProductsResponseBeI,
  ProductBeI,
  ProductFeI,
  ProductBodyToUpdate,
  ProductFormUpdate,
  ProductBodyToCreate,
}
