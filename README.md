
# GitHub Explorer

A React application for exploring GitHub users with a clean, responsive interface. Built with TypeScript, React, and the GitHub REST API.

## Features

- Real-time user search with debounced input
- Infinite scroll pagination for search results
- Detailed user profiles with key GitHub statistics
- Dark mode support
- Responsive design for all screen sizes
- Accessible UI components
- Type-safe implementation

## Technology Stack

- **Framework**: React with TypeScript
- **State Management**: Zustand
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Testing**: Vitest + React Testing Library
- **API**: GitHub REST API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/github-explorer.git
   ```


2. Install dependencies:

   ```bash
   cd github-explorer
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Running Tests

```bash
npm test
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Route components
├── services/         # API service layer
├── store/           # Zustand store
├── types/           # TypeScript types/interfaces
├── hooks/           # Custom React hooks
└── utils/           # Utility functions
```

## Key Features

### User Search

- Real-time search with debounced input to minimize API calls
- Server-side filtering via GitHub's search API
- Infinite scroll for seamless result loading

### User Profiles

- Detailed user information
- Key statistics (repositories, followers, following)
- Direct links to GitHub profiles

### Theme Support

- Light/dark mode toggle
- System preference detection
- Persistent theme selection

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
