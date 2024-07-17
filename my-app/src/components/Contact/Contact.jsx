import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { contactUs } from '../../redux/actions/otherAction'
import toast from 'react-hot-toast'

const Contact = () => {

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [message,setMessage]=useState("");
    const {error,message:otherMessage,loading} = useSelector(state=>state.other)

const dispatch = useDispatch();

const submitHandler=(e)=>{
    e.preventDefault();

    dispatch(contactUs(name,email,message))

}


useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch({ type: 'clearError' });
    }
    if (otherMessage) {
      toast.success(otherMessage)
      dispatch({ type: 'clearMessage' });
    }

  }, [dispatch, error, otherMessage])

  return (

    <Container h={'92vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
            <Heading children={'Contact Us'} />
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
            <FormLabel htmlFor='message' children={"Message"}/>
            <Textarea 
            required
            id='messaage'
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            placeholder='Text Here'
            focusBorderColor='yellow.500'
            />
            </Box>


            <Button isLoading={loading} my={'4'} colorScheme='yellow' type='submit'>Send Mail</Button>

            <Box my='4'>
                Request for a course? <Link to='/request'>
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

export default Contact