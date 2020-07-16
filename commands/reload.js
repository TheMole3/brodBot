exports.run = (client, message, [type, command]) => { if(message.author.id !== client.config.ownerID) return message.reply("Du är inte TheMole3!");
  if(!type) return message.reply("Must provide either *command* or *event*");
  if(!command) return message.reply("Must provide a command/event name to reload.");
  // the path is relative to the *current folder*, so just ./filename.js
  if(type == 'command')
    delete require.cache[require.resolve(`../commands/${args[1]}.js`)];
  if(type == 'event')
    delete require.cache[require.resolve(`../events/${args[1]}.js`)];
  message.reply(`The command ${command} has been reloaded`);
};
