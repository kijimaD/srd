'use client'

import { useState, useEffect } from 'react'
import { MILESTONES } from '../constants/milestones'
import { getDailyCount } from '../utils/pageVisits'

export function useDailyMilestone(pdfName, pageNum, isTopHalf) {
  const [data, setData] = useState({
    count: 0,
    achievedMilestones: [],
    nextMilestone: MILESTONES[0]
  })

  useEffect(() => {
    if (!pdfName) return

    const count = getDailyCount(pdfName)

    // 達成済みマイルストーン
    const achieved = MILESTONES.filter(m => count >= m.threshold)

    // 次のマイルストーン（全て達成済みなら最後のまま）
    const next = MILESTONES.find(m => m.threshold > count)
      || MILESTONES[MILESTONES.length - 1]

    setData({ count, achievedMilestones: achieved, nextMilestone: next })
  }, [pdfName, pageNum, isTopHalf])

  return data
}
