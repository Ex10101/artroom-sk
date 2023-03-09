const languageSelect = document.getElementById("language");

languageSelect.addEventListener("change", function() {
  const selectedValue = languageSelect.value;

  if (selectedValue === "sk") {
    window.location.href = "/sk";
  } else {
    window.location.href = "/";
  }
});