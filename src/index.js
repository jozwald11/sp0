var scene = new THREE.Scene();
scene.background = new THREE.Color(0x1f222b);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var objs = [];
var lights = [];
var lightVs = [];

for(var i = 0; i < 15; i++)
{
	var geometry = new THREE.DodecahedronGeometry(1.5, 0);
	var material = new THREE.MeshStandardMaterial({color: 0x373644, roughness: 0, emissive:0x373644});
	objs[i] = new THREE.Mesh(geometry, material);
	objs[i].position.x = 20 * Math.random() - 10;
	objs[i].position.y = 20 * Math.random() - 10;
	objs[i].position.z = 20 * Math.random() - 10;
	scene.add(objs[i]);
	lights[i] = new THREE.PointLight(0xff5800, 5, 0, 1);
	lights[i].position.x = 20 * Math.random() - 10;
	lights[i].position.y = 20 * Math.random() - 10;
	lights[i].position.z = 20 * Math.random() - 10;
	lights[i].offset = 4000 * Math.random() + 2000;
	scene.add(lights[i]);
	var geometry = new THREE.DodecahedronGeometry(0, 1);
	var material = new THREE.MeshStandardMaterial({color: 0xff5800, roughness: 0, emissive:0xff5800});
	lightVs[i] = new THREE.Mesh(geometry, material);
	lightVs[i].position.x = lights[i].position.x;
	lightVs[i].position.y = lights[i].position.y;
	lightVs[i].position.z = lights[i].position.z;
	scene.add(lightVs[i]);
}

//var alight = new THREE.AmbientLight(0xffffff);
//scene.add(alight);

var animate = function () 
{
	requestAnimationFrame(animate);
	camera.position.x = 15 * Math.cos(Date.now() / 2000);
	camera.position.z = 15 * Math.cos(Date.now() / 2000);
	camera.position.z = 15 * Math.sin(Date.now() / 2000);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	for(var i = 0; i < 15; i++)
	{	
		lights[i].distance = 15 * Math.abs(Math.sin((Date.now() / lights[i].offset)));
		lightVs[i].scale.set(lights[i].distance / 50, lights[i].distance / 50, lights[i].distance / 50)
	}
	renderer.render(scene, camera);
};
animate();