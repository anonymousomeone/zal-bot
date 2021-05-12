module.exports = {
	name: 'search',
	description: 'searches for a youtube video',
	async execute(message, args) {
		const search = require('youtube-search');
		const config = require('./config.json');
		const command = require('./play');
		const opts = {
			maxResults: 10,
			key: config['yt-api'],
			type: 'video',
		};
		// const embed = new discord.MessageEmbed()
		// 	.setColor('#73ffdc')
		// 	.setDescription('Please enter a search query. Remember to narrow down your search.')
		// 	.setTitle('YouTube Search API');
		// await message.channel.send(embed);
		let filter = m => m.author.id === message.author.id;
		const yMessage = message.content.split(' ').slice(1).join(' ');
		const results = await search(yMessage, opts).catch(err => console.log(err));
		if(results) {
			const youtubeResults = results.results;
			let i = 0;
			const titles = youtubeResults.map(result => {
				i++;
				return i + ') ' + result.title;
			});
			message.channel.send({
				embed: {
					title: 'Select which song you want by typing the number',
					description: titles.join('\n'),
				},
			}).catch(err => console.log(err));

			filter = m => (m.author.id === message.author.id);
			const arg = args[args.length - 1];
			message.channel.send(arg);
			if (arg != 'true') {
				message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
					.then(collected => {
						let selected = youtubeResults[parseInt(collected.first().content - 1)];
						selected = `${selected.link}`;
						selected = selected.toString();
						command.execute(message, selected);
					})
					.catch(() => {
						message.channel.send('Timeout, try again');
					});
			}
			else {
				let selected = youtubeResults[1];
				selected = `${selected.link}`;
				selected = selected.toString();
				command.execute(message, selected);
			}
		}
	},
};