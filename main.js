// shim anim frame
window.requestAnimFrame = (() => {
	return  window.requestAnimationFrame       ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

((win, doc) => {
	const card = {};
	card["container"] = doc.getElementsByClassName('parallax')[0];
	for (let i = 0; i < card.container.children.length; i++) {
		const img = card.container.children[i];
		if (!img instanceof HTMLImageElement) continue;
		console.log(`Found parallax image: ${img.src}`);
		const [x, y] = img.dataset["position"]?.split(" ") || [0, 0];
		img.style.transform = `translate3D(${x}px, ${y}px, 0)`;
	}
})(window, document);

