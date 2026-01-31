import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Dashboard() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/my-make-up-brand/backend/api/messages.php")
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load messages:", err);
        setLoading(false);
      });
  }, []);

  if (!user || user.role !== "admin") {
    return (
      <div className="page dashboard-page">
        <section className="section narrow">
          <h1>Access Denied</h1>
          <p>You need admin privileges to access this page.</p>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="page dashboard-page">
      <section className="section">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user.name}!</p>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Manage Products</h3>
            <p>Add, edit, or remove products from the catalog.</p>
            <button className="btn btn-primary">Manage Products</button>
          </div>

          <div className="dashboard-card">
            <h3>Manage News</h3>
            <p>Create and edit news articles.</p>
            <button className="btn btn-primary">Manage News</button>
          </div>

          <div className="dashboard-card">
            <h3>Manage Content</h3>
            <p>Update website content and settings.</p>
            <button className="btn btn-primary">Edit Content</button>
          </div>
        </div>

        <div className="messages-section">
          <h2>Contact Messages</h2>
          {loading ? (
            <p>Loading messages...</p>
          ) : messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            <div className="messages-list">
              {messages.map((message) => (
                <div key={message.id} className="message-item">
                  <div className="message-header">
                    <strong>{message.name}</strong>
                    <span>{message.email}</span>
                    <small>{new Date(message.created_at).toLocaleDateString()}</small>
                  </div>
                  <p>{message.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
