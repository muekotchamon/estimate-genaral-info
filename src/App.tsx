import { DocumentModal } from './documents/DocumentModal'
import { DocumentModalProvider } from './documents/document-modal-context'
import { EstimateDetailsPage } from './EstimateDetailsPage'

function App() {
  return (
    <DocumentModalProvider>
      <div className="flex h-full max-h-dvh min-h-0 w-full flex-1 flex-col overflow-hidden bg-[#F1F2F4]">
        <EstimateDetailsPage />
      </div>
      <DocumentModal />
    </DocumentModalProvider>
  )
}

export default App
