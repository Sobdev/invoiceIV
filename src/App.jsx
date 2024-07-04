// src/App.jsx
import { useState } from 'react';
import GoogleAuth from './components/GoogleAuth';
import InvoiceSync from './components/InvoiceSync';

function App() {
  const [authResponse, setAuthResponse] = useState(null);

  return (
    <div className="App">
      <h1>Invoice Sync App</h1>
      <GoogleAuth onAuthSuccess={setAuthResponse} />
      {authResponse && <InvoiceSync authResponse={authResponse} />}
    </div>
  );
}

export default App;
