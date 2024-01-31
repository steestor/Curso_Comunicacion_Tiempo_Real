import "@mdi/font/css/materialdesignicons.min.css";
import "bootstrap5/dist/css/bootstrap.min.css";
import "devextreme/dist/css/dx.light.css";
import "./App.css";
import DxButton from "devextreme-react/button";
import DxTextBox from "devextreme-react/text-box";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="row">
          <div className="col-6">
            <DxButton text="PRUEBA" />
            <DxTextBox></DxTextBox>
          </div>
          <div className="col-6 mdi mdi-numeric">EE</div>
        </div>
      </header>
    </div>
  );
}

export default App;
