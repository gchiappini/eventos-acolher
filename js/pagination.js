// Feed 10 items at a time
const itemsPerPage = 10;
let pageCurrent = 1;

// Function to control card visibility based on current page
function paginate() {
	const allRows = document.querySelectorAll(".card-row");
	const totalItems = allRows.length;

	// Calculate the start/end index for current page
	const startIndex = (pageCurrent - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	// Check which rows to hide
	allRows.forEach((row, index) => {
		const rowHide = index < startIndex || index >= endIndex;

		if (rowHide) {
			row.style.display = "none";
		} else {
			row.removeAttribute("style"); // Clear inline styling
		}
	});

	// Update buttons based on current page
	const btnPrev = document.getElementById("btn-prev");
	if (pageCurrent === 1) {
		btnHide(btnPrev); // Hide if on first page
	} else {
		btnShow(btnPrev); // Show if not on first page
	}

	const btnNext = document.getElementById("btn-next");
	if (pageCurrent * itemsPerPage >= totalItems) {
		btnHide(btnNext); // Hide if on last page
	} else {
		btnShow(btnNext); // Show if more pages are available
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
	}
});

document.getElementById("btn-next").addEventListener("click", () => {
	const allRows = document.querySelectorAll(".card-row");
	if (pageCurrent * itemsPerPage < allRows.length) {
		pageCurrent++;
		paginate();
	}
});

paginate();
