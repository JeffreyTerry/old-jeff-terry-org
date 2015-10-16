function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

$(function() {
    encodingMap = {'$': '855', '(': '991', ',': '481', '0': '871', '4': '365', '8': '269', '<': '437', '@': '986', 'D': '255', 'H': '235', 'L': '341', 'P': '662', 'T': '854', 'X': '769', '\\': '465', '`': '138', 'd': '131', 'h': '458', 'l': '775', 'p': '522', 't': '624', 'x': '679', '|': '242', '#': '457', "'": '778', '+': '796', '/': '686', '3': '593', '7': '358', ';': '793', '?': '823', 'C': '267', 'G': '484', 'K': '252', 'O': '768', 'S': '426', 'W': '475', '[': '165', '_': '272', 'c': '275', 'g': '417', 'k': '956', 'o': '428', 's': '375', 'w': '853', '{': '573', '"': '113', '&': '258', '*': '177', '.': '568', '2': '895', '6': '328', ':': '231', '>': '977', 'B': '462', 'F': '436', 'J': '873', 'N': '163', 'R': '885', 'V': '464', 'Z': '791', '^': '821', 'b': '694', 'f': '135', 'j': '587', 'n': '431', 'r': '691', 'v': '559', 'z': '614', '~': '414', '!': '529', '%': '122', ')': '337', '-': '632', '1': '293', '5': '799', '9': '882', '=': '485', 'A': '712', 'E': '168', 'I': '988', 'M': '295', 'Q': '446', 'U': '381', 'Y': '952', ']': '197', 'a': '349', 'e': '394', 'i': '825', 'm': '671', 'q': '521', 'u': '189', 'y': '884', '}': '256', ' ': '987'};
    reverseEncodingMap = {'768': 'O', '769': 'X', '662': 'P', '131': 'd', '135': 'f', '138': '`', '691': 'r', '694': 'b', '341': 'L', '349': 'a', '991': '(', '679': 'x', '712': 'A', '122': '%', '267': 'C', '269': '8', '414': '~', '417': 'g', '825': 'i', '295': 'M', '821': '^', '293': '1', '823': '?', '593': '3', '587': 'j', '197': ']', '986': '@', '987': ' ', '252': 'K', '272': '_', '275': 'c', '113': '"', '394': 'e', '796': '+', '793': ';', '791': 'Z', '799': '5', '428': 'o', '521': 'q', '522': 'p', '365': '4', '529': '!', '426': 'S', '977': '>', '446': 'Q', '381': 'U', '242': '|', '375': 's', '436': 'F', '437': '<', '431': 'n', '458': 'h', '624': 't', '573': '{', '337': ')', '988': 'I', '457': '#', '258': '&', '177': '*', '256': '}', '255': 'D', '854': 'T', '855': '$', '853': 'w', '189': 'u', '568': '.', '632': '-', '956': 'k', '465': '\\', '464': 'V', '462': 'B', '168': 'E', '165': '[', '163': 'N', '882': '9', '559': 'v', '885': 'R', '884': 'y', '235': 'H', '231': ':', '952': 'Y', '873': 'J', '871': '0', '328': '6', '775': 'l', '895': '2', '778': "'", '614': 'z', '671': 'm', '485': '=', '484': 'G', '481': ',', '475': 'W', '686': '/', '358': '7'};


    var encoderValue = '';
    var encodedValue = '';
    $('#encoder').bind('input propertychange', function() {
        var value = this.value;
        if (value.length > encoderValue.length) {
            var letterToEncode = value.substr(value.length - 1);
            encoderValue += letterToEncode;
            if (encodingMap[letterToEncode])
                if (encodedValue.length % 4 !== 0)
                    encodedValue += ',';
                encodedValue += encodingMap[letterToEncode];
        } else {
            encoderValue = encoderValue.substring(0, value.length);
            encodedValue = encodedValue.substring(0, value.length * 4 - 1);
        }
        $('#encoded-text').html(encodedValue);
    });


    var decoderValue = '';
    var decodedValue = '';
    $('#decoder').bind('input propertychange', function() {
        var value = replaceAll(',', '', this.value);
        if (value.length === decoderValue.length + 3) {
            var numberToEncode = value.substr(value.length - 3);
            decoderValue += numberToEncode;
            if (reverseEncodingMap[numberToEncode])
                decodedValue += reverseEncodingMap[numberToEncode];
        } else if (value.length > decoderValue.length + 3 || (value.length < decoderValue.length && value.length % 3 == 0)) {  // This case will happen if somebody pastes into the textarea
            decoderValue = value;
            decodedValue = '';
            for (var i = 0; i < decoderValue.length; i += 3) {
                var numberToEncode = decoderValue.substring(i, i + 3);
                if (reverseEncodingMap[numberToEncode])
                    decodedValue += reverseEncodingMap[numberToEncode];
            }
        }
        $('#decoded-text').html(decodedValue);
    });

});
