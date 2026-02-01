//import consultancyData from '../fixtures/consultancy.json'
//pra buscar a massa de dados que foi externalizada pra outro arquivo
import { personal, company } from '../fixtures/consultancy.json'
//no exemplo acima usando {} da pra importar somente os objetos que vou usar


describe('Formulário de Consultoria', () => {

    before(() => {
        cy.log('isso aqui acontece uma UNICA vez antes de todos os testes')
        //aqui pode por exemplo fazer uma chamada customizada de banco
        //aqui ele vai executar uma UNICA vez. independente da quantidade de testes
    })


    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')
        //aqui é GANCHO do cypress.. tudo que eu coloco aqui. se repete para todos os IT
        //ANTES de iniciar qualquer IT. ele vai executar isso aqui 
        //ele vai executar isso aqui toda vez que um novo it for executado



    })

    it('Deve solicitar consultoria individual', () => {

        cy.fillConsultancyForm(personal)

        cy.submitConsultancyForm()

        cy.validateConsuntancyModal()



        //  //label[text()="Tipo de Consultoria"]/..//select 
        //.parent()//parent direciona o foco para o elemento pai do botao
        //.parent()
        //.parent()
        //.should('be.visible')
        // exemplo de um localizador em xpath para buscar um elemento na pagina
        //h4[text()="Formulários"]/../../..'
        //nota o exemlpo do xpath ja começa com //h4

        //input[placeholder="Digite seu nome completo"]
        //acima um exemplo CSS SELECTOR buscando o identificador placeholder
        //através da tag html input

        //boas praticas
        //usar o ID do campo ou buscar com um css selector igual ao abaixo
        //input[placeholder="Digite seu email"]

    })

    it('Deve solicitar consultoria in Company', () => {

        cy.fillConsultancyForm(company)

        cy.submitConsultancyForm()

        cy.validateConsuntancyModal()


        //  //label[text()="Tipo de Consultoria"]/..//select 
        //.parent()//parent direciona o foco para o elemento pai do botao
        //.parent()
        //.parent()
        //.should('be.visible')
        // exemplo de um localizador em xpath para buscar um elemento na pagina
        //h4[text()="Formulários"]/../../..'
        //nota o exemlpo do xpath ja começa com //h4

        //input[placeholder="Digite seu nome completo"]
        //acima um exemplo CSS SELECTOR buscando o identificador placeholder
        //através da tag html input

        //boas praticas
        //usar o ID do campo ou buscar com um css selector igual ao abaixo
        //input[placeholder="Digite seu email"]

    })

    it('Deve verificar os campos obrigatórios', () => {


        cy.submitConsultancyForm()

        const requiredFields = [
            { label: 'Nome Completo', message: 'Campo obrigatório' },
            { label: 'Email', message: 'Campo obrigatório' },
            { label: 'termos de uso', message: 'Você precisa aceitar os termos de uso' }
        ]

        requiredFields.forEach(({label, message}) => {
            cy.contains('label', label)
                .parent()
                .find('p')
                .should('be.visible')
                .should('have.text', message)
                .and('have.class', 'text-red-400')
                .and('have.css', 'color', 'rgb(248, 113, 113)') //validando cor vermelha no css
            //validando uma classe pra ver se o texto ta vermelho
        })

    })

    afterEach(() => {
        cy.log('isso aqui acontece após exeutar os testes')
    })

    after(() => {
        cy.log('isso aqui acontece depois de TODOS testes uma unica vez')
        //aqui alguma funcao de checagem ou catalogar log.
    })
})

