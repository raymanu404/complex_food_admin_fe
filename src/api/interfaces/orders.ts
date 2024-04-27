// {
//   "data": [
//     {
//       "id": 1,
//       "totalPrice": 109.96,
//       "datePlaced": "2024-04-10T22:33:00.1516573", //convert new Date
//       "status": 3, //convert with fe enum
//       "discount": 20, //convert
//       "code": "5OvNOW",
//       "buyerId": 3,
//       "orderItems": [
//         {
//           "orderItemId": 1,
//           "cantity": 5,
//           "category": 3, //convert with fe enum
//           "title": "Awesome Product 1",
//           "description": "This is a fantastic product you must have!",
//           "image": "image path",
//           "price": 29.99,
//           "orderId": 1
//         }
//       ]
//     },
//   ],
//   "totalCount": 5,
//   "currentPage": 1
// }

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

export type { GetOrdersResponseBeI, OrderBeI, OrderFeI, OrderItemFeI }
export { OrderStatusEnum }
