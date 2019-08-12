/* eslint-disable cypress/no-unnecessary-waiting */
import faker from "faker";

const baseUrl = Cypress.env("baseUrl");

const word = faker.lorem.word();
const listItem1 = faker.lorem.sentence();
const listItem2 = faker.lorem.sentence();
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

describe("List", () => {
  it("should add nested children items", () => {
    cy.visit(`${baseUrl}/users`);

    cy.get("input[class=title]").type(word);
    cy.get("input[class=list-input]").type(listItem1);
    cy.get("button[data-testid=list-add-btn]").click({ force: true });
    addEmptyItems(15);
  });

  it("should toggle list item and its children", () => {
    cy.visit(`${baseUrl}/users`);

    cy.get("input[class=title]").type(word);
    cy.get("input[class=list-input]").type(listItem1);
    cy.get("button[data-testid=list-add-btn]").click();
    addSubsequentItems(3, 1);

    cy.get("span[data-testid=todo-item-right-triangle]")
      .eq(0)
      .click({ force: true });
    cy.contains("List item 1-1").should("not.exist");
    cy.contains("List item 1-2").should("not.exist");
  });

  it("should delete list item and its children", () => {
    cy.visit(`${baseUrl}/users`);

    cy.get("input[class=title]").type(word);
    cy.get("input[class=list-input]").type(listItem1);
    cy.get("button[data-testid=list-add-btn]").click();
    addSubsequentItems(3, 1);

    cy.get("span[data-testid=todo-item-cross]")
      .eq(0)
      .click({ force: true });
    cy.contains(listItem1).should("not.exist");
    cy.contains("List item 1-1").should("not.exist");
    cy.contains("List item 1-2").should("not.exist");
  });
});

describe.only("lists", () => {
  const updateTitleAddFirstItems = listId => {
    const index = listId - 1;

    cy.get("input[class=title]")
      .eq(index)
      .type(word);
    cy.get("input[class=list-input]")
      .eq(index)
      .type(listItem1);
    cy.get("button[data-testid=list-add-btn]")
      .eq(index)
      .click();
    cy.get("input[class=list-input]")
      .eq(index)
      .type(listItem2);
    cy.get("button[data-testid=list-add-btn]")
      .eq(index)
      .click();
  };

  it("should fill up multiple list", () => {
    cy.visit(`${baseUrl}/users`);

    cy.get("input[class=title]").type(word);
    cy.get("input[class=list-input]").type(listItem1);
    cy.get("button[data-testid=list-add-btn]").click();
    cy.get("input[class=list-input]").type(listItem2);
    cy.get("button[data-testid=list-add-btn]").click();

    addSubsequentItems(3, 1);
    addSubsequentItems(3, 2);

    cy.get("button[class=add-another-list").click();
    updateTitleAddFirstItems(2);
    addSubsequentItems(3, 3);
    addSubsequentItems(3, 4);

    // need to enable side scroll then cypress will type
    cy.get("button[class=add-another-list").click();
    updateTitleAddFirstItems(3);
    addSubsequentItems(3, 5);
    addSubsequentItems(3, 6);
  });
});
