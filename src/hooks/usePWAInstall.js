import { useState, useEffect, useRef, useCallback } from 'react'

const STORAGE_KEY = 'escala-padaria-install-banner-dismissed'

function isStandalone() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    document.referrer.includes('android-app://')
  )
}

export function usePWAInstall() {
  const [showBanner, setShowBanner] = useState(false)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [installed, setInstalled] = useState(false)
  const deferredPrompt = useRef(null)

  useEffect(() => {
    if (isStandalone()) {
      setInstalled(true)
      setShowBanner(false)
      return
    }

    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (dismissed === 'true') {
      setShowBanner(false)
    } else {
      setShowBanner(true)
    }

    const ua = window.navigator.userAgent
    const ios = /iPad|iPhone|iPod/.test(ua) || (ua.includes('Mac') && 'ontouchend' in document)
    setIsIOS(ios)

    const handler = (e) => {
      e.preventDefault()
      deferredPrompt.current = e
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = useCallback(async () => {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt()
      const { outcome } = await deferredPrompt.current.userChoice
      if (outcome === 'accepted') setShowBanner(false)
      deferredPrompt.current = null
      setIsInstallable(false)
    } else if (isIOS) {
      setShowInstructions(true)
    } else {
      setShowInstructions(true)
    }
  }, [isIOS])

  const handleDismiss = useCallback(() => {
    setShowBanner(false)
    localStorage.setItem(STORAGE_KEY, 'true')
  }, [])

  return {
    installed,
    showBanner,
    isInstallable,
    isIOS,
    showInstructions,
    setShowInstructions,
    handleInstall,
    handleDismiss,
  }
}
