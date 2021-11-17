import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import Example from './Example/Example.component';

function App() {
  const queryClient = new QueryClient()

  return (
    <div>
      <header>
      </header>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Example />
        </RecoilRoot>
      </QueryClientProvider>
    </div >
  );
}

export default App;
