module.exports = function(render, interval){
	this.start = start;
	this.stop = stop;

	let timeoutId, lastTime;

	function start(){
		timeoutId = setTimeout(loop, 0);
		lastTime = Date.now();
		return lastTime;
	}

	function stop(){
		clearTimeout(timeoutId);
		return lastTime;
	}

	function loop(){
		let thisTime = Date.now();
    var deltaTime = thisTime - lastTime;
    var delay = Math.max(interval - deltaTime, 0);
    timeoutId = setTimeout(loop, delay);
    lastTime = thisTime + delay;
    render(thisTime);
	}
}
