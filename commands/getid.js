module.exports = {
	name: 'getid',
	description: 'gets mentioned users id',
	execute(message) {
		const user = message.mentions.users.first();
		const userid = user.id;
		message.channel.send(userid);
	},
};