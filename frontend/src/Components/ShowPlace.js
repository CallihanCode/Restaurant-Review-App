import { useParams } from "react-router-dom"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import Stack from "react-bootstrap/esm/Stack"
import { BsTrash } from 'react-icons/bs'

import AddComments from "./AddComments"

const ShowPlace = ({ setLink, data }) => {
  const { id } = useParams()
  let stars = 'No Ratings'
  let commentsArea
  const { city, comments, cuisines, founded, name, pic, state, _id } = data
  console.log(data)

  

  console.log(comments)

  try {
    if (comments.length > 0) {
      let sumRatings = comments.reduce((total, c) => {
          console.log('total', c)
          return total + c.stars
      }, 0)
      let averageRating = Math.round(sumRatings / comments.length)
      stars = ''
      for (let i = 0; i < averageRating; i++) {
          stars += '⭐️'
      }
      stars += ' Stars'
    }  

    commentsArea = comments.map(c => {
      const { rant, content, author, stars, _id } = c
      return (  
        <Stack gap={1}>
          <Col className='border' sm={4} key={_id}>
              <h6>{rant ? 'Rant 😡' : 'Rave 😀'}</h6>
              <h6>{content}</h6>
              <h6>
                  <strong>- {author}</strong>
              </h6>
              <h6 >Rating: {stars}</h6>
              <form method='POST' action={`/places/${id}/comment/${c._id}?_method=DELETE`}>
                  <button className='btn btn-danger bi bi-trash' type='submit'><BsTrash /></button>
              </form>
          </Col>
        </Stack>    
      )
    })
    
  } catch (error) {
    setLink(`/${id}`)
  }

  return (
    <Container className='my-5'>
      <Row className='my-5'>
        <Col>
          <img src={pic} alt={name} />
        </Col>
        <Col>
        <Stack gap={4}>
          <Row>
            <h2 className='text-center'>{name}</h2>
          </Row>
          <Row> 
            <h4 className='text-center'>Ratings</h4>
            <p className='text-center'>{stars}</p>
          </Row>
          <Row>
            <h4 className='text-center'>Description</h4>
            <h5 className='text-center'>
              {name} has been serving {cuisines} in {city}, {state} since {founded}.
            </h5>
          </Row>
        </Stack>
        </Col>
      </Row>
      <hr/>
      <Row>
        <h4 className='mb-2'>Comments</h4>
        <Row>
          {comments ? commentsArea : <p>No Comments</p>}
        </Row>
      </Row>
      <hr />
      <AddComments id={id}/>
    </Container>
  )
}

export default ShowPlace