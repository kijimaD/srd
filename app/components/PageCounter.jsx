'use client'

import { useState, useEffect, useRef } from 'react'
import { Box, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

const MAX_PAGES = 10

function PageCounter({ pageNum, isTopHalf }) {
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

  const percentage = Math.min((pageChangeCount / MAX_PAGES) * 100, 100)

  return (
    <CircularProgress
      value={percentage}
      size="12"
      color="cyan.400"
      trackColor="gray.700"
      thickness="0.5rem"
    >
      <CircularProgressLabel>
        <Box textAlign="center">
          <Box fontSize="xl" fontWeight="bold" color="cyan.300">
            {pageChangeCount}
          </Box>
          <Box fontSize="2xs" color="gray.400" mt="-1">
            pages
          </Box>
        </Box>
      </CircularProgressLabel>
    </CircularProgress>
  )
}

export default PageCounter
