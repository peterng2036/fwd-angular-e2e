const username = "support081";
const password = "0000@Fwd";
const policyNo = "13394353";

const testCase032FileName = "032_life_claims_rcs_pre_post_consultation_accident";
const testCase033FileName = "032_life_claims_rcs_pre_post_consultation_illness";

describe("Rcs Pre-post consultation claim", () => {
  beforeEach(() => {
    cy.login(username, password);

    cy.get(".menu-button-container > :nth-child(1)").click(); // select file a claim

    cy.contains("Hospitalization").click();
  });

  it("032 - should successfully submit rcs pre post consultation accident claim", () => {
    // step 1
    cy.contains("Skip").click();
    handlePrePostConsultationStep1(true);
    cy.screenshot(`${testCase032FileName}_step_1`);
    cy.contains("Next").click();

    cy.handleRcsStep2WithoutDefaultPayout(testCase032FileName);
    cy.handleRcsStep3(testCase032FileName);
    cy.handleRcsStep4(testCase032FileName);
  });

  it("033 - should successfully submit rcs pre post consultation illness claim", () => {
    // step 1
    cy.contains("Skip").click();
    handlePrePostConsultationStep1(false);
    cy.screenshot(`${testCase033FileName}_step_1`);
    cy.contains("Next").click();

    cy.handleRcsStep2WithoutDefaultPayout(testCase033FileName);
    cy.handleRcsStep3(testCase033FileName);
    cy.handleRcsStep4(testCase033FileName);
  });
});

const handlePrePostConsultationStep1 = (isAccident) => {
  // policy
  cy.get(".mat-select-placeholder").click();
  cy.contains(policyNo).click();

  // benefit type
  cy.get("#benefitType").click();
  cy.contains("Pre-consultation").click(); // select benefit type

  // date of admission
  cy.get("#mat-input-3").type("2023-07-01", { force: true });
  cy.pressEscape();

  // date of discharge
  cy.get("#mat-input-4").type("2023-07-01", { force: true });
  cy.pressEscape();

  // illness or accident
  if (isAccident) {
    cy.get("#mat-radio-3 label").click();

    // accident date
    cy.get("#mat-input-5").type("2023-07-01", { force: true });
    cy.pressEscape();
  } else {
    cy.get("#mat-radio-2 label").click();

    // first symptom date
    cy.get("#mat-input-8").type("2023-07-01", { force: true });
    cy.pressEscape();
  }

  // diagnosis
  cy.get("#mat-select-5 > .mat-select-trigger > .mat-select-value")
    .click()
    .get("mat-option")
    .contains(isAccident ? "Fracture of shoulder" : "Acute bronchitis")
    .click();
  cy.pressEscape();

  // date of treatment
  cy.get("#mat-input-6").type("2023-07-01", { force: true });
  cy.pressEscape();

  // hospital
  cy.get("#mat-radio-6 label").click();

  // hospital location
  cy.get("#mat-select-6 > .mat-select-trigger > .mat-select-value")
    .click()
    .get("mat-option")
    .contains("Hong Kong")
    .click();

  // hospital name
  cy.get("#mat-select-7 > .mat-select-trigger > .mat-select-value")
    .click()
    .get("mat-option")
    .contains("Canossa Hospital (Caritas)")
    .click();

  // treatment category
  cy.get("#mat-select-4 > .mat-select-trigger > .mat-select-value")
    .click()
    .get("mat-option")
    .contains("Western consultation")
    .click();

  // total cost
  if (isAccident) {
    cy.get("#mat-input-8").type("100");
  } else {
    cy.get("#mat-input-9").type("100");
  }

  // receipts
  cy.get(".upload-input").selectFile("cypress/fixtures/sample.png", { force: true });

  // no other insurance coverage
  cy.get("#mat-radio-9").click();
};
