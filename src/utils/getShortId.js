module.exports = (sobj)=>{
  if(sobj && sobj.attributes && sobj.attributes.url){
    const lastSlashIndex = sobj.attributes.url.lastIndexOf('/');
    const id = sobj.attributes.url.substring(lastSlashIndex+1);
    return id.substring(0,15);
  }
};