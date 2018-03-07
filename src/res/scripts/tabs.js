
var tabs, tab, col = getRandColor();

$(function()
{
	var ctrl = document.getElementById("tabCtrl"), btn;
	tabs = document.getElementsByClassName("tab");
	for(var i = 0; i < tabs.length; i++)
	{
		btn = document.createElement("button");
		btn.classList.add("tabBtn");
		btn.innerHTML = tabs[i].id;
		btn.onclick = function(){changeTab(this.innerHTML);};
		ctrl.appendChild(btn);
		tabs[i].linked = btn;
	}
	changeTab(tabs[0].id);
});

function changeTab(tabID)
{
	for(var i = 0; i < tabs.length; i++)
	{
		tabs[i].style = tabs[i].id == tabID ? "" : "display:none;";
		tabs[i].linked.style = tabs[i].id == tabID ? "background-color:" + col + ";" : "background-color:#000;";
	}
}