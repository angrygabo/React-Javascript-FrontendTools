import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

// Animations
import RevealBoxes from './components/animations/RevealContent';

// Components
import RowItems from './components/RowItems';
import IconButton from './components/utils/IconButton';

// Material UI
import { 
  Save as SaveIcon,
  AddCircle as AddCircleIcon,
  Add as AddIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon
} from '@mui/icons-material';

function App() {
  // Fecth - Products
  const [initialModalItems, setInitialModalItems] = useState([]);

  useEffect(() => {
    const fetchInitialModalItems = async () => {
      setTimeout(() => {
        // minify mock data
        const data = [{id:1,name:'VESTIDO ENCERADO CINTURONES',img_url:'https://static.zara.net/assets/public/c8fb/12c2/9bef4a968cc7/9e30c12cbf49/05427301500-e1/05427301500-e1.jpg?ts=1706861433328&w=315',price:'35,95 EUR'},{id:2,name:'VESTIDO CORTO CAMISERO',img_url:'https://static.zara.net/assets/public/1ec5/0232/b244420ab897/beac40d0bc57/03152313818-e1/03152313818-e1.jpg?ts=1706799522344&w=315',price:'35,95 EUR'},{id:3,name:'VESTIDO CORTO PUNTO',img_url:'https://static.zara.net/assets/public/a7bf/3e9e/fa014431a697/1bacdb1cf971/05039644600-e1/05039644600-e1.jpg?ts=1707511105306&w=315',price:'19,95 EUR'},{id:4,name:'VESTIDO MINI CREPE',img_url:'https://static.zara.net/assets/public/4fd3/0322/e20c480cb61d/e8bb0f0ee42f/02586323513-e1/02586323513-e1.jpg?ts=1708016915067&w=315',price:'29,95 EUR'},{id:5,name:'VESTIDO CORTO POPELÍN',img_url:'https://static.zara.net/assets/public/150b/a6b4/bacc4d2e9b73/b8a58bcab72b/02298074250-e1/02298074250-e1.jpg?ts=1709033175165&w=315',price:'29,95 EUR'},{id:6,name:'JERSEY PUNTO ABALORIOS',img_url:'https://static.zara.net/assets/public/f9e3/af8b/8ed94a179260/49f3f365570d/01957015800-e1/01957015800-e1.jpg?ts=1706785903116&w=315',price:'29,95 EUR'},{id:7,name:'VESTIDO JACQUARD ESTRUCTURA',img_url:'https://static.zara.net/assets/public/f788/cceb/74964ee78669/4b5c141b6c5f/05039170620-e1/05039170620-e1.jpg?ts=1708936262252&w=315',price:'22,95 EUR'},{id:8,name:'VESTIDO CAMISERO MINI',img_url:'https://static.zara.net/assets/public/9872/3412/ef6a473299e1/2385516dca4f/02741648505-e1/02741648505-e1.jpg?ts=1709054005673&w=315',price:'35,95 EUR'},{id:9,name:'VESTIDO ENGOMADO BORDADOS',img_url:'https://static.zara.net/assets/public/20d9/c743/f256483ba4a0/18d4bae24eed/02492052505-e1/02492052505-e1.jpg?ts=1707930385280&w=315',price:'29,95 EUR'},{id:10,name:'VESTIDO Z1975 MINI DENIM',img_url:'https://static.zara.net/assets/public/04fd/624f/aba5439e9527/a2b48b7df9db/01879036406-e1/01879036406-e1.jpg?ts=1707930387217&w=315',price:'29,95 EUR'}];
        setInitialModalItems(data);
      }, 1000);
    };

    fetchInitialModalItems();
  }, []);

  // Zoom
  const [zoom, setZoom] = useState(1);
  const handleZoomIn = () => {
    if (zoom < 1) {
      setZoom(zoom + 0.35);
    }
  };
  const handleZoomOut = () => {
    if (zoom > 0.5) {
      setZoom(zoom - 0.35);
    }
  };

  // add row
  const [showProducts, setShowProducts] = useState({});
  const [rowContexts, setRowContexts] = useState([
    {
      id: 1,
      name: 'Fila',
      template: 'alignLeft',
      elements: []
    }
  ]);

  const addNewContext = () => {
    const newContext = {
      id: rowContexts.length + 1,
      name: 'Fila ' + ((rowContexts.length) + 1),
      template: '',
      elements: []
    };
    setRowContexts([...rowContexts, newContext]);
    setShowProducts({...showProducts, [rowContexts.length]: false});
  };

  // Export Grid Payload
  const [warningMessage, setWarningMessage] = useState('');
  const [successMessage, setSuccessgMessage] = useState('');

  const combinePayload = () => {
    const emptyFields = [];
    const payload = rowContexts.map(({ id, name, template, elements }) => {
      if (!name) emptyFields.push('name');
      if (!template) emptyFields.push('template');
      if (!elements || elements.length === 0) emptyFields.push('Productos');
      return {
        id,
        name,
        template,
        elements
      };
    });
    if (emptyFields.length > 0) {
      setWarningMessage(`Tienes filas con campos vacíos: -- ${emptyFields.join(', ')} --, para poder guardar tu parrilla debes completar todos los campos requeridos.`);
      setTimeout(() => {
        setWarningMessage('');
      }, 5000);
    } else {
      setSuccessgMessage(
        <>
        <h2>¡Parrilla generada exitosamente!</h2>
        <pre>{JSON.stringify(payload, null, 2)}</pre>
        </>
      );
      setTimeout(() => {
        setSuccessgMessage('');
      }, 7000);
    
      // Send data to endpoint
      console.log(payload);
    }
  };

  // Reveal animation
  RevealBoxes();

  return (
    <DndProvider backend={HTML5Backend}>
        {warningMessage && <div className="notification warning">{warningMessage}</div>}
        {successMessage && <div className="notification success">{successMessage}</div>}
        <div className="wrapParrilla">
            <div className="container" style={{ transform: `scale(${zoom})` }}>
              {rowContexts.map((context, index) => (
                <RowItems
                  key={context.id}
                  id={context.id}
                  name={context.name}
                  template={context.template}
                  elements={context.elements}
                  contextIndex={index}
                  setShowProducts={setShowProducts}
                  showProducts={{ ...showProducts, [index]: showProducts[index] }}
                  setRowContexts={setRowContexts}
                  rowContexts={rowContexts}
                  initialModalItems={initialModalItems}
                />
              ))}
              <div className="addNewRow reveal">
                <IconButton onClick={addNewContext} icon={<AddCircleIcon />} />
              </div>
            </div>
        </div>
        <div className="footerBar">
          <IconButton onClick={addNewContext} icon={<AddIcon />} text='Nueva fila' />
          <div className="zoom-controls">
            <IconButton onClick={handleZoomIn} icon={<ZoomInIcon />} />
            <IconButton onClick={handleZoomOut} icon={<ZoomOutIcon />} />
          </div>
          <IconButton onClick={combinePayload} icon={<SaveIcon />} text='Guardar parrilla' />  
        </div>
    </DndProvider>
  );
}

// Prop types
App.propTypes = {
  initialModalItems: PropTypes.array,
  zoom: PropTypes.number,
};

export default App;
