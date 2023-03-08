const fs = require('fs')
const path = require('path')


//--------------create general directory-------------//

fs.mkdir('test', (err) => {
    if (err) throw new Error(err.message)
})


//--------------create directory-------------//

fs.mkdir(path.join('test', 'dir1'), (err) => {
    if (err) throw new Error(err.message)
})

fs.mkdir(path.join('test', 'dir2'), (err) => {
    if (err) throw new Error(err.message)
})

fs.mkdir(path.join('test', 'dir3'), (err) => {
    if (err) throw new Error(err.message)
})

fs.mkdir(path.join('test', 'dir4'), (err) => {
    if (err) throw new Error(err.message)
})

fs.mkdir(path.join('test', 'dir5'), (err) => {
    if (err) throw new Error(err.message)
})


//--------------create files-------------//

fs.writeFile(path.join('test', 'file1'), '0_0', (err) => {
    if (err) throw new Error(err.message)
})

fs.writeFile(path.join('test', 'file2'), '0_0', (err) => {
    if (err) throw new Error(err.message)
})

fs.writeFile(path.join('test', 'file3'), '0_0', (err) => {
    if (err) throw new Error(err.message)
})

fs.writeFile(path.join('test', 'file4'), '0_0', (err) => {
    if (err) throw new Error(err.message)
})

fs.writeFile(path.join('test', 'file5'), '0_0', (err) => {
    if (err) throw new Error(err.message)
})


fs.readdir(path.join('test'), {withFileTypes: true}, (err, data) => {
    if (err) throw new Error()

    for (const item of data) {
        console.log(item.isFile() ? `FILE: ${item.name}` : `DIRECTORY: ${item.name}`)
    }
})



