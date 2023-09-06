const menubtn = document.getElementById("menubtn")
const menusm  = document.getElementById("menusm")

menubtn.onclick = function () {
    if (menusm.style.display === "none" || menusm.style.display === "") {
      menusm.style.display = "flex";
    } else {
      menusm.style.display = "none";
    }
  };