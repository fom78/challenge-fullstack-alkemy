import { useState } from 'react';
// Components
import Error from './Error';
// Styles
import styled from 'styled-components';

import { addOperations } from 'data';

const Form = ({setRefreshList}) => {
    // Create state as an object
    const [operation, setOperation] = useState({
        concept: '',
        amount: '',
        date: '',
        type: ''
    })

    // Verify error
    const [error, setError] = useState(false);

    // Form Read
    const handleChange = e => {
        setOperation({
            ...operation,
            [e.target.name]: e.target.value
        })
    }

    // Send req to API
    const createOperation = e => {
        e.preventDefault();
        console.log('crear operacion');
        if (operation.concept === '' || operation.amount === '' || operation.date === '' || operation.type === '') {
            setError(true);
            return;
        } else {
            setError(false);
            addOperations(operation)
            
            // setRefreshList(true);

            // Redirect

        }
    }

    return (
        <Container>
            <div>
                <h4>Enter new operation</h4>
                <form onSubmit={createOperation}>
                    <Row>
                        <div>
                            <label htmlFor="concept-form">Concept</label>
                            <input type="text" placeholder="Shopping" id="concept-form"
                                onChange={handleChange}
                                name="concept"
                            />
                        </div>
                    </Row>
                    <Row>
                        <div>
                            <label htmlFor="date-form">Date</label>
                            <input type="date" id="date-form"
                                onChange={handleChange}
                                name="date"
                            />
                        </div>

                    </Row>
                    <Row>
                        <div>
                            <label htmlFor="type-form">Type</label>
                            <select id="type-form" onChange={handleChange} name="type">
                                <option value="">- Select an option -</option>
                                <option value="income">Income</option>
                                <option value="expenditure">Expenditure</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="amount-form">Amount</label>
                            <input type="number" placeholder="500" id="amount-form"
                                onChange={handleChange}
                                name="amount"
                            />
                        </div>
                    </Row>
                    <Button type="submit" value="Add" />
                </form>
                {error ? <Error message="All fields are required" /> : null}
            </div>
        </Container>
    )
}

export default Form;

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
    box-sizing: border-box;
    color: #FFF;
    background-color: #33C3F0;
    border-color: #33C3F0;
`