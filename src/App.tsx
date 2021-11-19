import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { initializeApp } from "firebase/app";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import Example from "./Example/Example.component";
// import FirebaseExample from "./FirebaseExample/FirebaseExample";

import firebaseConfig from "./config/firebase";
import {
  GENERATOR_ROUTE,
  HOME_ROUTE,
  PLAYLIST_ROUTE,
  PROFILE_ROUTE,
} from "./config/config";
import Home from "./modules/home/Home.page";
import Profile from "./modules/profile/Profile.page";
import Playlist from "./modules/playlist/Playlist.page";
import Generator from "./modules/generator/Generator.page";
import SpotifyExamplePlayer from "./SpotifyIntegration/SpotifyPlayer.component";

const App = () => {
  const queryClient = new QueryClient();
  const app = initializeApp(firebaseConfig);

  console.log(app);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        {/* <Example />
        <FirebaseExample /> */}
        <Router>
          <Switch>
            <Route path={HOME_ROUTE} exact={true}>
              <Home />
            </Route>
            <Route path={PROFILE_ROUTE}>
              <Profile />
            </Route>
            <Route path={PLAYLIST_ROUTE}>
              <Playlist />
            </Route>
            <Route path={GENERATOR_ROUTE}>
              <Generator />
            </Route>
            <Route path={"/spotify"}>
              <SpotifyExamplePlayer />
            </Route>
          </Switch>
        </Router>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
