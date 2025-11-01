'use client'

import { Box } from '@chakra-ui/react'
import TimerGauge from './TimerGauge'
import PageCounter from './PageCounter'

function ReadingStats({ timerKey, pageNum, isTopHalf }) {
  return (
    <Box display="flex" flexDirection="column" gap={2} alignItems="center">
      <PageCounter pageNum={pageNum} isTopHalf={isTopHalf} />
      <TimerGauge key={timerKey} />
    </Box>
  )
}

export default ReadingStats
