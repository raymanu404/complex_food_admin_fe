//BE MODELS
interface OrderItemBeI {
  orderItemId: number
  cantity: number
  category: number
  title: string
  description: string
  image: string
  price: number
  orderId: number
}

interface OrderBeI {
  id: number
  totalPrice: number
  datePlaced: string
  status: number
  discount: number
  code: string
  buyerId: number
  orderItems: OrderItemBeI[]
  buyerFullName: string
}

//FE MODELS
enum OrderStatusEnum {
  Placed = 1,
  InProgress,
  Done,
}

interface OrderItemFeI {
  orderItemId: number
  quantity: number
  category: string
  title: string
  description: string
  image: string
  price: number
  orderId: number
}

interface OrderFeI {
  id: number
  totalPrice: number
  datePlaced: string
  status: string
  discount: number
  code: string
  buyerId: number
  buyerFullName: string
  orderItems: OrderItemFeI[]
}

//API RESPONSES
interface GetOrdersResponseBeI {
  data: OrderBeI[]
  totalCount: number
  currentPage: number
}

interface OrderStatisticsData {
  totalOrders: number
  totalPrice: number
  totalMerchantPrice: number
  totalProfitWithoutVTA: number
  totalProfitWithVTA: number
}

interface OrderStatisticsResponse {
  totalDataResponse: OrderStatisticsData
  dataInPeriodOfTimeResponse: OrderStatisticsData
  dataInPercentsResponse: OrderStatisticsData
}

export type { GetOrdersResponseBeI, OrderBeI, OrderFeI, OrderItemFeI, OrderStatisticsResponse, OrderStatisticsData }
export { OrderStatusEnum }
