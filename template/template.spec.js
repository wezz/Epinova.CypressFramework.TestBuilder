
/// <reference types="Cypress" />

import component from "./template.fixture";

context('COMPONENTTYPE:' + component.name, () => {
    beforeEach(() => {
        cy.VisitEnvUrl(component);
    });

    it('COMPONENTTYPE exists on page', () => {
        cy.get(component.elements.container).should("be.visible");
    });
});
