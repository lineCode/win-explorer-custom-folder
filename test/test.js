const explorerCustomFolder = require('../lib/explorerCustomFolder.js')

explorerCustomFolder.createFolder('System', 'C:\\Windows', 'C:\\Windows\\explorer.exe', '80f022a0-f605-11e7-adcc-c1307da35532')
    .then(uuid => {
        console.log(uuid)
    })
    .catch(err => {
        console.log(err)
    })
    
    
// explorerCustomFolder.deleteFolder('80f022a0-f605-11e7-adcc-c1307da35532')
    // .then(uuid => {
        // console.log('delete ok')
    // })
    // .catch(err => {
        // console.log(err)
    // })