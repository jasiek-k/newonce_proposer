import SpotifyWebApi from "spotify-web-api-js";

class SpotifyApi {
  // TODO: change to get from envs
  ACCESS_TOKEN = 'BQDyuRKOd_iXAYlz3IPGFik0EQoE5EEqCUSCZUxzt4RgaeYRVk5q67ThtroG0OOLK3qHk0oywlo6RxbS51ptn7zJJfv8werPX26atatISx8-jOVqh-w2tEzcTGaLY4ZF1-5XYWbtM2-XPRc-TknJv3oCfw26R6KcO66SXYM-UVSZg6V3QYGOqR2TfV4Id_h-0-4FyJgHdF8'
  WEB_PLAYBACK_TOKEN = 'BQAFP-G_5qJ9jFd0m-NlX9ZkoIia6eh9Hy1ZeNkDA2ElveN2cnJKMdTlQokVCuEoiuMQckwLlHt-BrQebgCiRxD9fJ9bFHESUeRx1WNF_jVmlZ6F2pbx8JaBrztD8TlXAxcAQSrMBOYSjGDsKidwpEYu3ER8JYB1l0OsZVvOekAoRIs_LnoYSZsKOEU1'
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
    return await this.spotifyApi.getUserPlaylists();
  }

  async createPlaylist(name: string) {
    if (this.userId) {
      return await this.spotifyApi.createPlaylist(this.userId, {
        name,
        public: true,
      });
    }
  }

  async addToTrackToPlaylis(playlistId: string, tracksUris: string[]) {
    if (this.userId) {
      return this.spotifyApi.addTracksToPlaylist(playlistId, tracksUris);
    }
  }
}

export default new SpotifyApi();
