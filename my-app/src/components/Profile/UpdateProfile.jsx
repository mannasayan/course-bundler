import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { updateProfile } from '../../redux/actions/profileAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { loadUser } from '../../redux/actions/userAction'


const UpdateProfile = ({user}) => {
    const [name,setName]=useState(user.name)
    const [email,setEmail]=useState(user.email)
    const {loading,error,message} = useSelector(state=>state.profile)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler=async (e)=>{
      e.preventDefault();

      await dispatch(updateProfile(name,email))
      navigate('/profile')
  }


useEffect(()=>{
  if (error) {
    toast.error(error)
    dispatch({type:'clearError'});
  }
  if (message) {
    toast.success(message)
    dispatch({type:'clearMessage'});
    dispatch(loadUser())
  }
},[dispatch,error,message,navigate])

    
  return (
    <Container py='16' minH='90vh'>
    <form action="" onSubmit={submitHandler}>
        <Heading 
        children='Update Profile' 
        my='16' 
        
        textAlign={['center','left']}
        textTransform={'uppercase'}
        />
      <VStack spacing={'8'}>
        
      <Input 
        value={name}
        onChange={(e)=>setName(e.target.value)}
        placeholder='abe'
        type='text'
        focusBorderColor='yellow.500'
        />
      
        
      <Input 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder='abe@gmail.com'
        type='email'
        focusBorderColor='yellow.500'
        />
      
        <Button 
        my={'4'} w='full'
        colorScheme='yellow' 
        type='submit'
        isLoading={loading}
        >Update</Button>

      </VStack>
    </form>
</Container>
)
}
  
export default UpdateProfile