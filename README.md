# File Viewer and Downloader

## Overview

This application allows users to view different files in a table format, select them, and download files with an "Available" status. The table includes columns for the file name, device, path, and status. Users can select individual files or use a "select all" checkbox to select all files. The application ensures that only files with an "Available" status can be downloaded, and provides feedback to the user through a download alert.

## Technologies Used

- **React**
- **TypeScript**
- **React Testing Library**
- **SweetAlert2**: A beautiful, responsive, customizable, accessible replacement for JavaScript's popup boxes.
- **SweetAlert2 React Content**: A library to use SweetAlert2 with React content.

## Installation and Running the Application

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (which includes `npm`)

### Steps

1. **Clone the Repository**

   ```sh
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Run the Application**

   ```sh
   npm start
   ```

   This will start the application and you can view it in your browser at `http://localhost:3000`.

### Running Tests

To run the tests, use the following command:

```sh
npm test
```

This will execute the test suite, which includes unit tests for the components and integration tests for the main application functionality.
