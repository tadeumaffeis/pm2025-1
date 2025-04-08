import Container from "../../container/Container";

export function Course({title}) {
    console.log(title);
    return (
        <Container border='1px solid black' width="180px" height="80px">
            <form action={null}>
                <label>Identificação</label>
                <input name='_id'></input>
                <button type='button'>Ok</button>
            </form>
        </Container>
    )
}

export default Course;