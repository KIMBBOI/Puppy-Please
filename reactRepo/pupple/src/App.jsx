import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout';
import { AuthProvider } from './component/PuppleContext';
function App() {
  

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout  />
      </BrowserRouter>
    </AuthProvider>
    );
}

export default App;
