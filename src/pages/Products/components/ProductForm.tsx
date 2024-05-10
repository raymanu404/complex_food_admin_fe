/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryProductEnum, ProductFormUpdate } from '@/api/interfaces/products'
import { ImageDropZone, NumericInput, Spinner } from '@/common/components'
import { Box, Button, Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { DEFAULT_PRODUCT_FE } from '../utils/constants'
import { useCallback } from 'react'
import { supabase } from '@/common/config/application_config'
// import { arePropsEqual, arrayOfProps } from '@/common/utils/helpers'
// import { useMemo } from 'react'

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
    // getValues,
    formState: {
      isLoading: isLoadingForm,
      // defaultValues
    },
  } = useForm<ProductFormUpdate>({
    defaultValues: defaultData ? { ...defaultData } : DEFAULT_PRODUCT_FE,
  })
  // const values = getValues()

  // const idDirtySubmitButton = useMemo(() => !arePropsEqual(values, defaultValues), [defaultValues, values])

  const onFileUploadHandler = useCallback(async (file:File)=>{
    const { data, error } = await supabase
  .storage
  .from('products')
  .upload(`public/${file.name}`, file, {
    cacheControl: '3600',
    upsert: true
  })

  console.log({error, data}) //this should be save in my own db (get full path from data) //TODO:handle form errors and defaults value
  },[])

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
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
        {/* TODO: Handle images later */}
        <Controller name="image" control={control} render={({ field }) => <ImageDropZone fileHandler={onFileUploadHandler}/>} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 30px' }}>
        <Button onClick={onCloseHandler}>Cancel</Button>
        <Button
          type="submit"
          startIcon={(isLoadingForm || isLoadingAction) && <Spinner size={2.3} />}
          // disabled={idDirtySubmitButton}
        >
          Submit
        </Button>
      </Box>
    </form>
  )
}

export default ProductForm
