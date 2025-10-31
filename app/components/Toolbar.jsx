'use client'

import { HStack, IconButton, Text, Flex, Icon, Divider } from '@chakra-ui/react'
import { BsLayoutSidebar, BsZoomIn, BsZoomOut, BsArrowCounterclockwise, BsFileEarmarkText } from 'react-icons/bs'
import TimerGauge from './TimerGauge'

function Toolbar({
  onToggleSidebar,
  pdfName,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  pageNum,
  totalPages,
  isTopHalf,
  timerKey
}) {
  const zoomPercentage = Math.round(zoomLevel * 100)
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

      <HStack spacing={2}>
        <IconButton
          icon={<BsZoomOut />}
          variant="outline"
          size="sm"
          onClick={onZoomOut}
          title="Zoom Out (-)"
          aria-label="Zoom out"
        />
        <Text
          fontSize="sm"
          color="gray.400"
          fontWeight="medium"
          fontFamily="mono"
          minW="52px"
          textAlign="center"
        >
          {zoomPercentage}%
        </Text>
        <IconButton
          icon={<BsZoomIn />}
          variant="outline"
          size="sm"
          onClick={onZoomIn}
          title="Zoom In (+)"
          aria-label="Zoom in"
        />
        <IconButton
          icon={<BsArrowCounterclockwise />}
          variant="outline"
          size="sm"
          onClick={onZoomReset}
          title="Reset Zoom (0)"
          aria-label="Reset zoom"
        />
      </HStack>

      <Divider orientation="vertical" h="24px" />

      <Text fontSize="sm" color="gray.400" fontWeight="medium" fontFamily="mono">
        {pageInfo}
      </Text>
    </HStack>
  )
}

export default Toolbar
