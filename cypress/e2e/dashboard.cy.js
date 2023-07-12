const username = "support081";
const optInusername = "support082";
const password = "0000@Fwd";
const poName = "XXXXX FU WAI";

const testCase041FileName = "041_dashboard_show_po_name";
const testCase042FileName = "042_dashboard_language_change_to_chinese";
const testCase043FileName = "043_dashboard_show_ehealth_card_menu_button";
const testCase044FileName = "044_dashboard_show_clinic_search_menu_button";
const testCase045FileName = "045_dashboard_show_basic_menu_button";
const testCase046FileName = "046_dashboard_show_life_insurance_in_file_a_claim";
const testCase047FileName = "047_dashboard_show_groud_medic_in_file_a_claim";
const testCase048FileName = "048_dashboard_show_opt_in_file_a_claim";
const testCase049FileName = "049_dashboard_show_eacknowledge_header";
const testCase050FileName = "050_dashboard_show_notification_message";
const testCase051FileName = "051_dashboard_show_claim_tracker";

describe("eService Dashboard", () => {
  beforeEach(() => {
    cy.login(username, password);
  });

  it("should show PO name in the dashboard", () => {
    cy.get(".greeting-content > h2").should("contain.text", poName);
    cy.screenshot(testCase041FileName);
  });

  it("should change the language from english to chinese", () => {
    cy.get(".page-container > fwd-header > .header > .language-swtich-container > #ctilCtrlLang_zh-hant").click();

    cy.contains("我們今天能為您提供什麼幫助？").should("exist");
    cy.contains("提交索償").should("exist");
    cy.contains("我的保單").should("exist");
    cy.contains("查看更多").should("exist");
    cy.contains("通知").should("exist");
    cy.contains("我的索償").should("exist");

    cy.screenshot(testCase042FileName);
  });

  it("should show eHealth card menu button", () => {
    cy.get('[routerlink="/fwd/eligibleClaimPolicyList/eligibleClaimPolicyList/ehealthcare-card"]').should("exist");
    cy.screenshot(testCase043FileName);
  });

  it("should show clinic search menu button", () => {
    cy.get('[routerlink="/fwd/hospitalAndClinicSearch"]').should("exist");
    cy.screenshot(testCase044FileName);
  });

  it("should show basic menu button", () => {
    cy.get(".menu-button-container").contains("File a claim").should("exist");
    cy.get(".menu-button-container").contains("Update policy information").should("exist");
    cy.get('[routerlink="/fwd/ecorrespondence/life"]').should("exist");

    cy.screenshot(testCase045FileName);
  });

  it("should show life insurance claim type list in file a claim modal", () => {
    cy.get(".menu-button-container > :nth-child(1)").click();

    cy.get(".page-container > .modal > .content").contains("Life insurance").should("exist");
    cy.get(".page-container > .modal > .content").contains("Hospitalization").should("exist");
    cy.get(".page-container > .modal > .content").contains("Personal accident").should("exist");
    cy.get(".page-container > .modal > .content").contains("Clinical/ day surgery").should("exist");
    cy.get(".page-container > .modal > .content").contains("Emergency outpatient").should("exist");
    cy.get(".page-container > .modal > .content").contains("Hospitalization follow-up").should("exist");

    cy.screenshot(testCase046FileName);
  });

  it("should show group medic claim type list in file a claim modal", () => {
    cy.get(".menu-button-container > :nth-child(1)").click();

    cy.get('[routerlink="/fwd/eligibleClaimPolicyList/eligibleClaimPolicyList/hospitalization"]').should("exist");
    cy.get('[routerlink="/fwd/eligibleClaimPolicyList/eligibleClaimPolicyList/dental"]').should("exist");

    cy.screenshot(testCase047FileName);
  });

  it("should show notification message", () => {
    cy.get("notifications").should("exist");

    cy.screenshot(testCase050FileName);
  });

  it("should show claim tracker", () => {
    cy.get(".claim-card-container").should("exist");

    cy.screenshot(testCase051FileName);
  });
});

describe("eService Dashboard - Opt In", () => {
  beforeEach(() => {
    cy.login(optInusername, password);
  });

  it("should show opt in menu button in update policy information modal", () => {
    cy.contains("Update policy information").click();

    cy.get('[routerlink="/fwd/optInOptOut"]').should("exist");

    cy.screenshot(testCase048FileName);
  });
});
