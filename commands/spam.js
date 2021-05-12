module.exports = {
	name: 'spam',
	description: 'spams input message',
	async execute(message, args) {
		const { ownerID } = require('./config.json');
		let eee = 0;
		let sayMessage = message.content.split(' ').slice(1).join(' ');
		const avatarList = message.mentions.users.map(user => {
			return user.id;
		});
		sayMessage = sayMessage.toString();
		for(let i = 0; i < avatarList.length; i++) {
			if (avatarList[i] === ownerID) {
				sayMessage.splice(i, 1);
				message.channel.send('Zalander doesnt need to be spammed right now.');
			}
		}
		if (Number.isInteger(parseInt(args[args.length - 1]))) {
			const times = parseInt(args[args.length - 1]);
			if (times <= 1 || times > 20) {
				return message.reply('you need to input a number between 1 and 20.');
			}
			sayMessage = sayMessage.substring(0, sayMessage.length - 1);
			while (eee < times) {
				await message.channel.send(sayMessage);
				eee++;
			}
			return;
		}
		return message.channel.send('No int detected');
	},
};