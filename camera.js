'use strict';
export const cam = function(){

    let meta = document.createElement('meta');

    let ctn = document.createElement('div');
    let v = document.createElement('video');

    const devices = navigator.mediaDevices || null;

    function disableScreenResize() {
        meta.name = 'viewport';
        meta.content = 'width=device-width, user-scalable=no';
        document.head.appendChild(meta);
    }

    function adjust() {
        ctn.style.overflow = 'hidden';
        ctn.style.position = 'absolute';
        ctn.style.top = '0';
        ctn.style.left = '0';
        ctn.style.width = '100%';
        ctn.style.height = '100%';
        v.videoWidth = window.innerWidth;
        v.videoHeight = window.outerHeight;
    }

    async function flip(d='environment') { 
        const constraints = {
            video: {
                facingMode: d
            }
        };
        v.style.transform = (d=='user')?'scale(-1, 1)':'';
        await start(constraints);
    }

    async function start(e=null) {
        disableScreenResize();
        if (devices && devices.getUserMedia) {
            let stream = await devices.getUserMedia(e||{ video: true });
            
            adjust();
            v.autoplay = true;
            v.srcObject = stream;
            ctn.appendChild(v);
            document.body.appendChild(ctn);
        
            // console.log("Something went wrong!");
        }
    }

    function stop(e=null) {
        let stream = v.srcObject;
        let tracks = stream.getTracks();

        for (var i = 0; i < tracks.length; i++) {
            let track = tracks[i];
            track.stop();
        }

        v.srcObject = null;
    }

    function close () {
        ctn = null;
        v = null;
        document.body.removeChild(ctn);
        document.head.removeChild(meta);
    }
}