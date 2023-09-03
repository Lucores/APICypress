it('Falha com erro 401', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.typeform.com/me',
      failOnStatusCode: false,
      // Testar com true
    }).should(({ status, body }) => {
      expect(status).to.equal(401)
      expect(body).includes('AUTHENTICATION_FAILED')
      expect(body)
        .includes('Authentication credentials not found on the Request Headers')
      // ou
      const objetoBody = JSON.parse(body)
      const { code, descriptions } = objetoBody 
      expect(code).to.equal('AUTHENTICATION_FAILED')
      expect(descriptions)
        .to.equal('Authentication credentials not found on the Request Headers')
    })
  })