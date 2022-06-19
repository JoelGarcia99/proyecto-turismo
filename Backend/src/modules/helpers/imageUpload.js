///This class will define logic for media upload. For now
// only video & images are supported, but you can add more

const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

// support in future versions adding them to [valid_extensions]

// Defining valid extensions for files
const image_extensions = [
  'jpg', 'jpeg', 'png',
]
const valid_extensions = [
  ...image_extensions,
  'mp4',
];

/// Uploads a media to the server in the folder [folder]
/// and then returns the image id (if you want to use it as
/// fk) and the image url. The output is going to be a JSON
/// so if there is any error a key with the name 'error' will
/// be included with the error message.
const uploadMedia = (mediaFile, folder, callback)=>{
  const splitted_name = mediaFile.name.split('.');
  const extension = splitted_name[splitted_name.length - 1];

  if(!valid_extensions.includes(extension)) {
     callback({
      error: `Extension ${extension} is not currently supported`
    });
  }

  const is_image = image_extensions.includes(extension);

  // id of the image
  const __id = uuidv4();

  let upload_path = path.join(__dirname, '../../../media/', (is_image?"image":"video")+"/"+folder+"/");

  // Creating the path if it does not exist
  if(!fs.existsSync(path)){
    fs.mkdirSync(upload_path, { recursive: true });
  }

  // updating the path
  upload_path += __id+"."+extension;

  const image_url = `${process.env.API_HOST}:${process.env.API_PORT}/media/${is_image?"image":"video"}/${folder}::${__id}`;

  mediaFile.mv(upload_path, (err)=>{
    if(err) {
      callback({
	error: err
      });
    }

    callback({
      url: image_url,
      __id,
    });

  });
}


module.exports = {
  uploadMedia,
}
