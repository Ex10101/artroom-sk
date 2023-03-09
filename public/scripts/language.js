const languageSelect = document.getElementById("language");

languageSelect.addEventListener("change", function() {
  const selectedValue = languageSelect.value;
  const currentUrl = window.location.href;

  if (selectedValue === "sk") {
    if (!currentUrl.includes("/sk")) {
      const newUrl = currentUrl.replace(/(^\w+:|^)\/\/([^\/]+)/, `$1//$2/sk`);
      window.location.href = newUrl;
    }
  } else {
    if (currentUrl.includes("/sk")) {
      const newUrl = currentUrl.replace("/sk", "");
      window.location.href = newUrl;
    }
  }
});