const username = "hvs6028";
const password = "0000@Fwd";
const policyNo = '500022258'

const testCase076FileName = "076_policy_value_gi_policy_display_status_name_type";
const testCase077FileName = "077_policy_value_gi_policy_not_display_1970_effective_date";
const testCase078FileName = "078_policy_value_gi_policy_not_display_1970_expiry_date";
const testCase079FileName = "079_policy_value_gi_policy_not_display_detail";

describe('GI Policy Card details', () => {
    beforeEach(() => {
        cy.login(username, password);

        cy.get('[routerlink="/fwd/policyEnquiryv3"]').click();
    })

    it('076 - should show GI policy status, name and type', () => {
        cy.contains('policy-card', policyNo).as('policyCard');

        cy.get('@policyCard').should('include.text', 'Inforce');
        cy.get('@policyCard').should('include.text', 'General');
        cy.get('@policyCard').should('include.text', 'CARING Family Medical');

        cy.screenshot(testCase076FileName);
    })

    it('077 - should not show 1970 year as expiry date', () => {
        cy.contains('policy-card', policyNo).as('policyCard');

        cy.get('@policyCard').should('not.include.text', '1970');

        cy.screenshot(testCase077FileName);
    })

    it('078 - should not show 1970 year as expiry date', () => {
        cy.contains('policy-card', policyNo).as('policyCard');

        cy.get('@policyCard').should('not.include.text', '1970');

        cy.screenshot(testCase078FileName);
    })

    it('079 - should not show detail section in policy card for GI policy', () => {
        cy.contains('policy-card', policyNo).as('policyCard');

        // detail field label
        cy.get('@policyCard').should('not.include.text', 'Insured name');
        cy.get('@policyCard').should('not.include.text', 'Sum assured');
        cy.get('@policyCard').should('not.include.text', 'Paper-free communication');
        cy.get('@policyCard').should('not.include.text', 'Annual premium');
        cy.get('@policyCard').should('not.include.text', 'Next premium due date');

        cy.screenshot(testCase079FileName);
    })
})