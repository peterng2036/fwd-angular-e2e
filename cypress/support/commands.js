// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "cypress-wait-until";

Cypress.Screenshot.defaults({
  overwrite: true,
});

Cypress.Commands.add("login", (username, password) => {
  // skip campaign verification step
  cy.intercept('POST', '/api11/api/v1/changeRequest/verifyCampaignByCustomerId', { fixture: 'verifyCampaignByCustomerId.json' }).as('getverifyCampaignByCustomerId')

  cy.visit("/web11/fwd/login");

  cy.get(
    '[formcontrolname="email"] > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix'
  ).type(username);

  cy.get(
    '[formcontrolname="password"] > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix'
  ).type(password);

  cy.get(".primary-button").click();

  cy.wait(10000);
});

Cypress.Commands.add("pressEscape", () => {
  cy.get("body").trigger("keydown", { keyCode: 27 });
});

Cypress.Commands.add("handleRcsStep2WithoutDefaultPayout", (filename) => {
  cy.get(".confirm-button").click(); // click confirm button
  cy.get(".mat-radio-group .mat-radio-button:first-child").click(); // by fps
  cy.contains("Email Address").click(); // click Email Address
  cy.screenshot(`${filename}_step_2`);
  cy.contains("Next").click();
});

Cypress.Commands.add("handleRcsStep3", (filename) => {
  cy.contains("I /We declare that these particulars are true to the best of my/our knowledge and belief").click();
  cy.screenshot(`${filename}_step_3`);
  cy.contains("Next").click();
});

Cypress.Commands.add("handleRcsStep4", (filename) => {
  // check if complete title exist
  cy.get(".claim-complete-title-container").should("exist");
  // check if reference number exist
  cy.get(":nth-child(2) > :nth-child(2) > .claim-request-info-content").should("exist");
  cy.screenshot(`${filename}_step_4`);
});
