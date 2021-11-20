import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { initializeApp } from "firebase/app";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebaseConfig from "./config/firebase";
import {
  GENERATOR_ROUTE,
  HOME_ROUTE,
  PLAYLIST_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
} from "./config/config";
import Profile from "./modules/profile/Profile.page";
import Playlist from "./modules/playlist/Playlist.page";
import Generator from "./modules/generator/Generator.page";
import Login from "./modules/login/Login.page";
import Register from "./modules/register/Register.page";

const App = () => {
  const queryClient = new QueryClient();
  const app = initializeApp(firebaseConfig);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Router>
          <Switch>
            <Route path={HOME_ROUTE} exact={true}>
              <Login />
            </Route>
            <Route path={PROFILE_ROUTE}>
              <Profile />
            </Route>
            <Route path={REGISTER_ROUTE}>
              <Register />
            </Route>
            <Route path={PLAYLIST_ROUTE}>
              <Playlist />
            </Route>
            <Route path={GENERATOR_ROUTE}>
              <Generator />
            </Route>
          </Switch>
        </Router>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
