describe('Mis primeras pruebas de API automatizadas', () => {

  it('Validar un método GET exitoso - Lista de usuarios', () => {
    // 1. Enviamos la petición HTTP de la misma forma que lo harías en Postman
    cy.request('GET', 'https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        
        // 2. Aquí hacemos los Asserts (Verificaciones)
        expect(response.status).to.eq(200); // Valida que el código de estado sea 200
        expect(response.body).to.have.lengthOf(10); // Valida que devuelva 10 usuarios
        expect(response.body[0]).to.have.property('name'); // Valida que el primer usuario tenga la propiedad 'name'
        
      });
  });

});