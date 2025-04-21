import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div className="w-100" style={{ height: '100vh' }}>
      {/* Header */}
      <nav className="navbar bg-primary text-white p-3">
        <div className="container justify-content-between">
          <h4 className="mb-0 text-white">My App</h4>
          <button
            className="btn btn-outline-light"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            Menu
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="p-5 bg-light">
        <Outlet />
      </div>

      {/* Right Offcanvas Menu */}
      <div
        className="offcanvas offcanvas-end text-light"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        style={{backgroundColor:'#920F0F'}}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body h-50">
          <ul className="list-unstyled h-50 p-2 d-flex flex-column justify-content-around">
            <li className='border-top border-bottom  border-light p-2 border-opacity-25'><Link to="/" className="link-light link-underline-opacity-0">Home</Link></li>
            <li className='border-top border-bottom  border-light p-2 border-opacity-25'><Link to="post" className="link-light link-underline-opacity-0">Post New timetable →</Link></li>
            <li className='border-top border-bottom  border-light p-2 border-opacity-25'><Link to="update" className="link-light link-underline-opacity-0">Update Timetable →</Link></li>
            <li className='border-top border-bottom  border-light p-2 border-opacity-25'><Link to="display" className="link-light link-underline-opacity-0">Display Timetable →</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Layout;
