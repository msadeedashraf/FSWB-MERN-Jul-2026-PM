
import './App.css'
import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import Content2 from './Content2'
import Parent from './Parent'
import Events2 from './Events2'
import Mapstudentsnames from './Mapstudentsnames'

function App() {


  return (
    <>
   <Header project="Grocery List" />
   <Content name="Hazla" age='20'/>
   <Content2 subject="Javascript"  />
   <Parent/>

   <Events2/>

   <Mapstudentsnames/>
   <Footer/>
    </>
  )
}

export default App
