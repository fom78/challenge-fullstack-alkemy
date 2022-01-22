import  {useEffect, useState} from 'react';
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
// Service
import FinanceService from 'services/finance.service';

function App() {
  const [operations, setOperations] = useState([]);
  const [refreshList, setRefreshList] = useState(true);

  useEffect(() => {
    if (refreshList){
        setRefreshList(false)
        FinanceService.getAll()
          .then((response) => {
            const operationsFounded = response.data
            setOperations(operationsFounded)
          })
          .catch((e) => {
            console.log(e)
          })
    }
  }, [refreshList]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home operations={operations}/>} /> 
          <Route path="home" element={<Home operations={operations}/>} />
          <Route path="list" element={<List operations={operations}/>} >
            <Route path="add" element={<Form setRefreshList={setRefreshList} />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;