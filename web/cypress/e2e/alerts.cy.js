describe('Validações de Alertas em JavaScript', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')

    });

    it('Deve validar a mensagem de alerta', () => {

        //isso aqui é um ouvinte. que vai ficar esperando o alert ocorrer
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou um Alert Box!')
        })

        cy.contains('button', 'Mostrar Alert').click()

    });

    it('Deve confirmar um diálogo e validar a resposta positiva', () => {
        //isso aqui é um ouvinte. que vai ficar esperando o alert ocorrer
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return true; //se for true ele simula o click no botao ok ... se for false ele simula o click no botao cancelar
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!')
        })
        
        cy.contains('button', 'Mostrar Confirm').click()
    });

    it('Deve cancelar um diálogo e validar a resposta negativa', () => {
        //isso aqui é um ouvinte. que vai ficar esperando o alert ocorrer
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return false; //se for true ele simula o click no botao ok ... se for false ele simula o click no botao cancelar
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!')
        })
        cy.contains('button', 'Mostrar Confirm').click()
    });

    it('Deve interagir com um prompt, inserir um texto e validar uma mensagem', () => {
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Thiago')
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá Thiago! Boas-vindas ao WebDojo!')

        })
        cy.contains('button', 'Mostrar Prompt').click()

    });
});