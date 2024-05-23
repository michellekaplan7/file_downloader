import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { FileTableHeader } from "./FileTableHeader";
import { testFiles } from "../../data/testFiles";

const mockOnDownload = jest.fn();
const mockOnSelectAll = jest.fn();

describe("FileTableHeader Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(
      <FileTableHeader
        files={testFiles}
        isDownloadDisabled={false}
        onDownload={mockOnDownload}
        onSelectAll={mockOnSelectAll}
        selectedFileIds={[]}
      />
    );
  });

  test("renders table header info correctly", () => {
    render(
      <FileTableHeader
        files={testFiles}
        isDownloadDisabled={false}
        onDownload={mockOnDownload}
        onSelectAll={mockOnSelectAll}
        selectedFileIds={[]}
      />
    );

    expect(screen.getByText("None Selected")).toBeInTheDocument();
  });

  test("select-all checkbox is checked when all items are selected", () => {
    render(
      <FileTableHeader
        files={testFiles}
        isDownloadDisabled={false}
        onDownload={mockOnDownload}
        onSelectAll={mockOnSelectAll}
        selectedFileIds={testFiles.map((file) => file.id)}
      />
    );

    const selectAllCheckbox = screen.getByRole("checkbox", {
      name: "select-all",
    });

    expect(selectAllCheckbox).toBeChecked();
  });

  test("select-all checkbox is not checked when no items are selected", () => {
    render(
      <FileTableHeader
        files={testFiles}
        isDownloadDisabled={false}
        onDownload={mockOnDownload}
        onSelectAll={mockOnSelectAll}
        selectedFileIds={[]}
      />
    );

    const selectAllCheckbox = screen.getByRole("checkbox", {
      name: "select-all",
    });

    expect(selectAllCheckbox).not.toBeChecked();
  });

  test("calls onSelectAll when select-all checkbox is clicked", () => {
    render(
      <FileTableHeader
        files={testFiles}
        isDownloadDisabled={false}
        onDownload={mockOnDownload}
        onSelectAll={mockOnSelectAll}
        selectedFileIds={[]}
      />
    );

    const selectAllCheckbox = screen.getByRole("checkbox", {
      name: "select-all",
    });

    fireEvent.click(selectAllCheckbox);

    expect(mockOnSelectAll).toHaveBeenCalled();
  });

  test("calls onDownload when download button is clicked", () => {
    render(
      <FileTableHeader
        files={testFiles}
        isDownloadDisabled={false}
        onDownload={mockOnDownload}
        onSelectAll={mockOnSelectAll}
        selectedFileIds={[]}
      />
    );

    const downloadButton = screen.getByText("Download Selected")
      .parentElement as HTMLElement;

    fireEvent.click(downloadButton);

    expect(mockOnDownload).toHaveBeenCalled();
  });

  test("download button is disabled when isDownloadDisabled is true", () => {
    render(
      <FileTableHeader
        files={testFiles}
        isDownloadDisabled={true}
        onDownload={mockOnDownload}
        onSelectAll={mockOnSelectAll}
        selectedFileIds={[12]}
      />
    );

    const downloadButton = screen.getByText("Download Selected").parentElement;

    expect(downloadButton).toBeDisabled();
  });

  test("download button is enabled when isDownloadDisabled is false", () => {
    render(
      <FileTableHeader
        files={testFiles}
        isDownloadDisabled={false}
        onDownload={mockOnDownload}
        onSelectAll={mockOnSelectAll}
        selectedFileIds={[11]}
      />
    );

    const downloadButton = screen.getByText("Download Selected").parentElement;

    expect(downloadButton).not.toBeDisabled();
  });

  // TODO: tooltip is shown when download button is disabled and items are selected
  // TODO: checkbox indeterminate state
  // TODO: fix console.errors
});
