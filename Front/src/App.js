import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Client from './Client';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path= '/' element ={<Client/>}> </Route>

          </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
