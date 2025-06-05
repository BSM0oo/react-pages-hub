fetch('economic_dashboard_data.json')
  .then(response => response.json())
  .then(data => {
    const pre = document.createElement('pre');
    pre.textContent = JSON.stringify(data, null, 2);
    document.getElementById('chart').appendChild(pre);
  })
  .catch(err => {
    console.error('Failed to load data', err);
  });
