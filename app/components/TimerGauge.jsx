'use client'

import { useState, useEffect } from 'react'
import { HStack, Text, Progress } from '@chakra-ui/react'

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
    <HStack spacing={2}>
      <Text
        fontSize="xs"
        color="gray.400"
        fontFamily="mono"
        minW="45px"
      >
        {formatTime(remainingTime)}
      </Text>
      <Progress
        value={percentage}
        w="100px"
        borderRadius="full"
        colorScheme={isLow ? 'red' : 'blue'}
        bg="gray.700"
      />
    </HStack>
  )
}

export default TimerGauge
