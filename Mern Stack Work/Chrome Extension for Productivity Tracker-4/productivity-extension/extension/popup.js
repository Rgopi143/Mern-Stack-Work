chrome.storage.local.get("siteTimes", (data) => {
  const list = document.getElementById("report");
  const siteTimes = data.siteTimes || {};

  for (const site in siteTimes) {
    const li = document.createElement("li");
    li.textContent = `${site}: ${Math.round(siteTimes[site] / 60)} min`;
    list.appendChild(li);
  }
});
