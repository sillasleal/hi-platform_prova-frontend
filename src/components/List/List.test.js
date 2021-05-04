jest.mock("../ListItem/ListItem", () => ({
  __esModule: true,
  default: ({ children, item }) => (
    <li>
      {item.name}
      {children}
    </li>
  ),
}));
import { render, screen } from "@testing-library/react";
import List from "./List";

const items = {
  0: {
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
            children: {
              0: {
                id: "35996ee4-74a6-4343-ba5e-9700c24bee11",
                name: "Joseph E. James A.",
                children: {},
              },
            },
          },
        },
      },
    },
  },
};

test("check render", () => {
  render(<List items={items} />);
  const linkElement = screen.getByText("Richard Paul M.");
  expect(linkElement).toBeInTheDocument();
});

test("check render of root element", () => {
  const rendered = render(<List items={items} isRoot />);
  const linkElement = rendered.queryByRole("[class=makeStyles-sublist]");
  expect(linkElement).not.toBeInTheDocument();
});
