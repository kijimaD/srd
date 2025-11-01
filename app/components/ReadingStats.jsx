'use client'

import { useState, useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import TimerGauge from './TimerGauge'

function ReadingStats({ timerKey, pageNum, isTopHalf }) {
  const [pageChangeCount, setPageChangeCount] = useState(0)
  const lastPageChangeRef = useRef(Date.now())

  useEffect(() => {
    // Calculate initial page change count
    updatePageChangeCount()
  }, [])

  useEffect(() => {
    // Record page change when pageNum or isTopHalf changes
    if (pageNum && isTopHalf !== undefined) {
      recordPageChange()
    }
  }, [pageNum, isTopHalf])

  const updatePageChangeCount = () => {
    const stored = localStorage.getItem('pageChanges')
    const changes = stored ? JSON.parse(stored) : []
    const oneHourAgo = Date.now() - 60 * 60 * 1000
    const recentChanges = changes.filter(timestamp => timestamp > oneHourAgo)

    // Clean up old entries
    localStorage.setItem('pageChanges', JSON.stringify(recentChanges))
    setPageChangeCount(recentChanges.length)
  }

  const recordPageChange = () => {
    const now = Date.now()
    const timeSinceLastChange = now - lastPageChangeRef.current

    // Only count if more than 10 seconds have passed
    if (timeSinceLastChange >= 10000) {
      const stored = localStorage.getItem('pageChanges')
      const changes = stored ? JSON.parse(stored) : []
      changes.push(now)

      const oneHourAgo = now - 60 * 60 * 1000
      const recentChanges = changes.filter(timestamp => timestamp > oneHourAgo)

      localStorage.setItem('pageChanges', JSON.stringify(recentChanges))
      setPageChangeCount(recentChanges.length)
    }

    lastPageChangeRef.current = now
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} alignItems="center">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="12"
        h="12"
        borderRadius="full"
        bg="gray.800"
        border="2px"
        borderColor="blue.400"
      >
        <Box textAlign="center">
          <Box fontSize="xl" fontWeight="bold" color="blue.400">
            {pageChangeCount}
          </Box>
          <Box fontSize="2xs" color="gray.400" mt="-1">
            pages
          </Box>
        </Box>
      </Box>
      <TimerGauge key={timerKey} />
    </Box>
  )
}

export default ReadingStats
