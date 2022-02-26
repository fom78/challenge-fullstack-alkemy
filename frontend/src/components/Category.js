import { useState } from 'react'
// components
import CategoryForm from './CategoryForm'
// styles
import styled from 'styled-components'

export default function Category ({ category, refresh }) {
  const [showForm, setShowForm] = useState(false)

  const handleEdit = () => {
    setShowForm(true)
  }

  return (
    <div>
      {!showForm
        ? (
          <Container>
            <div>{category.name}</div>
            <Button onClick={handleEdit}>Edit</Button>
          </Container>
          )
        : (
          <>
            <CategoryForm category={category} refresh={refresh} setShowForm={setShowForm} />
            <Button onClick={() => setShowForm(!showForm)} red> X </Button>
          </>
          )}
    </div>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap:10px;
    @media (min-width: 576px) {
        flex-direction: row;
        gap:10px;
    }
    width: 100%;
    box-sizing: border-box;
    & > div {
        width: 100%;
        margin-bottom: 1.5rem;
        height: 38px;
        padding: 6px 10px;
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
