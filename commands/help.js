module.exports = {
	name: 'help',
	description: 'displays this help message',
	execute(message) {
		message.channel.send('Zalander\'s bot V1.0.2\n  Here are my commands: \n```\nz!help, dispays this help message.\nz!kys, kills the bot (for dev only).\nz!mass-censor [number], deletes [number] of messages in current channel.\nz!meme, grabs random meme from reddit.\nz!nowplaying, gets currently playing song from music queue.\nz!ping [@user] [number], pings mentioned [user] [number] of times.\nz!play [youtubeURL or video name], adds [youtubeURL or video name] to current music queue.\nz!say [message], makes the bot say [message].\nz!skip, skips current playing song.\nz!spam [message] [number], spams [message] [number] of times in current channel.\nz!stop, stops music queue.\n```');
	},
};