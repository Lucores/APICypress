describe(' API Automation In Cypress', () => {
    it(' Using Custom Commands', () => {
        cy.getAPI('https://gorest.co.in/public-api/users').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.meta.pagination.limit).to.eq(10)
        })
    })
})
