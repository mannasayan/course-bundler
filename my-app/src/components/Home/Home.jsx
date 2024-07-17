import React from 'react'
import {
    Box, Button,
    HStack,
    Heading,
    Image,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react"
import './home.css'
import { Link } from 'react-router-dom'
import vg from "../../assets/images/bg.png"
import introVideo from "../../assets/videos/intro.mp4"
import {CgGoogle,CgYoutube} from 'react-icons/cg'
import {SiCoursera,SiUdemy,SiCodeigniter} from 'react-icons/si'
import {DiAws} from 'react-icons/di'

const Home = () => {
    return (
        <section className="home">
            <div className="container">
                <Stack
                    direction={["column", "row"]}
                    height={'100%'}
                    justifyContent={['center', 'space-between']}
                    alignItems={"center"}
                    spacing={["16", '56']}
                >
                    <VStack
                        width={"full"}
                        alignItems={["center", "flex-end"]}
                        spacing={"8"}
                    >
                        <Heading textAlign={['center','left']} size={'2xl'} children={"LEARN FROM THE EXPERT"} />
                        <Text 
                        textAlign={['center','left']}
                        children="Find Valuable Content At Resonable Price" 
                        fontFamily={'roboto'}
                        fontSize={'2xl'}
                        />
                        <Link to={'/courses'} children='hi' >
                            <Button size={'lg'} colorScheme='yellow'>
                                Explore Now
                            </Button>
                        </Link>

                    </VStack>

                    <Image className='vector-graphics' boxSize={'md'} src={vg}
                        objectFit={"contain"}
                    />

                </Stack>
            </div>
            <Box padding={'8'} bg="blackAlpha.800">
                <Heading 
                children="OUR BRANDS" 
                textAlign={'center'} 
                fontFamily={'body'} 
                color={'yellow.400'} />
                <HStack className='brandsBanner' justifyContent={'space-evenly'} marginTop={'4'}>
                    <CgGoogle />
                    <CgYoutube />
                    <SiCoursera />
                    <SiUdemy />
                    <SiCodeigniter />
                    <DiAws />
                </HStack>
            </Box>
            <div className="container2">
                <video
                // width={["80%","60%"]}
                autoPlay
                controls
                controlsList='nodownload nofullscreen noremoteplaback'
                disablePictureInPicture
                disableRemotePlayback
                src={introVideo}
                >
                </video>
            </div>
        </section>
    )
}

export default Home