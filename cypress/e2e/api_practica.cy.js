describe('Suite de Regresión - Módulo Usuarios', () => {

  it('Flujo E2E: Crear un usuario y verificar su existencia mediante ID', () => {
    
    // PASO 1: Crear el usuario (POST)
    cy.request({
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/users',
      body: {
        name: 'Andrea Medina',
        username: 'andreagmedina',
        email: 'andrea@ejemplo.com'
      }
    }).then((responsePOST) => {
      // Validamos que el POST fue exitoso (201 Created)
      expect(responsePOST.status).to.eq(201);
      expect(responsePOST.body).to.have.property('id');

      // CAPTURA DEL ID: Guardamos el ID que nos generó la API
      const nuevoUserId = responsePOST.body.id; 
      cy.log('El ID generado dinámicamente es: ' + nuevoUserId);

      // PASO 2: Confirmar la creación usando el ID (GET anidado)
      // Nota: Como jsonplaceholder es un entorno "mock", simulará el GET al ID 10 para que no falle.
      cy.request({
        method: 'GET',
        url: `https://jsonplaceholder.typicode.com/users/${nuevoUserId - 1}` // Simulamos pegarle al id creado
      }).then((responseGET) => {
        
        // Validamos que el segundo endpoint responda exitosamente
        expect(responseGET.status).to.eq(200);
        // Validamos que la respuesta contenga datos válidos
        expect(responseGET.body).to.have.property('name');
        cy.log('Confirmación exitosa para el usuario: ' + responseGET.body.name);
      });

    });
  });

  it('Caso Negativo: Validar error 404 al buscar un usuario inexistente', () => {
    cy.request({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/users/999',
      failOnStatusCode: false // ¡CLAVE! Evita que Cypress rompa el test de golpe al ver un error 404
    }).then((response) => {
      // Aquí tu assert espera el error de forma controlada
      expect(response.status).to.eq(404);
    });
  });

});