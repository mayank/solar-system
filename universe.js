// global app
var universe = new App();
var scene = universe.getScene();


var sun = new Planet( universe, 'sun', 30, 0.0025);
// setting sun glow
sun.setMaterial({ emissiveMap: sun.getTexture(), emissive: 0xf9d71c, emissiveIntensity: 1.3 });
sun.castShadow(false);
sun.receiveShadow(false);

// light for sun
var light = new THREE.PointLight( 0xffffff, 1.5, 5000 );
light.castShadow = true;
scene.add( light );

var earth = new Planet( universe, 'earth', 9, 0.0125, 100, 0.001);
earth.orbitAround(sun);

var mercury = new Planet( universe, 'mercury', 3, 0.01, 40, 0.0017);
mercury.orbitAround(sun);

var mars = new Planet( universe, 'mars', 5, 0.005, 80, 0.0015);
mars.orbitAround(sun);

var moon = new Planet( universe, 'moon', 1.2, 0.01, 15, 0.001);
moon.orbitAround(earth);

universe.addToScene(sun);

universe.draw();