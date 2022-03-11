/****************************
@@&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&##@@@
@@#77J5G#&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&BPY?~?&@@@
@@@#7::^~!7J5G#&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&#BPY?!~^^:^J&@@@@
@@@@@G?~:^^^^^~!7?YPB#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&BG5J7!~^^^^^^^!Y#@@@@@@
@@@@##&B57^^^^^^^^^^^~!?YPB#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&BPY?!~^^^^^^^^^^^^7PB#BB@@@@@
@@@@P7~~~~^^^^^^^^^^^^^^^^^~!?YPB&@@@@@@@@@@@&#######&@@@@@@@@@@&#G5J7~^^^^^^^^^^^^^^^^^^^~~!?G@@@@@
@@@@@@#GPYJ?7!^^^^^^^^^^~~~~^^^~~!7JPB@@#G5J?777777777?JYP#@&GY?!~^^^^^~~~~~~~^^^^^^^!?Y5PGB&@@@@@@@
@@@@@@@#55J?!~^^^^^^^^^~~~~~~~~~~~~^^~??7!7J5GB#&&&&#BG5Y77?7~^^~~~~~~~~~~~~~~~^^^^^^~~7?JYG@@@@@@@@
@@@@@@@#Y?~::^^^^^^^^^^^^~~~~~~~~~~!!7!~^!!!!!7?J5B@@@@&G7~!!77!~~~~~~~~~~~^^^^^^^^^^^^:!YP#@@@@@@@@
@@@@@@@@@@G7~~~~~^^^^^^^^^^^^~~~~!777!~:^7!!!!!!!~~!YPJ7~~~~!!777!~~~~^^^^^^^^^^^:~!!!!?B@@@@@@@@@@@
@@@@@@@@@@@@&&#J~::^^^^^^^^^^~~~!77!~~~~!7!!!!!!!77~^^^~~^~!!~~!77!~~~^^^^^^^^^^::~?&@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@#GJ!^::::::^^^^^!77!~~~~~^.^^~~~!777~~^^^~~!!~~~^~77!^^^^^::::::~75#&@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@&J~~:.:::^^^77!^^~^^~~..:^^~7777~~^^:^!!!~~~^^~77~^^:::.^!75@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@G7~J?:.~77^:^^^^^~~..:^~!777~~^^::!!~~^^^^:!7!.:JY7JB@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@P!!7!.^J^^~!!7!!!!!7!~~!!!!!!77!~^~5^.~7!7B@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@J77~5@#7^~~^~~~~~~!!!~~~~~~~~~:7&@5!77?@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@P!7#@@@&J~^.:^^^:^!77^~~^:::^~Y@@@@&?!Y@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&?!J@@@@@@7:^~!~^^!77!!~^YBB#@@@@@@Y!7#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@B7!Y&@@@@7~^~J?!!!77!~~5@@@@@@@@@5!7G@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#?!?B@@#^~^~??J777?7?#@@@@@@@@#J!7B@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&57!JBG^^^^~!7?7?J?G@@@@@@@BY!7Y&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&P?77!~^^~!!!!7!!B@@@&B5?!75#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@?~!777!!!!!!~!55J?77?YB&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@B^^^~~!!!!!!!!7JJ5PB#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@7:^^^^~^^~~^^^!&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@B^^^^^^^^^^^^^^^#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@!:^^^^^^:^^^^^^^B@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@P!:::^::^^:^^^^^B@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@GP555P#57777JG@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * 
 * DONDA 2 STEM PLAYER VERSION TRACKER / PLATFORM BY BBASSETT
 * discord: bryanthaboi#3088
 * version: 2.1
****************************/

let tracks = {},
  tablehtml = "",
  versions = {},
  versionsHTML = "",
  authToken = "",
  config = "";

setTimeout(function () {
  getTrackInfo();
}, 0x1);

//TODO: add players not just downloads
//HTML5 player - only one at a time

function makeAuthToken(email) {
  let token = btoa(email + ":" + new Date().getTime());
  axios.defaults.headers.common["authorization"] = "basic " + token;
  config = {
    headers: { authorization: "basic " + token },
  };
}

function getTrack(trackId, version, name, type) {
  axios
    .get(
      "https://api.stemplayer.com/content/tracks/" +
        trackId +
        "?version=" +
        version +
        "&codec=" +
        type,
      config
    )
    .then((response) => {
      downloadURI(response.data.data.file, name);
    });
}

function downloadURI(uri, name) {
  fetch(uri)
    .then((resp) => resp.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      // the filename you want
      a.download = name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      Toast.fire({
        icon: "success",
        title: "Downloaded " + name + " successfully!",
      });
    })
    .catch(() =>
      Toast.fire({
        icon: "error",
        title: "Something went wrong.",
      })
    );
}
function zeroPad(num, places) {
  num = num + 1;
  num = num.toString();
  while (num.length < places) num = "0" + num;
  return num;
}
function makeTable(input) {
  $(input)["each"](function (e, o) {
    if (typeof versions[o["metadata"]["version"]] == "undefined") {
      versions[o["metadata"]["version"]] = 1;
    } else {
      versions[o["metadata"]["version"]]++;
    }
    tablehtml +=
      '<tr class="trackRow version' +
      o["metadata"]["version"] +
      '"><td>' +
      (e + 0x1) +
      "</td>" +
      "<td>" +
      o["metadata"]["title"] +
      "</td><td>" +
      o["metadata"]["version"] +
      "</td>" +
      '<td id="track' +
      o["id"] +
      'download"></td>' +
      "";
  }),
    $("#mainHole")["html"](tablehtml);

  doVersionHTML(versions);
}
function doVersionHTML(input) {
  $.each(input, function (e, o) {
    versionsHTML +=
      '<div class="col-2"> <div class="" >' +
      '<div class="card-header p-1">' +
      '<h5 class="small d-inline-block pr-2">Version ' +
      e +
      "</h5>" +
      '<button class="btn btn-primary badge d-inline-block" onclick="highlightVersions(\'' +
      "version" +
      e +
      "')\">" +
      o +
      "</button>" +
      "</div>" +
      "</div></div>";
  });
  $("#cards").html(versionsHTML);
}
function highlightVersions(versionClass) {
  $(".trackRow").removeClass("bg-dark");
  setTimeout(function () {
    $("." + versionClass).addClass("bg-dark");
  }, 1);
}

function doAuth(email2) {
  makeAuthToken(email2);
  axios
    .get("https://api.stemplayer.com/accounts/access?email=" + email2)
    .then((response) => {
      if (response.data.data.device_purchase == true) {
        allowDownloads();
      }
    })
    .catch(function (error) {
      Toast.fire({
        icon: "error",
        title: "Bad email address",
      });
    });
}

function allowDownloads() {
  //TODO: actually make this
  $("#loginForm").slideUp();
  let buttonDownloadCurrentStateAlbum =
    '<button onclick="downloadEntireAlbum(\'mp3\')" class="btn btn-outline-danger  btn-block mb-2">Download Album In Current State (mp3)</button>';
  let buttonDownloadVersionOneAlbum =
    '<button  onclick="downloadEntireAlbum(\'wav\')" class="btn btn-outline-warning btn-block mb-1">Download Album in Current State (wav)</button>';
  //buttonDownloadVersionOneAlbum =
  //  '<button class="btn btn-warning btn-lg btn-block mb-2">Download Version One Album</button>';
  $("#buttons").html(
    buttonDownloadCurrentStateAlbum + buttonDownloadVersionOneAlbum
  );
  setTimeout(function () {
    $("#buttonBox").slideDown();
  }, 500);
  addTypeDownloadsToTracks();
}
function addTypeDownloadsToTracks() {
  $(tracks).each(function (e, o) {
    let mp3button =
      "<button  onclick=\"getTrack('" +
      o["id"] +
      "','" +
      o["metadata"]["version"] +
      "','" +
      zeroPad(e, 2) +
      " - " +
      o["metadata"]["title"] +
      " - Version " +
      o["metadata"]["version"] +
      ".mp3'" +
      ',\'mp3\')" class="btn btn-danger badge m-1">MP3</button>';
    let wavbutton =
      "<button  onclick=\"getTrack('" +
      o["id"] +
      "','" +
      o["metadata"]["version"] +
      "','" +
      zeroPad(e, 2) +
      " - " +
      o["metadata"]["title"] +
      " - Version " +
      o["metadata"]["version"] +
      ".wav'" +
      ',\'wav\')" class="btn btn-warning badge m-1">WAV</button>';
    let buttonHTML = mp3button + wavbutton;
    $("#track" + o["id"] + "download").html(buttonHTML);
  });
}
function downloadEntireAlbum(type) {
  $(tracks).each(function (e, o) {
    getTrack(
      o["id"],
      o["metadata"]["version"],
      zeroPad(e, 2) +
        " - " +
        o["metadata"]["title"] +
        " - Version " +
        o["metadata"]["version"] +
        "." +
        type,
      type
    );
  });
}

function getTrackInfo() {
  $["get"]("https://api.stemplayer.com/content/albums", function (data) {
    (tracks = data["data"]["donda_2"]["tracks"]), makeTable(tracks);
  });
}
