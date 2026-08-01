import { FaTrashAlt } from "react-icons/fa";
const LineItem = ({i, handleCheck, handleDelete}) => {
  return (
     <li className="item" >
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
                aria-label={`Delete ${i.item}`}
              />
            </li>
  )
}

export default LineItem