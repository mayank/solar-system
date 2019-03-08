/**
 * Core Class to Render Canvas Web GL
 * @constructor
 * @author Mayank [mayank.mishra@proptiger.com]
 */
function App() {
    this.init();
}

/**
 * Initializes the basics like scene, camera and renderer
 */
App.prototype.init = function(){
    this.scene = this.createScene();
    this.camera = this.createCamera();
    this.renderer = this.createRenderer();

    new THREE.Interaction(this.renderer, this.scene, this.camera);

    this.objects = [];
}

/**
 * Create a new Web GL Renderer with shadow enabled
 * @returns {THREE.Renderer} renderer - WebGL Renderer
 */
App.prototype.createRenderer = function(){
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x000000);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild( renderer.domElement );
    return renderer;
}

/**
 * @returns {THREE.Scene} scene - three.js Scene object
 * @deprecated since version 2.0
 */
App.prototype.getScene = function(){
    return this.scene;
}

/**
 * @returns {THREE.Renderer} renderer - three.js Renderer object
 */
App.prototype.getRenderer = function(){
    return this.renderer;
}

/**
 * creates new scene with universe texture
 * @returns {THREE.Scene} scene - three.js Scene object
 */
App.prototype.createScene = function(){
    var scene = new THREE.Scene();
    var texture = THREE.ImageUtils.loadTexture('./textures/universe.jpg');
    scene.background = texture;
    return scene;
}

/**
 * creates new perspective camera
 * @returns {THREE.Camera} camera - three.js camera object
 */
App.prototype.createCamera = function(){
    var camera = new THREE.PerspectiveCamera( 105, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.set( 70, 70, -70 );
    camera.lookAt( 0, 0, 0 );
    return camera;
}

/**
 * adds a new object/mesh to a existing created scene
 * @param {THREE.Mesh} object
 * @example
 * addToScene( new THREE.Mesh(new THREE.ShpereGeometry(1,1,1), new THREE.BasicMeshMaterial()))
 */
App.prototype.addToScene = function(object) {
    this.scene.add( object.getMesh() );
}

/**
 * adds adds function to animation loop
 * @param {function} func - Callback function on every loop
 * @param {Planet} context - context of the Planet class
 * @todo add an example
 */
App.prototype.addToAnimation = function( func, context ) {
    this.objects.push({ context: context, func: func });
}

/**
 * begins the animation
 */
App.prototype.draw = function() {
    var self = this;

    requestAnimationFrame( function(){
        self.draw();
    });

    this.objects.forEach(function(obj){
        obj.context = obj.func(obj.context);
    });

    this.renderer.render( this.scene, this.camera );
}

/**
 * returns camera
 * @returns {THREE.Camera} camera - three.js camera object
 */
App.prototype.getCamera = function(){
    return this.camera;
}