import address from '../fixtures/cep.json'

describe('CEP', () => {

    beforeEach(() => {
        cy.login(false)
        cy.goTo('Integração', 'Consulta de CEP')
    });

    it('Deve validar a consulta de cep', () => {

        /*
        com este cy.intercept, eu consigo simular a chamada da api, mudar o retorno do status code dela
        e ainda injetar dados no body
        */

        //lembrar que aqui no endereço estou usando ` aquele acento ao contrario para poder
        //injetar uma variavel ai no meio do endereço 
        //aqui estou MOCKANDO os dados da api - MOCK
        cy.intercept('GET', `https://viacep.com.br/ws/${address.cep}/json/`, {
            statusCode: 200,
            body: {
                logradouro: address.street,
                bairro: address.neighborhood,
                localidade: address.city,
                uf: address.state
            }
        }).as('getCep')

        cy.get('#cep').type(address.cep)
        cy.contains('button', 'Buscar').click()

        //precisa colocar esse wait para que ele aguarde a interceptacao ocorer
        //antes de começar a validacao dos campos
        cy.wait('@getCep')

        cy.get('#street').should('have.value', address.street)
        cy.get('#neighborhood').should('have.value', address.neighborhood)
        cy.get('#city').should('have.value', address.city)
        cy.get('#state').should('have.value', address.state)
    });
});