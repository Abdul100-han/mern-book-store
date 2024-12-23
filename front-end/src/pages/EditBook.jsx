import React from 'react'
import { useParams } from 'react-router-dom'

const EditBook = () => {

  const param = useParams()

  console.log(param);
  
  return (
    <div>EditBook</div>
  )
}

export default EditBook