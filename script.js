// Simple JavaScript for category filters and page actions.
var listingGrid = document.getElementById("listingGrid");
var cards = document.getElementsByClassName("listing-card");
var emptyState = document.getElementById("emptyState");
var activeCategory = "all";

function showMessage(message) {
    var toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add("show");
    setTimeout(function() { toast.classList.remove("show"); }, 2000);
}

function filterListings() {
    var visibleCount = 0;
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var category = card.getAttribute("data-category");
        card.hidden = !(activeCategory === "all" || category === activeCategory);
        if (!card.hidden) visibleCount++;
    }
    if (emptyState) emptyState.hidden = visibleCount !== 0;
}

// Category buttons show only matching listings.
var categoryButtons = document.querySelectorAll(".category-card");
for (var i = 0; i < categoryButtons.length; i++) {
    categoryButtons[i].addEventListener("click", function() {
        for (var j = 0; j < categoryButtons.length; j++) {
            categoryButtons[j].classList.remove("selected");
        }
        this.classList.add("selected");
        activeCategory = this.getAttribute("data-category");
        filterListings();
        document.getElementById("discover").scrollIntoView({behavior: "smooth"});
    });
}

// Stay links open the Hotels & Stays category.
var stayLinks = document.querySelectorAll("[data-category-link]");
for (var i = 0; i < stayLinks.length; i++) {
    stayLinks[i].addEventListener("click", function(event) {
        event.preventDefault();
        document.querySelector('.category-card[data-category="stay"]').click();
    });
}

// Sort listings by rating or name.
document.getElementById("sortSelect").addEventListener("change", function() {
    var sortType = this.value;
    var cardList = [];
    for (var i = 0; i < cards.length; i++) cardList.push(cards[i]);
    cardList.sort(function(a, b) {
        if (sortType === "rating") return Number(b.getAttribute("data-rating")) - Number(a.getAttribute("data-rating"));
        if (sortType === "name") return a.getAttribute("data-name").localeCompare(b.getAttribute("data-name"));
        return 0;
    });
    for (var i = 0; i < cardList.length; i++) listingGrid.appendChild(cardList[i]);
});

// Save or remove a listing from favourites (demo only).
var saveButtons = document.querySelectorAll(".save-btn");
for (var i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener("click", function() {
        this.classList.toggle("saved");
        this.innerText = this.classList.contains("saved") ? "♥" : "♡";
        showMessage(this.classList.contains("saved") ? "Added to favourites." : "Removed from favourites.");
    });
}

// Mobile navigation menu.
document.getElementById("menuToggle").addEventListener("click", function() {
    document.getElementById("mainNav").classList.toggle("open");
});
