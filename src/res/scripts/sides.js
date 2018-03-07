var scene = new THREE.Scene();
scene.background = new THREE.Color(0x1f222b);
var camera = new THREE.PerspectiveCamera(10, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 100;

var oSlected, iSelected, oSelected2, iSelected2;

function CyanOrangeOrbit(wf)
{
	var obj, light, lightV, light2, light2V;
	var geometry = new THREE.DodecahedronGeometry(1, 0);
	var material = new THREE.MeshStandardMaterial({color: 0x373644, roughness: 0, emissive:0x373644, wireframe: wf});
	obj = new THREE.Mesh(geometry, material);
	scene.add(obj);
	light = new THREE.PointLight(0xff5800, 5, 0, 1);
	scene.add(light);
	var geometry2 = new THREE.DodecahedronGeometry(0.2, (wf ? 0 : 1));
	var material2 = new THREE.MeshStandardMaterial({color: 0xff5800, roughness: 0, emissive:0xff5800, wireframe: wf});
	lightV = new THREE.Mesh(geometry2, material2);
	scene.add(lightV);
	light2 = new THREE.PointLight(0xff5800, 5, 0, 1);
	scene.add(light2);
	light2V = new THREE.Mesh(geometry2, material2);
	scene.add(light2V);
	var f = function(pos)
	{
		var xp = Math.sin(Date.now() / 1600);
		var yp = 2 * Math.cos(Date.now() / 800);
		var zp = 2 * Math.sin(Date.now() / 800);
		lightV.position.set(xp, yp, zp);
		light.position.set(xp, yp, zp);
		light2V.position.set(-xp, -yp, -zp);
		light2.position.set(-xp, -yp, -zp);
		obj.position.set(0, 0, 0);
		obj.position.add(pos);
		obj.rotation.y+=0.01;
		lightV.position.add(pos);
		light.position.add(pos);
		light2V.position.add(pos);
		light2.position.add(pos);
	};
	if(wf)
		iSelected = f;
	else
		iSelected2 = f;
}

/*function dCluster()
{
	var objs = [], light, lightV;
	for(var i = 0; i < 10; i++)
	{
		objs[i] = new THREE.Mesh(new THREE.DodecahedronGeometry(1, 0);, new THREE.MeshStandardMaterial({color: 0x373644, roughness: 0, emissive:0x373644}););
		objs[i].position.set(3 * Math.random(), 5 * Math.random(), 3 * Math.random());
	}
	
}*/

oSelected = CyanOrangeOrbit;
oSelected2 = CyanOrangeOrbit;

var animate = function () 
{
	requestAnimationFrame(animate);
	iSelected(new THREE.Vector3(-15, 0, 0));
	iSelected2(new THREE.Vector3(15, 0, 0));
	renderer.render(scene, camera);
};
oSelected(true);
oSelected2(false);
animate();