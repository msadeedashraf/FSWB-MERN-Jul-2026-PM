
import LineItem from "./LineItem";
const ItemList = ({items, handleCheck, handleDelete}) => {
  return (
    <ul>
          {items.map((i) => (
            <LineItem 
                key={i.id}
                i={i}
                handleCheck={handleCheck}
                handleDelete={handleDelete}            
            />
           
          ))}
        </ul>
  )
}

export default ItemList