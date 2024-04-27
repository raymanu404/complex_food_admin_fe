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
  cateogory: number
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
  cateogory: string
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

export { CategoryProductEnum }
export type { GetProductsResponseBeI, ProductBeI, ProductFeI }
