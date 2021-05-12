module.exports = {
	name: 'say',
	description: 'makes the bot say something',
	execute(message) {
		const sayMessage = message.content.split(' ').slice(1).join(' ');

		message.channel.send(sayMessage);
	},
};