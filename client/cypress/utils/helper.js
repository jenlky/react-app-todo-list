/* eslint-disable cypress/no-unnecessary-waiting */

const baseUrl = Cypress.env("baseUrl");

const waitForChildItem = 100;
const addSubsequentItems = (numOfLayers, numOfItems) => {
  let startingIndex = numOfLayers * (numOfItems - 1);
  const numOfTimes = numOfLayers - 1;

  for (let x = 0; x < numOfTimes; x++) {
    cy.get("span[data-testid=todo-item-plus]")
      .eq(startingIndex)
      .click({ force: true });
    cy.wait(waitForChildItem);
    cy.get("input[data-testid=todo-item-input]")
      .eq(++startingIndex)
      .type(`List item ${numOfItems}-${x + 1}`);
  }
};

const credentials = "cypresstest";
const login = () => {
  cy.visit(`${baseUrl}/login`);
  cy.get("input[id=username]").type(credentials);
  cy.get("input[id=password]").type(credentials);
  cy.get("button[type=submit]").click();
  cy.get("button[class=add-another-list]").should("exist");
  cy.wait(100);
};

const logout = () => {
  cy.get("button")
    .contains("Log out")
    .click();
  cy.url().should("eq", `${baseUrl}/`);
};

module.exports = { addSubsequentItems, login, logout };
