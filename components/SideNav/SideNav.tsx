import { Avatar, AvatarBadge, Box, Container, Flex } from "@chakra-ui/react";

export default function SideNav() {
    return (
        <>
            <Box w="96px" minHeight="100vh">
                <Flex direction="column" justifyContent="space-between">
                    <Container p="0">
                        <Avatar w="56px" h="56px" borderRadius="4px" icon={<span className="material-symbols-outlined">
                            search
                        </span>}>
                            <AvatarBadge boxSize="1em" bg="green.500" />
                        </Avatar>

                    </Container>

                </Flex>

            </Box>

        </>
    )
}