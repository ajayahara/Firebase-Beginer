import { useState } from "react"
import {PropTypes} from "prop-types"
export const MovieCard = ({el,handleDelete,handleUpdate}) => {
    const [title,setTitle]=useState("")
  return (
    <div style={{border:"1px solid black",margin:"2px"}}>
    <h2 style={{color:el.gotOscar?"green":"red"}}>Title:{el.title}</h2>
    <p>Release Year:{el.rYear}</p>
    <p>DocId:{el.id}</p>
    <button onClick={()=>handleDelete(el.id)}>Discard</button>
    <input type="text" value={title} placeholder="Title here..."  onChange={(e)=>setTitle(e.target.value)}/>
    <button onClick={()=>handleUpdate(el.id,title)}>Update</button>
</div>
  )
}
MovieCard.propTypes={
    handleDelete:PropTypes.func,
    handleUpdate:PropTypes.func,
    el:PropTypes.shape({
        id:PropTypes.string,
        title:PropTypes.string,
        rYear:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
          ]),
        gotOscar:PropTypes.bool
    })
}
// https://bobbyhadz.com/blog/react-eslint-error-missing-in-props-validation
