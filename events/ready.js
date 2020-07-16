module.exports = (client, message) => {
  client.user.setActivity("brd.melo.se")
  console.log(client.user.tag + ' har startat');
};
