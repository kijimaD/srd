'use client'

import { Box } from '@chakra-ui/react'
import TimerGauge from './TimerGauge'
import PageCounter from './PageCounter'

function ReadingStats({ timerKey, pageNum, isTopHalf }) {
  return (
    <Box display="flex" flexDirection="column" gap={2} alignItems="center">
      <PageCounter pageNum={pageNum} isTopHalf={isTopHalf} filterType="daily" maxPages={50} color="purple" label="day" />
      <PageCounter pageNum={pageNum} isTopHalf={isTopHalf} filterType="hourly" maxPages={10} color="cyan" label="hour" />
      <TimerGauge key={timerKey} />
    </Box>
  )
}

export default ReadingStats
