const username = '70172199'
const password = '0000@Fwd'
const policyNo = 'LS000422'

const testCase080aFileName = '080a_gi_rebranding_renewal_message_in_dashboard';
const testCase080bFileName = '080b_gi_rebranding_renewal_message_in_policy_enquiry';
const testCase082FileName = '082_gi_rebranding_renewal_message_in_e_health_card';
const testCase083FileName = '083_gi_rebranding_renewal_message_in_clinic_search';

// Account: 70135884
//  Policy: LM000133 02, LS000339 02
// Account: 70172199
//  Policy: LS000422 01
// Account: u35092617
//  Policy: GM000358 01


describe('GI Rebranding - show renewal message modal', () => {
    beforeEach(() => {
        cy.login(username, password);
    })

    it('080a - should show renewal message in dashboard', () => {
        cy.get('.policy-card-container').contains(policyNo).click();

        cy.get('.content-container').should('contain', 'Renewal in progress');

        cy.screenshot(testCase080aFileName);
    })

    it('080b - should show renewal message in policy enquiry', () => {
        cy.get('[routerlink="/fwd/policyEnquiryv3"]').click();

        cy.get('.policy-card-container').contains(policyNo).click();

        cy.get('.content-container').should('contain', 'Renewal in progress');

        cy.screenshot(testCase080bFileName);
    })


    it('082 - should show renewal message in eHealth card for EB policy', () => {
        cy.get('[routerlink="/fwd/hospitalAndClinicSearch"]').click();

        cy.get('claim-policy-card').contains(policyNo).click();

        cy.get('.content-container').should('contain', 'Renewal in progress');

        cy.screenshot(testCase082FileName);
    })

    it('083 - should show renewal message in clinic search for EB policy', () => {
        cy.get('[routerlink="/fwd/hospitalAndClinicSearch"]').click();

        cy.get('claim-policy-card').contains(policyNo).click();

        cy.get('.content-container').should('contain', 'Renewal in progress');

        cy.screenshot(testCase083FileName);
    })


})