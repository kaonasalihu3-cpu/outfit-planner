import { useEffect, useState } from "react";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost/backend/api/news.php")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch news");
        }
        return res.json();
      })
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: 40 }}>Loading news...</p>;
  }

  if (error) {
    return <p style={{ padding: 40, color: "red" }}>{error}</p>;
  }

  return (
    <div className="page news-page">
      <h1 style={{ padding: "20px 40px" }}>Latest News</h1>

      <div style={{ padding: "0 40px" }}>
        {news.map((item) => (
          <div
            key={item.id}
            style={{
              marginBottom: 30,
              paddingBottom: 20,
              borderBottom: "1px solid #ddd",
            }}
          >
            <h2>{item.title}</h2>
            <p style={{ opacity: 0.6, fontSize: 14 }}>
              {new Date(item.created_at).toLocaleDateString()}
            </p>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
