import { Box, HStack, Heading, Stack, VStack, color } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import {TiSocialYoutubeCircular,TiSocialInstagramCircular,TiSocialTwitterCircular } from 'react-icons/ti'
import {DiGithub } from 'react-icons/di'

const Footer = () => {
  return (
    <Box padding={'4'} bg={'blackAlpha.900'} minH={'10vh'} >
        <Stack direction={['column','row']}>
            <VStack alignItems={['center','flex-start']} width={'full'}>
                <Heading children={"All Rights Reserved" }color={'white'}/>
                <Heading 
                size={'sm'}
                fontFamily={'body'}
                children={"Sushanta Bhowmick"}
                color={'yellow.400'}
                />
            </VStack>
            <HStack spacing={['2','10']} justifyContent={'center'} color={'white'} fontSize={['40','50']}>
                
            <Link to={'https://youtube.com'} target='blank'>
            <TiSocialYoutubeCircular />
            </Link>

            <Link to={'https://www.instagram.com/sushanta8514/'} target='blank'>
            <TiSocialInstagramCircular />
            </Link>

            <Link to={'https://github.com/SushantaBhowmick'} target='blank'>
            <DiGithub />
            </Link>

            <Link to={'https://twitter.com/Sushant31147320'} target='blank'>
            <TiSocialTwitterCircular />
            </Link>
            </HStack>
        </Stack>
    </Box>
  )
}

export default Footer