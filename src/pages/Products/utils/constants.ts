import { CategoryProductEnum, ProductFormUpdate } from '@/api/interfaces/products'

const DEFAULT_PRODUCT_FE: ProductFormUpdate = {
  title: '',
  description: '',
  category: CategoryProductEnum.Soup,
  image: '',
  isInStock: true,
  price: 0.01,
  merchantPrice: 0.01,
}

export { DEFAULT_PRODUCT_FE }
