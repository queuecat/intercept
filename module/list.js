const responseList = [];

const getList = () => {
	return responseList;
};
const pushList = (item) => {
	responseList.push(item);
};
const clearList = () => {
	responseList = [];
};

module.exports = {
	getList,
	pushList,
	clearList,
};
