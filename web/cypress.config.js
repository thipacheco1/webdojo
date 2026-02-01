const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //defaultCommandTimeout:10000
    experimentalStudio:true,//aqui habilita o cypress studio.. para poder autumatizar clicando nas coisas
    video:true, //ativa pra fazer video da execucao dos testes
    baseUrl : 'http://localhost:3000',//url que sera usada em todos testes
    viewportWidth : 1440,
    viewportHeight : 900
  },
});
