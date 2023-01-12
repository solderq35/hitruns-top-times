let storedText;

//https://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
if (!String.linkify) {
  String.prototype.linkify = function () {
    // http://, https://, ftp://
    let urlPattern =
      /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

    // www. sans http:// or https://
    let pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

    // Email addresses
    let emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

    return this.replace(urlPattern, '<a href="$&">$&</a>')
      .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
      .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
  };
}

function fetchInfo() {
  let runLinkInput = document.getElementById("runLink").value;
  let runDiffInput = document.getElementById("diffInput").value;
  let runReasonInput = document.getElementById("reasonInput").value;
  let idslice = runLinkInput.slice(-8);
  let playerEmbed = "?embed=players,category.variables,level";
  let idPlusEmbeds = idslice.concat(playerEmbed);
  let apiDomain = "https://www.speedrun.com/api/v1/runs/";
  //https://www.speedrun.com/api/v1/leaderboards/j1ne5891/level/y9mg6vx9/7kj890zd?var-p854xo3l=21g85z6l&var-ylpe1pv8=klrpdvwq&embed=platforms%2Cplayers&timing=realtime_noloads&top=1
  //let apiUrl = "https://www.speedrun.com/api/v1/runs/znqq2e8z?embed=players,category.variables,level";
  let apiUrl =
    "https://www.speedrun.com/api/v1/leaderboards/j1ne5891/level/y9mg6vx9/7kj890zd?var-p854xo3l=21g85z6l&var-ylpe1pv8=klrpdvwq&embed=players,category.variables,level&top=1";
  let apiUrl2 =
    "https://www.speedrun.com/api/v1/leaderboards/j1ne5891/level/y9mg6vx9/7kj890zd?var-p854xo3l=21g85z6l&var-ylpe1pv8=klrpdvwq&embed=players,category.variables,level&top=1";
  let playerName = document.getElementById("playerCell_0");
  let categoryName = document.getElementById("categoryCell_0");
  let timeName = document.getElementById("timeCell_0");
  let dateName = document.getElementById("dateCell_0");
  let videoName = document.getElementById("videoCell_0");
  let reasonName = document.getElementById("reasonCell_0");
  let apiUrlName = document.getElementById("apiUrlDiv_0");

  fetch(apiUrl).then(function (response) {
    response.text().then(function (text) {
      storedText = text;
      const obj = JSON.parse(text);
      //console.log(obj.data.runs[0].run.times.primary_t);
      //playerName.innerHTML = obj.data.players.data[0].names.international;
      let finaltime;
      let initialTime = obj.data.runs[0].run.times.primary_t;
      let finalTime;
      let minutes;
      let seconds;
      let hours;
      //console.log(initialTime);
      //console.log(obj.data.players.data[0].rel);
      if (obj.data.players.data[0].rel == "user") {
        playerName.innerHTML = obj.data.players.data[0].names.international;
      } else if (obj.data.players.data[0].rel == "guest") {
        playerName.innerHTML = obj.data.players.data[0].name;
      }

      if (initialTime >= 3600) {
        hours = parseInt(initialTime / 3600);
        // console.log(hours);
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
          //console.log(hours);
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
      timeName.innerHTML = finalTime;
      dateName.innerHTML = obj.data.date;
      videoName.innerHTML = obj.data.videos.links[0].uri.linkify();
      reasonName.innerHTML = runReasonInput;
      categoryName.innerHTML =
        obj.data.level.data.name +
        " " +
        obj.data.category.data.name +
        " " +
        runDiffInput;
      apiUrlName.innerHTML = apiUrl.linkify();
    });
  });
}

function done() {
  document.getElementById("log").textContent =
    "Here's what I got! \n" + storedText;
}

// https://www.aspsnippets.com/Articles/Create-dynamic-Table-in-HTML-at-runtime-using-JavaScript.aspx

async function GenerateTable() {
  let runLinkInput = document.getElementById("runLink").value;
  let runDiffInput = document.getElementById("diffInput").value;
  let runReasonInput = document.getElementById("reasonInput").value;
  let idslice = runLinkInput.slice(-8);
  let playerEmbed = "?embed=players,category.variables,level";
  let idPlusEmbeds = idslice.concat(playerEmbed);
  let apiDomain = "https://www.speedrun.com/api/v1/runs/";
  //https://www.speedrun.com/api/v1/leaderboards/j1ne5891/level/y9mg6vx9/7kj890zd?var-p854xo3l=21g85z6l&var-ylpe1pv8=klrpdvwq&embed=platforms%2Cplayers&timing=realtime_noloads&top=1
  //let apiUrl = "https://www.speedrun.com/api/v1/runs/znqq2e8z?embed=players,category.variables,level";
  let apiUrl = [
    "https://www.speedrun.com/api/v1/leaderboards/j1ne5891/level/y9mg6vx9/7kj890zd?var-p854xo3l=21g85z6l&var-ylpe1pv8=klrpdvwq&embed=players,category.variables,level&top=1",
    "https://www.speedrun.com/api/v1/leaderboards/j1ne5891/level/5wkexvpw/7kj890zd?var-p854xo3l=21g85z6l&var-ylpe1pv8=klrpdvwq&embed=players,category.variables,level&top=1",
  ];
  let apiUrl2 = [
    "https://www.speedrun.com/api/v1/leaderboards/j1ne5891/level/y9mg6vx9/7kj890zd?var-p854xo3l=21g85z6l&var-ylpe1pv8=klrpdvwq&embed=players,category.variables,level&top=1",
    "https://www.speedrun.com/api/v1/leaderboards/j1ne5891/level/5wkexvpw/7kj890zd?var-p854xo3l=21g85z6l&var-ylpe1pv8=klrpdvwq&embed=players,category.variables,level&top=1",
  ];
  let playerName = document.getElementById("playerCell_0");
  let categoryName = document.getElementById("categoryCell_0");
  let timeName = document.getElementById("timeCell_0");
  let dateName = document.getElementById("dateCell_0");
  let videoName = document.getElementById("videoCell_0");
  let reasonName = document.getElementById("reasonCell_0");
  let apiUrlName = document.getElementById("apiUrlDiv_0");

  //console.log(apiUrl.length);
  let obj;
  let objarray = [];
  let levelarray = [];
  let playerarray = [];
  let videoarray = [];
  let timearray = [];

  let obj2;
  let objarray2 = [];
  let levelarray2 = [];
  let playerarray2 = [];
  let videoarray2 = [];
  let timearray2 = [];

  for (let i = 0; i < apiUrl.length; i++) {
    await fetch(apiUrl[i]).then(function (response) {
      response.text().then(function (text) {
        //storedText = text;
        obj = JSON.parse(text);
        //objarray = [];
        //  for (let i = 0; i < apiUrl.length; i++) {
        objarray.push(obj);

        levelarray.push(objarray[i].data.level.data.name);
        //timearray = []
        //  console.log(objarray[i].data.runs[0].run.times.primary_t);
        //obj.data.runs[0].run.times.primary_t;

        let initialTime = objarray[i].data.runs[0].run.times.primary_t;
        let finalTime;

        if (initialTime >= 3600) {
          hours = parseInt(initialTime / 3600);
          // console.log(hours);
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
            //console.log(hours);
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

        //console.log(obj.data.players.data[0].names.international)

        if (objarray[i].data.players.data[0].rel == "user") {
          playerarray.push(
            objarray[i].data.players.data[0].names.international
          );
        } else if (objarray[i].data.players.data[0].rel == "guest") {
          playerarray.push(objarray[i].data.players.data[0].name);
        }

        videoarray.push(
          objarray[i].data.runs[0].run.videos.links[0].uri.linkify()
        );

        // console.log(objarray);

        //  console.log(objarray)
        // console.log(objarray[0].data.runs[0].run.times.primary_t)
      });
    });
  }

  for (let i = 0; i < apiUrl2.length; i++) {
    await fetch(apiUrl2[i]).then(function (response2) {
      response2.text().then(function (text2) {
        // storedText2 = text2;
        obj2 = JSON.parse(text2);
        //objarray = [];
        //  for (let i = 0; i < apiUrl.length; i++) {
        objarray2.push(obj2);

        levelarray2.push(objarray2[i].data.level.data.name);
        //timearray = []
        console.log(objarray2[i].data.runs[0].run.times.primary_t);

        let initialTime2 = objarray2[i].data.runs[0].run.times.primary_t;
        let finalTime2;

        if (initialTime2 >= 3600) {
          hours = parseInt(initialTime2 / 3600);
          // console.log(hours);
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
            //console.log(hours);
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
          objarray2[i].data.runs[0].run.videos.links[0].uri.linkify()
        );

        // console.log(objarray);

        //  console.log(objarray)
        // console.log(objarray[0].data.runs[0].run.times.primary_t)
      });
    });
  }

  console.log(objarray);
  console.log(videoarray);
  console.log(levelarray);
  console.log(timearray);
  console.log(playerarray);
  let kk = 69;
  let ll = 0;
  for (let i = 0; i < apiUrl.length; i++) {
    fetch(apiUrl[i]).then(function (response) {
      response.text().then(function (text) {
        storedText = text;
        //obj = JSON.parse(text);
        //  objarray = [];
        //  for (let i = 0; i < apiUrl.length; i++) {
        //  objarray.push(obj);
        //  console.log(objarray);
        //  }
        /*
        timearray = [];
        for (let i = 0; i < 2; i++) {
        timearray.push(obj.data.runs[0].run.times.primary_t);
        console.log(timearray);
      }
      */
        //  console.log(obj);
        //console.log(obj.data.runs[0].run.times.primary_t);
        //playerName.innerHTML = obj.data.players.data[0].names.international;

        let finaltime;
        let initialTime = obj.data.runs[0].run.times.primary_t;
        let finalTime;
        let minutes;
        let seconds;
        let hours;
        //console.log(initialTime);
        //console.log(obj.data.players.data[0].rel);

        if (obj.data.players.data[0].rel == "user") {
          playerName.innerHTML = obj.data.players.data[0].names.international;
        } else if (obj.data.players.data[0].rel == "guest") {
          playerName.innerHTML = obj.data.players.data[0].name;
        }

        if (initialTime >= 3600) {
          hours = parseInt(initialTime / 3600);
          // console.log(hours);
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
            //console.log(hours);
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

        timeName.innerHTML = finalTime;
        dateName.innerHTML = obj.data.date;
        //videoName.innerHTML = obj.data.videos.links[0].uri.linkify();
        reasonName.innerHTML = runReasonInput;
        categoryName.innerHTML =
          obj.data.level.data.name +
          " " +
          obj.data.category.data.name +
          " " +
          runDiffInput;

        // apiUrlName.innerHTML = apiUrl.linkify();
        // console.log(objarray[i].data.runs[0].run.times.primary_t);
        // console.log(obj)

        //console.log(objarray)
        // console.log(objarray[0].data.runs[0].run.times.primary_t)
        //console.log(i)

        // console.log(j)
        function makeTable(
          urlid,
          ratinglabel,
          levelver,
          playerver,
          timever,
          videover,
          i
        ) {
          kk += 1;
          //console.log(j)
          //console.log(kk);
          //Build an array containing Customer records.
          var customers = new Array();
          //console.log(timearray[0])
          //console.log(timearray[1])

          // console.log(timearray[i]);
          customers.push([ratinglabel, "", "", ""]);
          customers.push(["Level", "Player", "Time", "Video"]);
          for (let j = 0; j < timever.length; j++) {
            customers.push([
              levelver[j],
              playerver[j],
              timever[j],
              videover[j],
            ]);
          }

          // customers.push([2, "Mudassar Khan", timever[i], "youtube"]);
          //  customers.push([3, "Suzanne Mathews", "France", "youtube"]);
          //  customers.push([4, "Robert Schidner", "Russia", "youtube"]);

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

          //Add the data rows.
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
          // fetchInfo();
        }
        console.log(i);
        makeTable(
          "dvTable",
          "SA",
          levelarray,
          playerarray,
          timearray,
          videoarray,
          i
        );
        makeTable(
          "dvTable2",
          "SA/SO",
          levelarray2,
          playerarray2,
          timearray2,
          videoarray2,
          i
        );
      });
    });
    //console.log(i);
    ll++;
  }
}

window.onload = GenerateTable;
//window.onload = fetchInfo;
