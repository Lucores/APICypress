

describe('usando cy exec', () => {
    const curlCommand = "curl -o test.json https://jsonplaceholder.typicode.com/todos/1"
  
    it('Teste Curl', () => {
      cy.exec(curlCommand)
        .should(({ stdout }) =>{
            const obj = JSON.parse(stdout)
            const { data } = obj;
            expect(data.id).to.eq(1)
        })
      
    })
  })