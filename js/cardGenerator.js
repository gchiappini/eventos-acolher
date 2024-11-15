// Build HTML fetching info from cardInfo.js
function generateEvent(container, title, summary, date, eventLink, recordingLink) {
	var cardSection = document.createElement("div");
	cardSection.classList.add("card-section");

	var hiddenDate = document.createElement("input");
	hiddenDate.setAttribute("type", "hidden");
	hiddenDate.setAttribute("value", date);
	cardSection.appendChild(hiddenDate);

	var cardDate = document.createElement("div");
	cardDate.classList.add("card-date");

	var dateDay = document.createElement("div");
	dateDay.classList.add("card-day");
	dateDay.textContent = date.split("-")[2];
	var dateMonth = document.createElement("div");
	dateMonth.classList.add("card-month");
	dateMonth.textContent = date.split("-")[1];
	cardDate.appendChild(dateDay);
	cardDate.appendChild(dateMonth);

	var cardMain = document.createElement("div");
	cardMain.classList.add("card-main");

	var animRight = document.createElement("span");
	animRight.classList.add("animRight")
	var animDown = document.createElement("span");
	animDown.classList.add("animDown")
	var animLeft = document.createElement("span");
	animLeft.classList.add("animLeft")
	var animUp = document.createElement("span");
	animUp.classList.add("animUp")
	cardMain.appendChild(animRight);
	cardMain.appendChild(animDown);
	cardMain.appendChild(animLeft);
	cardMain.appendChild(animUp);

	var cardInfo = document.createElement("div");
	cardInfo.classList.add("card-block", "card-info");

	var cardTitle = document.createElement("h3");
	cardTitle.classList.add("card-title");
	cardTitle.textContent = title;
	var cardSummary = document.createElement("p");
	cardSummary.classList.add("card-summary");
	cardSummary.textContent = summary;
	cardInfo.appendChild(cardTitle);
	cardInfo.appendChild(cardSummary);

	var cardAside = document.createElement("div");
	cardAside.classList.add("card-block", "card-aside");

	var guestPortrait = document.createElement("div");
	guestPortrait.classList.add("portrait");

	// Normalize vowels
	function removeDiacritics(str) {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}

	// Set portrait image path by matching filename with guest's name and surname extracted from the card summary
	// E.g. "John Doe, renowned professor at..." => Path must be "img/portrait/john_doe"
	// Extension must be .JPEG
	var guestName = summary.split(/[ ,]/).slice(0, 2).join("_");
	guestName = removeDiacritics(guestName).toLowerCase();
	var portraitSrc = ("url(img/portrait/") + guestName + (".jpeg");
	guestPortrait.style.backgroundImage = portraitSrc;

	var linkButton = document.createElement("a");
	var eventDate = new Date(date).setUTCHours(0, 0, 0, 0);
	var currentDate = new Date().setUTCHours(0, 0, 0, 0);

	if (eventDate >= currentDate) {
		linkButton.classList.add("card-button", "button-event");
		linkButton.href = eventLink;
		linkButton.textContent = "Acessar";
	} else {
		linkButton.classList.add("card-button", "button-recording");
		linkButton.href = recordingLink;
		linkButton.textContent = "Gravação";
	}

	cardAside.appendChild(guestPortrait);
	cardAside.appendChild(linkButton);

	var cardAudience = document.createElement("details");
	cardAudience.classList.add("card-block", "card-audience");

	var audienceHeader = document.createElement("summary");
	var audienceHeaderText = document.createElement("span");
	audienceHeaderText.textContent = "Público-alvo";
	audienceHeader.appendChild(audienceHeaderText);

	var tagsContainer = document.createElement("div");
	tagsContainer.classList.add("card-tags");

		// Dummy tags
		var cardTag1 = document.createElement("div");
		cardTag1.classList.add("tag", "codando");
		cardTag1.textContent = "Codando";
		var cardTag2 = document.createElement("div");
		cardTag2.classList.add("tag", "comunicando");
		cardTag2.textContent = "Comunicando";
		var cardTag3 = document.createElement("div");
		cardTag3.classList.add("tag", "cuidando");
		cardTag3.textContent = "Cuidando";
		var cardTag4 = document.createElement("div");
		cardTag4.classList.add("tag", "desembolando");
		cardTag4.textContent = "Desembolando";
		var cardTag5 = document.createElement("div");
		cardTag5.classList.add("tag", "endireitando");
		cardTag5.textContent = "Endireitando";
		var cardTag6 = document.createElement("div");
		cardTag6.classList.add("tag", "engenheirando");
		cardTag6.textContent = "Engenheirando";
		var cardTag7 = document.createElement("div");
		cardTag7.classList.add("tag", "ensinando");
		cardTag7.textContent = "Ensinando";
		var cardTag8 = document.createElement("div");
		cardTag8.classList.add("tag", "negociando");
		cardTag8.textContent = "Negociando";
		var cardTag9 = document.createElement("div");
		cardTag9.classList.add("tag", "projetando");
		cardTag9.textContent = "Projetando";
		var cardTag10 = document.createElement("div");
		cardTag10.classList.add("tag", "veterinando");
		cardTag10.textContent = "Veterinando";
		tagsContainer.appendChild(cardTag1);
		tagsContainer.appendChild(cardTag2);
		tagsContainer.appendChild(cardTag3);
		tagsContainer.appendChild(cardTag4);
		tagsContainer.appendChild(cardTag5);
		tagsContainer.appendChild(cardTag6);
		tagsContainer.appendChild(cardTag7);
		tagsContainer.appendChild(cardTag8);
		tagsContainer.appendChild(cardTag9);
		tagsContainer.appendChild(cardTag10);

	cardAudience.appendChild(audienceHeader);
	cardAudience.appendChild(tagsContainer);

	cardMain.appendChild(cardInfo);
	cardMain.appendChild(cardAside);
	cardMain.appendChild(cardAudience);

	if (eventDate < currentDate) {
		cardSection.classList.add("finished-event");
	} else if (eventDate === currentDate) {
		cardMain.classList.add("current-event");
	}

	cardSection.appendChild(cardDate);
	cardSection.appendChild(cardMain);

	insertEventsInOrder(container, cardSection, eventDate);
}

// Order events chronologically, highest at the top
function insertEventsInOrder(container, newEvent) {
	var events = container.querySelectorAll(".card-section");

	if (events.length === 0) {
		container.appendChild(newEvent);
		return;
	}

	var newEventDate = new Date(newEvent.querySelector("input[type='hidden']").value);

	for (var i = events.length - 1; i >= 0; i--) {
		var currentEvent = events[i];
		var currentEventDate = new Date(currentEvent.querySelector("input[type='hidden']").value);

		if (newEventDate < currentEventDate) {
			container.insertBefore(newEvent, currentEvent.nextSibling);
			return;
		}
	}

	container.insertBefore(newEvent, container.firstChild);
}
