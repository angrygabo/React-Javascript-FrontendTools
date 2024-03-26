import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from './utils/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RevealBoxes from './animations/RevealContent';

const LisItems = ({ items, maxSelectable, onSelect, onClose }) => {
    
    const [SelectedItems, setLisItemsSelectedItems] = useState([]);

    const handleToggleItem = (item) => {
        if (SelectedItems.length < maxSelectable || SelectedItems.includes(item)) {
        const selectedIndex = SelectedItems.indexOf(item);
        if (selectedIndex === -1) {
            setLisItemsSelectedItems([...SelectedItems, item]);
        } else {
            const newSelectedItems = [...SelectedItems];
            newSelectedItems.splice(selectedIndex, 1);
            setLisItemsSelectedItems(newSelectedItems);
        }
        }
    };

    const handleAddItems = () => {
        onSelect(SelectedItems);
        onClose();
    };

    RevealBoxes();

    return (
        <div className="SelectItems">
            <span className="close reveal" onClick={onClose}>&times;</span>
            <h2 className="SelectItems_title reveal">Añade un máximo de 3 ítems</h2>
            <ul className="SelectItems_wrapItems reveal">
            {items.map((item, index) => (
                <li key={index} onClick={() => handleToggleItem(item)} className={`${SelectedItems.includes(item) ? 'selected' : ''} SelectItems_wrapItems--items`}>
                    <input type="checkbox" checked={SelectedItems.includes(item)} readOnly />
                    <figure>
                        <img src={item.img_url} alt={item.name} />
                    </figure>
                    <h3 className="SelectItems--name">{item.name}</h3>
                    <div className='price'><b>{item.price}</b></div>
                </li>
            ))}
            </ul>
            <div className="wrapBtn">
                <IconButton onClick={handleAddItems} icon={<AddIcon />} text="Añadir selección"/>
            </div>
        </div>
    );
};

// PropTypes
LisItems.propTypes = {
    items: PropTypes.array,
    maxSelectable: PropTypes.number,
    selectedItems: PropTypes.array,
    onSelect: PropTypes.func,
    onClose: PropTypes.func
};

export default LisItems;