import React from 'react'
import { ColorModeSwitcher } from '../../ColorModeSwitcher'
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    VStack,
    useDisclosure
} from '@chakra-ui/react'
import {
    RiDashboardFill,
    RiLoginBoxLine,
    RiLogoutBoxLine,
    RiMenu5Fill,
    RiProfileLine
} from 'react-icons/ri'
import { MdAndroid } from "react-icons/md";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userAction';

const Header = ({ isAuthenticated = false, user }) => {


    const LinkButton = ({ url = "/", title = "Home", onClose }) => (
        <Link onClick={onClose} to={url}>
            <Button variant={'ghost'}>{title}</Button>
        </Link>
    )

    const { isOpen, onOpen, onClose } = useDisclosure();

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout())
        onClose()
    }
    return (
        <>
            <ColorModeSwitcher />
            <Button onClick={onOpen}
                colorScheme='yellow'
                width={"12"}
                height={"12"}
                rounded={"full"}
                position={'fixed'}
                zIndex={'overlay'}
                left={'4'}
                top={'4'}
            >
                <RiMenu5Fill />
            </Button>

            <Drawer
                placement='left'
                onClose={onClose}
                isOpen={isOpen}
            >
                <DrawerOverlay backdropFilter={'blur(5px)'} />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={"1px"} children={'COURSE BUNDLER'} />
                    <DrawerBody >
                        <VStack spacing={'4'} alignItems={'flex-start'}>
                            <LinkButton onClose={onClose} url={'/'} title='Home' />
                            <LinkButton onClose={onClose} url={'/courses'} title='Browse All Courses' />
                            <LinkButton onClose={onClose} url={'/request'} title='Request a Course' />
                            <LinkButton onClose={onClose} url={'/contact'} title='Contact Us' />
                            <LinkButton onClose={onClose} url={'/about'} title='About' />

                            <HStack
                                justifyContent={'space-evenly'}
                                position={'absolute'}
                                bottom={'2rem'}
                                width={"80%"}
                            >
                                {isAuthenticated ? (
                                    <>
                                        <VStack>
                                            <HStack>
                                                <Link to={'/profile'} onClick={onClose}>
                                                    <Button colorScheme='yellow' variant={'ghost'}>
                                                        <RiProfileLine />
                                                        Profile
                                                    </Button>
                                                </Link>
                                                <Button variant={'ghost'} onClick={logoutHandler}>
                                                    <RiLogoutBoxLine />
                                                    Logout
                                                </Button>
                                            </HStack>
                                            {user && user.role === 'admin' ?
                                                <Link to='/admin/dashboard' onClick={onClose}>
                                                    <Button
                                                        width={"full"}
                                                        colorScheme='purple'
                                                        variant={'ghost'}
                                                    >
                                                        <RiDashboardFill style={{ margin: "4px" }} />
                                                        Dashboard
                                                    </Button>
                                                </Link>
                                                : ""}
                                        </VStack>
                                    </>)
                                    : (<>
                                        <Link to={'/login'} onClick={onClose}>
                                            <Button colorScheme='yellow'>
                                                <RiLoginBoxLine />
                                                Login
                                            </Button>
                                        </Link>
                                        <p>OR</p>
                                        <Link to={'/register'} onClick={onClose} >
                                            <Button colorScheme='yellow'>
                                                <MdAndroid />
                                                Signup
                                            </Button>
                                        </Link>
                                    </>)}
                            </HStack>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Header;

