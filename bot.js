// setup
const fs = require('fs');
const Discord = require('discord.js');
const Client = require('./client/Client');
const { prefix, token, ownerID } = require('./config.json');

const client = new Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('for z!help', { type: 'WATCHING' });
});
client.login(token);

client.on('message', async message => {
	try {
		// if message doesnt start with prefix or was sent by bot then YEET it
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		// message processing
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();

		// commands start ========================================================
		if (command === 'kys' && message.author.id === ownerID) {
			message.channel.send('shutting down...');
			client.destroy();
		}
		if (command === 'guildlist') {
			client.guilds.cache.forEach(g => {
				message.channel.send(g.name);
			});
		}
		if (!client.commands.has(command)) return message.channel.send('The command: "' + prefix + command + '" doesnt exist');

		await client.commands.get(command).execute(message, args);
	}
	catch (error) {
		const aee = error.toString();
		let argh = aee.replace(/ /g, '+');
		argh = argh.replace(/'/g, '%27');
		argh = argh.replace(/;/g, '%3B');
		argh = argh.replace(/:/g, '%3A');
		message.channel.send('Something went wrong:\n```' + error + '```\n https://www.bing.com/search?q=' + argh);
	}
});