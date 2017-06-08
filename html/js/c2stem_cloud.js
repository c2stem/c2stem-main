/**
 * Created by hasanm on 6/8/2017.
 */

Cloud.prototype.loadUserProgress = function (
    id,
    callBack,
    errorCall
) {
    // id is Username=username&projectName=projectname,
    // where the values are url-component encoded
    // callBack is a single argument function, errorCall take two args
    var request = new XMLHttpRequest(),
        myself = this;
    try {
        request.open(
            "GET",
            (this.hasProtocol() ? '' : 'http://')
            + this.url + 'getUserProgress'
            + '?'
            + id,
            true
        );
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        request.withCredentials = true;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    if (request.responseText.indexOf('ERROR') === 0) {
                        errorCall.call(
                            this,
                            request.responseText
                        );
                    } else {
                        callBack.call(
                            null,
                            request.responseText
                        );
                    }
                } else {
                    errorCall.call(
                        null,
                        myself.url + 'Public',
                        localize('could not connect to:')
                    );
                }
            }
        };
        request.send(null);
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};

Cloud.prototype.saveUserProgress = function (ide, userTaskData, callBack, errorCall) {
    var myself = this,
        pdata,
        media,
        size,
        mediaSize,
        userTaskDataString,
        userTaskDataSize;

    ide.serializer.isCollectingMedia = true;
    pdata = ide.serializer.serialize(ide.stage);
    media = ide.serializer.mediaXML(ide.projectName);
    ide.serializer.isCollectingMedia = false;
    ide.serializer.flushMedia();
    userTaskDataString = userTaskData? JSON.stringify(userTaskData): "";

    userTaskDataSize = userTaskDataString? userTaskDataString.length : 0;
    mediaSize = media ? media.length : 0;
    size = pdata.length + mediaSize + userTaskDataSize;

    if (mediaSize > 10485760) {
        new DialogBoxMorph().inform(
            'Snap!Cloud - Cannot Save Project',
            'The media inside this project exceeds 10 MB.\n' +
            'Please reduce the size of costumes or sounds.\n',
            ide.world(),
            ide.cloudIcon(null, new Color(180, 0, 0))
        );
        throw new Error('Project media exceeds 10 MB size limit');
    }

    // check if serialized data can be parsed back again
    try {
        ide.serializer.parse(pdata);
    } catch (err) {
        ide.showMessage('Serialization of program data failed:\n' + err);
        throw new Error('Serialization of program data failed:\n' + err);
    }
    if (media !== null) {
        try {
            ide.serializer.parse(media);
        } catch (err) {
            ide.showMessage('Serialization of media failed:\n' + err);
            throw new Error('Serialization of media failed:\n' + err);
        }
    }
    ide.serializer.isCollectingMedia = false;
    ide.serializer.flushMedia();

    ide.showMessage('Uploading ' + Math.round(size / 1024) + ' KB...');
    myself.reconnect(
        function () {
            myself.callService(
                'saveUserProgress',
                function (response, url) {
                    callBack.call(null, response, url);
                    myself.disconnect();
                    ide.hasChangedMedia = false;
                },
                errorCall,
                [
                    ide.projectName,
                    pdata,
                    media,
                    pdata.length,
                    media ? media.length : 0,
                    userTaskDataString,
                    userTaskDataString? userTaskDataString.length : 0
                ]
            );
        },
        errorCall
    );
};
