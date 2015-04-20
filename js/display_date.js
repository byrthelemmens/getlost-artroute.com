function displayDate (dateString) {
	var date = new Date(dateString);
	var day = (date.getDate() + '').length === 2 ? date.getDate() : '0' + date.getDate();
	var month = ((date.getMonth() + 1) + '').length === 2 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
	return day + '.' + month + '.' + (date.getFullYear() + '').substr(2, 2);
}