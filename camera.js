let video = document.createElement('video');

const devices = navigator.mediaDevices || null;

function adjust() {
    video.videoWidth = '100vw';
    video.videoHeight = '100vh';
    video.style.margin = '0 auto';
    video.style.position = 'absolute';
    video.style.top = '50vh';
    video.style.left = '50vw';
    video.style.transform = 'translate(-50%, -50%)';
}

function start(e=null) {
    if (devices && devices.getUserMedia) {
      devices.getUserMedia({ video: true })
        .then(function (stream) {
          adjust();
          video.autoplay = true;
          video.srcObject = stream;
          document.body.appendChild(video);
        })
        .catch(function (err0r) {
          console.log("Something went wrong!");
        });
    }
}

function stop(e=null) {
  var stream = video.srcObject;
  var tracks = stream.getTracks();

  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    track.stop();
  }

  video.srcObject = null;
}