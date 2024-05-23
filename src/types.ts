export interface File {
    id: number;
    name: string;
    device: string;
    path: string;
    status: "Available" | "Scheduled";
  }
  