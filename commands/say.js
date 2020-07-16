exports.run = (client, message, args) => { if(message.author.id !== client.config.ownerID) return message.reply("Du är inte TheMole3!");
    var arg0 = args[0].toLowerCase();
    if(arg0.startsWith('c:')) {
        var cut = arg0.replace('c:', '');
        cut.replace('C:', '');
        var kanal = client.channels.find(x => x.name == cut);
        var text = args.slice(1).join(" ");
        message.delete();
        kanal.send(text);
    } else if(!arg0.startsWith('c:')) {
        let text = args.slice(0).join(" ");
        message.delete();
        message.channel.send(text);
    };
};
