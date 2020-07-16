lastBrd = "";

module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;

  console.log(message.toString())

  if(message.channel.id == "462355368035614720") {
    if(lastBrd == message.author.id) return;
    lastBrd = message.author.id;

    if(message.toString().includes("<:brd:464879368376942624>")) {
      client.db.brod.findOne({id:message.author.id}, async (err,senderRes) => { // Hitta skickarens konto
          avatar = message.author.avatarURL;
          if(!senderRes) { // Om det inte finns
              client.db.brod.insert({id:message.author.id, brod:1, username: message.guild.members.get(message.author.id).displayName, avatar: avatar})
          }
          client.db.brod.update({id:message.author.id}, {$inc:{brod:1}, $set:{username: message.guild.members.get(message.author.id).displayName, avatar: avatar}})
      });
    }
  };

  var prefix = '<@!' + client.user.id + '>'

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  console.log(args,command)

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};
