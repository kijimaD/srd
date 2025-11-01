'use client'

import { useState, useEffect } from 'react'
import { Box, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

function PageCounter({ pageNum, isTopHalf, filterType = 'hourly', maxPages = 10, color = 'cyan', label = 'pages' }) {
  const [pageChangeCount, setPageChangeCount] = useState(0)

  const getFilterTimestamp = () => {
    if (filterType === 'daily') {
      const todayStart = new Date()
      todayStart.setHours(0, 0, 0, 0)
      return todayStart.getTime()
    } else {
      // hourly
      return Date.now() - 60 * 60 * 1000
    }
  }

  useEffect(() => {
    // Calculate initial page change count
    updatePageChangeCount()
  }, [])

  useEffect(() => {
    // Record page change
    if (pageNum && isTopHalf !== undefined) {
      recordPageChange()
    }
  }, [pageNum, isTopHalf])

  const updatePageChangeCount = () => {
    const stored = localStorage.getItem('pageVisits')
    const visits = stored ? JSON.parse(stored) : []
    const filterTime = getFilterTimestamp()
    const recentVisits = visits.filter(visit => visit.timestamp >= filterTime)

    // Clean up old entries
    localStorage.setItem('pageVisits', JSON.stringify(recentVisits))
    setPageChangeCount(recentVisits.length)
  }

  const recordPageChange = () => {
    const now = Date.now()
    const stored = localStorage.getItem('pageVisits')
    const visits = stored ? JSON.parse(stored) : []
    const filterTime = getFilterTimestamp()

    // Filter recent visits and check if this page was already visited
    const recentVisits = visits.filter(visit => visit.timestamp >= filterTime)
    const alreadyVisited = recentVisits.some(
      visit => visit.pageNum === pageNum && visit.isTopHalf === isTopHalf
    )

    // Only add if not already visited in the time period
    if (!alreadyVisited) {
      recentVisits.push({ pageNum, isTopHalf, timestamp: now })
      localStorage.setItem('pageVisits', JSON.stringify(recentVisits))
      setPageChangeCount(recentVisits.length)
    }
  }

  const percentage = Math.min((pageChangeCount / maxPages) * 100, 100)

  return (
    <CircularProgress
      value={percentage}
      size="12"
      color={`${color}.400`}
      trackColor="gray.700"
      thickness="0.5rem"
    >
      <CircularProgressLabel>
        <Box textAlign="center">
          <Box fontSize="xl" fontWeight="bold" color={`${color}.300`}>
            {pageChangeCount}
          </Box>
          <Box fontSize="2xs" color="gray.400" mt="-1">
            {label}
          </Box>
        </Box>
      </CircularProgressLabel>
    </CircularProgress>
  )
}

export default PageCounter
