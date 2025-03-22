# Pruebas E2E con Cypress

Este directorio contiene las pruebas end-to-end (E2E) utilizando Cypress para el sistema de seguimiento de talento.

## Estructura de directorios

```
cypress/
  ├── e2e/                  # Pruebas end-to-end
  │   ├── basic_test.cy.js             # Prueba básica de la funcionalidad de Cypress
  │   ├── candidate_phase_change.cy.js # Prueba de cambio de fase de candidatos
  │   └── position_page_load.cy.js     # Prueba de carga de página de posición
  ├── fixtures/             # Datos de prueba
  │   └── example.json      # Datos de ejemplo para posiciones y candidatos
  ├── support/              # Archivos de soporte
  │   ├── commands.js       # Comandos personalizados para las pruebas
  │   ├── component.js      # Configuración para pruebas de componentes
  │   └── e2e.js            # Configuración para pruebas E2E
  └── README.md             # Este archivo
```

## Enfoque de pruebas

Dado que las pruebas E2E tradicionales requieren que la aplicación esté en ejecución, hemos adoptado un enfoque de simulación del DOM para probar la funcionalidad sin necesidad de un servidor en ejecución. Este enfoque nos permite:

1. Verificar que los componentes se renderizan correctamente
2. Simular interacciones de usuario como arrastrar y soltar candidatos
3. Comprobar que el estado de la UI se actualiza adecuadamente

## Pruebas implementadas

### 1. Carga de la página de posición

Este test verifica que:
- El título de la posición se muestra correctamente
- Se muestran las columnas correspondientes a cada fase del proceso de contratación
- Las tarjetas de los candidatos se muestran en la columna correcta según su fase actual

### 2. Cambio de fase de un candidato

Este test verifica que:
- Los candidatos pueden ser movidos de una columna a otra
- La UI se actualiza correctamente después del movimiento
- Se pueden realizar múltiples movimientos en la misma sesión

### 3. Prueba básica

Una prueba básica para verificar que Cypress puede manipular el DOM correctamente, como preparación para pruebas más complejas.

## Comandos de Cypress personalizados

Hemos implementado varios comandos personalizados para facilitar las pruebas:

- `candidateInColumn`: Verifica si un candidato está en una columna específica
- `visitPositionPage`: Simula la visita a la página de una posición

## Ejecución de pruebas

Para ejecutar las pruebas, utiliza uno de los siguientes comandos:

```bash
# Ejecutar todas las pruebas E2E en modo headless
npm run cypress:run

# Ejecutar una prueba específica
npm run cypress:run -- --spec "cypress/e2e/basic_test.cy.js"

# Abrir la interfaz gráfica de Cypress
npm run cypress:open
```

## Consideraciones

- Las pruebas actuales simulan el DOM directamente, lo que permite ejecutarlas sin necesidad de tener el frontend o backend en ejecución.
- Para pruebas más realistas que interactúen con el backend, se recomienda iniciar la aplicación (`npm start`) y configurar `baseUrl` en `cypress.config.js` para apuntar al servidor en ejecución.
- Los tests están diseñados para ser independientes y no depender del estado de pruebas anteriores. 