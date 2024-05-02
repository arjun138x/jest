import { act, fireEvent, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import LoginComponent from "./LoginComponent";

describe("LoginComponent test suite", () => {
  const loginServiceMock = {
    login: jest.fn(),
  };

  const setToken = jest.fn();

  let container: HTMLElement;

  function setUp() {
    container = render(
      <LoginComponent loginService={loginServiceMock} setToken={setToken} />
    ).container;
  }
  beforeEach(() => {
    // we con't use render directly inside beforeEach.
    setUp();
  });

  it("should render correctly the login component", () => {
    const mainElement = screen.getByRole("main");

    expect(mainElement).toBeInTheDocument();
    expect(screen.queryByTestId("resultLabel")).not.toBeInTheDocument();
  });

  it("should render correctly - query by test id", () => {
    const inputs = screen.getAllByTestId("input");

    expect(inputs).toHaveLength(3);
    expect(inputs[0].getAttribute("value")).toBe("");
    expect(inputs[1].getAttribute("value")).toBe("");
    expect(inputs[2].getAttribute("value")).toBe("Login");
  });

  it("should render correctly - query by document query", () => {
    // eslint-disable-next-line testing-library/no-node-access
    const inputs = container.querySelectorAll("input");

    expect(inputs).toHaveLength(3);
    expect(inputs[0].getAttribute("value")).toBe("");
    expect(inputs[1].getAttribute("value")).toBe("");
    expect(inputs[2].getAttribute("value")).toBe("Login");
  });

  it("Click login button with incomplete credentials - show required message", () => {
    const inputs = screen.getAllByTestId("input");
    const loginButton = inputs[2];

    fireEvent.click(loginButton);

    const resultLabel = screen.getByTestId("resultLabel");
    expect(resultLabel.textContent).toBe("UserName and password required!");
  });

  it("Click login button with incomplete credentials - show required message - with user click", () => {
    const inputs = screen.getAllByTestId("input");
    const loginButton = inputs[2];

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      user.click(loginButton);
    });

    const resultLabel = screen.getByTestId("resultLabel");
    expect(resultLabel.textContent).toBe("UserName and password required!");
  });

  it("right credentials - successful login", async () => {
    loginServiceMock.login.mockResolvedValueOnce("1234");
    const inputs = screen.getAllByTestId("input");
    const userNameInput = inputs[0];
    const passwordInput = inputs[1];
    const loginButton = inputs[2];

    fireEvent.change(userNameInput, { target: { value: "someUser" } });
    fireEvent.change(passwordInput, { target: { value: "somePassword" } });
    fireEvent.click(loginButton);

    const resultLabel = await screen.findByTestId("resultLabel");
    expect(resultLabel.textContent).toBe("successful login");
  });

  it("right credentials - successful login - user calls", async () => {
    loginServiceMock.login.mockResolvedValueOnce("1234");
    const inputs = screen.getAllByTestId("input");
    const userNameInput = inputs[0];
    const passwordInput = inputs[1];
    const loginButton = inputs[2];

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      user.click(userNameInput);
      user.keyboard("someUser");

      user.click(passwordInput);
      user.keyboard("somePassword");

      user.click(loginButton);
    });

    expect(loginServiceMock.login).toHaveBeenCalledTimes(1);
    expect(loginServiceMock.login).toHaveBeenCalledWith(
      "someUser",
      "somePassword"
    );
    const resultLabel = await screen.findByTestId("resultLabel");
    expect(resultLabel.textContent).toBe("successful login");
  });

  it("right credentials - unsuccessful login", async () => {
    loginServiceMock.login.mockResolvedValueOnce(undefined);
    const inputs = screen.getAllByTestId("input");
    const userNameInput = inputs[0];
    const passwordInput = inputs[1];
    const loginButton = inputs[2];

    fireEvent.change(userNameInput, { target: { value: "someUser" } });
    fireEvent.change(passwordInput, { target: { value: "somePassword" } });
    fireEvent.click(loginButton);

    expect(loginServiceMock.login).toHaveBeenCalledWith(
      "someUser",
      "somePassword"
    );
    const resultLabel = await screen.findByTestId("resultLabel");
    expect(resultLabel.textContent).toBe("invalid credentials");
  });
});
