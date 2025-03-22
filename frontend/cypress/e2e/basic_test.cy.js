// Prueba básica para verificar el funcionamiento de Cypress
describe('Prueba básica de funcionamiento', () => {
  it('Puede manipular el DOM', () => {
    // Creamos un elemento en el DOM para manipularlo
    cy.visit('about:blank');
    cy.document().then(document => {
      document.body.innerHTML = `
        <div id="test-container">
          <h1>Prueba de Cypress</h1>
          <div class="stage-column" data-testid="column-1">
            <div class="card">
              <div class="card-header">Columna 1</div>
              <div class="card-body droppable-area">
                <div class="candidate-card" data-testid="candidate-1">
                  <div class="card-body">
                    <h5>Candidato 1</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="stage-column" data-testid="column-2">
            <div class="card">
              <div class="card-header">Columna 2</div>
              <div class="card-body droppable-area"></div>
            </div>
          </div>
        </div>
      `;
    });

    // Verificamos que los elementos existen
    cy.get('#test-container h1').should('contain', 'Prueba de Cypress');
    cy.get('[data-testid="column-1"]').should('exist');
    cy.get('[data-testid="column-2"]').should('exist');
    cy.get('[data-testid="candidate-1"]').should('exist');
    
    // Simulamos el movimiento de un candidato de una columna a otra
    cy.get('[data-testid="candidate-1"]').then($candidate => {
      const candidateHtml = $candidate.prop('outerHTML');
      
      // Eliminamos el candidato de su columna actual
      $candidate.remove();
      
      // Añadimos el candidato a la nueva columna
      cy.get('[data-testid="column-2"]').find('.droppable-area').then($droppable => {
        $droppable.append(candidateHtml);
      });
    });
    
    // Verificamos que el candidato ya no está en la columna 1
    cy.get('[data-testid="column-1"]').find('.candidate-card').should('not.exist');
    
    // Verificamos que el candidato ahora está en la columna 2
    cy.get('[data-testid="column-2"]').find('.candidate-card').should('exist');
  });
}); 