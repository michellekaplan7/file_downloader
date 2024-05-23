import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { FileTable } from "./FileTable";

import { testFiles } from "../../data/testFiles";

const mockOnDownload = jest.fn();
const mockOnSelectAll = jest.fn();
const mockOnSelectItem = jest.fn();

describe("FileTable Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(
      <FileTable
        files={testFiles}
        isDownloadDisabled={false}
        onDownload={mockOnDownload}
        onSelectAll={mockOnSelectAll}
        onSelectItem={mockOnSelectItem}
        selectedFileIds={[]}
      />
    );
  });

  test("renders the FileTableHeader and FileTableRow components correctly", () => {
    render(
      <FileTable
        files={testFiles}
        isDownloadDisabled={false}
        onDownload={mockOnDownload}
        onSelectAll={mockOnSelectAll}
        onSelectItem={mockOnSelectItem}
        selectedFileIds={[]}
      />
    );

    // Check that the FileTableHeader renders
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Device")).toBeInTheDocument();
    expect(screen.getByText("Path")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();

    // Check that the FileTableRow components render
    testFiles.forEach((file) => {
      expect(screen.getByText(file.name)).toBeInTheDocument();
      expect(screen.getByText(file.device)).toBeInTheDocument();
      expect(screen.getByText(file.path)).toBeInTheDocument();
    });
  });

  // TODO: fix console.error warning -> `ReactDOMTestUtils.act`
});
