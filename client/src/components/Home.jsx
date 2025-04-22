import React from 'react';
import './Home.css'; // You'll need to create this CSS file
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Home() {
  return (
    <div className="home-page">
      {/* Hero Banner */}
      <div
        style={{
          background: 'url("https://images.unsplash.com/photo-1571260899304-425eee4c7efc") center/cover',
          height: '60vh',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textShadow: '2px 2px 6px rgba(0,0,0,0.6)'
        }}
      >
        <h1 className="display-4 fw-bold">ABC Institute of Technology</h1>
        <p className="lead">Empowering Students, Building the Future</p>
      </div>

      {/* Quick Links */}
      <div className="quick-links-section">
        <h2>Quick Links</h2>
        <div className="quick-links-grid">
          <a href="/admissions" className="quick-link-card">
            <div className="quick-link-icon">📚</div>
            <h3>Admissions</h3>
            <p>Start your academic journey</p>
          </a>
          <a href="/academics" className="quick-link-card">
            <div className="quick-link-icon">🎓</div>
            <h3>Academics</h3>
            <p>Programs and courses</p>
          </a>
          <a href="/research" className="quick-link-card">
            <div className="quick-link-icon">🔬</div>
            <h3>Research</h3>
            <p>Innovation and discovery</p>
          </a>
          <a href="/campus-life" className="quick-link-card">
            <div className="quick-link-icon">🏛️</div>
            <h3>Campus Life</h3>
            <p>Student experience</p>
          </a>
        </div>
      </div>

      {/* News Section */}
      <div className="news-section">
        <h2>Campus News & Events</h2>
        <div className="news-grid">
          <div className="news-card">
            <div className="news-date">May 15, 2023</div>
            <h3>University Ranked Top 10 Nationally</h3>
            <p>University climbs to #8 in the annual national rankings.</p>
            <a href="/news/ranking" className="read-more">Read more →</a>
          </div>
          <div className="news-card">
            <div className="news-date">June 2, 2023</div>
            <h3>New Science Building Groundbreaking</h3>
            <p>Construction begins on state-of-the-art research facility.</p>
            <a href="/news/science-building" className="read-more">Read more →</a>
          </div>
          <div className="news-card">
            <div className="news-date">Upcoming: Aug 10, 2023</div>
            <h3>Fall Semester Orientation</h3>
            <p>Welcome events for new students beginning August 10th.</p>
            <a href="/events/orientation" className="read-more">Read more →</a>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events-list">
          <div className="event-item">
            <div className="event-date">
              <span className="event-day">15</span>
              <span className="event-month">JUN</span>
            </div>
            <div className="event-details">
              <h3>Alumni Reunion Weekend</h3>
              <p>Main Campus • 10:00 AM</p>
            </div>
          </div>
          <div className="event-item">
            <div className="event-date">
              <span className="event-day">20</span>
              <span className="event-month">JUN</span>
            </div>
            <div className="event-details">
              <h3>Summer Research Symposium</h3>
              <p>C Block • 9:00 AM</p>
            </div>
          </div>
          <div className="event-item">
            <div className="event-date">
              <span className="event-day">25</span>
              <span className="event-month">JUN</span>
            </div>
            <div className="event-details">
              <h3>Open House for Prospective Students</h3>
              <p>Admissions Office • 1:00 PM</p>
            </div>
          </div>
        </div>
        <button className="view-all-button">View All Events</button>
      </div>


      {/* Footer */}
      <div className="home-footer">
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>123 College Avenue</p>
          <p>Hyderabad, Telangana</p>
          <p>Phone: 123-456789</p>
          <p>Email: test@mail.com</p>
        </div>
        <div className="footer-social">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="#"><FaTwitter/></a>
            <a href="#"><FaLinkedin/></a>
            <a href="#"><FaInstagram/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;