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

interface OrderItemBeI {
  orderItemId: number
  cantity: number //TODO: will be changed with quantity later
  category: number
  title: string
  description: string
  image: string
  price: number
  orderId: number
}

//BE MODELS
interface OrderBeI {
  id: number
  totalPrice: number
  datePlaced: string
  status: number
  discount: number
  code: string
  buyerId: number
  orderItems: OrderItemBeI[]
}

//FE MODELS
enum OrderStatusEnum {
  Placed = 1,
  InProgress,
  Done,
}

enum CategoryProductEnum {
  Soup = 1,
  Meat,
  FoodGarnish,
  Salad,
  Desert,
  Drink,
  Standard,
}

interface OrderItemFeI {
  orderItemId: number
  quantity: number
  category: CategoryProductEnum
  title: string
  description: string
  image: string
  price: number
  orderId: number
}

interface OrderFeI {
  id: number
  totalPrice: number
  datePlaced: Date
  status: OrderStatusEnum
  discount: number
  code: string
  buyerId: number
  orderItems: OrderItemFeI[]
}

//API RESPONSES
interface GetOrdersResponseBeI {
  data: OrderBeI[]
  totalCount: number
  currentPage: number
}

export type { GetOrdersResponseBeI, OrderBeI, OrderFeI }
export { OrderStatusEnum, CategoryProductEnum }
