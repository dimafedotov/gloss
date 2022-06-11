(function(win, doc) {
	console.log(win);
	console.log(doc);

	const card = {};
	card["container"] = doc.getElementsByClassName('parallax')[0];
	for (let i = 0; i < card.container.children.length; i++) {
		const img = card.container.children[i];
		if (!img instanceof HTMLImageElement) continue;
		console.log(`Found parallax image: ${img.src}`);
		const [x, y] = img.dataset["position"]?.split(" ") || [0, 0];
		img.style.position = "absolute";
		img.style.left = x;
		img.style.top = y;
	}
})(window, document);

