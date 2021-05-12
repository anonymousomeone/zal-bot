module.exports = {
	name: 'educate',
	description: '_educates_ a victim',
	async execute(message) {
		const { ownerID } = require('./config.json');
		const user = message.mentions.users.first();
		if (!user) {
			return message.channel.send('Mention a user!');
		}
		if (message.author.id === ownerID) {
			null;
		}
		else if (user.id === ownerID) {
			return message.channel.send('Zalander doesnt need to be educated right now.');
		}
		if (!message.channel.nsfw) {
			return message.channel.send('You arent in a nsfw channel (bruh)');
		}

		message.channel.send('High Orbit Furry Cannon™ is now ***armed.***');

		const data = 'aHR0cHM6Ly93d3cucmVkZGl0LmNvbS9yL3lpZmYvcmFuZG9tLy5qc29u';

		const buff = Buffer.from(data, 'base64');
		const text = buff.toString('utf-8');

		const got = require('got');
		let eee = 0;
		const times = 50;
		message.channel.send('Firing in 3...');
		await new Promise(r => setTimeout(r, 1000));
		message.channel.send('Firing in 2...');
		await new Promise(r => setTimeout(r, 1000));
		message.channel.send('Firing in 1...');
		await new Promise(r => setTimeout(r, 2000));

		while (eee < times) {
			await got(text)
				.then(async response => {
					const [list] = JSON.parse(response.body);
					const [post] = list.data.children;
					await user.send(post.data.url);
				});
			eee++;
		}
	},
};