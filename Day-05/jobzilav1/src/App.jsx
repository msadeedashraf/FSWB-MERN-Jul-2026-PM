import './App.css'
import Navbar from './components/Navbar'
import Mainsection from './components/Mainsection'
import Footer from './components/Footer'
import { Route, Routes } from "react-router-dom";
import Joblist from "./components/Joblist";
import Jobsearch from "./components/Jobsearch";
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";
import Contacts from "./components/Contacts";


function App() {

  return (
    <>
    <Navbar/>


 <Routes>
        <Route path="/" element={<Mainsection />} />
       <Route path="/job_listing" element={<Joblist />} />
        <Route path="/job_search" element={<Jobsearch />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/term_service" element={<Terms />} />
        <Route path="/contact_us" element={<Contacts />} />

</Routes>
   
    
    
    
    <Footer/>


    
    </>
  )
}

export default App
