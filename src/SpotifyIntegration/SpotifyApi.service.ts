import SpotifyWebApi from "spotify-web-api-js";

class SpotifyApi {
  // TODO: change to get from envs
  ACCESS_TOKEN = 'BQBFVT_jB1ud5ZiOXzTlQMCaOZN0LWDLVov5eAIwpWcFueLKBUh0Cff-SsV61c1gX9OqDJAIB_3I2rJQNrPq7uXqTWLe8vIJiXfmpvPQqnsj6IZyR30QFiY9QjslJOHttlqF7K_xJdwX8MqgX4HcWgzlXxJ77kG6KT773zbk4dl9fiouuFv5L5oHamY5yzHQ2yjPBHQ36oM'
  WEB_PLAYBACK_TOKEN = 'BQBe3b_TNiKXjM0o9xW1n5y7M7lQVnl8o_tWJXy_pwKWa5nHjeK8-ftCRTTTRrwcCuu3FJblDovw_C_tmy_yMPs-QRxhIUm8BL9tPvFLmCEH41tKJUYc9ZuasI4lECJ2r_Tw7H-kzOwApqtFxnHyXYtvf9OzaOI9Qy7Ke6B9NbeJ0E8U4RX319RrJcef'
  spotifyApi: SpotifyWebApi.SpotifyWebApiJs;
  userId: string | undefined;

  constructor() {
    this.spotifyApi = new SpotifyWebApi();
    this.spotifyApi.setAccessToken(this.ACCESS_TOKEN);
  }
  
  async getUserId() {
    this.userId = (await this.spotifyApi.getMe()).id;
    return this.userId;
  }

  async getTrack(searchPrase: string) {
    return await this.spotifyApi.searchTracks(searchPrase);
  }

  async getPlaylists() {
      return await this.spotifyApi.getUserPlaylists()
  }

  async createPlaylist(name: string) {
    if(this.userId) {
      return await this.spotifyApi.createPlaylist(this.userId, {
        name,
        public: true,
      });
    }
  }

  async addToTrackToPlaylis(playlistId: string, tracksUris: string[]) {
    if(this.userId) {
      return this.spotifyApi.addTracksToPlaylist(playlistId, tracksUris);
    }
  }
}

export default new SpotifyApi();