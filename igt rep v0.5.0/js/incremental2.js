//timer for persec functions
var Timer = window.setInterval(function(){tick()}, 1000)

// function to format large numbers with commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// global variables
gameData = {
	money: 0.0,
	payPerTick: 0.0,
	payPerClick: 0.25,
	influence: 0.0,
	infPerTick: 0.0,
	buildings: {
		bitcoinMiner: {cost:2500, payPerTick:10, count:0},
		stockTradeBots: {cost:6000, payPerTick:20, count:0},
		// bitcoinMiner3: {cost:2500, payPerTick:10, count:0},
		// bitcoinMiner4: {cost:2500, payPerTick:10, count:0},
		// bitcoinMiner5: {cost:2500, payPerTick:10, count:0},
		// bitcoinMiner6: {cost:2500, payPerTick:10, count:0},
		// bitcoinMiner7: {cost:2500, payPerTick:10, count:0},
		// bitcoinMiner8: {cost:2500, payPerTick:10, count:0},
		// bitcoinMiner9: {cost:2500, payPerTick:10, count:0},
		// bitcoinMiner10: {cost:2500, payPerTick:10, count:0},
		// bitcoinMiner11: {cost:2500, payPerTick:10, count:0},
		// bitcoinMiner12: {cost:2500, payPerTick:10, count:0},
		// bitcoinMiner13: {cost:2500, payPerTick:10, count:0},
		// bitcoinMiner14: {cost:2500, payPerTick:10, count:0},
		// bitcoinMiner15: {cost:2500, payPerTick:10, count:0},
		// bitcoinMiner16: {cost:2500, payPerTick:10, count:0},
		// bitcoinMiner17: {cost:2500, payPerTick:10, count:0},
		// bitcoinMiner18: {cost:2500, payPerTick:10, count:0},
		// bitcoinMiner19: {cost:2500, payPerTick:10, count:0}
	},
	jobs: {
		minWageJob: {cost:25, payPerTick:5, infPerTick:0.2, count:0},
	},
	upgrades: {
		shiftLeader: {cost:100, payPerTick:5, infPerTick:0.5, count:0},
		assistantMan: {cost:300, payPerTick:5, infPerTick:1, count:0},
		generalMan: {cost:600, payPerTick:10, infPerTick:1.5, count:0},
	},
	sideJobs: {
		
	}
}

// clicker function
function getMoney() {
	gameData.money = gameData.money + gameData.payPerClick;
	document.getElementById("money").innerHTML = numberWithCommas(gameData.money.toFixed(2));
};

function build(building) {
	if (gameData.money >= gameData.buildings[building].cost) {
		gameData.money -= gameData.buildings[building].cost;
		gameData.buildings[building].count += 1;
		gameData.buildings[building].cost = gameData.buildings[building].cost * Math.pow(1.01,gameData.buildings[building].count);
		document.getElementById(building+".cost").innerHTML = numberWithCommas(gameData.buildings[building].cost.toFixed(0));
		gameData.payPerTick += gameData.buildings[building].payPerTick;
		document.getElementById("money").innerHTML = numberWithCommas(gameData.money.toFixed(2));
		document.getElementById("payPerTick").innerHTML = numberWithCommas(gameData.payPerTick.toFixed(1));
	}
}

function job(job) {
	if (gameData.money >= gameData.jobs[job].cost) {
		gameData.money -= gameData.jobs[job].cost;
		gameData.jobs[job].count += 1;
		gameData.payPerTick += gameData.jobs[job].payPerTick;
		gameData.infPerTick += gameData.jobs[job].infPerTick;
		document.getElementById(job+".cost").innerHTML = "Bought!"
	}
}

function upgrade(upgrade) {
	if (gameData.influence >= gameData.upgrades[upgrade].cost) {
		gameData.upgrades[upgrade].count += 1;
		gameData.payPerTick += gameData.upgrades[upgrade].payPerTick;
		gameData.infPerTick += gameData.upgrades[upgrade].infPerTick;
		document.getElementById(upgrade+"2").style.display = "none";
	}
}

function tick() {
	for (var propt in gameData.buildings) {
		if (gameData.money >= gameData.buildings[propt].cost) {
			document.getElementById(propt).disabled = false;
		} else {
			document.getElementById(propt).disabled = true;
		}
	}
	for (var propt in gameData.upgrades) {
		if (gameData.upgrades[propt].count > 0) {
			document.getElementById(propt).disabled = true;
			document.getElementById(propt+"2").style.display = "none";
		}
		if (gameData.influence >= gameData.upgrades[propt].cost && gameData.upgrades[propt].count < 1) {
			document.getElementById(propt).disabled = false;
		}
	}
	for (var propt in gameData.jobs) {
		if (gameData.jobs[propt].count > 0) {
			document.getElementById(propt).disabled = true;
			document.getElementById(propt+".cost").innerHTML = "Bought!"
		}
		if (gameData.money >= gameData.jobs[propt].cost && gameData.jobs[propt].count < 1) {
			document.getElementById(propt).disabled = false;
		}
	}
	
	gameData.money += gameData.payPerTick;
	gameData.influence += gameData.infPerTick;
	document.getElementById("money").innerHTML = numberWithCommas(gameData.money.toFixed(2));
	document.getElementById("payPerTick").innerHTML = numberWithCommas(gameData.payPerTick.toFixed(1));
	document.getElementById("influence").innerHTML = numberWithCommas(gameData.influence.toFixed(1));
	document.getElementById("infPerTick").innerHTML = numberWithCommas(gameData.infPerTick.toFixed(1));
}

function Update() {

}

function save() {
	localStorage.setItem('gameSave', JSON.stringify(gameData));
	alert('Your progress has been saved!');
}

function expo() {
	document.getElementById('save').value = btoa(localStorage.getItem('gameSave'));
}

function load() {
	localStorage.setItem('gameSave', atob(document.getElementById('save').value));
	gameData = localStorage.getItem('gameSave');
	location.reload(true);
}

function reset() {
	delete localStorage['gameSave'];
	location.reload(true);
}

window.onload = function() {
	if (localStorage.getItem('gameSave')!=null) {
		gameData = JSON.parse(localStorage.getItem('gameSave'));
	};
	for (var propt in gameData.buildings) {
		document.getElementById(propt+".cost").innerHTML = gameData.buildings[propt].cost;
	}
}
 
$(document).ready(function(){
    $(".nav-tabs a").click(function(){
        $(this).tab('show');
    });
});