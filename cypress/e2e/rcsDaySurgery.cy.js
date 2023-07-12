const username = "support081";
const password = "0000@Fwd";
const policyNo = "13394353";

const testCase022FileName = "022_life_claims_rcs_day_surgery_accident_with_default_payout";
const testCase023FileName = "023_life_claims_rcs_day_surgery_accident_without_default_payout";
const testCase024FileName = "024_life_claims_rcs_day_surgery_illness_with_default_payout";
const testCase025FileName = "025_life_claims_rcs_day_surgery_illness_without_default_payout";

describe("Rcs Day Surgery claim without default payout", () => {
  beforeEach(() => {
    cy.login(username, password);

    cy.get(".menu-button-container > :nth-child(1)").click(); // select file a claim

    cy.contains("Clinical/ day surgery").click();
  });

  it("should successfully submit rcs day srugery accident claim", () => {
    cy.contains("Skip").click();

    // step 1
    handleRcsDaySrugeryStep1(true);
    cy.screenshot(`${testCase023FileName}_step_1`);
    cy.contains("Next").click();

    cy.handleRcsStep2WithoutDefaultPayout(testCase023FileName);
    cy.handleRcsStep3(testCase023FileName);
    cy.handleRcsStep4(testCase023FileName);
  });

  it("should successfully submit rcs day srugery illness claim", () => {
    cy.contains("Skip").click();

    // step 1
    handleRcsDaySrugeryStep1(false);
    cy.screenshot(`${testCase025FileName}_step_1`);
    cy.contains("Next").click();

    cy.handleRcsStep2WithoutDefaultPayout(testCase025FileName);
    cy.handleRcsStep3(testCase025FileName);
    cy.handleRcsStep4(testCase025FileName);
  });
});

const handleRcsDaySrugeryStep1 = (isAccident) => {
  // policy
  cy.get(".mat-select-placeholder").click();
  cy.contains(policyNo).click();

  // benefit type
  cy.get("#benefitType").click();
  cy.contains("Day surgery").click();

  // accdident or illness
  if (isAccident) {
    cy.get("#mat-radio-5 label").click();
  } else {
    cy.get("#mat-radio-4 label").click();
  }

  // accident date or symptom date
  cy.get("#hsSymptomDate").type("2023-07-01", { force: true });
  cy.get("body").trigger("keydown", { keyCode: 27 });

  // diagnosis
  cy.get("#mat-select-4 > .mat-select-trigger > .mat-select-value")
    .click()
    .get("mat-option")
    .contains(isAccident ? "Fracture of shoulder" : "Acute bronchitis")
    .click();
  cy.get("body").trigger("keydown", { keyCode: 27 });

  // hospital or clinic
  cy.get("#mat-radio-6 label").click();

  // hospital location
  cy.get("#mat-select-5 > .mat-select-trigger > .mat-select-value")
    .click()
    .get("mat-option")
    .contains("Hong Kong")
    .click();

  // hospital name
  cy.get("#mat-select-6 > .mat-select-trigger > .mat-select-value")
    .click()
    .get("mat-option")
    .contains("Canossa Hospital (Caritas)")
    .click();

  // surgery name
  cy.get("#mat-input-4").click().get("mat-option").contains("Highly selective vagotomy").click();
  cy.get("body").trigger("keydown", { keyCode: 27 });

  // surgery date
  cy.get("#surgeryDate").click();
  cy.get(".mat-calendar-body-today").click();

  // other insurance coverage
  cy.get("#mat-radio-9 label").click();

  // receipts
  cy.get(".col-12:nth-child(2) .upload-input").selectFile("cypress/fixtures/sample.png", { force: true });

  // discharge summary
  cy.get(".col-12:nth-child(3) .upload-input").selectFile("cypress/fixtures/sample.png", { force: true });

  // part 2 of hospitalization claim form
  cy.get(".col-12:nth-child(4) .upload-input").selectFile("cypress/fixtures/sample.png", { force: true });
};
