import cache from './cache';
import cacheCompact from './cacheCompact';
import cacheDefault from './cacheDefault';

module.exports = ()=>{
    cache.clear();
    cacheCompact.clear();
    cacheDefault.clear();
};