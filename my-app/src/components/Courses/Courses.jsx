import React, { useEffect, useState } from 'react'
import './courses.css'
import {
    Button,
    Container,
    HStack,
    Heading,
    Image,
    Input,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../redux/actions/courseAction';
import { addToPlaylist } from '../../redux/actions/profileAction';
import { loadUser } from '../../redux/actions/userAction';

const Course = ({ views, title, imageSrc, id, addToPlaylistHandler,loading, creator, description, lectureCount }) => {
    return (
        <VStack className='course' alignItems={['center', 'flex-start']}>
            <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
            <Heading
                children={title}
                size={'sm'}
                textAlign={['center', 'left']}
                fontFamily={'sans-serif'}
                maxW={'200px'}
                noOfLines={2}
            />
            <Text noOfLines={2} children={description} />
            <HStack>
                <Text
                    fontWeight={'bold'}
                    textTransform={'uppercase'}
                    children={'Creator'}
                />
                <Text
                    fontFamily={'body'}
                    textTransform={'uppercase'}
                    children={creator}
                />
            </HStack>
            <Heading
                textAlign={'center'}
                size={'xs'}
                children={`Lectures - ${lectureCount}`}
                textTransform={'uppercase'}
            />
            <Heading
                textAlign={'center'}
                size={'xs'}
                children={`Views - ${views}`}
                textTransform={'uppercase'}
            />
            <Stack direction={['column', 'row']} alignItems={'center'}>
                <Link to={`/course/${id}`}>
                    <Button colorScheme='yellow' >
                        Watch Now
                    </Button>
                </Link>
                <Button isLoading={loading} colorScheme='yellow' variant={'ghost'} onClick={() => addToPlaylistHandler(id)} >
                    Add To Playlist
                </Button>
            </Stack>

        </VStack>
    )
}

const Courses = () => {
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const dispatch = useDispatch();
    const { loading, courses, error,message } = useSelector(state => state.course)

    const categories = [
        "Web Development",
        "Aritificial Intillegence",
        "Data Structure & Algorithm",
        "App Development",
        "Data Science",
        "Game Development",
    ]

    const addToPlaylistHandler = async(courseId) => {
    await dispatch(addToPlaylist(courseId))
    dispatch(loadUser())

    }
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" })
        }
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" })
        }
        dispatch(getAllCourses(category, keyword))
    }, [category, keyword,message, dispatch, error,]);

    return (
        <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
            <Heading children={"All Courses"} m={'8'} />
            <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search a course...'
                type='text'
                focusBorderColor='yellow.500'
            />
            <HStack overflowX={'auto'} paddingY={'8'} >
                {
                    categories.map((item, index) => (
                        <Button key={index} onClick={() => setCategory(item)} minW={"60"}>
                            <Text children={item} />
                        </Button>
                    ))
                }
            </HStack>
            <Stack
                direction={["column", "row"]}
                flexWrap={'wrap'}
                justifyContent={['flex-start', 'space-evenly']}
                alignItems={['center', 'flex-start']}
            >
                {
                    courses.length > 0 ?
                        courses.map((item) => (
                            <Course
                                key={item._id}
                                id={item._id}
                                title={item.title}
                                description={item.description}
                                views={item.views}
                                creator={item.createdBy}
                                imageSrc={item.poster.url}
                                lectureCount={item.numOfVideos}
                                addToPlaylistHandler={addToPlaylistHandler}
                                loading={loading}
                            />
                        )) : <Heading 
                        color={'yellow.500'} 
                        size={'md'} 
                        mt={"4"}
                        opacity={"0.5"}
                        textTransform={'uppercase'} 
                        children="Course not available right now" />
                }
            </Stack>

        </Container>
    )
}

export default Courses