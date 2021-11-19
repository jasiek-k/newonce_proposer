import SpotifyWebApi from "spotify-web-api-js";

class SpotifyApi {
  // TODO: change to get from envs
  ACCESS_TOKEN =
    "BQDEEy5H2malMddv4AieOfQW-cLeGCEHx506Iijaq9v0XJc1-3886j7VVl7IiMtIaQ7VmrBwoVOxGebYrVus8XkAF6MDZXdu3X12xuxGGDYH9km6FS3x7OVmbCWs1MyJ_O1CWWzYhuYX8nE22OsS-pQG_6HAIzF6VYbGsVEsIGhOuBKtyNZMI9v-Dr_o2Oy0M-BHuwfbBQ4";
  WEB_PLAYBACK_TOKEN =
    "BQA68Owt3D8AoxHnKFhH14ztuQbwYXUHnudYTAf_ToBmchszeqPTkqjsXsqa2NcDRK76epCOzxFyidn_C2y_PqPttUIzAqjEQylqFaaEDETAGGNdzt0DFrTnTaTUxUSb-HBSqYGCXqDBKdL_9u6M3UHUZw3KrfKn843SvrdLj2Mm-3pkpfmDmngUM8JP";
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
