const username = "support081";
const password = "0000@Fwd";
const policyNo = '11018657';

const testCase009FileName = "009_policy_service_default_payout";


describe("Policy service - change contact info", () => {
    beforeEach(() => {
        cy.login(username, password);
        cy.visit("/eligibleClaimPolicyList/eligibleClaimPolicyList/defaultPayoutMethod");
        // policy card
        cy.contains(policyNo).first().click();
    });

    it("009 - should update default payout successfully", () => {

        // edit checkbox
        cy.get('.mat-checkbox-label').click();

        // fps
        cy.get('#mat-radio-2 label').click();

        // email radio
        cy.get('#mat-radio-6').click();

        // email
        cy.get('#mat-input-0').type('test@test.com');

        // next
        cy.get('button').contains('Next').click();

        // ok
        cy.get('button').contains('OK').click();




    })
})