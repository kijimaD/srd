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
  const isLow = remainingTime < 120

  return (
    <CircularProgress
      value={percentage}
      size="50px"
      color={isLow ? 'red.400' : 'blue.400'}
      trackColor="gray.700"
      thickness="8px"
    >
      <CircularProgressLabel fontSize="xs" fontFamily="mono" color="gray.300">
        {formatTime(remainingTime)}
      </CircularProgressLabel>
    </CircularProgress>
  )
}

export default TimerGauge
