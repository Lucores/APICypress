// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('getCep01001000', () => {
    cy.api({
        method: 'GET',
        url: 'https://viacep.com.br/ws/01001000/json/',
    })
});

Cypress.Commands.add('getAPI', (urlParam) => {
    cy.request({
        method: 'GET',
        url: urlParam,
        headers: {
            Authorization: 'Bearer f2a86568d1a89996c1c3e61d89575765c8e652f85eda7f3476d4dc969ec1e32a'
        }
    })
})
