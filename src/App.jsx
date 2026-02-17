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
  SCALE_WIDTH,
  SCALE_HEIGHT,
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

function saveState(date, employees, branchName) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date, employees, branchName }))
  } catch (_) {}
}

export default function App() {
  const [date, setDate] = useState(getDefaultDate())
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES)
  const [branchName, setBranchName] = useState(DEFAULT_BRANCH_NAME)
  const scaleRef = useRef(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const pwa = usePWAInstall()

  useEffect(() => {
    const saved = loadState()
    if (saved) {
      if (saved.date) setDate(saved.date)
      if (saved.employees?.length) setEmployees(saved.employees)
      if (saved.branchName) setBranchName(saved.branchName)
    }
  }, [])

  useEffect(() => {
    saveState(date, employees, branchName)
  }, [date, employees, branchName])

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
        backgroundColor: '#FFD700',
      })
      wrapper.style.left = -(SCALE_WIDTH + 200) + 'px'
      wrapper.style.top = '0'
      const link = document.createElement('a')
      link.download = `escala-padaria-nasser-${date.replace(/\//g, '-')}.png`
      link.href = dataUrl
      link.click()
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
    <div className="min-h-screen bg-gray-100 pb-20">
      <header className="sticky top-0 z-20 bg-[#FFD700] border-b-2 border-[#E30613] shadow-md overflow-hidden">
        <div className="px-4 py-4">
          <label className="block">
            <span className="text-[#1D2B5B] font-bold block mb-2">Data da escala</span>
            <input
              type="date"
              value={dateForInput}
              onChange={handleDateChange}
              className="w-full rounded-xl border-2 border-[#1D2B5B] px-4 py-3 text-[#1D2B5B] font-semibold bg-white"
            />
          </label>
          <label className="block mt-3">
            <span className="text-[#1D2B5B] font-bold block mb-2">Nome da filial</span>
            <input
              type="text"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Ex: NASSER"
              className="w-full rounded-xl border-2 border-[#1D2B5B] px-4 py-3 text-[#1D2B5B] font-semibold bg-white"
            />
          </label>
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={handleLimparTudo}
              className="flex-1 py-2.5 rounded-xl font-semibold text-[#1D2B5B] bg-white border-2 border-[#1D2B5B]"
            >
              Limpar tudo
            </button>
            <button
              type="button"
              onClick={handleMarcarTodosFolga}
              className="flex-1 py-2.5 rounded-xl font-semibold text-white bg-[#1D2B5B] border-2 border-[#1D2B5B]"
            >
              Marcar folga
            </button>
          </div>
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

      <main className="px-4 py-6 pb-58 max-w-lg mx-auto safe-bottom">
        <h2 className="text-[#1D2B5B] font-bold text-xl mb-4">Funcionários</h2>
        <div className="space-y-4">
          {employees.map((emp, i) => (
            <EmployeeCard
              key={i}
              employee={emp}
              index={i}
              onChange={handleEmployeeChange}
              onFolga={handleFolga}
            />
          ))}
        </div>

        <section className="mt-8">
          <h2 className="text-[#1D2B5B] font-bold text-xl mb-3">Pré-visualização</h2>
          <div className="overflow-y-hidden overflow-x-hidden rounded-2xl border-2 border-[#1D2B5B]/30 bg-[#FFD700] p-2 max-h-[440px]">
            <div className="origin-top max-w-full flex items-center justify-center" style={{ transform: 'scale(0.26)', transformOrigin: 'top center' }}>
              <ScalePreview date={date} employees={employees} branchName={branchName} />
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
          height: SCALE_HEIGHT,
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <ScalePreview ref={scaleRef} date={date} employees={employees} branchName={branchName} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 safe-bottom bg-gradient-to-t from-gray-100 to-transparent flex flex-row gap-2 items-stretch">
        {!pwa.installed && (
          <button
            type="button"
            onClick={pwa.handleInstall}
            className="flex-[0_0_25%] py-4 rounded-2xl font-bold text-white bg-[#1D2B5B] shadow-lg active:opacity-90 md:hidden text-sm"
            aria-label="Baixar aplicativo"
          >
            Baixar app
          </button>
        )}
        <button
          type="button"
          onClick={handleGerarImagem}
          disabled={isGenerating}
          className={`py-4 rounded-2xl font-bold text-white bg-[#25D366] shadow-lg active:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed text-lg ${pwa.installed ? 'w-full' : 'flex-1 min-w-0'}`}
        >
          {isGenerating ? 'Gerando…' : 'Gerar imagem para WhatsApp'}
        </button>
      </div>
    </div>
  )
}
