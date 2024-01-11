import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout';
import { PuppleMemory } from './component/PuppleContext';
import { useState } from 'react';
function App() {
  const [loginMemberVo, setLoginMemberVo] = useState();


  return (
  <>
  <PuppleMemory.Provider value={obj}>
    <BrowserRouter>
      <Layout loginMemberVo = {obj} />
    </BrowserRouter>
  </PuppleMemory.Provider>
  </>
    );
}

export default App;
