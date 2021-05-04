import { render, screen } from "@testing-library/react";
import CheckTreeContext, { CheckTreeProvider } from "./CheckTree";

const localStorageMock = {
  getItem: jest.fn(() => "{a:10}"),
  setItem: jest.fn(),
  clear: jest.fn(),
};
//Object.defineProperty(window, "localStorage", { value: localStorageMock });

test("check default render", () => {
  render(
    <CheckTreeProvider>
      <CheckTreeContext.Consumer>
        {(tree) => (
          <button onClick={() => tree.onCheck("id-test")}>click</button>
        )}
      </CheckTreeContext.Consumer>
    </CheckTreeProvider>
  );
  const linkElement = screen.getByText("click");
  linkElement.click();
  // expect(localStorageMock.getItem).toBeCalled();
  //expect(localStorageMock.setItem).toBeCalled();
});
