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

  let headingvar = document.getElementById('header').innerHTML;
console.log(headingvar);

if (headingvar === "Hitman 3 Master IL Top Times"){
  console.log("master header")
  difficultychoice = "master";
}
else if (headingvar === "Hitman 3 Pro IL Top Times"){
  console.log("pro header")
  difficultychoice = "pro";
}
else if (headingvar === "Hitman 3 Any% IL Top Times"){
  console.log("any% header")
  difficultychoice = "any";
}

  //https://www.speedrun.com/api/v1/leaderboards/j1ne5891/level/y9mg6vx9/7kj890zd?var-p854xo3l=21g85z6l&var-ylpe1pv8=klrpdvwq&embed=platforms%2Cplayers&timing=realtime_noloads&top=1
  //let apiUrl = "https://www.speedrun.com/api/v1/runs/znqq2e8z?embed=players,category.variables,level";
  let apiprefix = "https://www.speedrun.com/api/v1/leaderboards/j1ne5891/";
  let apipostfix =
    "&var-ylpe1pv8=klrpdvwq&embed=players,category.variables,level&top=1";
  let levelapiarray = [
    "owo5jvkd/",
    "xd1ymo5d/",
    "ewpo3vjd/",
    "y9mg6vx9/",
    "5wkexvpw/",
    "592rk13d/",
    "gdronr6d/",
    "ywe3y0y9/",
    "5d7x1pg9/",
    "y9mg6659/",
    "592rkkod/",
    "xd4e112w/",
    "n93l11n9/",
    "z98533g9/",
    "rdnx77qw/",
    "ldykxxkw/",
    "ewpo32kd/",
    "5wkexm2w/",
    "592rk6od/",
    "29v0683w/",
  ];
  let categoryapiarray = ["7kj890zd", "jdronyld", "jdz6nx62"];
  let difficultyapiarray = [
    "?var-p854xo3l=gq7jpmpq",
    "?var-p854xo3l=21g85z6l",
    "?var-r8r1dv7n=21dz5xpl",
    "?var-r8r1dv7n=5q86pwy1",
  ];
  //let finalurlsa = apiprefix + levelapiarray[i + categoryapiarray[0]]

  let apiUrl = [];
  let apiUrl2 = [];


if (difficultychoice == "master")
{

  for (let i = 0; i < levelapiarray.length; i++) {
    apiUrl.push(
      apiprefix +
        "level/" +
        levelapiarray[i] +
        categoryapiarray[0] +
        difficultyapiarray[1] +
        apipostfix
    );
  }

  //console.log(apiUrl);
  
  for (let i = 0; i < levelapiarray.length; i++) {
    apiUrl2.push(
      apiprefix +
        "level/" +
        levelapiarray[i] +
        categoryapiarray[1] +
        difficultyapiarray[3] +
        apipostfix
    );
  }

}

if (difficultychoice == "pro")
{

  for (let i = 0; i < levelapiarray.length; i++) {
    apiUrl.push(
      apiprefix +
        "level/" +
        levelapiarray[i] +
        categoryapiarray[2] +
        difficultyapiarray[0] +
        apipostfix
    );
  }

  //console.log(apiUrl);
  
  for (let i = 0; i < levelapiarray.length; i++) {
    apiUrl2.push(
      apiprefix +
        "level/" +
        levelapiarray[i] +
        categoryapiarray[2] +
        difficultyapiarray[2] +
        apipostfix
    );
  }

}

if (difficultychoice == "any")
{

  for (let i = 0; i < levelapiarray.length; i++) {
    apiUrl.push(
      apiprefix +
        "level/" +
        levelapiarray[i] +
        categoryapiarray[2] +
        difficultyapiarray[0] +
        apipostfix
    );
  }

  //console.log(apiUrl);
  
  for (let i = 0; i < levelapiarray.length; i++) {
    apiUrl2.push(
      apiprefix +
        "level/" +
        levelapiarray[i] +
        categoryapiarray[2] +
        difficultyapiarray[2] +
        apipostfix
    );
  }

}

  // console.log(apiUrl2);

  //console.log(apiUrl.length);
  let obj;
  let objarray = [];
  let levelarray = [];
  let playerarray = [];
  let videoarray = [];
  let timearray = [];
  let totalTime = 0;
  let s3Time = 0;
  let s1Time = 0;
  let s2Time = 0;

  for (let i = 0; i < 6; i++) {
    await fetch(apiUrl[i]).then(function (response) {
      response.text().then(function (text) {
        //storedText = text;
        obj = JSON.parse(text);
        //objarray = [];
        //  for (let i = 0; i < apiUrl.length; i++) {
        objarray.push(obj);

        s3Time += objarray[i].data.runs[0].run.times.primary_t;
        //  console.log(s3Time);
      });
    });
  }

  for (let i = 6; i < 12; i++) {
    await fetch(apiUrl[i]).then(function (response) {
      response.text().then(function (text) {
        //storedText = text;
        obj = JSON.parse(text);
        //objarray = [];
        //  for (let i = 0; i < apiUrl.length; i++) {
        objarray.push(obj);

        s1Time += objarray[i].data.runs[0].run.times.primary_t;
        console.log(s1Time);
      });
    });
  }

  for (let i = 12; i < 20; i++) {
    await fetch(apiUrl[i]).then(function (response) {
      response.text().then(function (text) {
        //storedText = text;
        obj = JSON.parse(text);
        //objarray = [];
        //  for (let i = 0; i < apiUrl.length; i++) {
        objarray.push(obj);

        s2Time += objarray[i].data.runs[0].run.times.primary_t;
        console.log(s2Time);
      });
    });
  }

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

        totalTime += objarray[i].data.runs[0].run.times.primary_t;
        console.log(totalTime);

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

        // console.log(timearray)
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

  let obj2;
  let objarray2 = [];
  let levelarray2 = [];
  let playerarray2 = [];
  let videoarray2 = [];
  let timearray2 = [];
  let totalTime2 = 0;
  let s3Time2 = 0;
  let s1Time2 = 0;
  let s2Time2 = 0;

  for (let i = 0; i < 6; i++) {
    await fetch(apiUrl2[i]).then(function (response2) {
      response2.text().then(function (text2) {
        // storedText2 = text2;
        obj2 = JSON.parse(text2);
        //objarray = [];
        //  for (let i = 0; i < apiUrl.length; i++) {
        objarray2.push(obj2);

        s3Time2 += objarray2[i].data.runs[0].run.times.primary_t;
        console.log(s3Time2);
      });
    });
  }

  for (let i = 6; i < 13; i++) {
    await fetch(apiUrl2[i]).then(function (response2) {
      response2.text().then(function (text2) {
        // storedText2 = text2;
        obj2 = JSON.parse(text2);
        //objarray = [];
        //  for (let i = 0; i < apiUrl.length; i++) {
        objarray2.push(obj2);

        s1Time2 += objarray2[i].data.runs[0].run.times.primary_t;
        console.log(s1Time2);
      });
    });
  }

  for (let i = 13; i < 20; i++) {
    await fetch(apiUrl2[i]).then(function (response2) {
      response2.text().then(function (text2) {
        // storedText2 = text2;
        obj2 = JSON.parse(text2);
        //objarray = [];
        //  for (let i = 0; i < apiUrl.length; i++) {
        objarray2.push(obj2);

        s2Time2 += objarray2[i].data.runs[0].run.times.primary_t;
        console.log(s2Time2);
      });
    });
  }

  for (let i = 0; i < apiUrl.length; i++) {
    await fetch(apiUrl2[i]).then(function (response2) {
      response2.text().then(function (text2) {
        // storedText2 = text2;
        obj2 = JSON.parse(text2);
        //objarray = [];
        //  for (let i = 0; i < apiUrl.length; i++) {
        objarray2.push(obj2);

        levelarray2.push(objarray2[i].data.level.data.name);
        //timearray = []
        //  console.log(objarray2[i].data.runs[0].run.times.primary_t);
        totalTime2 += objarray2[i].data.runs[0].run.times.primary_t;
        // let dog = typeof(objarray2[i].data.runs[0].run.times.primary_t);
        // console.log(dog);
        // console.log(totalTime2);

        // console.log(objarray2[i].data.runs[0].run.times.primary_t);

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
        //console.log(timearray2)

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

        //console.log(totalTime2);

        // console.log(objarray);

        //  console.log(objarray)
        // console.log(objarray[0].data.runs[0].run.times.primary_t)
      });
    });
  }

  // const sum2 = totalTime2.reduce((partialsum2, a) => partialsum2 + a, 0)

  console.log(totalTime);
  // console.log(timearray2)
  //const sum2 = totalTime2.reduce((partialSum, a) => partialSum + a, 0)
  //console.log(sum2)
  //console.log("final sum")

  //  console.log(finalSum2);
  // console.log(objarray);
  // console.log(videoarray);
  // console.log(levelarray);
  //  console.log(timearray);
  // console.log(playerarray);
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

        //videoName.innerHTML = obj.data.videos.links[0].uri.linkify();

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
          totalTimever,
          s3Timever,
          s1Timever,
          s2Timever,
          i
        ) {
          function SOB_function(totalTimeversion) {
            if (totalTimeversion >= 3600) {
              hours = parseInt(totalTimeversion / 3600);
              // console.log(hours);
              minutes = parseInt(totalTimeversion / 60) - hours * 60;
              seconds = totalTimeversion % 60;
              if (seconds > 9 && minutes > 0) {
                finaltotalTimeversionhours.toString() +
                  ":" +
                  minutes.toString() +
                  ":" +
                  seconds.toString();
              } else if (seconds <= 9 && minutes > 0) {
                finaltotalTimeversion =
                  hours.toString() +
                  ":" +
                  minutes.toString() +
                  ":0" +
                  seconds.toString();
                //console.log(hours);
              }
            } else {
              if (totalTimeversion < 60 && totalTimeversion >= 10) {
                finaltotalTimeversion = "0:" + totalTimeversion;
              } else if (totalTimeversion <= 9) {
                finaltotalTimeversion = "0:0" + totalTimeversion;
              } else if (totalTimeversion >= 60) {
                minutes = parseInt(totalTimeversion / 60);
                seconds = totalTimeversion % 60;
                if (seconds > 9 && minutes > 0) {
                  finaltotalTimeversion =
                    minutes.toString() + ":" + seconds.toString();
                } else if (seconds <= 9 && minutes > 0) {
                  finaltotalTimeversion =
                    minutes.toString() + ":0" + seconds.toString();
                }
              }
            }
            return finaltotalTimeversion;
          }
          //SOB_function(totalTimever);
          //SOB_function(s3Timever);

          kk += 1;
          //console.log(j)
          //console.log(kk);
          //Build an array containing Customer records.
          var customers = new Array();
          //console.log(timearray[0])
          //console.log(timearray[1])

          customers.push([
            ratinglabel + " Trilogy SOB: " + SOB_function(totalTimever),
            ratinglabel + " S3 SOB: " + SOB_function(s3Timever),
            ratinglabel + " S1 SOB: " + SOB_function(s1Timever),
            ratinglabel + " S2 SOB: " + SOB_function(s2Timever),
          ]);
          customers.push(["Level", "Player", "Time", "Video"]);
          for (let j = 0; j < levelver.length; j++) {
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
        // console.log(i);
        // console.log(totalTime2)
		if (difficultychoice != "any") {
        makeTable(
          "dvTable",
          "SA",
          levelarray,
          playerarray,
          timearray,
          videoarray,
          totalTime,
          s3Time,
          s1Time,
          s2Time,
          i
        );
        makeTable(
          "dvTable2",
          "SA/SO",
          levelarray2,
          playerarray2,
          timearray2,
          videoarray2,
          totalTime2,
          s3Time2,
          s1Time2,
          s2Time2,
          i
        );
      }
	  else if (difficultychoice === "any") {
	          makeTable(
          "dvTable",
          "Any%",
          levelarray,
          playerarray,
          timearray,
          videoarray,
          totalTime,
          s3Time,
          s1Time,
          s2Time,
          i
        );
	  }
      });
    });
    //console.log(i);
    ll++;
  }
}

window.onload = GenerateTable;
//window.onload = fetchInfo;
