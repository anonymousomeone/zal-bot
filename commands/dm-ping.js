module.exports = {
	name: 'dm-ping',
	description: 'spam pings user in DM',
	async execute(message, args) {
		const { ownerID, pass } = require('./config.json');
		const taggedUser = message.mentions.users.first();
		const user = message.mentions.users.first();
		const targetID = taggedUser.id;
		const UPass = args[args.length - 1];
		if (UPass !== pass) {
			if (targetID === ownerID) {
				return message.channel.send('Zalander doesnt need to be spammed right now.');
			}
			const x = args[1];
			const times = parseInt(x);
			if (times <= 1 || times > 20) {
				return message.reply('you need to input a number between 1 and 20.');
			}
			let eee = 0;
			while (eee < times) {
				await user.send(`<@${taggedUser.id}>`);
				eee++;
			}
		}
		else {
			message.channel.bulkDelete(1);
			const x = args[1];
			const times = parseInt(x);
			let eee = 0;
			while (eee < times) {
				await user.send(`<@${taggedUser.id}>`);
				eee++;
			}
		}
	},
};