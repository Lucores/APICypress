// https://testersdock.com/cypress-mock-api-intercept/
// https://www.youtube.com/watch?v=z57lsgbImug&t=5s

    describe('Example to demonstrate API Mocking in Cypress', () => {

  //      beforeEach(() => {
  //          cy.visit('https://angular.realworld.io/')
  //          cy.intercept('GET', '**/tags', 'fixture:tags.json')
  //          cy.intercept('GET', '**/articles*', 'fixture:articlefeed.json')
       
   //     })

   //     it('Mock the Tags from the API Response and then validate on UI', () => {
   //         cy.get('.tag-list')
   //             .should('contain', 'cypress')
   //             .and('contain', 'selenium')

  //      })

  //      it('Mock the Article feed from the API Response and then validate on UI', () => {
  //          cy.get('app-favorite-button.pull-xs-right').contains('10')
  //          cy.get('.author').contains('testersdock')
  //          cy.get('.preview-link > p').contains('This is a test description')
  //      })
  //  })

//  describe("API testing with Alias", () => {
 //   it('Fazer o for each', () => {
 //       cy.api('GET', "https://reqres.in/api/users?page=2").as('users')
  //      cy.get('@users')
 //           .its('body').then((res) => {
  ///              expect(res.data[0]).has.property('first_name', "Michael")
  //              res.data.forEach(element => {
  //                  expect(element).has.property('first_name')
  //              });
  //          })
  //  });

    
 //   it('intercept', () => {
 //      cy.intercept('GET', '/api/users?page=2', {fixture: 'mockAPI.json'})
       // cy.api('GET', "https://reqres.in/api/users?page=2")
  //      cy.visit('https://reqres.in/')
 //   });

    
    it('get users', () => {
        cy.api({
          method: 'GET',
          url: 'https://gorest.co.in/public-api/users',
        }).then((res)=>{
          expect(res.status).to.eq(200)
          expect(res.body.meta.pagination.limit).to.eq(10)
        })
      })

       
   it('intercept', () => {
       cy.intercept('GET', 'https://gorest.co.in/public-api/users', {fixture: 'mockAPI2.json'})
    //   cy.visit('/')
//        cy.api('GET', "https://gorest.co.in/public-api/users") 
      //  cy.visit('https://gorest.co.in')
    });

    it('intercept1', () => {
    cy.intercept(
        {
          method: 'GET',
          url: 'https://gorest.co.in/public-api/users'
        },
        {
          statusCode: 200,
          statusMessage: 'Success',
          body: {
            id: 4809509,
            name: "Usinggggg fixtures to represent data",
            email: "sJDCjFdsGJ@gmail.com",
            gender: "male",
          }
        }
      ).as('interceptedRequest');
  
      cy.wait('@interceptedRequest').should(({ request, response }) => {
        cy.log("Response", response.body);
  
        // Perform Assertion based on response body 
      })
    })
})