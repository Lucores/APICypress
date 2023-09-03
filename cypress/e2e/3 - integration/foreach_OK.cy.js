describe("API testing with Alias", () => {

    beforeEach(() => {
        // 'users' is an alias
        cy.api('GET', "https://reqres.in/api/users?page=2").as('users')

    })
   

    it('Fazer o for each', () => {
        cy.get('@users')
            .its('body').then((res) => {
                expect(res.data[0]).has.property('first_name', "Michael")
                res.data.forEach(element => {
                    expect(element).has.property('firstr_name')
                });
            })
    });
})