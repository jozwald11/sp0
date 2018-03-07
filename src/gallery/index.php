<?php
	function filter($files)
	{
		$rv = array();
		foreach($files as $filename)
		{
			if ($filename != '.' && $filename != '..') 
			{							
				array_push($rv, $filename);
			}
		}
		return $rv;
	}

	$albums = filter(scandir("albums"));
	$imgs = array();
	for($i = 0; $i < count($albums); $i++)
	{
		array_push($imgs, filter(scandir("albums/" . $albums[$i])));
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<?php include "../res/meta.html"?>
		<link rel="stylesheet" type="text/css" href="/gallery/index.css"/>
		<script>
			
			var albums = <?php echo json_encode($albums);?>;
			var imgNames = <?php echo json_encode($imgs);?>;
			
			var albumIndex = 0;
		
			var imgsContainer; 
			
			function updateImg()
			{
				while(imgsContainer.firstChild) 
				{
					imgsContainer.removeChild(imgsContainer.firstChild);
				}
				for(var i = 0; i < imgNames[albumIndex].length; i++)
				{
					var link = "/gallery/albums/" + albums[albumIndex] + "/" + imgNames[albumIndex][i];
					imgsContainer.innerHTML += "<div><img src=\"" + link + "\"/><a href=" + link + "></div>" + imgNames[albumIndex][i] + "</a><br/>";
				}
			}
			
			window.onload = function()
			{	
				imgsContainer = document.getElementById("imgs");
				updateImg();
			}
			
			function albumChange()
			{
				albumIndex = document.getElementById("album").value;
				updateImg();
			}
			
			
		</script>
		<title> Orange Blinking Lights </title>
	</head>
	<body>
		<?php include "../res/sides.html"?>
		<?php include "../res/header.html"?>
		<div id="content">
			<h1> Gallery </h1>
			<p>
				Select a photo album from the drop down.
			</p>
			<select id="album" onChange="albumChange()">
				<?php
					$rv = "";
					for($i = 0; $i < count($albums); $i++)
					{
						$rv .= "<option value=\"" . $i . "\">" . $albums[$i] . "</option>";
					}
					echo $rv;
				?>
			</select>
			<div id="imgs"></div>
		</div>
	</body>
</html>