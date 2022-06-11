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
    const stats = card.container.getElementsByClassName('stats')[0];

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

	const setGyroXY = (e) => {
		x = e.alpha / 180 - 1;
		y = e.beta / 180;
	};

    const render = () => {
		const rotate = `rotateY(${x * 1}deg)`;
		for (let i = 0; i < card.container.children.length; i++) {
			const img = card.container.children[i];
			// if (!(img instanceof HTMLImageElement)) continue;
			let [imgX, imgY] = img.dataset["position"]?.split(" ") || [0, 0];
			const mult = i * 4;
			const multX = mult * x;
			const multY = mult * y;
			imgX = parseInt(imgX) + multX;
			imgY = parseInt(imgY) + multY;
			const translate = `translate3D(${imgX}px, ${imgY}px, ${mult}px)`;
			const scale = `scale(${i == 0 ? 1.2 : 1})`;
			img.style.transform = translate + " " + rotate + " " + scale;
	    }

		stats.innerHTML  = `<pre>stats v.0.2</pre>`;
		stats.innerHTML += `<pre>win: ${winX}x${winY}</pre>`;
		stats.innerHTML += `<pre>x: ${Math.floor(x * 100)}</pre>`;
		stats.innerHTML += `<pre>y: ${Math.floor(y * 100)}</pre>`;
    };

    requestAnimationFrame(render);

	win.addEventListener("mousemove", e => {
		setMouseXY(e);
		requestAnimationFrame(render);
	});

	win.addEventListener('deviceorientation',e => {
		setGyroXY(e);
		requestAnimationFrame(render);
	});

	win.addEventListener("resize", e => {
		setWinXY();
		requestAnimationFrame(render);
	});

})(window, document);
