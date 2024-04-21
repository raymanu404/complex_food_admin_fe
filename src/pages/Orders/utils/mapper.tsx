import {
  CategoryProductEnum,
  GetOrdersResponseBeI,
  OrderFeI,
  OrderItemFeI,
  OrderStatusEnum,
} from '@/api/interfaces/orders'
import { MRT_ColumnDef } from 'material-react-table'

const orders_columns = (): MRT_ColumnDef<OrderFeI>[] => [
  {
    accessorKey: 'id',
    header: 'Order Id',
    size: 20,
  },
  {
    accessorKey: 'buyerFullName',
    header: 'Customer Full name',
    size: 150,
  },
  {
    accessorKey: 'code',
    header: 'Order code',
    size: 150,
  },
  {
    accessorKey: 'datePlaced',
    header: 'Date placed',
    size: 150,
  },
  {
    accessorKey: 'discount',
    header: 'Discount',
    size: 50,
    Cell: ({ cell }) => (cell.getValue<number>() / 100).toLocaleString('ro-RO', { style: 'percent' }),
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price',
    size: 150,
    Cell: ({ cell }) => cell.getValue<number>().toLocaleString('ro-RO', { style: 'currency', currency: 'RON' }),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 150,
  },
]

const transformOrdersData = (data: GetOrdersResponseBeI): { data: OrderFeI[]; totalCount: number } => {
  const mappedOrders = data.data.map((order) => {
    const datePlacedFe = order.datePlaced ? new Date(order.datePlaced).toLocaleDateString() : ''
    const orderItemsMapped = order.orderItems.map((orderItem) => {
      return {
        orderId: orderItem.orderId,
        category: CategoryProductEnum[orderItem.category],
        description: orderItem.description,
        image: orderItem.image,
        orderItemId: orderItem.orderItemId,
        price: orderItem.price,
        quantity: orderItem.cantity,
        title: orderItem.title,
      } as OrderItemFeI
    })

    const orderStatus = OrderStatusEnum[order.status]

    return {
      id: order.id,
      code: order.code,
      buyerId: order.buyerId,
      datePlaced: datePlacedFe,
      status: orderStatus,
      discount: order.discount,
      totalPrice: order.totalPrice,
      orderItems: orderItemsMapped,
      buyerFullName: order.buyerFullName,
    } as OrderFeI
  })
  return { data: mappedOrders, totalCount: data.totalCount }
}

export { orders_columns, transformOrdersData }