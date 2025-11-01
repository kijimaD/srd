import { GiBookmark, GiTwoCoins, GiMedal, GiTrophyCup, GiDiamondTrophy, GiCrystalShine, GiLaurelCrown, GiDualityMask, GiFireAce, GiRoundStar, GiSparkles, GiCrown, GiFlame, GiFairyWand } from 'react-icons/gi'

export const MILESTONES = [
  { threshold: 1, icon: GiBookmark, subIcon: null, label: 'Starter', color: '#8B7355' },
  { threshold: 5, icon: GiTwoCoins, subIcon: GiRoundStar, label: 'Bronze', color: '#CD7F32' },
  { threshold: 10, icon: GiMedal, subIcon: GiRoundStar, label: 'Silver', color: '#C0C0C0' },
  { threshold: 20, icon: GiTrophyCup, subIcon: GiSparkles, label: 'Gold', color: '#FFD700' },
  { threshold: 50, icon: GiDiamondTrophy, subIcon: GiSparkles, label: 'Diamond', color: '#00CED1' },
  { threshold: 80, icon: GiCrystalShine, subIcon: GiCrown, label: 'Crystal', color: '#E0B0FF' },
  { threshold: 100, icon: GiLaurelCrown, subIcon: GiCrown, label: 'Legend', color: '#FF1493' },
  { threshold: 200, icon: GiDualityMask, subIcon: GiFlame, label: 'Master', color: '#9400D3' },
  { threshold: 300, icon: GiFireAce, subIcon: GiFairyWand, label: 'God', color: '#FF4500' }
]
