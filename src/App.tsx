import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MainView from './views/main'

const queryClient = new QueryClient()

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <MainView></MainView>
    </QueryClientProvider>
    </>
  )
}

export default App
