import React, { useState } from 'react';
import './SteroidInfoPage.css';

const steroidsData = {
  Estrogens: [
    { name: '17β-Estradiol', info: 'Unsafe if over the limit for humans.' },
    { name: 'Estriol', info: 'Generally safer but should be controlled.' },
    { name: 'Estrone', info: 'Potentially unsafe if above limits for humans.' },
    { name: 'Diethylstilbestrol', info: 'Banned and highly unsafe for both animals and humans.' },
  ],
  Progestogens: [
    { name: 'Progesterone', info: 'Safe within limits, but caution required for human exposure.' },
    { name: 'Melengestrol acetate', info: 'Controlled use safe for animals and humans within legal limits.' },
    { name: 'Megestrol acetate', info: 'Safe if within limits, caution needed for human health.' },
    { name: 'Chlormadinone acetate', info: 'Controlled use recommended, unsafe for human consumption if over the limit.' },
  ],
  Androgens: [
    { name: '19-Nortestosterone', info: 'Unsafe and banned in many regions.' },
    { name: 'Metandienone', info: 'Banned, unsafe for animals and humans.' },
    { name: 'Boldenone', info: 'Illegal and unsafe for animals and humans.' },
    { name: 'Epitestosterone', info: 'Safer but needs monitoring in food products.' },
    { name: 'Testosterone', info: 'Safe if within legal limits, unsafe if exceeded.' },
  ],
};

const SteroidInfoPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  return (
    <div className="steroid-info-page">
      <h1>Learn About Steroids</h1>
      <div className="class-selection">
        {Object.keys(steroidsData).map((steroidClass) => (
          <div
            key={steroidClass}
            className="steroid-class-box"
            onClick={() => setSelectedClass(steroidClass)}
          >
            <h2>{steroidClass}</h2>
          </div>
        ))}
      </div>
      {selectedClass && (
        <div className="steroid-details">
          <h2>{selectedClass}</h2>
          <div className="steroid-cards">
            {steroidsData[selectedClass].map((steroid) => (
              <div key={steroid.name} className="steroid-card">
                <h3>{steroid.name}</h3>
                <p>{steroid.info}</p>
              </div>
            ))}
          </div>
          <button className="back-button" onClick={() => setSelectedClass(null)}>
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default SteroidInfoPage;
