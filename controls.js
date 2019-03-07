// track controls
var clock = new THREE.Clock();
var controls = new THREE.TrackballControls( universe.getCamera() );
controls.target.set( 0, 0, 0 );
universe.addToAnimation(function(){
    controls.update(clock.getDelta());
});

// enabling VR
document.body.appendChild( WEBVR.createButton( universe.getRenderer() ) );
universe.getRenderer().vr.enabled = true;
