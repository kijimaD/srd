'use client'

import { useState, useEffect } from 'react'
import { Box, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { getPageVisits, savePageVisits } from '../utils/pageVisits'

function PageCounter({ pageNum, isTopHalf, pdfName, filterType = 'hourly', maxPages = 10, color = 'cyan', label = 'pages' }) {
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
  }, [pdfName])

  useEffect(() => {
    // Record page change
    if (pageNum && isTopHalf !== undefined) {
      recordPageChange()
    }
  }, [pageNum, isTopHalf])

  const updatePageChangeCount = () => {
    const visits = getPageVisits(pdfName)
    const filterTime = getFilterTimestamp()
    const recentVisits = visits.filter(visit => visit.timestamp >= filterTime)

    setPageChangeCount(recentVisits.length)
  }

  const recordPageChange = () => {
    if (!pdfName) return

    const now = Date.now()
    let visits = getPageVisits(pdfName)

    // Check if this page was already visited (check all visits, not just recent)
    const alreadyVisited = visits.some(
      visit => visit.pageNum === pageNum && visit.isTopHalf === isTopHalf
    )

    // Only add if not already visited
    if (!alreadyVisited) {
      visits.push({ pageNum, isTopHalf, timestamp: now })

      // Clean up very old entries (older than 7 days)
      const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000
      visits = visits.filter(visit => visit.timestamp >= sevenDaysAgo)

      savePageVisits(pdfName, visits)
    }

    // Always update count, even if already visited
    updatePageChangeCount()
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
