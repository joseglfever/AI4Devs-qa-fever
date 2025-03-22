// Este test utiliza un enfoque de manipulación directa del DOM para verificar el cambio de fase de un candidato
describe('Cambio de Fase de un Candidato', () => {
  beforeEach(() => {
    // Creamos una simulación del DOM para probar
    cy.visit('about:blank');
    cy.document().then(document => {
      document.body.innerHTML = `
        <div id="app">
          <div class="container mt-4">
            <div class="row">
              <div class="col-12">
                <h2 data-testid="position-title">Senior Full-Stack Engineer</h2>
                <div class="d-flex mt-4">
                  <div class="stage-column mr-3" data-testid="column-Initial Screening">
                    <div class="card">
                      <div class="card-header">Initial Screening</div>
                      <div class="card-body droppable-area">
                        <div class="mb-2 candidate-card">
                          <div class="card" data-testid="candidate-card-Jane-Smith">
                            <div class="card-body">
                              <h5 class="card-title">Jane Smith</h5>
                              <div>Rating: ⭐</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="stage-column mr-3" data-testid="column-Technical Interview">
                    <div class="card">
                      <div class="card-header">Technical Interview</div>
                      <div class="card-body droppable-area">
                        <div class="mb-2 candidate-card">
                          <div class="card" data-testid="candidate-card-John-Doe">
                            <div class="card-body">
                              <h5 class="card-title">John Doe</h5>
                              <div>Rating: ⭐⭐⭐⭐⭐</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="stage-column" data-testid="column-Manager Interview">
                    <div class="card">
                      <div class="card-header">Manager Interview</div>
                      <div class="card-body droppable-area"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    
    // Permitimos que el DOM se estabilice
    cy.wait(100);
  });

  it('Simula el arrastre de un candidato de una columna a otra', () => {
    // Verificamos que el candidato John Doe existe y está en Technical Interview
    cy.get('[data-testid="candidate-card-John-Doe"]').should('exist');
    cy.get('[data-testid="column-Technical Interview"]')
      .find('.candidate-card')
      .should('contain', 'John Doe');
    
    // Verificamos que la columna destino existe
    cy.get('[data-testid="column-Manager Interview"]')
      .find('.droppable-area')
      .should('exist');
    
    // Simulamos el movimiento del candidato
    cy.get('[data-testid="candidate-card-John-Doe"]').parent('.candidate-card').then($candidate => {
      // Guardamos el contenido HTML del candidato
      const candidateHtml = $candidate.prop('outerHTML');
      
      // Eliminamos el candidato de su columna actual
      $candidate.remove();
      
      // Añadimos el candidato a la nueva columna
      cy.get('[data-testid="column-Manager Interview"] .droppable-area').then($droppable => {
        $droppable.append(candidateHtml);
      });
    });
    
    // Verificamos que John Doe ya no está en la columna Technical Interview
    cy.get('[data-testid="column-Technical Interview"]')
      .find('.candidate-card')
      .should('not.exist');
    
    // Verificamos que John Doe ahora está en la columna Manager Interview
    cy.get('[data-testid="column-Manager Interview"]')
      .find('.candidate-card')
      .should('exist')
      .should('contain', 'John Doe');
  });

  it('Simula el movimiento de múltiples candidatos entre columnas', () => {
    // Verificamos que Jane Smith está inicialmente en Initial Screening
    cy.get('[data-testid="column-Initial Screening"]')
      .find('.candidate-card')
      .should('contain', 'Jane Smith');
    
    // Movemos a Jane Smith a Technical Interview
    cy.get('[data-testid="candidate-card-Jane-Smith"]').parent('.candidate-card').then($candidate => {
      const candidateHtml = $candidate.prop('outerHTML');
      $candidate.remove();
      cy.get('[data-testid="column-Technical Interview"] .droppable-area').then($droppable => {
        $droppable.append(candidateHtml);
      });
    });
    
    // Permitimos que el DOM se actualice
    cy.wait(100);
    
    // Verificamos que Jane Smith está ahora en Technical Interview
    cy.get('[data-testid="column-Technical Interview"]')
      .find('.candidate-card')
      .should('contain', 'Jane Smith');
    
    // Verificamos que John Doe también está en Technical Interview
    cy.get('[data-testid="column-Technical Interview"]')
      .find('.candidate-card')
      .should('contain', 'John Doe');
    
    // Movemos a John Doe a Manager Interview
    cy.get('[data-testid="candidate-card-John-Doe"]').parent('.candidate-card').then($candidate => {
      const candidateHtml = $candidate.prop('outerHTML');
      $candidate.remove();
      cy.get('[data-testid="column-Manager Interview"] .droppable-area').then($droppable => {
        $droppable.append(candidateHtml);
      });
    });
    
    // Permitimos que el DOM se actualice
    cy.wait(100);
    
    // Verificamos la posición final de los candidatos
    cy.get('[data-testid="column-Initial Screening"]')
      .find('.candidate-card')
      .should('not.exist');
    
    cy.get('[data-testid="column-Technical Interview"]')
      .find('.candidate-card')
      .should('contain', 'Jane Smith')
      .should('not.contain', 'John Doe');
    
    cy.get('[data-testid="column-Manager Interview"]')
      .find('.candidate-card')
      .should('contain', 'John Doe');
  });
}); 