//mp1102
document.addEventListener('DOMContentLoaded', function () {
    (function () {
        var urlParams = new URLSearchParams(window.location.search);

        function sanitizeParam(param) {
            return param.replace(/\+/g, '_')  
                        .replace(/-/g, '_d_')  
                        .replace(/\//g, '')     
                        .replace(/ /g, '_');  
        }

        if (urlParams.has('SubID2')) {
            var SubID2 = urlParams.get('SubID2');
            var sanitizedsub2 = sanitizeParam(SubID2);
            urlParams.set('SubID2', sanitizedsub2);
        }

//        if (urlParams.has('SubID')) {
//            var SubID = urlParams.get('SubID');
//            var sanitizedSubID = sanitizeParam(SubID);
//            urlParams.set('SubID', sanitizedSubID);
//        }

//        if (urlParams.has('gclid')) {
//            urlParams.delete('gclid');
//        }

/* Tạm không sử dụng mẫu tracking GG  */

           if (urlParams.has('gclid')) {
               var gclid = urlParams.get('gclid');
               var sanitizedGclid = sanitizeParam(gclid);
               urlParams.set('gclid', sanitizedGclid);
           }
/* Tạm không sử dụng mẫu tracking GG  */


        if (urlParams.has('gad_source')) {
            urlParams.delete('gad_source');
        }
      
        var trackingId = urlParams.get('gclid') || urlParams.get('gbraid') || urlParams.get('wbraid') || urlParams.get('msclkid') || urlParams.get('fbclid');

        if (urlParams.toString()) {
            var links = document.getElementsByTagName('a');
            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                var hash = link.hash;
                var hrefWithoutHash = link.href.split('#')[0];
                var linkParams = new URL(hrefWithoutHash, document.location.href).searchParams;

                if (linkParams.has('SubID') && trackingId) {
                   trackingId = sanitizeParam(trackingId);
                }

                if (trackingId) {
                    hrefWithoutHash = hrefWithoutHash.replace('[cnlid]', trackingId).replace('%5Bcnlid%5D', trackingId);
                }

                var queryString = urlParams.toString();
                if (hrefWithoutHash.indexOf('?') === -1) {
                    hrefWithoutHash += '?' + queryString;
                } else {
                    hrefWithoutHash += '&' + queryString;
                }
                link.href = hrefWithoutHash + hash;
            }
        }
    })();
});
