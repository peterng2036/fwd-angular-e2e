const username = "support081";
const password = "0000@Fwd";
const policyNo = '11018657';

const testCase007FileName = "007_policy_service_upload_document_id";
const testCase008FileName = "007_policy_service_upload_document_id";


describe("Policy service - change contact info", () => {
    beforeEach(() => {
        cy.login(username, password);
        cy.visit("/policyEnquiryv2/fromShortCut/documentUpload");
        cy.wait(2000);
        // policy card
        cy.contains(policyNo).first().click();
    });

    it("007 - should upload ID successfully", () => {
        // document type
        cy.get('#mat-select-1')
            .click()
            .get("mat-option")
            .contains("ID")
            .click();

        // role
        cy.get('#mat-select-2')
            .click()
            .get("mat-option")
            .contains("Policy Owner")
            .click();

        // purpose
        cy.get('#mat-select-3')
            .click()
            .get("mat-option")
            .contains("Return pending ID/Passport Copy")
            .click();

        // file 
        cy.get('.upload-input').selectFile("cypress/fixtures/sample.png", { force: true });

        // Next
        cy.get('button').contains('Next').click();

        // step 2
        // declare
        cy.get('.mat-checkbox-inner-container').click();

        //submit
        // Next
        cy.get('button').contains('Submit').click();

        // step 3
        // check if refrerence number eixits
        cy.get('.complete-section.ng-star-inserted > .changed-policy-container > .ng-star-inserted > .complete-info-item').should('exist')
        cy.screenshot(testCase007FileName);
    })

    it("008 - should upload Address proof successfully", () => {
        // document type
        cy.get('#mat-select-1')
            .click()
            .get("mat-option")
            .contains("Address Proof")
            .click();

        // role
        cy.get('#mat-select-2')
            .click()
            .get("mat-option")
            .contains("Policy Owner")
            .click();

        // purpose
        cy.get('#mat-select-3')
            .click()
            .get("mat-option")
            .contains("Return pending address proof")
            .click();

        // file 
        cy.get('.upload-input').selectFile("cypress/fixtures/sample.png", { force: true });

        // Next
        cy.get('button').contains('Next').click();

        // step 2
        // declare
        cy.get('.mat-checkbox-inner-container').click();

        //submit
        // Next
        cy.get('button').contains('Submit').click();

        // step 3
        // check if refrerence number eixits
        cy.get('.complete-section.ng-star-inserted > .changed-policy-container > .ng-star-inserted > .complete-info-item').should('exist')
        cy.screenshot(testCase008FileName);
    })
})