document.getElementById("explore-btn").addEventListener("click", function () {
  window.location.href = "require.html";
  setTimeout(() => {
    window.location.href = "require.html"; // Chuyển hướng sau 1 giây
  }, 1000); // Thời gian trễ 1 giây (1000 milliseconds)
});
