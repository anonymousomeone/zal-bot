module.exports = {
	name: 'tts',
	description: 'says something in vc',
	async execute(message) {
		const say = require('say');
		const FS = require('fs');

		if (!FS.existsSync('./temp')) {
			FS.mkdirSync('./temp');
		}
		const text2 = message.author.username + ' says: ' + message.content.split(' ').slice(1).join(' ');

		const timestamp = new Date().getTime();
		const soundPath = `./temp/${timestamp}.wav`;
		const voiceChannel = message.member.voice.channel;
		say.export(text2, null, 1, soundPath, (err) => {
			if (err) {
				console.error(err);
				return;
			}
			else{
				voiceChannel.join().then((connection) => {
					connection.play(soundPath).on('end', () => {
						connection.disconnect();
						FS.unlinkSync(soundPath);
					}).on('error', (err) => {
						console.error(err);
						connection.disconnect();
						FS.unlinkSync(soundPath);
					});
				}).catch((err) => {
					console.error(err);
				});
			}
		});
	},
};