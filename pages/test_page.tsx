import Test from "@/components/Main/test"
import { Text } from "@chakra-ui/react"
import { Layout } from '@/layouts/default'
export default function TestPage() {
    return (
        <>
            <Test />
        </>
    )
}
TestPage.getLayout = Layout