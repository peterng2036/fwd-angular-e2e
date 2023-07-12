const username = "support081";
const password = "0000@Fwd";

const testCase052FileName = "052_policy_enuiry_sort_by_product_name";
const testCase053FileName = "053_policy_enuiry_sort_by_commencement_date";
const testCase054FileName = "054_policy_enuiry_filter_by_policy_status_inforce";
const testCase055FileName = "055_policy_enuiry_filter_by_policy_status_no_longer_inforce";
const testCase056FileName = "056_policy_enuiry_filter_by_next_premium_pay_start_date";
const testCase057FileName = "057_policy_enuiry_filter_by_next_premium_pay_end_date"; // to do
const testCase058FileName = "058_policy_enuiry_filter_by_next_premium_pay_start_end_date";
const testCase059FileName = "059_policy_enuiry_filter_by_invalid_person_insured";
const testCase060FileName = "060_policy_enuiry_filter_by_valid_person_insured";

describe("eService Dashboard", () => {
  beforeEach(() => {
    cy.login(username, password);

    cy.get('[routerlink="/fwd/policyEnquiryv3"]').click();

    cy.wait(4000);
  });

  it("should sort policy by product name", () => {
    cy.get("#productName > .mat-radio-label > .mat-radio-label-content").click();

    cy.get(".policy-card-container > :nth-child(1)").contains("AECONOLIFE 20").should("exist");
    cy.get(".policy-card-container > :nth-child(2)")
      .contains("Balance Refundable Hospital Income Plan")
      .should("exist");
    cy.get(".policy-card-container > :nth-child(3)").contains("CANsurance Full Medical Plan").should("exist");
    cy.get(".policy-card-container > :nth-child(4)").contains("CRISIS FIGHTER (15 PAY)").should("exist");
    cy.get(".policy-card-container > :nth-child(5)").contains("Crisis VCover - 20 year Pay").should("exist");
    cy.get(".policy-card-container > :nth-child(6)")
      .contains("Easy Defender Critical Illness Insurance Plan 20")
      .should("exist");

    cy.screenshot(testCase052FileName);
  });

  it("should sort policy by commencement date", () => {
    cy.get("#commencementDate  > .mat-radio-label > .mat-radio-label-content").click();

    // first policy card with N/A as commencement date
    cy.get(":nth-child(1) > :nth-child(3) > :nth-child(2) > .data").contains("N/A").should("exist");

    cy.get(".policy-card-container > :nth-child(13)").contains("06/07/2022").should("exist");
    cy.get(".policy-card-container > :nth-child(14)").contains("06/07/2023").should("exist");
    cy.get(".policy-card-container > :nth-child(15)").contains("31/10/2023").should("exist");
    cy.get(".policy-card-container > :nth-child(16)").contains("06/07/2024").should("exist");

    cy.screenshot(testCase053FileName);
  });

  it("should filter policy by policy status inforce", () => {
    cy.get(".mat-menu-trigger > .primary-button").click();
    cy.get(".mat-menu-content > :nth-child(1)").click();
    cy.get(":nth-child(3) > .primary-button").click();

    cy.get(".policy-card-container").should("include.text", "Inforce");
    cy.get(".policy-card-container").should("not.include.text", "No longer in force");

    cy.screenshot(`${testCase054FileName}-en`);

    cy.get("#ctilCtrlLang_zh-hant").click();

    cy.get(".policy-card-container").should("include.text", "生效中");
    cy.get(".policy-card-container").should("not.include.text", "不再生效");

    cy.screenshot(`${testCase054FileName}-zh`);
  });

  it("should filter policy by policy status no longer inforce", () => {
    cy.get(".mat-menu-trigger > .primary-button").click();
    cy.get(".mat-menu-content > :nth-child(1)").click();
    cy.get(".ng-star-inserted > .primary-button").click();
    cy.get(".mat-menu-content > :nth-child(2)").click();
    cy.get(":nth-child(3) > .primary-button").click();

    cy.get(".policy-card-container").should("include.text", "No longer in force");
    cy.get(".policy-card-container").should("not.include.text", "Inforce");

    cy.screenshot(`${testCase055FileName}-en`);

    cy.get("#ctilCtrlLang_zh-hant").click();

    cy.get(".policy-card-container").should("include.text", "不再生效");
    cy.get(".policy-card-container").should("not.include.text", "生效中");

    cy.screenshot(`${testCase055FileName}-zh`);
  });

  it("should show 6 policy after filtering policy by next premium start date", () => {
    cy.get(".mat-menu-trigger > .primary-button").click();
    cy.get(".mat-menu-content > :nth-child(2)").click();
    cy.get('[placeholder="From"]').type("2021-01-01", { force: true });
    cy.get("body").trigger("keydown", { keyCode: 27 });
    cy.get(":nth-child(3) > .primary-button").click();

    cy.get("policy-card").should("have.length", 6);

    cy.screenshot(testCase056FileName);
  });

  it("should show 5 policy after filtering policy by next premium start date and end date", () => {
    cy.get(".mat-menu-trigger > .primary-button").click();
    cy.get(".mat-menu-content > :nth-child(2)").click();
    cy.get('[placeholder="From"]').type("2021-01-01", { force: true });
    cy.get("body").trigger("keydown", { keyCode: 27 });
    cy.get('[placeholder="To"]').type("2022-01-01", { force: true });
    cy.get("body").trigger("keydown", { keyCode: 27 });
    cy.get(":nth-child(3) > .primary-button").click();

    cy.get("policy-card").should("have.length", 5);

    cy.screenshot(testCase058FileName);
  });

  it("should show 3 policy after filtering by valid person insured", () => {
    cy.get(".mat-menu-trigger > .primary-button").click();
    cy.get(".mat-menu-content > :nth-child(3)").click();
    cy.get("#mat-input-2").type("XXXXX FU WAI");
    cy.get(":nth-child(3) > .primary-button").click();

    cy.get("policy-card").should("have.length", 3);

    cy.screenshot(testCase059FileName);
  });

  it("should show no policy after filtering by invalid person insured", () => {
    cy.get(".mat-menu-trigger > .primary-button").click();
    cy.get(".mat-menu-content > :nth-child(3)").click();
    cy.get("#mat-input-2").type("invalid person insured");
    cy.get(":nth-child(3) > .primary-button").click();

    cy.get(".empty-card").should("exist");

    cy.screenshot(testCase060FileName);
  });
});
