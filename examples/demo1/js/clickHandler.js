var ssaa = checkUp($("photo_mirro"));
function checkUp(target) {
	var aa = target.dataset.target;
	if (aa!==undefined)return aa;
	return checkUp(target.parentElement);
};