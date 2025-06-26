let twitchMessages = [];

const client = new tmi.Client({
  identity: {
    username: process.env.TWITCH_USERNAME || 'your_bot_username',
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: [process.env.TWITCH_CHANNEL]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  if (!self) {
    twitchMessages.push({
      platform: 'twitch',
      user: tags['display-name'],
      message
    });
  }
});

async function getTwitchMessages() {
  const copy = [...twitchMessages];
  twitchMessages = [];
  return copy;
}

module.exports = {
  getTwitchMessages,
  getYouTubeMessages: async () => []
};
