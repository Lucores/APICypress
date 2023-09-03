const API_CEP = Cypress.env('API_CEP')
    
    it('Teste comando Cypress', () => {
        cy.getCep01001000()
            .then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.cep).to.equal('01001-000')
                expect(response.body.logradouro).to.equal('Praça da Sé')
                expect(response.body.complemento).to.equal('lado ímpar')
                expect(response.body.bairro).to.equal('Sé') 
                expect(response.body.localidade).to.equal('São Paulo')
                expect(response.body.uf).to.equal('SP')
                expect(response.body.ibge).to.equal('3550308')
                expect(response.body.gia).to.equal('1004')
                expect(response.body.ddd).to.equal('11')
                expect(response.body.siafi).to.equal('7107')
            });
    });