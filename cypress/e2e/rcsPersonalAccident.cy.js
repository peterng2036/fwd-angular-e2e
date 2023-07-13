const username = "support081";
const password = "0000@Fwd";
const policyNo = "11018657";

const testCase020FileName = "020_life_claims_rcs_pa_with_dafault_payout";
const testCase021FileName = "021_life_claims_rcs_pa_without_dafault_payout";

describe("Rcs Personal Accident claim", () => {
  beforeEach(() => {
    cy.login(username, password);

    cy.get(".menu-button-container > :nth-child(1)").click(); // select file a claim
    cy.contains("Personal accident").click();
  });

  it("should successfully submit rcs personal accident claim without default payout", () => {
    // step 1
    cy.contains("Skip").click();

    // policy
    cy.get(".mat-select-placeholder").click();
    cy.contains(policyNo).click();

    // benefit type
    cy.get("#benefitType").click();
    cy.get(".mat-option-text").click();

    // accident date
    cy.get("#paAccidentDate").type("2023-07-01", { force: true });
    cy.pressEscape();

    // treatment fee
    cy.get("#hAccidentTemp").type("100");

    // date of treatment
    cy.get("#dateOfConsultationDatePicker").type("2023-07-01", { force: true });
    cy.pressEscape();

    // treatment category
    cy.get("#mat-select-4 > .mat-select-trigger > .mat-select-value")
      .click()
      .get("mat-option")
      .contains("Bone setter treatment")
      .click();
    cy.pressEscape();

    // diagnoais
    cy.get("#mat-select-5 > .mat-select-trigger > .mat-select-value")
      .click()
      .get("mat-option")
      .contains('Hand or Wrist (Sprain/Contusion/Laceration)')
      .click();
    cy.pressEscape();

    // receipts
    cy.get(".claim-file-upload-input").selectFile("cypress/fixtures/sample.png", { force: true });

    cy.contains("No").click();
    cy.screenshot(`${testCase021FileName}_step_1`);
    cy.contains("Next").click();

    cy.handleRcsStep2WithoutDefaultPayout(testCase021FileName);
    cy.handleRcsStep3(testCase021FileName);
    cy.handleRcsStep4(testCase021FileName);
  });
});
