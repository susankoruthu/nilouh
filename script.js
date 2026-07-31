document.getElementById("year").textContent = new Date().getFullYear();
document.querySelectorAll(".image-frame img").forEach((image) => {
  image.addEventListener("error", () => { image.style.display = "none"; });
});
document.querySelectorAll(".enquire").forEach((button) => {
  button.addEventListener("click", () => {
    window.open("https://www.instagram.com/nilouh.story?igsh=MXhwOWQxM3IzNGx6aw==", "_blank", "noopener");
  });
});
