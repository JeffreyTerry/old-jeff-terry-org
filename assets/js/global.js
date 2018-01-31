// Google Analytics stuff
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-52425810-4');


String.prototype.nthIndexOf = function(substring, n) {
    index = -1;
    while (n > 0) {
        index = this.indexOf(substring, index + 1);
        if (index == -1)
            return -1;  // This string does not contain n occurences of the substring.
        n--;
    }
    return index;
};
