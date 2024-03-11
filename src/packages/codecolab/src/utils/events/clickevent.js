import { userOpenFile } from '../../utils/openfile.js';//This interacts with the MULE/OS.js file system to open a file
import { File } from '../../data/file.js';
import { getApp } from '../../hooks/useSetApp.js'
import GetUserName from '../../utils/username/getusername.js';//Gets username of the loggged in mule user
import { StartFileShare } from '../../utils/socket/socketoutgoing.js'//uploads the relavent files to the server 
import { getSession, setSession } from '../../utils/getsession.js'//creates the session variables object and gets it to update its values by calling getSession

export default async function clickevent() {
  //We need to await a Promis to get the file data
  try {
    const promise = await userOpenFile();
    const file = promise.file;
    const data = promise.result;

    const textDecoder = new TextDecoder('utf-8');//Decoing the file data from the file system to the correct format 
    const text = textDecoder.decode(data);
    const newfile = new File(file, text)//Creating a new file object which store file location the data itself and later when passed to the server the langauge of the file

    const app = getApp()
    const username = GetUserName()// Just 
    const socket = app.socket

    setSession(newfile, socket, username)//creating the session object
    const session = getSession()
    session.code = text//this is the decoded file content
    StartFileShare(socket, newfile, username)//staring the session
  } catch (error) {
    console.log(error);
  }
}