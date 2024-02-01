import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css'; // Make sure to import the corresponding CSS file

const ProgressBar = ({ totalQuestions, currentQuestion }) => {
    const progressPercentage = (currentQuestion / totalQuestions) * 100;

    return (
        <div className="progress-bar">
            <div
                className="progress-bar-inner"
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
    );
};

ProgressBar.propTypes = {
    totalQuestions: PropTypes.number.isRequired,
    currentQuestion: PropTypes.number.isRequired,
};

export default ProgressBar;