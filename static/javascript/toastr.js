(function(a) {
    a(["jquery"],
    function(b) {
        return (function() {
            var d = "2.0.1";
            var m;
            var e;
            var t = 0;
            var c = {
                error: "error",
                info: "info",
                success: "success",
                warning: "warning"
            };
            var s = {
                clear: l,
                error: o,
                getContainer: p,
                info: r,
                options: {},
                subscribe: g,
                success: f,
                version: d,
                warning: n
            };
            return s;
            function o(v, w, u) {
                return k({
                    type: c.error,
                    iconClass: i().iconClasses.error,
                    message: v,
                    optionsOverride: u,
                    title: w
                })
            }
            function r(v, w, u) {
                return k({
                    type: c.info,
                    iconClass: i().iconClasses.info,
                    message: v,
                    optionsOverride: u,
                    title: w
                })
            }
            function g(u) {
                e = u
            }
            function f(v, w, u) {
                return k({
                    type: c.success,
                    iconClass: i().iconClasses.success,
                    message: v,
                    optionsOverride: u,
                    title: w
                })
            }
            function n(v, w, u) {
                return k({
                    type: c.warning,
                    iconClass: i().iconClasses.warning,
                    message: v,
                    optionsOverride: u,
                    title: w
                })
            }
            function l(u) {
                var v = i();
                if (!m) {
                    p(v)
                }
                if (u && b(":focus", u).length === 0) {
                    u[v.hideMethod]({
                        duration: v.hideDuration,
                        easing: v.hideEasing,
                        complete: function() {
                            j(u)
                        }
                    });
                    return
                }
                if (m.children().length) {
                    m[v.hideMethod]({
                        duration: v.hideDuration,
                        easing: v.hideEasing,
                        complete: function() {
                            m.remove()
                        }
                    })
                }
            }
            function h() {
                return {
                    tapToDismiss: true,
                    toastClass: "toast",
                    containerId: "toast-container",
                    debug: false,
                    showMethod: "fadeIn",
                    showDuration: 300,
                    showEasing: "swing",
                    onShown: undefined,
                    hideMethod: "fadeOut",
                    hideDuration: 1000,
                    hideEasing: "swing",
                    onHidden: undefined,
                    extendedTimeOut: 1000,
                    iconClasses: {
                        error: "toast-error",
                        info: "toast-info",
                        success: "toast-success",
                        warning: "toast-warning"
                    },
                    iconClass: "toast-info",
                    positionClass: "toast-top-right",
                    timeOut: 5000,
                    titleClass: "toast-title",
                    messageClass: "toast-message",
                    target: "body",
                    closeHtml: "<button>&times;</button>",
                    newestOnTop: true
                }
            }
            function q(u) {
                if (!e) {
                    return
                }
                e(u)
            }
            function k(v) {
                var F = i(),
                D = v.iconClass || F.iconClass;
                if (typeof(v.optionsOverride) !== "undefined") {
                    F = b.extend(F, v.optionsOverride);
                    D = v.optionsOverride.iconClass || D
                }
                t++;
                m = p(F);
                var E = null,
                y = b("<div/>"),
                A = b("<div/>"),
                u = b("<div/>"),
                B = b(F.closeHtml),
                z = {
                    toastId: t,
                    state: "visible",
                    startTime: new Date(),
                    options: F,
                    map: v
                };
                if (v.iconClass) {
                    y.addClass(F.toastClass).addClass(D)
                }
                if (v.title) {
                    A.append(v.title).addClass(F.titleClass);
                    y.append(A)
                }
                if (v.message) {
                    u.append(v.message).addClass(F.messageClass);
                    y.append(u)
                }
                if (F.closeButton) {
                    B.addClass("toast-close-button");
                    y.prepend(B)
                }
                y.hide();
                if (F.newestOnTop) {
                    m.prepend(y)
                } else {
                    m.append(y)
                }
                y[F.showMethod]({
                    duration: F.showDuration,
                    easing: F.showEasing,
                    complete: F.onShown
                });
                if (F.timeOut > 0) {
                    E = setTimeout(x, F.timeOut)
                }
                y.hover(w, C);
                if (!F.onclick && F.tapToDismiss) {
                    y.click(x)
                }
                if (F.closeButton && B) {
                    B.click(function(G) {
                        G.stopPropagation();
                        x(true)
                    })
                }
                if (F.onclick) {
                    y.click(function() {
                        F.onclick();
                        x()
                    })
                }
                q(z);
                if (F.debug && console) {
                    console.log(z)
                }
                return y;
                function x(G) {
                    if (b(":focus", y).length && !G) {
                        return
                    }
                    return y[F.hideMethod]({
                        duration: F.hideDuration,
                        easing: F.hideEasing,
                        complete: function() {
                            j(y);
                            if (F.onHidden) {
                                F.onHidden()
                            }
                            z.state = "hidden";
                            z.endTime = new Date(),
                            q(z)
                        }
                    })
                }
                function C() {
                    if (F.timeOut > 0 || F.extendedTimeOut > 0) {
                        E = setTimeout(x, F.extendedTimeOut)
                    }
                }
                function w() {
                    clearTimeout(E);
                    y.stop(true, true)[F.showMethod]({
                        duration: F.showDuration,
                        easing: F.showEasing
                    })
                }
            }
            function p(u) {
                if (!u) {
                    u = i()
                }
                m = b("#" + u.containerId);
                if (m.length) {
                    return m
                }
                m = b("<div/>").attr("id", u.containerId).addClass(u.positionClass);
                m.appendTo(b(u.target));
                return m
            }
            function i() {
                return b.extend({},
                h(), s.options)
            }
            function j(u) {
                if (!m) {
                    m = p()
                }
                if (u.is(":visible")) {
                    return
                }
                u.remove();
                u = null;
                if (m.children().length === 0) {
                    m.remove()
                }
            }
        })()
    })
} (typeof define === "function" && define.amd ? define: function(b, a) {
    if (typeof module !== "undefined" && module.exports) {
        module.exports = a(require(b[0]))
    } else {
        window.toastr = a(window.jQuery)
    }
}));