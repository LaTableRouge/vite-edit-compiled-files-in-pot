const fs = require('fs').promises

const viteEditCompiledFilesInPOT = (manifestPath, potFilePath, assetsPath) => {
  return {
    name: 'vite-edit-compiled-files-in-pot',
    apply: 'build',
    enforce: 'pre',

    closeBundle: async () => {
      let data = await fs.readFile(manifestPath, 'utf8')
      if (data) {
        data = JSON.parse(data)

        const keys = Object.keys(data)
        if (keys.length) {

          const jsFilesKeys = keys.filter((file) => /.js/.test(file))
          if (jsFilesKeys.length) {

            let potFileData = await fs.readFile(potFilePath, 'utf8')
            if (potFileData) {
              jsFilesKeys.forEach(async key => {
                if (data[key]) {
                  const fileName = data[key].name
                  const file = '/' + data[key].file

                  const from = new RegExp('/' + assetsPath + '/' + fileName + '-[\\w\\d]+.js', 'gm')
                  if (from.test(potFileData)) {
                    potFileData = potFileData.replace(from, file)
                    console.log(`Replaced "${from}" to "${file}" in file "${potFilePath}"`)
                  } else {
                    console.warn(`No string found for the regex "${from}" in file "${potFilePath}"`)
                  }
                }
              })
              await fs.writeFile(potFilePath, potFileData, 'utf8')
            }
          } else {
            console.warn('no javascript files found')
          }
        } else {
          console.warn('no compiled files found in manifest file')
        }
      }
    }
  }
}

module.exports = { viteEditCompiledFilesInPOT }