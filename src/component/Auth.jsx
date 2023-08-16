import {useState} from "react";
import { auth, githubProvider, googleProvider } from "../config/FirebaseConfig.js";
import { createUserWithEmailAndPassword, signOut, signInWithPopup,onAuthStateChanged } from "firebase/auth";

import styles from "../styles/Auth.module.css"

export const Auth = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [Logged,setLogged]=useState(false);
  onAuthStateChanged(auth,(data)=>{
    if(data){
      setLogged(true)
    }else{
      setLogged(false)
    }
  })
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
  const signinWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      alert("Github Login Success")
    } catch (err) {
      alert(err)
    }
  }
  
  return (
    <>
      <h2 style={{textAlign:'center'}}>Login Component</h2>
      <hr />
      <h3 style={{textAlign:'center'}}>{Logged?auth.currentUser.email: "Please Login"}</h3>
      <h3 style={{textAlign:'center'}}>Login With Email And Password</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="email" placeholder="Email here..." value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        <input type="password" placeholder="Password here..." value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <input type="submit" value="Login" />
      </form>
      <br />
      <div className={styles.provider}>
      <button onClick={signinWithGoogle}> SignIn With Google</button>
      <button onClick={signinWithGithub}> SignIn With Github</button>
      </div>
      <button className={styles.logout} onClick={handleLogout}>LogOut</button>
    </>
  )
}
