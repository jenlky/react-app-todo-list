import React from "react";

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-header">
        <div className="landing-header-main">Learn Better, Learn Faster</div>
        <div className="landing-header-secondary">
          StudyLah promotes active recall by enabling you to have an overview of
          your study topics and drill down onto each individual topic.
        </div>
        <div className="landing-btn-group">
          <a href="/users" className="landing-btn">
            Take a Look
          </a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
