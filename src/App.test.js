jest.mock("./components/List/List", () => ({
  __esModule: true,
  default: () => <div>ListUL</div>,
}));
jest.mock("./context/CheckTree", () => ({
  __esModule: true,
  CheckTreeProvider: ({ children }) => <div>{children}</div>,
}));
/***/
import { render, screen } from "@testing-library/react";
import App from "./App";

test("check render app", () => {
  render(<App />);
  const linkElement = screen.getByText("ListUL");
  expect(linkElement).toBeInTheDocument();
});
