import React from 'react';
import PropTypes from 'prop-types';

const Biography = ({ imageUrl, className }) => {
  return (
    <div className={`container biography ${className}`}>
      <div className="banner">
        <img src={imageUrl} alt="about image" />
      </div>
      <div className="banner">
        <h3>Features We Provide</h3>
        <p>Get your appointments online in a very fast way without standing in long queues.</p>
        <p>Secure messaging on our portal allows you to send us a message if you want to report or request something from the hospital.</p>
        <p>Our hospital boasts highly qualified doctors who are experts in their fields, ensuring you receive the best care.</p>
        <p>We have integrated a chatbot that can help you by providing medicine recommendations for small issues like fever, cough, and more.</p>
      </div>
    </div>
  );
};

Biography.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Biography;
