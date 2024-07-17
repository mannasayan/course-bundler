import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { changePassword } from '../../redux/actions/profileAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'


const ChanagePassword = () => {

    const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const dispatch = useDispatch();  
    const {loading,error,message} = useSelector(state=>state.profile)
    const navigate = useNavigate();

    const submitHandler=(e)=>{
      e.preventDefault();

      dispatch(changePassword(oldPassword,newPassword))
  }



useEffect(()=>{
if (error) {
  toast.error(error)
  dispatch({type:'clearError'});
}
if (message) {
  toast.success(message)
  dispatch({type:'clearMessage'});
  navigate('/profile')
}
},[dispatch,error,message,navigate])

  

  return (
    <Container py='16' minH='90vh'>
        <form action="" onSubmit={submitHandler}>
            <Heading 
            children='Change Password' 
            my='16' 
            textAlign={['center','left']}
            textTransform={'uppercase'}
            />
          <VStack spacing={'8'}>
            
          <Input 
            required
            value={oldPassword}
            onChange={(e)=>setOldPassword(e.target.value)}
            placeholder='Enter Old Password'
            type='password'
            focusBorderColor='yellow.500'
            />
          
            <Input
            required
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            placeholder='Enter New Password'
            type='password'
            focusBorderColor='yellow.500'
            />
            <Button 
            my={'4'} w='full' 
            colorScheme='yellow' 
            type='submit'
            isLoading={loading}
            >Change Password</Button>

          </VStack>
        </form>
    </Container>
  )
}

export default ChanagePassword