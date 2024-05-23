import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import DownloadAlertTable from "./DownloadAlertTable";

import { testFiles } from "../../data/testFiles";

describe("DownloadAlertTable Component", () => {
  test("renders without crashing", () => {
    render(<DownloadAlertTable selectedFiles={testFiles} />);
  });

  test("renders table headers correctly", () => {
    render(<DownloadAlertTable selectedFiles={testFiles} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Device")).toBeInTheDocument();
    expect(screen.getByText("Path")).toBeInTheDocument();
  });

  test("renders file data correctly", () => {
    render(<DownloadAlertTable selectedFiles={testFiles} />);

    expect(screen.getByText("file1.exe")).toBeInTheDocument();
    expect(screen.getByText("Wario")).toBeInTheDocument();
    expect(screen.getByText("/path/to/file1.exe")).toBeInTheDocument();

    expect(screen.getByText("file2.pdf")).toBeInTheDocument();
    expect(screen.getByText("Bowser")).toBeInTheDocument();
    expect(screen.getByText("/path/to/file2.pdf")).toBeInTheDocument();
  });
});
