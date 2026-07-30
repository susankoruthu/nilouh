document.getElementById("year").textContent = new Date().getFullYear();
document.querySelectorAll(".image-frame img").forEach((image) => {
  image.addEventListener("error", () => { image.style.display = "none"; });
});
document.querySelectorAll(".enquire").forEach((button) => {
  button.addEventListener("click", () => {
    const subject = encodeURIComponent(`Enquiry: ${button.dataset.product}`);
    const body = encodeURIComponent(`Hello Nilouh,\n\nI would like to know more about the ${button.dataset.product}.\n\nName:\nSize:\nQuestion:`);
    window.location.href = `mailto:hello@nilouh.com?subject=${subject}&body=${body}`;
  });
});
