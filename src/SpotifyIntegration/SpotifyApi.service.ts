import SpotifyWebApi from "spotify-web-api-js";

class SpotifyApi {
  // TODO: change to get from envs
  ACCESS_TOKEN = 'BQD7s2slf7dbLkw9mgMZ3_4WGNXrooT67wx9qFF_ckHCN4rudMbxfvROyloAU7NMMHn84-dD6eGzMpyj8E9HcK28Fg7axt-c31v-xWjfogAmATVV5jM31TCvgNfRcQmOlQdTXnDo2gl9J8_sSeuXbfvn0GbcUd3mrT33prJ0yG8OrsLr7-KbX6LoBEzZnJ2AkXQ8jaUxlyk'
  WEB_PLAYBACK_TOKEN = 'BQDq8VPCfiH1d5Sa-HL3-z9CaoBOTxMWWcu2XSUMHiMZgpwWHcYhcrwzzJ6cHWEP1tRHYDXjzotXMBzuCwRLdWdjOOg_2pA0pYNkUsZCYoMvHu0povLWtYOlDKMzKXFGglYlP2q8Xy2my9xvT9msfqB3hIF0xyG-q9o5pVrqlvYFenWXnzpZXikaJUxg'
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