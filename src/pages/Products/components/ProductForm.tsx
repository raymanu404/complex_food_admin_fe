/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryProductEnum, ProductFormUpdate } from '@/api/interfaces/products'
import { Backdrop, ImageDropZone, NumericInput } from '@/common/components'
import { Box, Button, Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { DEFAULT_PRODUCT_FE } from '../utils/constants'
import { useCallback, useState } from 'react'
import { arePropsEqual } from '@/common/utils/helpers'
import { useMemo } from 'react'

interface PropsI {
  isLoading?: boolean
  defaultData?: ProductFormUpdate | null
  onCloseHandler: () => void
  onSubmitHandler: SubmitHandler<ProductFormUpdate>
}

type SelectOption = {
  value: number
  label: string
}
const categoriesOptions: SelectOption[] = Object.entries(CategoryProductEnum)
  .slice(7)
  .map((value) => {
    const [key, valueNumber] = value
    return {
      label: key.toString(),
      value: +valueNumber,
    }
  })

const ProductForm = ({ defaultData, isLoading: isLoadingAction, onCloseHandler, onSubmitHandler }: PropsI) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { touchedFields, defaultValues },
  } = useForm<ProductFormUpdate>({
    defaultValues: defaultData ? { ...defaultData } : DEFAULT_PRODUCT_FE,
  })

  const [dropedFile, setDropedFile] = useState<File | undefined>()

  const values = getValues()

  const idDirtySubmitButton = useMemo(
    () =>
      (arePropsEqual(values, defaultValues) && !dropedFile) ||
      Object.values(touchedFields).some((x) => !x) ||
      isLoadingAction,
    [defaultValues, dropedFile, isLoadingAction, touchedFields, values]
  )

  const onSubmitLocal: SubmitHandler<ProductFormUpdate> = useCallback(
    (data) => {
      onSubmitHandler({ ...data, file: dropedFile })
    },
    [dropedFile, onSubmitHandler]
  )

  const onFileUploadHandler = useCallback((file: File) => {
    setDropedFile(file)
  }, [])

  console.log({ isLoadingAction })
  return (
    <form onSubmit={handleSubmit(onSubmitLocal)}>
      <Box sx={{ minHeight: '20rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '20px 30px' }}>
        <Controller name="title" control={control} render={({ field }) => <TextField {...field} label="Title" />} />
        <Controller
          name="description"
          control={control}
          render={({ field }) => <TextField {...field} label="Description" />}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Cateogry" select>
              {categoriesOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Box>
          <Box sx={{ display: 'flex', gap: '30px', justifyContent: 'space-between' }}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={'Price'}
                  InputProps={{
                    inputComponent: NumericInput as any,
                  }}
                />
              )}
            />
            <Controller
              name="merchantPrice"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={'Merchant Price'}
                  InputProps={{
                    inputComponent: NumericInput as any,
                  }}
                />
              )}
            />
          </Box>
          <Controller
            name="isInStock"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Is in Stock?"
                labelPlacement="start"
              />
            )}
          />
        </Box>
        <Controller
          name="image"
          control={control}
          render={({ field }) => <ImageDropZone src={field.value} fileHandler={onFileUploadHandler} />}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 30px' }}>
        <Button onClick={onCloseHandler}>Cancel</Button>
        <Button type="submit" disabled={idDirtySubmitButton}>
          Submit
        </Button>
      </Box>
      <Backdrop isOpen={isLoadingAction ?? false} />
    </form>
  )
}

export default ProductForm
