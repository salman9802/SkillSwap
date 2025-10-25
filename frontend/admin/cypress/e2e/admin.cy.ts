// /// <reference types="cypress" />

describe("Inspect entire admin panel", () => {
  it("user can login and inspect dashboard", () => {
    cy.visit("/");

    // login
    cy.findByTestId("name-input").type("John");
    cy.findByTestId("password-input").type("john123");
    cy.findByRole("button", { name: /login/i }).click();

    // inspect dashboard (cards, charts)
    cy.findByRole("link", { name: /manage admins/i }).click();
    cy.findByRole("link", { name: /manage users/i }).click();
    cy.findByRole("link", { name: /user logs/i }).click();
    cy.findByRole("link", { name: /user reports/i }).click();

    cy.findByRole("link", { name: /admin logs/i }).click();
    cy.findByRole("link", { name: /admin reports/i }).click();

    // inspect manage admins
    cy.findByRole("link", { name: /manage admins/i }).click();
    cy.findAllByTestId("manage-admin-checkbox").click({ multiple: true });
    cy.findAllByTestId("manage-admin-action").each(($ele) => {
      cy.wrap($ele).click();
      // Click near the top-left corner (usually outside any modal)
      cy.get("body").click(10, 10);

      // cy.wrap($ele).click({ force: true });
      // cy.wrap($ele).click({ force: true });
    });
    cy.findAllByTestId("manage-admin-checkbox").click({ multiple: true });

    // inspect manage users
    cy.findByRole("link", { name: /manage users/i }).click();
    cy.findAllByTestId("manage-user-checkbox").click({ multiple: true });
    cy.findAllByTestId("manage-user-action").each(($ele) => {
      cy.wrap($ele).click();
      cy.get("body").click(10, 10);
    });
    cy.findAllByTestId("manage-user-checkbox").click({ multiple: true });

    // inspect user logs
    cy.findByRole("link", { name: /user logs/i }).click();
    cy.findAllByTestId("user-log-list-item").click({ multiple: true });

    // inspect user reports
    cy.findByRole("link", { name: /user reports/i }).click();
    cy.findByRole("button", { name: /by routes/i }).click();
    cy.findByRole("menuitem", { name: /by type/i }).click();
    cy.findByRole("button", { name: /by type/i }).click();
    cy.findByRole("menuitem", { name: /by routes/i }).click();

    // inspect admin logs
    cy.findByRole("link", { name: /admin logs/i }).click();
    cy.findAllByTestId("admin-log-list-item").click({ multiple: true });

    // inspect admin reports
    cy.findByRole("link", { name: /admin reports/i }).click();
    cy.findByRole("button", { name: /by routes/i }).click();
    cy.findByRole("menuitem", { name: /by type/i }).click();
    cy.findByRole("button", { name: /by type/i }).click();
    cy.findByRole("menuitem", { name: /by routes/i }).click();
  });
});
