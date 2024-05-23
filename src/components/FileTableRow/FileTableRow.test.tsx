import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import { FileTableRow } from "./FileTableRow";
import { testFiles } from "../../data/testFiles";

const mockOnSelectItem = jest.fn();

const testFile = testFiles[0];

describe("FileTableRow Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(
      <table>
        <tbody>
          <FileTableRow
            file={testFile}
            isSelected={false}
            onSelectItem={mockOnSelectItem}
          />
        </tbody>
      </table>
    );
  });

  test("renders file data correctly", () => {
    render(
      <table>
        <tbody>
          <FileTableRow
            file={testFile}
            isSelected={false}
            onSelectItem={mockOnSelectItem}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText(testFile.name)).toBeInTheDocument();
    expect(screen.getByText(testFile.device)).toBeInTheDocument();
    expect(screen.getByText(testFile.path)).toBeInTheDocument();
    expect(screen.getByText(testFile.status)).toBeInTheDocument();
  });

  test("checkbox is checked when isSelected is true", () => {
    render(
      <table>
        <tbody>
          <FileTableRow
            file={testFile}
            isSelected={true}
            onSelectItem={mockOnSelectItem}
          />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  test("checkbox is not checked when isSelected is false", () => {
    render(
      <table>
        <tbody>
          <FileTableRow
            file={testFile}
            isSelected={false}
            onSelectItem={mockOnSelectItem}
          />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  test("calls onSelectItem with file id when CHECKBOX is clicked", () => {
    render(
      <table>
        <tbody>
          <FileTableRow
            file={testFile}
            isSelected={false}
            onSelectItem={mockOnSelectItem}
          />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole("checkbox");
    userEvent.click(checkbox);

    expect(mockOnSelectItem).toHaveBeenCalledWith(testFile.id);
  });

  test("calls onSelectItem with file id when ROW is clicked", () => {
    render(
      <table>
        <tbody>
          <FileTableRow
            file={testFile}
            isSelected={false}
            onSelectItem={mockOnSelectItem}
          />
        </tbody>
      </table>
    );

    const row = screen.getByRole("row");
    userEvent.click(row);

    expect(mockOnSelectItem).toHaveBeenCalledWith(testFile.id);
  });

  test("does NOT call onSelectItem from the row when click originates from checkbox", () => {
    render(
      <table>
        <tbody>
          <FileTableRow
            file={testFile}
            isSelected={false}
            onSelectItem={mockOnSelectItem}
          />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockOnSelectItem).toHaveBeenCalledTimes(1); // Only called once by the checkbox click
  });

  // TODO: fix console.error warning -> `ReactDOMTestUtils.act`
});
