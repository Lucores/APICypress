describe('APIs Testing', () => {
    const dataJson = require('../../fixtures/createuser.json')
 
    it('Schema validation', () => {
        const schema = {
            title: 'Test Schema v1',
            type: 'object',
            required: ['id', 'product', 'price'],
            properties: {
              id: {
                type: 'string',
                minimum: 1,
              },
              product: {
                type: 'string',
              },
              price: {
                type: 'number',
              },
            },
          };
        cy.request('GET', 'https://flask-rest-api-demo.herokuapp.com/product/motorbike').then((res) =>{
        expect(res.status).equal(200)
        expect(res.body.product[0]).to.be.jsonSchema(schema);
        expect(res.body.product[0].id).equal(3);
        expect(res.body.product[0]).has.property('id', 3);

        })
    })

    it('GET API Users', () => {
      cy.request('GET', 'https://flask-rest-api-demo.herokuapp.com/users').then((res) =>{
      expect(res.status).equal(200);
      expect(res.body.users).has.length(5);
      expect(res.body.users).has.not.have.property('price');

      })
    })

      it('get users', () => {
        cy.request({
          method: 'GET',
          url: 'https://gorest.co.in/public-api/users',
          headers: {
            'authorization' : "Bearer f2a86568d1a89996c1c3e61d89575765c8e652f85eda7f3476d4dc969ec1e32a"
          }

        }).then((res)=>{
          expect(res.status).to.eq(200)
          expect(res.body.meta.pagination.limit).to.eq(10)
        })
      })

      it('create user', () => {
        let randomText = ""
        let testEmail = ""

        var pattern = "ABCDEFGHYIZOBHJFJKDHFJDHfjkhdsjkfhjdshfjksdhf"
        for (var i = 0; i< 10; i++)
          randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + '@gmail.com'
        cy.request({
          method: 'POST',
          url: 'https://gorest.co.in/public/v1/users',
          headers: {
            'authorization' : "Bearer f2a86568d1a89996c1c3e61d89575765c8e652f85eda7f3476d4dc969ec1e32a"
          },
          body: {
            "name":"Tenali Ramakrishna",
            "gender":"male", 
            "email": testEmail, 
            "status":"active"
          }

        }).then((res)=>{
          cy.log(JSON.stringify(res))
          expect(res.status).to.eq(201)
          expect(res.body.data).has.property('email', testEmail)
        })
      })

      it('create user with fixture', () => {
        let randomText = ""
        let testEmail = ""

        var pattern = "ABCDEFGHYIZOBHJFJKDHFJDHfjkhdsjkfhjdshfjksdhf"
        for (var i = 0; i< 10; i++)
          randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + '@gmail.com'
        cy.request({
          method: 'POST',
          url: 'https://gorest.co.in/public/v1/users',
          headers: {
            'authorization' : "Bearer f2a86568d1a89996c1c3e61d89575765c8e652f85eda7f3476d4dc969ec1e32a"
          },
          body: {
            "name": dataJson.name,
            "gender": dataJson.gender, 
            "email": testEmail, 
            "status": dataJson.status
          }

        }).then((res)=>{
          cy.log(JSON.stringify(res))
          expect(res.status).to.eq(201)
          expect(res.body.data).has.property('email', testEmail)
        })
      })

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
            "name": payload.name,
            "gender": payload.gender, 
            "email": testEmail, 
            "status": payload.status
          }

        }).then((res)=>{
          cy.log(JSON.stringify(res))
          expect(res.status).to.eq(201)
          expect(res.body.data).has.property('email', testEmail)
            const userId = res.body.data.id
           cy.request({
              method: 'GET',
              url: 'https://gorest.co.in/public/v1/users/' + userId,
              headers: {
                'authorization' : "Bearer f2a86568d1a89996c1c3e61d89575765c8e652f85eda7f3476d4dc969ec1e32a"
              }
            
            }).then((res)=>{
              expect(res.status).to.eq(200)
              expect(res.body.data.id).to.eq(userId)
          })
        })
      })
    })
})