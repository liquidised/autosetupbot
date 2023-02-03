const { Routes } = require('discord.js');

module.exports = {
    event: "ready", // EVENT FROM DISCORD.JS
    async execute(client, func, PluginSettings, rest) {

        const Guilds = client.guilds.cache.map(guild => guild.id);

        var command = [
            {
                name: 'config',
                description: 'Create and config discord channels.'
            },
            {
                name: 'delete',
                description: 'Deletes all channels in your discord.'
            }
        ];

        try {
            for (Guild of Guilds) {
                await rest.put(
                    Routes.applicationGuildCommands(func.user.id, Guild),
                    { body: command },
                );
            }

        } catch (error) {
            console.error(error);
        }


    }
}