console.log("HIYOO");

let w = 640;
let h = 360;

let app = new PIXI.Application({width: w, height: h});

let vel = {dx: 7, dy: 7};

let container = document.getElementById('container');
container.appendChild(app.view);

let cat = PIXI.Sprite.from('cat.png');

cat.anchor.set(0.5);
cat.x = app.screen.width / 2;
cat.y = app.screen.height / 2;

app.stage.addChild(cat);
app.ticker.add(mainloop);

console.log(app.renderer);

let t = 0;

function mainloop (dt) {
    t += dt;
    app.renderer.backgroundColor = PIXI.utils.rgb2hex(color_wave(5, t));

    cat.x += vel.dx * dt;
    cat.y += vel.dy * dt;

    if (cat.x - 64 < 0) {
        cat.x = 64;
        vel.dx = -vel.dx;
    } else if (cat.x + 64 > w) {
        cat.x = w - 64;
        vel.dx = -vel.dx;
    }
    if (cat.y - 64 < 0) {
        cat.y = 64;
        vel.dy = -vel.dy
    } else if (cat.y + 64 > h) {
        cat.y = h - 64;
        vel.dy = -vel.dy
    }
}

function sine_wave(amp, freq, time, phase) {
    return amp * Math.sin(2 * Math.PI * freq * time + phase) + amp
}

function color_wave(freq, time) {
    let r = sine_wave(0.5, freq, time, 0);
    let g = sine_wave(0.5, freq, time, 2 * Math.PI / 3);
    let b = sine_wave(0.5, freq, time, (2 * Math.PI / 3) * 2);
    return [r, g, b];
}