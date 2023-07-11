(function(){
    var script = {
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }; this.playAudioList([this.audio_56398DD2_4522_2938_41C6_7C8F42E08C4A])",
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.7,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "class": "Player",
 "mouseWheelEnabled": true,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MainViewer",
  "this.Container_22BB12F4_3075_D173_4184_EC3BC4955417",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_4041C033_7558_FB6E_41CE_BFE427F3AF92",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_C8831989_EEE0_A095_41DB_1CBE787C0DF9",
  "this.Container_C1683B43_EE61_A195_41DE_7017FDAE4F77",
  "this.Container_C0489276_F1E3_E07C_41E9_87D51CEBEE88"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "backgroundPreloadEnabled": true,
 "paddingLeft": 0,
 "minHeight": 20,
 "horizontalAlign": "left",
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "scripts": {
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "unregisterKey": function(key){  delete window[key]; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "existsKey": function(key){  return key in window; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "registerKey": function(key, value){  window[key] = value; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "minWidth": 20,
 "contentOpaque": false,
 "verticalAlign": "top",
 "defaultVRPointer": "laser",
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "downloadEnabled": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Player468"
 },
 "overflow": "visible",
 "definitions": [{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_camera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -64.02,
   "backwardYaw": 79.77,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871",
   "distance": 1
  },
  {
   "yaw": -51.67,
   "backwardYaw": -60.95,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "GS__0702",
 "id": "panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47",
 "thumbnailUrl": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_tcap0",
  "this.overlay_27DA8013_3866_3DF4_41C0_9FF76D75D909",
  "this.overlay_18F8E025_386D_DDDC_41C2_1A5F567A5260"
 ]
},
{
 "duration": 3000,
 "class": "Photo",
 "label": "WhatsApp Image 2023-07-10 at 16.30.55 (3)",
 "id": "album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_9",
 "thumbnailUrl": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_9_t.jpg",
 "width": 1024,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_9.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 768
},
{
 "duration": 5500,
 "class": "Photo",
 "label": "iZSH0c7_2146398e9aad0c7f",
 "id": "photo_C16EB069_F2E3_BF95_41DE_B27FAC021A0C",
 "thumbnailUrl": "media/photo_C16EB069_F2E3_BF95_41DE_B27FAC021A0C_t.jpg",
 "width": 1024,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C16EB069_F2E3_BF95_41DE_B27FAC021A0C.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 768
},
{
 "items": [
  {
   "media": "this.panorama_24DE2653_3826_2274_41C6_59AFE698547E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24DE2653_3826_2274_41C6_59AFE698547E_camera"
  },
  {
   "media": "this.panorama_1AE093B1_3826_2234_418B_63ED694649C9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1AE093B1_3826_2234_418B_63ED694649C9_camera"
  },
  {
   "media": "this.panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_camera"
  },
  {
   "media": "this.panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_camera"
  },
  {
   "media": "this.panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_camera"
  },
  {
   "media": "this.panorama_24DF8774_3826_623C_41B9_1E03B9873AA4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_camera"
  },
  {
   "media": "this.panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_camera"
  },
  {
   "media": "this.panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_camera"
  },
  {
   "media": "this.panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_camera"
  },
  {
   "media": "this.panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5",
   "camera": "this.panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "duration": 3000,
 "class": "Photo",
 "label": "WhatsApp Image 2023-07-10 at 16.30.56 (4)",
 "id": "album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_0",
 "thumbnailUrl": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_0_t.jpg",
 "width": 1024,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_0.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 768
},
{
 "duration": 5500,
 "class": "Photo",
 "label": "iZSH0c7_2146398e9c709770",
 "id": "photo_C24190C9_F2E3_A094_41D8_E126DF2F2E4D",
 "thumbnailUrl": "media/photo_C24190C9_F2E3_A094_41D8_E126DF2F2E4D_t.jpg",
 "width": 1024,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C24190C9_F2E3_A094_41D8_E126DF2F2E4D.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 768
},
{
 "duration": 3000,
 "class": "Photo",
 "label": "WhatsApp Image 2023-07-10 at 16.30.56 (2)",
 "id": "album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_2",
 "thumbnailUrl": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_2_t.jpg",
 "width": 1024,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_2.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 768
},
{
 "displayOriginPosition": {
  "hfov": 165,
  "yaw": 0,
  "stereographicFactor": 1,
  "class": "RotationalCameraDisplayPosition",
  "pitch": -90
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_24DE2653_3826_2274_41C6_59AFE698547E_camera",
 "displayMovements": [
  {
   "duration": 1000,
   "easing": "linear",
   "class": "TargetRotationalCameraDisplayMovement"
  },
  {
   "targetPitch": 0,
   "duration": 3000,
   "easing": "cubic_in_out",
   "targetStereographicFactor": 0,
   "class": "TargetRotationalCameraDisplayMovement"
  }
 ]
},
{
 "label": "\u00c1lbum de Fotos WhatsApp Image 2023-07-10 at 16.30.56 (4)",
 "id": "album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4",
 "thumbnailUrl": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_t.png",
 "playList": "this.album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_AlbumPlayList",
 "class": "PhotoAlbum"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 128.33,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_5208F41D_4526_1F28_41CC_7044510A1921"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 100.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_53A003C4_4526_1918_4197_8FCF75284B10"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -19.71,
   "backwardYaw": -76.09,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2",
   "distance": 1
  },
  {
   "yaw": -79.42,
   "backwardYaw": -130.65,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_24DE2653_3826_2274_41C6_59AFE698547E",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "GS__0698",
 "id": "panorama_1AE093B1_3826_2234_418B_63ED694649C9",
 "thumbnailUrl": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.panorama_1AE093B1_3826_2234_418B_63ED694649C9_tcap0",
  "this.overlay_2604CED2_381A_2275_41B7_0495FA4FA22D",
  "this.overlay_26A39DC8_381A_E654_41C6_C49AFB3DDE91"
 ]
},
{
 "duration": 3000,
 "class": "Photo",
 "label": "WhatsApp Image 2023-07-10 at 16.30.55 (7)",
 "id": "album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_5",
 "thumbnailUrl": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_5_t.jpg",
 "width": 1024,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_5.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 768
},
{
 "adjacentPanoramas": [
  {
   "yaw": 147.13,
   "backwardYaw": -99.27,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "GS__0707",
 "id": "panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC",
 "thumbnailUrl": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_tcap0",
  "this.overlay_18B81B81_386A_22D4_4195_96EEB6ED2F7E"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 94.81,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_53686379_4526_19E8_41BE_4412636AA0DF"
},
{
 "duration": 3000,
 "class": "Photo",
 "label": "WhatsApp Image 2023-07-10 at 16.30.55 (5)",
 "id": "album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_7",
 "thumbnailUrl": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_7_t.jpg",
 "width": 1024,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_7.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 768
},
{
 "duration": 3000,
 "class": "Photo",
 "label": "WhatsApp Image 2023-07-10 at 16.30.55 (2)",
 "id": "album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_10",
 "thumbnailUrl": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_10_t.jpg",
 "width": 1024,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_10.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 768
},
{
 "duration": 5500,
 "class": "Photo",
 "label": "iZSH0c7_2146398e9b453084",
 "id": "photo_C27CC4B6_F2E3_A0FF_41E8_C554ABFB98F5",
 "thumbnailUrl": "media/photo_C27CC4B6_F2E3_A0FF_41E8_C554ABFB98F5_t.jpg",
 "width": 1024,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C27CC4B6_F2E3_A0FF_41E8_C554ABFB98F5.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 768
},
{
 "items": [
  {
   "media": "this.panorama_24DE2653_3826_2274_41C6_59AFE698547E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24DE2653_3826_2274_41C6_59AFE698547E_camera"
  },
  {
   "media": "this.panorama_1AE093B1_3826_2234_418B_63ED694649C9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1AE093B1_3826_2234_418B_63ED694649C9_camera"
  },
  {
   "media": "this.panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_camera"
  },
  {
   "media": "this.panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_camera"
  },
  {
   "media": "this.panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_camera"
  },
  {
   "media": "this.panorama_24DF8774_3826_623C_41B9_1E03B9873AA4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_camera"
  },
  {
   "media": "this.panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_camera"
  },
  {
   "media": "this.panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_camera"
  },
  {
   "media": "this.panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_camera"
  },
  {
   "media": "this.panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_camera"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -76.48,
   "backwardYaw": 119.16,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871",
   "distance": 1
  },
  {
   "yaw": -130.65,
   "backwardYaw": -79.42,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1AE093B1_3826_2234_418B_63ED694649C9",
   "distance": 1
  },
  {
   "yaw": 49.35,
   "backwardYaw": 51.51,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "GS__0700",
 "id": "panorama_24DE2653_3826_2274_41C6_59AFE698547E",
 "thumbnailUrl": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.panorama_24DE2653_3826_2274_41C6_59AFE698547E_tcap0",
  "this.overlay_25E6557E_381A_E62D_41BD_99106E54ACF7",
  "this.overlay_2608E83C_381A_EE2C_41CA_804DBEC109B3",
  "this.overlay_264621DA_381D_DE74_41B4_98CA9D1807D4"
 ]
},
{
 "duration": 3000,
 "class": "Photo",
 "label": "WhatsApp Image 2023-07-10 at 16.30.55 (6)",
 "id": "album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_6",
 "thumbnailUrl": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_6_t.jpg",
 "width": 1024,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_6.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 768
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -32.87,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_53EEB402_4526_1F18_41CD_822F0B8BCD43"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -100.23,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_53562345_4526_1918_41C8_19C1ADDF76D6"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -76.09,
   "backwardYaw": -19.71,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1AE093B1_3826_2234_418B_63ED694649C9",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "GS__0708",
 "id": "panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2",
 "thumbnailUrl": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_tcap0",
  "this.overlay_195FA901_386B_EFD4_41C4_FD3E0C3EED7E"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 99.47,
   "backwardYaw": -85.19,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "GS__0706",
 "id": "panorama_24DF8774_3826_623C_41B9_1E03B9873AA4",
 "thumbnailUrl": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_tcap0",
  "this.overlay_19594FD3_386A_227B_41B9_378B372AA724"
 ]
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_56398DD2_4522_2938_41C6_7C8F42E08C4A.mp3",
  "oggUrl": "media/audio_56398DD2_4522_2938_41C6_7C8F42E08C4A.ogg",
  "class": "AudioResource"
 },
 "class": "MediaAudio",
 "id": "audio_56398DD2_4522_2938_41C6_7C8F42E08C4A",
 "data": {
  "label": "794655_781107_Daniel_Anthony_Fraser_Acheson_-_Winter_Summer_-_AO-000944-1_-_Master_-_031022_-_111_Bpm_-_BOV_-_ORG_-_2444 (online-audio-converter.com)"
 }
},
{
 "duration": 3000,
 "class": "Photo",
 "label": "WhatsApp Image 2023-07-10 at 16.30.56 (1)",
 "id": "album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_3",
 "thumbnailUrl": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_3_t.jpg",
 "width": 1024,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_3.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 768
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -111.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_53FEE410_4526_1F38_416B_77A625A6FE74"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -128.49,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_53B3D3D0_4526_1938_41CC_BAF90AD3D143"
},
{
 "duration": 3000,
 "class": "Photo",
 "label": "WhatsApp Image 2023-07-10 at 16.30.55 (4)",
 "id": "album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_8",
 "thumbnailUrl": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_8_t.jpg",
 "width": 1024,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_8.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 768
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 115.98,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_53CD73E9_4526_18E8_41BD_B8312EFC4ACB"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 119.16,
   "backwardYaw": -76.48,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_24DE2653_3826_2274_41C6_59AFE698547E",
   "distance": 1
  },
  {
   "yaw": 79.77,
   "backwardYaw": -64.02,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47",
   "distance": 1
  },
  {
   "yaw": -85.19,
   "backwardYaw": 99.47,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_24DF8774_3826_623C_41B9_1E03B9873AA4",
   "distance": 1
  },
  {
   "yaw": -99.27,
   "backwardYaw": 147.13,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC",
   "distance": 1
  },
  {
   "yaw": -63.58,
   "backwardYaw": 68.94,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "GS__0704",
 "id": "panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871",
 "thumbnailUrl": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_tcap0",
  "this.overlay_26F27133_381A_5E3B_41AF_D8F71972F4F6",
  "this.overlay_2722C2E0_381A_6255_41C8_6AD967BCB03B",
  "this.overlay_27B02ABE_381A_622D_41CB_E3A1F9E5E6E4",
  "this.overlay_180BB650_381A_E275_4186_D269B2430A35",
  "this.overlay_188A5712_386E_23F5_419D_000D8A71923C"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 103.52,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_53BDE3DD_4526_1928_41B7_F37AB3A5163D"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_camera"
},
{
 "duration": 3000,
 "class": "Photo",
 "label": "WhatsApp Image 2023-07-10 at 16.30.56 (3)",
 "id": "album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_1",
 "thumbnailUrl": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_1_t.jpg",
 "width": 1024,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_1.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 768
},
{
 "duration": 5500,
 "class": "Photo",
 "label": "iZSH0c7_2146398e9cc37e14",
 "id": "photo_C16EBAAD_F2E3_A0EF_41D2_C29DD593E914",
 "thumbnailUrl": "media/photo_C16EBAAD_F2E3_A0EF_41D2_C29DD593E914_t.jpg",
 "width": 1024,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C16EBAAD_F2E3_A0EF_41D2_C29DD593E914.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 768
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_camera"
},
{
 "duration": 3000,
 "class": "Photo",
 "label": "WhatsApp Image 2023-07-10 at 16.30.55 (1)",
 "id": "album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_11",
 "thumbnailUrl": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_11_t.jpg",
 "width": 1024,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_11.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 768
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_camera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -60.95,
   "backwardYaw": -51.67,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "LAVABO",
 "id": "panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5",
 "thumbnailUrl": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_tcap0",
  "this.overlay_186AFD00_386A_67D4_41C7_865CB5FEE499"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 51.51,
   "backwardYaw": 49.35,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_24DE2653_3826_2274_41C6_59AFE698547E",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "GS__0710",
 "id": "panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE",
 "thumbnailUrl": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_tcap0",
  "this.overlay_184EB2DB_386A_226B_41CA_EB7688A5A987"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 68.94,
   "backwardYaw": -63.58,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871",
   "distance": 1
  }
 ],
 "hfov": 360,
 "label": "GS__0705",
 "id": "panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E",
 "thumbnailUrl": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "partial": false,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "hfovMin": "150%",
 "overlays": [
  "this.panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_tcap0",
  "this.overlay_27CB3B6D_3866_E22E_4187_653D931E4286"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 160.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_522AD437_4526_1F78_4140_D07A9455AE87"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 49.35,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_538743A7_4526_1918_41CA_AB98D4458C98"
},
{
 "viewerArea": "this.ViewerAreaLabeled_C883D989_EEE0_A095_41D3_8106D308BE0F",
 "id": "ViewerAreaLabeled_C883D989_EEE0_A095_41D3_8106D308BE0FPhotoAlbumPlayer",
 "buttonPrevious": "this.IconButton_C883C989_EEE0_A095_41ED_A3E0870988B3",
 "class": "PhotoAlbumPlayer",
 "buttonNext": "this.IconButton_C883F989_EEE0_A095_41B7_D32BF72059C7"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 80.72,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_5218742B_4526_1F68_41C7_A4B281847159"
},
{
 "viewerArea": "this.MainViewer",
 "buttonCardboardView": "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "displayPlaybackBar": true,
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "mouseControlMode": "drag_acceleration"
},
{
 "items": [
  {
   "begin": "this.loopAlbum(this.playList_531442E7_4526_1B18_41C7_F177CEEA48E0, 0)",
   "media": "this.album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4",
   "player": "this.ViewerAreaLabeled_C883D989_EEE0_A095_41D3_8106D308BE0FPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "playList_531442E7_4526_1B18_41C7_F177CEEA48E0",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -80.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_53DF03F5_4526_18F8_419F_CA2F58577B4A"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -60.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_539613B7_4526_1978_4188_77FA53F7FB94"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 116.42,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_523A0442_4526_1F18_41C5_03D37A6AEB6C"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 103.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_5377238D_4526_1928_419B_5A8CFB34D027"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 119.05,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_535FF360_4526_1918_41C0_13D9A7D10F97"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_1AE093B1_3826_2234_418B_63ED694649C9_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -130.65,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "camera_5348C330_4526_1978_41CD_068EB72AF489"
},
{
 "duration": 3000,
 "class": "Photo",
 "label": "WhatsApp Image 2023-07-10 at 16.30.56",
 "id": "album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_4",
 "thumbnailUrl": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_4_t.jpg",
 "width": 1024,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_4.jpeg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 768
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_camera"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_camera"
},
{
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "class": "ViewerArea",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "12px",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "minWidth": 100,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "height": "100%",
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#FFFFFF",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "shadow": false,
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "top": 0,
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_22BB12F4_3075_D173_4184_EC3BC4955417",
 "left": 70,
 "scrollBarColor": "#000000",
 "class": "Container",
 "width": 550,
 "children": [
  "this.Container_22BBC2F4_3075_D173_41B4_71F7A3560C34",
  "this.Container_22BBD2F4_3075_D173_41B4_8504C593E6BF",
  "this.Label_22BB22F4_3075_D173_41BB_3ACDC6CCCC83",
  "this.Label_22BB32F4_3075_D173_4191_C8B45B85DEB8"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": 34,
 "scrollBarOpacity": 0.5,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 140,
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "--STICKER"
 },
 "overflow": "visible"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "scrollBarColor": "#000000",
 "class": "Container",
 "right": "0%",
 "width": 115.05,
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "borderSize": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 641,
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "-- SETTINGS"
 },
 "overflow": "scroll"
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_4041C033_7558_FB6E_41CE_BFE427F3AF92",
 "left": "0%",
 "scrollBarColor": "#000000",
 "class": "Container",
 "width": 330,
 "children": [
  "this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4",
  "this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minHeight": 1,
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "height": "100%",
 "horizontalAlign": "left",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "--- LEFT PANEL 4 (Community)"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "bottom": "0%",
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_C8831989_EEE0_A095_41DB_1CBE787C0DF9",
 "left": "0%",
 "scrollBarColor": "#000000",
 "class": "Container",
 "right": "0%",
 "scrollBarOpacity": 0,
 "children": [
  "this.Container_C883B989_EEE0_A095_41E2_71BE8A6C27D7"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "creationPolicy": "inAdvance",
 "paddingLeft": 0,
 "verticalAlign": "top",
 "top": "0%",
 "horizontalAlign": "left",
 "minHeight": 1,
 "contentOpaque": false,
 "minWidth": 1,
 "bottom": "0%",
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "--PHOTOALBUM"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_C1683B43_EE61_A195_41DE_7017FDAE4F77",
 "left": "0%",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "class": "Container",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_C1693B41_EE61_A194_41A2_55730F67B0C3",
  "this.Container_C1681B43_EE61_A195_41E8_37B3A72A462E"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "bottom": "0%",
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "click": "this.setComponentVisibility(this.Container_C1683B43_EE61_A195_41DE_7017FDAE4F77, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--CONTACT"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_C0489276_F1E3_E07C_41E9_87D51CEBEE88",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_C04BC275_F1E3_E07C_41EB_A456272DE305",
  "this.Container_C048B276_F1E3_E07C_41DE_0FCDCC5E989B"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "bottom": "0%",
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "click": "this.setComponentVisibility(this.Container_C0489276_F1E3_E07C_41E9_87D51CEBEE88, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--INFO photo"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "width": 58,
 "borderSize": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "visible": false,
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "width": 58,
 "borderSize": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "data": {
  "name": "IconButton MUTE"
 },
 "cursor": "hand"
},
{
 "rotate": false,
 "angle": 0,
 "class": "TripodCapPanoramaOverlay",
 "hfov": 36,
 "id": "panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_tcap0.png",
    "width": 3536,
    "class": "ImageResourceLevel",
    "height": 3536
   }
  ]
 },
 "inertia": true
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.48,
   "image": "this.AnimatedImageResource_1FF1D66E_3866_222C_41C9_C9A1661CA2F8",
   "pitch": 3.58,
   "yaw": -64.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871, this.camera_53562345_4526_1918_41C8_19C1ADDF76D6); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_27DA8013_3866_3DF4_41C0_9FF76D75D909",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.48,
   "yaw": -64.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.03,
   "image": "this.AnimatedImageResource_1FF1966E_3866_222C_417D_F33E258E1A98",
   "pitch": -11.33,
   "yaw": -51.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5, this.camera_535FF360_4526_1918_41C0_13D9A7D10F97); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_18F8E025_386D_DDDC_41C2_1A5F567A5260",
 "data": {
  "label": "Arrow 03 Right"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.03,
   "yaw": -51.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "items": [
  {
   "camera": {
    "duration": 3000,
    "easing": "linear",
    "class": "MovementPhotoCamera",
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1
    },
    "targetPosition": {
     "x": "0.56",
     "class": "PhotoCameraPosition",
     "y": "0.67",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_0",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 3000,
    "easing": "linear",
    "class": "MovementPhotoCamera",
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1
    },
    "targetPosition": {
     "x": "0.61",
     "class": "PhotoCameraPosition",
     "y": "0.70",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_1",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 3000,
    "easing": "linear",
    "class": "MovementPhotoCamera",
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1
    },
    "targetPosition": {
     "x": "0.26",
     "class": "PhotoCameraPosition",
     "y": "0.35",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_2",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 3000,
    "easing": "linear",
    "class": "MovementPhotoCamera",
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1
    },
    "targetPosition": {
     "x": "0.69",
     "class": "PhotoCameraPosition",
     "y": "0.29",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_10",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 3000,
    "easing": "linear",
    "class": "MovementPhotoCamera",
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1
    },
    "targetPosition": {
     "x": "0.36",
     "class": "PhotoCameraPosition",
     "y": "0.33",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_5",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 3000,
    "easing": "linear",
    "class": "MovementPhotoCamera",
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1
    },
    "targetPosition": {
     "x": "0.60",
     "class": "PhotoCameraPosition",
     "y": "0.39",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_6",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 3000,
    "easing": "linear",
    "class": "MovementPhotoCamera",
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1
    },
    "targetPosition": {
     "x": "0.74",
     "class": "PhotoCameraPosition",
     "y": "0.29",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_7",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 3000,
    "easing": "linear",
    "class": "MovementPhotoCamera",
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1
    },
    "targetPosition": {
     "x": "0.32",
     "class": "PhotoCameraPosition",
     "y": "0.33",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_8",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 3000,
    "easing": "linear",
    "class": "MovementPhotoCamera",
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1
    },
    "targetPosition": {
     "x": "0.32",
     "class": "PhotoCameraPosition",
     "y": "0.74",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_9",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 3000,
    "easing": "linear",
    "class": "MovementPhotoCamera",
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1
    },
    "targetPosition": {
     "x": "0.45",
     "class": "PhotoCameraPosition",
     "y": "0.54",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_4",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 3000,
    "easing": "linear",
    "class": "MovementPhotoCamera",
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1
    },
    "targetPosition": {
     "x": "0.45",
     "class": "PhotoCameraPosition",
     "y": "0.35",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_11",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "duration": 3000,
    "easing": "linear",
    "class": "MovementPhotoCamera",
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1
    },
    "targetPosition": {
     "x": "0.52",
     "class": "PhotoCameraPosition",
     "y": "0.61",
     "zoomFactor": 1.1
    },
    "scaleMode": "fit_outside"
   },
   "media": "this.album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_3",
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_4F6DF56D_44DE_39E8_41BB_B2B44A8239A4_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "rotate": false,
 "angle": 0,
 "class": "TripodCapPanoramaOverlay",
 "hfov": 36,
 "id": "panorama_1AE093B1_3826_2234_418B_63ED694649C9_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_tcap0.png",
    "width": 3536,
    "class": "ImageResourceLevel",
    "height": 3536
   }
  ]
 },
 "inertia": true
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.5,
   "image": "this.AnimatedImageResource_1FFE966E_3866_222C_41B9_276529C5922A",
   "pitch": -1.06,
   "yaw": -19.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2, this.camera_5377238D_4526_1928_419B_5A8CFB34D027); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2604CED2_381A_2275_41B7_0495FA4FA22D",
 "data": {
  "label": "Circle Arrow 01"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.5,
   "yaw": -19.71,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.49,
   "image": "this.AnimatedImageResource_1FF1566E_3866_222C_41B7_1B8920D23819",
   "pitch": -2.62,
   "yaw": -79.42,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24DE2653_3826_2274_41C6_59AFE698547E, this.camera_538743A7_4526_1918_41CA_AB98D4458C98); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_26A39DC8_381A_E654_41C6_C49AFB3DDE91",
 "data": {
  "label": "Circle Arrow 01"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.49,
   "yaw": -79.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "class": "TripodCapPanoramaOverlay",
 "hfov": 36,
 "id": "panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_tcap0.png",
    "width": 3536,
    "class": "ImageResourceLevel",
    "height": 3536
   }
  ]
 },
 "inertia": true
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.49,
   "image": "this.AnimatedImageResource_1FF2B675_3866_223C_41CA_38CB207CF962",
   "pitch": -1.75,
   "yaw": 147.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871, this.camera_5218742B_4526_1F68_41C7_A4B281847159); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_18B81B81_386A_22D4_4195_96EEB6ED2F7E",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.49,
   "yaw": 147.13,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "class": "TripodCapPanoramaOverlay",
 "hfov": 36,
 "id": "panorama_24DE2653_3826_2274_41C6_59AFE698547E_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_tcap0.png",
    "width": 3536,
    "class": "ImageResourceLevel",
    "height": 3536
   }
  ]
 },
 "inertia": true
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.5,
   "image": "this.AnimatedImageResource_1FFF866D_3866_222C_41C6_70ACA703A122",
   "pitch": -1.4,
   "yaw": -76.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871, this.camera_539613B7_4526_1978_4188_77FA53F7FB94); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_25E6557E_381A_E62D_41BD_99106E54ACF7",
 "data": {
  "label": "Circle Arrow 01"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.5,
   "yaw": -76.48,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.48,
   "image": "this.AnimatedImageResource_1FFE566D_3866_222C_41C2_7C1D2A5CE6C2",
   "pitch": -3.31,
   "yaw": -130.65,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1AE093B1_3826_2234_418B_63ED694649C9, this.camera_53A003C4_4526_1918_4197_8FCF75284B10); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2608E83C_381A_EE2C_41CA_804DBEC109B3",
 "data": {
  "label": "Circle Arrow 01"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.48,
   "yaw": -130.65,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.5,
   "image": "this.AnimatedImageResource_1FFE066D_3866_222C_41C3_A709189DD24F",
   "pitch": 1.48,
   "yaw": 49.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE, this.camera_53B3D3D0_4526_1938_41CC_BAF90AD3D143); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_264621DA_381D_DE74_41B4_98CA9D1807D4",
 "data": {
  "label": "Circle Arrow 01"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.5,
   "yaw": 49.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "class": "TripodCapPanoramaOverlay",
 "hfov": 36,
 "id": "panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_tcap0.png",
    "width": 3536,
    "class": "ImageResourceLevel",
    "height": 3536
   }
  ]
 },
 "inertia": true
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.26,
   "image": "this.AnimatedImageResource_1FF53676_3866_223C_41C9_43BBC73E7FAB",
   "pitch": -2.86,
   "yaw": -76.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_1AE093B1_3826_2234_418B_63ED694649C9, this.camera_522AD437_4526_1F78_4140_D07A9455AE87); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_195FA901_386B_EFD4_41C4_FD3E0C3EED7E",
 "data": {
  "label": "Arrow 03 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.26,
   "yaw": -76.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "class": "TripodCapPanoramaOverlay",
 "hfov": 36,
 "id": "panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_tcap0.png",
    "width": 3536,
    "class": "ImageResourceLevel",
    "height": 3536
   }
  ]
 },
 "inertia": true
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.48,
   "image": "this.AnimatedImageResource_1FF2F675_3866_223C_41C9_A845230215D1",
   "pitch": 3.07,
   "yaw": 99.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871, this.camera_53686379_4526_19E8_41BE_4412636AA0DF); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_19594FD3_386A_227B_41B9_378B372AA724",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.48,
   "yaw": 99.47,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "class": "TripodCapPanoramaOverlay",
 "hfov": 36,
 "id": "panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_tcap0.png",
    "width": 3536,
    "class": "ImageResourceLevel",
    "height": 3536
   }
  ]
 },
 "inertia": true
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.5,
   "image": "this.AnimatedImageResource_1FF01674_3866_223C_41C2_8DE982374B59",
   "pitch": -0.52,
   "yaw": 119.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24DE2653_3826_2274_41C6_59AFE698547E, this.camera_53BDE3DD_4526_1928_41B7_F37AB3A5163D); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_26F27133_381A_5E3B_41AF_D8F71972F4F6",
 "data": {
  "label": "Circle Arrow 01"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.5,
   "yaw": 119.16,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.5,
   "image": "this.AnimatedImageResource_1FF0D674_3866_223C_41BE_74CA0B52E5EA",
   "pitch": 1.02,
   "yaw": 79.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47, this.camera_53CD73E9_4526_18E8_41BD_B8312EFC4ACB); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2722C2E0_381A_6255_41C8_6AD967BCB03B",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.5,
   "yaw": 79.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.48,
   "image": "this.AnimatedImageResource_1FF36674_3866_223C_41C1_BED605BC4A4F",
   "pitch": 3.07,
   "yaw": -63.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E, this.camera_53FEE410_4526_1F38_416B_77A625A6FE74); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_27B02ABE_381A_622D_41CB_E3A1F9E5E6E4",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.48,
   "yaw": -63.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.49,
   "image": "this.AnimatedImageResource_1FF32674_3866_223C_41A8_6FD6BA48693C",
   "pitch": 2.15,
   "yaw": -99.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC, this.camera_53EEB402_4526_1F18_41CD_822F0B8BCD43); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_180BB650_381A_E275_4186_D269B2430A35",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.49,
   "yaw": -99.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.12,
   "image": "this.AnimatedImageResource_1FF3D674_3866_223C_4170_A4DB2F1DC21F",
   "pitch": -8.99,
   "yaw": -85.19,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24DF8774_3826_623C_41B9_1E03B9873AA4, this.camera_53DF03F5_4526_18F8_419F_CA2F58577B4A); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_188A5712_386E_23F5_419D_000D8A71923C",
 "data": {
  "label": "Arrow 03 Right"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.12,
   "yaw": -85.19,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "class": "TripodCapPanoramaOverlay",
 "hfov": 36,
 "id": "panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_tcap0.png",
    "width": 3536,
    "class": "ImageResourceLevel",
    "height": 3536
   }
  ]
 },
 "inertia": true
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.27,
   "image": "this.AnimatedImageResource_1FF4F676_3866_223C_417D_F600D35435BA",
   "pitch": -0.82,
   "yaw": -60.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47, this.camera_5208F41D_4526_1F28_41CC_7044510A1921); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_186AFD00_386A_67D4_41C7_865CB5FEE499",
 "data": {
  "label": "Arrow 03 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.27,
   "yaw": -60.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "class": "TripodCapPanoramaOverlay",
 "hfov": 36,
 "id": "panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_tcap0.png",
    "width": 3536,
    "class": "ImageResourceLevel",
    "height": 3536
   }
  ]
 },
 "inertia": true
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.25,
   "image": "this.AnimatedImageResource_1FF42676_3866_223C_41AD_210195A65AF9",
   "pitch": 0.85,
   "yaw": 51.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24DE2653_3826_2274_41C6_59AFE698547E, this.camera_5348C330_4526_1978_41CD_068EB72AF489); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_184EB2DB_386A_226B_41CA_EB7688A5A987",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.25,
   "yaw": 51.51,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "rotate": false,
 "angle": 0,
 "class": "TripodCapPanoramaOverlay",
 "hfov": 36,
 "id": "panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_tcap0.png",
    "width": 3536,
    "class": "ImageResourceLevel",
    "height": 3536
   }
  ]
 },
 "inertia": true
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.5,
   "image": "this.AnimatedImageResource_1FF27675_3866_223C_41C7_D414F154282B",
   "pitch": 0.59,
   "yaw": 68.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871, this.camera_523A0442_4526_1F18_41C5_03D37A6AEB6C); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_27CB3B6D_3866_E22E_4187_653D931E4286",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.5,
   "yaw": 68.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "progressBarBorderColor": "#0066FF",
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_C883D989_EEE0_A095_41D3_8106D308BE0F",
 "left": "0%",
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "class": "ViewerArea",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "minHeight": 1,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "12px",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "minWidth": 1,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "height": "100%",
 "progressBarBorderSize": 6,
 "toolTipShadowColor": "#FFFFFF",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "shadow": false,
 "show": "this.ViewerAreaLabeled_C883D989_EEE0_A095_41D3_8106D308BE0F.bind('hide', function(e){ e.source.unbind('hide', arguments.callee, this); this.playList_531442E7_4526_1B18_41C7_F177CEEA48E0.set('selectedIndex', -1); }, this); this.playList_531442E7_4526_1B18_41C7_F177CEEA48E0.set('selectedIndex', 0)",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "top": "0%",
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "progressBackgroundColorRatios": [
  0.01
 ]
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_C883C989_EEE0_A095_41ED_A3E0870988B3",
 "left": 10,
 "class": "IconButton",
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "verticalAlign": "middle",
 "top": "20%",
 "iconURL": "skin/IconButton_C883C989_EEE0_A095_41ED_A3E0870988B3.png",
 "bottom": "20%",
 "minWidth": 50,
 "mode": "push",
 "width": "14.22%",
 "rollOverIconURL": "skin/IconButton_C883C989_EEE0_A095_41ED_A3E0870988B3_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_C883C989_EEE0_A095_41ED_A3E0870988B3_pressed.png",
 "data": {
  "name": "IconButton <"
 },
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_C883F989_EEE0_A095_41B7_D32BF72059C7",
 "class": "IconButton",
 "right": 10,
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "verticalAlign": "middle",
 "top": "20%",
 "iconURL": "skin/IconButton_C883F989_EEE0_A095_41B7_D32BF72059C7.png",
 "bottom": "20%",
 "minWidth": 50,
 "mode": "push",
 "width": "14.22%",
 "rollOverIconURL": "skin/IconButton_C883F989_EEE0_A095_41B7_D32BF72059C7_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_C883F989_EEE0_A095_41B7_D32BF72059C7_pressed.png",
 "data": {
  "name": "IconButton >"
 },
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "width": 58,
 "borderSize": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "push",
 "height": 58,
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "IconButton VR"
 },
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "width": 58,
 "borderSize": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "data": {
  "name": "IconButton GYRO"
 },
 "cursor": "hand"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_22BBC2F4_3075_D173_41B4_71F7A3560C34",
 "left": "0%",
 "width": 136,
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "class": "Container",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "shadowVerticalLength": 0,
 "verticalAlign": "top",
 "top": 2,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 0,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 78,
 "shadowBlurRadius": 7,
 "gap": 10,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "visible": false,
 "overflow": "scroll",
 "shadow": true,
 "horizontalAlign": "left",
 "data": {
  "name": "white block"
 },
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0.01
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_22BBD2F4_3075_D173_41B4_8504C593E6BF",
 "left": 0,
 "width": 366,
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "class": "Container",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "shadowVerticalLength": 0,
 "verticalAlign": "top",
 "top": 86,
 "scrollBarOpacity": 0.5,
 "shadowHorizontalLength": 0,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#5CA1DE"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 46,
 "shadowBlurRadius": 7,
 "gap": 10,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "visible": false,
 "overflow": "scroll",
 "shadow": true,
 "horizontalAlign": "left",
 "data": {
  "name": "blue block"
 },
 "propagateClick": true
},
{
 "fontFamily": "Oswald",
 "propagateClick": true,
 "textDecoration": "none",
 "id": "Label_22BB22F4_3075_D173_41BB_3ACDC6CCCC83",
 "left": 10,
 "class": "Label",
 "fontColor": "#000000",
 "width": 391,
 "borderSize": 0,
 "paddingRight": 0,
 "text": "LOREM IPSUM",
 "minHeight": 1,
 "paddingLeft": 0,
 "verticalAlign": "top",
 "top": 0,
 "horizontalAlign": "left",
 "minWidth": 1,
 "height": 75,
 "fontSize": 61,
 "fontStyle": "italic",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "text 1"
 },
 "fontWeight": "bold"
},
{
 "fontFamily": "Oswald",
 "propagateClick": true,
 "textDecoration": "none",
 "id": "Label_22BB32F4_3075_D173_4191_C8B45B85DEB8",
 "left": 12,
 "textShadowColor": "#000000",
 "class": "Label",
 "fontColor": "#FFFFFF",
 "width": 385,
 "borderSize": 0,
 "paddingRight": 0,
 "text": "DOLOR SIT AMET, CONSECTETUR",
 "minHeight": 1,
 "paddingLeft": 0,
 "textShadowOpacity": 1,
 "verticalAlign": "top",
 "top": 90,
 "horizontalAlign": "left",
 "minWidth": 1,
 "height": 44,
 "fontSize": 28,
 "textShadowHorizontalLength": 0,
 "fontStyle": "italic",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "textShadowVerticalLength": 0,
 "borderRadius": 0,
 "textShadowBlurRadius": 10,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "text 2"
 },
 "fontWeight": "normal"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "scrollBarColor": "#000000",
 "class": "Container",
 "right": "0%",
 "width": 110,
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "borderSize": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 110,
 "horizontalAlign": "center",
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "button menu sup"
 },
 "overflow": "visible"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "scrollBarColor": "#000000",
 "class": "Container",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0"
 ],
 "borderSize": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "center",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "height": "85.959%",
 "scrollBarMargin": 2,
 "gap": 3,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "-button set"
 },
 "overflow": "scroll",
 "width": "91.304%"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4",
 "left": "0%",
 "scrollBarColor": "#000000",
 "class": "Container",
 "width": 66,
 "children": [
  "this.Container_21F34780_3014_BF93_41A2_9BF700588BEC",
  "this.IconButton_223F0171_3014_B375_41C1_61063C3D73B3"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "creationPolicy": "inAdvance",
 "paddingLeft": 0,
 "minHeight": 1,
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "height": "100%",
 "horizontalAlign": "left",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "- COLLAPSE"
 },
 "overflow": "scroll"
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD",
 "scrollBarColor": "#000000",
 "class": "Container",
 "right": 0,
 "width": 330,
 "children": [
  "this.Container_4521E58D_74A8_853A_418A_CF7FF914DD83",
  "this.IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882"
 ],
 "borderSize": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "height": "100%",
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "- EXPANDED"
 },
 "overflow": "visible"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "class": "Container",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "10%",
 "horizontalAlign": "center",
 "shadowHorizontalLength": 0,
 "bottom": "10%",
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "shadow": true,
 "data": {
  "name": "Global"
 },
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_C883B989_EEE0_A095_41E2_71BE8A6C27D7",
 "left": "15%",
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "class": "Container",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_C883A989_EEE0_A095_41E2_9E65BB3CE9BD"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "7%",
 "horizontalAlign": "center",
 "shadowHorizontalLength": 0,
 "bottom": "7%",
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "shadow": true,
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_C1693B41_EE61_A194_41A2_55730F67B0C3",
 "left": "10%",
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "class": "Container",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_C1692B41_EE61_A194_41C5_71448E017EB9",
  "this.Container_C169FB41_EE61_A194_41DC_03A3A32BEF11"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "5%",
 "horizontalAlign": "left",
 "shadowHorizontalLength": 0,
 "bottom": "5%",
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "scroll",
 "shadow": true,
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_C1681B43_EE61_A195_41E8_37B3A72A462E",
 "left": "10%",
 "scrollBarColor": "#000000",
 "class": "Container",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_C1680B43_EE61_A195_41D3_91B8D64E7419"
 ],
 "borderSize": 0,
 "paddingRight": 20,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "5%",
 "horizontalAlign": "right",
 "bottom": "80%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 20,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_C04BC275_F1E3_E07C_41EB_A456272DE305",
 "left": "10%",
 "scrollBarColor": "#000000",
 "shadowColor": "#000000",
 "class": "Container",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_C0483275_F1E3_E07C_41E7_604DCAE4942E",
  "this.Container_C0481275_F1E3_E07C_41E9_1C8EE843B19F"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "verticalAlign": "top",
 "top": "5%",
 "horizontalAlign": "left",
 "shadowVerticalLength": 0,
 "shadowHorizontalLength": 0,
 "bottom": "5%",
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "paddingBottom": 0,
 "backgroundOpacity": 0.87,
 "shadowSpread": 1,
 "borderRadius": 0,
 "shadow": true,
 "overflow": "scroll",
 "data": {
  "name": "Global"
 },
 "propagateClick": false
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_C048B276_F1E3_E07C_41DE_0FCDCC5E989B",
 "left": "10%",
 "scrollBarColor": "#000000",
 "class": "Container",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_C048A276_F1E3_E07C_41E9_014CFE419C28"
 ],
 "borderSize": 0,
 "paddingRight": 20,
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "5%",
 "horizontalAlign": "right",
 "bottom": "80%",
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 20,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible",
 "shadow": false
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FF1D66E_3866_222C_41C9_C9A1661CA2F8",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FF1966E_3866_222C_417D_F33E258E1A98",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_24C0BF74_3826_223C_41C5_BA8B5E0CDE47_1_HS_1_0.png",
   "width": 640,
   "class": "ImageResourceLevel",
   "height": 960
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FFE966E_3866_222C_41B9_276529C5922A",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FF1566E_3866_222C_41B7_1B8920D23819",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1AE093B1_3826_2234_418B_63ED694649C9_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FF2B675_3866_223C_41CA_38CB207CF962",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_24CCD005_3826_5DDF_41C4_F112DBC82DFC_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FFF866D_3866_222C_41C6_70ACA703A122",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FFE566D_3866_222C_41C2_7C1D2A5CE6C2",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FFE066D_3866_222C_41C3_A709189DD24F",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_24DE2653_3826_2274_41C6_59AFE698547E_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FF53676_3866_223C_41C9_43BBC73E7FAB",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_24DF8807_3826_2DDC_41C4_C1C44C4C90C2_1_HS_0_0.png",
   "width": 640,
   "class": "ImageResourceLevel",
   "height": 960
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FF2F675_3866_223C_41C9_A845230215D1",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_24DF8774_3826_623C_41B9_1E03B9873AA4_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FF01674_3866_223C_41C2_8DE982374B59",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FF0D674_3866_223C_41BE_74CA0B52E5EA",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FF36674_3866_223C_41C1_BED605BC4A4F",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FF32674_3866_223C_41A8_6FD6BA48693C",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FF3D674_3866_223C_4170_A4DB2F1DC21F",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_24DF9774_3826_623C_41CB_2BCDDB2D9871_1_HS_4_0.png",
   "width": 640,
   "class": "ImageResourceLevel",
   "height": 960
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FF4F676_3866_223C_417D_F600D35435BA",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_253BD1A1_3826_DED4_41CB_A17EC59228D5_1_HS_0_0.png",
   "width": 640,
   "class": "ImageResourceLevel",
   "height": 960
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FF42676_3866_223C_41AD_210195A65AF9",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_24DF8859_3826_2E77_41C9_4703A6CC42FE_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_1FF27675_3866_223C_41C7_D414F154282B",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_24CA3F69_3826_6254_41BA_EB9A38A28E0E_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "width": 60,
 "borderSize": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "toggle",
 "height": 60,
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "data": {
  "name": "image button menu"
 },
 "cursor": "hand"
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_21F34780_3014_BF93_41A2_9BF700588BEC",
 "left": "0%",
 "propagateClick": true,
 "width": 23,
 "scrollBarColor": "#000000",
 "class": "Container",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000"
 ],
 "top": "0%",
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.4,
 "borderRadius": 0,
 "data": {
  "name": "Container black"
 },
 "overflow": "scroll",
 "shadow": false,
 "horizontalAlign": "left"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 80,
 "maxWidth": 80,
 "id": "IconButton_223F0171_3014_B375_41C1_61063C3D73B3",
 "left": 9,
 "width": 28,
 "class": "IconButton",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "46.04%",
 "horizontalAlign": "center",
 "bottom": "47.23%",
 "minWidth": 1,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, false, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, false, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, true, 0, null, null, false)",
 "iconURL": "skin/IconButton_223F0171_3014_B375_41C1_61063C3D73B3.png",
 "rollOverIconURL": "skin/IconButton_223F0171_3014_B375_41C1_61063C3D73B3_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "IconButton arrow"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_4521E58D_74A8_853A_418A_CF7FF914DD83",
 "left": "0%",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_0B85764A_2D07_4D95_41A5_3AC872515A8C"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "top": "0%",
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Container"
 },
 "overflow": "scroll",
 "width": "74.545%"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 50,
 "maxWidth": 50,
 "id": "IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882",
 "width": 33,
 "class": "IconButton",
 "right": 67,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "44.03%",
 "horizontalAlign": "center",
 "bottom": "51.29%",
 "minWidth": 1,
 "mode": "push",
 "click": "this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false); this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false)",
 "iconURL": "skin/IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882.png",
 "rollOverIconURL": "skin/IconButton_1AF35943_2D07_479B_41AF_FBC8A1477882_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "IconButton collapse"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 140,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "header"
 },
 "overflow": "scroll"
},
{
 "itemThumbnailWidth": 220,
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "left": 0,
 "scrollBarColor": "#04A3E1",
 "itemMode": "normal",
 "itemLabelFontStyle": "italic",
 "selectedItemThumbnailShadowVerticalLength": 0,
 "scrollBarOpacity": 0.5,
 "itemLabelHorizontalAlign": "center",
 "itemMaxWidth": 1000,
 "class": "ThumbnailGrid",
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "horizontalAlign": "center",
 "itemPaddingRight": 3,
 "itemMaxHeight": 1000,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 70,
 "itemThumbnailOpacity": 1,
 "minHeight": 1,
 "width": "100%",
 "selectedItemThumbnailShadowBlurRadius": 16,
 "verticalAlign": "middle",
 "itemLabelFontFamily": "Oswald",
 "minWidth": 1,
 "itemBorderRadius": 0,
 "height": "92%",
 "itemPaddingLeft": 3,
 "selectedItemLabelFontColor": "#04A3E1",
 "itemLabelPosition": "bottom",
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemHorizontalAlign": "center",
 "itemOpacity": 1,
 "itemBackgroundOpacity": 0,
 "backgroundOpacity": 0,
 "itemThumbnailBorderRadius": 0,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "itemBackgroundColorRatios": [],
 "propagateClick": true,
 "shadow": false,
 "itemWidth": 220,
 "selectedItemThumbnailShadow": true,
 "itemMinHeight": 50,
 "borderSize": 0,
 "paddingRight": 70,
 "selectedItemLabelFontWeight": "bold",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "rollOverItemLabelFontColor": "#04A3E1",
 "rollOverItemThumbnailShadow": true,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "bottom": -0.2,
 "itemLabelFontSize": 16,
 "itemMinWidth": 50,
 "scrollBarMargin": 2,
 "itemVerticalAlign": "top",
 "itemLabelFontColor": "#666666",
 "itemThumbnailScaleMode": "fit_outside",
 "itemHeight": 160,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "gap": 26,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 125,
 "paddingTop": 10,
 "itemThumbnailShadow": false,
 "paddingBottom": 70,
 "borderRadius": 5,
 "itemPaddingBottom": 3,
 "data": {
  "name": "ThumbnailList"
 },
 "itemLabelGap": 7,
 "scrollBarWidth": 10,
 "selectedItemThumbnailShadowHorizontalLength": 0
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_C883A989_EEE0_A095_41E2_9E65BB3CE9BD",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.ViewerAreaLabeled_C883D989_EEE0_A095_41D3_8106D308BE0F",
  "this.IconButton_C883C989_EEE0_A095_41ED_A3E0870988B3",
  "this.IconButton_C883F989_EEE0_A095_41B7_D32BF72059C7",
  "this.IconButton_C883E989_EEE0_A095_41B5_D66CA26E06EE"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Container photo"
 },
 "overflow": "visible",
 "width": "100%"
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_C1692B41_EE61_A194_41C5_71448E017EB9",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Image_C09D7B50_EE60_E1B4_41EC_30862F902E7E"
 ],
 "borderSize": 0,
 "paddingRight": 10,
 "paddingLeft": 10,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 10,
 "paddingTop": 10,
 "paddingBottom": 10,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "-left"
 },
 "overflow": "scroll",
 "width": "85%"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_C169FB41_EE61_A194_41DC_03A3A32BEF11",
 "propagateClick": false,
 "scrollBarColor": "#0069A3",
 "class": "Container",
 "scrollBarOpacity": 0.51,
 "children": [
  "this.Container_C169EB41_EE61_A194_41DB_D7E56F0428D9",
  "this.Container_C1699B41_EE61_A194_41D9_F48EB3C5F43F",
  "this.Container_C1686B43_EE61_A195_41DB_BF8863B96D8C"
 ],
 "borderSize": 0,
 "paddingRight": 50,
 "paddingLeft": 50,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "minWidth": 460,
 "contentOpaque": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 0,
 "paddingTop": 20,
 "paddingBottom": 20,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "-right"
 },
 "overflow": "visible",
 "width": "50%"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_C1680B43_EE61_A195_41D3_91B8D64E7419",
 "class": "IconButton",
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 50,
 "iconURL": "skin/IconButton_C1680B43_EE61_A195_41D3_91B8D64E7419.jpg",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_C1680B43_EE61_A195_41D3_91B8D64E7419_pressed_rollover.jpg",
 "minWidth": 50,
 "mode": "push",
 "height": "75%",
 "click": "this.setComponentVisibility(this.Container_C1683B43_EE61_A195_41DE_7017FDAE4F77, false, 0, null, null, false)",
 "width": "25%",
 "rollOverIconURL": "skin/IconButton_C1680B43_EE61_A195_41D3_91B8D64E7419_rollover.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_C1680B43_EE61_A195_41D3_91B8D64E7419_pressed.jpg",
 "cursor": "hand",
 "data": {
  "name": "X"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_C0483275_F1E3_E07C_41E7_604DCAE4942E",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Image_5449EC8A_44E2_2F28_41D0_9F0223F3893E"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000"
 ],
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "-left"
 },
 "overflow": "scroll",
 "width": "85%"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_C0481275_F1E3_E07C_41E9_1C8EE843B19F",
 "propagateClick": false,
 "scrollBarColor": "#0069A3",
 "class": "Container",
 "scrollBarOpacity": 0.51,
 "children": [
  "this.Container_C0480275_F1E3_E07C_41E1_710757CF421D",
  "this.Container_C0487276_F1E3_E07C_41EC_743806B3D20E",
  "this.Container_C0484276_F1E3_E07C_41A8_47CF7E03E868"
 ],
 "borderSize": 0,
 "paddingRight": 50,
 "paddingLeft": 50,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "minWidth": 460,
 "contentOpaque": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 0,
 "paddingTop": 20,
 "paddingBottom": 20,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "-right"
 },
 "overflow": "visible",
 "width": "52.083%"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_C048A276_F1E3_E07C_41E9_014CFE419C28",
 "class": "IconButton",
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 50,
 "iconURL": "skin/IconButton_C048A276_F1E3_E07C_41E9_014CFE419C28.jpg",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_C048A276_F1E3_E07C_41E9_014CFE419C28_pressed_rollover.jpg",
 "minWidth": 50,
 "mode": "push",
 "height": "75%",
 "click": "this.setComponentVisibility(this.Container_C0489276_F1E3_E07C_41E9_87D51CEBEE88, false, 0, null, null, false)",
 "width": "25%",
 "rollOverIconURL": "skin/IconButton_C048A276_F1E3_E07C_41E9_014CFE419C28_rollover.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_C048A276_F1E3_E07C_41E9_014CFE419C28_pressed.jpg",
 "cursor": "hand",
 "data": {
  "name": "X"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_0B85764A_2D07_4D95_41A5_3AC872515A8C",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Image_13DC143E_02A9_9695_4184_72D35C4BDB48",
  "this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE",
  "this.Container_19256A12_2D07_45B5_41AB_E9DE96B2DFF3",
  "this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B",
  "this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B",
  "this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D",
  "this.Container_1758A215_31FA_0014_41B6_9A4A5384548B",
  "this.Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE",
  "this.Container_168D8311_3106_01EC_41B0_F2D40886AB88"
 ],
 "borderSize": 0,
 "paddingRight": 40,
 "paddingLeft": 40,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "horizontalAlign": "left",
 "scrollBarVisible": "rollOver",
 "minWidth": 1,
 "contentOpaque": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000"
 ],
 "top": "0%",
 "scrollBarMargin": 2,
 "height": "100%",
 "gap": 10,
 "paddingTop": 40,
 "paddingBottom": 40,
 "backgroundOpacity": 0.7,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "- Buttons set"
 },
 "overflow": "scroll",
 "width": "99.593%"
},
{
 "transparencyActive": false,
 "propagateClick": true,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "class": "IconButton",
 "right": 20,
 "horizontalAlign": "right",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "top": 20,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "verticalAlign": "top",
 "minWidth": 50,
 "mode": "push",
 "height": "36.14%",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "width": "100%",
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_C883E989_EEE0_A095_41B5_D66CA26E06EE",
 "class": "IconButton",
 "right": 20,
 "horizontalAlign": "right",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "top": 20,
 "iconURL": "skin/IconButton_C883E989_EEE0_A095_41B5_D66CA26E06EE.jpg",
 "verticalAlign": "top",
 "minWidth": 50,
 "mode": "push",
 "height": "10%",
 "click": "this.setComponentVisibility(this.Container_C8831989_EEE0_A095_41DB_1CBE787C0DF9, false, 0, null, null, false)",
 "width": "10%",
 "rollOverIconURL": "skin/IconButton_C883E989_EEE0_A095_41B5_D66CA26E06EE_rollover.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_C883E989_EEE0_A095_41B5_D66CA26E06EE_pressed.jpg",
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand"
},
{
 "propagateClick": false,
 "maxHeight": 636,
 "maxWidth": 634,
 "id": "Image_C09D7B50_EE60_E1B4_41EC_30862F902E7E",
 "left": "0%",
 "class": "Image",
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingRight": 0,
 "url": "skin/Image_C09D7B50_EE60_E1B4_41EC_30862F902E7E.png",
 "paddingLeft": 0,
 "minHeight": 1,
 "top": "6.48%",
 "width": "100%",
 "verticalAlign": "middle",
 "minWidth": 1,
 "height": "83.414%",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Image85276"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_C169EB41_EE61_A194_41DB_D7E56F0428D9",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 0,
 "verticalAlign": "top",
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 60,
 "width": "100%",
 "gap": 0,
 "paddingTop": 20,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_C1699B41_EE61_A194_41D9_F48EB3C5F43F",
 "propagateClick": false,
 "scrollBarColor": "#E73B2C",
 "class": "Container",
 "scrollBarOpacity": 0.79,
 "children": [
  "this.HTMLText_C1698B41_EE61_A194_41E4_3BBE2272A687",
  "this.HTMLText_C1684B41_EE61_A194_41EA_A40A145E1B91",
  "this.Button_C1687B43_EE61_A195_4198_C5BF5E529938"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 520,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "minWidth": 100,
 "contentOpaque": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 30,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Container text"
 },
 "overflow": "scroll",
 "width": "100%"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_C1686B43_EE61_A195_41DB_BF8863B96D8C",
 "propagateClick": false,
 "width": 370,
 "scrollBarColor": "#000000",
 "class": "Container",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 40,
 "horizontalAlign": "left",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "propagateClick": false,
 "maxHeight": 768,
 "maxWidth": 1024,
 "id": "Image_5449EC8A_44E2_2F28_41D0_9F0223F3893E",
 "left": "0%",
 "class": "Image",
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingRight": 0,
 "url": "skin/Image_5449EC8A_44E2_2F28_41D0_9F0223F3893E.jpeg",
 "paddingLeft": 0,
 "minHeight": 1,
 "top": "0%",
 "width": "100%",
 "verticalAlign": "middle",
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Image6654"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_C0480275_F1E3_E07C_41E1_710757CF421D",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 0,
 "verticalAlign": "top",
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 60,
 "width": "100%",
 "gap": 0,
 "paddingTop": 20,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_C0487276_F1E3_E07C_41EC_743806B3D20E",
 "propagateClick": false,
 "scrollBarColor": "#E73B2C",
 "class": "Container",
 "scrollBarOpacity": 0.79,
 "children": [
  "this.HTMLText_C0486276_F1E3_E07C_41B5_6D21337FC24A"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 520,
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "minWidth": 100,
 "contentOpaque": false,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 30,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Container text"
 },
 "overflow": "scroll",
 "width": "100%"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_C0484276_F1E3_E07C_41A8_47CF7E03E868",
 "propagateClick": false,
 "width": 370,
 "scrollBarColor": "#000000",
 "class": "Container",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 40,
 "horizontalAlign": "left",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "propagateClick": false,
 "maxHeight": 1095,
 "maxWidth": 1095,
 "id": "Image_13DC143E_02A9_9695_4184_72D35C4BDB48",
 "class": "Image",
 "right": "-1.21%",
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingRight": 0,
 "url": "skin/Image_13DC143E_02A9_9695_4184_72D35C4BDB48.png",
 "paddingLeft": 0,
 "minHeight": 1,
 "top": "-7.77%",
 "width": "100%",
 "verticalAlign": "middle",
 "minWidth": 1,
 "height": "32.621%",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Image5371"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_208C289A_3033_51B4_41BC_C3F8D8B8F86D",
  "this.Button_0AEB5577_2D08_CE7B_41B6_192923248F4E",
  "this.Container_F010CDB0_EE27_E0F3_41CA_A0A7BD04AF3A",
  "this.Button_0A054365_2D09_CB9F_4145_8C365B373D19",
  "this.Container_146FF082_2D09_C695_41C4_13DE74CDAF5E",
  "this.Button_CB2AC48F_EEE0_60AD_41D4_AF45A5C9B26B",
  "this.Container_207ECEAD_3035_51EC_41A3_EE49910C654D",
  "this.Button_CD2D6DF6_EEE1_A07C_41EA_D48A6221E560",
  "this.Container_CB84BCFF_EEE3_E06D_41ED_0B272180DB22",
  "this.Button_0B73474A_2D18_CB95_41B5_180037BA80BC",
  "this.Container_1BA343A6_2D0B_4A9D_41A8_3A02573B3B89",
  "this.Button_1D2C4FDF_2D7F_BAAB_4198_FBD1E9E469FF",
  "this.Container_F1D73148_EE20_6193_41C0_EA322B73E5B2",
  "this.Button_1D0C50DE_2D07_C6AD_41C1_CF4547A6CFAB"
 ],
 "borderSize": 0,
 "class": "Container",
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "23.86%",
 "horizontalAlign": "left",
 "bottom": "28.14%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "-Level 1"
 },
 "overflow": "scroll",
 "width": "100%"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_19256A12_2D07_45B5_41AB_E9DE96B2DFF3",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_193B8A52_2D1B_C5B5_41C3_F44FF520A3F0",
  "this.HTMLText_29DD1615_3597_79DF_41C4_7593739E5260",
  "this.Container_2B9EE463_3593_BA7B_4195_8E8F4568BB13",
  "this.Container_283049D5_35F3_AA5F_419D_20B6A59ABCA6"
 ],
 "borderSize": 0,
 "class": "Container",
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "bottom",
 "horizontalAlign": "left",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "height": 130,
 "scrollBarMargin": 2,
 "width": "100%",
 "gap": 5,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "-Container footer"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_2A2CB53C_310E_0014_41C3_AB834B10253B",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Button_2A2DA53B_310E_001C_41C7_8885E712C50B",
  "this.Container_2A2DB53B_310E_001C_41BA_0206228E495C",
  "this.Container_1303E3BB_3106_001D_41C8_60D6F4D70B2F",
  "this.Button_2A2D853B_310E_001C_41C4_1C2E2BAFC35D",
  "this.Button_2A2DE53B_310E_001C_41BB_C7AB6950A4DD",
  "this.Button_2A2C253B_310E_001C_41B6_D3A7F4F68C3E",
  "this.Button_2A2C053B_310E_001C_41A2_583DE489828C",
  "this.Button_2A2C753B_310E_001C_41C4_B649CCC20E3D",
  "this.Button_2A2C553C_310E_0014_41C4_86393D0ADCC7",
  "this.Button_15EF2665_3106_0035_41AE_9BACA1A48D02",
  "this.Button_15F5A318_3106_001C_41C5_9AA2EF2184CF",
  "this.Button_1203FDB8_3106_001C_41B6_C9BE8EDD0DA9",
  "this.Button_13D4FC1E_310A_0017_41BA_DDA6D071C1BA"
 ],
 "borderSize": 0,
 "class": "Container",
 "paddingLeft": 0,
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "25%",
 "horizontalAlign": "left",
 "bottom": "25%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "-Level 2-1"
 },
 "overflow": "scroll",
 "width": "100%"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_159EADDD_31FA_0014_41C8_8A5203EC627B",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1",
  "this.Container_15A14DDC_31FA_0014_41BE_C93192DD207E",
  "this.Container_15A16DDC_31FA_0014_4199_0FBF7553300D",
  "this.Button_15A10DDC_31FA_0014_4185_021C898E177D",
  "this.Button_15A13DDC_31FA_0014_41C5_41AE80876834",
  "this.Button_15A12DDC_31FA_0014_416B_ED845741AE5F",
  "this.Button_159EDDDC_31FA_0014_419A_61C18E43FE01",
  "this.Button_159ECDDC_31FA_0014_41B9_2D5AB1021813",
  "this.Button_159EFDDC_31FA_0014_41C6_9CF7032F84E0",
  "this.Button_159EEDDC_31FA_0014_41B6_22A86B2D2FEB",
  "this.Button_159E9DDC_31FA_0015_41B6_CB1D433C7673",
  "this.Button_159E8DDD_31FA_0014_41C5_F18F441AF371",
  "this.Button_159EBDDD_31FA_0014_41C8_935504B30727"
 ],
 "borderSize": 0,
 "class": "Container",
 "paddingLeft": 0,
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "25%",
 "horizontalAlign": "left",
 "bottom": "25%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "-Level 2-2"
 },
 "overflow": "scroll",
 "width": "100%"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_17569D7D_31FA_0015_41C4_CBC688763A8D",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Button_1757CD7D_31FA_0015_4143_A9E37B16A50B",
  "this.Container_17579D7D_31FA_0015_41A1_D2B94269F28D",
  "this.Container_17578D7D_31FA_0015_41BE_353D3005648A",
  "this.Button_1757AD7D_31FA_0015_41C7_FB79F56FA149",
  "this.Button_17565D7D_31FA_0015_4193_78BBCB2DC70F",
  "this.Button_17564D7D_31FA_0015_41B8_A9191CD56C52",
  "this.Button_17567D7D_31FA_0015_41C2_1E0D0AF05C7A",
  "this.Button_17566D7D_31FA_0015_41AD_98D7C60C694F",
  "this.Button_17561D7D_31FA_0015_41B5_BD72FAC26B8B",
  "this.Button_17560D7D_31FA_0015_41C4_7F0EC7540CC2",
  "this.Button_17562D7D_31FA_0015_41A3_96B282B30DBA",
  "this.Button_1756DD7D_31FA_0015_41A5_988B67FCF8B7",
  "this.Button_1756FD7D_31FA_0015_41C7_DA2AAC2AAAEC"
 ],
 "borderSize": 0,
 "class": "Container",
 "paddingLeft": 0,
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "25%",
 "horizontalAlign": "left",
 "bottom": "25%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "-Level 2-3"
 },
 "overflow": "scroll",
 "width": "100%"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_1758A215_31FA_0014_41B6_9A4A5384548B",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Button_175A5214_31FA_0014_4198_930DF49BADD9",
  "this.Container_175A4215_31FA_0014_41B2_5B8676CC3F2F",
  "this.Container_1759B215_31FA_0014_41C0_84C99CBD5517",
  "this.Button_1759A215_31FA_0014_41C7_F6B1044E5BB3",
  "this.Button_17598215_31FA_0014_41AC_1166AB319171",
  "this.Button_1759F215_31FA_0014_41BD_BBFA5FB0D882",
  "this.Button_1759D215_31FA_0014_41AD_B6C5744A0B97",
  "this.Button_17593215_31FA_0014_41C0_42BAFB0080F0",
  "this.Button_17592215_31FA_0014_41B2_AA3B5CC318B8",
  "this.Button_17590215_31FA_0014_41C1_2B2D012DCC76",
  "this.Button_17597215_31FA_0014_41C0_9BEE1DE4D7F6",
  "this.Button_17596215_31FA_0014_41C6_A42670770708",
  "this.Button_1758B215_31FA_0014_41BC_C4EAC2A9544B"
 ],
 "borderSize": 0,
 "class": "Container",
 "paddingLeft": 0,
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "25%",
 "horizontalAlign": "left",
 "bottom": "25%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "-Level 2-4"
 },
 "overflow": "scroll",
 "width": "100%"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C",
  "this.Container_17EA92B7_3106_0014_41A6_2B88DF32BBA7",
  "this.Container_17EAA2B7_3106_0014_41B0_ACBB1485A79E",
  "this.Button_17EAB2B7_3106_0014_41A7_209417AD3E9A",
  "this.Button_17EAD2B7_3106_0014_41C0_0B5453B4841D",
  "this.Button_17EAE2B7_3106_0014_41C7_DB7FC43AAEE0",
  "this.Button_17EB02B7_3106_0014_41AF_05D9AC36B189",
  "this.Button_17EB32B7_3106_0014_41C8_467BF6AECBE8",
  "this.Button_17EB42B7_3106_0014_41B0_CE70CBDDF438",
  "this.Button_17EB52B7_3106_0014_419C_439E593AEC43",
  "this.Button_17EB62B7_3106_0014_41C5_43B38271B353",
  "this.Button_17EB72B7_3106_0014_41B9_61857077BF4A",
  "this.Button_17EB92B7_3106_0014_41B2_34A3E3F63779"
 ],
 "borderSize": 0,
 "class": "Container",
 "paddingLeft": 0,
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "25%",
 "horizontalAlign": "left",
 "bottom": "25%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "-Level 2-5"
 },
 "overflow": "scroll",
 "width": "100%"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_168D8311_3106_01EC_41B0_F2D40886AB88",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Button_168CA310_3106_01EC_41C7_72CE0522951A",
  "this.Container_168C8310_3106_01EC_4187_B16F315A4A23",
  "this.Container_168D7310_3106_01EC_41BE_5FCBD9E27BE4",
  "this.Button_168D6310_3106_01EC_41B8_A0B6BE627547",
  "this.Button_168D3310_3106_01EC_41AC_5D524E4677A5",
  "this.Button_168D5310_3106_01EC_41B5_96D9387401B8"
 ],
 "borderSize": 0,
 "class": "Container",
 "paddingLeft": 0,
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "25%",
 "horizontalAlign": "left",
 "bottom": "25%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "-Level 2-6"
 },
 "overflow": "scroll",
 "width": "100%"
},
{
 "propagateClick": false,
 "id": "HTMLText_C1698B41_EE61_A194_41E4_3BBE2272A687",
 "scrollBarColor": "#BBD149",
 "scrollBarOpacity": 0,
 "borderSize": 0,
 "class": "HTMLText",
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "12.041%",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.87vh;font-family:'Otama.ep';\">Cleidiani Geuda</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.87vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.18vh;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "data": {
  "name": "HTMLText24905"
 },
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "id": "HTMLText_C1684B41_EE61_A194_41EA_A40A145E1B91",
 "scrollBarColor": "#B3D237",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "class": "HTMLText",
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "32.857%",
 "paddingTop": 0,
 "paddingBottom": 20,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#99bb1b;font-size:3.03vh;font-family:'Antonio';\"><B>INFO.:</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.03vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.18vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.02vh;font-family:'Open Sans Semibold';\">CRECI:</SPAN><SPAN STYLE=\"color:#999999;font-size:2.02vh;font-family:'Open Sans Semibold';\"> 42.845 F</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.02vh;font-family:'Open Sans Semibold';\">Site: </SPAN><SPAN STYLE=\"color:#999999;font-size:2.02vh;font-family:'Open Sans Semibold';\">www.cleidianigeuda.com.br</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.02vh;font-family:'Open Sans Semibold';\">Contato:</SPAN><SPAN STYLE=\"color:#999999;font-size:2.02vh;font-family:'Open Sans Semibold';\"> (49) 99913-1604 </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.02vh;font-family:'Open Sans Semibold';\">Instagram:</SPAN><SPAN STYLE=\"color:#999999;font-size:2.02vh;font-family:'Open Sans Semibold';\"> cleidianigeuda</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.18vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.18vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.18vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.18vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.18vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.18vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.18vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.18vh;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "data": {
  "name": "HTMLText"
 },
 "scrollBarWidth": 10
},
{
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "Button book now"
 },
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_C1687B43_EE61_A195_4198_C5BF5E529938",
 "propagateClick": false,
 "width": 132,
 "shadowColor": "#000000",
 "fontFamily": "Antonio",
 "class": "Button",
 "fontColor": "#FFFFFF",
 "borderSize": 0,
 "paddingRight": 0,
 "iconHeight": 32,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "pressedBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#99BB1B"
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": "3.26vh",
 "label": "CONTATE",
 "height": 32,
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.openLink('https://wa.me/554999131604', '_blank')",
 "fontStyle": "normal",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0.7,
 "borderRadius": 0,
 "rollOverBackgroundOpacity": 1,
 "iconWidth": 32,
 "shadow": false,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "fontWeight": "bold"
},
{
 "propagateClick": false,
 "id": "HTMLText_C0486276_F1E3_E07C_41B5_6D21337FC24A",
 "scrollBarColor": "#04A3E1",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "class": "HTMLText",
 "paddingLeft": 10,
 "paddingRight": 10,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "86.939%",
 "paddingTop": 0,
 "paddingBottom": 20,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.23vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.54vh;font-family:'Bebas Neue Bold';\">Casa no Santo Ant\u00f4nio</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.03vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.03vh;font-family:'Bebas Neue Bold';\">Detalhes</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.18vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.85vh;\">Im\u00f3vel com uma su\u00edte mais dois dormit\u00f3rios, cozinha planejada, uma \u00e1rea externa toda detalhada ideal para fins de tarde com \u00f3tima posi\u00e7\u00e3o solar </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.85vh;\">Bairro residencial pr\u00f3ximo ao centro, espa\u00e7o de terreno para voc\u00ea que tem crian\u00e7as ou pets.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.69vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.69vh;font-family:'Bebas Neue Bold';\"><B>CARACTER\u00cdSTICAS:</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.18vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.68vh;\"> \u2022 \u00c1rea Total: 260 m\u00b2 </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.68vh;\"> \u2022 \u00c1rea Privatica: 132 m\u00b2 </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.68vh;\"> \u2022 Su\u00edtes: 1</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.68vh;\"> \u2022 Dormit\u00f3rios: 3</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.68vh;\"> \u2022 Vagas de Garagem: 2</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.68vh;\"> \u2022 Banheiros: 2</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.69vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.69vh;font-family:'Bebas Neue Bold';\"><B>VENDA:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.7vh;font-family:'Bebas Neue Bold';\"><B>r$850.000.00</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "scrollBarWidth": 10
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_208C289A_3033_51B4_41BC_C3F8D8B8F86D",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 1,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_0AEB5577_2D08_CE7B_41B6_192923248F4E",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Sala"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 50,
 "fontSize": 18,
 "label": "SALA ",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.mainPlayList.set('selectedIndex', 0)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_F010CDB0_EE27_E0F3_41CA_A0A7BD04AF3A",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 1,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_0A054365_2D09_CB9F_4145_8C365B373D19",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Cozinha"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 50,
 "fontSize": 18,
 "label": "COZINHA",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 23,
 "iconBeforeLabel": true,
 "click": "this.mainPlayList.set('selectedIndex', 1)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_146FF082_2D09_C695_41C4_13DE74CDAF5E",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 1,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_CB2AC48F_EEE0_60AD_41D4_AF45A5C9B26B",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Sal\u00e3o Festas"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 50,
 "fontSize": 18,
 "label": "SAL\u00c3O DE FESTAS",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_207ECEAD_3035_51EC_41A3_EE49910C654D",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 1,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_CD2D6DF6_EEE1_A07C_41EA_D48A6221E560",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Fndos"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 50,
 "fontSize": 18,
 "label": "FRENTE",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 23,
 "iconBeforeLabel": true,
 "click": "this.mainPlayList.set('selectedIndex', 8)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_CB84BCFF_EEE3_E06D_41ED_0B272180DB22",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 1,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_0B73474A_2D18_CB95_41B5_180037BA80BC",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Lavabo"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "pressedLabel": "Inserdt Text",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 50,
 "fontSize": 18,
 "label": "LAVABO",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.mainPlayList.set('selectedIndex', 5)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_1BA343A6_2D0B_4A9D_41A8_3A02573B3B89",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 1,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_1D2C4FDF_2D7F_BAAB_4198_FBD1E9E469FF",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "2\u00ba Piso"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 50,
 "fontSize": 18,
 "label": "LAVANDERIA",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.mainPlayList.set('selectedIndex', 7)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_F1D73148_EE20_6193_41C0_EA322B73E5B2",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 1,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_1D0C50DE_2D07_C6AD_41C1_CF4547A6CFAB",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Quartos"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 50,
 "fontSize": 18,
 "label": "QUARTOS >",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_168D8311_3106_01EC_41B0_F2D40886AB88, true, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_193B8A52_2D1B_C5B5_41C3_F44FF520A3F0",
 "propagateClick": true,
 "width": 40,
 "scrollBarColor": "#000000",
 "class": "Container",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#5CA1DE"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 2,
 "horizontalAlign": "left",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "blue line"
 },
 "overflow": "visible",
 "shadow": false
},
{
 "propagateClick": true,
 "id": "HTMLText_29DD1615_3597_79DF_41C4_7593739E5260",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "class": "HTMLText",
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": 78,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>Company Name</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>www.loremipsum.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>info@loremipsum.com</I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:14px;font-family:'Oswald Regular';\"><I>Tlf.: +11 111 111 111</I></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText47602"
 },
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "children": [
  "this.IconButton_2B90E40F_3593_B9CB_41B4_408768336038",
  "this.IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83",
  "this.IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7",
  "this.IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F",
  "this.IconButton_2B917411_3593_B9D7_41C6_8D1102463EC5"
 ],
 "layout": "horizontal",
 "id": "Container_2B9EE463_3593_BA7B_4195_8E8F4568BB13",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "class": "Container",
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "bottom",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 56,
 "width": "100%",
 "gap": 7,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "-Container Icons 1"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "propagateClick": false,
 "children": [
  "this.IconButton_2BBEA1DF_35B3_BA4B_41B8_DE69AA453A15",
  "this.IconButton_2A159B11_35B0_EFD6_41C9_DF408F8120FF",
  "this.IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F"
 ],
 "layout": "horizontal",
 "id": "Container_283049D5_35F3_AA5F_419D_20B6A59ABCA6",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "class": "Container",
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 44,
 "width": "100%",
 "gap": 7,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "-Container Icons 2"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_2A2DA53B_310E_001C_41C7_8885E712C50B",
 "width": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 30,
 "paddingLeft": 5,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "rollOverFontFamily": "Oswald",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "rollOverFontSize": 18,
 "height": 50,
 "fontSize": 18,
 "label": "BACK",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "rollOverIconURL": "skin/Button_2A2DA53B_310E_001C_41C7_8885E712C50B_rollover.png",
 "click": "this.setComponentVisibility(this.Container_2A2CB53C_310E_0014_41C3_AB834B10253B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "iconURL": "skin/Button_2A2DA53B_310E_001C_41C7_8885E712C50B.png",
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_2A2DB53B_310E_001C_41BA_0206228E495C",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 1,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "layout": "absolute",
 "id": "Container_1303E3BB_3106_001D_41C8_60D6F4D70B2F",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "class": "Container",
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 8,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_2A2D853B_310E_001C_41C4_1C2E2BAFC35D",
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Main Entrance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "rollOverShadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_2A2DE53B_310E_001C_41BB_C7AB6950A4DD",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lobby",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 23,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_2A2C253B_310E_001C_41B6_D3A7F4F68C3E",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "pressedLabel": "Reception",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Reception",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_2A2C053B_310E_001C_41A2_583DE489828C",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Meeting Area 1",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_2A2C753B_310E_001C_41C4_B649CCC20E3D",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Meeting Area 2",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_2A2C553C_310E_0014_41C4_86393D0ADCC7",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Bar",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_15EF2665_3106_0035_41AE_9BACA1A48D02",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 7"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Chill Out",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_15F5A318_3106_001C_41C5_9AA2EF2184CF",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 8"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Terrace",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_1203FDB8_3106_001C_41B6_C9BE8EDD0DA9",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 9"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 0,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Garden",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_13D4FC1E_310A_0017_41BA_DDA6D071C1BA",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 0,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1",
 "width": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 30,
 "paddingLeft": 5,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "rollOverFontFamily": "Oswald",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "rollOverFontSize": 18,
 "height": 50,
 "fontSize": 18,
 "label": "BACK",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "rollOverIconURL": "skin/Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1_rollover.png",
 "click": "this.setComponentVisibility(this.Container_159EADDD_31FA_0014_41C8_8A5203EC627B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "iconURL": "skin/Button_15A15DDC_31FA_0014_41A4_CE4305FEC7D1.png",
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_15A14DDC_31FA_0014_41BE_C93192DD207E",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 1,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "layout": "absolute",
 "id": "Container_15A16DDC_31FA_0014_4199_0FBF7553300D",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "class": "Container",
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 8,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_15A10DDC_31FA_0014_4185_021C898E177D",
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "rollOverShadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_15A13DDC_31FA_0014_41C5_41AE80876834",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 23,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_15A12DDC_31FA_0014_416B_ED845741AE5F",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "pressedLabel": "Lorem Ipsum",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_159EDDDC_31FA_0014_419A_61C18E43FE01",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_159ECDDC_31FA_0014_41B9_2D5AB1021813",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_159EFDDC_31FA_0014_41C6_9CF7032F84E0",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_159EEDDC_31FA_0014_41B6_22A86B2D2FEB",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 7"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_159E9DDC_31FA_0015_41B6_CB1D433C7673",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 8"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_159E8DDD_31FA_0014_41C5_F18F441AF371",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 9"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_159EBDDD_31FA_0014_41C8_935504B30727",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_1757CD7D_31FA_0015_4143_A9E37B16A50B",
 "width": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 30,
 "paddingLeft": 5,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "rollOverFontFamily": "Oswald",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "rollOverFontSize": 18,
 "height": 50,
 "fontSize": 18,
 "label": "BACK",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "rollOverIconURL": "skin/Button_1757CD7D_31FA_0015_4143_A9E37B16A50B_rollover.png",
 "click": "this.setComponentVisibility(this.Container_17569D7D_31FA_0015_41C4_CBC688763A8D, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "iconURL": "skin/Button_1757CD7D_31FA_0015_4143_A9E37B16A50B.png",
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_17579D7D_31FA_0015_41A1_D2B94269F28D",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 1,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "layout": "absolute",
 "id": "Container_17578D7D_31FA_0015_41BE_353D3005648A",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "class": "Container",
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 8,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_1757AD7D_31FA_0015_41C7_FB79F56FA149",
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "rollOverShadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17565D7D_31FA_0015_4193_78BBCB2DC70F",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 23,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17564D7D_31FA_0015_41B8_A9191CD56C52",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "pressedLabel": "Lorem Ipsum",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17567D7D_31FA_0015_41C2_1E0D0AF05C7A",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17566D7D_31FA_0015_41AD_98D7C60C694F",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17561D7D_31FA_0015_41B5_BD72FAC26B8B",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17560D7D_31FA_0015_41C4_7F0EC7540CC2",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 7"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17562D7D_31FA_0015_41A3_96B282B30DBA",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 8"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_1756DD7D_31FA_0015_41A5_988B67FCF8B7",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 9"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_1756FD7D_31FA_0015_41C7_DA2AAC2AAAEC",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_175A5214_31FA_0014_4198_930DF49BADD9",
 "width": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 30,
 "paddingLeft": 5,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "rollOverFontFamily": "Oswald",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "rollOverFontSize": 18,
 "height": 50,
 "fontSize": 18,
 "label": "BACK",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "rollOverIconURL": "skin/Button_175A5214_31FA_0014_4198_930DF49BADD9_rollover.png",
 "click": "this.setComponentVisibility(this.Container_1758A215_31FA_0014_41B6_9A4A5384548B, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "iconURL": "skin/Button_175A5214_31FA_0014_4198_930DF49BADD9.png",
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_175A4215_31FA_0014_41B2_5B8676CC3F2F",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 1,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "layout": "absolute",
 "id": "Container_1759B215_31FA_0014_41C0_84C99CBD5517",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "class": "Container",
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 8,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_1759A215_31FA_0014_41C7_F6B1044E5BB3",
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "rollOverShadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17598215_31FA_0014_41AC_1166AB319171",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 23,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_1759F215_31FA_0014_41BD_BBFA5FB0D882",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "pressedLabel": "Lorem Ipsum",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_1759D215_31FA_0014_41AD_B6C5744A0B97",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17593215_31FA_0014_41C0_42BAFB0080F0",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17592215_31FA_0014_41B2_AA3B5CC318B8",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17590215_31FA_0014_41C1_2B2D012DCC76",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 7"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17597215_31FA_0014_41C0_9BEE1DE4D7F6",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 8"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17596215_31FA_0014_41C6_A42670770708",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 9"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_1758B215_31FA_0014_41BC_C4EAC2A9544B",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C",
 "width": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 30,
 "paddingLeft": 5,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "rollOverFontFamily": "Oswald",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "rollOverFontSize": 18,
 "height": 50,
 "fontSize": 18,
 "label": "BACK",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "rollOverIconURL": "skin/Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C_rollover.png",
 "click": "this.setComponentVisibility(this.Container_17EBA2B7_3106_0014_41A9_D6C96D0633AE, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "iconURL": "skin/Button_17EA82B7_3106_0014_41C2_C9B0D9E6F22C.png",
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_17EA92B7_3106_0014_41A6_2B88DF32BBA7",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 1,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "layout": "absolute",
 "id": "Container_17EAA2B7_3106_0014_41B0_ACBB1485A79E",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "class": "Container",
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 8,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17EAB2B7_3106_0014_41A7_209417AD3E9A",
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "rollOverShadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17EAD2B7_3106_0014_41C0_0B5453B4841D",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 23,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17EAE2B7_3106_0014_41C7_DB7FC43AAEE0",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "pressedLabel": "Lorem Ipsum",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17EB02B7_3106_0014_41AF_05D9AC36B189",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 4"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17EB32B7_3106_0014_41C8_467BF6AECBE8",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 5"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17EB42B7_3106_0014_41B0_CE70CBDDF438",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 6"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17EB52B7_3106_0014_419C_439E593AEC43",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 7"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17EB62B7_3106_0014_41C5_43B38271B353",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 8"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17EB72B7_3106_0014_41B9_61857077BF4A",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 9"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_17EB92B7_3106_0014_41B2_34A3E3F63779",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 10"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Lorem Ipsum",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.setComponentVisibility(this.Container_22BB12F4_3075_D173_4184_EC3BC4955417, true, 0, null, null, false); this.setComponentVisibility(this.Container_21627DB7_302D_53FD_41B2_58A68D7DB3D4, true, 0, null, null, false); this.setComponentVisibility(this.Container_2FBFE191_3AA1_A2D1_4144_E7F6523C83CD, false, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_168CA310_3106_01EC_41C7_72CE0522951A",
 "width": "100%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button <BACK"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 30,
 "paddingLeft": 5,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "rollOverFontFamily": "Oswald",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "rollOverFontSize": 18,
 "height": 50,
 "fontSize": 18,
 "label": "VOLTAR",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "rollOverIconURL": "skin/Button_168CA310_3106_01EC_41C7_72CE0522951A_rollover.png",
 "click": "this.setComponentVisibility(this.Container_168D8311_3106_01EC_41B0_F2D40886AB88, false, 0, null, null, false); this.setComponentVisibility(this.Container_0A898462_2D0B_4D94_41B3_BDB53B7688EE, true, 0, null, null, false)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 30,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "iconURL": "skin/Button_168CA310_3106_01EC_41C7_72CE0522951A.png",
 "fontWeight": "normal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_168C8310_3106_01EC_4187_B16F315A4A23",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "scrollBarVisible": "rollOver",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "contentOpaque": false,
 "height": 1,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.5,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "layout": "absolute",
 "id": "Container_168D7310_3106_01EC_41BE_5FCBD9E27BE4",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "class": "Container",
 "paddingLeft": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 8,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_168D6310_3106_01EC_41B8_A0B6BE627547",
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 1"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Su\u00edte",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.mainPlayList.set('selectedIndex', 2)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "rollOverShadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverShadowBlurRadius": 18,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_168D3310_3106_01EC_41AC_5D524E4677A5",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 3"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "pressedLabel": "Lorem Ipsum",
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Quarto 2",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.mainPlayList.set('selectedIndex', 4)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_168D5310_3106_01EC_41B5_96D9387401B8",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Button text 2"
 },
 "shadowColor": "#000000",
 "fontFamily": "Oswald",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "borderSize": 0,
 "class": "Button",
 "iconHeight": 32,
 "paddingLeft": 10,
 "paddingRight": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderColor": "#000000",
 "minWidth": 1,
 "mode": "push",
 "height": 36,
 "fontSize": 18,
 "label": "Quarto 3",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 6,
 "gap": 23,
 "iconBeforeLabel": true,
 "click": "this.mainPlayList.set('selectedIndex', 6)",
 "fontStyle": "italic",
 "paddingTop": 0,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "rollOverBackgroundOpacity": 0.8,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "100%",
 "fontWeight": "normal"
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "maxHeight": 101,
 "maxWidth": 101,
 "id": "IconButton_2B90E40F_3593_B9CB_41B4_408768336038",
 "width": 44,
 "borderSize": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "push",
 "height": 44,
 "click": "this.setComponentVisibility(this.Container_C0489276_F1E3_E07C_41E9_87D51CEBEE88, true, 0, null, null, false)",
 "iconURL": "skin/IconButton_2B90E40F_3593_B9CB_41B4_408768336038.png",
 "rollOverIconURL": "skin/IconButton_2B90E40F_3593_B9CB_41B4_408768336038_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "IconButton Info"
 },
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 101,
 "maxWidth": 101,
 "id": "IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83",
 "width": 44,
 "borderSize": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "push",
 "height": 44,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "iconURL": "skin/IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83.png",
 "rollOverIconURL": "skin/IconButton_2B90C410_3593_B9D5_41AB_13AB96397D83_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "IconButton Thumblist"
 },
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 101,
 "maxWidth": 101,
 "id": "IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7",
 "width": 44,
 "borderSize": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "push",
 "height": 44,
 "click": "this.setComponentVisibility(this.Container_C1683B43_EE61_A195_41DE_7017FDAE4F77, true, 0, null, null, false)",
 "iconURL": "skin/IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7.png",
 "rollOverIconURL": "skin/IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_2B721244_35B1_D9BD_41C8_FCB90D5BD7F7_pressed.png",
 "data": {
  "name": "IconButton Realtor"
 },
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 101,
 "maxWidth": 101,
 "id": "IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F",
 "width": 44,
 "borderSize": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "push",
 "height": 44,
 "iconURL": "skin/IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F.png",
 "rollOverIconURL": "skin/IconButton_2B90A410_3593_B9D5_41B7_0B5CCA80EF0F_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "IconButton Location"
 },
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 101,
 "maxWidth": 101,
 "id": "IconButton_2B917411_3593_B9D7_41C6_8D1102463EC5",
 "width": 44,
 "borderSize": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "push",
 "height": 44,
 "click": "this.setComponentVisibility(this.Container_C8831989_EEE0_A095_41DB_1CBE787C0DF9, true, 0, null, null, false)",
 "iconURL": "skin/IconButton_2B917411_3593_B9D7_41C6_8D1102463EC5.png",
 "rollOverIconURL": "skin/IconButton_2B917411_3593_B9D7_41C6_8D1102463EC5_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "IconButton Photoalbum"
 },
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "maxHeight": 101,
 "maxWidth": 101,
 "id": "IconButton_2BBEA1DF_35B3_BA4B_41B8_DE69AA453A15",
 "width": 44,
 "borderSize": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "push",
 "height": 44,
 "iconURL": "skin/IconButton_2BBEA1DF_35B3_BA4B_41B8_DE69AA453A15.png",
 "rollOverIconURL": "skin/IconButton_2BBEA1DF_35B3_BA4B_41B8_DE69AA453A15_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "IconButton Floorplan"
 },
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 101,
 "maxWidth": 101,
 "id": "IconButton_2A159B11_35B0_EFD6_41C9_DF408F8120FF",
 "width": 44,
 "borderSize": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "push",
 "height": 44,
 "iconURL": "skin/IconButton_2A159B11_35B0_EFD6_41C9_DF408F8120FF.png",
 "rollOverIconURL": "skin/IconButton_2A159B11_35B0_EFD6_41C9_DF408F8120FF_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "IconButton Video"
 },
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 101,
 "maxWidth": 101,
 "id": "IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F",
 "width": 50,
 "borderSize": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "push",
 "height": 50,
 "iconURL": "skin/IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_2B371BEA_35AF_6E75_41C9_D7DBED7ABF6F_pressed.png",
 "visible": false,
 "data": {
  "name": "IconButton --"
 },
 "cursor": "hand"
}],
 "width": "100%"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
