let storedText;

// https://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-liks
if (!String.linkifyGrun) {
  String.prototype.linkifyGrun = function () {
    // http://, https://, ftp://
    let urlPattern =
      /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

    // www. sans http:// or https://
    let pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

    // Email addresses
    let emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

    return this.replace(
      urlPattern,
      '<a href="$&" target="_blank">Time Calc</a>'
    )
      .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
      .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
  };
}

if (!String.linkifyVideo) {
  String.prototype.linkifyVideo = function () {
    // http://, https://, ftp://
    let urlPattern =
      /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

    // www. sans http:// or https://
    let pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

    // Email addresses
    let emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

    return this.replace(urlPattern, '<a href="$&" target="_blank">Video</a>')
      .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
      .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
  };
}

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// https://www.aspsnippets.com/Articles/Create-dynamic-Table-in-HTML-at-runtime-using-JavaScript.aspx

async function GenerateTable() {
  myFunction();

  let headingvar = document.getElementById("header").innerHTML;

  if (headingvar === "Hitman 3 Master Full Game Top Times") {
    difficultychoice = "master";
  } else if (headingvar === "Hitman 3 Pro Full Game Top Times") {
    difficultychoice = "pro";
  } else if (headingvar === "Hitman 3 Any% Full Game Top Times") {
    difficultychoice = "any";
  }

  // https://www.speedrun.com/api/v1/leaderboards/j1ne5891/level/y9mg6vx9/7kj890zd?var-p854xo3l=21g85z6l&var-ylpe1pv8=klrpdvwq&embed=platforms%2Cplayers&timing=realtime_noloads&top=1
  // let apiUrl = "https://www.speedrun.com/api/v1/runs/znqq2e8z?embed=players,category.variables,level";
  let apiprefix = "https://www.speedrun.com/api/v1/leaderboards/j1ne5891/";
  let apipostfix =
    "&var-789d3g9n=814nxkjl&embed=players,category.variables,level&top=1";
  let levelapiarray = [
    "n2yzpgzk",
    "ndx5nvvk",
    "rkl3no8k",
    "zd3oqzrd",
    "wk6yx8qd",
    "9kv6n132",
  ];
  let categoryapiarray = [
    "?var-j84eq0wn=gq7jpknq",
    "?var-j84eq0wn=21g85yxl",
    "?var-j84eq0wn=jqzp9k4l",
  ];
  let difficultyapiarray = ["&var-5lypzk9l=mlnw9jol", "&var-5lypzk9l=4qyp9g6q"];

  let apiUrl = [];
  let apiUrl2 = [];

  if (difficultychoice == "master") {
    for (let i = 0; i < levelapiarray.length; i++) {
      apiUrl.push(
        apiprefix +
          "category/" +
          levelapiarray[i] +
          categoryapiarray[0] +
          difficultyapiarray[0] +
          apipostfix
      );
    }

    for (let i = 0; i < levelapiarray.length; i++) {
      apiUrl2.push(
        apiprefix +
          "category/" +
          levelapiarray[i] +
          categoryapiarray[1] +
          difficultyapiarray[0] +
          apipostfix
      );
    }
  }

  if (difficultychoice == "pro") {
    for (let i = 0; i < levelapiarray.length; i++) {
      apiUrl.push(
        apiprefix +
          "category/" +
          levelapiarray[i] +
          categoryapiarray[0] +
          difficultyapiarray[1] +
          apipostfix
      );
    }

    for (let i = 0; i < levelapiarray.length; i++) {
      apiUrl2.push(
        apiprefix +
          "category/" +
          levelapiarray[i] +
          categoryapiarray[1] +
          difficultyapiarray[1] +
          apipostfix
      );
    }
  }

  if (difficultychoice == "any") {
    for (let i = 0; i < levelapiarray.length; i++) {
      apiUrl.push(
        apiprefix +
          "category/" +
          levelapiarray[i] +
          categoryapiarray[2] +
          difficultyapiarray[1] +
          apipostfix
      );
    }

    for (let i = 0; i < levelapiarray.length; i++) {
      apiUrl2.push(
        apiprefix +
          "category/" +
          levelapiarray[i] +
          categoryapiarray[2] +
          difficultyapiarray[1] +
          apipostfix
      );
    }
  }

  let obj;
  let objarray = [];
  let levelarray = [];
  let playerarray = [];
  let videoarray = [];
  let timearray = [];
  let grunarray = [];

  for (let i = 0; i < apiUrl.length; i++) {
    await fetch(apiUrl[i]).then(function (response) {
      response.text().then(function (text) {
        obj = JSON.parse(text);
        objarray.push(obj);

        levelarray.push(objarray[i].data.category.data.name);

        if (objarray[i].data.runs.length) {
          let initialTime = objarray[i].data.runs[0].run.times.primary_t;

          let finalTime;

          if (initialTime >= 3600) {
            hours = parseInt(initialTime / 3600);
            minutes = parseInt(initialTime / 60) - hours * 60;
            seconds = initialTime % 60;
            if (seconds > 9 && minutes > 0) {
              finalTime =
                hours.toString() +
                ":" +
                minutes.toString() +
                ":" +
                seconds.toString();
            } else if (seconds <= 9 && minutes > 0) {
              finalTime =
                hours.toString() +
                ":" +
                minutes.toString() +
                ":0" +
                seconds.toString();
            }
          } else {
            if (initialTime < 60 && initialTime >= 10) {
              finalTime = "0:" + initialTime;
            } else if (initialTime <= 9) {
              finalTime = "0:0" + initialTime;
            } else if (initialTime >= 60) {
              minutes = parseInt(initialTime / 60);
              seconds = initialTime % 60;
              if (seconds > 9 && minutes > 0) {
                finalTime = minutes.toString() + ":" + seconds.toString();
              } else if (seconds <= 9 && minutes > 0) {
                finalTime = minutes.toString() + ":0" + seconds.toString();
              }
            }
          }

          timearray.push(finalTime);
          if (objarray[i].data.players.data[0].rel == "user") {
            playerarray.push(
              objarray[i].data.players.data[0].names.international
            );
          } else if (objarray[i].data.players.data[0].rel == "guest") {
            playerarray.push(objarray[i].data.players.data[0].name);
          }

          videoarray.push(
            objarray[i].data.runs[0].run.videos.links[0].uri.linkifyVideo()
          );
          let commentInitial = objarray[i].data.runs[0].run.comment;
          let linkextract = commentInitial.match(/\bhttps?:\/\/\S+/gi);
          let apostropheReplace = linkextract[0]
            .toString()
            .replace(/'/g, "%27");
          let rightParenthesisReplace = apostropheReplace.replace(/\)/g, "");
          grunarray.push(rightParenthesisReplace.linkifyGrun());
        } else {
          timearray.push("");
          playerarray.push("");
          videoarray.push("");
          grunarray.push("");
        }
      });
    });
  }

  let obj2;
  let objarray2 = [];
  let levelarray2 = [];
  let playerarray2 = [];
  let videoarray2 = [];
  let timearray2 = [];
  let grunarray2 = [];

  for (let i = 0; i < apiUrl.length; i++) {
    await fetch(apiUrl2[i]).then(function (response2) {
      response2.text().then(function (text2) {
        obj2 = JSON.parse(text2);
        objarray2.push(obj2);
        levelarray2.push(objarray2[i].data.category.data.name);

        if (objarray2[i].data.runs.length) {
          let initialTime2 = objarray2[i].data.runs[0].run.times.primary_t;

          let finalTime2;

          if (initialTime2 >= 3600) {
            hours = parseInt(initialTime2 / 3600);
            minutes = parseInt(initialTime2 / 60) - hours * 60;
            seconds = initialTime2 % 60;
            if (seconds > 9 && minutes > 0) {
              finalTime2 =
                hours.toString() +
                ":" +
                minutes.toString() +
                ":" +
                seconds.toString();
            } else if (seconds <= 9 && minutes > 0) {
              finalTime2 =
                hours.toString() +
                ":" +
                minutes.toString() +
                ":0" +
                seconds.toString();
            }
          } else {
            if (initialTime2 < 60 && initialTime2 >= 10) {
              finalTime2 = "0:" + initialTime2;
            } else if (initialTime2 <= 9) {
              finalTime2 = "0:0" + initialTime2;
            } else if (initialTime2 >= 60) {
              minutes = parseInt(initialTime2 / 60);
              seconds = initialTime2 % 60;
              if (seconds > 9 && minutes > 0) {
                finalTime2 = minutes.toString() + ":" + seconds.toString();
              } else if (seconds <= 9 && minutes > 0) {
                finalTime2 = minutes.toString() + ":0" + seconds.toString();
              }
            }
          }

          timearray2.push(finalTime2);

          if (objarray2[i].data.players.data[0].rel == "user") {
            playerarray2.push(
              objarray2[i].data.players.data[0].names.international
            );
          } else if (objarray2[i].data.players.data[0].rel == "guest") {
            playerarray2.push(objarray2[i].data.players.data[0].name);
          }

          videoarray2.push(
            objarray2[i].data.runs[0].run.videos.links[0].uri.linkifyVideo()
          );

          let commentInitial2 = objarray2[i].data.runs[0].run.comment;
          let linkextract2 = commentInitial2.match(/\bhttps?:\/\/\S+/gi);
          let apostropheReplace2 = linkextract2[0]
            .toString()
            .replace(/'/g, "%27");
          let rightParenthesisReplace2 = apostropheReplace2.replace(/\)/g, "");
          grunarray2.push(rightParenthesisReplace2.linkifyGrun());
        } else {
          timearray2.push("");
          playerarray2.push("");
          videoarray2.push("");
          grunarray2.push("");
        }
      });
    });
  }

  for (let i = 0; i < apiUrl.length; i++) {
    fetch(apiUrl[i]).then(function (response) {
      response.text().then(function (text) {
        storedText = text;

        function makeTable(
          urlid,
          ratinglabel,
          levelver,
          playerver,
          timever,
          videover,
          grunver,
          i
        ) {
          var customers = new Array();

          customers.push([ratinglabel, "", "", "", ""]);
          customers.push([
            "Fullgame Category",
            "Player",
            "Time",
            "Video",
            "Time Calc",
          ]);
          for (let j = 0; j < levelver.length; j++) {
            customers.push([
              levelver[j],
              playerver[j],
              timever[j],
              videover[j],
              grunver[j],
            ]);
          }

          //Create a HTML Table element.
          var table = document.createElement("TABLE");
          table.border = "1";

          //Get the count of columns.
          var columnCount = customers[0].length;

          //Add the header row.
          var row = table.insertRow(-1);
          for (var i = 0; i < columnCount; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[0][i];
            row.appendChild(headerCell);
          }

          var row2 = table.insertRow(-1);
          for (var i = 0; i < columnCount; i++) {
            var headerCell2 = document.createElement("TH");
            headerCell2.innerHTML = customers[1][i];
            row2.appendChild(headerCell2);
          }

          // Add the data rows.
          for (var i = 2; i < customers.length; i++) {
            row = table.insertRow(-1);
            for (var j = 0; j < columnCount; j++) {
              var cell = row.insertCell(-1);
              cell.innerHTML = customers[i][j];
            }
          }

          var dvTable = document.getElementById(urlid);
          dvTable.innerHTML = "";
          dvTable.appendChild(table);
        }
        if (difficultychoice != "any") {
          makeTable(
            "dvTable",
            "SA",
            levelarray,
            playerarray,
            timearray,
            videoarray,
            grunarray,
            i
          );
          makeTable(
            "dvTable2",
            "SA/SO",
            levelarray2,
            playerarray2,
            timearray2,
            videoarray2,
            grunarray2,
            i
          );
        } else if (difficultychoice === "any") {
          makeTable(
            "dvTable",
            "Any%",
            levelarray,
            playerarray,
            timearray,
            videoarray,
            grunarray,
            i
          );
        }
      });
    });
  }
}

window.onload = GenerateTable;
