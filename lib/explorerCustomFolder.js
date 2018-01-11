const Registry = require('winreg')
const uuidv1 = require('uuid/v1')
const fs = require('fs')

function fsExistsSync (path) {
    try {
        fs.accessSync(path, fs.F_OK)
    } catch (e) {
        return false
    }
    return true
}

function createFolder (name, path, iconExePath, uuid) {
    return new Promise((resolve, reject) => {
        uuid = uuid || uuidv1()
        
        if (!path) {
            reject(new Error('path is not invalid'))
        } else {
            path = path.replace('/', '\\')
            if ( !fsExistsSync(path)) {
                reject(new Error('path is not access'))
            }
        }
        
        if (!iconExePath) {
            iconExePath = '%SystemRoot%\\system32\\shell32.dll,35'
        } else {
            iconExePath = iconExePath.replace('/', '\\')
            if ( !fsExistsSync(iconExePath)) {
                reject(new Error('iconExePath is not access'))
            }
        }

        let regKey = new Registry({
            hive: Registry.HKCR,
            key:  `\\CLSID\\{${uuid}}`
        })
        
        regKey.create()
          .then(() => {
              return regKey.set('', Registry.REG_SZ, name)
          })
          .then(() => {
              return regKey.set('DescriptionID', Registry.REG_DWORD, 0x00000003)
          })
          .then(() => {
              return regKey.set('Infotip', Registry.REG_SZ, name)
          })
          .then(() => {
              return regKey.set('System.IsPinnedToNameSpaceTree', Registry.REG_DWORD, 0x00000001)
          })
          .then(() => {
                regKey = new Registry({
                    hive: Registry.HKCR,
                    key:  `\\CLSID\\{${uuid}}\\DefaultIcon`
                })
                return regKey.create()
          })
          .then(() => {
              return regKey.set('', Registry.REG_SZ, iconExePath)
          })
          .then(() => {
                regKey = new Registry({
                    hive: Registry.HKCR,
                    key:  `\\CLSID\\{${uuid}}\\InProcServer32`
                })
                return regKey.create()
          })
          .then(() => {
                return regKey.set('ThreadingModel', Registry.REG_SZ, 'Both')
          })
          .then(() => {
                regKey = new Registry({
                    hive: Registry.HKCR,
                    key:  `\\CLSID\\{${uuid}}\\Instance`
                })
                return regKey.create()
          })
          .then(() => {
                return regKey.set('CLSID', Registry.REG_SZ, '{0E5AAE11-A475-4c5b-AB00-C66DE400274E}')
          })
          .then(() => {
                regKey = new Registry({
                    hive: Registry.HKCR,
                    key:  `\\CLSID\\{${uuid}}\\Instance\\InitPropertyBag`
                })
                return regKey.create()
          })
          .then(() => {
              return regKey.set('Attributes', Registry.REG_DWORD, 0x00000011)
          })
          .then(() => {
                return regKey.set('TargetFolderPath', Registry.REG_SZ, path)
          })
          .then(() => {
                regKey = new Registry({
                    hive: Registry.HKCR,
                    key:  `\\CLSID\\{${uuid}}\\ShellFolder`
                })
                return regKey.create()
          })
          .then(() => {
              return regKey.set('Attributes', Registry.REG_DWORD, 0xf080004d)
          })
          .then(() => {
              return regKey.set('FolderValueFlags', Registry.REG_DWORD, 0x00000029)
          })
          .then(() => {
              return regKey.set('SortOrderIndex', Registry.REG_DWORD, 0x00000000)
          })
          .then(() => {
                regKey = new Registry({
                    hive: Registry.HKLM,
                    key:  `\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\MyComputer\\NameSpace\\{${uuid}}`
                })
                return regKey.create()
          })
          .then(() => {
              resolve(uuid)
          })
          .catch(err => {
              reject(err)
          })
    })
}

exports.createFolder = createFolder
