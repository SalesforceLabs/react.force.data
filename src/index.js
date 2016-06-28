/*
 * Copyright (c) 2016, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the
 * following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
import getDefaultLayout from './getDefaultLayout';
import getCompactLayout from './getCompactLayout';
import getCompactLayoutFieldNames from './getCompactLayoutFieldNames';
import query from './query';
import getByTypeAndId from './getByTypeAndId';

import utils from './utils';
import refs from './refs';
import queue from './queue';
import storage from './storage';
import storageCompact from './storageCompact';
import storageDefaultLayout from './storageDefaultLayout';

import requestWithTypeAndId from './requestWithTypeAndId';

import clearCache from './clearCache';

import chatterQuery from './chatterQuery';
import getByChatterUserId from './getByChatterUserId';

import getBtLogoByCompanyName from './getBtLogoByCompanyName';
import btLogoQuery from './btLogoQuery';

module.exports = {
  getByTypeAndId:getByTypeAndId,
  getDefaultLayout:getDefaultLayout,
  getCompactLayout:getCompactLayout,
  getCompactLayoutFieldNames:getCompactLayoutFieldNames,
  query:query,
  utils:utils,
  requestWithTypeAndId:requestWithTypeAndId,
  clearCache:clearCache,
  chatterQuery: chatterQuery,
  getByChatterUserId: getByChatterUserId,
  getBtLogoByCompanyName: getBtLogoByCompanyName,
  btLogoQuery: btLogoQuery
};
