// Feed 10 items at a time
const itemsPerPage = 10;
let pageCurrent = 1;

// Control card visibility based on current page
function paginate() {
	const allRows = document.querySelectorAll(".card-row");
	const totalItems = allRows.length;

	// Calculate start/end index for current page
	const startIndex = (pageCurrent - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	// Check which rows to hide
	allRows.forEach((row, index) => {
		const rowHide = index < startIndex || index >= endIndex;

		if (rowHide) {
			row.style.display = "none";
		} else {
			row.removeAttribute("style");
		}
	});

	// Update buttons based on current page
	const btnPrev = document.getElementById("btn-prev");
	if (pageCurrent === 1) {
		btnHide(btnPrev); // Hide if first page
	} else {
		btnShow(btnPrev);
	}

	const btnNext = document.getElementById("btn-next");
	if (pageCurrent * itemsPerPage >= totalItems) {
		btnHide(btnNext); // Hide if last page
	} else {
		btnShow(btnNext);
	}
}

function btnHide(button) {
	if (button) {
		button.style.display = "none";
	}
}

function btnShow(button) {
	if (button) {
		button.removeAttribute("style");
	}
}

// Event listeners for pagination buttons
document.getElementById("btn-prev").addEventListener("click", () => {
	if (pageCurrent > 1) {
		pageCurrent--;
		paginate();
		restorePageView();
	}
});

document.getElementById("btn-next").addEventListener("click", () => {
	const allRows = document.querySelectorAll(".card-row");
	if (pageCurrent * itemsPerPage < allRows.length) {
		pageCurrent++;
		paginate();
		restorePageView();
	}
});

// Reset position to continue browsing
function restorePageView() {
	const eventsList = document.getElementById("events-container");
	if (eventsList) {
		eventsList.scrollIntoView({ behavior: "smooth", block: "start" });
	}
}

paginate();
