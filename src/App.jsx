import React, { useState, useEffect, useRef, useCallback } from 'react'
import { toPng } from 'html-to-image'
import ScalePreview from './components/ScalePreview'
import EmployeeCard from './components/EmployeeCard'
import InstallAppBanner from './components/InstallAppBanner'
import { usePWAInstall } from './hooks/usePWAInstall'
import {
  STORAGE_KEY,
  INITIAL_EMPLOYEES,
  getDefaultDate,
  DEFAULT_BRANCH_NAME,
  DEFAULT_SECTOR_OR_COMPANY,
  SCALE_WIDTH,
  getScaleHeight,
} from './constants'

const FOLGA = 'FOLGA'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data.employees && Array.isArray(data.employees)) return data
  } catch (_) {}
  return null
}

function saveState(date, employees, branchName, sectorOrCompany) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date, employees, branchName, sectorOrCompany }))
  } catch (_) {}
}

export default function App() {
  const [date, setDate] = useState(getDefaultDate())
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES)
  const [branchName, setBranchName] = useState(DEFAULT_BRANCH_NAME)
  const [sectorOrCompany, setSectorOrCompany] = useState(DEFAULT_SECTOR_OR_COMPANY)
  const scaleRef = useRef(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [headerExpanded, setHeaderExpanded] = useState(false)
  const pwa = usePWAInstall()

  useEffect(() => {
    const saved = loadState()
    if (saved) {
      if (saved.date) setDate(saved.date)
      if (saved.employees?.length) setEmployees(saved.employees)
      if (saved.branchName) setBranchName(saved.branchName)
      if (saved.sectorOrCompany) setSectorOrCompany(saved.sectorOrCompany)
    }
  }, [])

  useEffect(() => {
    saveState(date, employees, branchName, sectorOrCompany)
  }, [date, employees, branchName, sectorOrCompany])

  const handleEmployeeChange = useCallback((index, field, value) => {
    setEmployees((prev) =>
      prev.map((emp, i) => (i === index ? { ...emp, [field]: value } : emp))
    )
  }, [])

  const handleFolga = useCallback((index) => {
    setEmployees((prev) =>
      prev.map((emp, i) =>
        i === index ? { ...emp, horario1: FOLGA, horario2: FOLGA } : emp
      )
    )
  }, [])

  const handleRemoverFolga = useCallback((index) => {
    setEmployees((prev) =>
      prev.map((emp, i) =>
        i === index ? { ...emp, horario1: '', horario2: '' } : emp
      )
    )
  }, [])

  const handleLimparTudo = useCallback(() => {
    setEmployees((prev) =>
      prev.map((emp) => ({ ...emp, horario1: '', horario2: '' }))
    )
  }, [])

  const handleMarcarTodosFolga = useCallback(() => {
    setEmployees((prev) =>
      prev.map((emp) => ({ ...emp, horario1: FOLGA, horario2: FOLGA }))
    )
  }, [])

  const handleAddEmployee = useCallback(() => {
    setEmployees((prev) => [...prev, { name: '', horario1: '', horario2: '' }])
  }, [])

  const handleRemoveEmployee = useCallback((index) => {
    setEmployees((prev) => {
      if (prev.length <= 1) return prev
      return prev.filter((_, i) => i !== index)
    })
  }, [])

  const handleDateChange = (e) => {
    const value = e.target.value
    if (!value) return
    const [y, m, d] = value.split('-')
    if (d && m && y) setDate(`${d}/${m}/${y}`)
  }

  const dateForInput = (() => {
    const [d, m, y] = date.split('/')
    if (d && m && y) return `${y}-${m}-${d}`
    return ''
  })()

  const scaleHeight = getScaleHeight(employees.length)

  const captureWrapperRef = useRef(null)

  const handleGerarImagem = useCallback(async () => {
    const node = scaleRef.current
    const wrapper = captureWrapperRef.current
    if (!node || !wrapper || isGenerating) return
    setIsGenerating(true)
    try {
      wrapper.style.left = '0'
      wrapper.style.top = '0'
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#F4F7F6',
      })
      wrapper.style.left = -(SCALE_WIDTH + 200) + 'px'
      wrapper.style.top = '0'
      const link = document.createElement('a')
      link.download = `escala-padaria-nasser-${date.replace(/\//g, '-')}.png`
      link.href = dataUrl
      link.click()
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (err) {
      console.error(err)
      if (wrapper) {
        wrapper.style.left = -(SCALE_WIDTH + 200) + 'px'
      }
      alert('Não foi possível gerar a imagem. Tente novamente.')
    } finally {
      setIsGenerating(false)
    }
  }, [date, isGenerating])

  return (
    <div className="min-h-screen bg-flowshift-bg pb-36 safe-bottom">
      <header
        className="sticky top-0 z-20 bg-flowshift-blue shadow-md overflow-hidden"
        onMouseEnter={() => setHeaderExpanded(true)}
        onMouseLeave={() => setHeaderExpanded(false)}
      >
        <div className="px-4 py-4 flex flex-col items-center justify-center">
          {/* Linha compacta: data + resumo, centralizados e com tamanho confortável */}
          <div className="w-full max-w-4xl flex gap-3 items-end">
            <label className="flex-1 min-w-0">
              <span className="text-white font-semibold block mb-2 text-center">Data</span>
              <input
                type="date"
                value={dateForInput}
                onChange={handleDateChange}
                className="w-full rounded-flowshift border-2 border-white px-4 py-3 text-flowshift-blue font-medium bg-white outline-none"
              />
            </label>
            <button
              type="button"
              onClick={() => setHeaderExpanded((e) => !e)}
              className="flex-1 min-w-0 rounded-flowshift overflow-hidden border-2 border-white/60 bg-white/10 px-4 py-3 text-center"
              aria-expanded={headerExpanded}
              aria-label={headerExpanded ? 'Recolher setor e filial' : 'Expandir setor e filial'}
            >
              <span className="text-white font-semibold truncate block">
                {[sectorOrCompany?.trim(), branchName?.trim()].filter(Boolean).join(' • ') || 'Setor e filial'}
              </span>
            </button>
          </div>
          {/* Seta centralizada abaixo dos inputs */}
          <div className="flex justify-center mt-2">
            <button
              type="button"
              onClick={() => setHeaderExpanded((e) => !e)}
              className="p-2 rounded-flowshift text-white/90 hover:bg-white/10 transition-colors"
              aria-expanded={headerExpanded}
              aria-label={headerExpanded ? 'Recolher' : 'Expandir'}
            >
              <svg
                className={`w-6 h-6 transition-transform ${headerExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Detalhes expandidos */}
          {headerExpanded && (
            <div className="mt-3 pt-3 border-t border-white/20 space-y-3 w-full max-w-4xl mx-auto">
              <label className="block">
                <span className="text-white font-semibold block mb-2">Setor ou nome da empresa</span>
                <input
                  type="text"
                  value={sectorOrCompany}
                  onChange={(e) => setSectorOrCompany(e.target.value)}
                  placeholder="Ex: PADARIA, VENDAS"
                  className="w-full rounded-flowshift border-2 border-white px-4 py-3 text-flowshift-blue font-medium bg-white outline-none"
                />
              </label>
              <label className="block">
                <span className="text-white font-semibold block mb-2">Nome da filial</span>
                <input
                  type="text"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  placeholder="Ex: NASSER"
                  className="w-full rounded-flowshift border-2 border-white px-4 py-3 text-flowshift-blue font-medium bg-white outline-none"
                />
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleLimparTudo}
                  className="flex-1 py-3 rounded-flowshift font-semibold text-flowshift-blue bg-white border-2 border-white active:opacity-90 outline-none"
                >
                  Limpar tudo
                </button>
                <button
                  type="button"
                  onClick={handleMarcarTodosFolga}
                  className="flex-1 py-3 rounded-flowshift font-semibold text-white bg-white/20 border border-white/50 active:opacity-90"
                >
                  Marcar folga
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="px-4 pb-3">
          <InstallAppBanner
            showBanner={pwa.showBanner}
            handleDismiss={pwa.handleDismiss}
            handleInstall={pwa.handleInstall}
            showInstructions={pwa.showInstructions}
            setShowInstructions={pwa.setShowInstructions}
            isIOS={pwa.isIOS}
            isInstallable={pwa.isInstallable}
            installed={pwa.installed}
          />
        </div>
      </header>

      <main className="px-4 py-6 pb-36 max-w-4xl mx-auto safe-bottom">
        <h2 className="text-flowshift-blue font-bold text-xl mb-4">Funcionários</h2>
        <div className="space-y-4">
          {employees.map((emp, i) => (
            <EmployeeCard
              key={i}
              employee={emp}
              index={i}
              onChange={handleEmployeeChange}
              onFolga={handleFolga}
              onRemoverFolga={handleRemoverFolga}
              onRemove={handleRemoveEmployee}
              canRemove={employees.length > 1}
            />
          ))}
          <button
            type="button"
            onClick={handleAddEmployee}
            className="w-full py-4 rounded-flowshift border-2 border-dashed border-flowshift-blue/40 text-flowshift-blue font-semibold bg-flowshift-blue/5 hover:bg-flowshift-blue/10 active:opacity-90 transition-colors"
          >
            + Adicionar funcionário
          </button>
        </div>

        <section className="mt-8">
          <h2 className="text-flowshift-blue font-bold text-xl mb-3">Pré-visualização</h2>
          <div className="overflow-y-auto overflow-x-hidden rounded-flowshift bg-flowshift-card p-2 max-h-[440px] shadow-flowshift-card preview-scroll">
            <div className="origin-top max-w-full flex items-center justify-center" style={{ transform: 'scale(0.26)', transformOrigin: 'top center' }}>
              <ScalePreview date={date} employees={employees} branchName={branchName} sectorOrCompany={sectorOrCompany} scaleHeight={scaleHeight} />
            </div>
          </div>
        </section>
      </main>

      <div
        ref={captureWrapperRef}
        className="fixed pointer-events-none"
        style={{
          left: -(SCALE_WIDTH + 200),
          top: 0,
          width: SCALE_WIDTH,
          height: scaleHeight,
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <ScalePreview ref={scaleRef} date={date} employees={employees} branchName={branchName} sectorOrCompany={sectorOrCompany} scaleHeight={scaleHeight} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 safe-bottom bg-gradient-to-t from-flowshift-bg to-transparent flex flex-row gap-2 items-stretch">
        {!pwa.installed && (
          <button
            type="button"
            onClick={pwa.handleInstall}
            className="flex-[0_0_25%] py-4 rounded-flowshift font-bold text-white bg-flowshift-blue shadow-flowshift-card active:opacity-90 md:hidden text-sm"
            aria-label="Baixar aplicativo"
          >
            Baixar app
          </button>
        )}
        <button
          type="button"
          onClick={handleGerarImagem}
          disabled={isGenerating}
          className={`py-4 rounded-flowshift font-bold text-white shadow-flowshift-card active:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed text-lg ${pwa.installed ? 'w-full' : 'flex-1 min-w-0'} ${showSuccess ? 'bg-flowshift-success' : 'bg-flowshift-orange'}`}
        >
          {isGenerating ? 'Gerando…' : showSuccess ? '✓ Gerado!' : 'Gerar imagem para WhatsApp'}
        </button>
      </div>
    </div>
  )
}
