import { useState, useEffect } from "react";

function About() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/my-make-up-brand/backend/api/content.php?page=about")
      .then(res => res.json())
      .then(data => {
        const contentObj = {};
        data.forEach(item => {
          contentObj[item.section] = item;
        });
        setContent(contentObj);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load content:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="page about-page">
        <section className="section narrow">
          <p>Loading...</p>
        </section>
      </div>
    );
  }

  return (
    <div className="page about-page">
      <section className="section narrow">
        <h1>{content.hero?.title || "About Our Brand"}</h1>
        <p>{content.hero?.content || "We believe that makeup should feel like skincare. Our mission is to create high-performance products that enhance your natural beauty while caring for your skin."}</p>
        <p>{content.mission?.content || "Founded in 2020, we've been committed to crafting innovative formulas that blend luxury and efficacy. Every product is cruelty-free, vegan-friendly, and designed for all skin types."}</p>
      </section>
    </div>
  );
}

export default About;
