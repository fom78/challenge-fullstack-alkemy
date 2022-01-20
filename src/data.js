const operations = [
    {
        id:1,
        concept:"Sueldo",
        amount: 2500,
        date: "10/02/2021",
        type: "income"
    },    
    {
        id:2,
        concept:"Camisa",
        amount: 63.22,
        date: "10/31/2021",
        type: "expenditure"
    },
    {
        id:3,
        concept:"fix bus web alkemy",
        amount: 230,
        date: "10/26/2021",
        type: "income"
    },
    {
        id:4,
        concept:"Pantalones",
        amount: 123.65,
        date: "10/31/2021",
        type: "expenditure"
    },
    {
        id:5,
        concept:"Laptop i7",
        amount: 1700.00,
        date: "11/23/2021",
        type: "expenditure"
    },
    {
        id:6,
        concept:"fix bug in  web off Tomas",
        amount: 280,
        date: "11/22/2021",
        type: "income"
    },
    {
        id:7,
        concept:"Jeans a la moda",
        amount: 523.99,
        date: "11/23/2021",
        type: "expenditure"
    },
    {
        id:8,
        concept:"teclado con luces",
        amount: 300.00,
        date: "11/30/2021",
        type: "expenditure"
    },
    {
        id:9,
        concept:"Sueldo mensual",
        amount: 23600,
        date: "12/02/2021",
        type: "income"
    },
    {
        id:10,
        concept:"Monitor de mayor resolucion",
        amount: 823.65,
        date: "12/07/2021",
        type: "expenditure"
    },
    {
        id:11,
        concept:"tarifa de celular",
        amount: 304.00,
        date: "12/08/2021",
        type: "expenditure"
    }
]

export const addOperations = (operation) => {
    operations.push({...operation, id: operations.length+1})
    console.log(operations);
    return operations
}

export const getOperations = ({quantity=10}) => {
    if (quantity === 'all') return operations
    return operations.slice(0,quantity)
}

export const getBalance = () => {
    return operations.reduce((previousValue, currentValue)=> {
       if(currentValue.type === 'expenditure') return previousValue - currentValue.amount
       return previousValue + currentValue.amount
    },0)
}