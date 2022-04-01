import React from 'react'
import { Input } from '@chakra-ui/react'


export default function TextField(props) {
  return (
    <Input 
        bg="#fff" 
        type={props.type} 
        placeholder={props.placeholder} 
        value={props.value} 
        onChange={props.onChange}
        name={props.name} 
        borderColor="#ADADAD" 
        width={props.width ? props.width : "100%"}
        pl={props.pl ? props.pl : ''}
        />
        
  )
}
