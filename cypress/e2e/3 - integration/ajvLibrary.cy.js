/// <reference types="cypress"/>

import Ajv from "ajv"
const ajv = new Ajv({allErrors: true, verbose: true})

const getSchemaError = (getAjvError) => {
  return cy.wrap(
    `Field: ${getAjvError[0]["name"]} is invalid. Cause: ${getAjvError[0]["message"]}`
  );
};

describe('Contrato de API com Cypress', () => {
    it('Faz requisição para API', () => {
      cy.api({
        method: 'GET',
        url: 'https://gorest.co.in/public/v1/users/4657166',
        }).then((response) => {
        cy.fixture('ajvSchema').then((ajvSchema) => {
          const validate = ajv.compile(ajvSchema)
          const valid  = validate(response.body.data) 
          cy.log(validate.errors)
         if (!valid) {
            getSchemaError(validate.errors).then((schemaError) => { 
            throw new Error(schemaError);
          });
        } else {
          cy.log("Schema validated!");
        }
        })
      })
    })
  })