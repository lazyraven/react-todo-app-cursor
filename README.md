# 📋 Todo List Application

A fully functional, modern Todo List application built with React. This application demonstrates best practices in React development, including component architecture, state management, API integration, and responsive design.

## ✨ Features

### Core Functionality
- **CRUD Operations**: Create, Read, Update, and Delete tasks
- **Task Management**: Add, edit, toggle completion, and delete tasks
- **Real-time Updates**: Immediate UI updates with optimistic rendering
- **Persistent Storage**: Data persists in localStorage and syncs with API

### Advanced Features
- **Task Filtering**: Filter tasks by All, Pending, or Completed status
- **Search Functionality**: Search tasks by title with real-time filtering
- **Loading States**: Beautiful loading spinners for all async operations
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Confirmation Modals**: Delete confirmation to prevent accidental deletions
- **Responsive Design**: Fully responsive design that works on all devices

### User Experience
- **Modern UI**: Clean, attractive design with smooth animations
- **Hover Effects**: Interactive elements with hover states
- **Smooth Animations**: CSS transitions and animations for better UX
- **Accessibility**: Keyboard navigation and screen reader support
- **Mobile Optimized**: Touch-friendly interface for mobile devices

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-list-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 📁 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── ConfirmationModal/    # Delete confirmation modal
│   ├── LoadingSpinner/       # Loading spinner component
│   ├── TodoFilters/          # Search and filter controls
│   ├── TodoForm/             # Add new task form
│   ├── TodoItem/             # Individual task component
│   └── TodoList/             # Task list container
├── services/            # API and data services
│   └── api.js              # Todo API service
├── styles/              # Global styles
│   └── index.css            # Global CSS
├── App.js               # Main application component
├── App.css              # App-specific styles
└── index.js             # Application entry point
```

## 🔧 API Integration

The application integrates with [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for demonstration purposes and includes:

- **Fallback System**: Local storage backup when API is unavailable
- **Error Handling**: Graceful degradation when network issues occur
- **Mock Data**: Pre-populated with sample tasks for immediate testing

### API Endpoints Used
- `GET /todos` - Fetch all tasks
- `POST /todos` - Create new task
- `PUT /todos/:id` - Update existing task
- `DELETE /todos/:id` - Delete task

## 🎨 Design System

### Color Palette
- **Primary**: `#667eea` (Purple gradient)
- **Success**: `#10b981` (Green)
- **Danger**: `#ef4444` (Red)
- **Neutral**: `#6b7280` (Gray)

### Typography
- **Font Family**: System fonts (San Francisco, Segoe UI, etc.)
- **Font Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales appropriately on different screen sizes

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Consistent styling with hover effects
- **Inputs**: Focus states with color-coded borders
- **Modals**: Overlay with backdrop blur

## 🛠️ Technical Implementation

### React Hooks Used
- `useState` - Local component state
- `useEffect` - Side effects and API calls
- `useMemo` - Optimized filtering and calculations

### State Management
- **Local State**: Component-level state for UI interactions
- **API State**: Server state with loading and error handling
- **Derived State**: Computed values from primary state

### Performance Optimizations
- **Memoization**: Filtered tasks are memoized to prevent unnecessary re-renders
- **Lazy Loading**: Components load only when needed
- **Optimistic Updates**: UI updates immediately, then syncs with server

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

### Mobile Features
- Touch-friendly buttons and inputs
- Optimized spacing for small screens
- Collapsible filter buttons
- Swipe gestures (future enhancement)

## 🧪 Testing

### Manual Testing Checklist
- [ ] Add new tasks
- [ ] Edit existing tasks
- [ ] Toggle task completion
- [ ] Delete tasks with confirmation
- [ ] Filter tasks by status
- [ ] Search tasks by title
- [ ] Test responsive design
- [ ] Test error scenarios
- [ ] Test offline functionality

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use the `gh-pages` package
- **AWS S3**: Upload the `build` folder to S3

## 🔮 Future Enhancements

### Planned Features
- **User Authentication**: Login/signup functionality
- **Task Categories**: Organize tasks by categories
- **Due Dates**: Set deadlines for tasks
- **Priority Levels**: Mark tasks as high/medium/low priority
- **Dark Mode**: Toggle between light and dark themes
- **Drag & Drop**: Reorder tasks by dragging
- **Bulk Actions**: Select multiple tasks for batch operations
- **Export/Import**: Backup and restore task data

### Technical Improvements
- **TypeScript**: Add type safety
- **Testing**: Unit and integration tests
- **PWA**: Progressive Web App features
- **Offline Support**: Service worker for offline functionality
- **Real-time Sync**: WebSocket integration for live updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the mock API
- [React](https://reactjs.org/) for the amazing framework
- [Create React App](https://create-react-app.dev/) for the development setup

---

**Built with ❤️ using React**

## Prompt
## I wrote down this Prompt :
- Create a fully functional To-Do List application using React.

**Requirements:**

1. **API Integration:**

   - Fetch tasks from a mock or real API (e.g., JSONPlaceholder or a custom endpoint).

   - Support CRUD operations (Create, Read, Update, Delete).

2. **Component Structure:**

   - Use reusable/common components such as TodoItem, TodoForm, and TodoList.

   - Maintain a clean folder structure (components, services, styles).

3. **Design & Styling:**

   - Apply modern, responsive CSS (use plain CSS or CSS Modules).

   - The UI should look clean and attractive with hover effects, spacing, and smooth animations  for adding/removing tasks.

4. **Enhancements:**

   - Implement a task filter (All, Completed, Pending).

   - Add a search bar to quickly find tasks.

   - Show a loading spinner while fetching data.

   - Include a confirmation popup before deleting a task.

5. **Code Quality:**

   - Use React hooks (useState, useEffect).

   - Write code that is well-commented and easy to understand.

   - Ensure proper error handling for API calls.

**Deliverables:**

   - React code (JSX + CSS).

   - Clear file/folder structure.

   - Example API response for testing.

   - Styled and fully functional in the browser.
