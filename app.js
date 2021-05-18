let v = document.createElement('video');

const devices = navigator.mediaDevices || null;

function adjust() {
    v.videoWidth = window.innerWidth;
    v.videoHeight = window.innerHeight;
    v.style.margin = '0 auto';
    v.style.position = 'absolute';
    v.style.top = '0';
    v.style.left = '0';
    v.style.zIndex = '0';
}

function flip(d='environment') { 
    const constraints = {
        video: {
            facingMode: d
        }
    };
    v.style.transform = (d=='user')?'scale(-1, 1)':'';
    start(constraints);
}

function start(e=null) {
    if (devices && devices.getUserMedia) {
        devices.getUserMedia(e||{ video: true })
        .then(function (stream) {
            adjust();
            v.autoplay = true;
            v.srcObject = stream;
            document.body.appendChild(v);
        })
        .catch(function (err0r) {
            console.log("Something went wrong!");
        });
    }
}

function stop(e=null) {
    var stream = v.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    track.stop();
    }

    v.srcObject = null;
}