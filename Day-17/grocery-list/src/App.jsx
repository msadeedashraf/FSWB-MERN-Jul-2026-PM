import './App.css'
import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import { useState, useEffect } from "react";
import AddItem from './AddItem';
import SearchItem from './SearchItem';

function App() {

  //const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')))
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || [])

  const [newItem, setNewItem] = useState('')
  
  const [search, setSearch] = useState('')


  // useEffect(  
  //   () => {
  //     console.log('hazla') 
  //   } 
  //   ,
  //   []  
  // )


  console.log('before the useeffect')

  useEffect(  
    () => {

      localStorage.setItem('shoppinglist', JSON.stringify(items))
  
    } 
    ,
    [items]  
  )

  //console.log('after the useeffect')





 

  const addItem = (item) => {
    const id = items.length ? items[items.length -1].id+1 : 1;
    const myNewItem = {id, checked: false, item}
    const listItems = [...items, myNewItem]
    setItems(listItems)
  }

  const handleCheck = (id) => {
    //console.log(`key: ${id}:`);
    const listItems = items.map((i) =>
      i.id === id ? { ...i, checked: !i.checked } : i,
    );
    setItems(listItems)  };

  const handleDelete = (id) => {
    // console.log(`Checking delete ${id}`)

    const listItems = items.filter((i) => i.id !== id);
   setItems(listItems)  };

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
      items={items.filter(item =>((item.item).toLowerCase()).includes(search.toLowerCase() ))}          
      handleCheck = {handleCheck}
      handleDelete = {handleDelete}
    />    
    <Footer length={items.length}/>
    </>
  )
}


export default App
