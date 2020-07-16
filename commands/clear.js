exports.run = async (client, message, args) => { if(message.author.id !== client.config.ownerID) return message.reply("Du är inte TheMole3!");

    if(isNaN(args[0])) return message.reply(`${args[0]} är inget nummer`); // Kollar om args[0] är ett nummer
    if(args[0]>100) { // Om man vill ta bort fler än 100 medelanden ta bort 100 medelanden ändå
        args[0] = 100;
    };

    message.delete(); // Deletes input message

    let fetched = await message.channel.fetchMessages({limit: args[0]}); // Väljer senaste args[0] av medelanden

    // Ta bort medelanden
    message.channel.bulkDelete(fetched).catch(err => console.log()); // Throws error
    message.reply(`Tog bort ${fetched.size} medelanden!`); //Medelar hur många medelanden som är bortagna

};
