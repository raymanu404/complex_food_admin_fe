/* eslint-disable @typescript-eslint/no-unused-vars */
import { CategoryProductEnum, GetProductsResponseBeI, ProductFeI } from '@/api/interfaces/products'
import { DEFAULT_NA } from '@/common/utils/constants'
import { Box, Checkbox } from '@mui/material'
import { DropdownOption, MRT_ColumnDef } from 'material-react-table'
import ImageCell from '../components/ImageCell'
import { OverflowTooltip } from '@/common/components/Tooltip/OverflowTooltip'

const productCategories: DropdownOption[] = Object.keys(CategoryProductEnum)
  .map((value) => ({
    value: value,
  }))
  .slice(7)

const products_columns = (): MRT_ColumnDef<ProductFeI>[] => [
  {
    accessorKey: 'id',
    header: 'Product Id',
    size: 20,
    enableEditing: false,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    Cell: ({ row }) => (
      <Box sx={{ width: '15em' }}>
        <OverflowTooltip text={`${row.original.title}`} />
      </Box>
    ),
    enableClickToCopy: true,
    enableEditing: true,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    Cell: ({ row }) => (
      <Box sx={{ width: '15em' }}>
        <OverflowTooltip text={`${row.original.description}`} />
      </Box>
    ),
    enableClickToCopy: true,
    enableEditing: true,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    size: 50,
    Cell: ({ cell }) => cell.getValue<number>().toLocaleString('ro-RO', { style: 'currency', currency: 'RON' }),
    enableEditing: true,
    enableSorting: true,
    filterVariant: 'range-slider',
    filterFn: 'betweenInclusive', // default (or between)
    //check filtering
    muiFilterSliderProps: {
      marks: true,
      step: 10,
      valueLabelFormat: (value) => value.toLocaleString('ro-RO', { style: 'currency', currency: 'RON' }),
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    size: 120,
    filterFn: 'equals',
    Cell: ({ cell }) => {
      const { category } = cell.row.original
      return category
    },
    filterSelectOptions: productCategories,
    filterVariant: 'select',
    editVariant: 'select',
    editSelectOptions: productCategories,
    enableEditing: true,
  },
  {
    accessorKey: 'isInStock',
    header: 'Is in Stock',
    size: 30,
    Cell: ({ cell }) => <Checkbox checked={cell.getValue<boolean>()} disabled />,
    enableEditing: true,
  },
  {
    id: 'dateCreated',
    accessorFn: (originalRow) => (originalRow.dateCreated ? new Date(originalRow.dateCreated) : DEFAULT_NA),
    header: 'Date created',
    Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
    size: 150,
    filterVariant: 'date',
    enableEditing: true,
  },
  {
    id: 'dateUpdated',
    accessorFn: (originalRow) => (originalRow.dateUpdated ? new Date(originalRow.dateUpdated) : DEFAULT_NA),
    header: 'Date Updated',
    Cell: ({ cell }) => cell.getValue<Date>().toDateString(),
    size: 150,
    filterVariant: 'date',
    enableEditing: true,
  },
  {
    accessorKey: 'image',
    header: 'Image',
    size: 20,
    Cell: ({ cell }) => <ImageCell imagePath={cell.row.original.image} title={cell.row.original.title} />,
    enableEditing: false,
    enableSorting: false,
    enableColumnFilter: false,
    enableGlobalFilter: false,
  },
]

const transformProductsData = (data: GetProductsResponseBeI): { data: ProductFeI[]; totalCount: number } => {
  const mappedProducts = data.data.map((product) => {
    const dateCreatedFe = product.dateCreated ? new Date(product.dateCreated) : null
    const dateUpdatedFe = product.dateUpdated ? new Date(product.dateUpdated) : null

    const productCategory = CategoryProductEnum[product.category]

    return {
      id: product.id,
      category: productCategory,
      dateCreated: dateCreatedFe,
      dateUpdated: dateUpdatedFe,
      description: product.description,
      image: product.image,
      isInStock: product.isInStock,
      price: product.price,
      title: product.title,
    } as ProductFeI
  })
  return { data: mappedProducts, totalCount: data.totalCount }
}

export { products_columns, transformProductsData }
