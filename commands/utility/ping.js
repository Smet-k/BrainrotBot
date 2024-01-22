const { SlashCommandBuilder } = require('discord.js');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * max + min);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
        switch (getRandomInt(1, 6)) {
            case 1:await interaction.reply('You should Pong as i did.');break;
            case 2:await interaction.reply('Funky.');break;
            case 3:await interaction.reply('FUCKING DIE!');break;
            case 4:await interaction.reply('JUDGEMENT!');break;
            case 5:await interaction.reply('THY END IS NOW');break;
            case 6:await interaction.reply('WEAK');break;
            case 7:await interaction.reply('DIE');break;
            default:break;
        }
	},
};