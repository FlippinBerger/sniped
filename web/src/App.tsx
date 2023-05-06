import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from './Home';
import GamePage from './GamePage';

const App = () => {
  const queryClient = new QueryClient();

  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game/:id' element={<GamePage />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App;
