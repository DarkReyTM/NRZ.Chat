async function getTwitchMessages() {
  return ["[Twitch] DarkReyTM: Привет из Render!"];
}

async function getYouTubeMessages() {
  return []; // Пока ничего
}

module.exports = {
  getTwitchMessages,
  getYouTubeMessages,
};