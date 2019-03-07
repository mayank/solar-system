function App() {
    this.init();
}

App.prototype.init = function(){
    this.scene = this.createScene();
    this.camera = this.createCamera();
    this.renderer = this.createRenderer();

    new THREE.Interaction(this.renderer, this.scene, this.camera);

    this.objects = [];
}

App.prototype.createRenderer = function(){
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x000000);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild( renderer.domElement );
    return renderer;
}

App.prototype.getScene = function(){
    return this.scene;
}

App.prototype.getRenderer = function(){
    return this.renderer;
}


App.prototype.createScene = function(){
    var scene = new THREE.Scene();
    var texture = THREE.ImageUtils.loadTexture('./textures/universe.jpg');
    scene.background = texture;
    return scene;
}

App.prototype.createCamera = function(){
    var camera = new THREE.PerspectiveCamera( 105, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.set( 70, 70, -70 );
    camera.lookAt( 0, 0, 0 );
    return camera;
}

App.prototype.addToScene = function(object) {
    this.scene.add( object.getMesh() );
}

App.prototype.addToAnimation = function( func, context ) {
    this.objects.push({ context: context, func: func });
}

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

App.prototype.getCamera = function(){
    return this.camera;
}