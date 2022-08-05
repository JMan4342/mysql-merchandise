const inventoryDisplay = document.querySelector("#inventory");

// http://localhost:8000/

fetch("http://localhost:8000/")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    const inventoryData = Object.values(data);
    console.log(inventoryData);
    inventoryData[1].forEach((item) => {
      const inventoryList =
        `<div><h3>` +
        item.name +
        `</h3><p>` +
        item.description +
        `</p></div>`;
      inventoryDisplay.insertAdjacentHTML("beforeend", inventoryList);
    });
  })
  .catch((err) => console.log(err));
