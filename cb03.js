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

        if (urlParams.has('aff_sub1')) {
            var aff_sub1 = urlParams.get('aff_sub1');
            var sanitizedsub1 = sanitizeParam(aff_sub1);
            urlParams.set('aff_sub1', sanitizedsub1);
        }


        if (urlParams.has('gclid')) {
            var gclid = urlParams.get('gclid');
            // var sanitizedgclid = sanitizeParam(gclid);
            urlParams.set('extclid', gclid);
            // urlParams.delete('gclid');
        }

       /* if (urlParams.has('gad_source')) {
            urlParams.delete('gad_source');
        } */
      
        var trackingId = urlParams.get('gclid') || urlParams.get('extclid') || urlParams.get('gbraid') || urlParams.get('wbraid') || urlParams.get('msclkid') || urlParams.get('fbclid');

        if (urlParams.toString()) {
            var links = document.getElementsByTagName('a');
            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                var hash = link.hash;
                var hrefWithoutHash = link.href.split('#')[0];
                var linkParams = new URL(hrefWithoutHash, document.location.href).searchParams;

                if (linkParams.has('tid') && trackingId) {
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
