const username = 'support081'
const password = '0000@Fwd'
const policyNo = 'LM000197'

const testCase081aFileName = '081a_not_show_gi_rebranding_renewal_message_in_dashboard';
const testCase081bFileName = '081b_not_show_gi_rebranding_renewal_message_in_policy_enquiry';

describe('GI Rebranding - not showing gi rebranding renewal message', () => {
    beforeEach(() => {
        cy.login(username, password);
    })

    it('080a - should not show renewal message in dashboard', () => {
        cy.get('.policy-card-container').contains(policyNo).click();

        // should not show modal
        cy.get('.content-container').should('not.exist');

        // should redirect to policy detail page
        cy.location('pathname').should('include', `policyEnquiry/EB/detail/${policyNo}`)

        cy.screenshot(testCase081aFileName);
    })

    it('080b - should show renewal message in policy enquiry', () => {
        cy.get('[routerlink="/fwd/policyEnquiryv3"]').click();

        cy.get('.policy-card-container').contains(policyNo).click();

        // should not show modal
        cy.get('.content-container').should('not.exist');
        
        // should redirect to policy detail page
        cy.location('pathname').should('include', `policyEnquiry/EB/detail/${policyNo}`)

        cy.screenshot(testCase081bFileName);
    })
})