import { 
  BrowserRouter,
  Routes,
  Route 
} from "react-router-dom";
// components
import Error from 'components/Error';
import Form from 'components/Form';
import Home from 'components/Home';
import Layout from "components/Layout";
import List from 'components/List';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="home" element={<Home />} />
          <Route path="list" element={<List />} >
            <Route path="add" element={<Form />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;