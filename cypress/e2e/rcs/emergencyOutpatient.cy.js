const username = "support081";
const password = "0000@Fwd";
const policyNo = "13394353";

const testCase026FileName = "026_life_claims_rcs_emergency_out_patient_hospital_with_default_payout";
const testCase027FileName = "027_life_claims_rcs_emergency_out_patient_clinic_with_default_payout";
const testCase028FileName = "028_life_claims_rcs_emergency_out_patient_hospital_without_default_payout";
const testCase029FileName = "029_life_claims_rcs_emergency_out_patient_clinic_without_default_payout";

describe("Rcs Emergency Outpatient claim without default payout", () => {
  beforeEach(() => {
    cy.login(username, password);

    cy.get(".menu-button-container > :nth-child(1)").click(); // select file a claim

    cy.contains("Clinical/ day surgery").click();
  });

  it("should successfully submit rcs emergency outpatient hospital claim", () => {
    cy.contains("Skip").click();

    // step 1
    handleRcsDaySrugeryStep1(true);
    cy.screenshot(`${testCase028FileName}_step_1`);
    cy.contains("Next").click();

    cy.handleRcsStep2WithoutDefaultPayout(testCase028FileName);
    cy.handleRcsStep3(testCase028FileName);
    cy.handleRcsStep4(testCase028FileName);
  });

  it("should successfully submit rcs emergency outpatient clinic claim", () => {
    cy.contains("Skip").click();

    // step 1
    handleRcsDaySrugeryStep1(false);
    cy.screenshot(`${testCase029FileName}_step_1`);
    cy.contains("Next").click();

    cy.handleRcsStep2WithoutDefaultPayout(testCase029FileName);
    cy.handleRcsStep3(testCase029FileName);
    cy.handleRcsStep4(testCase029FileName);
  });
});

const handleRcsDaySrugeryStep1 = (isHospital) => {
  // policy
  cy.get(".mat-select-placeholder").click();
  cy.contains(policyNo).click();

  // benefit type
  cy.get("#benefitType").click();
  cy.contains("Emergency outpatient").click();

  // date of accident
  cy.get("#mat-input-3").type("2023-07-01", { force: true });
  cy.pressEscape();

  // diagnosis
  cy.get("#mat-select-3 > .mat-select-trigger > .mat-select-value")
    .click()
    .get("mat-option")
    .contains('Hand or Wrist (Sprain/Contusion/Laceration)')
    .click();
  cy.pressEscape();

  // date of treatment
  cy.get("#mat-input-4").type("2023-07-01", { force: true });
  cy.pressEscape();

  if (isHospital) {
    cy.get("#mat-radio-3 label").click();
  } else {
    cy.get("#mat-radio-4 label").click();
  }

  // location
  cy.get("#mat-select-6 > .mat-select-trigger > .mat-select-value")
    .click()
    .get("mat-option")
    .contains("Hong Kong")
    .click();

  if (isHospital) {
    // hospital name
    cy.get("#mat-select-7 > .mat-select-trigger > .mat-select-value")
      .click()
      .get("mat-option")
      .contains("Canossa Hospital (Caritas)")
      .click();
  } else {
    cy.get("#mat-input-6").type("testing clinic name");
  }

  // treatment category
  cy.get(":nth-child(4) > .col-12 > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix")
    .click()
    .get("mat-option")
    .contains("Western consultation")
    .click();

  // consultation fee
  if (isHospital) {
    cy.get("#mat-input-6").type("100");
  } else {
    cy.get("#mat-input-7").type("100");
  }

  // receipts
  cy.get(".upload-input").selectFile("cypress/fixtures/sample.png", { force: true });

  // other insurance coverage
  cy.get("#mat-radio-6 label").click();
};
