const config = require("./config.json");
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

var mongojs = require("mongojs");
db = mongojs(config.dbConnect, ['brod']);

client = new Discord.Client();
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;
client.db = db;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.on('messageReactionAdd', (reaction, user) => {
    if(lastBrd == user.id) return;
    lastBrd = user.id;

    if(reaction.emoji.name == "brd") {
      client.db.brod.findOne({id:user.id}, async (err,senderRes) => { // Hitta skickarens konto
          avatar = user.avatarURL;
          if(!senderRes) { // Om det inte finns
              client.db.brod.insert({id:user.id, brod:1, username: client.guilds.get("456139564789006336").members.get(user.id).displayName, avatar: avatar})
          }
          client.db.brod.update({id:user.id}, {$inc:{brod:1}, $set:{username: client.guilds.get("456139564789006336").members.get(user.id).displayName, avatar: avatar}})
      });
    }
})

client.on('messageReactionRemove', (reaction, user) => {
    if(lastBrd == user.id) return;
    lastBrd = user.id;

    if(reaction.emoji.name == "brd") {
      client.db.brod.findOne({id:user.id}, async (err,senderRes) => { // Hitta skickarens konto
          avatar = user.avatarURL;
          if(!senderRes) { // Om det inte finns
              client.db.brod.insert({id:user.id, brod:1, username: client.guilds.get("456139564789006336").members.get(user.id).displayName, avatar: avatar})
          }
          client.db.brod.update({id:user.id}, {$inc:{brod:-1}, $set:{username: client.guilds.get("456139564789006336").members.get(user.id).displayName, avatar: avatar}})
      });
    }
})

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);

require('./web.js');
