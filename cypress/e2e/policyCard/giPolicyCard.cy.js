const username = "hvs6028";
const password = "0000@Fwd";
const policyNo = '500022258'

const testCase076aFileName = "076a_policy_value_gi_policy_display_status_name_type_dashobard";
const testCase076bFileName = "076b_policy_value_gi_policy_display_status_name_type_policy_enquiry";
const testCase077aFileName = "077a_policy_value_gi_policy_not_display_1970_effective_date_dashboard";
const testCase077bFileName = "077b_policy_value_gi_policy_not_display_1970_effective_date_policy_enquiry";
const testCase078aFileName = "078a_policy_value_gi_policy_not_display_1970_expiry_date_dashboard";
const testCase078bFileName = "078b_policy_value_gi_policy_not_display_1970_expiry_date_policy_enquiry";
const testCase079FileName = "079_policy_value_gi_policy_not_display_detail";

describe('GI Policy Card details', () => {
    beforeEach(() => {
        cy.login(username, password);
    })

    it('076 - should show GI policy status, name and type', () => {
        const checkPolicyCard = (policyCardAlias, filename) => {
            cy.get(`@${policyCardAlias}`).should('include.text', 'Inforce');
            cy.get(`@${policyCardAlias}`).should('include.text', 'General');
            cy.get(`@${policyCardAlias}`).should('include.text', 'CARING Family Medical');
            cy.get(`@${policyCardAlias}`).screenshot(filename);
        }

        cy.contains('policy-card', policyNo).as('dashboardPolicyCard');
        checkPolicyCard('dashboardPolicyCard', testCase076aFileName)

        cy.get('[routerlink="/fwd/policyEnquiryv3"]').click();

        cy.contains('policy-card', policyNo).as('policyEnquiryPolicyCard');
        checkPolicyCard('policyEnquiryPolicyCard', testCase076bFileName)
    })

    it('077 - should not show 1970 year as effective date', () => {
        const checkPolicyCard = (policyCardAlias, filename) => {
            cy.get(`@${policyCardAlias}`).should('not.include.text', '1970');
            cy.get(`@${policyCardAlias}`).get(':nth-child(1) > .data').should('include.text', '01/05/2023');
            cy.get(`@${policyCardAlias}`).screenshot(filename);
        }

        cy.contains('policy-card', policyNo).as('dashboardPolicyCard');
        checkPolicyCard('dashboardPolicyCard', testCase077aFileName)

        cy.get('[routerlink="/fwd/policyEnquiryv3"]').click();

        cy.contains('policy-card', policyNo).as('policyEnquiryPolicyCard');
        checkPolicyCard('policyEnquiryPolicyCard', testCase077bFileName)
    })

    it('078 - should not show 1970 year as expiry date', () => {
        const checkPolicyCard = (policyCardAlias, filename) => {
            cy.get(`@${policyCardAlias}`).should('not.include.text', '1970');
            cy.get(`@${policyCardAlias}`).get(':nth-child(2) > .data').should('include.text', '30/04/2024');
            cy.get(`@${policyCardAlias}`).screenshot(filename);
        }

        cy.contains('policy-card', policyNo).as('dashboardPolicyCard');
        checkPolicyCard('dashboardPolicyCard', testCase078aFileName)

        cy.get('[routerlink="/fwd/policyEnquiryv3"]').click();

        cy.contains('policy-card', policyNo).as('policyEnquiryPolicyCard');
        checkPolicyCard('policyEnquiryPolicyCard', testCase078bFileName)
    })

    it('079 - should not show detail section in policy card for GI policy', () => {
        cy.contains('policy-card', policyNo).as('policyCard');

        // detail field label
        cy.get('@policyCard').should('not.include.text', 'Insured name');
        cy.get('@policyCard').should('not.include.text', 'Sum assured');
        cy.get('@policyCard').should('not.include.text', 'Paper-free communication');
        cy.get('@policyCard').should('not.include.text', 'Annual premium');
        cy.get('@policyCard').should('not.include.text', 'Next premium due date');

        cy.get('@policyCard').screenshot(testCase079FileName);
    })
})