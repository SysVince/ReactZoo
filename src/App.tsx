
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Animals } from './components/Animals';
import { Animal } from './components/Animal';
import { Layout } from './components/Layout';
import { NotFound } from './components/NotFound';


function App() {
  return (
     <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Animals/>}></Route>
        <Route path="/animal/:id" element={<Animal/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Route>
    </Routes>
    
      </BrowserRouter> 
  
  );
}

export default App;
