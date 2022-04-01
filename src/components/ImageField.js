import React from 'react'
import { Image } from "@chakra-ui/react"

export default function ImageField(props) {
  return (
    <Image 
        mr={props.mr ? props.mr : ''}
        borderRadius={props.borderRadius}
        src={props.src}
        height={props.height}
        width={props.width}
    />
  )
}
