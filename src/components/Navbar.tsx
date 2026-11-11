import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand bg-body-tertiary mb-4">
      <div className="container">
        <NavLink className="navbar-brand" to="/">Contents of Table</NavLink>
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/recipes">Recipes</NavLink>
          <NavLink className="nav-link" to="/search">Search</NavLink>
          <NavLink className="nav-link" to="/recipes/new">Add New Recipe</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;