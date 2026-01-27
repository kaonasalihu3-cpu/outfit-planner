import { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost/my-make-up-brand/backend/api/news.php")
      .then(res => res.json())
      .then(setNews);
  }, []);

  return (
    <div>
      <h1>News</h1>
      {news.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
          {item.image && <img src={item.image} width="200" />}
        </div>
      ))}
    </div>
  );
}
