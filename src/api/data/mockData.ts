import { OrderStatisticsResponse } from '../interfaces/orders'
import {
  MostOrderedProductsDataResponse,
  OrderedProduct,
  ProductBeI,
  ProductsStatisticsResponse,
} from '../interfaces/products'

//PRODUCT STATISTICS
const sampleStatistics: ProductsStatisticsResponse = {
  calculusData: {
    data: [
      {
        categoryName: 'Soup',
        totalProducts: 6,
        inStock: 6,
        outOfStock: 0,
        totalPrice: 5293,
        totalMerchantPrice: 973.25,
        totalProfitWithoutVTA: 4319.75,
        totalProfitWithVTA: 3455.8,
        totalOrderedProducts: 214,
      },
      {
        categoryName: 'Drink',
        totalProducts: 2,
        inStock: 2,
        outOfStock: 0,
        totalPrice: 159.6,
        totalMerchantPrice: 39.9,
        totalProfitWithoutVTA: 119.69999999999999,
        totalProfitWithVTA: 95.75999999999999,
        totalOrderedProducts: 8,
      },
      {
        categoryName: 'Standard',
        totalProducts: 7,
        inStock: 5,
        outOfStock: 2,
        totalPrice: 0,
        totalMerchantPrice: 0,
        totalProfitWithoutVTA: 0,
        totalProfitWithVTA: 0,
        totalOrderedProducts: 0,
      },
      {
        categoryName: 'Desert',
        totalProducts: 1,
        inStock: 1,
        outOfStock: 0,
        totalPrice: 0,
        totalMerchantPrice: 0,
        totalProfitWithoutVTA: 0,
        totalProfitWithVTA: 0,
        totalOrderedProducts: 0,
      },
      {
        categoryName: 'FoodGarnish',
        totalProducts: 1,
        inStock: 0,
        outOfStock: 1,
        totalPrice: 0,
        totalMerchantPrice: 0,
        totalProfitWithoutVTA: 0,
        totalProfitWithVTA: 0,
        totalOrderedProducts: 0,
      },
      {
        categoryName: 'Meat',
        totalProducts: 1,
        inStock: 1,
        outOfStock: 0,
        totalPrice: 0,
        totalMerchantPrice: 0,
        totalProfitWithoutVTA: 0,
        totalProfitWithVTA: 0,
        totalOrderedProducts: 0,
      },
    ],
    totalCount: 6,
  },
  totalProducts: 18,
  totalInStock: 15,
  totalOutOfStock: 3,
  totalPrice: 5452.6,
  totalMerchantPrice: 1013.15,
  totalProfitWithoutVTA: 4439.45,
  totalProfitWithVTA: 3551.5600000000004,
  totalOrderedProducts: 222,
}

const generateMockProduct = (): ProductBeI => ({
  id: Math.floor(Math.random() * 1000),
  category: Math.floor(Math.random() * 10),
  title: 'Sample Product',
  description: 'This is a sample product description.',
  price: parseFloat((Math.random() * 100).toFixed(2)),
  image: 'https://via.placeholder.com/150',
  dateCreated: new Date().toISOString(),
  dateUpdated: new Date().toISOString(),
  isInStock: Math.random() > 0.5,
  merchantPrice: parseFloat((Math.random() * 100).toFixed(2)),
  mostOrderedProductCount: Math.floor(Math.random() * 1000),
})

const generateMockOrderedProduct = (): OrderedProduct => {
  const { ...orderedProduct } = generateMockProduct()
  return orderedProduct
}

const generateMockMostOrderedProductsDataResponse = (): MostOrderedProductsDataResponse => {
  const mockOrderedProducts: OrderedProduct[] = Array.from({ length: 3 }, generateMockOrderedProduct)
  return {
    data: {
      data: mockOrderedProducts,
      totalCount: mockOrderedProducts.length,
    },
  }
}

const mockDataOrdersStatistics: OrderStatisticsResponse = {
  totalOrders: 100,
  totalPrice: 1234.56,
  totalMerchantPrice: 1100.0,
  totalProfitWithoutVTA: 134.56,
  totalProfitWithVTA: 150.0,
}

const mockDataTotalOrdersStatistics: OrderStatisticsResponse = {
  totalOrders: 420,
  totalPrice: 1534.56,
  totalMerchantPrice: 1500.0,
  totalProfitWithoutVTA: 534.56,
  totalProfitWithVTA: 250.0,
}

export {
  sampleStatistics,
  generateMockOrderedProduct,
  generateMockMostOrderedProductsDataResponse,
  mockDataOrdersStatistics,
  mockDataTotalOrdersStatistics,
}
