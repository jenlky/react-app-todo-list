/* eslint-disable cypress/no-unnecessary-waiting */

const waitForChildItem = 100;
const addSubsequentItems = (howManyLayers, numOfItems) => {
  let startingIndex = howManyLayers * (numOfItems - 1);
  const numOfTimes = howManyLayers - 1;

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

const addEmptyItems = howManyLayers => {
  const numOfTimes = howManyLayers - 1;

  for (let x = 0; x < numOfTimes; x++) {
    cy.get("span[data-testid=todo-item-plus]")
      .eq(x)
      .click({ force: true });
    cy.wait(100);
  }
};

const credentials = "cypresstest";
const login = () => {
  cy.get("input[id=username]").type(credentials);
  cy.get("input[id=password]").type(credentials);
  cy.get("button[type=submit]").click();
  cy.get("button[class=add-another-list]").should("exist");
};

module.exports = { addSubsequentItems, addEmptyItems, login };
