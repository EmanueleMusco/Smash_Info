let app = new PIXI.Application({ width: innerWidth, height: innerHeight });
document.body.appendChild(app.view);


//caricamento sprite navicella
let nav = PIXI.Sprite.from('sample.png');
nav.scale.set(1);
nav.anchor.set(0.5)
nav.x = app.view.width / 2;
nav.y = app.view.height / 2;
app.renderer.backgroundColor = 0x000080;
app.stage.addChild(nav);
app.ticker.add(gameloop);
const speedMovementY = 5;
const speedMovementX = 5;
let keys = {}

let textureArray = [];
//immagini corsa destra
let immagini = [];

var w = window.innerWidth;
var h = window.innerHeight;



//prende il codice del tasto premuto
window.addEventListener('keydown', keysDown);
window.addEventListener('keyup', keysUp);


//if premuto destra allora x, se premuto sinistra allora y
//animazione

function animazione(key) {
    if (keys["KeyD"]) // destra
    {
        immagini = ["immagini/omino blu-0.png", "immagini/omino blu-1.png", "immagini/omino blu-2.png", "immagini/omino blu-3.png", "immagini/omino blu-4.png", "immagini/omino blu-5.png", "immagini/omino blu-6.png", "immagini/omino blu-7.png", "immagini/omino blu-8.png", "immagini/omino blu-9.png"]
        for (let i = 0; i < 10; i++) {
            let texture = PIXI.Texture.from(immagini[i]);
            textureArray.push(texture);
        };
        
    }
    
    let animatedSprite = new PIXI.AnimatedSprite(textureArray);
    animatedSprite.loop = true;
    animatedSprite.animationSpeed = .25;
    app.stage.addChild(animatedSprite);
    
    animatedSprite.play();
    if(key==-1){
        animatedSprite.stop();
    }
}






function keysUp(e) {
    keys[e.code] = false
    animazione(-1)
}
function keysDown(e) {
    keys[e.code] = true
    animazione(e.code)
}
//premuto d texturearray prende valore, on keydown richiama animazione quindi anche se si schiaccia altro parte l'animazione
//


function gameloop() {
    checkposition()
}


function movement() {
    
    if (keys["KeyW"]) {
        nav.y -= speedMovementY;
    }
    if (keys["KeyA"]) {
        nav.x -= speedMovementX;
    }
    if (keys["KeyS"]) {
        nav.y += speedMovementY;
    }
    if (keys["KeyD"]) {
        nav.x += speedMovementX;
    }
    
}

function checkposition() {
    let limitDestra = w - 94 // - lunghezza sprite
    let limitSinistra = 0 + 94// + lunghezza sprite
    let limitSopra = 0 + 100;
    let limitSotto = h - 94;
    if (nav.position.x >= limitDestra) {
        keys["KeyD"] = false;
    } else if (nav.position.x <= limitSinistra) {
        keys["KeyA"] = false;
    }

    if (nav.position.y <= limitSopra) {
        keys["KeyW"] = false;
    } else if (nav.position.y >= limitSotto) {
        keys["KeyS"] = false;
    }
    movement();
}



