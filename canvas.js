let c = document.createElement('canvas');
let ctx = c.getContext('2d');

var sources = {
   hat: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpluspng.com%2Fimg-png%2Fbaseball-hat-png-front-dark-blue-hat-3497.png&f=1&nofb=1',
   top: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F2016%2F04%2FT-Shirt-PNG-Clipart.png&f=1&nofb=1',
   btm: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpngimg.com%2Fuploads%2Fjeans%2Fjeans_PNG5745.png&f=1&nofb=1'
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
    
function adjust() {
    c.width = ww;
    c.height = wh;
    c.style.margin = '0px';
    c.style.position = 'absolute';
    c.style.top = '0';
    c.style.left = '0';
    c.style.zIndex = '1000';
}

function loadImages(sources, callback) {
    
  document.body.appendChild(c);
  var images = {};
  var loadedImages = 0;
  var numImages = 0;
  
  // get num of sources
  for(var src in sources) {
     numImages++;
  }
  
  for(var src in sources) {
     images[src] = new Image();
     images[src].onload = function() {
        if(++loadedImages >= numImages) {
           callback(images);
        }
     };
     images[src].src = sources[src];
   }
}

function draw() {
    loadImages(sources, function(images) {
        adjust();
        let hx = rz(ww, 0.45); let tx = hx*3.25;
        // ctx.drawImage(images.btm, cx(325), 325, 325, 250);
        ctx.drawImage(images.top, cx(tx), hx*1.475, tx, tx*rt(images.top));
        ctx.drawImage(images.hat, cx(hx), 25, hx, hx*rt(images.hat));
    });
}
