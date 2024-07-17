import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const location = useLocation();
    return (
        <VStack spacing={'8'}
            p='16'
            boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
        >
            <DashboardLinkButton
                Icon={RiDashboardFill}
                text={'DashBoard'}
                url={'dashboard'}
                active={location.pathname === '/admin/dashboard'}
            />
            <DashboardLinkButton
                Icon={RiAddCircleFill}
                text={'Create Course'}
                url={'createcourse'}
                active={location.pathname === '/admin/createcourse'}
            />
            <DashboardLinkButton
                Icon={RiEyeFill}
                text={'Courses'}
                url={'courses'}
                active={location.pathname === '/admin/courses'}
            />
            <DashboardLinkButton
                Icon={RiUser3Fill}
                text={'Users'}
                url={'users'}
                active={location.pathname === '/admin/users'}
            />

        </VStack>
    )
}

export default Sidebar

function DashboardLinkButton({ url, Icon, text, active }) {
    return (
        <Link to={`/admin/${url}`}>
            <Button 
            fontSize={'larger'} 
            variant={'ghost'} 
            colorScheme={active ? "purple" : ""}
            >
                <Icon style={{ margin: '4px' }} />
                {text}
            </Button>
        </Link>
    )
}