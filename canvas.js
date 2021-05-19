let c = document.createElement('canvas');
let ctx = c.getContext('2d');

let screenshot = new Image();

var sources = {
};

const ww = window.innerWidth;
const wh = window.innerHeight;

function rt(img) {
    return img.height/img.width
}

function rz(d, p) {
    return d*p;
}

function cx(w) {
    return (ww-w)/2
}
    
function init() {
    document.body.appendChild(c);
    c.width = ww;
    c.height = wh;
    c.style.margin = '0px';
    c.style.position = 'absolute';
    c.style.top = '0';
    c.style.left = '0';
    c.style.zIndex = '1000';
}

function loadMedia(sources, callback) {
    
  let media = {};
  let loadedMedia = 0;
  let numMedia = 0;
  
  // get num of sources
  for(let src in sources) {
     numMedia++;
  }
  
  for(let i in sources) {
     let s = sources[i];

     media[i] = new Image();
     
     media[i].onload = function() {
         if(++loadedMedia >= numMedia) {
           callback(media)
        }
     };

     if(s.srcObject) {

        // testing invert canvas/imae data
         ctx.save();
         ctx.translate(c.width, 0);
         ctx.scale(-1, 1);

         ctx.drawImage(s,0,0,-1*s.videoWidth,s.videoHeight);
         media[i].src = c.toDataURL();

         // may take away
         ctx.restore();
    } else {
        media[i].src = s.src;
     }
   }
}

function draw(sources) {
    sources = sources;
    init();
    loadMedia(sources, function(media) {
        for(let i in sources) {
            let s = sources[i];
            if(s.srcObject){
                ctx.drawImage(s, 0, 0, s.videoWidth, s.videoHeight);
            } else {
                let rzw = rz(ww, s.p||0.75);
                ctx.drawImage(media[i], cx(rzw), s.y, rzw, rzw*rt(media[i]));
            }
        };
    });
}

function snap() {
    screenshot.style.zIndex = '1001';
    screenshot.style.position = 'absolute';
    document.body.appendChild(screenshot);
    screenshot.src = c.toDataURL('image/jpeg');
}

function clear () {
    ctx = null;
    c = null;
    document.body.removeChild(c);
}