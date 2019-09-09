import faker from "faker";
import {
  addSubsequentItems,
  addEmptyItems,
  login,
  logout
} from "../utils/helper";

const baseUrl = Cypress.env("baseUrl");
const word = faker.lorem.word();
const listItem1 = faker.lorem.sentence();
const listItem2 = faker.lorem.sentence();

// test login and do CRUD, logout, re-login again and check if the changes made were there
describe("List", () => {
  it.only("should add list, update title and the changes should persist in the next login", () => {
    login();
    cy.get("button[class=add-another-list]").click();
    cy.get("input[class=title]").type(word);

    logout();
    login();

    cy.get("input[class=title]").should("have.value", word);
    cy.get("span[class=todo-list-remove-list]")
      .eq(0)
      .click({ force: true });
  });

  it("should add nested children items", () => {
    // cy.get("span[data-testid=todo-item-cross]")
    //   .eq(0)
    //   .click({ force: true });
    // cy.get("input[class=list-input]").type(listItem1);
    // cy.get("button[data-testid=list-add-btn]")
    //   .click({ force: true })
    //   .then(response => {
    // addEmptyItems(5);
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

describe("lists", () => {
  const updateTitleAddFirstItem = listId => {
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
    updateTitleAddFirstItem(1);
    addSubsequentItems(3, 1);
    addSubsequentItems(3, 2);

    cy.get("button[class=add-another-list]").click();
    updateTitleAddFirstItem(2);
    addSubsequentItems(3, 3);
    addSubsequentItems(3, 4);

    cy.get("button[class=add-another-list]").click();
    cy.scrollTo("right");
    updateTitleAddFirstItem(3);
    addSubsequentItems(3, 5);
    addSubsequentItems(3, 6);
  });
});
