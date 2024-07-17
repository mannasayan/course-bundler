import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import toast from 'react-hot-toast'
import { courseRequest } from '../../redux/actions/otherAction'

const Request = () => {

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [course,setCourse]=useState("");

    const {error,message,loading} = useSelector(state=>state.other)

const dispatch = useDispatch();

const submitHandler=(e)=>{
    e.preventDefault();

    dispatch(courseRequest(name,email,course))

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

  }, [dispatch, error, message])
  return (
    <Container h={'92vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
            <Heading children={'Request New Course'} />
            <form style={{width:"100%"}} onSubmit={submitHandler}>
            <Box my={'4'}>
            <FormLabel htmlFor='name' children={"Name"}/>
            <Input 
            required
            id='name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder='abc'
            type='text'
            focusBorderColor='yellow.500'
            />
            </Box>

            <Box my={'4'}>
            <FormLabel htmlFor='email' children={"Email Address"}/>
            <Input 
            required
            id='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='abc@gmail.com'
            type='email'
            focusBorderColor='yellow.500'
            />
            </Box>

            <Box my={'4'}>
            <FormLabel htmlFor='message' children={"Course"}/>
            <Textarea 
            required
            id='course'
            value={course}
            onChange={(e)=>setCourse(e.target.value)}
            placeholder='Explain the course'
            focusBorderColor='yellow.500'
            />
            </Box>


            <Button my={'4'} isLoading={loading} colorScheme='yellow' type='submit'>Send Mail</Button>

            <Box my='4'>
                See available Courses? <Link to='/courses'>
                    <Button variant={'link'} colorScheme='yellow'>
                        Click
                    </Button>{" "}
                    here
                </Link>
            </Box>
       
        </form>
        </VStack>
    </Container>
  )
}

export default Request