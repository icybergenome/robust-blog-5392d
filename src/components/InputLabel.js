import React from 'react'
import { FormLabel } from "@chakra-ui/react"

export default function InputLabel(props) {
  return (
    <FormLabel
        mt="20px"
        mb="7px"
        htmlFor={props.htmlFor}
        fontSize="14px"
        lineHeight="20px"
    >
        {props.label}
    </FormLabel>
  )
}
