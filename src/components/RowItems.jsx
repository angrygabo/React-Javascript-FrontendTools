import React from "react";
import PropTypes from 'prop-types';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

// Animations
import RevealBoxes from './animations/RevealContent';

// Components
import ItemProduct from './ItemProduct';
import ListItems from './ListItems';
import IconButton from './utils/IconButton';

// Material IU
import { 
    Delete as DeleteIcon,
    Add as AddIcon,
    ArrowDropUp as ArrowDropUpIcon,
    ArrowDropDown as ArrowDropDownIcon
} from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const RowItems = ({ id, name, template, elements, contextIndex, setShowProducts, showProducts, setRowContexts, rowContexts, initialModalItems }) => {

    const moveRowUp = (contextIndex) => {
        if (contextIndex === 0) return;
        const updatedContexts = [...rowContexts];
        const temp = updatedContexts[contextIndex];
        updatedContexts[contextIndex] = updatedContexts[contextIndex - 1];
        updatedContexts[contextIndex - 1] = temp;
        setRowContexts(updatedContexts);
        const updatedShowModal = { ...showProducts }; // Copia el objeto showProducts
        const tempModal = updatedShowModal[contextIndex];
        updatedShowModal[contextIndex] = updatedShowModal[contextIndex - 1];
        updatedShowModal[contextIndex - 1] = tempModal;
        setShowProducts(updatedShowModal);
    };
    
    const moveRowDown = (contextIndex) => {
        if (contextIndex === rowContexts.length - 1) return;
        const updatedContexts = [...rowContexts];
        const temp = updatedContexts[contextIndex];
        updatedContexts[contextIndex] = updatedContexts[contextIndex + 1];
        updatedContexts[contextIndex + 1] = temp;
        setRowContexts(updatedContexts);
        const updatedShowModal = { ...showProducts }; // Copia el objeto showProducts
        const tempModal = updatedShowModal[contextIndex];
        updatedShowModal[contextIndex] = updatedShowModal[contextIndex + 1];
        updatedShowModal[contextIndex + 1] = tempModal;
        setShowProducts(updatedShowModal);
    };

    const removeRow = (contextIndex) => {
        const updatedContexts = rowContexts.filter((_, index) => index !== contextIndex);
        setRowContexts(updatedContexts);
    };

    const addNewElement = (contextIndex, newElements) => {
        const updatedContexts = [...rowContexts];
        updatedContexts[contextIndex].elements.push(...newElements);
        setRowContexts(updatedContexts);
    };
    
    const handleItem = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const updatedElements = arrayMove(
                elements,
                elements.findIndex((el) => el.id === active.id),
                elements.findIndex((el) => el.id === over.id)
            );
            const updatedContexts = [...rowContexts];
            updatedContexts[contextIndex].elements = updatedElements;
            setRowContexts(updatedContexts);
        }
    };

 
    RevealBoxes();

    return (
    <>
        <div className={`wrapParrilla_row ${template}`} id={`row-${id}`}>
            <div className="wrapParrilla_row--header reveal">
                <div className="header_info">
                    <h2 className="rowInfo_name m-0 p-0">Nombre de fila: {name}</h2>
                    <span>Plantilla asociada: <b>
                            {
                                template === 'alignRight' ? 'Derecha' :
                                template === 'alignLeft' ? 'Izquierda' :
                                template === 'center' ? 'Centro' : 'Centro'
                            }
                        </b>
                    </span>
                </div>
                <div className="header_tools">
                    <div className="header_tools--nameRow">
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField 
                            label="Nombre de fila" 
                            name="newName" 
                            id="outlined-size-small"
                            size="small"
                            onChange={(e) => {
                                const newName = e.target.value; // Obtenir la nouvelle valeur du champ de texte
                                const updatedContexts = [...rowContexts];
                                updatedContexts[contextIndex].name = newName;
                                setRowContexts(updatedContexts);
                            }}
                        />
                    </Box>
                    </div>
                    <div className="header_tools--alignRow">
                        <label>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="select-template">Plantilla:</InputLabel>
                            <Select
                                labelId="select-template"
                                id="select-template"
                                value={template}
                                label="Template"
                                MenuProps={{ disableScrollLock: true }}
                                onChange={(e) => {
                                    const updatedContexts = [...rowContexts];
                                    const newAlign = e.target.value;
                                    updatedContexts[contextIndex].template = newAlign;
                                    setRowContexts(updatedContexts);
                                }}
                            >
                                <MenuItem value='alignLeft'>Izquierda</MenuItem>
                                <MenuItem value='alignCenter'>Centro</MenuItem>
                                <MenuItem value='alignRight'>Derecha</MenuItem>
                            </Select>
                            </FormControl>
                        </label>
                    </div>
                    <div className="header_tools--swapRow">
                        {contextIndex !== 0 && (
                            <IconButton onClick={() => moveRowUp(contextIndex)} icon={<ArrowDropUpIcon />} />
                        )}
                        {contextIndex !== rowContexts.length - 1 && (
                            <IconButton onClick={() => moveRowDown(contextIndex)} icon={<ArrowDropDownIcon />} />
                        )}
                    </div>
                    {!contextIndex < 1 && (
                    <div className="header_tools--removeRow">
                        <IconButton onClick={() => removeRow(contextIndex)} icon={<DeleteIcon />} />
                    </div>
                    )}
                </div>
            </div>
            <div className="reveal w-full">
                <div className={`wrapParrilla_row--gridItems ${template}`}>
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleItem}>
                        <SortableContext items={elements} strategy={horizontalListSortingStrategy}>
                            {elements.map((el, index) => (
                                <ItemProduct key={el.id} el={el} elementIndex={index} contextIndex={contextIndex} rowContexts={rowContexts} setRowContexts={setRowContexts} />
                            ))}
                        </SortableContext>
                    </DndContext>
                    <div className="add_item">
                        
                        {elements.length < 3 && (
                            <>
                                <hr/>
                                {!showProducts[contextIndex] && (
                                <IconButton onClick={() => setShowProducts(prevState => ({ ...prevState, [contextIndex]: true }))} icon={<AddIcon />} text="Añadir Productos" />
                                )}    
                            </>
                        )}
                    </div>
                    {showProducts[contextIndex] && (
                        <ListItems
                            items={initialModalItems}
                            maxSelectable={3 - elements.length}
                            selectedItems={elements}
                            onSelect={(selectedItems) => {
                                addNewElement(contextIndex, selectedItems);
                                setShowProducts(prevState => ({ ...prevState, [contextIndex]: false }));
                            }}
                            onClose={() => setShowProducts(prevState => ({ ...prevState, [contextIndex]: false }))}
                        />
                    )}
                </div>
            </div>
        </div>
    </>
    );
};

// PropTypes
RowItems.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    template: PropTypes.string,
    elements: PropTypes.array,
    contextIndex: PropTypes.number,
    setShowProducts: PropTypes.func,
    showProducts: PropTypes.object,
    setRowContexts: PropTypes.func,
    rowContexts: PropTypes.array,
    initialModalItems: PropTypes.array
};

export default RowItems;
