module.exports = {
	name: 'mass-censor',
	description: 'uses bulkDelete() command to delete any amount of messages up to 50.',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		}
		else if (amount <= 1 || amount > 51) {
			return message.reply('you need to input a number between 1 and 50.');
		} message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});


		message.channel.send('mass censoring successful!');
	},
};