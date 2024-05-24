import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import App from "./App";

// Mock the sweetalert2 module
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

// Mock the sweetalert2-react-content module
jest.mock("sweetalert2-react-content", () => {
  const actual = jest.requireActual("sweetalert2-react-content");
  return {
    __esModule: true,
    ...actual,
    default: () => ({
      fire: jest.fn(),
    }),
  };
});

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(<App />);
  });

  test("renders table headers correctly", () => {
    render(<App />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Device")).toBeInTheDocument();
    expect(screen.getByText("Path")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  test("allows selecting individual items", () => {
    render(<App />);

    const checkboxes = screen.getAllByRole("checkbox");
    act(() => {
      userEvent.click(checkboxes[1]);
    });

    expect(checkboxes[1]).toBeChecked();
  });

  test("allows selecting all items using the select-all checkbox", () => {
    render(<App />);

    const selectAllCheckbox = screen.getByRole("checkbox", {
      name: "select-all",
    });

    act(() => {
      userEvent.click(selectAllCheckbox);
    });

    const checkboxes = screen.getAllByRole("checkbox");

    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  test("disables download button when scheduled files are selected", () => {
    render(<App />);

    const checkboxes = screen.getAllByRole("checkbox");

    act(() => {
      userEvent.click(checkboxes[3]); // Select Peach file 'available'
      userEvent.click(checkboxes[4]); // Select Daisy file 'scheduled'
    });

    const downloadButton = screen.getByText("Download Selected")
      .parentElement as HTMLElement;

    expect(downloadButton).toBeDisabled();
  });

  // TODO: shows download alert when download button is clicked
  // TODO: fix console.error warning -> `ReactDOMTestUtils.act`
});
