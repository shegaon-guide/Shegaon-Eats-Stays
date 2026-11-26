// Load and display the selected place using the id in the page URL.
var params = new URLSearchParams(window.location.search);
var placeId = params.get("id");
var selectedPlace = null;

if (typeof places !== "undefined" && Array.isArray(places)) {
  for (var i = 0; i < places.length; i++) {
    if (String(places[i].id) === String(placeId)) {
      selectedPlace = places[i];
      break;
    }
  }
}

function escapeHTML(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, function(ch) {
    return {"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"}[ch];
  });
}

function renderPlaceDetails() {
  var box = document.getElementById("placeDetails");
  if (!box) return;

  if (!selectedPlace) {
    box.innerHTML = '<div class="not-found"><h2>Place details unavailable</h2><p>Please return to the home page and select a place.</p><a class="view-details" href="index.html">Back to home</a></div>';
    return;
  }

  var phone = selectedPlace.phone || "Not available";
  var callButton = selectedPlace.call
    ? '<a class="detail-action call-action" href="' + escapeHTML(selectedPlace.call) + '">Call now</a>'
    : '';
  var mapButton = selectedPlace.map
    ? '<a class="detail-action map-action" href="' + escapeHTML(selectedPlace.map) + '" target="_blank" rel="noopener">Get directions</a>'
    : '';
  var photo = selectedPlace.image || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85";

  box.innerHTML =
    '<div class="detail-photo"><img src="' + escapeHTML(photo) + '" alt="' + escapeHTML(selectedPlace.name) + '" onerror="this.onerror=null;this.src=\'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85\';"><span>' + escapeHTML(selectedPlace.type || selectedPlace.category || "LOCAL PLACE") + '</span></div>' +
    '<div class="detail-content"><div class="eyebrow dark-eyebrow">SHEGAON EATS & STAYS</div>' +
    '<h1>' + escapeHTML(selectedPlace.name) + '</h1>' +
    '<p class="detail-description">' + escapeHTML(selectedPlace.description || "Explore this place in Shegaon.") + '</p>' +
    '<div class="detail-rating" id="currentRating">★ ' + escapeHTML(selectedPlace.rating || "New") + ' <small>Listing rating</small></div>' +
    '<div class="detail-info"><b>Speciality</b><p>' + escapeHTML(selectedPlace.dishes || "—") + '</p></div>' +
    '<div class="detail-info"><b>Address</b><p>' + escapeHTML(selectedPlace.address || "Please contact the business for its address.") + '</p></div>' +
    '<div class="detail-info"><b>Phone</b><p>' + escapeHTML(phone) + '</p></div>' +
    '<div class="detail-buttons">' + callButton + mapButton + '</div></div>';

  var reportPlace = document.getElementById("reportPlace");
  if (reportPlace) reportPlace.value = selectedPlace.name;
}

function showReviews() {
  var reviewList = document.getElementById("reviewList");
  if (reviewList) reviewList.innerHTML = '<p class="no-reviews">No reviews added yet.</p>';
}

var reportToggle = document.getElementById("reportToggle");
var reportPanel = document.getElementById("reportPanel");
if (reportToggle && reportPanel) {
  reportToggle.addEventListener("click", function() {
    var opening = reportPanel.hidden;
    reportPanel.hidden = !opening;
    reportToggle.setAttribute("aria-expanded", String(opening));
    if (opening) reportPanel.scrollIntoView({behavior:"smooth", block:"start"});
  });
}

["reviewForm", "reportForm"].forEach(function(id) {
  var form = document.getElementById(id);
  if (form) form.addEventListener("submit", function(event) { event.preventDefault(); });
});

renderPlaceDetails();
showReviews();
