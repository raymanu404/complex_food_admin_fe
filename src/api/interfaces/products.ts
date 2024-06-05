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
  merchantPrice: number
  mostOrderedProductCount: number
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
  merchantPrice: number
  mostOrderedProductCount: number
}

//API RESPONSES
interface GetProductsResponseBeI {
  data: ProductBeI[]
  totalCount: number
  currentPage: number
}
interface CategoryData {
  categoryName: string
  totalProducts: number
  inStock: number
  outOfStock: number
  totalPrice: number
  totalMerchantPrice: number
  totalProfitWithoutVTA: number
  totalProfitWithVTA: number
  totalOrderedProducts: number
}

interface CalculusData {
  data: CategoryData[]
  totalCount: number
}

interface ProductsStatisticsResponse {
  calculusData: CalculusData
  totalProducts: number
  totalInStock: number
  totalOutOfStock: number
  totalPrice: number
  totalMerchantPrice: number
  totalProfitWithoutVTA: number
  totalProfitWithVTA: number
  totalOrderedProducts: number
}

type OrderedProduct = Omit<ProductBeI, 'dateCreated'>

interface MostOrderedProductsData {
  data: OrderedProduct[]
  totalCount: number
}
interface MostOrderedProductsDataResponse {
  data: MostOrderedProductsData
}

//TODO: see how to update images, for now we dont update them
type ProductBodyToUpdate = Omit<ProductBeI, 'id' | 'dateUpdated' | 'dateCreated' | 'mostOrderedProductCount'>
type ProductBodyToCreate = Omit<ProductBeI, 'id' | 'dateUpdated' | 'dateCreated' | 'mostOrderedProductCount'>
type ProductFormUpdate = Omit<
  ProductFeI,
  'id' | 'dateUpdated' | 'dateCreated' | 'category' | 'mostOrderedProductCount'
> & {
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
  CategoryData,
  CalculusData,
  ProductsStatisticsResponse,
  MostOrderedProductsData,
  MostOrderedProductsDataResponse,
  OrderedProduct,
}
