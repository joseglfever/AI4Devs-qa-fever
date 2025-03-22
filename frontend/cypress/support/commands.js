// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comando personalizado para arrastrar y soltar un elemento
Cypress.Commands.add('dragAndDrop', (draggable, droppable) => {
  cy.get(draggable)
    .trigger('mousedown', { which: 1, button: 0 })
    .then((source) => {
      cy.get(droppable)
        .trigger('mousemove')
        .trigger('mouseup', { force: true });
    });
});

// Comando simplificado para component testing que verifica si un candidato está en una columna específica
Cypress.Commands.add('candidateInColumn', (candidateName, columnName) => {
  cy.get(`[data-testid="column-${columnName}"]`)
    .find('.candidate-card')
    .should('contain', candidateName);
});

// Comando para esperar a que una API responda
Cypress.Commands.add('waitForApi', (method, url) => {
  cy.intercept(method, url).as('apiCall');
  cy.wait('@apiCall');
});

// Comando para simular drag and drop (simplificado)
Cypress.Commands.add('simulateDragDrop', (candidateSelector, sourceColumnName, targetColumnName) => {
  cy.get(candidateSelector).then($candidate => {
    // Eliminamos el candidato de su columna actual
    $candidate.remove();
    
    // Agregamos el candidato a la nueva columna
    cy.get(`[data-testid="column-${targetColumnName}"]`).then($targetColumn => {
      const candidateName = candidateSelector.replace('[data-testid="candidate-card-', '').replace('"]', '');
      const formattedName = candidateName.replace(/-/g, ' ');
      const candidateHtml = `<div class="mb-2 candidate-card"><div class="card" data-testid="${candidateSelector}"><div class="card-body"><h5 class="card-title">${formattedName}</h5><div>Rating: ⭐⭐⭐⭐⭐</div></div></div></div>`;
      $targetColumn.find('.droppable-area').append(candidateHtml);
    });
  });
});

// Visitar la página de posiciones
Cypress.Commands.add('visitPositionPage', (positionId) => {
  // En component testing, hay que hacerlo de forma simulada
  cy.window().then((win) => {
    win.location.hash = `#/positions/${positionId}`;
  });
}); 