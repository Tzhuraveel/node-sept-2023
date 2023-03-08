fs = require('node:fs')
path = require('node:path')
express = require('express')

const app = express()
const PORT = 5100

app.use(express.json())
app.use(express.urlencoded({extended: true}))


// fs.mkdir(path.join('users'), err => {
//     if (err) throw new Error(err.message)
// })

const pathToDir = 'users'
const pathToUsers = path.join(pathToDir, 'users.json')


// fs.writeFile(path.join(pathToDir, 'users.json'), '', err => {
//     if (err) throw new Error(err.message)
// })


app.listen(PORT, () => {
    console.log('server started')
})


//-----------------getAllUser--------------//


app.get('/', (req, res) => {

    fs.readFile(pathToUsers, {encoding: 'utf-8'}, (err, data) => {
        res.send(JSON.parse(data))
    })
})


//-----------------getById--------------//

app.get('/:userId', (req, res) => {
    const {userId} = req.params;


    fs.readFile(pathToUsers, {encoding: 'utf-8'}, (err, data) => {
        if (err) throw new Error(err.message)

        const users = JSON.parse(data)

        if (+userId <= users.length && +userId > 0) {
            res.send(JSON.parse(data)[+userId - 1])
        } else {
            res.status(400).send('Error')
        }
    })
})


//-----------------CreateUser--------------//


app.post('/', (req, res) => {
    const requestUser = req.body;

    fs.readFile(pathToUsers, {encoding: 'utf-8'}, (err, data) => {
        if (err) throw new Error(err.message)

        const users = JSON.parse(data)

        if (requestUser.name.length > 2 && +requestUser.age > 0) {
            users.push(requestUser);

            fs.writeFile(pathToUsers, JSON.stringify(users), err => {
                if (err) throw new Error(err.message)
            })

            res
                .status(200)
                .json({message: 'User created'})
        } else {
            res.status(400).send('Error')
        }
    })
})



//-----------------UpdateUser--------------//


app.put('/:userId', (req, res) => {
    const requestUser = req.body;
    let {userId} = req.params;

    fs.readFile(pathToUsers, {encoding: 'utf-8'}, (err, data) => {
        if (err) throw new Error(err.message)

        const users = JSON.parse(data)

        if(users.filter((_, index) => index === +userId) && requestUser.name.length > 2 && +requestUser.age > 0){
            users[+userId - 1] = requestUser

            fs.writeFile(pathToUsers, JSON.stringify(users), err => {
                if (err) throw new Error(err.message)
            })

            res
                .status(200)
                .json({message: 'User was updated', user: requestUser})
        }else{
            res.status(400).send('Error')
        }

    })
})


//-----------------DeleteUser--------------//


app.delete('/:userId', (req, res) => {

    let {userId} = req.params;


    fs.readFile(pathToUsers, {encoding: 'utf-8'}, (err, data) => {
        const users = JSON.parse(data)

        if (err) throw new Error(err.message)


        if(users.filter((_, index) => index === +userId).length !== 0){

            users.splice(+userId - 1, 1)

            fs.writeFile(pathToUsers, JSON.stringify(users), err => {
                if (err) throw new Error(err.message)
            })

            res
                .status(200)
                .json({message: 'User was deleted'})

        }else{
            res.status(400).send('Error')
        }

    })

})