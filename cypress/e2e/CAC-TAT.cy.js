describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => { 
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Eu amo meus gatos Java e Juju! ', 10)

    cy.get('#firstName').type('Liza')
    cy.get('#lastName').type('Tester')
    cy.get('#email').type('liza@tester.com')
    cy.get('#open-text-area').type(longText, {delay: 10})
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Liza')
    cy.get('#lastName').type('Tester')
    cy.get('#email').type('liza@tester,com')
    cy.get('#open-text-area').type('Teste')
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')    
  })

  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
   
  }) 

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Liza')
    cy.get('#lastName').type('Tester')
    cy.get('#email').type('liza@tester.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')    
  })  

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Liza')
      .should('have.value', 'Liza')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Tester')
      .should('have.value', 'Tester')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('liza@tester.com')
      .should('have.value', 'liza@tester.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('988948604')
      .should('have.value', '988948604')
      .clear()
      .should('have.value', '')
   
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('be.visible', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('be.visible', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('be.visible', 'Blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked', 'Feedback')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Liza')
    cy.get('#lastName').type('Tester')
    cy.get('#email').type('liza@tester.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible') 
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('simpleFile')
    cy.get('#file-upload')
      .selectFile('@simpleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

})

// Ao colocar o .only na frente de um teste, isso implica que apenas ele será executado