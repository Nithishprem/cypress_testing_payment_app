// const { cy } = require("date-fns/locale");
const { v4: uuidv4 } = require("uuid");

describe("payment", () => {
  it("user can make payment", () => {
    //login
    cy.visit("/");
    cy.findByRole("textbox", { name: /username/i }).type("Tavares_Barrows");
    cy.findByLabelText(/password/i).type("s3cret");
    cy.findByRole("checkbox", {
      name: /remember me/i,
    }).check();
    cy.findByRole("button", {
      name: /sign in/i,
    }).click();
    //check balance
    let oldBalance;
    cy.get("[data-test=sidenav-user-balance]").then(($balance) => (oldBalance = $balance.text()));

    //click new cta to initiate new transaction
    cy.findByRole("button", { name: /new/i }).click();

    //search and select a user

    cy.findByRole("textbox").type("ibrahim dickens");
    cy.findByText(/ibrahim dickens/i).click();

    // add amount, note and clicking pay
    let amountToPay = 4;
    cy.findByPlaceholderText(/amount/i).type(amountToPay);

    let note = uuidv4();
    cy.findByPlaceholderText(/add a note/i).type(note);

    cy.findByRole("button", { name: /pay/i }).click();

    //return to transactions

    cy.findByRole("button", {
      name: /return to transactions/i,
    }).click();

    //go to personal payments

    cy.findByRole("tab", { name: /mine/i }).click();

    //click on payment made
    cy.findByText(note).click({ force: true });

    //verify if payment was made
    cy.findByText(`-$${amountToPay}.00`).should("be.visible");
    cy.findByText(note).should("be.visible");

    //verfiy if payment amount was deducted

    cy.get("[data-test=sidenav-user-balance]").then(($balance) => {
      const oldConvertedBalance = parseFloat(oldBalance.replace(/\$|,/g, ""));
      const newConvertedBalance = parseFloat($balance.text().replace(/\$|,/g, ""));

      const difference = oldConvertedBalance - newConvertedBalance;

      expect(difference).to.equal(parseFloat(amountToPay));
    });
  });
});
