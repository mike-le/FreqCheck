const stem = function stemmer (word) {
    
    c = "[^aeiou]",          // consonant
    v = "[aeiouy]",          // vowel
    C = c + "[^aeiouy]*",    // consonant sequence
    V = v + "[aeiou]*",      // vowel sequence

    mgr0 = new RegExp("^(" + C + ")?" + V + C);                    // [C]VC... is m>0
    meq1 = new RegExp("^(" + C + ")?" + V + C + "(" + V + ")?$");  // [C]VC[V] is m=1
    mgr1 = new RegExp("^(" + C + ")?" + V + C + V + C);            // [C]VCVC...[V] is m>1
    vowel_in_stem = new RegExp("^(" + C + ")?" + v);               // vowel in stem

    var stem, regex;

    // No suffix exists
    if (word.length < 3) { return word; }

    // Check for plurals (-es or -s suffixes)
    regex_es = /^(.+?)(ss|i)es$/;
    regex_s = /^(.+?)([^s])s$/;
    regex_ous = /^(.+?)ous$/;
    if (regex_es.test(word)) { 
        word = word.replace(regex_es,"$1$2"); 
    } else if (regex_s.test(word) && !regex_ous.test(word)) {	
        word = word.replace(regex_s,"$1$2"); 
    }

    // Check for past participles (-eed, -ed, and -ing suffixes)
    regex_eed = /^(.+?)eed$/;
    regex_ed_ing = /^(.+?)(ed|ing)$/;
    if (regex_eed.test(word)) {
        stem = regex_eed.exec(word)[1];
        if (mgr0.test(stem)) {
            regex = /.$/; 
            word = word.replace(regex,""); 
        }
    } else if (regex_ed_ing.test(word)) {
        stem = regex_ed_ing.exec(word)[1]; 
        if (vowel_in_stem.test(stem)) {
            word = stem;
            regex2 = /(at|bl|iz)$/;
            regex3 = new RegExp("([^aeiouylsz])\\1$");
            regex4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
            if (regex2.test(word) || regex4.test(word)) { 
                word = word + "e"; 
            } else if(regex3.test(word)) {
                 regex = /.$/; 
                 word = word.replace(regex,""); 
            } 
        }
    }

    // Check for -i stem words 
    regex_i = /^(.+?)i$/;
    if (regex_i.test(word)) {
        stem = regex_i.exec(word)[1];
        if (vowel_in_stem.test(stem)) { word = stem + "y"; }
    }

    // Check for extra -l on stem word with m > 1
    var regex_ll = /ll$/;
    if (regex_ll.test(word) && mgr1.test(word)) {
        regex = /.$/;
        word = word.replace(regex,"");
    }

    return word;
}

module.exports = { stem }