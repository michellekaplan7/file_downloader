import React from "react";

import { FileTableHeader } from "../FileTableHeader/FileTableHeader";
import { FileTableRow } from "../FileTableRow/FileTableRow";

import { File } from "../../types";

import "./FileTable.css";

interface FileTableProps {
  files: File[];
  isDownloadDisabled: boolean;
  onDownload: () => void;
  onSelectAll: () => void;
  onSelectItem: (id: number) => void;
  selectedFileIds: number[];
}

export const FileTable: React.FC<FileTableProps> = ({
  files,
  isDownloadDisabled,
  onDownload,
  onSelectAll,
  onSelectItem,
  selectedFileIds,
}) => {
  return (
    <table>
      <thead>
        <FileTableHeader
          files={files}
          isDownloadDisabled={isDownloadDisabled}
          onDownload={onDownload}
          onSelectAll={onSelectAll}
          selectedFileIds={selectedFileIds}
        />
        <tr>
          <th></th>
          <th className="column-header">Name</th>
          <th className="column-header">Device</th>
          <th className="column-header">Path</th>
          <th className="column-header">Status</th>
        </tr>
      </thead>

      <tbody>
        {files.map((file) => (
          <FileTableRow
            file={file}
            isSelected={selectedFileIds.includes(file.id)}
            key={file.id}
            onSelectItem={onSelectItem}
          />
        ))}
      </tbody>
    </table>
  );
};
