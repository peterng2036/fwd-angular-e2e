const username = "support081";
const password = "0000@Fwd";
const policyNo = "13394353";

const testCase030FileName = "030_life_claims_rcs_hospital_accident";
const testCase031FileName = "031_life_claims_rcs_hospital_illness";

describe("Rcs Hospitalization claim", () => {
  beforeEach(() => {
    cy.login(username, password);

    cy.get(".menu-button-container > :nth-child(1)").click(); // select file a claim

    cy.contains("Hospitalization").click();
  });

  it("should successfully submit rcs hospital accident claim", () => {
    // step 1
    cy.contains("Skip").click();
    handleRcsHospitalizationStep1(true);
    cy.screenshot(`${testCase030FileName}_step_1`);
    cy.contains("Next").click();

    cy.handleRcsStep2WithoutDefaultPayout(testCase030FileName);
    cy.handleRcsStep3(testCase030FileName);
    cy.handleRcsStep4(testCase030FileName);
  });

  it("should successfully submit rcs hospital illness claim", () => {
    // step 1
    cy.contains("Skip").click();
    handleRcsHospitalizationStep1(false);
    cy.screenshot(`${testCase031FileName}_step_1`);
    cy.contains("Next").click();

    cy.handleRcsStep2WithoutDefaultPayout(testCase031FileName);
    cy.handleRcsStep3(testCase031FileName);
    cy.handleRcsStep4(testCase031FileName);
  });
});

const handleRcsHospitalizationStep1 = (isAccident) => {
  // policy
  cy.get(".mat-select-placeholder").click();
  cy.contains(policyNo).click();

  // benefit type
  cy.get("#benefitType").click();
  cy.contains("Hospitalization").click();

  // date of admission
  cy.get("#hsAdmissionDate").type("2023-07-01", { force: true });
  cy.get("body").trigger("keydown", { keyCode: 27 });

  // date of discharge
  cy.get("#hsDischargeDate").type("2023-07-01", { force: true });
  cy.get("body").trigger("keydown", { keyCode: 27 });

  // illness or accident
  if (isAccident) {
    cy.get("#mat-radio-6 > .mat-radio-label").click();
    cy.get("#mat-radio-6 > .mat-radio-label > .mat-radio-label-content").click();
  } else {
    cy.get("#mat-radio-5 > .mat-radio-label").click();
    cy.get("#mat-radio-5 > .mat-radio-label > .mat-radio-label-content").click();
  }

  // first symptom date or accident date
  cy.get("#hsSymptomDate").type("2023-07-01", { force: true });
  cy.get("body").trigger("keydown", { keyCode: 27 });

  // diagnoais
  cy.get("#mat-select-5 > .mat-select-trigger > .mat-select-value").click();
  cy.get(".mat-select-panel mat-option:first-child").click();
  cy.get("body").trigger("keydown", { keyCode: 27 });

  // hospital location
  cy.get("#mat-select-3 > .mat-select-trigger > .mat-select-value").click();
  cy.get(".mat-select-panel mat-option:first-child").click();

  //hospital name
  cy.get("#mat-select-6 > .mat-select-trigger > .mat-select-value").click();
  cy.get(".mat-select-panel mat-option:first-child").click();

  // other insurance coverage
  cy.get("#mat-radio-9 > .mat-radio-label > .mat-radio-label-content").click();

  // general ward
  cy.get("#mat-checkbox-3 > .mat-checkbox-layout > .mat-checkbox-label > .checkbox-label").click();

  // total days
  cy.get("#mat-input-6").type("1");

  // total cost
  cy.get("#mat-input-7").type("100");

  // other insurance coverage
  cy.get("#mat-radio-4 > .mat-radio-label > .mat-radio-label-content").click();

  // receipts
  cy.get(".col-12:nth-child(2) .upload-input").selectFile("cypress/fixtures/sample.png", { force: true });

  // part 2 of hospitalization claim form
  cy.get(".col-12:nth-child(4) .upload-input").selectFile("cypress/fixtures/sample.png", { force: true });
};
