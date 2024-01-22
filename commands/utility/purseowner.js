const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

const cancelGifs = [
        'https://media.discordapp.net/attachments/851405373260431380/1198644595060387850/LiveSharkReactionxD.gif?ex=65bfa7c5&is=65ad32c5&hm=faab8f2325283e4f8a07739827125666114a714e3f706fef41527ecd4a0f56f3&',
        'https://tenor.com/view/cat-walking-reverse-walking-gray-cat-%D1%85%D0%BE%D0%B6%D1%83%D1%85-gif-19743227',
        'https://tenor.com/view/akechi-goro-akechi-persona5-p5-turn-around-gif-27606560',
        'https://tenor.com/view/i-have-your-ip-address-gif-20887609',
        'https://tenor.com/view/junpei-enviando-mentiras-the-rock-gif-24174493',
	'https://tenor.com/view/schlatt-jschlatt-schlagg-pope-schlatt-pope-gif-20330385',
	'https://tenor.com/view/jerma-gif-22821132',
	'https://tenor.com/view/jschlatt-schlatt-big-guy-stare-gif-20074043',
	'https://tenor.com/view/goro-majima-majima-memes-meme-gif-gif-23334114',
	'https://tenor.com/view/darkest-dungeon-facepalm-gif-25851591',
	'https://tenor.com/view/omori-omori-kel-omori-caustic-gif-20270030',
        ];

const confirmGifs = [
        'https://tenor.com/view/all-out-attack-joker-all-out-attack-persona5-gif-25596106',
        'https://tenor.com/view/markiplier-gif-24903806',
        'https://tenor.com/view/persona-5-goro-akechi-akechi-goro-pepper-spray-persona-5-royal-gif-5830106438121124763',
        'https://tenor.com/view/ultrakill-minos-prime-minos-v1-gif-2894075759939919595',
        'https://tenor.com/view/library-of-ruina-lor-roland-honest-reaction-gif-12109604047186406961',
        'https://tenor.com/view/heat-kiryu-throwing-into-water-yakuza3-yakuza-water-gif-26465090',
        'https://tenor.com/view/captain-price-punch-gif-19248454',
        'https://tenor.com/view/renren-meandskrunkily-ren-akechi-gif-25793503',
	'https://tenor.com/view/chuck-review-teardown-teardown-game-destruction-gif-23612690',
	'https://tenor.com/view/metal-gear-rising-revengeance-raiden-sundowner-get-real-gif-23093937',
	'https://tenor.com/view/leon-chokes-choking-ada-wong-gif-26380793',
	'https://tenor.com/view/jerma985-jerma-vinesauce-vinny-vinesauce-vargskelethor-gif-23761612',
        ];

        function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min) + min);
                // The maximum is exclusive and the minimum is inclusive
        }

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purseowner')
		.setDescription('It\'s our chance for all out attack'),

	async execute(interaction) {

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                        .setCustomId('cancel')
                        .setLabel('Break Formation')
                        .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                        .setCustomId('confirm')
                        .setLabel('All-out Attack')
                        .setStyle(ButtonStyle.Danger),
            );

        const response = await interaction.reply({
                content: 'IT\'S OUR CHANCE FOR ALL OUT ATTACK',
                components: [row],
        });

        const collectorFilter = i => i.user.id === interaction.user.id;

                try {
                        const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

                        if (confirmation.customId === 'confirm') {
                                await confirmation.update({ content: `${confirmGifs[getRandomInt(0, confirmGifs.length)]}`, components:[] });
                        } else if (confirmation.customId === 'cancel') {
                                await confirmation.update({ content: `${cancelGifs[getRandomInt(0, cancelGifs.length)]}`, components:[] });
                        }
                } catch (e) {
                        await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
                }
	},
};