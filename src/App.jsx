import { Auth } from './component/Auth'
import { Movies } from './component/Movies'
function App() {
  return (
    <>
      <h1 style={{textAlign:'center',color:'yellow',backgroundColor:"black",padding:'10px',margin:'0px'}}>Welcome To Firebase</h1>
      <Auth/>
      <Movies/>
    </>
  )
}

export default App
