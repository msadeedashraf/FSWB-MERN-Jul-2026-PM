import './App.css'
import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import { useState } from "react";
import AddItem from './AddItem';
import SearchItem from './SearchItem';

function App() {

  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')))

  const [newItem, setNewItem] = useState('')
  
  const [search, setSearch] = useState('')






  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("shoppinglist", JSON.stringify(newItems)); 
  }

  const addItem = (item) => {
    const id = items.length ? items[items.length -1].id+1 : 1;
    const myNewItem = {id, checked: false, item}
    const listItems = [...items, myNewItem]
    setAndSaveItems(listItems)
  }

  const handleCheck = (id) => {
    //console.log(`key: ${id}:`);
    const listItems = items.map((i) =>
      i.id === id ? { ...i, checked: !i.checked } : i,
    );
    setAndSaveItems(listItems)  };

  const handleDelete = (id) => {
    // console.log(`Checking delete ${id}`)

    const listItems = items.filter((i) => i.id !== id);
   setAndSaveItems(listItems)  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    if(!newItem) return;   
    addItem(newItem)
    setNewItem('')    

  }
 

  return (
    <>
    <Header title="Grocery List" />
    <SearchItem
      search={search}
      setSearch={setSearch}  />
    <AddItem 
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      />
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
