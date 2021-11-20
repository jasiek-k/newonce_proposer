import SpotifyWebApi from "spotify-web-api-js";

class SpotifyApi {
  // TODO: change to get from envs
  ACCESS_TOKEN = 'BQBDwtFmDSVdISU32B-6vBGdaYG5Yf95YCCMAN1c23JTMDerxep32elcU6gtQaenfx7OGM2DiYRZTgeAJXvDGDQ8AH03ECDGPOR8W7IdaUwHMkRK3HlWLmmVT2_iPMhCPK-ASAX4FiPgE5WrWtaDmmzVd8dfvgS9Ygu_vLbZrT7kYn6AAYAr3O2Aal4gpRU4mFDUOTYKWJ0'
  WEB_PLAYBACK_TOKEN = 'BQBz1kRGWbIUBtneUOij9ekEwcH0tKX24XOm2KeF2qBjxqfRz4sZfPfoWgmK6MAojaYrmhFmKBNm2987-YFdb3smxjCiL5qOxmvedU9v5QuiV3Z-_MOC9bnlLqmGOz1-6l0d5I_1X1Srz0QQmn_lZFsJhsDHjoNNMsQZz4-UzVp3c_U_cVd-vfryfK2Q'
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