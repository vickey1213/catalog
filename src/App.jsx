import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Detail from './components/Detail';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/item/:slug" element={<Detail />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
