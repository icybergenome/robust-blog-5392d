import React from 'react'
import { Input } from '@chakra-ui/react'
import { useField, ErrorMessage } from 'formik' 

export default function TextField(props) {

  const [field, meta] = useField(props)
  return (
    <>
      <Input
        isInvalid={meta.error && meta.touched}
        errorBorderColor='red.300'
        {...field} {...props} 
        bg= {props.bg ? props.bg : ''}
        borderColor="#ADADAD"
        height="2.5rem !important"
      />
      <ErrorMessage component="div" name={field.name} className="error"/>
    </>  
  )
}
