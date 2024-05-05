import { Box, TextField } from '@mui/material'
import { useForm, SubmitHandler, Form } from 'react-hook-form'

interface PropsI {
  isDefaultData?: boolean
}

const ProductForm = ({}: PropsI) => {
  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)
  return (
    <Form>
      <Box sx={{ minHeight: '20rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '20px 30px' }}>
        <TextField
          id="outlined-read-only-input"
          label="Title"
          // InputProps={{
          //   readOnly: true,
          // }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Title"
          // InputProps={{
          //   readOnly: true,
          // }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Title"
          // InputProps={{
          //   readOnly: true,
          // }}
        />
        <TextField
          id="outlined-read-only-input"
          label="Title"
          // InputProps={{
          //   readOnly: true,
          // }}
        />
      </Box>
    </Form>
  )
}

export default ProductForm
