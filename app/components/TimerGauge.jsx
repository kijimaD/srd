'use client'

import { useState, useEffect } from 'react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

const TIMER_MAX_SECONDS = 300 // 5 minutes

function TimerGauge() {
  const [remainingTime, setRemainingTime] = useState(TIMER_MAX_SECONDS)

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => {
        if (prev > 0) {
          return prev - 1
        }
        return 0
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const percentage = (remainingTime / TIMER_MAX_SECONDS) * 100

  // Calculate color from green (120) → yellow (60) → red (0)
  const hue = percentage * 1.2 // 100% = 120 (green), 50% = 60 (yellow), 0% = 0 (red)
  const color = `hsl(${hue}, 80%, 50%)`

  return (
    <CircularProgress
      value={percentage}
      size="12"
      color={color}
      trackColor="gray.700"
      thickness="0.5rem"
    >
      <CircularProgressLabel fontSize="xs" fontFamily="mono" color="gray.300">
        {formatTime(remainingTime)}
      </CircularProgressLabel>
    </CircularProgress>
  )
}

export default TimerGauge
