import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import { File } from "../../types";

import "./FileTableHeader.css";

interface FileTableHeaderProps {
  files: File[];
  isDownloadDisabled: boolean;
  onDownload: () => void;
  onSelectAll: () => void;
  selectedFileIds: number[];
}

export const FileTableHeader: React.FC<FileTableHeaderProps> = ({
  files,
  isDownloadDisabled,
  onDownload,
  onSelectAll,
  selectedFileIds,
}) => {
  return (
    <tr>
      <th colSpan={5}>
        <div>
          <div className="table-header-info">
            <input
              checked={selectedFileIds.length === files.length}
              id="select-all"
              onChange={onSelectAll}
              type="checkbox"
            />

            <div className="selected-info-container">
              {selectedFileIds.length > 0
                ? `Selected ${selectedFileIds.length}`
                : "None Selected"}
            </div>

            <button
              className="download-button"
              disabled={isDownloadDisabled}
              onClick={onDownload}
            >
              <FontAwesomeIcon icon={faDownload} />
              <span>Download Selected</span>
            </button>
          </div>
        </div>
      </th>
    </tr>
  );
};
