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

Planet.prototype.castShadow = function(bool) {
    this.mesh.castShadow = bool;
}

Planet.prototype.receiveShadow = function(bool) {
    this.mesh.receiveShadow = bool;
}

Planet.prototype.setMaterial = function ( properties ) {
    this.material.setValues( properties );
}

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