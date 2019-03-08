/**
 * its own access, orbit around a planet etc. 
 * @constructor
 * @param {App} app - App Context to access Scene, Camera and Animation Loop
 * @param {String} name - Name of the Planet
 * @param {Number} size - Size of the Planet
 * @param {Number} rotation - Rotation Speed on its own Access
 * @param {Number=} distance - Distance from Center of Orbit
 * @param {Number=} speed - Speed of Orbiting
 */
function Planet( app, name, size, rotation, distance, speed ) {
    this.segments = 64;

    this.app = app;

    this.img = './textures/' + name + '.jpg';
    this.name = name;
    this.size = size;
    this.rotation = rotation;
    this.speed = speed;
    this.distance = distance;

    this.animators = [];

    this.start = 0;

    this.init();

    this.app.addToAnimation( this.animate, this );
}

/**
 * Initializes the basics like scene, camera and renderer
 */
Planet.prototype.init = function(){
    var self = this;
    this.geometry = new THREE.SphereGeometry( this.size, this.segments, this.segments );
    this.texture = THREE.ImageUtils.loadTexture( this.img );
    this.material = new THREE.MeshLambertMaterial( { map: this.texture } );
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.setHoverProperty();
}

/**
 * Enables hover over the planets, shows their names
 */
Planet.prototype.setHoverProperty = function(){
    var self = this;

    this.mesh.on('mouseover', function(event){
        event.stopPropagation();
        self.geometry.scale(1.1, 1.1, 1.1);
        document.getElementById('info').innerHTML = self.name;
    });

    this.mesh.on('mouseout', function(event){
        event.stopPropagation();
        self.geometry.scale(0.9, 0.9, 0.9);
        document.getElementById('info').innerHTML = 'universe';
    });
}

/**
 * Enables/Disables shadow casting
 * @param {Boolean} bool - true/false
 */
Planet.prototype.castShadow = function(bool) {
    this.mesh.castShadow = bool;
}

/**
 * Enables/Disables shadow recieveing
 * @param {Boolean} bool - true/false
 */
Planet.prototype.receiveShadow = function(bool) {
    this.mesh.receiveShadow = bool;
}

/**
 * Sets different properties to the Planet
 * @param {Object} properties - Key/Value Pairs of Material Properties
 * @example
 * sun.setMaterial({ emissiveMap: new THREE.Texture(), emissive: 0xf9d71c, emissiveIntensity: 1.3 });
 */
Planet.prototype.setMaterial = function ( properties ) {
    this.material.setValues( properties );
}

/**
 * Sets the orbit of the current Planet to a different planet.
 * @param {Planet} planet - Parent Planet Object
 */
Planet.prototype.orbitAround = function ( planet ) {
    this.setOrbit(0, 0);
    planet.getMesh().add( this.getMesh() );
}

Planet.prototype.getTexture = function () {
    return this.texture;
}

Planet.prototype.setOrbit = function( x, y ){
    this.orbit = new THREE.Path();
    this.orbit.arc( x, y, this.distance, 0, 2*Math.PI );   
}

Planet.prototype.getMesh = function(){
    return this.mesh;
}

/**
 * Animation Loop Function for the Planet
 * @param {Planet} self - Current Object of Planet
 * @reutrns {Planet}
 */
Planet.prototype.animate = function( self ){
    if(self.speed) {
        var point = self.orbit.getPoint( self.start );
        self.start = (self.start >= 1 ) ? 0 : (self.start + self.speed);
        if(point) {
            self.mesh.position.set( point.x, 0, point.y );
        }
    }
    self.mesh.rotation.y += self.rotation;
    return self;
}