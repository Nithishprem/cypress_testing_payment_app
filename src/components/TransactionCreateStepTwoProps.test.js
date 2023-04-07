import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";

test("if amount and note are entered, the pay button is enabled else pay button is disabled", async () => {
  render(<TransactionCreateStepTwo sender={{ id: "1" }} receiver={{ id: "1" }} />);

  expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();

  userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  userEvent.type(screen.getByPlaceholderText(/add a note/i), "breakfast");

  expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
});

// test("on initial render , the pay button is disabled", async () => {
//   render(<TransactionCreateStepTwo sender={{ id: "1" }} receiver={{ id: "1" }} />);
//   //   screen.debug();
//   //   screen.getByRole("");

//   expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
// });

// test("if amount and note are entered, the pay button is enabled", async () => {
//   render(<TransactionCreateStepTwo sender={{ id: "1" }} receiver={{ id: "1" }} />);
//   //   screen.debug();
//   //   screen.getByRole("");
//   userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
//   userEvent.type(screen.getByPlaceholderText(/add a note/i), "breakfast");

//   //   screen.getByRole("");

//   expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
// });
