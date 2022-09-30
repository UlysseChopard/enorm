const qs = new URL(document.location).searchParams;
if (qs.get("error")) {
  const errorBanner = document.getElementById("error-banner");
  console.log(errorBanner);
  errorBanner.classList.toggle("invisible");
  setTimeout(() => {
    errorBanner.classList.toggle("invisible");
  }, 1000);
}
