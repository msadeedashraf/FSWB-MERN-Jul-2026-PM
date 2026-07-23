import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const Content = () => {
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
    <main>
      {items.length ? (
        <ul>
          {items.map((i) => (
            <li className="item" key={i.id}>
              <input
                type="checkbox"
                onChange={() => handleCheck(i.id)}
                checked={i.checked}
              />
              <label
                style={i.checked ? { textDecoration: "line-through" } : null}
                onDoubleClick={() => handleCheck(i.id)}
              >
                {i.item}
              </label>
              <FaTrashAlt
                onClick={() => handleDelete(i.id)}
                role="button"
                tabIndex={0}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is empty.</p>
      )}
    </main>
  );
};

export default Content;
