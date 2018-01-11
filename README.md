win-explorer-custom-folder
=====================

A small JavaScript library that create a custom folder on windows explorer

```javascript
explorerCustomFolder.createFolder('System', 'C:\\Windows', 'C:\\Windows\\explorer.exe')
    .then(uuid => {
        console.log(uuid)
    })
    .catch(err => {
        console.log(err)
    })
```

## Parameters

```javascript
createFolder(name, path, iconExePath, uuid)
```

#### `name`
- The name you are create, will be shown when you hover the mouse over the custom folder in File Explorer

#### `path`
- the full folder path

#### `iconExePath (Optional)`
- the folder icon from the iconExePath，if not set, use the default icon

#### `uuid (Optional)`
- the unique uuid of the folder, if not set, it will create a new uuid，if you need modify the folder, you need set the uuid last new