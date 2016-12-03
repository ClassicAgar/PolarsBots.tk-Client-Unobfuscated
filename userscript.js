// ==UserScript==
// @name        PolarsBots.tk client (Unobfuscated)
// @namespace    In Game
// @version      5.2
// @description  V.5 Interface (unravelled the secrets!)
// @author       partyguy / monster
// @match       *.cellcraft.io/*
// @match       *.agar-network.com/*
// @match       *.agarios.com/*
// @match       *.bhax.org/*
// @match       *.mgar.io/*
// @match       *.agariogame.club/*
// @match       *.old.ogarul.io/*
// @match       *.agarly.com/*
// @match       *.bubble.am/*
// @match       *.playex3.tk/*
// @match       *.agariohub.net/*
// @match       *.agarserv.com/*
// @match       *.agarioservers.ga/*
// @match       *.alis.io/*
// @match       *.agarioplay.org/*
// @match       *.agario.city/*
// @match       *.germs.io/*
// @match       *.agarioforums.io/*
// @match       *.agariofun.com/*
// @match       *.agar.pro/*
// @match       *.agarabi.com/*
// @match       *.warball.co/*
// @match       *.agariom.net/*
// @match       *.agar.re/*
// @match       *.agarpx.com/*
// @match       *.easyagario.com/*
// @match       *.playagario.org/*
// @match       *.agariofr.com/*
// @match       *.agario.xyz/*
// @match       *.agarios.org/*
// @match       *.agariowun.com/*
// @match       *.usagar.com/*
// @match       *.agarioplay.com/*
// @match       *.privateagario.net/*
// @match       *.agariorage.com/*
// @match       *.blong.io/*
// @match       *.agar.blue/*
// @match       *.agar.bio/*
// @match       *.agario.se/*
// @match       *.nbkio.com/*
// @match       *.agariohit.com/*
// @match       *.agariomultiplayer.com/*
// @match       *.agariogameplay.com/*
// @match       *.agariowow.com/*
// @match       *.bestagario.net/*
// @match       *.tytio.com/*
// @match       *.kralagario.com/*
// @match       *.agario.zafer2.com/*
// @match       *.agarprivateserver.net/*
// @match       *.agarca.com/*
// @match       *.agarioplay.mobi/*
// @match       *.agario.mobi*
// @match       *.abs0rb.me/*
// @match       *.agario.us/*
// @match       *.agariojoy.com/*
// @match       *.agario.ch/*
// @match       *.ioagar.us/*
// @match       *.play.agario0.com/*
// @match       *.agario.run/*
// @match       *.agarpvp.us/*
// @match       *.agario.pw/*
// @match       *.ogario.net/*
// @match       *.ogario.net/*
// @match       *.nbk.io/*
// @match       *.agario.info/*
// @match       *.inciagario.com/*
// @match       *.agar.io.biz.tr/*
// @match       *.agariown.com/*
// @match       *.agario.dk/*
// @match       *.agario.lol/*
// @match       *.agario.gen.tr/*
// @match       *.agarioprivateserver.us/*
// @match       *.agariot.com/*
// @match       *.agarw.com/*
// @match       *.agario.city/*
// @match       *.agario.ovh/*
// @match       *.feedy.io/*
// @match       *.agar.zircon.at/*
// @match       *.xn--80aaiv4ak.xn--p1ai/*
// @updateURL    
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

setTimeout(function() {
    window['__WebSocket'] = window['WebSocket'];
    window['fakeWebSocket'] = function() {
        return {
            readyState: 0
        }
    };
    window['_WebSocket'] = window['WebSocket'] = function(ip) {
        return new window['fakeWebSocket'](ip)
    };
    window['botclonsData'] = {};
    window['botclonsData']['mx'] = 0;
    window['botclonsData']['my'] = 0;
    window['botclonsData']['ml'] = 0;
    window['botclonsData']['ma'] = 0;
    window['botclonsData']['mb'] = 0;
    window['botclonsData']['wa'] = false;
    window['botclonsData']['sa'] = false;
    window['botclonsData']['w'] = null;
    window['botclonsData']['s'] = null;
    window['botclonsData']['aX'] = -1;
    window['botclonsData']['aY'] = -1;
    window['botclonsData']['p'] = 0;
    window['botclonsData']['q'] = false;
    window['botclonsData']['socketaddr'] = null;
    window['addEventListener']('load', function() {
        if (!window['OldSocket']) {
            OldSocket = window['__WebSocket']
        };
        window['_WebSocket'] = window['WebSocket'] = window['fakeWebSocket'] = function(ip) {
            var ws = new OldSocket(ip);
            ws['binaryType'] = 'arraybuffer';
            var fakeWS = {};
            for (var i in ws) {
                fakeWS[i] = ws[i]
            };
            fakeWS['send'] = function() {
                var msg = new DataView(arguments[0]);
                if (msg['byteLength'] == 21) {
                    if (msg['getInt8'](0, true) == 16) {
                        window['botclonsData']['mx'] = msg['getFloat64'](1, true);
                        window['botclonsData']['my'] = msg['getFloat64'](9, true);
                        window['botclonsData']['ml'] = msg['byteLength']
                    }
                } else {
                    if (msg['byteLength'] == 13) {
                        if (msg['getUint8'](0, true) == 16) {
                            window['botclonsData']['mx'] = msg['getInt32'](1, true);
                            window['botclonsData']['my'] = msg['getInt32'](5, true);
                            window['botclonsData']['ml'] = msg['byteLength']
                        } else {
                            if (msg['byteLength'] > 4) {
                                if (msg['getUint8'](0, true) == 16) {
                                    window['botclonsData']['mx'] = msg['getInt16'](1, true);
                                    window['botclonsData']['my'] = msg['getInt16'](3, true);
                                    window['botclonsData']['ml'] = msg['byteLength']
                                }
                            }
                        }
                    }
                };
                return ws['send']['apply'](ws, arguments)
            };
            ws['onmessage'] = function() {
                var msg = new DataView(arguments[0]['data']);
                if (msg['byteLength'] > 16) {
                    if (msg['getUint8'](0, true) == 64) {
                        window['botclonsData']['ma'] = msg['getFloat64'](1, true);
                        window['botclonsData']['mb'] = msg['getFloat64'](9, true)
                    }
                };
                fakeWS['onmessage'] && fakeWS['onmessage']['apply'](ws, arguments)
            };
            ws['onopen'] = function() {
                window['botclonsData']['socketaddr'] = ws['url'];
                fakeWS['readyState'] = 1;
                fakeWS['onopen']['apply'](ws, arguments)
            };
            ws['onclose'] = function() {
                fakeWS['onclose']['apply'](ws, arguments)
            };
            return fakeWS
        };
        if (location['origin'] == 'http://cellcraft.io' || location['origin'] == 'http://agarioforums.io') {
            connect('')
        }
    });
    var real_minx = -7071;
    var real_miny = -7071;
    var real_maxx = 7071;
    var real_maxy = 7071;
    var lastsent = {
        minx: 0,
        miny: 0,
        maxx: 0,
        maxy: 0
    };

    function valcompare(Y, Z) {
        return 0.01 > Y - Z && -0.01 < Y - Z
    }
    var socket = io['connect']('ws://127.0.0.1:8081');
    var canMove = true;
    var movetoMouse = true;
    var moveEvent = new Array(2);
    var canvas = document['getElementById']('canvas');
    last_transmited_game_server = null;
    socket['on']('force-login', function(data) {
        socket['emit']('login', {
            "uuid": client_uuid,
            "type": 'client'
        });
        transmit_game_server()
    });
    $('#canvas')['after']('<div style=\'background-color: #000000; -moz-opacity: 0.4; -khtml-opacity: 0.4; opacity: 0.4; filter: alpha(opacity=40); zoom: .87; width:235px; top: 10px; left:10px; display: block; position: absolute; text-align: center; font-size: 15px; color: #ffffff; padding: 5px; font-family: Ubuntu;\'> <div style=\'color:#ff7070; display: inline; -moz-opacity:1; -khtml-opacity: 1; opacity:1; filter:alpha(opacity=100); padding: 10px;\'><u>PolarsBots.Tk</u></div> <div style=\'color:#ffffff; display: inline; -moz-opacity:1; -khtml-opacity: 1; opacity:1; filter:alpha(opacity=100); padding: 10px;\'><br>Package: <a style=\'color:#42f498\' id=\'currentpackage\'>Admin</a><br> No Package? Get One!<hr>Minions: <a style=\'color:#42f498\' id=\'minionCount\' >Connecting...</a> </div> <div style=\'color:#ffffff; display: inline; -moz-opacity:1; -khtml-opacity: 1; opacity:1; filter:alpha(opacity=100); padding: 10px;\'><br>Split Minions: <a style=\'color:#42f498\'>E</a><br>Minions Feed: <a style=\'color:#42f498\'>R</a><hr>Move To Mouse: <a style=\'color:#42f498\' id=\'ismoveToMouse\' >On</a> </div> <div style=\'color:#ffffff; display: inline; -moz-opacity:1; -khtml-opacity: 1; opacity:1; filter:alpha(opacity=100); padding: 10px;\'><br>Collect Pellets: <a style=\'color:#42f498\' id=\'isStopMove\' >Off</a><br><u style=\'color: #ff7070\'>PolarsBots.Tk</u> </div>');
    socket['on']('spawn-count', function(data) {
        document['getElementById']('minionCount')['innerHTML'] = data
    });
    var client_uuid = localStorage['getItem']('client_uuid');
    if (client_uuid == null) {
        console['log']('generating a uuid for this user');
        client_uuid = '';
        var ranStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var ii = 0; ii < 15; ii++) {
            client_uuid += ranStr['charAt'](Math['floor'](Math['random']() * ranStr['length']))
        };
        localStorage['setItem']('client_uuid', client_uuid)
    };
    socket['emit']('login', client_uuid);
    $('#instructions')['replaceWith']('<br><div class="input-group"><span class="input-group-addon" id="basic-addon1">UUID</span><input type="text" value="' + client_uuid + '" readonly class="form-control"</div>');

    function isMe(cell) {
        for (var i = 0; i < window['agar']['myCells']['length']; i++) {
            if (window['agar']['myCells'][i] == cell['id']) {
                return true
            }
        };
        return false
    }

    function getCell() {
        var me = [];
        for (var key in window['agar']['allCells']) {
            var cell = window['agar']['allCells'][key];
            if (isMe(cell)) {
                me['push'](cell)
            }
        };
        return me[0]
    }
    var skin_var = 0;

    function emitPosition() {
        console['log'](client_uuid);
        socket['emit']('pos', {
            "x": window['botclonsData']['mx'] - window['botclonsData']['ma'],
            "y": window['botclonsData']['my'] - window['botclonsData']['mb'],
            "l": window['botclonsData']['ml'],
            "\x70": window['botclonsData']['p'],
            "\x63": window['botclonsData']['q']
        });
        document['getElementById']('gh45nmvsy')['innerHTML'] = (~~(window['botclonsData']['mx'] - window['botclonsData']['ma'])) + ',' + (~~(window['botclonsData']['my'] - window['botclonsData']['mb']))
    }

    function toggleMovement() {
        canMove = !canMove;
        switch (canMove) {
            case true:
                canvas['onmousemove'] = moveEvent[0];
                moveEvent[0] = null;
                canvas['onmousedown'] = moveEvent[1];
                moveEvent[1] = null;
                break;
            case false:
                canvas['onmousemove']({
                    clientX: innerWidth / 2,
                    clientY: innerHeight / 2
                });
                moveEvent[0] = canvas['onmousemove'];
                canvas['onmousemove'] = null;
                moveEvent[1] = canvas['onmousedown'];
                canvas['onmousedown'] = null;
                break
        }
    }
    interval_id = setInterval(function() {
        emitPosition()
    }, 100);
    interval_id2 = setInterval(function() {
        transmit_game_server_if_changed()
    }, 5000);
    document['addEventListener']('keydown', function(e) {
        var key = e['keyCode'] || e['which'];
        switch (key) {
            case 16:
                if (!window['botclonsData']['sa']) {
                    window['botclonsData']['sa'] = true;
                    window['botclonsData']['s'] = setInterval(function() {
                        $('body')['trigger']($.Event('keydown', {
                            keyCode: 32
                        }));
                        $('body')['trigger']($.Event('keyup', {
                            keyCode: 32
                        }))
                    }, 10)
                };
                break;
            case 87:
                if (!window['botclonsData']['wa']) {
                    window['botclonsData']['wa'] = true;
                    window['botclonsData']['w'] = setInterval(function() {
                        $('body')['trigger']($.Event('keydown', {
                            keyCode: 87
                        }));
                        $('body')['trigger']($.Event('keyup', {
                            keyCode: 87
                        }))
                    }, 10)
                };
                break;
            case 65:
                window['botclonsData']['p']--;
                document['getElementById']('ismoveToMouse')['innerHTML'] = window['botclonsData']['p'];
                break;
            case 67:
                window['botclonsData']['q'] = !window['botclonsData']['q'];
                if (window['botclonsData']['q']) {
                    document['getElementById']('dfdghehfj')['innerHTML'] = 'On'
                } else {
                    document['getElementById']('dfdghehfj')['innerHTML'] = 'Off'
                };
                break;
            case 69:
                socket['emit']('cmd', {
                    "name": 'split'
                });
                break;
            case 82:
                socket['emit']('cmd', {
                    "name": 'eject'
                });
                break;
            case 80:
                window['botclonsData']['p']++;
                document['getElementById']('ismoveToMouse')['innerHTML'] = window['botclonsData']['p'];
                break
        }
    });
    document['addEventListener']('keyup', function(e) {
        var key = e['keyCode'] || e['which'];
        console['log'](key);
        switch (key) {
            case 87:
                clearInterval(window['botclonsData']['w']);
                window['botclonsData']['wa'] = false;
                break;
            case 16:
                clearInterval(window['botclonsData']['s']);
                window['botclonsData']['sa'] = false;
                break
        }
    });

    function transmit_game_server_if_changed() {
        if (last_transmited_game_server != window['botclonsData']['socketaddr']) {
            transmit_game_server()
        }
    }

    function transmit_game_server() {
        last_transmited_game_server = window['botclonsData']['socketaddr'];
        socket['emit']('cmd', {
            "name": 'connect_server',
            "ip": window['botclonsData']['socketaddr'],
            "origin": location['origin']
        })
    }
    var mouseX = 0;
    var mouseY = 0;
    $('body')['mousemove'](function(event) {
        mouseX = event['clientX'];
        mouseY = event['clientY']
    })
}, 200)