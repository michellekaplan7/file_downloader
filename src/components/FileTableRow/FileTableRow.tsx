import React from "react";

import { File } from "../../types";

import "./FileTableRow.css";

interface FileTableRowProps {
  file: File;
  isSelected: boolean;
  onSelectItem: (id: number) => void;
}

export const FileTableRow: React.FC<FileTableRowProps> = ({
  file,
  isSelected,
  onSelectItem,
}) => {
  const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
    // Prevent row click from toggling checkbox state if the click originated from the checkbox
    if ((event.target as HTMLElement).tagName !== "INPUT") {
      onSelectItem(file.id);
    }
  };

  const handleCheckboxChange = () => {
    onSelectItem(file.id);
  };

  return (
    <tr className={isSelected ? "selected-row" : ""} onClick={handleRowClick}>
      <td>
        <input
          checked={isSelected}
          onChange={handleCheckboxChange}
          type="checkbox"
        />
      </td>
      <td>{file.name}</td>
      <td className="device-column">{file.device}</td>
      <td>{file.path}</td>
      <td>
        {file.status === "Available" ? (
          <span className="status available"></span>
        ) : (
          <span className="status scheduled"></span>
        )}
        {file.status}
      </td>
    </tr>
  );
};
