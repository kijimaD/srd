'use client'

import { useState, useEffect } from 'react'
import { Box, VStack, HStack, Text, Icon, IconButton, Heading, Flex } from '@chakra-ui/react'
import { BsFilePdfFill, BsFolderFill, BsFolder2Open, BsArrowLeft } from 'react-icons/bs'

function Sidebar({ visible, onPdfSelect, currentPdfPath, urlParams }) {
  const [currentPath, setCurrentPath] = useState('.')
  const [items, setItems] = useState([])
  const [hasLoadedFromUrl, setHasLoadedFromUrl] = useState(false)

  useEffect(() => {
    loadDirectory('.')
  }, [])

  const loadDirectory = async (path = '.') => {
    try {
      const response = await fetch(`/api/browse?path=${encodeURIComponent(path)}`)
      const data = await response.json()
      setCurrentPath(data.currentPath)
      setItems(data.items)
    } catch (error) {
      console.error('Error loading directory:', error)
    }
  }

  useEffect(() => {
    // Load PDF from URL parameters when items are loaded
    if (urlParams && items.length > 0 && !hasLoadedFromUrl && currentPath === '.') {
      const matchingItem = items.find(item => item.path === urlParams.file)
      if (matchingItem) {
        handlePdfClick(matchingItem, urlParams.page, urlParams.isTop)
        setHasLoadedFromUrl(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParams, items, hasLoadedFromUrl, currentPath])

  const goBack = () => {
    if (currentPath === '.' || currentPath === '') return
    const parentPath = currentPath.split(/[\/\\]/).slice(0, -1).join('/') || '.'
    loadDirectory(parentPath)
  }

  const handlePdfClick = (item, initialPage = 1, initialIsTop = true) => {
    onPdfSelect({
      url: '/api/pdf/' + item.path,
      path: item.path,
      name: item.name,
      initialPage,
      initialIsTop
    })
  }

  const handleItemClick = (item) => {
    if (item.type === 'directory') {
      loadDirectory(item.path)
    } else {
      handlePdfClick(item)
    }
  }

  return (
    <Box
      w="320px"
      bg="gray.800"
      borderRight="1px"
      borderColor="gray.700"
      overflowY="auto"
      transition="margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      ml={visible ? 0 : '-320px'}
    >
      <Box bg="gray.900" p={3} borderBottom="1px" borderColor="gray.700">
        <Heading size="md" display="flex" alignItems="center" gap={2}>
          <Icon as={BsFilePdfFill} color="blue.400" />
          PDF Theater
        </Heading>
      </Box>

      <HStack p={2} px={3} borderBottom="1px" borderColor="gray.700" spacing={2}>
        <IconButton
          icon={<BsArrowLeft />}
          size="sm"
          variant="outline"
          onClick={goBack}
          isDisabled={currentPath === '.' || currentPath === ''}
          aria-label="Go back"
        />
        <Flex flex={1} align="center" gap={2} overflow="hidden">
          <Icon as={BsFolder2Open} color="yellow.600" fontSize="14px" />
          <Text fontSize="sm" color="gray.400" noOfLines={1}>{currentPath}</Text>
        </Flex>
      </HStack>

      <VStack spacing={0} py={2} align="stretch">
        {items.length === 0 ? (
          <Text textAlign="center" p={4} color="gray.500">No files found</Text>
        ) : (
          items.map((item, index) => (
            <Box
              key={index}
              px={3}
              py={2}
              mx={2}
              borderRadius="md"
              cursor="pointer"
              bg={currentPdfPath === item.path ? 'blue.600' : 'transparent'}
              _hover={{ bg: currentPdfPath === item.path ? 'blue.600' : 'gray.700', transform: 'translateX(2px)' }}
              transition="all 0.2s"
              onClick={() => handleItemClick(item)}
            >
              <HStack spacing={2}>
                <Icon
                  as={item.type === 'directory' ? BsFolderFill : BsFilePdfFill}
                  color={item.type === 'directory' ? 'yellow.400' : 'red.400'}
                  flexShrink={0}
                />
                <Text
                  fontSize="sm"
                  fontWeight={item.type === 'directory' ? 'medium' : 'normal'}
                  wordBreak="break-word"
                >
                  {item.name}
                </Text>
              </HStack>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  )
}

export default Sidebar
