const { SlashCommandBuilder } = require('discord.js');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
    // The maximum is exclusive and the minimum is inclusive
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dice')
		.setDescription('I used to roll the dice')
		.addIntegerOption(option =>
			option.setName('sides')
				.setDescription('Sides of dice')
                .setMinValue(2)
				.setRequired(true),
            ),
	async execute(interaction) {
        await interaction.reply(`${interaction.user.username} has rolled ${getRandomInt(1, interaction.options.getInteger('sides') + 1)} .`);
	},
};