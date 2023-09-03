it('create user with fixture another option', () => {
    let randomText = ""
    let testEmail = ""

    var pattern = "ABCDEFGHYIZOBHJFJKDHFJDHfjkhdsjkfhjdshfjksdhf"
    for (var i = 0; i< 10; i++)
      randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
    testEmail = randomText + '@gmail.com'

    cy.fixture('createuser').then((payload) => {

    cy.request({
      method: 'POST',
      url: 'https://gorest.co.in/public/v1/users',
      headers: {
        'authorization' : "Bearer f2a86568d1a89996c1c3e61d89575765c8e652f85eda7f3476d4dc969ec1e32a"
      },
      body: {
        "name": 'Alan',
        "gender": 'Male',
        "email": 'alanvoigt5@yahoo.com.br', 
        "status": 'active'
      }

    }).then((res)=>{
      cy.log(JSON.stringify(res))
      expect(res.status).to.eq(201)
      expect(res.body.data).has.property('email', 'alanvoigt5@yahoo.com.br')
   //   }).then((res) => {
        const userId = res.body.data.id
       cy.request({
          method: 'DELETE',
          url: 'https://gorest.co.in/public/v1/users/' + userId,
          headers: {
            'authorization' : "Bearer f2a86568d1a89996c1c3e61d89575765c8e652f85eda7f3476d4dc969ec1e32a"
          }
        
        }).then((res)=>{
          expect(res.status).to.eq(204)
      })
    })
  })
})