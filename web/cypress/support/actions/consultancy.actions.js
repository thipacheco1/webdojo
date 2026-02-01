Cypress.Commands.add('fillConsultancyForm', (form) => {

    //aqui estou declarando uma constante. pra ela ter os dados la do beforeEach
    //onde externalizei os dados da massa de testes para um json

    cy.get('input[placeholder="Digite seu nome completo"]').type(form.name)
    cy.get('input[placeholder="Digite seu email"]').type(form.email)

    cy.get('input[placeholder="(00) 00000-0000"]')
        .type(form.fone) //preenchendo campo do telefone
        .should('have.value', '(11) 99999-1000') //validando se foi preenchido corretamente com a mascara buscando pelo value do campo

    //aqui um exemplo usando o localizador pelo ID 
    //cy.get('#consultancyType').select('inCompany')

    //aqui buscando o elemento como se fosse um xpath
    //caso nao tenha um ID no campo
    cy.contains('label', 'Tipo de Consultoria')
        .parent() //pegando o elemento pai
        .find('select') //buscando elemento alvo para manipular
        .select(form.consultancyType)


    if (form.personType == 'cpf') {
        // //span[text()="Pessoa Física"]/..//input
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .check() //ou .click()
            .should('be.checked')
        //nos botoes de radio pde usar tanto o click() como o check()

        //aqui ele garante que prencheu o pessoa fisica no comando acima. e aqui embaixo ele valida 
        //se realmente o campo pessoa juridica ficou desmarcado
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(form.document)
        //.should('have.value', '656.025.300-70')
    }

    if (form.personType == 'cnpj') {
        // //span[text()="Pessoa Física"]/..//input
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .check() //ou .click()
            .should('be.checked')
        //nos botoes de radio pde usar tanto o click() como o check()

        //aqui ele garante que prencheu o pessoa fisica no comando acima. e aqui embaixo ele valida 
        //se realmente o campo pessoa juridica ficou desmarcado
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(form.document)
        //.should('have.value', '656.025.300-70')
    }





    //declaracao de uma constante de arrays

    //isso aqui é um loop para percorrer pela lista e canais e selecionar eles
    form.discoveryChannels.forEach((channel) => {
        cy.contains('label', channel)
            .find('input')
            .check()
            .should('be.checked')
    })

    //interagir com elementos de upload de arquivos
    cy.get('input[type="file"]')
        .selectFile(form.file, { force: true })

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(form.description)

    //interagindo com array de tags e simulando teclado


    //um loop para preencher rapidamento usando o array de tech
    form.techs.forEach((tech) => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(tech)
            .type('{enter}')//simulando o pressionar de uma tecla ENTER

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', tech)
            .should('be.visible')// should = DEVE 
    })

    if (form.terms == true) {
        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
    }

})

Cypress.Commands.add('submitConsultancyForm', () => {
    cy.contains('button', 'Enviar formulário')
        .click()
})

Cypress.Commands.add('validateConsuntancyModal', () => {
    cy.get('.modal', { timeout: 7000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    //cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    // .should('be.visible')
}) 