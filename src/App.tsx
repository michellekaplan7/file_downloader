import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { files } from "./data/files";

import { FileTable } from "./components/FileTable/FileTable";
import DownloadAlertTable from "./components/DownloadAlertTable/DownloadAlertTable";

import "./App.css";

const MySwal = withReactContent(Swal);

const App: React.FC = () => {
  const [selectedFileIds, setSelectedFileIds] = useState<number[]>([]);

  const handleSelectItem = (id: number) => {
    setSelectedFileIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedFileIds.length === files.length) {
      setSelectedFileIds([]);
    } else {
      setSelectedFileIds(files.map((file) => file.id));
    }
  };

  const handleDownload = () => {
    const selectedFiles = selectedFileIds.map((id) =>
      files.find((file) => file.id === id)
    );

    const tableHtml = <DownloadAlertTable selectedFiles={selectedFiles} />;

    MySwal.fire({
      title: "Downloading",
      html: tableHtml,
      width: "600px",
      showCloseButton: true,
    });
  };

  const scheduledFileIds = useMemo(() => {
    return new Set(
      files.filter((file) => file.status === "Scheduled").map((file) => file.id)
    );
  }, [files]);

  const isDownloadDisabled =
    !selectedFileIds.length ||
    selectedFileIds.some((id) => scheduledFileIds.has(id));

  useEffect(() => {
    const selectAllCheckbox = document.getElementById(
      "select-all"
    ) as HTMLInputElement;
    if (selectedFileIds.length === 0) {
      selectAllCheckbox.indeterminate = false;
      selectAllCheckbox.checked = false;
    } else if (selectedFileIds.length === files.length) {
      selectAllCheckbox.indeterminate = false;
      selectAllCheckbox.checked = true;
    } else {
      selectAllCheckbox.indeterminate = true;
      selectAllCheckbox.checked = false;
    }
  }, [selectedFileIds]);

  return (
    <div className="App">
      <div className="table-container">
        <FileTable
          files={files}
          isDownloadDisabled={isDownloadDisabled}
          onDownload={handleDownload}
          onSelectAll={handleSelectAll}
          onSelectItem={handleSelectItem}
          selectedFileIds={selectedFileIds}
        />
      </div>
    </div>
  );
};

export default App;
