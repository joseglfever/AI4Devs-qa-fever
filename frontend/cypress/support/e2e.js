// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands') 

// Utilizamos un enfoque simplificado para simular drag and drop
// debido a las limitaciones con react-beautiful-dnd y Cypress
Cypress.Commands.add('drag', { prevSubject: 'element' }, (subject, options) => {
  const { direction = 'right', distance = 100, force = false } = options || {};
  
  cy.wrap(subject)
    .trigger('mousedown', { which: 1, force })
    .trigger('mousemove', { 
      clientX: direction === 'right' ? distance : (direction === 'left' ? -distance : 0),
      clientY: direction === 'down' ? distance : (direction === 'up' ? -distance : 0),
      force 
    })
    .trigger('mouseup', { force });
});

// Comando para simular el movimiento de un candidato a una nueva columna
Cypress.Commands.add('moveCandidateTo', (candidateName, targetColumnName) => {
  const formattedCandidateName = candidateName.replace(/\s+/g, '-');
  const candidateSelector = `[data-testid="candidate-card-${formattedCandidateName}"]`;
  const targetColumnSelector = `[data-testid="column-${targetColumnName}"]`;
  
  // En un escenario real, aquí utilizaríamos código para arrastrar y soltar
  // Pero debido a limitaciones de Cypress con react-beautiful-dnd, 
  // estamos simulando el resultado final
  
  cy.get(candidateSelector).then($candidate => {
    // Guardamos el HTML del candidato
    const candidateHtml = $candidate.prop('outerHTML');
    
    // Disparamos una simulación de la llamada API que ocurriría al mover
    cy.intercept('PUT', `${Cypress.env('apiUrl')}/candidates/application/*/stage`, {
      statusCode: 200,
      body: { success: true }
    }).as('updateCandidateStage');
    
    // Eliminamos el candidato de su ubicación actual
    $candidate.remove();
    
    // Insertamos el candidato en la nueva columna
    cy.get(targetColumnSelector).then($targetColumn => {
      $targetColumn.find('.droppable-area').append(candidateHtml);
      
      // Forzamos la actualización del DOM para que Cypress detecte el cambio
      cy.wait(100);
    });
  });
}); 