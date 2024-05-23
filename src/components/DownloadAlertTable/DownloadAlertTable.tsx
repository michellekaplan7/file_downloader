import React from "react";

import { File } from "../../types";

interface DownloadTableProps {
  selectedFiles: (File | undefined)[];
}

const DownloadAlertTable: React.FC<DownloadTableProps> = ({
  selectedFiles,
}) => {
  const tableRows = selectedFiles
    .map(
      (file) =>
        file &&
        `<tr><td>${file.name}</td><td>${file.device}</td><td>${file.path}</td></tr>`
    )
    .join("");

  const tableHtml = `
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="padding: 8px; text-align: left; width: 130px;"">Name</th>
          <th style="padding: 8px; text-align: left; width:100px;">Device</th>
          <th style="padding: 8px; text-align: left;">Path</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

  return <div dangerouslySetInnerHTML={{ __html: tableHtml }} />;
};

export default DownloadAlertTable;
