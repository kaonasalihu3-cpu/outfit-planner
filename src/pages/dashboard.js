import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return (
      <div className="page">
        <section className="section narrow">
          <h1>Access Denied</h1>
          <p>You don't have permission to access this page.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="page dashboard-page">
      <section className="section narrow">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user.name}! This is the admin dashboard.</p>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Manage Products</h3>
            <p>Add, edit, or remove products from the catalog.</p>
            <button className="btn btn-primary">Go to Products</button>
          </div>

          <div className="dashboard-card">
            <h3>Manage News</h3>
            <p>Post updates and announcements.</p>
            <button className="btn btn-primary">Go to News</button>
          </div>

          <div className="dashboard-card">
            <h3>View Messages</h3>
            <p>Check contact form submissions.</p>
            <button className="btn btn-primary">View Messages</button>
          </div>

          <div className="dashboard-card">
            <h3>Manage Content</h3>
            <p>Update website content and settings.</p>
            <button className="btn btn-primary">Edit Content</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
