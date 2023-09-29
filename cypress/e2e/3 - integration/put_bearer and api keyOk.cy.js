it('create user with fixture another option', () => {
    let randomText = ""
    let testEmail = ""

    var pattern = "ABCDEFGHYIZOBHJFJKDHFJDHfjkhdsjkfhjdshfjksdhf"
    for (var i = 0; i< 10; i++)
      randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
    testEmail = randomText + '@gmail.com'

    cy.fixture('createuser').then((payload) => {
    //  Cypress fornece um diretório nomeado como fixtures, que armazena vários arquivos "JSON", 
    // e esses arquivos JSON podem armazenar os dados de teste que podem ser lidos por vários testes.
    // Armazenamos dados de teste na forma de valores-chave, que podemos acessar nos scripts de teste.

    cy.api({
      method: 'POST',
      url: 'https://gorest.co.in/public/v1/users',
      headers: {
        'authorization' : "Bearer <substitua pelo seu token>"
      },
      body: {
        "name": 'Alan',
        "gender": 'Male',
    //    "email": 'alanvoigt1@yahoo.com.br',  
        "email": testEmail,
        "status": 'active'
      }

    }).then((res)=>{
      cy.log(JSON.stringify(res))
      expect(res.status).to.eq(201)
  //    expect(res.body.data).has.property('email', 'alanvoigt1@yahoo.com.br')
        expect(res.body.data).has.property('email', testEmail)
        const userId = res.body.data.id
       cy.api({
          method: 'PUT',
          url: 'https://gorest.co.in/public/v1/users/' + userId,
          headers: {
            'authorization' : "Bearer f2a86568d1a89996c1c3e61d89575765c8e652f85eda7f3476d4dc969ec1e32a"
          },
          body: {
            "name": 'Alan Voigt',
            "gender": 'Male',
      //      "email": 'alanvoigt3@yahoo.com.br', 
            "email": payload.email,
            "status": 'inactive'
          }
        
        }).then((res)=>{
          expect(res.status).to.eq(200)
        //  expect(res.body.data).has.property('email', 'alanvoigt3@yahoo.com.br')
          expect(res.body.data).has.property('email', payload.email)
          expect(res.body.data).has.property('name', 'Alan Voigt')
      })
    })
  })
})

it('API KEY com postman', () => {
  cy.api({
    method: 'GET',
    url: 'https://api.getpostman.com/collections',
    headers: {
      'x-api-key' : "PMAK-<substitua pelo seu token>"
    }
  }).then((res)=>{
    cy.log(JSON.stringify(res))
    expect(res.status).to.eq(200)
})
})

it('API KEY com weatherapi Query params', () => {
  cy.api({
    method: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/weather?lat=-26.9165792&lon=-49.07173310000002',
    qs: {
      'appid' : "<substitua pelo seu token>"
    }
  }).then((res)=>{
    cy.log(JSON.stringify(res)) 
    expect(res.status).to.eq(200)
})
})


