const username = "support081";
const password = "0000@Fwd";
const policyNo = '11018657'


const testCase001FileName = "001_policy_service_change_address";
const testCase002FileName = "002_policy_service_change_address_and_email";
const testCase003FileName = "002_policy_service_change_email";
const testCase004FileName = "001_policy_service_change_address_with_CRS";
const testCase005FileName = "005_policy_service_change_address_with_facta";
const testCase006FileName = "006_policy_service_change_address_with_crs_facta";


describe("Policy service - change contact info", () => {
    beforeEach(() => {
        cy.login(username, password);
        cy.visit("/web11/fwd/policyEnquiryv2/fromShortCut/contact");
        cy.wait(2000);
    });

    it("001 - should successfully change address", () => {
        // policy card
        cy.contains(policyNo).first().click();

        handleChangeAdress();
        cy.screenshot(`${testCase001FileName}_step_1`)
        // Next
        cy.contains('Next').click();

        /// step 2
        cy.screenshot(`${testCase001FileName}_step_2`)

        // Next
        cy.contains('Next').click();

        // step 3
        // FATCA No
        cy.get('#mat-radio-8 > .mat-radio-label').click();
        cy.screenshot(`${testCase001FileName}_step_3`)
        // Next
        cy.contains('Next').click();

        // step 4
        // Automatic Exchange financial account info
        cy.get('#mat-radio-11 > .mat-radio-label').click();
        cy.screenshot(`${testCase001FileName}_step_4`)
        // Next
        cy.contains('Next').click();

        // step 5
        // i agreee
        cy.get('#mat-radio-13 > .mat-radio-label').click();
        cy.screenshot(`${testCase001FileName}_step_5`)
        // Next
        cy.contains('Submit').click();
    })

    it("002 - should successfully change address and email", () => {
        // policy card
        cy.contains(policyNo).first().click();
        handleChangeAdress();
        handleChangeEmail();
        cy.screenshot(`${testCase002FileName}_step_1`)
        // Next
        cy.contains('Next').click();

        /// step 2
        cy.screenshot(`${testCase002FileName}_step_2`)

        // Next
        cy.contains('Next').click();

        // step 3
        // FATCA No
        cy.get('#mat-radio-8 > .mat-radio-label').click();
        cy.screenshot(`${testCase002FileName}_step_3`)
        // Next
        cy.contains('Next').click();

        // step 4
        // Automatic Exchange financial account info
        cy.get('#mat-radio-11 > .mat-radio-label').click();
        cy.screenshot(`${testCase002FileName}_step_4`)
        // Next
        cy.contains('Next').click();

        // step 5
        // i agreee
        cy.get('#mat-radio-13 > .mat-radio-label').click();
        cy.screenshot(`${testCase002FileName}_step_5`)
        // Next
        cy.contains('Submit').click();
    })

    it("003 - should successfully change email", () => {
        // policy card
        cy.contains(policyNo).first().click();

        handleChangeEmail();

        cy.screenshot(`${testCase002FileName}_step_1`)
        // Next
        cy.contains('Next').click();

        /// step 2
        cy.screenshot(`${testCase002FileName}_step_2`)

        // Next
        cy.contains('Next').click();

        // step 3
        // FATCA No
        cy.get('#mat-radio-8 > .mat-radio-label').click();
        cy.screenshot(`${testCase002FileName}_step_3`)
        // Next
        cy.contains('Next').click();

        // step 4
        // Automatic Exchange financial account info
        cy.get('#mat-radio-11 > .mat-radio-label').click();
        cy.screenshot(`${testCase002FileName}_step_4`)
        // Next
        cy.contains('Next').click();

        // step 5
        // i agreee
        cy.get('#mat-radio-13 > .mat-radio-label').click();
        cy.screenshot(`${testCase002FileName}_step_5`)
        // Next
        cy.contains('Submit').click();
    })

    it("004 - should successfully change address with CRS", () => {
        // policy card
        cy.contains(policyNo).first().click();

        handleChangeAdress();
        cy.screenshot(`${testCase004FileName}_step_1`)
        // Next
        cy.contains('Next').click();

        /// step 2
        cy.screenshot(`${testCase004FileName}_step_2`)

        // Next
        cy.contains('Next').click();

        // step 3
        // FATCA No
        cy.get('#mat-radio-8 > .mat-radio-label').click();
        cy.screenshot(`${testCase004FileName}_step_3`)
        // Next
        cy.contains('Next').click();

        // step 4
        // CRS Yes
        cy.get('#mat-radio-10 > .mat-radio-label').click();
        cy.screenshot(`${testCase004FileName}_step_4`)
        // Next
        cy.contains('Next').click();

        // step 5
        // i agreee
        cy.get('#mat-radio-13 > .mat-radio-label').click();
        cy.screenshot(`${testCase004FileName}_step_5`)
        // Next
        cy.contains('Submit').click();

        handleCRSForm(false);
    })


    it("005 - should successfully change address with FATCA", () => {
        // policy card
        cy.contains(policyNo).first().click();

        handleChangeAdress();
        cy.screenshot(`${testCase001FileName}_step_1`)
        // Next
        cy.contains('Next').click();

        /// step 2
        cy.screenshot(`${testCase005FileName}_step_2`)

        // Next
        cy.contains('Next').click();

        // step 3
        // FATCA YES
        cy.get('#mat-radio-7 > .mat-radio-label').click();
        cy.screenshot(`${testCase005FileName}_step_3`)
        // Next
        cy.contains('Next').click();

        // step 4
        // Automatic Exchange financial account info
        cy.get('#mat-radio-11 > .mat-radio-label').click();
        cy.screenshot(`${testCase005FileName}_step_4`)
        // Next
        cy.contains('Next').click();

        // step 5
        // i agreee
        cy.get('#mat-radio-13 > .mat-radio-label').click();
        cy.screenshot(`${testCase001FileName}_step_5`)
        // Next
        cy.contains('Submit').click();

        handleFACTAForm(testCase001FileName, true);
    })


    it("006 - should successfully change address with CRS and FATCA", () => {
        // policy card
        cy.contains(policyNo).first().click();

        handleChangeAdress();
        cy.screenshot(`${testCase001FileName}_step_1`)
        // Next
        cy.contains('Next').click();

        /// step 2
        cy.screenshot(`${testCase005FileName}_step_2`)

        // Next
        cy.contains('Next').click();

        // step 3
        // FATCA YES
        cy.get('#mat-radio-7 > .mat-radio-label').click();
        cy.screenshot(`${testCase005FileName}_step_3`)
        // Next
        cy.contains('Next').click();

        // step 4
        // CRS YES
        cy.get('#mat-radio-10 > .mat-radio-label').click();
        cy.screenshot(`${testCase005FileName}_step_4`)
        // Next
        cy.contains('Next').click();

        // step 5
        // i agreee
        cy.get('#mat-radio-13 > .mat-radio-label').click();
        cy.screenshot(`${testCase005FileName}_step_5`)
        // Next
        cy.contains('Submit').click();

        handleFACTAForm(testCase005FileName, false);
        handleCRSForm(true);
    })
})


const handleChangeAdress = () => {
    // edit address
    cy.get('#mat-checkbox-1 label').click();

    // english
    cy.get('#mat-radio-4 label').click();

    // flat / room
    cy.get('#room').type('Room A');

    // Floor
    cy.get('#floor').type('88/F')

    // block
    cy.get('#block').type('Block 1')

    // build / esate
    cy.get('#building').type('Building A')

    // street
    cy.get('#district').type('District A')

    // HK
    cy.get('#mat-radio-16 > .mat-radio-label').click();
}

const handleChangeEmail = () => {
    // edit email
    cy.get('#mat-checkbox-3 label').click();

    // email
    cy.get('#email').type('testing@test.com')
}


const handleFACTAForm = (testcaseName, isSubmit) => {

    // name
    cy.get('#mat-input-26').type('testing name');

    // business name
    cy.get('#mat-input-27').type('testing business name');

    // individual
    cy.get('#mat-radio-29 > .mat-radio-label').click();

    // address 
    cy.get('#mat-input-30').type('testing address');

    // city state zip code
    cy.get('#mat-input-31').type('testing city state zip code');

    // social security number radio
    cy.get('#mat-radio-37 > .mat-radio-label').click();

    // social security number
    cy.get('#mat-input-45').type('123456789');

    // certify
    cy.get('#mat-checkbox-46 > .mat-checkbox-layout > .mat-checkbox-label > .wrap-mat-radio-label').click();

    cy.screenshot(`${testcaseName}_step_FACTA`);

    // submit
    cy.contains(isSubmit ? 'Submit' : 'Next').click();

    // i confirm
    cy.get('mat-dialog-container mat-checkbox').click();

    // yes
    cy.get('mat-dialog-container').contains('Yes').click();
}

const handleCRSForm = (isAfterFACTA) => {
    cy.get('#mat-select-9 > .mat-select-trigger > .mat-select-value')
        .click()
        .get("mat-option")
        .contains("Ms")
        .click();

    // last name
    cy.get('#mat-input-34').type('surname');
    // fist name
    cy.get('#mat-input-35').type('firstname');
    // passport
    cy.get('#mat-input-37').type('testing');
    // address line 1
    cy.get('#mat-input-38').type('testing address line 1');
    // address line 2
    cy.get('#mat-input-39').type('testing address line 2');
    // address line 3
    cy.get('#mat-input-40').type('testing address line 3');
    // country  
    cy.get('#mat-select-10 > .mat-select-trigger > .mat-select-value')
        .click()
        .get("mat-option")
        .contains("Albania")
        .click();

    // zip code
    cy.get('#mat-input-41').type('00000')

    // no
    cy.get('#mat-radio-41 label').click();

    // date of birth
    cy.get(':nth-child(5) > :nth-child(1) > :nth-child(2) > questions-form-v2.ng-star-inserted > .col-lg-12.ng-star-inserted > .date-question-container > .col-lg-12 > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #questionDatePicker').click();
    cy.get('.mat-calendar-body-today').click();
    cy.pressEscape();

    // town / city
    cy.get('#mat-input-43').type('testing town / city');

    // state
    cy.get('#mat-input-44').type('testing state');

    // country
    cy.get('#mat-select-11 > .mat-select-trigger > .mat-select-value')
        .click()
        .get("mat-option")
        .contains("Albania")
        .click();

    // jurisdication of residence
    cy.get('#mat-select-12 > .mat-select-trigger > .mat-select-value')
        .click()
        .get("mat-option")
        .contains("Albania")
        .click();

    // no
    cy.get('#mat-radio-44 label').click();

    // tin
    if (isAfterFACTA) {
        cy.get('#mat-input-46').type('123456789')
    }
    else {
        cy.get('#mat-input-45').type('123456789')
    }

    // submit
    cy.contains('Submit').click();
}