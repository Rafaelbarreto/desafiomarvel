function setLocalStorage(cname, cvalue) {
	window.localStorage.setItem(cname, cvalue);
}

function getLocalStorage(cname) {
	return window.localStorage.getItem(cname);
}

function deleteLocalStorage(name) {
	window.localStorage.removeItem(name);
}

function deleteAll(){
	window.localStorage.clear();
}