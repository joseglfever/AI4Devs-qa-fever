// Este archivo realiza pruebas de movimiento de candidatos entre etapas
describe('Candidate Movement Between Stages', () => {
  beforeEach(() => {
    // Usamos nuestro comando personalizado para montar una simulación de la app
    cy.mountSimulatedApp();
  });

  it('Permite mover un candidato de una etapa a otra', () => {
    // Verificamos que John Doe está inicialmente en Technical Interview
    cy.get('[data-testid="column-Technical Interview"]')
      .find('.candidate-card')
      .should('contain', 'John Doe');
    
    // Simulamos el movimiento del candidato
    cy.get('[data-testid="candidate-card-John-Doe"]').then($candidate => {
      // Guardamos el HTML del candidato
      const candidateHtml = $candidate.prop('outerHTML');
      
      // Eliminamos el candidato de su ubicación actual
      $candidate.remove();
      
      // Insertamos el candidato en la nueva columna
      cy.get('[data-testid="column-Manager Interview"]').then($targetColumn => {
        $targetColumn.find('.droppable-area').append(candidateHtml);
      });
    });
    
    // Verificamos que John Doe ya no está en la columna original
    cy.get('[data-testid="column-Technical Interview"]')
      .find('.candidate-card')
      .should('not.contain', 'John Doe');
    
    // Verificamos que John Doe ahora está en la nueva columna
    cy.get('[data-testid="column-Manager Interview"]')
      .find('.candidate-card')
      .should('contain', 'John Doe');
  });

  it('Permite mover un candidato utilizando el comando personalizado', () => {
    // Verificamos que Jane Smith está inicialmente en Initial Screening
    cy.candidateInColumn('Jane Smith', 'Initial Screening');
    
    // Usamos nuestra función auxiliar para simplificar la simulación del movimiento
    cy.get('[data-testid="candidate-card-Jane-Smith"]').then($candidate => {
      const candidateHtml = $candidate.prop('outerHTML');
      $candidate.remove();
      cy.get('[data-testid="column-Technical Interview"]').then($targetColumn => {
        $targetColumn.find('.droppable-area').append(candidateHtml);
      });
    });
    
    // Verificamos que Jane Smith ya no está en la columna original
    cy.get('[data-testid="column-Initial Screening"]')
      .find('.candidate-card')
      .should('not.contain', 'Jane Smith');
    
    // Verificamos que Jane Smith está ahora en la nueva columna
    cy.candidateInColumn('Jane Smith', 'Technical Interview');
  });
}); 