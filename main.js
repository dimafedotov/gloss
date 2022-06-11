// shim anim frame
window.requestAnimFrame = (() => {
	return window.requestAnimationFrame    ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

((win, doc) => {

    let winX = 0;
    let winY = 0;

	const setWinXY = () => {
		winX = win.innerWidth;
		winY = win.innerHeight;
	};

	setWinXY();

    let x = 0;
    let y = 0;

	const setMouseXY = (e) => {
		const halfX = winX / 2;
		const halfY = winY / 2;
		x = (e.x - halfX) / halfX;
		y = (e.y - halfY) / halfY;
	};

	const parse = (v) => (parseInt(v) || 0);

	const render = () => {
		const cards = doc.getElementsByClassName('parallax');
		for (let c = 0; c < cards.length; c++) {
			const card = cards[c];
			if (!card.children) continue;

			const s = parseFloat(card.dataset["scale"]) || 100;
			const q = card.clientWidth / 512;

			for (let i = 0; i < card.children.length; i++) {
				const img = card.children[i];
				if (!(img instanceof HTMLImageElement)) continue;

				const [dX, dY, dZ] = img.dataset["xyz"]?.split(" ") || [];
				const tZ = parse(dZ);
				const tX = parse(dX) * q + x * tZ;
				const tY = parse(dY) * q + y * tZ;

				const translate = `translate(${tX}px, ${tY}px)`;
				const scale = `scale(${1 + (tZ / 25000 * s)})`;
				img.style.transform = translate + " " + scale;
			}
		}
	};

	win.addEventListener("mousemove", e => {
		setMouseXY(e);
		requestAnimationFrame(render);
	});

	win.addEventListener("resize", e => {
		setWinXY();
		requestAnimationFrame(render);
	});

    requestAnimationFrame(render);
})(window, document);
