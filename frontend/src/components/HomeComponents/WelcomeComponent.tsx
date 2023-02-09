import { Button, Container } from "@mui/material"

const Welcome = () => {
    return (
        <Container>
            <h2>Yoo, let's go shopping!</h2>
            <Button variant="contained" sx={{ textTransform: 'capitalize' }}>Create Cart</Button>
        </Container>
    )
}

export default Welcome