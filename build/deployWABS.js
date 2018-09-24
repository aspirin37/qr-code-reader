const targetEnvironment = process.argv[2] || "dev";
require('dotenv').config({path: `${targetEnvironment}.env`});
const containerName = process.env.AZURE_STORAGE_CONTAINER || "$web";
const folderName = process.env.AZURE_STORAGE_FOLDER || ".";
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

const storage = require('azure-storage');
const path = require('path');
const fs = require('fs');

const blobService = storage.createBlobService(connectionString);
const sourceFilesDir = path.resolve(__dirname, '../dist');

const upload = filePath => {
  const blobName = path.join(folderName, path.relative(sourceFilesDir, filePath))

  return new Promise((resolve, reject) => {
    blobService.createBlockBlobFromLocalFile(containerName, blobName, filePath, err => {
      if (err) {
        reject(err)
      } else {
        resolve({ message: `Upload of '${blobName}' complete` });
      }
    })
  })
}

const uploadAndList = () => {
  const sourceFiles = walkSync(sourceFilesDir)
  const promises = sourceFiles.map(item => upload(item).then((result) => console.log(result.message)) )
  return Promise.all(promises).catch((error) => {console.error(error); process.exit(1);});
}

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file))
  })
  return filelist
}


const executeCommand = async () => {
  const response = await uploadAndList()

  if (response.data) {
    response.data.entries.forEach(entry => {
      console.log('Name:', entry.name, ' Type:', entry.blobType)
    })
  }
}

console.log(`Executing uploadAndList...`)
executeCommand()
