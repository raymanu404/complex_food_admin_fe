import { CategoryProductEnum, ProductFormUpdate } from '@/api/interfaces/products'

const DEFAULT_PRODUCT_FE: ProductFormUpdate = {
  title: '',
  description: '',
  category: CategoryProductEnum.Soup,
  image: '',
  isInStock: false,
  price: 0.01,
}

export { DEFAULT_PRODUCT_FE }
