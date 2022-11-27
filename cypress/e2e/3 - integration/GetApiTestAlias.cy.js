describe("API testing with Alias", () => {

    beforeEach(() => {
        // 'users' is an alias
        cy.request('GET', "https://reqres.in/api/users?page=2").as('users')

    })

    it('Validate the header info', () => {
        cy.get('@users')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8')
    });

    it('Validate the status code', () => {
        cy.get('@users')
            .its('status')
            .should('equal', 200)
    });

    it('Validate user info in data json array', () => {
        cy.get('@users')
            .its('body').then((res) => {
                expect(res.data[0]).has.property('first name', "Michael")
            })
    });
})

