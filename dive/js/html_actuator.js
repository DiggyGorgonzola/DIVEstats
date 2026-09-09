function HTMLActuator() {
  this.tileContainer    = document.querySelector(".tile-container");
  this.scoreContainer   = document.querySelector(".score-container");
  this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
  this.announcer        = document.querySelector(".announcer");
  this.currentlyUnlocked= document.querySelector(".currently-unlocked");
  this.seedQuest        = document.querySelector(".seed-quest");
  this.ScoreGraph       = document.querySelector(".graph");
  this.copyButton       = document.getElementById("copybutton");
  this.score = 0;
  this.score_points = JSON.parse(
    localStorage.getItem('chartData')
) || [];
  this.colors = []
  this.seedquest = JSON.parse(
    localStorage.getItem('seedQuest')
) || [];
  this.seedquest.forEach(quest => {
      quest.date = new Date(quest.date);
  });
  this.ao10 = []
  this.updateAo10();
  this.overlayPrimes = [7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 
    53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 
    131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197,
    199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277,
    281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367,373,379];
  this.lookuptable = {
  7: 0,
  11: 1,
  13: 2,
  17: 3,
  19: 4,
  23: 5,
  29: 6,
  31: 7,
  37: 8,
  41: 9,
  43: 10,
  47: 11,
  53: 12,
  59: 13,
  61: 14,
  67: 15,
  71: 16,
  73: 17,
  79: 18,
  83: 19,
  89: 20,
  97: 21,
  101: 22,
  103: 23,
  107: 24,
  109: 25,
  113: 26,
  127: 27,
  131: 28,
  137: 29,
  139: 30,
  149: 31,
  151: 32,
  157: 33,
  163: 34,
  167: 35,
  173: 36,
  179: 37,
  181: 38,
  191: 39,
  193: 40,
  197: 41,
  199: 42,
  211: 43,
  223: 44,
  227: 45,
  229: 46,
  233: 47,
  239: 48,
  241: 49,
  251: 50,
  257: 51,
  263: 52,
  269: 53,
  271: 54,
  277: 55,
  281: 56,
  283: 57,
  293: 58,
  307: 59,
  311: 60,
  313: 61,
  317: 62,
  331: 63,
  337: 64,
  347: 65,
  349: 66,
  353: 67,
  359: 68,
  367: 69,
  373: 70,
  379: 71,
  383: 72,
  389: 73,
  397: 74,
  401: 75,
  409: 76,
  419: 77,
  421: 78,
  431: 79,
  433: 80,
  439: 81,
  443: 82,
  449: 83,
  457: 84,
  461: 85,
  463: 86,
  467: 87,
  479: 88,
  487: 89,
  491: 90,
  499: 91,
  503: 92,
  509: 93,
  521: 94,
  523: 95,
  541: 96,
  547: 97,
  557: 98,
  563: 99,
  569: 100,
  571: 101,
  577: 102,
  587: 103,
  593: 104,
  599: 105,
  601: 106,
  607: 107,
  613: 108,
  617: 109,
  619: 110,
  631: 111,
  641: 112,
  643: 113,
  647: 114,
  653: 115,
  659: 116,
  661: 117,
  673: 118,
  677: 119,
  683: 120,
  691: 121,
  701: 122,
  709: 123,
  719: 124,
  727: 125,
  733: 126,
  739: 127,
  743: 128,
  751: 129,
  757: 130,
  761: 131,
  769: 132,
  773: 133,
  787: 134,
  797: 135,
  809: 136,
  811: 137,
  821: 138,
  823: 139,
  827: 140,
  829: 141,
  839: 142,
  853: 143,
  857: 144,
  859: 145,
  863: 146,
  877: 147,
  881: 148,
  883: 149,
  887: 150,
  907: 151,
  911: 152,
  919: 153,
  929: 154,
  937: 155,
  941: 156,
  947: 157,
  953: 158,
  967: 159,
  971: 160,
  977: 161,
  983: 162,
  991: 163,
  997: 164,
  1009: 165,
  1013: 166,
  1019: 167,
  1021: 168,
  1031: 169,
  1033: 170,
  1039: 171,
  1049: 172,
  1051: 173,
  1061: 174,
  1063: 175,
  1069: 176,
  1087: 177,
  1091: 178,
  1093: 179,
  1097: 180,
  1103: 181,
  1109: 182,
  1117: 183,
  1123: 184,
  1129: 185,
  1151: 186,
  1153: 187,
  1163: 188,
  1171: 189,
  1181: 190,
  1187: 191,
  1193: 192,
  1201: 193,
  1213: 194,
  1217: 195,
  1223: 196,
  1229: 197,
  1231: 198,
  1237: 199,
  1249: 200,
  1259: 201,
  1277: 202,
  1279: 203,
  1283: 204,
  1289: 205,
  1291: 206
};
  const ctx = document.querySelector(".graph");
  const backgroundColorPlugin = {
    id: 'backgroundColor',

    beforeDraw: (chart) => {
        const { ctx, width, height } = chart;

        ctx.save();
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    }
};
  this.chart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [{
      label: 'Points',
      data: this.score_points,
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--col1').trim(),
      borderColor: getComputedStyle(document.documentElement).getPropertyValue('--col1').trim(),
      pointRadius: 2,
      tension: .4,
      borderWidth: 2,
    },{
      label: 'Geometric Mean of 10',
      data: this.ao10,
      backgroundColor: "lime",
      borderColor: "lime",
      pointRadius: 2,
      tension: .4,
      borderWidth: 2,
    }]
  },
  plugins: [
    backgroundColorPlugin
  ],
  options: {
    scales: {
        x: {
            type: 'linear',
            position: 'bottom',
            ticks: {
                display: false
            },
        },
        y: {
            type:"logarithmic",
            beginAtZero: true
        }
    }
}
});

}

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;

  window.requestAnimationFrame(function () {
    self.clearContainer(self.tileContainer);

    grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        if (cell) {
          self.addTile(cell);
        }
      });
    });

    self.updateScore(metadata.score);
    self.updateBestScore(metadata.bestScore);

    if (metadata.over) self.message(metadata.over); // You lose.  There's no win condition.
  });
};

HTMLActuator.prototype.restart = function () {
  this.clearMessage();
  this.clearCurrentlyUnlocked();
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.removeFirstChild = function (container) {
  container.removeChild(container.firstChild);
};

// yes, global function, naughty.  what should I have done?
gcd = function(a, b) {
  if (b === 0)
    return a;
  return self.gcd(b, a % b);
};

HTMLActuator.prototype.createTile = function (tile, animate) {
  var self = this;

  var element   = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + gcd(tile.value, 1296000)];
  var animatedClasses = [];

  classes.push(positionClass);
  this.applyClasses(element, classes);

  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(element, classes); // Update the position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    animatedClasses.push("tile-merged");
    this.applyClasses(element, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    if (animate) {
      classes.push("tile-new");
      animatedClasses.push("tile-new");
    }
    this.applyClasses(element, classes);
  }

  var tileNumber = document.createElement("div");
  var tileNumberClasses = animatedClasses.slice(0);
  tileNumberClasses.push("tilenumber");
  var contentLength = String(tile.value).length;
  if (contentLength > 2) {
    if (contentLength > 6) {
      contentLength = 6;
    }
    tileNumberClasses.push("tile-small-" + contentLength);
  }
  this.applyClasses(tileNumber, tileNumberClasses);
  tileNumber.textContent = tile.value;
  element.appendChild(tileNumber);

  this.overlayPrimes.forEach(function (p) {
    if (tile.value % p == 0) {
      var tileOverlay = document.createElement("div");
      var tileOverlayClasses = animatedClasses.slice(0);
      tileOverlayClasses.push("tileoverlay");
      const index = self.lookuptable[p];

    if (tile.value % (p * p) === 0) {
        tileOverlay.style.backgroundPosition = `-100% ${-index * 100}%`
    } else if (tile.value % p === 0) {
        tileOverlay.style.backgroundPosition = `0% ${-index * 100}%`
    }
      self.applyClasses(tileOverlay, tileOverlayClasses);
      element.appendChild(tileOverlay);
    }
  });

  return element;
}

HTMLActuator.prototype.createMiniTile = function (value) { 
  var tile = new Tile ({x: null, y: null}, value);
  var tileElement = this.createTile(tile, false);
  tileElement.classList.add("minitile");
  return tileElement;
};
HTMLActuator.prototype.createSillyTile = function (value) {
  var q = this.createMiniTile(value.value);
  q.title = `Got this seed on ${value.date}`;
  return q;
}
HTMLActuator.prototype.addTile = function (tile) {
  var element = this.createTile(tile, true);

  // Put the tile on the board
  this.tileContainer.appendChild(element);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  if (position.x == null)
    return;
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScore = function (score) {
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  var tile = new Tile({x: null, y: null}, score);
  var tileElement = this.createTile(tile, false)
  this.scoreContainer.appendChild(tileElement);

  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
  }
};

HTMLActuator.prototype.updateBestScore = function (bestScore) {
  this.clearContainer(this.bestContainer);
  var tile = new Tile({x: null, y: null}, bestScore);
  var tileElement = this.createTile(tile, false)
  this.bestContainer.appendChild(tileElement);
};

HTMLActuator.prototype.announce = function (message) {
  var announce = document.createElement("p");
  announce.classList.add("announcement");
  announce.textContent = message;
  this.announcer.appendChild(announce);
  setTimeout(this.removeFirstChild.bind(this,this.announcer),2500);
};

HTMLActuator.prototype.message = function (game_over_data) {
  var type    = false ? "game-won" : "game-over";
  var message = false ? "You win!" : "Game over!";

  this.clearContainer(this.announcer);
  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;
  if ("tilesSeen" in game_over_data) {
    var seen = game_over_data.tilesSeen;
    seen.sort(function (a,b){return a-b});
    for (var i = seen.length - 2; i >= 0; i--)
      if (seen[i] == seen[i+1])
        seen.splice(i,1);

    this.clearContainer(this.currentlyUnlocked);

    for (var i = 0; i < seen.length; i++) {
        var seenElem = this.createMiniTile(seen[i]);
        if (game_over_data.tileTypes.indexOf(seen[i]) == -1) {
            seenElem.classList.add('ghost');
        }
        this.currentlyUnlocked.appendChild(seenElem);
    }
    this.currentlyUnlocked.classList.add("all-seeds-seen");
  }
  this.copyButton.style.display = "block";
};

HTMLActuator.prototype.clearMessage = function () {
  this.messageContainer.classList.remove("game-won", "game-over");
};

HTMLActuator.prototype.updateCurrentlyUnlocked = function (list) {
  this.currentlyUnlocked.classList.remove("hidden");
  this.currentlyUnlocked.classList.remove("all-seeds-seen");

  this.currentlyUnlocked.textContent = "";
  this.clearContainer(this.currentlyUnlocked);

  var self = this;
  list.forEach(function (value) {
    self.currentlyUnlocked.appendChild(self.createMiniTile(value));
  });
}

HTMLActuator.prototype.updateSeedQuest = function (list) {
  var self = this;
  list.forEach(function (value) {
    if (!self.seedquest.some(quest => quest.value === value)) {
      self.seedquest.push({value: value,date: new Date()})
    }

  })
  this.seedquest = this.seedquest.toSorted((a,b) => (a.value - b.value));
  localStorage.setItem("seedQuest", JSON.stringify(this.seedquest));
  this.clearContainer(this.seedQuest);
  this.seedquest.forEach(function (sq) {
    if (sq.value > 0) {
       self.seedQuest.appendChild(self.createSillyTile(sq));   
    }
  });
}

HTMLActuator.prototype.clearCurrentlyUnlocked = function () {
  this.currentlyUnlocked.classList.add("hidden");

  this.currentlyUnlocked.textContent = "";
  this.clearContainer(this.currentlyUnlocked);
};
HTMLActuator.prototype.addPoint = function (point) {
  this.score_points.push(point);
  localStorage.setItem("chartData", JSON.stringify(this.score_points));
  this.chart.data.datasets[0].data = this.score_points;
  this.chart.update();
}
HTMLActuator.prototype.refreshChart = function () {
  this.chart.data.datasets[0].data = this.score_points;
  this.chart.update();
}

HTMLActuator.prototype.updateAo10 = function () {
  console.log(this.score_points)
  this.ao10 = []
  for (let i = 0; i <= this.score_points.length - 10; i++) {
    var a = this.score_points.slice(i, i + 10)
    const product = a.reduce((product, value) => product * Math.pow(value.y,1/10), 1)
    this.ao10.push({x:i+9,y:product})
  }
}