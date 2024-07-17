import { Avatar, Box, Button, Container, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import introVideo from "../../assets/videos/intro.mp4"
import { RiSecurePaymentFill } from 'react-icons/ri';
import termsAndCondition from '../../assets/docs/termsAndCondition'


const Founder = () => (
    <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
        <VStack>
            <Avatar
                src='https://avatars.githubusercontent.com/u/80717108?s=400&u=838ff63adbeaa9133ec37a19e2db7de9c3b4dd03&v=4'
                boxSize={['40', '48']} />
            <Text children='Co-Founder' opacity={0.7} />
        </VStack>
        <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
            <Heading children='Sushanta Bhowmick' size={['md', 'xl']} />
            <Text
                textAlign={['center', 'left']}
                children='Hi i am a full-stack developer and a student. Our Mission is to provide quality content at resinable price' />
        </VStack>

    </Stack>
);

const VideoPlayer = () => (
    <Box>
        <video
            autoPlay
            muted
            controls
            controlsList='nodownload nofullscreen noremoteplaback'
            disablePictureInPicture
            disableRemotePlayback
            src={introVideo}
        >
        </video>
    </Box>


)
const Tandc =({termsAndCondition})=>(
    <Box>
        <Heading children={'Terms & condition'} size={'md'} textAlign={['center','left']} my={'4'}/>

        <Box h='sm' p='4' overflowY={"scroll"}>
    <Text
    fontFamily={'heading'}
    textAlign={['center','left']}
    letterSpacing={'widest'}
    >
        {termsAndCondition}
    </Text>
    <Heading my='4' size='xs' children='Refund only applicable for cancellation within 7 days'/>
        </Box>
    </Box>
)

const About = () => {
    return (
        <Container maxW={'container.lg'} padding={'16'} boxShadow={'lg'}>
            <Heading children='About Us' textAlign={['center', 'left']} />
            <Founder />
            <Stack m={'8'} direction={['column', 'row']} alignItems={['center']}>
                <Text fontFamily={'cursive'} m='8' textAlign={['center', 'left']}>
                    We are a video streaming platfrom with some premium courses available only for premium users.
                </Text>

                <Link to={'/subscribe'}>
                    <Button colorScheme='yellow' variant={'ghost'}>CheckOut Our Plan</Button>
                </Link>
            </Stack>

            <VideoPlayer />
            <Tandc termsAndCondition={termsAndCondition} />
            <HStack my={'4'} p={'4'}>
                <RiSecurePaymentFill />
                <Heading
                size={'xs'}
                fontFamily={'sans-serif'}
                textTransform={'uppercase'}
                children= {"Payment is secured by Razorpay"}
                />
            </HStack>

        </Container>
    )
}

export default About