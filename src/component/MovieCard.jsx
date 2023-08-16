import { useState } from "react"
import { PropTypes } from "prop-types"
import styles from "../styles/MovieCard.module.css"
export const MovieCard = ({ el, handleDelete, handleUpdate }) => {
  const [title, setTitle] = useState("")
  return (
    <div className={styles.div}>
      <h2 style={{ color: el.gotOscar ? "green" : "red" }}>Title:{el.title}</h2>
      <p>Release Year:{el.rYear}</p>
      <button onClick={() => handleDelete(el.id)}>Discard</button>
      <input type="text" value={title} placeholder="Title here..." onChange={(e) => setTitle(e.target.value)} />
      <button onClick={() => handleUpdate(el.id, title)}>Update</button>
    </div>
  )
}
MovieCard.propTypes = {
  handleDelete: PropTypes.func,
  handleUpdate: PropTypes.func,
  el: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    rYear: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    gotOscar: PropTypes.bool
  })
}
// https://bobbyhadz.com/blog/react-eslint-error-missing-in-props-validation
