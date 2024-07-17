import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../redux/actions/profileAction';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
    const params = useParams();

    const [password,setPassword] = useState("")

    const {loading,error,message} = useSelector(state=>state.profile)
    const navigate = useNavigate();
    const dispatch= useDispatch();

    const submitHandler =(e)=>{
      e.preventDefault();
      dispatch(resetPassword(params.token,password))
    }

    useEffect(()=>{
      if (error) {
        toast.error(error)
        dispatch({type:'clearError'});
      }
      if (message) {
        toast.success(message)
        dispatch({type:'clearMessage'});
        navigate('/login')
      }
    },[dispatch,error,message,navigate])


  return (
    <Container minHeight={'90vh'}py={'16'}>
        <form onSubmit={submitHandler} action="" >
            <Heading 
            children={"Reset Password"}
            my={"16"}
            textTransform={'uppercase'}
            textAlign={['center','left']}
            />
              <VStack spacing={'8'}>
              <Input
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Enter New Password'
            type='password'
            focusBorderColor='yellow.500'
            />
             <Button isLoading={loading} type='submit' w={'full'} colorScheme='yellow'>
                      Reset Password
                    </Button>
              </VStack>
        </form>
    </Container>
  )
}

export default ResetPassword