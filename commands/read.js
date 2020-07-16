exports.run = async (client, message, args) => { if(message.author.id !== client.config.ownerID) return message.reply("Du är inte TheMole3!");
var lastBrd

try {
    const channel = client.channels.get("462355368035614720");
    if (!channel) return console.error('Invalid ID or missing channel.');

    const messages = await channel.fetchMessages({ limit: 100 });
    for (const [id, message] of messages) {

        if(message.toString().includes("<:brd:464879368376942624>")) {
          client.db.brod.findOne({id:message.author.id}, async (err,senderRes) => { // Hitta skickarens konto
              avatar = message.author.avatarURL;
              if(!senderRes) { // Om det inte finns
                  client.db.brod.insert({id:message.author.id, brod:1, username: message.guild.members.get(message.author.id).displayName, avatar: avatar})
              }
              client.db.brod.update({id:message.author.id}, {$inc:{brod:1}, $set:{username: message.guild.members.get(message.author.id).displayName, avatar: avatar}})
          });
        }
      }
} catch(err) {
  console.error(err);
}

}
