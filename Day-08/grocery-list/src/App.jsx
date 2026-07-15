
import './App.css'
import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import Content2 from './Content2'
function App() {


  return (
    <>
   <Header project="Grocery List" />
   <Content name="Hazla" age='20'/>
   <Content2 subject="Javascript"  />
   <Footer/>
    </>
  )
}

export default App
