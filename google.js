var jQ = !1
  , q2c = "0 1 2 3 4 5 6 7 8 9 . E digit_unary_minus Rnd".split(" ")
  , r2c = "0123456789".split("")
  , s2c = "sin cos tan arcsin arccos arctan ln log unary_minus sqrt".split(" ")
  , t2c = ["squared", "!", "%"]
  , u2c = "+ - * implicit_mul / ^ root".split(" ")
  , v2c = "sin cos tan arcsin arccos arctan ln log sqrt squared ! %".split(" ")
  , w2c = [.9999999999998099, 676.5203681218851, -1259.1392167224028, 771.3234287776531, -176.6150291621406, 12.507343278686905, -.13857109526572012, 9.984369578019572E-6, 1.5056327351493116E-7]
  ,Na= function(a,b,c){return Array.prototype.indexOf.call(a,b,c)}
  , kQ = function(a) {
    return !isNaN(parseFloat(a)) || -1 != Na(q2c, a)
}
  , x2c = function(a) {
    return "pi" == a || "e" == a || "Ans" == a
}
  , lQ = function(a) {
    return -1 != Na(s2c, a)
}
  , mQ = function(a) {
    return -1 != Na(t2c, a)
}
  , y2c = function(a) {
    return nQ(a) || mQ(a) || "unary_minus" == a
}
  , nQ = function(a) {
    return -1 != Na(u2c, a)
}
  , z2c = function(a) {
    return -1 != Na(v2c, a) ? 5 : "^" == a || "root" == a ? 4 : "unary_minus" == a ? 3 : "*" == a || "implicit_mul" == a || "/" == a ? 2 : "+" == a || "-" == a ? 1 : 0
}
  , C2c = function(a, b, c) {
    switch (a) {
    case "sin":
        return jQ && (b = b * Math.PI / 180),
        0 == b / Math.PI % 1 ? 0 : Math.sin(b);
    case "cos":
        return jQ && (b = b * Math.PI / 180),
        0 == (b / Math.PI - .5) % 1 ? 0 : Math.cos(b);
    case "tan":
        jQ && (b = b * Math.PI / 180);
        if (0 == b / Math.PI % 1)
            return 0;
        if (0 == (b / Math.PI - .5) % 1)
            break;
        return Math.tan(b);
    case "arcsin":
        return c = Math.asin(b),
        jQ ? 180 * c / Math.PI : c;
    case "arccos":
        return c = Math.acos(b),
        jQ ? 180 * c / Math.PI : c;
    case "arctan":
        return c = Math.atan(b),
        jQ ? 180 * c / Math.PI : c;
    case "ln":
        return Math.log(b);
    case "log":
        return Math.log(b) * Math.LOG10E;
    case "unary_minus":
        return -b;
    case "sqrt":
        return Math.sqrt(b);
    case "squared":
        return b * b;
    case "!":
        return A2c(b);
    case "%":
        return b / 100;
    case "+":
        return b + c;
    case "-":
        return b - c;
    case "*":
    case "implicit_mul":
        return b * c;
    case "/":
        return b / c;
    case "^":
        return B2c(b, c, 1 / c);
    case "root":
        return B2c(b, 1 / c, c)
    }
    return null
}
  , B2c = function(a, b, c) {
    c = null != c ? c : 1 / b;
    b = null != b ? b : 1 / c;
    return 1 == Math.abs(c % 2) || 1 == Math.abs(D2c(c) % 2) ? (c = 0 > a ? -1 : 1,
    c * Math.pow(c * a, b)) : Math.pow(a, b)
}
  , D2c = function(a) {
    if (null == a || isNaN(a) || !isFinite(a))
        return a;
    var b = a.toPrecision(14).toLowerCase().split("e")
      , c = b[0];
    if (-1 == c.indexOf("."))
        return a;
    var d = c.replace(/0*$/, "");
    return d.length < c.length - 3 ? parseFloat(d + (1 < b.length ? "e" + b[1] : "")) : a
}
  , E2c = function(a, b) {
    return z2c(a) < z2c(b)
}
  , F2c = function(a, b) {
    return z2c(a) <= z2c(b)
}
  , G2c = function(a) {
    if (.5 > a)
        return Math.PI / (Math.sin(Math.PI * a) * G2c(1 - a));
    --a;
    for (var b = w2c[0], c = a + 7.5, d = 1; d < w2c.length; d++)
        b += w2c[d] / (a + d);
    return Math.sqrt(2 * Math.PI) * Math.pow(c, a + .5) * Math.exp(-c) * b
}
  , A2c = function(a) {
    if (Math.round(a) == a) {
        if (0 > a)
            return NaN;
        if (171 <= a)
            return Infinity;
        for (var b = 1, c = 2; c <= a; ++c)
            b *= c;
        return b
    }
    return G2c(a + 1)
};
var H2c = function(a) {
    if (!a)
        return null;
    for (var b = [], c = 0; c < a.length; ++c) {
        var d = a[c];
        if (isNaN(parseFloat(d))) {
            var e = d;
            if (lQ(e) || mQ(e)) {
                if (0 == b.length)
                    return null;
                e = b.pop();
                d = C2c(d, e, void 0);
                d = D2c(d);
                if (null == d)
                    return null;
                b.push(d)
            } else if (nQ(d)) {
                if (2 > b.length)
                    return null;
                var f = b.pop();
                e = b.pop();
                d = C2c(d, e, f);
                d = D2c(d);
                if (null == d)
                    return null;
                b.push(d)
            } else
                return null
        } else
            b.push(d)
    }
    return 1 != b.length ? null : b.pop()
}
  , J2c = function(a) {
    if (!a)
        return null;
    for (var b = 0; b < a.length; ++b)
        if ("%" == a[b]) {
            var c = b - 1
              , d = I2c(a, c);
            if (-1 == d)
                return null;
            !a[c] || "+" != a[d - 1] && "-" != a[d - 1] || (a = a.slice(0, d - 1).concat(["*", "(", 100]).concat(a.slice(d - 1, b)).concat([")"]).concat(a.slice(b)),
            b += 4)
        }
    return a
}
  , I2c = function(a, b) {
    if (mQ(a[b]))
        return 0 == b ? -1 : I2c(a, b - 1);
    if (")" == a[b]) {
        var c = 1
          , d = 0;
        for (--b; 0 <= b; --b)
            if ("(" == a[b] && c--,
            ")" == a[b] && c++,
            0 == c) {
                d = b;
                break
            }
        return 0 == c ? d - (lQ(a[d - 1]) ? 1 : 0) : -1
    }
    return b
};
var K2c = function(a, b, c) {
    this.wa = d(a) && null != b && "" != a ? a : null;
    this.$ = [];
    this.Da = [];
    this.Aa = !1;
    this.Ca = 0;
    this.Ba = null != b ? D2c(parseFloat(b)) : null;
    isNaN(this.Ba) && (this.Ba = null);
    this.Fa = c;
    null != this.wa && null != b && (a = parseFloat(b),
    b = D2c(Math.abs(a)),
    0 > a && this.$.push("unary_minus"),
    this.$.push(b),
    this.Aa = !0);
    jQ = !1;
    this.wa && (-1 == this.wa.indexOf("deg") || -1 == this.wa.indexOf("sin") && -1 == this.wa.indexOf("cos") && -1 == this.wa.indexOf("tan") && -1 == this.wa.indexOf("tg") && -1 == this.wa.indexOf("cot") && -1 == this.wa.indexOf("ctg") || (jQ = !0))
}
  , L2c = function(a, b) {
    return a.replace(RegExp("(" + b.join("|") + ")*$"), "").length
}
  , M2c = ["!", "%", "squared", "consecutive_squared"]
  , N2c = "sin cos tan arcsin arccos arctan ln log sqrt root".split(" ")
  , O2c = function(a) {
    var b = (1 / 0).toString()
      , c = L2c(a, M2c);
    if (")" == a[c - 1]) {
        b = 1;
        for (c -= 2; 0 <= c && ("(" == a[c] && --b,
        0 != b); --c)
            ;
        return L2c(a.substring(0, c), N2c)
    }
    b = L2c(a.substring(0, c), ["<b>\u03c0</b>", "<b>e</b>", "Ans", b]);
    return b != c ? b : a.substring(0, b).replace(/(([0-9]+(\.[0-9]*)?)|(\.[0-9]+))((E|e)(-|\+)?[0-9]+)?$/g, "").length
}
  , oQ = function(a, b) {
    for (a = P2c(a, null != b ? b : a.$, 0, 0).toString(); -1 != (b = a.lastIndexOf("consecutive_squared")); ) {
        var c = O2c(a.substring(0, b));
        a = a.substring(0, c) + "(" + a.substring(c, b) + ')<span style="font-size:0;color:white;">^</span><sup>2</sup>' + a.substring(b + 19)
    }
    return a = a.replace(/squared/g, '<span style="font-size:0;color:white;">^</span><sup>2</sup>')
}
  , pQ = function(a, b) {
    var c = !1
      , d = a.$[a.$.length - 1]
      , e = a.$[a.$.length - 2]
      , f = oQ(a);
    if ("ERROR" == d || "NaN" == f)
        a.$ = [];
    if ("BACK" == b) {
        b = a.$;
        d = b.pop();
        e = b[b.length - 1];
        if ("(" == d && lQ(e) || a.Aa && "unary_minus" == e && 1 == b.length)
            b.pop(),
            c = !0;
        "implicit_mul" == b[b.length - 1] && (b.pop(),
        c = !0);
        0 == b.length && (a.Aa = !1);
        return c
    }
    if ("unary_minus" == d && (nQ(b) || "=" == b) || "(" == d && mQ(b))
        return c;
    if ("=" == b) {
        a.Aa && (a.$ = a.Da);
        c = a.$;
        b = a.Ba;
        d = [];
        e = "";
        for (f = 0; f < c.length; ++f) {
            var g = c[f];
            "Rnd" != g && (kQ(g) || !isNaN(parseFloat(g)) ? e += "digit_unary_minus" == g ? "-" : g : ("" != e && (d.push(parseFloat(e)),
            e = ""),
            "pi" == g && (g = Math.PI),
            "e" == g && (g = Math.E),
            "Ans" == g && (g = null != b ? b : 0),
            d.push(g)))
        }
        "" != e && d.push(parseFloat(e));
        if (c = J2c(d)) {
            b: {
                d = c;
                c = [];
                b = [];
                for (e = 0; e < d.length; ++e)
                    if (f = d[e],
                    !isNaN(parseFloat(f)))
                        c.push(f);
                    else if (lQ(f) && "unary_minus" != f)
                        b.push(f);
                    else if (y2c(f)) {
                        if (0 < b.length)
                            for (g = b[b.length - 1]; y2c(g) && ("^" != f && "root" != f && "unary_minus" != f && F2c(f, g) || ("^" == f || "root" == f) && E2c(f, g)); )
                                b.pop(),
                                c.push(g),
                                g = b[b.length - 1];
                        b.push(f)
                    } else if ("(" == f)
                        b.push("(");
                    else if (")" == f) {
                        for (; 0 < b.length && "(" != b[b.length - 1]; )
                            f = b.pop(),
                            c.push(f);
                        if (0 == b.length) {
                            c = null;
                            break b
                        }
                        b.pop();
                        f = b[b.length - 1];
                        0 < b.length && lQ(f) && "unary_minus" != f && (f = b.pop(),
                        c.push(f))
                    }
                for (; 0 < b.length; ) {
                    d = b.pop();
                    if ("(" == d || ")" == d) {
                        c = null;
                        break b
                    }
                    c.push(d)
                }
            }
            c = H2c(c)
        } else
            c = null;
        null == c ? 0 == a.$.length ? c = 0 : c = "ERROR" : isNaN(c) ? c = "ERROR" : a.Ba = c;
        a.Da = a.$;
        a.$ = [];
        0 > c && (a.$.push("unary_minus"),
        c = -c);
        a.$.push(c);
        return a.Aa = !0
    }
    if ("E" == d)
        if ("-" == b)
            b = "digit_unary_minus";
        else if (-1 == Na(r2c, b))
            return c;
    if ("digit_unary_minus" == d && -1 == Na(r2c, b))
        return c;
    if (")" == b) {
        for (g = f = 0; g < a.$.length; ++g)
            "(" == a.$[g] ? ++f : ")" == a.$[g] && --f;
        if (0 >= f || "(" == d || nQ(d))
            return c
    }
    !a.Aa || nQ(b) || mQ(b) || "E" == b || (a.$ = [],
    d = null);
    a.Aa = !1;
    if (0 == a.$.length) {
        if ("-" == b)
            return a.$.push("unary_minus"),
            !0;
        if (nQ(b) || mQ(b))
            return a.$.push("0"),
            a.$.push(b),
            !0
    }
    if (kQ(b) && "." != b && 0 < a.$.length && "0" == d && (1 == a.$.length || !kQ(e)))
        return a.$.pop(),
        a.$.push(b),
        !0;
    if ("-" == b && (nQ(d) || "(" == d || "unary_minus" == d))
        return "+" == d || "-" == d ? (a.$.pop(),
        a.$.push("-")) : "unary_minus" == d ? a.$.pop() : a.$.push("unary_minus"),
        !0;
    !(kQ(d) && "E" != d || x2c(d) || ")" == d || mQ(d)) || !(lQ(b) || kQ(b) && "E" != b || x2c(b) || "(" == b) || kQ(d) && "Rnd" != d && kQ(b) || ("unary_minus" == b || kQ(b) || x2c(d) && x2c(b) || "Ans" == d && lQ(b) ? a.$.push("*") : a.$.push("implicit_mul"),
    c = !0);
    if ("." == b)
        for (e = a.$.length - 1; 0 <= e; --e) {
            f = a.$[e];
            if ("E" == f || "Rnd" == f || "." == f)
                return c;
            if (!kQ(f))
                break
        }
    if ("E" == b)
        for (e = a.$.length - 1; 0 <= e; --e) {
            f = a.$[e];
            if ("E" == f)
                return c;
            if (!kQ(f))
                break
        }
    nQ(d) && (nQ(b) || mQ(b) || "squared" == b) && a.$.pop();
    a.$.push(b);
    lQ(b) && a.$.push("(");
    return !0
}
  , Qfc = function(a, b) {
    if ("void" == b || "Ans" == b && null == a.Ba || "deg" == b || "rad" == b)
        return oQ(a);
    a.wa = null;
    var c = a.$[a.$.length - 1];
    if ("(" == c && nQ(b) && "-" != b)
        return oQ(a);
    switch (b) {
    case "10^":
        kQ(c) && pQ(a, "*");
        pQ(a, "1");
        pQ(a, "0");
        pQ(a, "^");
        break;
    case "e_to":
        pQ(a, "e");
        pQ(a, "^");
        break;
    case "(":
        pQ(a, "(");
        break;
    case "=":
        for (; pQ(a, ")"); )
            ;
        a.wa = a.Aa ? oQ(a, a.Da) : oQ(a);
        pQ(a, "=");
        a.Fa && a.Fa(fb("op=" + a.wa));
        break;
    case "Rnd":
        kQ(c) && !a.Aa && pQ(a, "*");
        b = Math.floor(Math.random() * Math.pow(10, 7));
        pQ(a, "0");
        pQ(a, ".");
        b = b.toString();
        for (c = 0; c < b.length; ++c)
            pQ(a, b[c]);
        pQ(a, "Rnd");
        break;
    case "E":
        (-1 != Na(r2c, c) || "Rnd" == c || a.Aa) && pQ(a, b);
        break;
    default:
        pQ(a, b)
    }
    return oQ(a)
};
K2c.prototype.isEmpty = function() {
    return 0 == this.$.length
}
;
var R2c = function(a) {
    var b = a.$[a.$.length - 1];
    return !a.isEmpty() && !nQ(b) && "unary_minus" != b
};
var S2c = ["rad deg ! ( ) % BACK".split(" "), "void sin ln 7 8 9 /".split(" "), "pi cos log 4 5 6 *".split(" "), "e tan sqrt 1 2 3 -".split(" "), "Ans E ^ 0 . = +".split(" ")]
  , T2c = [[], [, "arcsin", "e_to"], [, "arccos", "10^"], [, "arctan", "squared"], ["Rnd", , "root"]]
  , U2c = {
    8: "BACK",
    13: "=",
    33: "!",
    37: "%",
    40: "(",
    41: ")",
    42: "*",
    43: "+",
    44: ".",
    45: "-",
    46: ".",
    47: "/",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    61: "=",
    65: "Ans",
    67: "arccos",
    69: "E",
    71: "log",
    76: "ln",
    80: "pi",
    81: "sqrt",
    82: "Rnd",
    83: "arcsin",
    84: "arctan",
    94: "^",
    97: "Ans",
    99: "cos",
    101: "e",
    103: "log",
    108: "ln",
    112: "pi",
    113: "sqrt",
    114: "root",
    115: "sin",
    116: "tan"
}
  , qQ = function(a) {
    this.Ta = Math.round(1E12 * Math.random());
    this.Na = this.Ma = !1;
    this.$ = new K2c(a.lhs,a.rhs,0 == this.Ta % 100 ? g(this.Ca, this) : void 0);
    V2c(this);
    puc();
    W2c(this);
    this.Ga = null;
    this.Ha = this.Da = this.wa = 0;
    this.Ka = NaN;
    this.Aa = this.Ba = this.Fa = !1;
    jQ && (jQ = !1,
    X2c());
    Y2c = g(function() {
        this.Ca("dm" + (window.orientation % 180 ? "l" : "p"))
    }, this);
    Cm(Y2c);
    if (this.Ia = !k.product.Ar) {
        var b = document.getElementById("cwrdc");
        b && Q(b, "cwrdca");
        (b = o("cwsbts-ns")) && Q(b, "cwsbtsa-ns")
    }
    this.Ca(a.lhs ? "cq" : "nq");
    this.Ra = this.Qa = ""
}
  , Y2c = function() {}
  , W2c = function(a) {
    var b = l("cwtlbb")
      , c = l("cwtltblr")
      , d = l("cwmcwd");
    s(c, "mousedown", function() {
        Q(b, "cwtlbs");
        c.focus()
    });
    s(c, "blur", function() {
        R(b, "cwtlbh");
        R(b, "cwtlbs")
    });
    s(d, "mouseover", function() {
        Q(b, "cwtlbh")
    });
    s(d, "mouseout", function() {
        R(b, "cwtlbh")
    });
    s(c, "keydown", g(a.Lb, a));
    s(c, "keypress", g(a.rb, a));
    s(c, "keyup", g(a.Hb, a))
};
qQ.prototype.Lb = function(a) {
    91 == mma(a.keyCode) && (this.Ba = !0);
    a.ctrlKey || 9 == a.keyCode || this.Ba || (27 == a.keyCode ? (a = l("cwtltblr")) && a.blur() : (a.stopPropagation(),
    8 == a.keyCode && (a.preventDefault(),
    Z2c(this, Qfc(this.$, "BACK")))))
}
;
qQ.prototype.Hb = function(a) {
    91 == mma(a.keyCode) && (this.Ba = !1)
}
;
qQ.prototype.rb = function(a) {
    if (!a.ctrlKey && !this.Ba) {
        var b = a.zd;
        b = U2c[b.which || b.keyCode];
        a.stopPropagation();
        d(b) && ("=" != b || R2c(this.$)) && (Z2c(this, Qfc(this.$, b)),
        _2c(this),
        "=" == b && (u_b(this),
        02c(),
        12c(this)))
    }
}
;
var 22c = function(a) {
    a.Ba = !1;
    Q(l("cwtlbb"), "cwtlbs");
    (a = l("cwtltblr")) && a.focus()
}
  , V2c = function(a) {
    for (var b = g(function(g) {
        this.Ga = C(g(this.Va, this, g), 700)
    }, a), c = 0; 5 > c; ++c)
        for (var d = 0; 7 > d; ++d)
            for (var e = n("cwbt" + c + d), f = 0; f < e.length; f++)
                32c(a, e[f], g(a.Ob, a, c, d), 0 == c && 6 == d ? b : void 0);
    (b = l("cwrdc")) && 32c(a, b, g(a.Ze, a));
    (b = o("cwsbsb-ns")) && 32c(a, b, function() {
        var g = o("cwsbsbc-ns");
        ei(g, "cwsbls-ns");
        ei(g, "cwsbrs-ns");
        g = o("cwsbts-ns");
        ei(g, "cwsbtsl-ns")
    });
    b = l("cwfleb");
    c = g(a.hb, a);
    d = g(a.Za, a);
    a = g(a.Xa, a);
    1l && (2Ca(b, c, d, a, a),
    b.addEventListener("touchleave", a, !1));
    s(b, "mousedown", c);
    s(b, "mousemove", d);
    s(b, ["mouseup", "mouseout"], a)
}
  , puc = function() {
    var a = l("cwhob")
      , b = l("cwhcb")
      , c = l("cwhp")
      , d = l("cwhc");
    a && b && c && (s(c, "focusout", function(e) {
        c.contains(e.relatedTarget) || v(c, !1)
    }),
    s(a, "click", function() {
        v(c, !0);
        c.focus();
        d.scrollTop = d.scrollHeight
    }),
    s(b, "click", function() {
        return v(c, !1)
    }))
}
  , 12c = function(a) {
    if (a.Ia) {
        var b = document.getElementById("cwotbl")
          , c = document.getElementById("cwletbl");
        b && c && (Q(b, "cwtltblaf"),
        Q(c, "cwletblaf"),
        C(Ja(function() {
            R(b, "cwtltblaf");
            R(c, "cwletblaf")
        }), 10))
    }
};
qQ.prototype.Ob = function(a, b) {
    if (1 == a && 0 == b)
        42c(this);
    else {
        var c = (this.Aa ? T2c[a][b] : void 0) || S2c[a][b]
          , d = "=" == c && R2c(this.$);
        ("=" != c || d) && Z2c(this, Qfc(this.$, c));
        22c(this);
        3 > b && !this.Na && (this.Ca("psb"),
        this.Na = !0);
        3 <= b && !this.Ma && (this.Ca("pbb"),
        this.Ma = !0);
        0 != a || 0 != b && 1 != b ? (this.Aa && 42c(this),
        4 == a && 5 == b ? (u_b(this),
        02c(),
        12c(this)) : 0 == a && 6 == b && aG(this.Ga),
        _2c(this)) : X2c()
    }
}
;
qQ.prototype.Ze = function() {
    X2c();
    22c(this)
}
;
var 42c = function(a) {
    a.Aa = !a.Aa;
    for (var b = n("cwbg1"), c = n("cwbg2"), d = 0; d < b.length; ++d)
        v(b[d], !a.Aa);
    for (b = 0; b < c.length; ++b)
        v(c[b], a.Aa);
    (c = l("cwinvbtn")) && (a.Aa ? di(c, "cwdgb-tpl", "cwlgb-tpl") : di(c, "cwlgb-tpl", "cwdgb-tpl"))
}
  , u_b = function(a) {
    var b = l("cwnhtb")
      , c = l("cwhc");
    if (c && b && R2c(a.$)) {
        var d = a.$.wa
          , e = oQ(a.$)
          , f = d == a.Qa && e == a.Ra;
        if (d && e && !f) {
            a.Qa = d;
            a.Ra = e;
            a = ed("TABLE");
            Q(a, "cwhe");
            f = ed("TD");
            var g = ed("TD")
              , h = ed("TD")
              , k = new x$b(B$b());
            Rc(f, M$b(k, d));
            Rc(g, M$b(k, e));
            Rc(h, M$b(k, "="));
            bi(f, ["cwhee", "cwpc"]);
            bi(g, ["cwhee", "cwpc"]);
            bi(h, ["cwhee", "cwheq"]);
            a.appendChild(f);
            a.appendChild(h);
            a.appendChild(g);
            c.appendChild(a);
            v(b, !1);
            v(c, !0)
        }
    }
};
qQ.prototype.Va = function(a) {
    if (1l) {
        var b = this.wa - 7l(a)[0].clientX;
        a = this.Da - 7l(a)[0].clientY;
        if (400 < b * b + a * a)
            return
    }
    for (; !this.$.isEmpty(); )
        Qfc(this.$, "BACK");
    Z2c(this, oQ(this.$))
}
;
var Z2c = function(a, b) {
    var c = l("cwos")
      , d = new x$b(B$b());
    c && (Rc(c, M$b(d, b)),
    b = l("cwles")) && (a = a.$,
    Rc(b, M$b(d, a.wa ? a.wa + " =" : null != a.Ba ? "Ans = " + a.Ba : "")))
}
  , X2c = function() {
    var a = o("cwrdb-ns");
    a ? (ei(a, "cwsbls-ns"),
    ei(a, "cwsbrs-ns")) : (a = l("cwrdc"),
    jQ ? di(a, "cwdrsbdm", "cwdrsbrm") : di(a, "cwdrsbrm", "cwdrsbdm"));
    jQ = !jQ
}
  , 32c = function(a, b, c, d) {
    var e = g(function(f) {
        var g = h();
        if (1l) {
            var h = 7l(f)[0];
            if (h) {
                var k = h.clientX;
                h = h.clientY;
                if (700 > g - this.Ka) {
                    var l = k - this.wa
                      , m = h - this.Da;
                    400 > l * l + m * m && f.preventDefault()
                }
                this.wa = k;
                this.Da = h;
                this.Ha = g
            }
        }
        d && d();
        this.Ka = g
    }, a);
    a = g(function(f) {
        if (1l) {
            var g = 7l(f)[0];
            if (g) {
                var h = g.clientX;
                g = g.clientY;
                var k = this.wa - h
                  , l = this.Da - g;
                if (400 < k * k + l * l || 1E3 < h() - this.Ha)
                    return;
                this.wa = h;
                this.Da = g
            }
        }
        f.preventDefault();
        c()
    }, a);
    1l && 2Ca(b, e, function() {}, a, a);
    s(b, "mousedown", e);
    s(b, "mouseup", a)
};
qQ.prototype.Ca = function(a) {
    google.log && google.log("sccw", "&ses=" + this.Ta + "&data=" + a)
}
;
var _2c = function(a) {
    var b = l("cwclrbtnAC")
      , c = l("cwclrbtnCE");
    a = a.$.Aa;
    b && c && (v(b, a),
    v(c, !a))
};
qQ.prototype.hb = function(a) {
    this.wa = 1l ? 7l(a)[0].clientX : a.clientX;
    this.Fa = !0;
    k.product.ANDROID && a.preventDefault()
}
;
qQ.prototype.Xa = function() {
    this.Fa = !1
}
;
qQ.prototype.Za = function(a) {
    if (this.Fa) {
        var b = 1l ? 7l(a)[0].clientX : a.clientX;
        a = this.wa - b;
        this.wa = b;
        b = l("cwles");
        var c = u(b).width
          , d = parseFloat(b.style.right) || 0
          , e = l("cwletbl");
        e = u(e).width;
        c < e || 0 < a && 0 <= d || 0 > a && c + d <= e || (b.style.right = d + a + "px")
    }
}
;
var 02c = function() {
    var a = l("cwles");
    a && (a.style.right = "0")
}
  , Uff = {};
_e("cwsc", (Uff.init = function(a) {
    new qQ(a)
}
,
Uff));


