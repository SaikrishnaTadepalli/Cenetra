import logo from "./logo.svg";
import "./App.css";

import Uploader from "./Uploader";
import APICall from "./APICall";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>HELLO</div>
        <Uploader></Uploader>
        <div>__________</div>
        <div>__________</div>
        <div>__________</div>
        <APICall></APICall>
      </header>
    </div>
  );
}

export default App;
