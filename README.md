# React,Javascrpt, DnDkit + Vite

# DEMO: https://josegabrielm7.sg-host.com/

Este proyecto es una aplicación web desarrollada con React, aprovechando las capacidades modernas de Vite v5 para un rápido desarrollo y compilación. Utiliza react-dnd para funcionalidades de arrastrar y soltar, react-router-dom para la navegación, Material-UI para componentes de UI estilizados y coherentes, y PurgeCSS para optimizar los estilos eliminando CSS no utilizado.

## Configuración del Entorno

Para correr este proyecto localmente, necesitas tener instalado [Node.js](https://nodejs.org/) (recomendamos usar la última versión LTS).

### Estructura

Primero, clona este repositorio en tu máquina local usando:

- src /
    - main.js
    - App.js
    - index.css (minificado)
    - index.scss
        - assets /
            - scss /
                _parrilla.scss
                _presets.scss
        - components / 
            - animation /
                - RevealBoxes.js
            - utils /
                - Button.jsx
                - IconButton.jsx
            - ItemProduct.jsx // Listado de "Items" para ser añadidos
            - ListItems.jsx // Gestiona creación y renderización de "Items" 
            - RowItems.jsx  // Gestiona creación y renderización de "filas"

## Clonar el Repositorio

```bash
git git@github.com:angrygabo/React-Javascript-FrontendTools.git


npm install
npm run dev

