/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetOrdersResponseBeI, OrderFeI, OrderItemFeI, OrderStatusEnum } from '@/api/interfaces/orders'
import { CategoryProductEnum } from '@/api/interfaces/products'
// import { formatDate } from '@/common/utils/helpers'
import { DropdownOption, MRT_ColumnDef } from 'material-react-table'

const statuses: DropdownOption[] = Object.keys(OrderStatusEnum)
  .map((value) => ({
    value: value,
  }))
  .slice(3)

const orders_columns = ({
  changeOrderStatusHandler,
}: {
  changeOrderStatusHandler: (orderId: number, status: number) => void
}): MRT_ColumnDef<OrderFeI>[] => [
  {
    accessorKey: 'id',
    header: 'Order Id',
    size: 20,
    enableEditing: false,
  },
  {
    accessorKey: 'buyerFullName',
    header: 'Customer Full name',
    size: 150,
    enableColumnFilter: false, //disable these 2 for now
    enableSorting: false,
    enableEditing: false,
  },
  {
    accessorKey: 'code',
    header: 'Order code',
    size: 150,
    enableEditing: false,
  },
  {
    id: 'datePlaced',
    accessorFn: (originalRow) => new Date(originalRow.datePlaced),
    header: 'Date placed',
    size: 150,
    filterVariant: 'date',
    //TODO: fix filtering by date
    Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
    enableEditing: false,
  },
  {
    accessorKey: 'discount',
    header: 'Discount',
    size: 50,
    Cell: ({ cell }) => (cell.getValue<number>() / 100).toLocaleString('ro-RO', { style: 'percent' }),
    enableEditing: false,
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price',
    size: 150,
    Cell: ({ cell }) => cell.getValue<number>().toLocaleString('ro-RO', { style: 'currency', currency: 'RON' }),
    filterVariant: 'range-slider',
    filterFn: 'betweenInclusive', // default (or between)
    muiFilterSliderProps: {
      //no need to specify min/max/step if using faceted values
      marks: true,
      step: 10,
      valueLabelFormat: (value) => value.toLocaleString('ro-RO', { style: 'currency', currency: 'RON' }),
    },
    enableEditing: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 120,
    filterFn: 'equals',
    filterSelectOptions: statuses,
    filterVariant: 'select',
    editVariant: 'select',
    editSelectOptions: statuses,
    enableEditing: true,
    muiEditTextFieldProps: ({ row }) => ({
      select: true,
      onChange: (event) => {
        const orderId = row.original.id
        const [value] = Object.entries(OrderStatusEnum).filter(([key, value]) => {
          if (key === event.target.value) {
            return value
          }
        })
        const [_, valueStatus] = value
        changeOrderStatusHandler(orderId, valueStatus as number)
      },
    }),
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
