const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");

function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }
}


module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("sets the server up")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),


  async execute(interaction) {
    interaction.guild.channels.cache.forEach((channel) => { channel.delete() }); //deletes all channels

    const existingcategory = interaction.guild.channels.cache.filter( (channel) => channel.type === 4 ); // 4 = category
    const existingCategoryNames = existingcategory.map( (category) => category.name );

    const existingchannels = interaction.guild.channels.cache.filter( (channel) => channel.type === 0 ); // 4 = category
    const existingChannelNames = existingcategory.map( (category) => category.name );

    const existingvoicechannels = interaction.guild.channels.cache.filter( (channel) => channel.type === 2 ); // 4 = category
    const existingVoiceChannelNames = existingcategory.map( (category) => category.name );

    interaction.guild.channels
        .create({
            name: "▬▬▬ Verification ▬▬▬",
            type: 4,
            permissionOverwrites: [
                {
                  id: interaction.guild.roles.everyone,
                  deny: [PermissionsBitField.Flags.SendMessages],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: [PermissionsBitField.Flags.CreatePrivateThreads],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: [PermissionsBitField.Flags.CreatePublicThreads],
                },
            ],
        })
        .then((category) => {
            interaction.guild.channels.create({
                name: "✅┇verify",
                type: 0,
                parent: category,
            });
        })

    interaction.guild.channels
      .create({
        name: "▬▬▬ Important ▬▬▬",
        type: 4,
        permissionOverwrites: [
          {
            id: interaction.guild.roles.everyone,
            deny: [PermissionsBitField.Flags.SendMessages],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: [PermissionsBitField.Flags.CreatePrivateThreads],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: [PermissionsBitField.Flags.CreatePublicThreads],
          },
        ],
      })
      .then((category) => {
        interaction.guild.channels.create({
            name: "📜┇Rules And Info",
            type: 0,
            parent: category,
        });
        interaction.guild.channels.create({
          name: "📢┇Announcements",
          type: 0,
          parent: category,
        });
        interaction.guild.channels.create({
            name: "🪙┇Giveaways",
            type: 0,
            parent: category,
        });
        interaction.guild.channels.create({
          name: "👋┇Joins",
          type: 0,
          parent: category,
        });
      });
  },
};

  
