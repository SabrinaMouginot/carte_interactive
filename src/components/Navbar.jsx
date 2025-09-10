import { Link, NavLink } from 'react-router-dom';


const linkStyle = ({ isActive }) => ({
padding: '0.5rem 0.75rem',
textDecoration: 'none',
color: isActive ? '#111' : '#555',
background: isActive ? '#eaeaea' : 'transparent',
borderRadius: '8px',
});


export default function Navbar() {
return (
<nav style={{
display: 'flex', gap: '0.75rem', alignItems: 'center',
padding: '0.75rem 1rem', borderBottom: '1px solid #ddd',
position: 'sticky', top: 0, background: '#fff', zIndex: 10
}}>
<Link to="/" style={{ fontWeight: 700, color: '#111', textDecoration: 'none' }}>
Mon Site
</Link>
<NavLink to="/" style={linkStyle}>Accueil</NavLink>
<NavLink to="/carte" style={linkStyle}>Carte</NavLink>
</nav>
);
}