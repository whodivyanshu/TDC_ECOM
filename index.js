const menubtn = document.getElementById("menubtn");
const menusm = document.getElementById("menusm");

menubtn.onclick = function () {
  if (menusm.style.display === "none" || menusm.style.display === "") {
    menusm.style.display = "flex";
    fetchData();
  } else {
    menusm.style.display = "none";
  }
};

function fetchData() {
  fetch("http://localhost:3000/getData")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the response as JSON
    })
    .then((data) => {
      // Handle the fetched data here
      console.log(data.message); // Access the message property from the JSON
    })
    .catch((error) => {
      // Handle errors here
      console.error("Fetch error:", error);
    });
}
