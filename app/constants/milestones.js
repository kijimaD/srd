import { GiTwoCoins, GiMedal, GiTrophyCup, GiDiamondTrophy } from 'react-icons/gi'

export const MILESTONES = [
  { threshold: 5, icon: GiTwoCoins, label: 'Bronze', color: '#CD7F32' },
  { threshold: 10, icon: GiMedal, label: 'Silver', color: '#C0C0C0' },
  { threshold: 20, icon: GiTrophyCup, label: 'Gold', color: '#FFD700' },
  { threshold: 50, icon: GiDiamondTrophy, label: 'Diamond', color: '#00CED1' }
]
