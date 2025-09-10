import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import MapFrance from './components/MapFrance.jsx';


function Home() {
return (
<div style={{ padding: '1rem' }}>
<h1>Accueil</h1>
<p>Bienvenue ! Va sur l’onglet « Carte » pour voir la carte interactive.</p>
</div>
);
}


export default function App() {
return (
<div>
<Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/carte" element={<MapFrance />} />
</Routes>
</div>
);
}