import { useCallback, useEffect, useState } from "react"
import { db } from "../config/FirebaseConfig"
import { getDocs, collection,addDoc,deleteDoc,updateDoc,doc,onSnapshot } from "firebase/firestore"
import { MovieCard } from "./MovieCard"
import { auth } from "../config/FirebaseConfig"
import styles from "../styles/Movies.module.css"
export const Movies = () => {
    const [movieList, setMovieList] = useState([])
    const [movie,setMovie]=useState({title:"",rYear:2000,gotOscar:true})
    const [movieCollection] = useState(collection(db, "movies"))
    const getMovieList = useCallback(async () => {
        try {
            const data = await getDocs(movieCollection)
            setMovieList(data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            }))
        } catch (err) {
            alert(err)
        }
    },[movieCollection])
    const handleAdd=async (e)=>{
        try {
            e.preventDefault()
            await addDoc(movieCollection,{...movie,userId:auth?.currentUser?.uid})
            getMovieList()
        } catch (err) {
            alert(err)
        }
    }
    const handleDelete=async (id)=>{
        try {
            const moviedoc=doc(db,"movies",id)
            await deleteDoc(moviedoc)
            getMovieList()
        } catch (err) {
            alert(err)
        }
    }
    const handleUpdate=async (id,title)=>{
        try {
            const moviedoc=doc(db,"movies",id)
            await updateDoc(moviedoc,{title})
            getMovieList()
        } catch (err) {
            alert(err)
        }
    }
    onSnapshot(movieCollection,{
        
    })
    useEffect(() => {
        getMovieList()
    }, [getMovieList]);
    return (
        <>
        <h2 style={{textAlign:'center'}}>Movie CRUD Component</h2>
        <hr />
        <h3 style={{textAlign:'center'}}>Create A Movie</h3>

            <form className={styles.form} onSubmit={handleAdd} >
                <input type="text" name="title" value={movie.title} onChange={(e)=>setMovie({...movie,[e.target.name]:e.target.value})} placeholder="Title here..."/>
                <input type="number" name="rYear" value={movie.rYear} onChange={(e)=>setMovie({...movie,[e.target.name]:e.target.value})}  placeholder=""/>
                <span>gotOscar:</span>
                <input type="checkbox" name="gotOscar" checked={movie.gotOscar} onChange={(e)=>setMovie({...movie,[e.target.name]:e.target.checked})} />
                <input type="submit" />
            </form>
        <h2 style={{textAlign:"center"}} >Movie List</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px"}}>
            {movieList.length ? movieList.map((el, i) => {
                return <MovieCard key={i} el={el} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
            }) : ""}
        </div>
        </>
    )
}
