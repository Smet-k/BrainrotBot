const { SlashCommandBuilder } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');
const { AudioPlayerStatus, joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { guildId } = require('../../config.json');

const audioPaths = [];

const audioFolderPath = path.join('/home/smetk/Desktop/Projs/NodeJS/Brainrotbot/audio/obliterationSounds');
const audioFolder = fs.readdirSync(audioFolderPath);

for (const audioFile of audioFolder) {
    audioPaths.push('/home/smetk/Desktop/Projs/NodeJS/Brainrotbot/audio/obliterationSounds/' + audioFile);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
    // The maximum is exclusive and the minimum is inclusive
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('obliterate')
		.setDescription('just straight up kills someone irl')
        .addUserOption(option =>
			option.setName('victim')
				.setDescription('victim')
				.setRequired(true),
            ),

    async execute(interaction) {
        // Getting user to disconnect him
        const targetUserId = interaction.options.get('victim').value;
        const targetUser = await interaction.guild.members.fetch(targetUserId);

        const player = createAudioPlayer();

        player.on(AudioPlayerStatus.Playing, () => {
            console.log('The audio player has started playing');
        });

        player.on('error', error => {
            console.error(`Error: ${error.message} with resource`);
        });

        const resource = createAudioResource(audioPaths[getRandomInt(0, audioPaths.length)]);

        const connection = joinVoiceChannel({
            channelId: '581943905319125006',
            guildId: guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        connection.subscribe(player);
        player.play(resource);

        setTimeout(() => targetUser.voice.disconnect(), 2_000);

        player.on('stateChange', (oldState, newState) => {
            if (newState.status === 'idle') setTimeout(() => connection.destroy(), 1_000);
        });

        await interaction.reply('Target acquired');
    },

};

