const menubtn = document.getElementById("menubtn");
const menusm = document.getElementById("menusm");
const container = document.querySelector(".body4imgs");

menubtn.onclick = function () {
  if (menusm.style.display === "none" || menusm.style.display === "") {
    menusm.style.display = "flex";
  } else {
    menusm.style.display = "none";
  }
};
function redirectToShop() {
  window.location.href = "/shop.html";
}


async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/getData");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched data:", data);
    renderData(data.slice(0, 4)); // Display only the first 4 items
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();

function renderData(data) {
  const html = data.map((item) => {
    return `
      <div class="body4imgsdiv">
        <img src="${item.imageurl}" alt="${item.title}">
        <h3>${item.name}</h3>
        <p> $${item.price}.00</p>
      </div>
    `;
  });

  container.innerHTML = html.join("");
}
