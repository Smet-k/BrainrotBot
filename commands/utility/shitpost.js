const { SlashCommandBuilder } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');
const { AudioPlayerStatus, joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { guildId } = require('../../config.json');

const audioPaths = [];

const audioFolderPath = path.join('/home/smetk/Desktop/Projs/NodeJS/Brainrotbot/audio/soundpad');
const audioFolder = fs.readdirSync(audioFolderPath);

for (const audioFile of audioFolder) {
    audioPaths.push('/home/smetk/Desktop/Projs/NodeJS/Brainrotbot/audio/soundpad/' + audioFile);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
    // The maximum is exclusive and the minimum is inclusive
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('shitpost')
        .setDescription('Plays random audio in the VC'),
    async execute(interaction) {
        const { channel } = interaction.member.voice;
        if (channel != null) {
            const player = createAudioPlayer();

            player.on(AudioPlayerStatus.Playing, () => {
                console.log('The audio player has started playing');
            });

            player.on('error', error => {
                console.error(`Error: ${error.message} with resource`);
            });

            const resource = createAudioResource(audioPaths[getRandomInt(0, audioPaths.length)]);

            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            await interaction.reply(`Playing audio for ${interaction.user}.`);

            connection.subscribe(player);
            player.play(resource);

            player.on('stateChange', (oldState, newState) => {
                if (newState.status === 'idle') setTimeout(() => connection.destroy(), 5_000);
            });
        } else {
            interaction.reply('You must be in a voice channel to call this command!');
        }
    },
};