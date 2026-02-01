describe('iFrame', () => {

    it('Deve poder tocar o vídeo de exemplo', function () {
        cy.login()
        cy.contains('Video').click()

        cy.wait(3000)
        cy.get('iframe[title="Video Player"]')
            .should('exist')
            .its('0.contentDocument.body')//obtendo o conteudo da pagina do iframe
            //passar a posicao 0 no inicio para pegar a primeira que for encontrada
            .then(cy.wrap)//transformando a informacao em um objeto
            .as('iFramePlayer')//dando um nome para o frame salvo

        cy.get('@iFramePlayer')
            .find('.play-button')
            .click()

        cy.get('@iFramePlayer')
            .find('.pause-button')
            .should('be.visible')
        
    })


})