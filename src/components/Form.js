import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// Components
import Error from './Error'
// Service
import FinanceService from 'services/finance.service'
// Styles
import styled from 'styled-components'

const Form = ({ setRefreshList, edit = false }) => {
  // Create state as an object
  const [operation, setOperation] = useState({
    concept: '',
    amount: '',
    date: '',
    type: ''
  })
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (edit && params) {
      FinanceService.get(params.id)
        .then((response) => {
          const operationFounded = response.data
          // Convert to date correct for input.
          const date = new Date(operationFounded[0].date).toISOString().slice(0, 10)

          setOperation({ ...operationFounded[0], date: date })
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }, [params])

  // Verify error
  const [error, setError] = useState(false)

  // Form Read
  const handleChange = e => {
    setOperation({
      ...operation,
      [e.target.name]: e.target.value
    })
  }

  // Send req to API
  const createOperation = e => {
    e.preventDefault()
    if (edit) {
      if (operation.concept === '' || operation.amount === '' || operation.date === '') {
        setError(true)
        return
      }
      setError(false)
      FinanceService.update(params.id, operation)
        .then((response) => {
          setRefreshList(true)
        })
        .catch((e) => {
          console.log(e)
        })

      // Redirect
      navigate('/list')
    }
    if (!edit) {
      if (operation.concept === '' || operation.amount === '' || operation.date === '' || operation.type === '') {
        setError(true)
      } else {
        setError(false)
        FinanceService.create(operation)
          .then((response) => {
            setRefreshList(true)
          })
          .catch((e) => {
            console.log(e)
          })

        // Redirect
        navigate('/list')
      }
    }
  }

  function cancelButton () {
    navigate('/list')
  }

  return (
    <Container>
      <div>
        <h4>Enter new operation</h4>
        <form onSubmit={createOperation}>
          <Row>
            <div>
              <label htmlFor='concept-form'>Concept</label>
              <input
                type='text'
                placeholder='Shopping'
                id='concept-form'
                value={operation ? operation.concept : ''}
                onChange={handleChange}
                name='concept'
              />
            </div>
          </Row>
          <Row>
            <div>
              <label htmlFor='date-form'>Date</label>
              <input
                type='date'
                id='date-form'
                value={operation ? operation.date : ''}
                onChange={handleChange}
                name='date'
              />
            </div>

          </Row>
          <Row>
            {!edit &&
              <div>
                <label htmlFor='type-form'>Type</label>
                <select id='type-form' onChange={handleChange} name='type'>
                  <option value=''>- Select an option -</option>
                  <option value='income'>Income</option>
                  <option value='expenditure'>Expenditure</option>
                </select>
              </div>}
            <div>
              <label htmlFor='amount-form'>Amount</label>
              <input
                type='number'
                placeholder='500'
                id='amount-form'
                value={operation ? operation.amount : ''}
                onChange={handleChange}
                name='amount'
              />
            </div>
          </Row>
          <Button type='submit' value={edit ? 'Edit' : 'Add'} green />
          <Button type='submit' value='Cancel' onClick={cancelButton} red />

        </form>
        {error ? <Error message='All fields are required' /> : null}
      </div>
    </Container>
  )
}

export default Form

const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
`

const Row = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 576px) {
        flex-direction: row;
        gap:10px;
    }
    & > div {
        width: 100%;
        box-sizing: border-box;
        & > label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }
        & > input {
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 1.5rem;
        }
        & > input[type=number], input[type=text], select {
            appearance: none;
            height: 38px;
            padding: 6px 10px;
            background-color: #fff;
            border: 1px solid #D1D1D1;
            border-radius: 4px;
            box-shadow: none;
            box-sizing: border-box;
            width: 100%;
        }
    }
`

const Button = styled.input`
    display: inline-block;
    width: 100%;
    height: 38px;
    padding: 0 30px;
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    line-height: 38px;
    letter-spacing: .1rem;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid #bbb;
    cursor: pointer;
    margin-bottom: 0.5rem;
    box-sizing: border-box;
    color: #FFF;
    background-color: #33C3F0;
    border-color: #33C3F0;
    ${(props) => props.red && 'border-color: var(--red); background-color: var(--red);'}
    ${(props) => props.green && 'border-color: var(--green); background-color: var(--green);'}
    
`
