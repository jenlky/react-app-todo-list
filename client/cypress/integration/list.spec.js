import faker from "faker";
import { addSubsequentItems, login, logout } from "../utils/helper";

const baseUrl = Cypress.env("baseUrl");
const word = faker.lorem.word();
const listItem1 = faker.lorem.sentence();
const listItem2 = faker.lorem.sentence();

describe("List", () => {
  it("should add list, update title, CRUD parent list item and changes should persist in the next login", () => {
    login();
    cy.get("button[class=add-another-list]").click();
    cy.get("input[class=title]").type(word);
    cy.get("input[class=list-input]").type(listItem1);
    cy.get("button[data-testid=list-add-btn]").click();
    cy.get("input[class=todo-item-input]")
      .clear()
      .type("update listItem works");

    logout();
    login();

    cy.get("input[class=title]").should("have.value", word);
    cy.get("input[class=todo-item-input]").should(
      "have.value",
      "update listItem works"
    );
    cy.get("span[data-testid=todo-item-cross]").click({ force: true });
    cy.get("span[data-testid=todo-item]").should("not.exist");
    cy.get("span[class=todo-list-remove-list]").click({ force: true });
    cy.get("div[class=todo-list]").should("not.exist");
  });

  it("should add list, update title, CRUD nested list items and changes should persist in the next login", done => {
    login();
    cy.get("button[class=add-another-list]").click();
    cy.get("input[class=title]").type(word);
    cy.get("input[class=list-input]").type(listItem1);
    cy.get("button[data-testid=list-add-btn]").click();
    cy.get("input[class=todo-item-input]")
      .clear()
      .type("update listItem works");
    addSubsequentItems(3, 1);

    logout();
    login();

    cy.get("input[class=title]").should("have.value", word);
    cy.get("span[data-testid=todo-item-right-triangle]").click({ force: true });
    cy.get("input[class=todo-item-input]").should(
      "have.value",
      "update listItem works"
    );

    cy.on("uncaught:exception", (err, runnable) => {
      cy.get("span[data-testid=todo-item-cross]").click({ force: true });
      expect(err.message).to.include(
        "Uncaught TypeError: Cannot read property 'display' of undefined"
      );
      done();
      return false;
    });
    cy.get("span[data-testid=todo-item]").should("not.exist");

    cy.get("span[class=todo-list-remove-list]").click({ force: true });
    cy.get("div[class=todo-list]").should("not.exist");
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
