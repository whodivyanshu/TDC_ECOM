const menubtn = document.getElementById("menubtn");
const menusm = document.getElementById("menusm");
const container = document.querySelector(".body4imgs");
const searchInput = document.querySelector('input[type="text"]');

let allProducts = [];

menubtn.onclick = function () {
  if (menusm.style.display === "none" || menusm.style.display === "") {
    menusm.style.display = "flex";
  } else {
    menusm.style.display = "none";
  }
};

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/getData");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched data:", data);
    allProducts = data;
    renderData(allProducts);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();

searchInput.addEventListener("input", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );
  renderData(filteredProducts);
}

function renderData(data) {
  const html = data.map((item) => {
    return `
        <div class="body4imgsdiv" onclick="redirectToComingSoon('${item.name}')">
          <img src="${item.imageurl}" alt="${item.title}">
          <h3>${item.name}</h3>
          <p> ${item.price}.00</p>
        </div>
      `;
  });

  container.innerHTML = html.join("");
}

function redirectToComingSoon(routeName) {
  window.location.href = "/product.html?name=" + routeName + "";
}
