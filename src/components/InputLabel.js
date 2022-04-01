import React from 'react'
import { FormLabel } from "@chakra-ui/react"

export default function InputLabel(props) {
  return (
    <FormLabel
        mt="20px"
        htmlFor={props.htmlFor}
        fontSize="16px"
        lineHeight="24px"
    >
        {props.label}
    </FormLabel>
  )
}
