import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import MainContent from "./components/MainContent";

function App() {
  return (
    <Router>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </Router>
  );
}

export default App;
