import { render, screen } from "@testing-library/react";
import TreeContext from "../../context/CheckTree";
import ListItem from "./ListItem";

const item = {
  id: "2469bdab-23b5-4cb8-90c9-c609a49410b0",
  name: "Richard Paul M.",
  children: {
    0: {
      id: "97cd3a19-0f1c-4248-a84c-a1f5a0093a89",
      name: "Luis F. Doris",
      children: {
        0: {
          id: "6410eff5-5aff-46fd-bb08-ed90581007b4",
          name: "Maurice Rudolf Ludwig",
          children: {},
        },
      },
    },
  },
};

const value = {
  data: {
    "6410eff5-5aff-46fd-bb08-ed90581007b4": true,
  },
  onCheck: jest.fn(),
};
const TestProvider = ({ children }) => (
  <TreeContext.Provider value={value}>{children}</TreeContext.Provider>
);

afterEach(() => {
  jest.clearAllMocks();
});

test("check render", () => {
  render(
    <TestProvider>
      <ListItem item={item} />
    </TestProvider>
  );
  const linkElement = screen.getByText("Richard Paul M.");
  expect(linkElement).toBeInTheDocument();
});

test("onClick", () => {
  render(
    <TestProvider>
      <ListItem item={item}>
        <div>Details</div>
      </ListItem>
    </TestProvider>
  );
  const linkElement = screen.getByText("Richard Paul M.");
  linkElement.click();
  expect(value.onCheck).toBeCalled();
});

test("onClick with no children", () => {
  const item = {
    id: "2469bdab-23b5-4cb8-90c9-c609a49410b0",
    name: "Richard Paul M.",
    children: {},
  };
  render(
    <TestProvider>
      <ListItem item={item}>
        <div>Details</div>
      </ListItem>
    </TestProvider>
  );
  const linkElement = screen.getByText("Richard Paul M.");
  linkElement.click();
  expect(value.onCheck).toBeCalled();
});
