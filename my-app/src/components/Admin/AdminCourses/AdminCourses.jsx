import React, { useEffect, useState } from 'react'
import cursor from '../../../assets/images/cursor.png'
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import Sidebar from '../Sidebar'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModal from './CourseModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses, getCoursesLectures } from '../../../redux/actions/courseAction'
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/adminAction'
import toast from 'react-hot-toast'



const AdminCourses = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { courses, lectures } = useSelector(state => state.course);
  const { loading, message, error } = useSelector(state => state.admin);
  const [courseId, setCourseId] = useState("")
  const [courseTitle, setCourseTitle] = useState("")

  const dispatch = useDispatch();

  const courseDetailsHandler = (courseId, title) => {
    dispatch(getCoursesLectures(courseId))
    onOpen()
    setCourseId(courseId);
    setCourseTitle(title)
  }
  const deleteHandler = (courseId) => {
    dispatch(deleteCourse(courseId))
  }
  const deleteLectureHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId))
    dispatch(getCoursesLectures(courseId))

  }
  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    await dispatch(addLecture(courseId, myForm))
    dispatch(getCoursesLectures(courseId))

  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message)
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllCourses())
  }, [dispatch, error, message])

  return (
    <Grid
      minH={'100vh'}
      templateColumns={['3fr', '5fr 1fr']}
      css={{ cursor: `url(${cursor}), default` }}
    >
      <Box
        p={["0", '8']}
        overflowX={'auto'}
      >
        <Heading
          textTransform={'uppercase'}
          children='All Courses'
          my={'16'}
          textAlign={['center', 'left']}
        />
        <TableContainer
          w={['100vw', 'full']}
        >
          <Table variant={'simple'} size={'lg'}>
            <TableCaption>All available courses in the Database</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                courses.map(item => (
                  <Row
                    key={item._id}
                    item={item}
                    courseDetailsHandler={courseDetailsHandler}
                    deleteHandler={deleteHandler}
                    loading={loading}
                  />
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          deleteLectureHandler={deleteLectureHandler}
          id={courseId}
          addLectureHandler={addLectureHandler}
          courseTitle={courseTitle}
          lectures={lectures}
          loading={loading}
        />
      </Box>
      <Sidebar />

    </Grid>
  )
}

export default AdminCourses

function Row({ item, courseDetailsHandler, deleteHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td><Image src={item.poster.url} /> </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            variant={'outline'}
            color={'purple.500'}
            onClick={() => courseDetailsHandler(item._id, item.title)}
            isLoading={loading}
          >View Lectures</Button>
          <Button
            color={'purple.600'}
            onClick={() => deleteHandler(item._id)}
            isLoading={loading}
          ><RiDeleteBin7Fill /></Button>

        </HStack>
      </Td>

    </Tr>
  )
}