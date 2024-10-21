import SpotifyWebApi from "spotify-web-api-js";

class SpotifyApi {
  ACCESS_TOKEN = process.env.ACCESS_TOKEN;
  WEB_PLAYBACK_TOKEN =  process.env.WEB_PLAYBACK_TOKEN;
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