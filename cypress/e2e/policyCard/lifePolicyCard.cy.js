const username = "support081";
const password = "0000@Fwd";

const testCase069FileName = "069_policy_value_life_annual_premium";
const testCase070FileName = "071_policy_value_life_next_premium_date_valid_date";
const testCase071FileName = "071_policy_value_life_next_premium_date_na";

describe('Life Policy Card details', () => {
    beforeEach(() => {
        cy.login(username, password);
    })

    it('069 - should show valid value as annual premium for policy', () => { 
        const policyNo = '13394353'
        
        cy.get('[routerlink="/fwd/policyEnquiryv3"]').click();

        cy.contains('policy-card', policyNo).should('include.text', 'HKD 3987.00');

        cy.contains('policy-card', policyNo).screenshot(testCase071FileName);
    })

    it('070 - should show valid date as next premium date for policy', () => {
        const policyNo = '11018657'
        
        cy.get('[routerlink="/fwd/policyEnquiryv3"]').click();

        cy.contains('policy-card', policyNo).should('include.text', '27/03/2021');

        cy.contains('policy-card', policyNo).screenshot(testCase071FileName);
    })

    it.only('071 - should show N/A as next premium date for policy', () => {
        const policyNo = '15779590'

        cy.get('[routerlink="/fwd/policyEnquiryv3"]').click();

        cy.contains('policy-card', policyNo).should('include.text', 'N/A');

        cy.contains('policy-card', policyNo).children(':nth-child(7) > :nth-child(2) > .data').screenshot(testCase071FileName);
    })

})