import { useState, useEffect } from "react";

function Contact() {
  const [content, setContent] = useState({});
  const [contentLoading, setContentLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Mock data for testing
  const mockContent = {
    hero: {
      title: "Get In Touch",
      content: "Have questions about our products or need beauty advice? We'd love to hear from you!"
    },
    info: {
      content: "Email: hello@glowbeauty.com\nPhone: (555) 123-4567\nAddress: 123 Beauty Street, Glamour City, GC 12345"
    }
  };

  useEffect(() => {
    fetch("http://localhost/my-make-up-brand/backend/api/content.php?page=contact")
      .then(res => res.json())
      .then(data => {
        const contentObj = {};
        data.forEach(item => {
          contentObj[item.section] = item;
        });
        setContent(contentObj);
        setContentLoading(false);
      })
      .catch(err => {
        console.error("Failed to load content:", err);
        setContentLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const response = await fetch("http://localhost/my-make-up-brand/backend/api/contacts.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  if (contentLoading) {
    return (
      <div className="page contact-page">
        <section className="section narrow">
          <p>Loading...</p>
        </section>
      </div>
    );
  }

  return (
    <div className="page contact-page">
      <section className="section narrow">
        <h1>{content.hero?.title || "Contact Us"}</h1>
        <p>
          {content.hero?.content || "Have questions or feedback? We'd love to hear from you. Reach out to our team at hello@glammuse.com."}
        </p>
        <p>
          {content.info?.content || "Follow us on social media for the latest tips, trends, and exclusive offers!"}
        </p>

        {success && (
          <div className="success-box">
            Thank you for your message! We'll get back to you soon.
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={formLoading}>
            {formLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default Contact;
