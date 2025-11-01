'use client'

import { Box } from '@chakra-ui/react'
import TimerGauge from './TimerGauge'
import PageCounter from './PageCounter'
import MilestoneBadges from './MilestoneBadges'
import { useDailyMilestone } from '../hooks/useDailyMilestone'

function ReadingStats({ timerKey, pageNum, isTopHalf, pdfName }) {
  const { achievedMilestones, nextMilestone } = useDailyMilestone(pdfName, pageNum, isTopHalf)

  return (
    <Box display="flex" flexDirection="column" gap={2} alignItems="center">
      <MilestoneBadges achievedMilestones={achievedMilestones} />
      <PageCounter
        pageNum={pageNum}
        isTopHalf={isTopHalf}
        pdfName={pdfName}
        filterType="daily"
        maxPages={nextMilestone.threshold}
        color="purple"
        label="day"
      />
      <PageCounter pageNum={pageNum} isTopHalf={isTopHalf} pdfName={pdfName} filterType="hourly" maxPages={10} color="cyan" label="hour" />
      <TimerGauge key={timerKey} />
    </Box>
  )
}

export default ReadingStats
