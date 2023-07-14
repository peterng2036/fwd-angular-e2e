const username = "support081";
const password = "0000@Fwd";
const policyNo = 'LM000197'

const testCase072aFileName = "072a_policy_value_eb_policy_display_status_name_type_dashboard";
const testCase072bFileName = "072b_policy_value_eb_policy_display_status_name_type_policy_enquiry";
const testCase073aFileName = "073a_policy_value_eb_policy_not_display_1970_effective_date_dashboard";
const testCase073bFileName = "073b_policy_value_eb_policy_not_display_1970_effective_date_policy_enquiry";
const testCase074aFileName = "074a_policy_value_eb_policy_not_display_1970_expiry_date_dashboard";
const testCase074bFileName = "074b_policy_value_eb_policy_not_display_1970_expiry_date_policy_enquiry";
const testCase075FileName = "075_policy_value_eb_policy_not_display_detail";

describe('EB Policy Card details', () => {
    beforeEach(() => {
        cy.login(username, password);
    })

    it('072 - should show EB policy status, name and type', () => {
        const checkPolicyCard = (policyCardAlias, filename) => {
            cy.get(`@${policyCardAlias}`).should('include.text', 'Inforce');
            cy.get(`@${policyCardAlias}`).should('include.text', 'Employee benefits');
            cy.get(`@${policyCardAlias}`).should('include.text', 'Group Medical Insurance Plan');
            cy.get(`@${policyCardAlias}`).screenshot(filename);
        }

        cy.contains('policy-card', policyNo).as('dashboardPolicyCard');
        checkPolicyCard('dashboardPolicyCard', testCase072aFileName);

        cy.get('[routerlink="/fwd/policyEnquiryv3"]').click();

        cy.contains('policy-card', policyNo).as('policyEnquiryPolicyCard');
        checkPolicyCard('policyEnquiryPolicyCard', testCase072bFileName);
    })

    it('073 - should not show 1970 year as effective date', () => {
        const checkPolicyCard = (policyCardAlias, filename) => {
            cy.get(`@${policyCardAlias}`).should('not.include.text', '1970');
            cy.get(`@${policyCardAlias}`).get(':nth-child(1) > .data').should('include.text', '01/11/2022');
            cy.get(`@${policyCardAlias}`).screenshot(filename);
        }
        cy.contains('policy-card', policyNo).as('dashboardPolicyCard');
        checkPolicyCard('dashboardPolicyCard', testCase073aFileName);

        cy.get('[routerlink="/fwd/policyEnquiryv3"]').click();

        cy.contains('policy-card', policyNo).as('policyEnquiryPolicyCard');
        checkPolicyCard('dashboardPolicyCard', testCase073bFileName);
    })

    it('074 - should not show 1970 year as expiry date', () => {
        const checkPolicyCard = (policyCardAlias, filename) => {
            cy.get(`@${policyCardAlias}`).should('not.include.text', '1970');
            cy.get(`@${policyCardAlias}`).get(':nth-child(2) > .data').should('include.text', '31/10/2023');
            cy.get(`@${policyCardAlias}`).screenshot(filename);
        }

        cy.contains('policy-card', policyNo).as('dashboardPolicyCard');
        checkPolicyCard('dashboardPolicyCard', testCase074aFileName);

        cy.get('[routerlink="/fwd/policyEnquiryv3"]').click();

        cy.contains('policy-card', policyNo).as('policyEnquiryPolicyCard');
        checkPolicyCard('dashboardPolicyCard', testCase074bFileName);
    })

    it('075 - should not show detail section in policy card for EB policy', () => {
        cy.contains('policy-card', policyNo).as('policyCard');

        // detail field label
        cy.get('@policyCard').should('not.include.text', 'Insured name');
        cy.get('@policyCard').should('not.include.text', 'Sum assured');
        cy.get('@policyCard').should('not.include.text', 'Paper-free communication');
        cy.get('@policyCard').should('not.include.text', 'Annual premium');
        cy.get('@policyCard').should('not.include.text', 'Next premium due date');

        cy.get('@policyCard').screenshot(testCase075FileName);
    })
})