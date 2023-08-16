import {useEffect, useState} from "react";
import { auth, googleProvider } from "../config/FirebaseConfig.js";
import { createUserWithEmailAndPassword, signOut, signInWithPopup,onAuthStateChanged } from "firebase/auth";
export const Auth = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [Logged,setLogged]=useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      alert("success")
    } catch (err) {
      alert(err)
    }
  }
  const handleLogout = async () => {
    try {
      await signOut(auth)
      alert("Logged Out")
    } catch (err) {
      alert(err)
    }
  }
  const signinWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Login Success")
    } catch (err) {
      alert(err)
    }
  }
  useEffect(()=>{
    onAuthStateChanged(auth,(data)=>{
      if(data){
        setLogged(true)
      }else{
        setLogged(false)
      }
    })
  },[])
  return (
    <>
      <h2>{Logged?auth.currentUser.email: "Please Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email here..." value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <input type="password" placeholder="Password here..." value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <input type="submit" />
      </form>
      <button onClick={handleLogout}>LogOut</button>
      <button onClick={signinWithGoogle}> SignIn With Google</button>
    </>
  )
}
