import React from 'react'

export default function InstallAppBanner({
  showBanner,
  handleDismiss,
  handleInstall,
  showInstructions,
  setShowInstructions,
  isIOS,
  isInstallable,
  installed,
}) {
  // Botão fixo: só no desktop (no mobile o botão fica na barra inferior no App)
  const floatingButton = !installed && (
    <button
      type="button"
      onClick={handleInstall}
      className="fixed left-4 bottom-28 z-20 hidden md:flex items-center gap-2 rounded-full border-2 border-[#1D2B5B] bg-[#25D366] px-3 py-2 text-sm font-bold text-white shadow-lg safe-bottom active:opacity-90 hover:bg-[#20c55e] transition-colors"
      title="Baixar app"
      aria-label="Baixar aplicativo"
    >
      Baixar app
    </button>
  )

  return (
    <>
      {/* Banner grande (só aparece se não dispensou) */}
      {showBanner && (
    <div
      className="rounded-xl border-2 border-[#E30613] bg-white p-3 shadow-lg"
      role="region"
      aria-label="Instalar aplicativo"
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFD700]"
          aria-hidden
        >
          <svg
            className="h-7 w-7 text-[#1D2B5B]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-[#1D2B5B] text-base">📱 Baixe o app</h3>
          <p className="mt-1 text-sm text-gray-700">
            {isIOS
              ? 'Toque em Compartilhar e depois em "Adicionar à Tela de Início" para usar na tela inicial e offline.'
              : 'Instale na sua tela inicial para acesso rápido e uso offline.'}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleInstall}
              className="rounded-xl bg-[#25D366] px-5 py-2.5 font-bold text-white shadow-lg active:opacity-90 hover:bg-[#20c55e] transition-colors"
            >
              {isInstallable ? '📲 Instalar agora' : isIOS ? '📱 Como instalar' : '📲 Baixar app'}
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="rounded-xl border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 active:bg-gray-200"
              aria-label="Fechar"
            >
              Agora não
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="shrink-0 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Fechar"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
      )}

      {floatingButton}

      {/* Modal de instruções */}
      {showInstructions && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowInstructions?.(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1D2B5B]">
                {isIOS ? '📱 Instalar no iPhone/iPad' : '📲 Como instalar o app'}
              </h3>
              <button
                type="button"
                onClick={() => setShowInstructions?.(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {isIOS ? (
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold">No Safari:</p>
                <ol className="list-decimal space-y-2 pl-5">
                  <li>Toque no botão <strong>Compartilhar</strong> (ícone de caixa com seta para cima)</li>
                  <li>Role para baixo e toque em <strong>"Adicionar à Tela de Início"</strong></li>
                  <li>Toque em <strong>"Adicionar"</strong> para confirmar</li>
                </ol>
                <p className="mt-4 text-sm text-gray-600">
                  O app aparecerá na sua tela inicial como um ícone. Você poderá usá-lo offline!
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold">No Chrome/Edge:</p>
                <ol className="list-decimal space-y-2 pl-5">
                  <li>Procure pelo ícone de <strong>instalação</strong> na barra de endereços (ou menu)</li>
                  <li>Clique em <strong>"Instalar"</strong> ou <strong>"Adicionar à tela inicial"</strong></li>
                  <li>Confirme a instalação</li>
                </ol>
                <p className="mt-4 text-sm text-gray-600">
                  O app será instalado e você poderá abri-lo como um aplicativo normal, funcionando offline!
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={() => setShowInstructions?.(false)}
              className="mt-6 w-full rounded-xl bg-[#25D366] py-3 font-bold text-white shadow-lg active:opacity-90"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  )
}
