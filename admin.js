function add() {
  const name = document.getElementById("name").value;
  const imageurl = document.getElementById("imgurl").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("desc").value;

  const newData = {
    name,
    imageurl,
    price,
    description,
  };

  fetch("http://localhost:3000/addData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data added:", data);
    })
    .catch((error) => {
      console.error("Error adding data:", error);
    });
  window.location.reaload();
}

const addWS = async () => {
  const response = await fetch("http://localhost:3000/run-puppeteer", {
    method: "GET",
  });
  if (response.ok) {
    console.log("Data added successfully.");
  } else {
    console.error("Failed to add data.");
  }
  window.location.reload();
};
