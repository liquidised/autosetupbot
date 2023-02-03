const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRow,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verifyembed")
    .setDescription("Sets up the verify embed")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addStringOption((option) =>
    option
      .setName("oauthlink")
      .setDescription("The oAuth link you wanna use.")
      .setRequired(true)
  ),

  async execute(interaction, client) {
    const { options } = interaction;
    const key = options.getString("oauthlink");
    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setAuthor({ name: 'Please verify your account to view the rest of the channels'})
      .setTitle("FAQ")
      .addFields(
        { name: 'Why am I verifying?', value: "This is to confirm you're a real person, and not a bot joining our server to attempt to spam invite links or the like."},
        { name: 'How long does it take to verify?', value: "Verifying generally takes up to 60 seconds maximum."},
        { name: 'Do I have to verify?', value: "You don't have to, but to access other channels, you will need to verify to view them."},
      )
      

      const failedembed = new EmbedBuilder()
      .setColor("Red")
      .setAuthor({ name: '❌ Failed'})
      .setTitle("You need to use a link!")
      .setDescription(`Fix your link!`)

      function isUrl(string) {
        const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return pattern.test(string);
      }

      if (!isUrl(key)) {
        return interaction.reply({
          embeds: [failedembed]
        }) 
      }

      await interaction.channel.createWebhook({
        name: 'MEE6',
        avatar: 'https://media.licdn.com/dms/image/C560BAQFFBLU4amrCGw/company-logo_200_200/0/1567784300873?e=2147483647&v=beta&t=zJfV1vhZm4KpidYviGQZ4BP7Y-DBIhHYzgqRyX16UAs',
      })
        .then(webhook => console.log(`Created webhook ${webhook}`))
        .catch(console.error);

        const webhooks = await interaction.channel.fetchWebhooks();
        const webhook = webhooks.find(wh => wh.token);
      

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel(`✅ Verify!`)
        .setURL(`${key}`)
        .setStyle(ButtonStyle.Link),
    );

      


    try {
      await webhook.send({
          embeds: [embed],
          components: [button],
        });

        await interaction.reply({ content: "✅ Webhook message **sent**!", ephemeral: true})
      } catch (err) {
      }
  },
};
