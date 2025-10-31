'use client'

import { HStack, IconButton, Text, Flex, Icon, Divider } from '@chakra-ui/react'
import { BsLayoutSidebar, BsFileEarmarkText } from 'react-icons/bs'
import TimerGauge from './TimerGauge'

function Toolbar({
  onToggleSidebar,
  pdfName,
  pageNum,
  totalPages,
  isTopHalf,
  timerKey
}) {
  const halfText = isTopHalf ? '上' : '下'
  const pageInfo = totalPages > 0 ? `${pageNum} / ${totalPages} (${halfText})` : ''

  return (
    <HStack
      py={2}
      px={3}
      bg="gray.800"
      borderBottom="1px"
      borderColor="gray.700"
      spacing={3}
      backdropFilter="blur(8px)"
    >
      <IconButton
        icon={<BsLayoutSidebar />}
        variant="outline"
        size="sm"
        onClick={onToggleSidebar}
        title="Toggle Sidebar (S)"
        aria-label="Toggle sidebar"
      />

      <Flex flex={1} align="center" gap={2} overflow="hidden">
        <Icon as={BsFileEarmarkText} color="cyan.400" />
        <Text fontSize="sm" fontWeight="medium" noOfLines={1}>{pdfName}</Text>
      </Flex>

      <TimerGauge key={timerKey} />

      <Divider orientation="vertical" h="24px" />

      <Text fontSize="sm" color="gray.400" fontWeight="medium" fontFamily="mono">
        {pageInfo}
      </Text>
    </HStack>
  )
}

export default Toolbar
