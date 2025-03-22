// ***********************************************************
// This example support/component.js is processed and
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
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react'

Cypress.Commands.add('mount', mount)

// Ejemplo de importar React
// import React from 'react'

// Comando simplificado para component testing
Cypress.Commands.add('mountSimulatedApp', () => {
  cy.window().then((win) => {
    // Simulamos un componente react con el comportamiento que queremos probar
    win.document.body.innerHTML = `
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
}); 