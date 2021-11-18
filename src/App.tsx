import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { initializeApp } from "firebase/app";

import Example from "./Example/Example.component";
import FirebaseExample from "./FirebaseExample/FirebaseExample";

import firebaseConfig from "./config/firebase";

function App() {
  const queryClient = new QueryClient();
  const app = initializeApp(firebaseConfig);

  return (
    <div>
      <header></header>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Example />
          <FirebaseExample />
        </RecoilRoot>
      </QueryClientProvider>
    </div>
  );
}

export default App;
