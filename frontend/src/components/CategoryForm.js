import { useEffect, useState } from 'react'
// Components
import Edit from './icons/Edit'
import Spinner from './Spinner'
// context
import { useAuth } from 'context/AuthContext'
// Notify
import { toast } from 'react-toastify'
// services
import CategoriesService from 'services/categories.service'
// Styles
import styled from 'styled-components'

const CategoryForm = ({ category = null, refresh, setShowForm, adding = false }) => {
  const { user } = useAuth()
  const [inputCategory, setInputCategory] = useState(category === null ? '' : category.name)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  // Form Read
  const handleChange = e => {
    setInputCategory(e.target.value)
  }

  const add = e => {
    e.preventDefault()

    if (inputCategory === '') {
      setError(true)
      return
    }
    setError(false)
    setIsLoading(true)
    CategoriesService.create({ name: inputCategory }, user.token)
      .then((response) => {
        // Notify user
        toast.info('New category added', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        setIsLoading(false)
        refresh(true)
        setShowForm(false)
      })
      .catch((e) => {
        console.log(e)
        // Notify user
        toast.error('Category not added', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
  }
  const edit = e => {
    e.preventDefault()

    if (inputCategory === '') {
      setError(true)
      return
    }
    setError(false)
    setIsLoading(true)
    CategoriesService.update(category.id, { name: inputCategory }, user.token)
      .then((response) => {
        // Notify user
        toast.info('Category edited', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        setIsLoading(false)
        refresh(true)
        setShowForm(false)
      })
      .catch((e) => {
        console.log(e)
        // Notify user
        toast.error('Category not edited', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
  }

  useEffect(() => {
    if (error) {
      toast.error('Complete all require inputs', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      setError(false)
    }
  }, [error])

  if (isLoading) {
    return <Container><Spinner /></Container>
  }
  return (
    <Container>
      <Form onSubmit={adding ? add : edit}>
        <input
          type='text'
          placeholder='Input a category'
          id='category'
          value={inputCategory}
          onChange={handleChange}
          name='inputCategory'
        />
        {adding
          ? (
            <Button type='submit' value='add' green>
              Add
            </Button>)
          : (
            <Button type='submit' value='edit' green>
              <Edit />
            </Button>)}
      </Form>
    </Container>
  )
}

export default CategoryForm

const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
    & .green {border: 2px solid var(--green);}
    & .red {border: 2px solid var(--red);}
`

const Form = styled.form`
    display: flex;
    flex-direction: row;
    gap:10px;
    @media (min-width: 576px) {
        flex-direction: row;
        gap:10px;
    }
    width: 100%;
    box-sizing: border-box;
    & > input[type=text] {
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 1.5rem;
        height: 38px;
        padding: 6px 10px;
        background-color: #fff;
        border: 1px solid #D1D1D1;
        border-radius: 4px;
        box-shadow: none;
    }
    
`

const Button = styled.button`
    display: inline-block;
    width: auto;
    height: 38px;
    padding: 0 5px;
    /* margin-bottom: 0.5rem; */
    box-sizing: border-box;
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    color: #fff;
    line-height: 38px;
    letter-spacing: .1rem;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid #bbb;
    background-color: #33c3f0;
    border-color: #33c3f0;
    ${(props) => props.red && 'border-color: var(--red); background-color: var(--red);'}
    ${(props) => props.green && 'border-color: var(--green); background-color: var(--green);'}    
    cursor: pointer;
    & > svg {
      vertical-align: middle;
    }
`
