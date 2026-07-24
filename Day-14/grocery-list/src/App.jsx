import './App.css'
import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import { useState } from "react";

function App() {

   const [items, setItems] = useState([
    { id: 1, checked: false, item: "Bread" },
    { id: 2, checked: true, item: "Milk" },
    { id: 3, checked: true, item: "eggs" },
    { id: 4, checked: false, item: "oranges" },
  ]);

  const handleCheck = (id) => {
    //console.log(`key: ${id}:`);
    const listItems = items.map((i) =>
      i.id === id ? { ...i, checked: !i.checked } : i,
    );
    setItems(listItems);
    localStorage.setItem("shoppinglist", JSON.stringify(listItems));
  };

  const handleDelete = (id) => {
    // console.log(`Checking delete ${id}`)

    const listItems = items.filter((i) => i.id !== id);
    setItems(listItems);
    localStorage.setItem("shoppinglist", JSON.stringify(listItems));
  };
 

  return (
    <>
    <Header title="Grocery List" />
    
    <Content 
      items={items}          
      handleCheck = {handleCheck}
      handleDelete = {handleDelete}
    />    
    <Footer length={items.length}/>
    </>
  )
}


export default App
