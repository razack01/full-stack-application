// App.js
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './AppContent';
import '../src/App.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
