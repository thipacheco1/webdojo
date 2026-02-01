import {getTodayDateFormatted} from '../support/utils'

describe('Login', () => {

  //AQUI foi pedido para o chat gpt criar uma funçao nativa em java script
  // que retorna sempre a data do dia atual em formato DD/MM/AAAA


  it('Deve logar com sucesso', () => {
    cy.start()
    //aqui eu consigo forçar a execucao do teste em um iphone xr
    cy.viewport('iphone-xr')
    cy.submitLoginform('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

    //validaçao de um COOKIE criado pela aplicaçao
    cy.getCookie('login_date').should('exist')
    //aqui consigo validar o VALOR do cookie que aparece la no historico
    cy.getCookie('login_date').should((cookie) => {
      expect(cookie.value).to.eq(getTodayDateFormatted())
    })

    //aqui ele esta indo la no LOCALSTORAGE da aplicao, e validando a chave do token
    //foi criada uma expressao regular em formato MD5 que é o formato do token que esta sendo usado na aplicacao
    //essa expressao ajuda a validar se o token está em um formato válido
    cy.window().then((win) => {
      const token = win.localStorage.getItem('token')
      expect(token).to.match(/^[a-fA-F0-9]{32}$/)//expressao regular REGEX
    })

  })

  //se eu colocar it.only vai executar apenas este step de teste
  it('Não deve logar com senha inválida', () => {
    cy.start()
    cy.submitLoginform('papito@webdojo.com', 'katana321')
    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Não deve logar com email nao cadastrado', () => {
    cy.start()
    cy.submitLoginform('404@webdojo.com', 'katana321')
    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })
})

//da pra usar  it.only para executar somente aquele teste
// e tbm da pra usar o it.skip para rodar todos e pular apenas 1 ou n

// npx cypress run   (isso executa os testes no terminal sem abrir o navegador)
// npx cypress run --headed (isso eh legal para apresentar, ele roda todos os testes cy.js no navegador de forma visual)

//importante
//para rodar em servidores, como gitactions ou bit, tem sempre que rodar em headless ou seja. de forma nao assistida.
//pois la nao tem interface grafica, entao o que é valido para a esteira. .é o relatorio que sai no terminal

//por definicao todos testes sao executados no navegador do cyperss o ELECTRON
//porém se vc quiser rodar o teste em outro navegador. basta usar o comando abaixo
// npx cypress run (esse executa no ELECTRON por padrao)
// npx cypress run --browser=chrome
// npx cypress run --browser=edge


//se eu quiser executar uma suite especifica de testes.. eu posso fazer assi
// //npx cypress run --spec cypress/e2e/login.cy.js