const presence = new Presence({
		clientId: "809898713996066827",
	}),
	tmb = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			smallImageKey: "google",
			smallImageText: "Google",
			startTimestamp: tmb,
		},
		path = document.location.pathname.toLowerCase(),
		showcon = await presence.getSetting<boolean>("showContact");
	// Home Page
	if (path === "/" || path.includes("/intl/")) {
		presenceData.largeImageKey = "https://i.imgur.com/lkQjuwL.png";
		presenceData.details = "Home page";
	} else if (path === "/web/authentication") {
		presenceData.largeImageKey = "https://i.imgur.com/lkQjuwL.png";
		presenceData.details = "Authentication page";
	} else if (path === "/web/conversations") {
		presenceData.details = "Browsing conversations";
		presenceData.largeImageKey = "https://i.imgur.com/lkQjuwL.png";
	} else if (
		path.includes("/web/conversations/") &&
		path !== "/web/conversations/new"
	) {
		// checking parameters
		if (!showcon)
			presenceData.state = "Hidden (adjustable in Presence settings)";
		else {
			presenceData.state = document
				.querySelectorAll(".title-container")[0]
				.querySelector("div > span > h2").textContent;
		}
		presenceData.details = "Reading messages from:";
		presenceData.largeImageKey = "https://i.imgur.com/lkQjuwL.png";
	} else if (path === "/web/conversations/new") {
		presenceData.largeImageKey = "https://i.imgur.com/lkQjuwL.png";
		presenceData.details = "New conversation page";
	} else if (path === "/web/settings") {
		presenceData.largeImageKey = "https://i.imgur.com/lkQjuwL.png";
		presenceData.details = "Browsing settings";
	} else {
		presenceData.largeImageKey = "https://i.imgur.com/lkQjuwL.png";
		presenceData.details = "Browsing on Google Messages";
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
