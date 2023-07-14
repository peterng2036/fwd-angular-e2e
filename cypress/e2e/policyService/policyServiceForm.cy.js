const username = "support081";
const password = "0000@Fwd";
const policyNo = '11018657';

const testCase010FileName = "010_policy_service_update_form_withdrawal_policy_value";
const testCase011FileName = "011_policy_service_update_form_holidy";
const testCase012FileName = "012_policy_service_update_form_policy_maturity";
const testCase013FileName = "013_policy_service_update_form_duplicate_policy";

describe("Policy Service Update Form", () => {
    beforeEach(() => {
        cy.login(username, password);
        cy.visit("/web11/fwd/policyEnquiryv2/fromShortCut/ePOSForm");
        // policy card
        cy.contains(policyNo).first().click();
    });

    it('010 - should update policy service form withdrawal policy value successfully', () => {
        // withdrawal of policy value
        cy.get('#mat-checkbox-1 label').click();

        cy.screenshot(`${testCase010FileName}_step_1`)

        // next
        cy.get('button').contains('Next').click();

        // cash coupon
        cy.get('#mat-checkbox-5 label').click();

        // withdrawal amount
        cy.get('#mat-input-1').type('10');

        // payment instruction
        cy.get('#mat-checkbox-12 label').click();

        // fps
        cy.get('#mat-radio-5 label').click();

        // email address radiio
        cy.get('#mat-radio-11 label').click();

        // email address
        cy.get('.form-control').type('test@teset.com');

        // file upload
        cy.get('[type="file"]').selectFile("cypress/fixtures/sample.png", { force: true });

        cy.screenshot(`${testCase010FileName}_step_2`)

        // next
        cy.get('button').contains('Next').click();

        cy.screenshot(`${testCase010FileName}_step_3`)

        // next
        cy.get('button').contains('Next').click();

        cy.screenshot(`${testCase010FileName}_step_4`)

        // next
        cy.get('button').contains('Next').click();
        // next
        cy.get('button').contains('Next').click();
        // next
        cy.get('button').contains('Next').click();
        // next
        cy.get('button').contains('Next').click();
        // submit
        cy.get('button').contains('Submit').click();

        cy.get('.complete-section.ng-star-inserted > .changed-policy-container > .ng-star-inserted > .complete-info-item').should('exist');

        cy.screenshot(`${testCase010FileName}_step_5`)
    })


    it('011 - should update policy service form holiday successfully', () => {
        // policy holiday / premium holiday
        cy.get('#mat-checkbox-2 label').click();

        cy.screenshot(`${testCase011FileName}_step_1`)

        // next
        cy.get('button').contains('Next').click();

        // apply
        cy.get('#mat-radio-5 label').click();

        cy.screenshot(`${testCase011FileName}_step_2`)

        // next
        cy.get('button').contains('Next').click();

        cy.screenshot(`${testCase011FileName}_step_3`)

        // next
        cy.get('button').contains('Next').click();

        // next
        cy.get('button').contains('Next').click();
        // next
        cy.get('button').contains('Next').click();
        // next
        cy.get('button').contains('Next').click();
        // submit
        cy.get('button').contains('Submit').click();

        cy.get('.complete-section.ng-star-inserted > .changed-policy-container > .ng-star-inserted > .complete-info-item').should('exist');

        cy.screenshot(`${testCase011FileName}_step_5`)
    })

    it.only('012 - should update policy service form policy maturity successfully', () => {
        // policy maturity
        cy.get('#mat-checkbox-3 label').click();

        cy.screenshot(`${testCase012FileName}_step_1`)

        // next
        cy.get('button').contains('Next').click();

        // fps
        cy.get('#mat-radio-6 label').click();

        // email radio
        cy.get('#mat-radio-11 label').click();

        // email
        cy.get('#mat-input-1').type('test@test.com');

        // file upload
        cy.get('[type="file"]').selectFile("cypress/fixtures/sample.png", { force: true });

        cy.screenshot(`${testCase012FileName}_step_2`)

        // next
        cy.get('button').contains('Next').click();

        cy.screenshot(`${testCase012FileName}_step_3`)

        // next
        cy.get('button').contains('Next').click();

        // next
        cy.get('button').contains('Next').click();
        // next
        cy.get('button').contains('Next').click();
        // next
        cy.get('button').contains('Next').click();
        // submit
        cy.get('button').contains('Submit').click();

        cy.get('.complete-section.ng-star-inserted > .changed-policy-container > .ng-star-inserted > .complete-info-item').should('exist');

        cy.screenshot(`${testCase012FileName}_step_5`)
    })
})