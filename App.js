import React, { useState } from 'react';

const App = () => {
  const [apps, setApps] = useState([]);

  const checkApps = () => {
    const appsToCheck = [
      { name: 'Twitter', urlScheme: 'twitter://' },
      { name: 'Instagram', urlScheme: 'instagram://' },
      { name: 'Facebook', urlScheme: 'fb://' },
    ];

    const detectedApps = [];

    appsToCheck.forEach(app => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = app.urlScheme;

      iframe.onload = () => {
        detectedApps.push({ name: app.name, installed: true });
        setApps([...detectedApps]);
      };

      iframe.onerror = () => {
        detectedApps.push({ name: app.name, installed: false });
        setApps([...detectedApps]);
      };

      document.body.appendChild(iframe);

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    });
  };

  return (
    <div>
      <h1>App Detector</h1>
      <button onClick={checkApps}>Detect Installed Apps</button>
      <ul>
        {apps.map((app, index) => (
          <li key={index}>
            {app.name}: {app.installed ? 'Installed' : 'Not Installed'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
