'use client'

import { Box, Icon, Tooltip } from '@chakra-ui/react'

function MilestoneBadges({ achievedMilestones }) {
  if (achievedMilestones.length === 0) return null

  return (
    <Box display="flex" flexDirection="column" gap={2} alignItems="center">
      {achievedMilestones.slice().reverse().map(m => (
        <Tooltip
          key={m.threshold}
          label={`${m.label} - ${m.threshold}ページ達成`}
          placement="left"
          bg="gray.800"
          color="white"
          fontSize="sm"
          fontWeight="bold"
          borderWidth="1px"
          borderColor="gray.600"
          boxShadow="0 4px 12px rgba(0,0,0,0.5)"
        >
          <Box
            position="relative"
            w="48px"
            h="48px"
            cursor="pointer"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
              transform: 'scale(1.2) translateY(-4px) rotateZ(10deg)',
              filter: 'brightness(1.2)',
            }}
            _active={{
              transform: 'scale(1.1) translateY(-2px)',
            }}
          >
            {/* Outer glow */}
            <Box
              position="absolute"
              inset="-4px"
              borderRadius="full"
              bg={`radial-gradient(circle, ${m.color}aa 0%, transparent 70%)`}
              filter="blur(8px)"
              opacity="0.6"
              animation="pulse 2s ease-in-out infinite"
            />

            {/* Main coin body */}
            <Box
              position="absolute"
              inset="0"
              borderRadius="full"
              background={`
                radial-gradient(circle at 30% 30%, ${m.color}ff 0%, ${m.color}dd 50%, ${m.color}88 100%)
              `}
              boxShadow={`
                0 6px 12px rgba(0,0,0,0.6),
                0 2px 4px rgba(0,0,0,0.4),
                inset 0 -2px 6px rgba(0,0,0,0.5),
                inset 0 2px 2px rgba(255,255,255,0.4)
              `}
            />

            {/* Inner ring */}
            <Box
              position="absolute"
              inset="3px"
              borderRadius="full"
              border="2px solid"
              borderColor={`${m.color}33`}
              boxShadow={`
                inset 0 2px 4px rgba(0,0,0,0.3),
                inset 0 -1px 2px rgba(255,255,255,0.3)
              `}
            />

            {/* Icon container */}
            <Box
              position="absolute"
              inset="0"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon
                as={m.icon}
                boxSize="24px"
                color="rgba(255,255,255,0.95)"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.7))"
                style={{
                  strokeWidth: '0.5px',
                  stroke: 'rgba(0,0,0,0.2)'
                }}
              />
            </Box>

            {/* Top highlight */}
            <Box
              position="absolute"
              top="15%"
              left="25%"
              w="50%"
              h="35%"
              bg="rgba(255,255,255,0.5)"
              borderRadius="full"
              filter="blur(6px)"
              pointerEvents="none"
              transform="rotate(-30deg)"
            />

            {/* Bottom shadow overlay */}
            <Box
              position="absolute"
              bottom="10%"
              left="20%"
              right="20%"
              h="25%"
              bg="rgba(0,0,0,0.2)"
              borderRadius="full"
              filter="blur(4px)"
              pointerEvents="none"
            />

            {/* Edge shine */}
            <Box
              position="absolute"
              inset="1px"
              borderRadius="full"
              border="1.5px solid"
              borderColor="rgba(255,255,255,0.3)"
              pointerEvents="none"
            />
          </Box>
        </Tooltip>
      ))}
    </Box>
  )
}

export default MilestoneBadges
