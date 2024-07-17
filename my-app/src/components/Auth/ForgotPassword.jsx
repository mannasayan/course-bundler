import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../redux/actions/profileAction';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {

    const [email,setEmail] = useState("");

    const {loading,error,message} = useSelector(state=>state.profile)

    const dispatch= useDispatch();
    const submitHandler =(e)=>{
      e.preventDefault();
      dispatch(forgotPassword(email))
    }

    useEffect(()=>{
      if (error) {
        toast.error(error)
        dispatch({type:'clearError'});
      }
      if (message) {
        toast.success(message)
        dispatch({type:'clearMessage'});
      }
    },[dispatch,error,message])


  return (
    <Container minHeight={'90vh'}py={'16'}>
        <form onSubmit={submitHandler} action="" >
            <Heading 
            children={"Forgot Password"}
            my={"16"}
            textTransform={'uppercase'}
            textAlign={['center','left']}
            />
              <VStack spacing={'8'}>
              <Input
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='abc@gmail.com'
            type='email'
            focusBorderColor='yellow.500'
            />
             <Button isLoading={loading} type='submit' w={'full'} colorScheme='yellow'>
                      Send Reset Link
                    </Button>
              </VStack>
        </form>
    </Container>
  )
}

export default ForgotPassword