// Este archivo realiza pruebas de los componentes relacionados con los detalles de una posición
describe('Position Details Component', () => {
  beforeEach(() => {
    // Usamos nuestro comando personalizado para montar una simulación de la app
    cy.mountSimulatedApp();
  });

  it('Muestra el título de la posición correctamente', () => {
    // Verificamos que el título de la posición se muestra correctamente
    cy.get('[data-testid="position-title"]')
      .should('exist')
      .should('contain', 'Senior Full-Stack Engineer');
  });

  it('Muestra las columnas con los pasos del proceso de entrevista', () => {
    // Verificamos que se muestran las columnas correctas
    cy.get('[data-testid="column-Initial Screening"]').should('exist');
    cy.get('[data-testid="column-Technical Interview"]').should('exist');
    cy.get('[data-testid="column-Manager Interview"]').should('exist');
  });

  it('Muestra a los candidatos en las columnas correctas según su fase actual', () => {
    // Verificamos que John Doe está en la columna Technical Interview
    cy.get('[data-testid="column-Technical Interview"]')
      .find('.candidate-card')
      .should('contain', 'John Doe');
    
    // Verificamos que Jane Smith está en la columna Initial Screening
    cy.get('[data-testid="column-Initial Screening"]')
      .find('.candidate-card')
      .should('contain', 'Jane Smith');
  });
}); 