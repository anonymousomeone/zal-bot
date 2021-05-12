module.exports = {
	name: 'ping',
	description: 'pings user in current channel',
	async execute(message, args) {
		const { ownerID, pass } = require('./config.json');
		const taggedUser = message.mentions.users.first();
		const x = args[1];
		const times = parseInt(x);
		let eee = 0;
		const targetID = taggedUser.id;
		const UPass = args[args.length - 1];
		if (times <= 1 || times > 20) {
			return message.reply('you need to input a number between 1 and 20.');
		}
		if (UPass !== pass) {
			if (targetID === ownerID) {
				return message.channel.send('Zalander doesnt need to be spammed right now.');
			}
			while (eee < times) {
				await message.channel.send(`<@${taggedUser.id}>`);
				eee++;
			}
		}
		else {
			message.channel.bulkDelete(1);
			while (eee < times) {
				await message.channel.send(`<@${taggedUser.id}>`);
				eee++;
			}
		}
	},
};