import SpotifyWebApi from "spotify-web-api-js";

class SpotifyApi {
  // TODO: change to get from envs
  ACCESS_TOKEN = 'BQDtnraxVypSidq6cEku2rEJ9X_pwejB4psm9TIiaYbIgv4gLdR4bELIQhfL_jmjpRwkHrcJCwnQOYLuMC6oQtmHiZ-6zuK0fdhfqyntbI6Fe3rHfMhU07lMZnrXcwsh1leFS7RHsDsJLw5GTGXtKBU9SwXrV1JI3UJS57LlC0Ilcs5ObbC0v-UXev2MsMGuZ3tQjlQquTY'
  WEB_PLAYBACK_TOKEN = 'BQBBUNrCeS6mKRy7e95QqfvhmdjdutXFiFJb0tmb4DDfurLv2p7bMRlstw-OVj046jUsqgpDzmGXXU2LlQia_GEsKfbRCqeGvCvZcNyC8bUR1xuFk3UmTWYp_lgdJgZaEp4LQPF12b-cw-iVDqNLQrp1vY1PY7NFmL3sEzso-nkSIiaL7YlFoKBjbfPP'
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