import React from "react";

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing-header">
        <div className="landing-header-main">Learn Better, Learn Faster</div>
        <div className="landing-header-secondary">
          Promotes active recall by allowing an overview of your study topics
          and letting you drill down into each sub-topic.
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
