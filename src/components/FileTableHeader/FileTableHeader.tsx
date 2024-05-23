import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
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
              aria-label="select-all"
              onChange={onSelectAll}
              type="checkbox"
            />

            <div className="selected-info-container">
              {selectedFileIds.length > 0
                ? `Selected ${selectedFileIds.length}`
                : "None Selected"}
            </div>

            <button
              data-tooltip-id={
                isDownloadDisabled && selectedFileIds.length > 0
                  ? "download-disabled-tooltip"
                  : ""
              }
              className="download-button"
              disabled={isDownloadDisabled}
              onClick={onDownload}
            >
              <FontAwesomeIcon icon={faDownload} />
              <span>Download Selected</span>
            </button>
            {isDownloadDisabled && selectedFileIds.length > 0 && (
              <ReactTooltip
                content="Only files with a status of 'Available' are downloadable. Please unselect 'Scheduled' files."
                id="download-disabled-tooltip"
                place="bottom"
                variant="info"
              />
            )}
          </div>
        </div>
      </th>
    </tr>
  );
};
