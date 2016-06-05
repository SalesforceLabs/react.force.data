import cacheCompact from './cacheCompact';

let cache = {};

module.exports = (opts) => {
  return new Promise(
    (resolve, reject) => {
      const compactLayout = opts.compactLayout;

      if(compactLayout && compactLayout.objectType){
        const type = compactLayout.objectType;
        console.log('compactLayout: ',compactLayout);

        cacheCompact.set(type,compactLayout);
        resolve(opts);

      }
      else{
        console.log('Wrong compact layout');
        reject('Wrong compact layout');
      }
    }
  );
};