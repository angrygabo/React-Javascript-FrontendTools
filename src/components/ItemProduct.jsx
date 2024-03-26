import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import PropTypes from 'prop-types';
import { CSS } from "@dnd-kit/utilities";

// Material IU
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function ItemProduct({ el, elementIndex, contextIndex, rowContexts, setRowContexts }) {

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: el.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const removeElement = (contextIndex, elementIndex) => {
    const updatedContexts = [...rowContexts];
    updatedContexts[contextIndex].elements.splice(elementIndex, 1);
    setRowContexts(updatedContexts);
  };

  return (
    <div className="gridItems_item">
      <div
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="gridItems_item--draggable"
      >
        <figure>
          <img src={el.img_url} alt={el.name}/>
        </figure>
        <h3>{el.name}</h3>
        <div className="price">
          {el.price}
        </div>
      </div>
      <button
        style={style}
        className="remove"
        onClick={() => removeElement(contextIndex, elementIndex)}
      >
        <RemoveCircleIcon/>
      </button>
    </div>
  );
}

ItemProduct.propTypes = {
  el: PropTypes.shape({
    id: PropTypes.number,
    img_url: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string
  }),
  elementIndex: PropTypes.number,
  contextIndex: PropTypes.number,
  rowContexts: PropTypes.arrayOf(PropTypes.shape({
    elements: PropTypes.array
  })),
  setRowContexts: PropTypes.func,
};

export default ItemProduct;
