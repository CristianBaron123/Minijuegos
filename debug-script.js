
// ============================================
// MÓDULO: LALALA
// ============================================
var LALALA = (function() {
// ============================================
// MINIJUEGO: LALALA - Esquiva las bolas
// ============================================

// NOTA: El mapa será inyectado por bot.js
// No se carga aquí para evitar problemas con fs en el contexto del navegador
// ⚠️ IMPORTANTE: mapData debe ser una STRING JSON, no un objeto JavaScript
// Haxball's room.setCustomStadium() requiere string JSON
var mapData = "{\"name\":\"LALALA from HaxMaps\",\"width\":650,\"height\":380,\"bg\":{\"color\":\"4C7296\"},\"vertexes\":[{\"x\":-507,\"y\":163,\"bCoef\":1.2,\"cMask\":[\"red\",\"blue\"]},{\"x\":508,\"y\":163,\"bCoef\":1.2,\"cMask\":[\"red\",\"blue\"]},{\"x\":-507,\"y\":203,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":508,\"y\":203,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":523,\"y\":188,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":523,\"y\":178,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-522,\"y\":188,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-522,\"y\":178,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":523,\"y\":185.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-522,\"y\":185.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":523,\"y\":183,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-522,\"y\":183,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":523,\"y\":180.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-522,\"y\":180.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":522,\"y\":190.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-521,\"y\":190.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":522,\"y\":175.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-521,\"y\":175.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-521,\"y\":193,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":521,\"y\":173,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-520,\"y\":173,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":521,\"y\":178,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-520,\"y\":178,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":520,\"y\":195.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-519,\"y\":195.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":520,\"y\":170.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-519,\"y\":170.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":521,\"y\":193,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-520,\"y\":193,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":518,\"y\":168,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-517,\"y\":168,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":515,\"y\":200.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-514,\"y\":200.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":518,\"y\":198,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-517,\"y\":198,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":515,\"y\":165.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-514,\"y\":165.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-1000,\"y\":-250,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":1000,\"y\":-250,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":-120,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-120,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-1000,\"y\":-240,\"bCoef\":-5,\"cMask\":[\"red\",\"blue\"]},{\"x\":1000,\"y\":-240,\"bCoef\":-5,\"cMask\":[\"red\",\"blue\"]},{\"x\":-160,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-160,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-200,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-200,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-240,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-240,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-320,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-320,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-400,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-400,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-280,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-280,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-360,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-360,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-40,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-40,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-80,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-80,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":120,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":120,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":160,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":160,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":200,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":200,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":240,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":240,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":320,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":320,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":400,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":400,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":280,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":280,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":360,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":360,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":40,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":40,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":80,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":80,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-300,\"y\":-310,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":-300,\"y\":-250,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":300,\"y\":-310,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":300,\"y\":-250,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":-508,\"y\":163,\"bCoef\":1.5,\"cMask\":[\"red\",\"blue\"]},{\"x\":508,\"y\":163,\"bCoef\":1.5,\"cMask\":[\"red\",\"blue\"]}],\"segments\":[{\"v0\":2,\"v1\":3,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":4,\"v1\":3,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":4,\"v1\":5,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":1,\"v1\":5,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"},{\"v0\":2,\"v1\":6,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":6,\"v1\":7,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":7,\"v1\":0,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"},{\"v0\":7,\"v1\":5,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":6,\"v1\":4,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":9,\"v1\":8,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":11,\"v1\":10,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":13,\"v1\":12,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":15,\"v1\":14,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":17,\"v1\":16,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":20,\"v1\":19,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":22,\"v1\":21,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":24,\"v1\":23,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":26,\"v1\":25,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":28,\"v1\":27,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":30,\"v1\":29,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":32,\"v1\":31,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":34,\"v1\":33,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":36,\"v1\":35,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":37,\"v1\":38,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"color\":\"537EA7\"},{\"v0\":39,\"v1\":40,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":40,\"v1\":39,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":41,\"v1\":42,\"bCoef\":-5,\"cMask\":[\"red\",\"blue\"],\"color\":\"555555\"},{\"v0\":43,\"v1\":44,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":44,\"v1\":43,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":45,\"v1\":46,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":46,\"v1\":45,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":47,\"v1\":48,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":48,\"v1\":47,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":49,\"v1\":50,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":50,\"v1\":49,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":51,\"v1\":52,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":52,\"v1\":51,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":53,\"v1\":54,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":54,\"v1\":53,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":55,\"v1\":56,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":56,\"v1\":55,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":57,\"v1\":58,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":58,\"v1\":57,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":59,\"v1\":60,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":60,\"v1\":59,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":61,\"v1\":62,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":62,\"v1\":61,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":63,\"v1\":64,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":64,\"v1\":63,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":65,\"v1\":66,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":66,\"v1\":65,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":67,\"v1\":68,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":68,\"v1\":67,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":69,\"v1\":70,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":70,\"v1\":69,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":71,\"v1\":72,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":72,\"v1\":71,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":73,\"v1\":74,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":74,\"v1\":73,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":75,\"v1\":76,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":76,\"v1\":75,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":77,\"v1\":78,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":78,\"v1\":77,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":79,\"v1\":80,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":80,\"v1\":79,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":81,\"v1\":82,\"bCoef\":0,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"color\":\"537EA7\"},{\"v0\":83,\"v1\":84,\"bCoef\":0,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"color\":\"537EA7\"},{\"v0\":85,\"v1\":86,\"bCoef\":1.5,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"}],\"planes\":[{\"normal\":[0,-1],\"dist\":-400,\"bCoef\":100000,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[1,0],\"dist\":-950,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[-1,0],\"dist\":-950,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,1],\"dist\":-450,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,1],\"dist\":-25,\"bCoef\":0,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"normal\":[0,-1],\"dist\":-450,\"bCoef\":0,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]}],\"goals\":[],\"discs\":[{\"radius\":0.01,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"kick\",\"score\",\"c0\"]},{\"pos\":[0,200],\"speed\":[0,-1],\"radius\":1,\"bCoef\":3,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[900,20],\"speed\":[-0.2,0],\"radius\":250,\"bCoef\":-10000,\"invMass\":1e-107,\"damping\":1,\"color\":\"264B6D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-900,20],\"speed\":[0.2,0],\"radius\":250,\"bCoef\":-10000,\"invMass\":1e-107,\"damping\":1,\"color\":\"264B6D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]}],\"playerPhysics\":{\"bCoef\":1.2,\"invMass\":0.7,\"damping\":0.97,\"acceleration\":0.12,\"kickStrength\":0,\"gravity\":[0,0.2],\"radius\":20},\"ballPhysics\":\"disc0\",\"spawnDistance\":250,\"redSpawnPoints\":[[-120,55],[-200,55],[-280,55],[-360,55],[-40,55],[-160,0],[-240,0],[-320,0],[-400,0],[-80,0],[-875,250]],\"blueSpawnPoints\":[[120,55],[200,55],[280,55],[360,55],[40,55],[160,0],[240,0],[320,0],[400,0],[80,0],[875,250]]}";

// Estado del juego
var gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false
};

// Configuración
var config = {
    minPlayers: 2,
    fallY: 220,        // Y > 220 = cayó
    ballHitY: -230     // Y < -230 = golpeado por bolas
};

// ============================================
// INICIAR JUEGO
// ============================================
function start(room, onGameEnd) {
    console.log('🎮 LALALA - Iniciando juego...');
    console.log('📊 Jugadores:', room.getPlayerList().filter(p => p.id !== 0).length);
    
    try {
        console.log('🗺️ Cargando mapa..., tipo:', typeof mapData);
        if (!mapData) {
            console.error('❌ mapData es null o undefined!');
            return;
        }
        
        room.setCustomStadium(mapData);
        console.log('✅ Mapa cargado');
    } catch (e) {
        console.error('❌ Error al cargar mapa:', e.message);
        return;
    }
    
    // Revolver y asignar equipos
    try {
        shuffleTeams(room);
        console.log('✅ Equipos asignados');
    } catch (e) {
        console.error('❌ Error al asignar equipos:', e.message);
        return;
    }
    
    gameState.active = true;
    gameState.players = room.getPlayerList().filter(p => p.id !== 0);
    gameState.eliminated = [];
    
    room.sendAnnouncement(
        "🎮 LALALA - ESQUIVA LAS BOLAS 🎮\n" +
        "👥 Jugadores: " + gameState.players.length,
        null,
        0x00BFFF,
        "bold",
        2
    );
    
    setTimeout(() => {
        room.startGame();
        room.pauseGame(true);
        
        gameState.chatBlocked = true;
        
        room.sendAnnouncement(
            "\n📋 INSTRUCCIONES:\n" +
            "⚠️ Evita caer de la plataforma del medio\n" +
            "🔵 Esquiva las bolas azules que se mueven\n" +
            "🏆 El último jugador en pie gana!\n\n" +
            "⏱️ El juego comenzará en 5 segundos...",
            null,
            0xFFFF00,
            "bold",
            2
        );
        
        setTimeout(() => {
            room.pauseGame(false);
            gameState.chatBlocked = false;
            room.sendAnnouncement(
                "🟢 ¡COMIENZA!",
                null,
                0x00FF00,
                "bold",
                2
            );
        }, 5000);
    }, 1500);
    
    // Esperar 8 segundos antes de empezar a verificar
    setTimeout(() => {
        gameState.checkInterval = setInterval(() => checkPlayers(room, onGameEnd), 100);
    }, 8500);
}

// ============================================
// VERIFICAR JUGADORES
// ============================================
function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;
    
    var alivePlayers = [];
    
    gameState.players.forEach(p => {
        if (gameState.eliminated.indexOf(p.id) !== -1) return;
        
        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            room.sendAnnouncement("❌ " + p.name + " se desconectó", null, 0xFF6600);
            return;
        }
        
        var pos = player.position;
        if (!pos) return;
        
        var eliminated = false;
        var reason = "";
        
        // Detectar si fue golpeado por las bolas (teleportado muy arriba)
        if (pos.y < config.ballHitY) {
            eliminated = true;
            reason = "fue tocado por las bolas";
            console.log("💥 " + p.name + " tocó las bolas - Y: " + pos.y.toFixed(0));
        }
        
        // Detectar caída
        if (pos.y > config.fallY) {
            eliminated = true;
            reason = "cayó";
            console.log("💀 " + p.name + " cayó - Y: " + pos.y.toFixed(0));
        }
        
        if (eliminated && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            room.setPlayerTeam(p.id, 0);
            
            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement(
                "❌ " + p.name + " " + reason + "! (" + remaining + " restantes)",
                null,
                0xFF6600
            );
        } else if (!eliminated) {
            alivePlayers.push(p);
        }
    });
    
    // Verificar ganador
    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0], onGameEnd);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement("❌ No hay ganador - todos cayeron", null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

// ============================================
// DECLARAR GANADOR
// ============================================
function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    room.sendAnnouncement(
        "\n🏆 ¡¡¡" + winner.name.toUpperCase() + " HA GANADO!!! 🏆\n",
        null,
        0xFFD700,
        "bold",
        2
    );
    
    // Notificar al bot principal que hay un ganador
    setTimeout(() => {
        if (onGameEnd) {
            onGameEnd(winner);
        }
    }, 3000);
}

// ============================================
// REVOLVER EQUIPOS
// ============================================
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(p => p.id !== 0);
    
    // Revolver array
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = players[i];
        players[i] = players[j];
        players[j] = temp;
    }
    
    // Asignar equipos
    var halfPoint = Math.floor(players.length / 2);
    
    for (var i = 0; i < players.length; i++) {
        if (i < halfPoint) {
            room.setPlayerTeam(players[i].id, 1);
        } else {
            room.setPlayerTeam(players[i].id, 2);
        }
    }
}

// ============================================
// DETENER JUEGO
// ============================================
function stop(room) {
    gameState.active = false;
    
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    gameState.players = [];
    gameState.eliminated = [];
    
    room.stopGame();
}

// ============================================
// EVENTOS
// ============================================
function onPlayerLeave(room, player) {
    if (gameState.active && gameState.eliminated.indexOf(player.id) === -1) {
        gameState.eliminated.push(player.id);
    }
}

function onPlayerChat(player) {
    if (gameState.chatBlocked) {
        return false;
    }
    return true;
}

// ============================================
// EXPORTAR
// ============================================
return {
    config,
    start,
    stop,
    onPlayerLeave,
    onPlayerChat,
    isActive: () => gameState.active
};

})();

// ============================================
// MÓDULO: SURVIVAL ROOM
// ============================================
var SURVIVAL = (function() {
// ============================================
// MINIJUEGO: SURVIVAL ROOM - Evita los bordes
// ============================================

// NOTA: El mapa será inyectado por bot.js
// No se carga aquí para evitar problemas con fs en el contexto del navegador
// ⚠️ IMPORTANTE: mapData debe ser una STRING JSON, no un objeto JavaScript
// Haxball's room.setCustomStadium() requiere string JSON
var mapData = "{\"name\":\"Survival Room | Leo\",\"width\":420,\"height\":300,\"bg\":{\"type\":\"hockey\"},\"vertexes\":[{\"x\":-307,\"y\":-306,\"bCoef\":99999999,\"cMask\":[\"red\",\"blue\"]},{\"x\":-307,\"y\":306,\"bCoef\":99999999,\"cMask\":[\"red\",\"blue\"]},{\"x\":-298,\"y\":298,\"bCoef\":-99999999,\"cMask\":[\"red\",\"blue\"]},{\"x\":-298,\"y\":-298,\"bCoef\":-99999999,\"cMask\":[\"red\",\"blue\"]},{\"x\":307,\"y\":-306,\"bCoef\":99999999,\"cMask\":[\"red\",\"blue\"]},{\"x\":307,\"y\":306,\"bCoef\":99999999,\"cMask\":[\"red\",\"blue\"]},{\"x\":298,\"y\":298,\"bCoef\":-99999999,\"cMask\":[\"red\",\"blue\"]},{\"x\":298,\"y\":-298,\"bCoef\":-99999999,\"cMask\":[\"red\",\"blue\"]},{\"x\":-75,\"y\":0,\"bCoef\":0,\"cMask\":[\"wall\"],\"cGroup\":[\"red\",\"blue\"]},{\"x\":75,\"y\":0,\"bCoef\":0,\"cMask\":[\"wall\"],\"cGroup\":[\"red\",\"blue\"]},{\"x\":0,\"y\":-75,\"bCoef\":0,\"cMask\":[\"wall\"],\"cGroup\":[\"red\",\"blue\"]},{\"x\":0,\"y\":75,\"bCoef\":0,\"cMask\":[\"wall\"],\"cGroup\":[\"red\",\"blue\"]},{\"x\":0,\"y\":298.1,\"bCoef\":-99999999,\"cMask\":[\"ball\"]},{\"x\":0,\"y\":-298.1,\"bCoef\":-99999999,\"cMask\":[\"ball\"]}],\"segments\":[{\"v0\":0,\"v1\":1,\"bCoef\":99999999,\"cMask\":[\"red\",\"blue\"]},{\"v0\":2,\"v1\":3,\"bCoef\":-99999999,\"cMask\":[\"red\",\"blue\"]},{\"v0\":4,\"v1\":5,\"bCoef\":99999999,\"cMask\":[\"red\",\"blue\"]},{\"v0\":6,\"v1\":7,\"bCoef\":-99999999,\"cMask\":[\"red\",\"blue\"]},{\"v0\":5,\"v1\":1,\"bCoef\":99999999,\"cMask\":[\"red\",\"blue\"]},{\"v0\":0,\"v1\":4,\"bCoef\":99999999,\"cMask\":[\"red\",\"blue\"]},{\"v0\":3,\"v1\":13,\"bCoef\":-99999999,\"cMask\":[\"red\",\"blue\"]},{\"v0\":13,\"v1\":7,\"bCoef\":-99999999,\"cMask\":[\"red\",\"blue\"]},{\"v0\":2,\"v1\":12,\"bCoef\":-99999999,\"cMask\":[\"red\",\"blue\"]},{\"v0\":12,\"v1\":6,\"bCoef\":-99999999,\"cMask\":[\"red\",\"blue\"]}],\"planes\":[{\"normal\":[-1,0],\"dist\":-18000,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[1,0],\"dist\":-18000,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,1],\"dist\":-340,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,-1],\"dist\":-340,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]}],\"goals\":[],\"discs\":[{\"radius\":0,\"invMass\":0,\"cMask\":[],\"cGroup\":[\"ball\",\"kick\",\"score\"]},{\"pos\":[0,8430],\"speed\":[0,-0.1],\"radius\":8000,\"bCoef\":99999999,\"invMass\":1e-307,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[0,-8430],\"speed\":[0,0.1],\"radius\":8000,\"bCoef\":99999999,\"invMass\":1e-307,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-8430,0],\"speed\":[0.1,0],\"radius\":8000,\"bCoef\":99999999,\"invMass\":1e-307,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[8430,0],\"speed\":[-0.1,0],\"radius\":8000,\"bCoef\":99999999,\"invMass\":1e-307,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]}],\"playerPhysics\":{\"bCoef\":1.4,\"invMass\":1e+307,\"damping\":0.99,\"acceleration\":0.03,\"kickingAcceleration\":0.03,\"kickingDamping\":0.99,\"kickStrength\":0},\"ballPhysics\":\"disc0\",\"spawnDistance\":150}";

// Estado del juego
var gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false
};

// Configuración
var config = {
    minPlayers: 2,
    outOfBoundsDistance: 320  // Si X o Y > 320 = fuera del mapa
};

// ============================================
// INICIAR JUEGO
// ============================================
function start(room, onGameEnd) {
    console.log('🔴 SURVIVAL - Iniciando juego...');
    console.log('📊 Jugadores:', room.getPlayerList().filter(p => p.id !== 0).length);
    
    room.setCustomStadium(mapData);
    console.log('✅ Mapa cargado');
    
    // Revolver y asignar equipos
    shuffleTeams(room);
    console.log('✅ Equipos asignados');
    
    gameState.active = true;
    gameState.players = room.getPlayerList().filter(p => p.id !== 0);
    gameState.eliminated = [];
    
    // Mover a espectador a los jugadores que deben estar en spectator
    botState.spectatorNext.forEach(function(playerId) {
        var player = room.getPlayer(playerId);
        if (player) {
            room.setPlayerTeam(playerId, 0);
            room.sendAnnouncement(
                "👻 " + player.name + " debe esperar este minijuego",
                null,
                0xFF6600,
                "bold"
            );
        }
    });
    // Limpiar la lista después de aplicar
    botState.spectatorNext = [];
    
    room.sendAnnouncement(
        "🎮 SURVIVAL ROOM 🎮\n" +
        "👥 Jugadores: " + gameState.players.length,
        null,
        0xFF0000,
        "bold",
        2
    );
    
    setTimeout(() => {
        room.startGame();
        room.pauseGame(true);
        
        gameState.chatBlocked = true;
        
        room.sendAnnouncement(
            "\n📋 INSTRUCCIONES:\n" +
            "⚠️ Evita tocar los bordes negros\n" +
            "🔴 Los discos negros te empujarán fuera del mapa\n" +
            "🏆 El último jugador dentro del área gana!\n\n" +
            "⏱️ El juego comenzará en 5 segundos...",
            null,
            0xFFFF00,
            "bold",
            2
        );
        
        setTimeout(() => {
            room.pauseGame(false);
            gameState.chatBlocked = false;
            room.sendAnnouncement(
                "🟢 ¡COMIENZA!",
                null,
                0x00FF00,
                "bold",
                2
            );
        }, 5000);
    }, 1500);
    
    // Esperar 8 segundos antes de empezar a verificar
    setTimeout(() => {
        gameState.checkInterval = setInterval(() => checkPlayers(room, onGameEnd), 100);
    }, 8500);
}

// ============================================
// VERIFICAR JUGADORES
// ============================================
function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;
    
    var alivePlayers = [];
    
    gameState.players.forEach(p => {
        if (gameState.eliminated.indexOf(p.id) !== -1) return;
        
        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            room.sendAnnouncement("❌ " + p.name + " se desconectó", null, 0xFF6600);
            return;
        }
        
        var pos = player.position;
        if (!pos) return;
        
        var eliminated = false;
        var reason = "";
        
        // Detectar si salió del área (empujado por los discos negros)
        if (Math.abs(pos.x) > config.outOfBoundsDistance || Math.abs(pos.y) > config.outOfBoundsDistance) {
            eliminated = true;
            reason = "salió del área";
            console.log("💀 " + p.name + " salió del área - X: " + pos.x.toFixed(0) + ", Y: " + pos.y.toFixed(0));
        }
        
        if (eliminated && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            room.setPlayerTeam(p.id, 0);
            
            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement(
                "❌ " + p.name + " " + reason + "! (" + remaining + " restantes)",
                null,
                0xFF6600
            );
        } else if (!eliminated) {
            alivePlayers.push(p);
        }
    });
    
    // Verificar ganador
    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0], onGameEnd);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement("❌ No hay ganador - todos fueron eliminados", null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

// ============================================
// DECLARAR GANADOR
// ============================================
function declareWinner(room, winner, onGameEnd) {
    if (!gameState.active) return;
    
    stop(room);
    
    room.sendAnnouncement(
        "\n🏆 ¡" + winner.name.toUpperCase() + " HA GANADO! 🏆\n",
        null,
        0xFFD700,
        "bold",
        2
    );
    
    setTimeout(() => {
        if (onGameEnd) {
            onGameEnd(winner);
        }
    }, 3000);
}

// ============================================
// DETENER JUEGO
// ============================================
function stop(room) {
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    gameState.active = false;
    gameState.players = [];
    gameState.eliminated = [];
    gameState.chatBlocked = false;
}

// ============================================
// REVOLVER EQUIPOS
// ============================================
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(p => p.id !== 0);
    
    // Mover todos a espectadores primero
    players.forEach(p => room.setPlayerTeam(p.id, 0));
    
    // Revolver array
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = players[i];
        players[i] = players[j];
        players[j] = temp;
    }
    
    // Asignar equipos alternados
    players.forEach((p, index) => {
        var team = (index % 2 === 0) ? 1 : 2;
        room.setPlayerTeam(p.id, team);
    });
}

// ============================================
// VERIFICAR SI ESTÁ ACTIVO
// ============================================
function isActive() {
    return gameState.active;
}

// ============================================
// CHAT HANDLER
// ============================================
function onPlayerChat(player) {
    if (gameState.chatBlocked) {
        return false;
    }
    return true;
}

// ============================================
// PLAYER LEAVE HANDLER
// ============================================
function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    
    if (gameState.eliminated.indexOf(player.id) === -1) {
        gameState.eliminated.push(player.id);
    }
}

// ============================================
// EXPORTS
// ============================================
return {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerChat: onPlayerChat,
    onPlayerLeave: onPlayerLeave
};

})();

// ============================================
// MÓDULO: METEORS SURVIVAL
// ============================================
var METEORS = (function() {
// ============================================
// MINIJUEGO: METEORS SURVIVAL - Esquiva los meteoritos
// ============================================

// NOTA: El mapa será inyectado por bot.js
// No se carga aquí para evitar problemas con fs en el contexto del navegador
// ⚠️ IMPORTANTE: mapData debe ser una STRING JSON, no un objeto JavaScript
// Haxball's room.setCustomStadium() requiere string JSON
var mapData = "{\"name\":\"Meteors Survival v3 from HaxMaps\",\"width\":420,\"height\":200,\"bg\":{\"type\":\"hockey\"},\"vertexes\":[{\"x\":422,\"y\":-202,\"bCoef\":-100,\"cMask\":[\"red\",\"blue\"]},{\"x\":422,\"y\":202,\"bCoef\":-100,\"cMask\":[\"red\",\"blue\"]},{\"x\":-422,\"y\":-202,\"bCoef\":-100,\"cMask\":[\"red\",\"blue\"]},{\"x\":-422,\"y\":202,\"bCoef\":-100,\"cMask\":[\"red\",\"blue\"]},{\"x\":-600,\"y\":-450,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"x\":-600,\"y\":350,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"x\":600,\"y\":350,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"x\":600,\"y\":-450,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]}],\"segments\":[{\"v0\":0,\"v1\":1,\"bCoef\":-100,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":0,\"v1\":2,\"bCoef\":-100,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":2,\"v1\":3,\"bCoef\":-100,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":3,\"v1\":1,\"bCoef\":-100,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":4,\"v1\":5,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"v0\":5,\"v1\":6,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"v0\":6,\"v1\":7,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"v0\":7,\"v1\":4,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]}],\"planes\":[{\"normal\":[0,1],\"dist\":-400,\"bCoef\":0.00001,\"cMask\":[\"ball\"],\"cGroup\":[\"all\"]},{\"normal\":[0,-1],\"dist\":-302,\"bCoef\":1000,\"cMask\":[\"ball\"],\"cGroup\":[\"all\"]},{\"normal\":[1,0],\"dist\":-460,\"bCoef\":0.00001,\"cMask\":[\"ball\"],\"cGroup\":[\"all\"]},{\"normal\":[-1,0],\"dist\":-460,\"bCoef\":1000,\"cMask\":[\"ball\"],\"cGroup\":[\"all\"]}],\"goals\":[],\"discs\":[{\"radius\":1,\"invMass\":1e-21,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\",\"kick\",\"score\"]},{\"pos\":[-263.333335876,-359.211807251],\"speed\":[1.8,1.6],\"radius\":5,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-164.333335876,-331.211807251],\"speed\":[1.2,1.7],\"radius\":6,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[111.666664124,-328.211807251],\"speed\":[1.1,1.6],\"radius\":7,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-5.33333587646,-274.211807251],\"speed\":[1.2,1.6],\"radius\":9,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[387.666664124,-259.211807251],\"speed\":[1.6,1.7],\"radius\":9,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[141.666664124,-267.211807251],\"speed\":[1.1,1.5],\"radius\":6,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[366.666664124,-355.211807251],\"speed\":[1.7,1.8],\"radius\":2,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-256.333335876,-264.211807251],\"speed\":[1.3,1.4],\"radius\":4,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-386.333335876,-233.211807251],\"speed\":[1.3,1.2],\"radius\":7,\"bCoef\":10,\"invMass\":0.0003,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-386.333335876,-353.211807251],\"speed\":[1.4,1],\"radius\":9,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-369.333335876,239.121536255],\"speed\":[1.3,1],\"radius\":7,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-324.333335876,275.121536255],\"speed\":[1.23,1.1],\"radius\":5,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-167.333335876,226.121536255],\"speed\":[1.1,1.4],\"radius\":7,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[88.6666641235,269.343765259],\"speed\":[1.35,1.36],\"radius\":9,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[269.666664124,222.343765259],\"speed\":[1.13,1.4],\"radius\":9,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[340.666664124,269.343765259],\"speed\":[1.3,1.4],\"radius\":6,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-58.3333358765,272.343765259],\"speed\":[1.1,1.2],\"radius\":6,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-198.333335876,-272.989578247],\"speed\":[1.4,1],\"radius\":2,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-360.333335876,-298.989578247],\"speed\":[1.3,1.5],\"radius\":9,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[259.666664124,-305.989578247],\"speed\":[1.2,1.8],\"radius\":5,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[444.666664124,183.454881668],\"speed\":[1.6,1.5],\"radius\":6,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[191.666664124,219.343765259],\"speed\":[1.3,1.7],\"radius\":5,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-191.333335876,274.343765259],\"speed\":[1.3,1.6],\"radius\":7,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[266.666664124,276.343765259],\"speed\":[1.4,1.8],\"radius\":7,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[171.666664124,-309.211807251],\"speed\":[1.8,1.7],\"radius\":7,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-39.3333358765,-344.211807251],\"speed\":[1.2,1.3],\"radius\":7,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[409.666664124,-316.211807251],\"speed\":[1.2,1.6],\"radius\":7,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[239.666664124,-369.211807251],\"speed\":[1.1,1.6],\"radius\":9,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-332.333335876,-358.211807251],\"speed\":[1.19,1.3],\"radius\":9,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-95.3333358765,-298.211807251],\"speed\":[1.1,1.12],\"radius\":9,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[192.666664124,279.343765259],\"speed\":[1.4,1.5],\"radius\":4,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-13.3333358765,242.343765259],\"speed\":[1.4,1.11],\"radius\":11,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-281.333335876,239.343765259],\"speed\":[1.8,1.1],\"radius\":12,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[150.666664124,261.343765259],\"speed\":[1.3,1.3],\"radius\":12,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[82.6666641235,-363.211807251],\"speed\":[1.5,1.1],\"radius\":12,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[383.666664124,250.343765259],\"speed\":[1.4,1.6],\"radius\":12,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[443.666664124,-62.7673568726],\"speed\":[1.1,1],\"radius\":7,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[436.666664124,90.2326431274],\"speed\":[1.25,1.3],\"radius\":9,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-434.333335876,58.0104217529],\"speed\":[1.1,1.3],\"radius\":6,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[234.666664124,255.343765259],\"speed\":[1.8,1.1],\"radius\":12,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-168.333335876,-372.211807251],\"speed\":[1.8,1.1],\"radius\":12,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[326.666664124,-322.211807251],\"speed\":[1.5,1.1],\"radius\":12,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-441.333335876,188.010421753],\"speed\":[1.7,1.7],\"radius\":2,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[45.6666641235,227.343765259],\"speed\":[1.7,1.9],\"radius\":2,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[448.666664124,-102.211807251],\"speed\":[1.3,1.4],\"radius\":2,\"bCoef\":10,\"invMass\":0.00001,\"damping\":1.0003,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]}],\"playerPhysics\":{\"acceleration\":0.12,\"kickStrength\":0.1},\"ballPhysics\":\"disc0\",\"spawnDistance\":10}";

// Estado del juego
var gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false
};

// Configuración
var config = {
    minPlayers: 2,
    outOfBoundsDistance: 350  // Si |X| > 350 o |Y| > 350 = fuera del mapa
};

// ============================================
// INICIAR JUEGO
// ============================================
function start(room, onGameEnd) {
    console.log('☄️ METEORS - Iniciando juego...');
    console.log('📊 Jugadores:', room.getPlayerList().filter(p => p.id !== 0).length);
    
    room.setCustomStadium(mapData);
    console.log('✅ Mapa cargado');
    
    // Revolver y asignar equipos
    shuffleTeams(room);
    console.log('✅ Equipos asignados');
    
    gameState.active = true;
    gameState.players = room.getPlayerList().filter(p => p.id !== 0);
    gameState.eliminated = [];
    
    // Mover a espectador a los jugadores que deben estar en spectator
    botState.spectatorNext.forEach(function(playerId) {
        var player = room.getPlayer(playerId);
        if (player) {
            room.setPlayerTeam(playerId, 0);
            room.sendAnnouncement(
                "👻 " + player.name + " debe esperar este minijuego",
                null,
                0xFF6600,
                "bold"
            );
        }
    });
    // Limpiar la lista después de aplicar
    botState.spectatorNext = [];
    
    room.sendAnnouncement(
        "🎮 METEORS SURVIVAL 🎮\n" +
        "👥 Jugadores: " + gameState.players.length,
        null,
        0x8B4513,
        "bold",
        2
    );
    
    setTimeout(() => {
        room.startGame();
        room.pauseGame(true);
        
        gameState.chatBlocked = true;
        
        room.sendAnnouncement(
            "\n📋 INSTRUCCIONES:\n" +
            "☄️ Esquiva los meteoritos negros que se mueven\n" +
            "⚠️ Puedes tocarlos a veces, pero cuidado!\n" +
            "🚫 Si te empujan fuera del área, quedas ELIMINADO\n" +
            "🏆 El último jugador dentro del área gana!\n\n" +
            "⏱️ El juego comenzará en 5 segundos...",
            null,
            0xFFFF00,
            "bold",
            2
        );
        
        setTimeout(() => {
            room.pauseGame(false);
            gameState.chatBlocked = false;
            room.sendAnnouncement(
                "🟢 ¡COMIENZA!",
                null,
                0x00FF00,
                "bold",
                2
            );
        }, 5000);
    }, 1500);
    
    // Esperar 8 segundos antes de empezar a verificar
    setTimeout(() => {
        gameState.checkInterval = setInterval(() => checkPlayers(room, onGameEnd), 100);
    }, 8500);
}

// ============================================
// VERIFICAR JUGADORES
// ============================================
function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;
    
    var alivePlayers = [];
    
    gameState.players.forEach(p => {
        if (gameState.eliminated.indexOf(p.id) !== -1) return;
        
        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            room.sendAnnouncement("❌ " + p.name + " se desconectó", null, 0xFF6600);
            return;
        }
        
        var pos = player.position;
        if (!pos) return;
        
        // Verificar si está fuera de los límites
        var outOfBounds = Math.abs(pos.x) > config.outOfBoundsDistance || 
                           Math.abs(pos.y) > config.outOfBoundsDistance;
        
        if (outOfBounds && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            room.setPlayerTeam(p.id, 0);
            
            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement(
                "☄️ " + p.name + " fue expulsado fuera del área! (" + remaining + " restantes)",
                null,
                0xFF6600
            );
        } else if (!outOfBounds) {
            alivePlayers.push(p);
        }
    });
    
    // Verificar condiciones de victoria
    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0], onGameEnd);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement("❌ No hay ganador - todos fueron expulsados", null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

// ============================================
// DECLARAR GANADOR
// ============================================
function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    room.sendAnnouncement(
        "\n🏆 ¡¡¡" + winner.name.toUpperCase() + " HA GANADO!!! 🏆\n",
        null,
        0xFFD700,
        "bold",
        2
    );
    
    setTimeout(() => {
        if (onGameEnd) {
            onGameEnd(winner);
        }
    }, 3000);
}

// ============================================
// REVOLVER Y ASIGNAR EQUIPOS
// ============================================
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(p => p.id !== 0);
    
    // Algoritmo de Fisher-Yates para revolver array
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [players[i], players[j]] = [players[j], players[i]];
    }
    
    // Dividir en dos equipos
    var halfPoint = Math.floor(players.length / 2);
    
    players.forEach((player, index) => {
        if (index < halfPoint) {
            room.setPlayerTeam(player.id, 1);  // Equipo rojo
        } else {
            room.setPlayerTeam(player.id, 2);  // Equipo azul
        }
    });
}

// ============================================
// DETENER JUEGO
// ============================================
function stop(room) {
    gameState.active = false;
    
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    gameState.players = [];
    gameState.eliminated = [];
    
    room.stopGame();
}

// ============================================
// EVENTOS
// ============================================
function onPlayerLeave(room, player) {
    if (gameState.active && gameState.eliminated.indexOf(player.id) === -1) {
        gameState.eliminated.push(player.id);
    }
}

function onPlayerChat(player) {
    if (gameState.chatBlocked) {
        return false;
    }
    return true;
}

function isActive() {
    return gameState.active;
}

// ============================================
// EXPORTAR
// ============================================
return {
    config: config,
    start: start,
    stop: stop,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    isActive: isActive
};

})();

// ============================================
// MÓDULO: JUMPING ARENA
// ============================================
var JUMPING = (function() {
// ============================================
// MINIJUEGO: JUMPING ARENA - Aguanta en la base
// ============================================

// NOTA: El mapa será inyectado por bot.js
// No se carga aquí para evitar problemas con fs en el contexto del navegador
// ⚠️ IMPORTANTE: mapData debe ser una STRING JSON, no un objeto JavaScript
// Haxball's room.setCustomStadium() requiere string JSON
var mapData = "{\"name\":\"Jumping Arena by MC [20 players]\",\"width\":650,\"height\":600,\"bg\":{\"color\":\"4C7296\"},\"vertexes\":[{\"x\":-507,\"y\":163,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-107,\"y\":163,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-507,\"y\":203,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-107,\"y\":203,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-92,\"y\":188,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-92,\"y\":178,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-522,\"y\":188,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-522,\"y\":178,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-92,\"y\":185.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-522,\"y\":185.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-92,\"y\":183,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-522,\"y\":183,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-92,\"y\":180.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-522,\"y\":180.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-93,\"y\":190.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-521,\"y\":190.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-93,\"y\":175.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-521,\"y\":175.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-521,\"y\":193,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-94,\"y\":173,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-520,\"y\":173,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-94,\"y\":178,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-520,\"y\":178,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-95,\"y\":195.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-519,\"y\":195.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-95,\"y\":170.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-519,\"y\":170.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-94,\"y\":193,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-520,\"y\":193,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-97,\"y\":168,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-517,\"y\":168,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-100,\"y\":200.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-514,\"y\":200.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-97,\"y\":198,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-517,\"y\":198,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-100,\"y\":165.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-514,\"y\":165.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-1000,\"y\":-570,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":1000,\"y\":-570,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":-120,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-120,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-1000,\"y\":-560,\"bCoef\":-4,\"cMask\":[\"red\",\"blue\"]},{\"x\":1000,\"y\":-560,\"bCoef\":-4,\"cMask\":[\"red\",\"blue\"]},{\"x\":105,\"y\":166,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":505,\"y\":166,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":105,\"y\":206,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":505,\"y\":206,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":520,\"y\":191,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":520,\"y\":181,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":90,\"y\":191,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":90,\"y\":181,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":520,\"y\":188.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":90,\"y\":188.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":520,\"y\":186,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":90,\"y\":186,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":520,\"y\":183.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":90,\"y\":183.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":519,\"y\":193.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":91,\"y\":193.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":519,\"y\":178.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":91,\"y\":178.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":91,\"y\":196,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":518,\"y\":176,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":92,\"y\":176,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":518,\"y\":181,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":92,\"y\":181,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":517,\"y\":198.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":93,\"y\":198.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":517,\"y\":173.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":93,\"y\":173.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":518,\"y\":196,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":92,\"y\":196,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":515,\"y\":171,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":95,\"y\":171,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":512,\"y\":203.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":98,\"y\":203.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":515,\"y\":201,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":95,\"y\":201,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":512,\"y\":168.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":98,\"y\":168.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-160,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-160,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-200,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-200,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-240,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-240,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-320,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-320,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-400,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-400,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-280,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-280,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-360,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-360,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-440,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-440,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-480,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-480,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":120,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":120,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":160,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":160,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":200,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":200,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":240,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":240,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":320,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":320,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":400,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":400,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":280,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":280,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":360,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":360,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":440,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":440,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":480,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":480,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-36,\"y\":-71,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":36,\"y\":-71,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-36,\"y\":-31,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":36,\"y\":-31,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":50,\"y\":-46,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":50,\"y\":-56,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-51,\"y\":-46,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":-51,\"y\":-56,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":51,\"y\":-48.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-51,\"y\":-48.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":51,\"y\":-51,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-51,\"y\":-51,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":51,\"y\":-53.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-51,\"y\":-53.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":50,\"y\":-43.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-50,\"y\":-43.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":50,\"y\":-58.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-50,\"y\":-58.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-50,\"y\":-41,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":49,\"y\":-61,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-49,\"y\":-61,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":50,\"y\":-56,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-49,\"y\":-56,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":48,\"y\":-38.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-48,\"y\":-38.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":48,\"y\":-63.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-48,\"y\":-63.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":49,\"y\":-41,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-49,\"y\":-41,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":46,\"y\":-66,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-46,\"y\":-66,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":43,\"y\":-33.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-43,\"y\":-33.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":46,\"y\":-36,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-46,\"y\":-36,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":43,\"y\":-68.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-43,\"y\":-68.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-300,\"y\":-610,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":-300,\"y\":-570,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":300,\"y\":-610,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":300,\"y\":-570,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":-900,\"y\":-670,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":-850,\"y\":-670,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":900,\"y\":-670,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":850,\"y\":-670,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]}],\"segments\":[{\"v0\":0,\"v1\":1,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"},{\"v0\":2,\"v1\":3,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":4,\"v1\":3,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":4,\"v1\":5,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":1,\"v1\":5,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"},{\"v0\":2,\"v1\":6,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":6,\"v1\":7,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":7,\"v1\":0,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"},{\"v0\":7,\"v1\":5,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":6,\"v1\":4,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":9,\"v1\":8,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":11,\"v1\":10,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":13,\"v1\":12,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":15,\"v1\":14,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":17,\"v1\":16,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":20,\"v1\":19,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":22,\"v1\":21,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":24,\"v1\":23,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":26,\"v1\":25,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":28,\"v1\":27,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":30,\"v1\":29,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":32,\"v1\":31,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":34,\"v1\":33,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":36,\"v1\":35,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":37,\"v1\":38,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"color\":\"537EA7\"},{\"v0\":39,\"v1\":40,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":40,\"v1\":39,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":41,\"v1\":42,\"bCoef\":-4,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":43,\"v1\":44,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"},{\"v0\":45,\"v1\":46,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":47,\"v1\":46,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":47,\"v1\":48,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":44,\"v1\":48,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"},{\"v0\":45,\"v1\":49,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":49,\"v1\":50,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":50,\"v1\":43,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"},{\"v0\":50,\"v1\":48,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":49,\"v1\":47,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":52,\"v1\":51,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":54,\"v1\":53,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":56,\"v1\":55,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":58,\"v1\":57,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":60,\"v1\":59,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":63,\"v1\":62,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":65,\"v1\":64,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":67,\"v1\":66,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":69,\"v1\":68,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":71,\"v1\":70,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":73,\"v1\":72,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":75,\"v1\":74,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":77,\"v1\":76,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":79,\"v1\":78,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":80,\"v1\":81,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":81,\"v1\":80,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":82,\"v1\":83,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":83,\"v1\":82,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":84,\"v1\":85,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":85,\"v1\":84,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":86,\"v1\":87,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":87,\"v1\":86,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":88,\"v1\":89,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":89,\"v1\":88,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":90,\"v1\":91,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":91,\"v1\":90,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":92,\"v1\":93,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":93,\"v1\":92,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":94,\"v1\":95,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":95,\"v1\":94,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":96,\"v1\":97,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":97,\"v1\":96,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":98,\"v1\":99,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":99,\"v1\":98,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":100,\"v1\":101,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":101,\"v1\":100,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":102,\"v1\":103,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":103,\"v1\":102,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":104,\"v1\":105,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":105,\"v1\":104,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":106,\"v1\":107,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":107,\"v1\":106,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":108,\"v1\":109,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":109,\"v1\":108,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":110,\"v1\":111,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":111,\"v1\":110,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":112,\"v1\":113,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":113,\"v1\":112,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":114,\"v1\":115,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":115,\"v1\":114,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":116,\"v1\":117,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":117,\"v1\":116,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":118,\"v1\":119,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"},{\"v0\":120,\"v1\":121,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"},{\"v0\":122,\"v1\":121,\"bCoef\":0,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"},{\"v0\":122,\"v1\":123,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":119,\"v1\":123,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"},{\"v0\":120,\"v1\":124,\"bCoef\":0,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"},{\"v0\":124,\"v1\":125,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":125,\"v1\":118,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"},{\"v0\":125,\"v1\":123,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":124,\"v1\":122,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":127,\"v1\":126,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":129,\"v1\":128,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":131,\"v1\":130,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":133,\"v1\":132,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":135,\"v1\":134,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":138,\"v1\":137,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":140,\"v1\":139,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":142,\"v1\":141,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":144,\"v1\":143,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":146,\"v1\":145,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":148,\"v1\":147,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":150,\"v1\":149,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":152,\"v1\":151,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":154,\"v1\":153,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":155,\"v1\":156,\"bCoef\":0,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"color\":\"537EA7\"},{\"v0\":157,\"v1\":158,\"bCoef\":0,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"color\":\"537EA7\"},{\"v0\":159,\"v1\":160,\"bCoef\":0,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":161,\"v1\":162,\"bCoef\":0,\"vis\":false,\"cMask\":[\"red\",\"blue\"]}],\"planes\":[{\"normal\":[0,-1],\"dist\":-400,\"bCoef\":100000,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[1,0],\"dist\":-1000,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[-1,0],\"dist\":-1000,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,1],\"dist\":-800,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,1],\"dist\":-25,\"bCoef\":0,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"normal\":[0,-1],\"dist\":-600,\"bCoef\":0,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"normal\":[0,1],\"dist\":-35,\"bCoef\":0,\"cMask\":[\"ball\"],\"cGroup\":[\"ball\"]}],\"goals\":[],\"discs\":[{\"radius\":0.01,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"kick\",\"score\",\"c0\"]},{\"pos\":[0,200],\"speed\":[0,-1],\"radius\":1,\"bCoef\":3,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-300,3200],\"speed\":[0,-1],\"radius\":235,\"bCoef\":100000,\"invMass\":1e-44,\"damping\":1,\"color\":\"4C7296\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[300,3200],\"speed\":[0,-1],\"radius\":235,\"bCoef\":100000,\"invMass\":1e-44,\"damping\":1,\"color\":\"4C7296\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]}],\"playerPhysics\":{\"bCoef\":1.2,\"invMass\":0.7,\"damping\":0.97,\"acceleration\":0.12,\"kickStrength\":0,\"gravity\":[0,0.2],\"radius\":20},\"ballPhysics\":\"disc0\",\"spawnDistance\":250,\"redSpawnPoints\":[[-120,55],[-200,55],[-280,55],[-360,55],[-440,55],[-160,0],[-240,0],[-320,0],[-400,0],[-480,0],[-875,250]],\"blueSpawnPoints\":[[120,55],[200,55],[280,55],[360,55],[440,55],[160,0],[240,0],[320,0],[400,0],[480,0],[875,250]]}";

// Estado del juego
var gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false
};

// Configuración
var config = {
    minPlayers: 2,
    respawnY: -560     // Y <= -560 = jugador llegó a la zona de respawn (eliminado)
};

// ============================================
// INICIAR JUEGO
// ============================================
function start(room, onGameEnd) {
    console.log('🎮 JUMPING ARENA - Iniciando juego...');
    console.log('📊 Jugadores:', room.getPlayerList().filter(p => p.id !== 0).length);
    
    try {
        console.log('🗺️ Cargando mapa..., tipo:', typeof mapData);
        if (!mapData) {
            console.error('❌ mapData es null o undefined!');
            return;
        }
        
        room.setCustomStadium(mapData);
        console.log('✅ Mapa cargado');
    } catch (e) {
        console.error('❌ Error al cargar mapa:', e.message);
        return;
    }
    
    // Revolver y asignar equipos
    try {
        shuffleTeams(room);
        console.log('✅ Equipos asignados');
    } catch (e) {
        console.error('❌ Error al asignar equipos:', e.message);
        return;
    }
    
    gameState.active = true;
    gameState.players = room.getPlayerList().filter(p => p.id !== 0);
    gameState.eliminated = [];
    
    room.sendAnnouncement(
        "🎮 JUMPING ARENA - ¡AGUANTA EN LA BASE! 🎮\n" +
        "👥 Jugadores: " + gameState.players.length,
        null,
        0x00BFFF,
        "bold",
        2
    );
    
    setTimeout(() => {
        room.startGame();
        room.pauseGame(true);
        
        gameState.chatBlocked = true;
        
        room.sendAnnouncement(
            "\n📋 INSTRUCCIONES:\n" +
            "⚠️ Aguanta en la base del medio\n" +
            "🔵 Las bolas te mandarán a volar\n" +
            "❌ Si caes y reapareces arriba, quedas ELIMINADO\n" +
            "🏆 El último jugador que sobreviva gana!\n\n" +
            "⏱️ El juego comenzará en 5 segundos...",
            null,
            0xFFFF00,
            "bold",
            2
        );
        
        setTimeout(() => {
            room.pauseGame(false);
            gameState.chatBlocked = false;
            room.sendAnnouncement(
                "🟢 ¡COMIENZA!",
                null,
                0x00FF00,
                "bold",
                2
            );
        }, 5000);
    }, 1500);
    
    // Esperar 8 segundos antes de empezar a verificar
    setTimeout(() => {
        gameState.checkInterval = setInterval(() => checkPlayers(room, onGameEnd), 100);
    }, 8500);
}

// ============================================
// VERIFICAR JUGADORES
// ============================================
function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;
    
    var alivePlayers = [];
    
    gameState.players.forEach(p => {
        if (gameState.eliminated.indexOf(p.id) !== -1) return;
        
        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            room.sendAnnouncement("❌ " + p.name + " se desconectó", null, 0xFF6600);
            return;
        }
        
        var pos = player.position;
        if (!pos) return;
        
        var eliminated = false;
        var reason = "";
        
        // Detectar si llegó a la zona de respawn (arriba)
        // Las coordenadas del respawn son y = -560, desde x = -1000 hasta x = 1000
        if (pos.y <= config.respawnY) {
            eliminated = true;
            reason = "cayó y fue teletransportado arriba";
            console.log("💀 " + p.name + " llegó al respawn - Y: " + pos.y.toFixed(0));
        }
        
        if (eliminated && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            room.setPlayerTeam(p.id, 0);
            
            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement(
                "❌ " + p.name + " " + reason + "! (" + remaining + " restantes)",
                null,
                0xFF6600
            );
        } else if (!eliminated) {
            alivePlayers.push(p);
        }
    });
    
    // Verificar ganador
    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0], onGameEnd);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement("❌ No hay ganador - todos fueron eliminados", null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

// ============================================
// DECLARAR GANADOR
// ============================================
function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    room.sendAnnouncement(
        "\n🏆 ¡" + winner.name.toUpperCase() + " HA GANADO! 🏆\n",
        null,
        0xFFD700,
        "bold",
        2
    );
    
    // Notificar al bot principal que hay un ganador
    setTimeout(() => {
        if (onGameEnd) {
            onGameEnd(winner);
        }
    }, 3000);
}

// ============================================
// REVOLVER EQUIPOS
// ============================================
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(p => p.id !== 0);
    
    // Revolver array
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = players[i];
        players[i] = players[j];
        players[j] = temp;
    }
    
    // Asignar equipos
    var halfPoint = Math.floor(players.length / 2);
    
    for (var i = 0; i < players.length; i++) {
        if (i < halfPoint) {
            room.setPlayerTeam(players[i].id, 1);
        } else {
            room.setPlayerTeam(players[i].id, 2);
        }
    }
}

// ============================================
// DETENER JUEGO
// ============================================
function stop(room) {
    gameState.active = false;
    
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    gameState.players = [];
    gameState.eliminated = [];
    
    room.stopGame();
}

// ============================================
// EVENTOS
// ============================================
function onPlayerLeave(room, player) {
    if (gameState.active && gameState.eliminated.indexOf(player.id) === -1) {
        gameState.eliminated.push(player.id);
        
        var remaining = gameState.players.length - gameState.eliminated.length;
        room.sendAnnouncement(
            "❌ " + player.name + " se fue (" + remaining + " restantes)",
            null,
            0xFF6600
        );
    }
}

function onPlayerChat(room, player, message) {
    if (gameState.chatBlocked) {
        return false;
    }
    return true;
}

function isActive() {
    return gameState.active;
}

// ============================================
// EXPORTAR
// ============================================
return {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerChat: onPlayerChat,
    onPlayerLeave: onPlayerLeave
};

})();

// ============================================
// MÓDULO: WEB SURVIVAL
// ============================================
var WEBSURVIVAL = (function() {
// ============================================
// MINIJUEGO: WEB SURVIVAL - Aguanta en la telaraña
// ============================================

// NOTA: El mapa será inyectado por bot.js
// No se carga aquí para evitar problemas con fs en el contexto del navegador
// ⚠️ IMPORTANTE: mapData debe ser una STRING JSON, no un objeto JavaScript
// Haxball's room.setCustomStadium() requiere string JSON
var mapData = "{\"name\":\"Web Survival Version 2 by Namajunas [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ]\",\"width\":999,\"height\":500,\"bg\":{\"color\":\"40404\"},\"vertexes\":[{\"x\":-795,\"y\":-687,\"bCoef\":0.001,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"]},{\"x\":0.8453873805800072,\"y\":-499.96238566625846,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":4.763308829228606,\"y\":42.19018732169036,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-210.4351727605743,\"y\":483.9952265512021,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":4.763308829228606,\"y\":42.19018732169036,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":205.939081822969,\"y\":483.9952265512021,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":542.9972424648688,\"y\":-21.509542476036188,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":4.763308829228606,\"y\":42.19018732169036,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":4.763308829228606,\"y\":42.19018732169036,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-551.0233487481062,\"y\":-21.509542476036188,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":4.763308829228606,\"y\":42.19018732169036,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-388.4468696393493,\"y\":-374.5601179987742,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":510.5562210465414,\"y\":306.79220299455665,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":4.763308829228606,\"y\":42.19018732169036,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":376.23434950694036,\"y\":-362.0198912320259,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":4.763308829228606,\"y\":42.19018732169036,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":4.763308829228606,\"y\":42.19018732169036,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-508.9420920502796,\"y\":306.79220299455665,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-342.4681216962633,\"y\":-327.57928652069666,\"bCoef\":0.001,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"]},{\"x\":-468.23220736957296,\"y\":-11.073617351986286,\"bCoef\":0.001,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"]},{\"x\":-434.79118595124555,\"y\":269.1715226943112,\"bCoef\":0.001,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"]},{\"x\":-175.26301460462616,\"y\":415.4741683063762,\"bCoef\":0.001,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"]},{\"x\":176.95378936578606,\"y\":415.4741683063762,\"bCoef\":0.001,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"]},{\"x\":441.1163923435951,\"y\":269.1715226943112,\"bCoef\":0.001,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"]},{\"x\":470.55741376192253,\"y\":-14.073617351986286,\"bCoef\":0.001,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"]},{\"x\":332.890033195044,\"y\":-314.57928652069666,\"bCoef\":0.001,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"]},{\"x\":0.8453873805800072,\"y\":-437.26125183251645,\"bCoef\":0.001,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"]},{\"x\":0.8453873805800072,\"y\":-349.2995888763614,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-272.5860788596084,\"y\":-253.3379259202062,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-354.54357474578023,\"y\":-0.8935417630701181,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-350.0058482210218,\"y\":223.19069121623374,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-148.09085644867793,\"y\":356.59295888371787,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":145.878336316269,\"y\":348.59295888371787,\"bCoef\":0.001,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"]},{\"x\":357.59991787575063,\"y\":227.19069121623374,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":385.5032127693195,\"y\":-4.893541763070118,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":271.64242198957874,\"y\":-249.3379259202062,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":0.8453873805800072,\"y\":-274.05822827587076,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-205.16630949819506,\"y\":-179.27664090863175,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-279.8549421219876,\"y\":7.28653382584605,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-265.2205104907981,\"y\":180.84970856032385,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-120.9186982927298,\"y\":298.071900638892,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":116.7061781603208,\"y\":290.071900638892,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":275.64242198957874,\"y\":182.20985973815618,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":303.08344340790615,\"y\":6.006836181510607,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":203.49151589054458,\"y\":-176.27664090863175,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":0.8453873805800072,\"y\":-190.45671649754792,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-133.55312992391936,\"y\":-111.2153558970574,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-209.0696043917639,\"y\":13.82676059259444,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-190.4351727605743,\"y\":142.8688770822464,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-93.11210850559195,\"y\":235.37076680514986,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":88.89958837318298,\"y\":227.37076680514986,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":197.49151589054458,\"y\":144.8688770822464,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":241.93253730887199,\"y\":12.82676059259444,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":152.5127679474586,\"y\":-119.2153558970574,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-91.2088136120231,\"y\":-63.23452441897996,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-147.45642481748826,\"y\":24.547062948259054,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-127.55312992391936,\"y\":112.50872590441406,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-56.036655456074925,\"y\":168.48955738249163,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":62.45856695485557,\"y\":168.48955738249163,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":127.34060979151045,\"y\":106.50872590441406,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":163.05049447221714,\"y\":24.547062948259054,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":102.16845163556232,\"y\":-63.23452441897996,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":2.845387380580007,\"y\":-107.03528030814135,\"bCoef\":0.001,\"cMask\":[\"c0\"]},{\"x\":-498.3265439664158,\"y\":-153.5561856570224,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-498.3265439664158,\"y\":-247.5546170948116,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-444.3041209227108,\"y\":-161.52215442293692,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-444.3041209227108,\"y\":-233.21587331616615,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-462.31159527061254,\"y\":-233.21587331616615,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-462.31159527061254,\"y\":-204.53838575887428,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-491.5737410859531,\"y\":-188.6064482270456,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-462.31159527061254,\"y\":-139.2174418783767,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-462.31159527061254,\"y\":-174.26770444839974,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-516.3340183143176,\"y\":-153.5561856570224,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-516.3340183143176,\"y\":-225.2499045502516,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-505.07934684687905,\"y\":-207.72477326523995,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-344.4681216962633,\"y\":-327.57928652069666,\"bCoef\":1000,\"cMask\":[\"red\",\"blue\"]},{\"x\":-470.23220736957296,\"y\":-11.073617351986286,\"bCoef\":1000,\"cMask\":[\"red\",\"blue\"]},{\"x\":-436.79118595124555,\"y\":269.1715226943112,\"bCoef\":1000,\"cMask\":[\"red\",\"blue\"]},{\"x\":-177.26301460462616,\"y\":415.4741683063762,\"bCoef\":1000,\"cMask\":[\"red\",\"blue\"]},{\"x\":174.95378936578606,\"y\":415.4741683063762,\"bCoef\":1000,\"cMask\":[\"red\",\"blue\"]},{\"x\":439.1163923435951,\"y\":269.1715226943112,\"bCoef\":1000,\"cMask\":[\"red\",\"blue\"]},{\"x\":468.55741376192253,\"y\":-14.073617351986286,\"bCoef\":1000,\"cMask\":[\"red\",\"blue\"]},{\"x\":330.890033195044,\"y\":-314.57928652069666,\"bCoef\":1000,\"cMask\":[\"red\",\"blue\"]},{\"x\":-1.1546126194199928,\"y\":-437.26125183251645,\"bCoef\":1000,\"cMask\":[\"red\",\"blue\"]},{\"x\":389.283161192551,\"y\":-169.03710478090255,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":405.51523067699327,\"y\":-154.37814746266645,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":404.48462309067963,\"y\":-169.03710478090255,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":390.05611688228646,\"y\":-154.37814746266645,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":409.3800091256702,\"y\":-163.9822919125453,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":425.35442671353417,\"y\":-163.9822919125453,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":409.3800091256702,\"y\":-157.44392290469517,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":425.35442671353417,\"y\":-157.6124166669738,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":433.8569393006228,\"y\":-169.03710478090255,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":433.8569393006228,\"y\":-154.37814746266645,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":446.2242303363885,\"y\":-169.03710478090255,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":434.11459119720143,\"y\":-161.28639171608802,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":446.2242303363885,\"y\":-154.37814746266645,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":454.98439482005585,\"y\":-169.03710478090255,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":454.98439482005585,\"y\":-154.37814746266645,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":476.6271541326455,\"y\":-154.37814746266645,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":476.6271541326455,\"y\":-169.03710478090255,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":486.41792620262686,\"y\":-169.03710478090255,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":486.41792620262686,\"y\":-154.37814746266645,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":498.7852172383923,\"y\":-169.03710478090255,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":486.67557809920504,\"y\":-161.28639171608802,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":498.7852172383923,\"y\":-154.37814746266645,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":453.04892011904735,\"y\":-172.98171467722432,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":457.8667279643299,\"y\":-172.98171467722432,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"]},{\"x\":-479,\"y\":-269,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-478,\"y\":-115,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-289.4255874673629,\"y\":92,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-291.4255874673629,\"y\":125,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-157.4255874673629,\"y\":39,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-159.4255874673629,\"y\":72,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-119.4255874673629,\"y\":142,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-121.4255874673629,\"y\":175,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":283.5744125326371,\"y\":-97,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":281.5744125326371,\"y\":-64,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-212.4255874673629,\"y\":223,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-214.4255874673629,\"y\":256,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":2.5744125326370977,\"y\":166,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":0.5744125326370977,\"y\":199,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-4.425587467362902,\"y\":282,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-6.425587467362902,\"y\":315,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":224.5744125326371,\"y\":-220,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":222.5744125326371,\"y\":-187,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":164.5744125326371,\"y\":-34,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":162.5744125326371,\"y\":-1,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-47.4255874673629,\"y\":-203,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-49.4255874673629,\"y\":-170,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":64.5744125326371,\"y\":-279,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":62.5744125326371,\"y\":-246,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":62.5744125326371,\"y\":-126,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":60.5744125326371,\"y\":-93,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":1000,\"y\":-525,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":-15000,\"y\":-525,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":500,\"y\":-528,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":500,\"y\":500,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":-500,\"y\":500,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":-500,\"y\":-522,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]}],\"segments\":[{\"v0\":1,\"v1\":2,\"bCoef\":0.001,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":2,\"v1\":3,\"bCoef\":0.001,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":4,\"v1\":5,\"bCoef\":0.001,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":6,\"v1\":7,\"bCoef\":0.001,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":8,\"v1\":9,\"bCoef\":0.001,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":10,\"v1\":11,\"bCoef\":0.001,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":12,\"v1\":13,\"bCoef\":0.001,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":14,\"v1\":15,\"bCoef\":0.001,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":16,\"v1\":17,\"bCoef\":0.001,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":18,\"v1\":19,\"bCoef\":0.001,\"curve\":56.815759707290354,\"curveF\":1.8488535151318586,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"],\"color\":\"7D7D7D\"},{\"v0\":19,\"v1\":20,\"bCoef\":0.001,\"curve\":55.77019487469131,\"curveF\":1.889859817299857,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"],\"color\":\"7D7D7D\"},{\"v0\":20,\"v1\":21,\"bCoef\":0.001,\"curve\":47.65205373436533,\"curveF\":2.2645169572469928,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"],\"color\":\"7D7D7D\"},{\"v0\":21,\"v1\":22,\"bCoef\":0.001,\"curve\":47.150005370157444,\"curveF\":2.2916343167701854,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"],\"color\":\"FFFFFF\"},{\"v0\":22,\"v1\":23,\"bCoef\":0.001,\"curve\":51.300994681964134,\"curveF\":2.082448977640171,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"],\"color\":\"7D7D7D\"},{\"v0\":23,\"v1\":24,\"bCoef\":0.001,\"curve\":56.84457368568746,\"curveF\":1.8477430627090397,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"],\"color\":\"7D7D7D\"},{\"v0\":24,\"v1\":25,\"bCoef\":0.001,\"curve\":53.13802623009673,\"curveF\":1.9996543034967749,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"],\"color\":\"7D7D7D\"},{\"v0\":25,\"v1\":26,\"bCoef\":0.001,\"curve\":48.50643655871874,\"curveF\":2.219584749160252,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"],\"color\":\"7D7D7D\"},{\"v0\":26,\"v1\":18,\"bCoef\":0.001,\"curve\":49.3194504477402,\"curveF\":2.1781877280923623,\"cMask\":[\"wall\"],\"cGroup\":[\"ball\"],\"color\":\"7D7D7D\"},{\"v0\":27,\"v1\":28,\"bCoef\":0.001,\"curve\":49.44727631387242,\"curveF\":2.1717953166929367,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":28,\"v1\":29,\"bCoef\":0.001,\"curve\":56.79861816216557,\"curveF\":1.8495146174374142,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":29,\"v1\":30,\"bCoef\":0.001,\"curve\":55.98850582862454,\"curveF\":1.8811816508218837,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":30,\"v1\":31,\"bCoef\":0.001,\"curve\":47.882473175955674,\"curveF\":2.2522506058902394,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":31,\"v1\":32,\"bCoef\":0.001,\"curve\":47.15000537015742,\"curveF\":2.2916343167701867,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":32,\"v1\":33,\"bCoef\":0.001,\"curve\":51.19669845118415,\"curveF\":2.087315336940403,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":33,\"v1\":34,\"bCoef\":0.001,\"curve\":56.66965374036963,\"curveF\":1.85450017646168,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":34,\"v1\":35,\"bCoef\":0.001,\"curve\":52.98332913688107,\"curveF\":2.0064206408499965,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":35,\"v1\":27,\"bCoef\":0.001,\"curve\":46.88007500345033,\"curveF\":2.3064404276240937,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":36,\"v1\":37,\"bCoef\":0.001,\"curve\":50.528312176788404,\"curveF\":2.118946280131729,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":37,\"v1\":38,\"bCoef\":0.001,\"curve\":56.44952344785006,\"curveF\":1.863058319044086,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":38,\"v1\":39,\"bCoef\":0.001,\"curve\":56.28531617386584,\"curveF\":1.869482302250863,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":39,\"v1\":40,\"bCoef\":0.001,\"curve\":48.85240162395098,\"curveF\":2.201810847313632,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":40,\"v1\":41,\"bCoef\":0.001,\"curve\":47.15000537015742,\"curveF\":2.2916343167701867,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":41,\"v1\":42,\"bCoef\":0.001,\"curve\":52.69872548600594,\"curveF\":2.018965244567477,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":42,\"v1\":43,\"bCoef\":0.001,\"curve\":56.99624581231998,\"curveF\":1.84191478701455,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":43,\"v1\":44,\"bCoef\":0.001,\"curve\":52.395330917089886,\"curveF\":2.0324773931311664,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":44,\"v1\":36,\"bCoef\":0.001,\"curve\":47.20080847290989,\"curveF\":2.2888655462184886,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":45,\"v1\":46,\"bCoef\":0.001,\"curve\":51.35014549740633,\"curveF\":2.0801620389245454,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":46,\"v1\":47,\"bCoef\":0.001,\"curve\":56.181676949672735,\"curveF\":1.873554536920123,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":47,\"v1\":48,\"bCoef\":0.001,\"curve\":56.21511777676298,\"curveF\":1.8722390593595586,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":48,\"v1\":49,\"bCoef\":0.001,\"curve\":50.03260893887035,\"curveF\":2.1429146289909218,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":49,\"v1\":50,\"bCoef\":0.001,\"curve\":47.150005370157444,\"curveF\":2.2916343167701854,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":50,\"v1\":51,\"bCoef\":0.001,\"curve\":54.128196777879765,\"curveF\":1.9571945058352642,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":51,\"v1\":52,\"bCoef\":0.001,\"curve\":57.02499309449387,\"curveF\":1.840813323411206,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":52,\"v1\":53,\"bCoef\":0.001,\"curve\":51.28243752531978,\"curveF\":2.083313486476055,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":53,\"v1\":45,\"bCoef\":0.001,\"curve\":47.48157996181196,\"curveF\":2.2736642417498176,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":54,\"v1\":55,\"bCoef\":0.001,\"curve\":55.762037842237504,\"curveF\":1.890185281614425,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":55,\"v1\":56,\"bCoef\":0.001,\"curve\":55.52210132535134,\"curveF\":1.8997980580582183,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":56,\"v1\":57,\"bCoef\":0.001,\"curve\":48.099745226927915,\"curveF\":2.2407854988250726,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":57,\"v1\":58,\"bCoef\":0.001,\"curve\":47.150005370157444,\"curveF\":2.2916343167701854,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":58,\"v1\":59,\"bCoef\":0.001,\"curve\":52.49338519334114,\"curveF\":2.0280945254250398,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":59,\"v1\":60,\"bCoef\":0.001,\"curve\":56.70496750970908,\"curveF\":1.8531329350709154,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":60,\"v1\":61,\"bCoef\":0.001,\"curve\":51.113343185489384,\"curveF\":2.091217925297207,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":61,\"v1\":62,\"bCoef\":0.001,\"curve\":47.12687612155658,\"curveF\":2.2928967260174176,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":62,\"v1\":54,\"bCoef\":0.001,\"curve\":50.63727926142331,\"curveF\":2.1137363043161272,\"cMask\":[\"c0\"],\"color\":\"7D7D7D\"},{\"v0\":63,\"v1\":64,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"252525\"},{\"v0\":64,\"v1\":65,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"252525\"},{\"v0\":65,\"v1\":66,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"252525\"},{\"v0\":66,\"v1\":67,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"252525\"},{\"v0\":67,\"v1\":68,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"252525\"},{\"v0\":69,\"v1\":70,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"252525\"},{\"v0\":70,\"v1\":71,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"252525\"},{\"v0\":63,\"v1\":72,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"252525\"},{\"v0\":72,\"v1\":73,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"252525\"},{\"v0\":73,\"v1\":74,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"252525\"},{\"v0\":75,\"v1\":76,\"bCoef\":1000,\"curve\":56.815759707290354,\"curveF\":1.8488535151318586,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":76,\"v1\":77,\"bCoef\":1000,\"curve\":55.77019487469131,\"curveF\":1.889859817299857,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":77,\"v1\":78,\"bCoef\":1000,\"curve\":47.65205373436533,\"curveF\":2.2645169572469928,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":78,\"v1\":79,\"bCoef\":1000,\"curve\":47.150005370157444,\"curveF\":2.2916343167701854,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":79,\"v1\":80,\"bCoef\":1000,\"curve\":51.300994681964134,\"curveF\":2.082448977640171,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":80,\"v1\":81,\"bCoef\":1000,\"curve\":56.84457368568746,\"curveF\":1.8477430627090397,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":81,\"v1\":82,\"bCoef\":1000,\"curve\":53.13802623009673,\"curveF\":1.9996543034967749,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":82,\"v1\":83,\"bCoef\":1000,\"curve\":48.50643655871874,\"curveF\":2.219584749160252,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":83,\"v1\":75,\"bCoef\":1000,\"curve\":49.3194504477402,\"curveF\":2.1781877280923623,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":84,\"v1\":85,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"],\"color\":\"252525\"},{\"v0\":86,\"v1\":87,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"],\"color\":\"252525\"},{\"v0\":88,\"v1\":89,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"],\"color\":\"252525\"},{\"v0\":90,\"v1\":91,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"],\"color\":\"252525\"},{\"v0\":92,\"v1\":93,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"],\"color\":\"252525\"},{\"v0\":94,\"v1\":95,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"],\"color\":\"252525\"},{\"v0\":95,\"v1\":96,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"],\"color\":\"252525\"},{\"v0\":97,\"v1\":98,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"],\"color\":\"252525\"},{\"v0\":99,\"v1\":100,\"bCoef\":1000,\"curve\":-170,\"curveF\":-0.08748866352592406,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"],\"color\":\"252525\"},{\"v0\":101,\"v1\":102,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"],\"color\":\"252525\"},{\"v0\":103,\"v1\":104,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"],\"color\":\"252525\"},{\"v0\":104,\"v1\":105,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"],\"color\":\"252525\"},{\"v0\":106,\"v1\":107,\"bCoef\":1000,\"cMask\":[\"c0\"],\"cGroup\":[\"ball\"],\"color\":\"252525\"},{\"v0\":108,\"v1\":109,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"252525\"},{\"v0\":109,\"v1\":108,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"252525\"},{\"v0\":110,\"v1\":111,\"bCoef\":0,\"curve\":-179.1117650653646,\"curveF\":-0.007751467314321161,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"FF02A7\"},{\"v0\":111,\"v1\":110,\"bCoef\":0,\"curve\":-179.1117650653661,\"curveF\":-0.0077514673143082805,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"FF02A7\"},{\"v0\":112,\"v1\":113,\"bCoef\":0,\"curve\":-179.1117650653646,\"curveF\":-0.007751467314321161,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"FF02A7\"},{\"v0\":113,\"v1\":112,\"bCoef\":0,\"curve\":-179.1117650653661,\"curveF\":-0.0077514673143082805,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"FF02A7\"},{\"v0\":114,\"v1\":115,\"bCoef\":0,\"curve\":-179.1117650653646,\"curveF\":-0.007751467314321161,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"FF02A7\"},{\"v0\":115,\"v1\":114,\"bCoef\":0,\"curve\":-179.1117650653661,\"curveF\":-0.0077514673143082805,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"FF02A7\"},{\"v0\":116,\"v1\":117,\"bCoef\":0,\"curve\":-179.1117650653646,\"curveF\":-0.007751467314321161,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"D9ACB\"},{\"v0\":117,\"v1\":116,\"bCoef\":0,\"curve\":-179.1117650653661,\"curveF\":-0.0077514673143082805,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"D9ACB\"},{\"v0\":118,\"v1\":119,\"bCoef\":0,\"curve\":-179.1117650653646,\"curveF\":-0.007751467314321161,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"FF02A7\"},{\"v0\":119,\"v1\":118,\"bCoef\":0,\"curve\":-179.1117650653661,\"curveF\":-0.0077514673143082805,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"FF02A7\"},{\"v0\":120,\"v1\":121,\"bCoef\":0,\"curve\":-179.1117650653646,\"curveF\":-0.007751467314321161,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"FF02A7\"},{\"v0\":121,\"v1\":120,\"bCoef\":0,\"curve\":-179.1117650653661,\"curveF\":-0.0077514673143082805,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"FF02A7\"},{\"v0\":122,\"v1\":123,\"bCoef\":0,\"curve\":-179.1117650653646,\"curveF\":-0.007751467314321161,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"FF02A7\"},{\"v0\":123,\"v1\":122,\"bCoef\":0,\"curve\":-179.1117650653661,\"curveF\":-0.0077514673143082805,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"FF02A7\"},{\"v0\":124,\"v1\":125,\"bCoef\":0,\"curve\":-179.1117650653646,\"curveF\":-0.007751467314321161,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"D9ACB\"},{\"v0\":125,\"v1\":124,\"bCoef\":0,\"curve\":-179.1117650653661,\"curveF\":-0.0077514673143082805,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"D9ACB\"},{\"v0\":126,\"v1\":127,\"bCoef\":0,\"curve\":-179.1117650653646,\"curveF\":-0.007751467314321161,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"D9ACB\"},{\"v0\":127,\"v1\":126,\"bCoef\":0,\"curve\":-179.1117650653661,\"curveF\":-0.0077514673143082805,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"D9ACB\"},{\"v0\":128,\"v1\":129,\"bCoef\":0,\"curve\":-179.1117650653646,\"curveF\":-0.007751467314321161,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"D9ACB\"},{\"v0\":129,\"v1\":128,\"bCoef\":0,\"curve\":-179.1117650653661,\"curveF\":-0.0077514673143082805,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"D9ACB\"},{\"v0\":130,\"v1\":131,\"bCoef\":0,\"curve\":-179.1117650653646,\"curveF\":-0.007751467314321161,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"D9ACB\"},{\"v0\":131,\"v1\":130,\"bCoef\":0,\"curve\":-179.1117650653661,\"curveF\":-0.0077514673143082805,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"D9ACB\"},{\"v0\":132,\"v1\":133,\"bCoef\":0,\"curve\":-179.1117650653646,\"curveF\":-0.007751467314321161,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"D9ACB\"},{\"v0\":133,\"v1\":132,\"bCoef\":0,\"curve\":-179.1117650653661,\"curveF\":-0.0077514673143082805,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"D9ACB\"},{\"v0\":134,\"v1\":135,\"bias\":-20,\"bCoef\":0,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"v0\":136,\"v1\":137,\"bias\":50,\"bCoef\":0,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"v0\":137,\"v1\":138,\"bias\":50,\"bCoef\":0,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"v0\":138,\"v1\":139,\"bias\":10,\"bCoef\":0,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]}],\"planes\":[{\"normal\":[0,-1],\"dist\":-496,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[1,0],\"dist\":-794,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[-1,0],\"dist\":-605,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,1],\"dist\":-628,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,-1],\"dist\":-600,\"bCoef\":0,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"normal\":[-1,0],\"dist\":-2000,\"bCoef\":0,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]}],\"goals\":[],\"discs\":[{\"radius\":0.01,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"kick\",\"score\",\"c1\"]},{\"pos\":[270.2563450545189,276.2159566375613],\"speed\":[3,0],\"radius\":7.92482162427559,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[270.2563450545189,256.4039025768724],\"speed\":[3,0],\"radius\":11.887232436413386,\"bCoef\":1000,\"invMass\":5e-324,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"wall\"]},{\"pos\":[290.068399115208,244.51667014045904],\"speed\":[3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[292.44584560249046,224.70461607977],\"speed\":[3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[301.9556315516212,252.44149176473468],\"speed\":[3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[304.33307803890386,228.66702689190782],\"speed\":[3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[286.10598830307015,284.1407782618368],\"speed\":[3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[281.3510953285047,303.95283232252586],\"speed\":[3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[297.9932207394834,280.178367449699],\"speed\":[3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[294.03080992734573,299.99042151038805],\"speed\":[3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[250.44429099383,244.51667014045904],\"speed\":[3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[248.06684450654717,224.70461607977],\"speed\":[3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[238.55705855741655,252.44149176473468],\"speed\":[3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[236.17961207013377,228.66702689190782],\"speed\":[3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[254.40670180596766,284.1407782618368],\"speed\":[3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[259.1615947805331,303.95283232252586],\"speed\":[3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[242.51946936955437,280.178367449699],\"speed\":[3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[246.48188018169213,299.99042151038805],\"speed\":[3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-288.49355150495364,-175.12453786249938],\"speed\":[-3,0],\"radius\":7.92482162427559,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-288.49355150495364,-194.93659192318825],\"speed\":[-3,0],\"radius\":11.887232436413386,\"bCoef\":1000,\"invMass\":5e-324,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"wall\"]},{\"pos\":[-268.68149744426466,-206.82382435960167],\"speed\":[-3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-266.3040509569821,-226.6358784202906],\"speed\":[-3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-256.79426500785144,-198.89900273532604],\"speed\":[-3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-254.4168185205687,-222.6734676081528],\"speed\":[-3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-272.6439082564025,-167.19971623822377],\"speed\":[-3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-277.3988012309679,-147.38766217753482],\"speed\":[-4,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-260.75667581998925,-171.16212705036156],\"speed\":[-3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-264.71908663212685,-151.35007298967264],\"speed\":[-3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-308.30560556564274,-206.82382435960167],\"speed\":[-3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-310.6830520529253,-226.6358784202906],\"speed\":[-3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-320.1928380020562,-198.89900273532604],\"speed\":[-3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-322.5702844893387,-222.6734676081528],\"speed\":[-3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-304.3431947535049,-167.19971623822377],\"speed\":[-3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-299.58830177893947,-147.38766217753482],\"speed\":[-4,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-316.2304271899183,-171.16212705036156],\"speed\":[-3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-312.26801637778055,-151.35007298967264],\"speed\":[-3,0],\"radius\":0,\"bCoef\":1000,\"invMass\":1e-81,\"damping\":1,\"color\":\"7D7D7D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[0,100],\"speed\":[0,-1],\"radius\":1,\"bCoef\":3,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]}],\"playerPhysics\":{\"bCoef\":1.5,\"invMass\":0.7,\"damping\":0.97,\"acceleration\":0.15,\"kickStrength\":15,\"cGroup\":[\"kick\"],\"radius\":14},\"ballPhysics\":\"disc0\",\"cameraFollow\":\"player\",\"spawnDistance\":150,\"joints\":[{\"d0\":1,\"d1\":15,\"length\":17.720439861440493,\"color\":\"7D7D7D\"},{\"d0\":15,\"d1\":16,\"length\":20.37465320694414,\"color\":\"7D7D7D\"},{\"d0\":1,\"d1\":7,\"length\":17.720439861440546,\"color\":\"7D7D7D\"},{\"d0\":7,\"d1\":8,\"length\":20.37465320694414,\"color\":\"7D7D7D\"},{\"d0\":1,\"d1\":9,\"length\":28.018475551095225,\"color\":\"7D7D7D\"},{\"d0\":9,\"d1\":10,\"length\":20.20441005196168,\"color\":\"7D7D7D\"},{\"d0\":17,\"d1\":18,\"length\":20.204410051961702,\"color\":\"7D7D7D\"},{\"d0\":1,\"d1\":17,\"length\":28.018475551095225,\"color\":\"7D7D7D\"},{\"d0\":1,\"d1\":2,\"length\":19.812054060688922,\"color\":\"7D7D7D\"},{\"d0\":2,\"d1\":3,\"length\":23.10462683319051,\"color\":\"7D7D7D\"},{\"d0\":3,\"d1\":4,\"length\":19.954190985944695,\"color\":\"7D7D7D\"},{\"d0\":2,\"d1\":5,\"length\":31.94597727209984,\"color\":\"7D7D7D\"},{\"d0\":5,\"d1\":6,\"length\":23.893041493061755,\"color\":\"7D7D7D\"},{\"d0\":2,\"d1\":11,\"length\":23.104626833190263,\"color\":\"7D7D7D\"},{\"d0\":11,\"d1\":12,\"length\":19.95419098594474,\"color\":\"7D7D7D\"},{\"d0\":2,\"d1\":13,\"length\":31.94597727209984,\"color\":\"7D7D7D\"},{\"d0\":13,\"d1\":14,\"length\":23.893041493061766,\"color\":\"7D7D7D\"},{\"d0\":4,\"d1\":12,\"length\":44.379001095943295,\"color\":\"transparent\"},{\"d0\":8,\"d1\":16,\"length\":22.18950054797159,\"color\":\"transparent\"},{\"d0\":10,\"d1\":18,\"length\":47.548929745653595,\"color\":\"transparent\"},{\"d0\":6,\"d1\":14,\"length\":68.15346596877009,\"color\":\"transparent\"},{\"d0\":5,\"d1\":9,\"length\":28.018475551095072,\"color\":\"transparent\"},{\"d0\":13,\"d1\":17,\"length\":28.018475551095072,\"color\":\"transparent\"},{\"d0\":4,\"d1\":11,\"length\":46.43972518919499,\"color\":\"transparent\"},{\"d0\":3,\"d1\":12,\"length\":46.43972518919534,\"color\":\"transparent\"},{\"d0\":2,\"d1\":12,\"length\":38.69391036059568,\"color\":\"transparent\"},{\"d0\":2,\"d1\":4,\"length\":38.693910360595616,\"color\":\"transparent\"},{\"d0\":2,\"d1\":6,\"length\":43.938115613351584,\"color\":\"transparent\"},{\"d0\":2,\"d1\":14,\"length\":43.93811561335167,\"color\":\"transparent\"},{\"d0\":2,\"d1\":9,\"length\":36.531622640562276,\"color\":\"transparent\"},{\"d0\":2,\"d1\":17,\"length\":36.531622640562276,\"color\":\"transparent\"},{\"d0\":2,\"d1\":15,\"length\":31.945977272099753,\"color\":\"transparent\"},{\"d0\":2,\"d1\":7,\"length\":31.945977272099782,\"color\":\"transparent\"},{\"d0\":2,\"d1\":10,\"length\":49.64886517062598,\"color\":\"transparent\"},{\"d0\":2,\"d1\":8,\"length\":48.82616310544173,\"color\":\"transparent\"},{\"d0\":2,\"d1\":16,\"length\":48.826163105441715,\"color\":\"transparent\"},{\"d0\":2,\"d1\":18,\"length\":49.648865170625925,\"color\":\"transparent\"},{\"d0\":16,\"d1\":18,\"length\":13.284421769584387,\"color\":\"transparent\"},{\"d0\":8,\"d1\":10,\"length\":13.284421769584442,\"color\":\"transparent\"},{\"d0\":4,\"d1\":6,\"length\":12.530243191633014,\"color\":\"transparent\"},{\"d0\":12,\"d1\":14,\"length\":12.530243191633014,\"color\":\"transparent\"},{\"d0\":1,\"d1\":10,\"length\":33.6221706613144,\"color\":\"transparent\"},{\"d0\":1,\"d1\":8,\"length\":29.873529359707177,\"color\":\"transparent\"},{\"d0\":1,\"d1\":18,\"length\":33.62217066131432,\"color\":\"transparent\"},{\"d0\":1,\"d1\":5,\"length\":39.62410812137783,\"color\":\"transparent\"},{\"d0\":1,\"d1\":11,\"length\":37.3813088391649,\"color\":\"transparent\"},{\"d0\":1,\"d1\":3,\"length\":37.38130883916505,\"color\":\"transparent\"},{\"d0\":1,\"d1\":6,\"length\":58.4989269204672,\"color\":\"transparent\"},{\"d0\":1,\"d1\":14,\"length\":58.49892692046727,\"color\":\"transparent\"},{\"d0\":1,\"d1\":12,\"length\":56.08736168361988,\"color\":\"transparent\"},{\"d0\":1,\"d1\":4,\"length\":56.08736168361984,\"color\":\"transparent\"},{\"d0\":9,\"d1\":13,\"length\":65.58956965628084,\"color\":\"transparent\"},{\"d0\":5,\"d1\":17,\"length\":65.58956965628084,\"color\":\"transparent\"},{\"d0\":10,\"d1\":14,\"length\":91.83565600254478,\"color\":\"transparent\"},{\"d0\":6,\"d1\":18,\"length\":91.83565600254464,\"color\":\"transparent\"},{\"d0\":8,\"d1\":12,\"length\":85.95418041280816,\"color\":\"transparent\"},{\"d0\":4,\"d1\":16,\"length\":85.9541804128081,\"color\":\"transparent\"},{\"d0\":7,\"d1\":16,\"length\":33.44424955655312,\"color\":\"transparent\"},{\"d0\":8,\"d1\":15,\"length\":33.44424955655312,\"color\":\"transparent\"},{\"d0\":16,\"d1\":17,\"length\":29.020432770446792,\"color\":\"transparent\"},{\"d0\":8,\"d1\":9,\"length\":29.02043277044676,\"color\":\"transparent\"},{\"d0\":12,\"d1\":13,\"length\":29.321840009819756,\"color\":\"transparent\"},{\"d0\":4,\"d1\":5,\"length\":29.32184000981979,\"color\":\"transparent\"},{\"d0\":19,\"d1\":33,\"length\":17.72043986144061,\"color\":\"7D7D7D\"},{\"d0\":33,\"d1\":34,\"length\":20.374653206944,\"color\":\"7D7D7D\"},{\"d0\":25,\"d1\":26,\"length\":20.374653206943986,\"color\":\"7D7D7D\"},{\"d0\":19,\"d1\":25,\"length\":17.720439861440507,\"color\":\"7D7D7D\"},{\"d0\":27,\"d1\":28,\"length\":20.20441005196156,\"color\":\"7D7D7D\"},{\"d0\":27,\"d1\":28,\"length\":20.20441005196156,\"color\":\"7D7D7D\"},{\"d0\":19,\"d1\":27,\"length\":28.01847555109513,\"color\":\"7D7D7D\"},{\"d0\":19,\"d1\":35,\"length\":28.01847555109541,\"color\":\"7D7D7D\"},{\"d0\":35,\"d1\":36,\"length\":20.20441005196159,\"color\":\"7D7D7D\"},{\"d0\":20,\"d1\":23,\"length\":31.945977272099736,\"color\":\"7D7D7D\"},{\"d0\":23,\"d1\":24,\"length\":23.893041493061677,\"color\":\"7D7D7D\"},{\"d0\":20,\"d1\":21,\"length\":23.104626833190405,\"color\":\"7D7D7D\"},{\"d0\":21,\"d1\":22,\"length\":19.954190985944596,\"color\":\"7D7D7D\"},{\"d0\":20,\"d1\":29,\"length\":23.104626833190505,\"color\":\"7D7D7D\"},{\"d0\":29,\"d1\":30,\"length\":19.954190985944596,\"color\":\"7D7D7D\"},{\"d0\":20,\"d1\":31,\"length\":31.945977272100073,\"color\":\"7D7D7D\"},{\"d0\":31,\"d1\":32,\"length\":23.893041493061656,\"color\":\"7D7D7D\"},{\"d0\":19,\"d1\":20,\"length\":19.812054060688865,\"color\":\"transparent\"},{\"d0\":22,\"d1\":30,\"length\":44.37900109594318,\"color\":\"transparent\"},{\"d0\":22,\"d1\":24,\"length\":12.530243191633005,\"color\":\"transparent\"},{\"d0\":23,\"d1\":27,\"length\":28.01847555109521,\"color\":\"transparent\"},{\"d0\":26,\"d1\":28,\"length\":13.284421769584442,\"color\":\"transparent\"},{\"d0\":26,\"d1\":34,\"length\":22.18950054797159,\"color\":\"transparent\"},{\"d0\":34,\"d1\":36,\"length\":13.284421769584497,\"color\":\"transparent\"},{\"d0\":31,\"d1\":35,\"length\":28.01847555109522,\"color\":\"transparent\"},{\"d0\":30,\"d1\":32,\"length\":12.530243191633005,\"color\":\"transparent\"},{\"d0\":21,\"d1\":30,\"length\":46.43972518919509,\"color\":\"transparent\"},{\"d0\":22,\"d1\":29,\"length\":46.43972518919509,\"color\":\"transparent\"},{\"d0\":26,\"d1\":33,\"length\":33.44424955655303,\"color\":\"transparent\"},{\"d0\":25,\"d1\":34,\"length\":33.44424955655298,\"color\":\"transparent\"},{\"d0\":28,\"d1\":35,\"length\":55.189996305167774,\"color\":\"transparent\"},{\"d0\":27,\"d1\":36,\"length\":55.18999630516762,\"color\":\"transparent\"},{\"d0\":23,\"d1\":32,\"length\":69.94076006749043,\"color\":\"transparent\"},{\"d0\":24,\"d1\":31,\"length\":69.94076006749064,\"color\":\"transparent\"},{\"d0\":19,\"d1\":28,\"length\":33.62217066131436,\"color\":\"transparent\"},{\"d0\":19,\"d1\":26,\"length\":29.873529359707156,\"color\":\"transparent\"},{\"d0\":19,\"d1\":34,\"length\":29.873529359707177,\"color\":\"transparent\"},{\"d0\":19,\"d1\":36,\"length\":33.62217066131444,\"color\":\"transparent\"},{\"d0\":20,\"d1\":24,\"length\":43.93811561335154,\"color\":\"transparent\"},{\"d0\":20,\"d1\":22,\"length\":38.69391036059556,\"color\":\"transparent\"},{\"d0\":20,\"d1\":30,\"length\":38.69391036059562,\"color\":\"transparent\"},{\"d0\":20,\"d1\":32,\"length\":43.93811561335163,\"color\":\"transparent\"},{\"d0\":23,\"d1\":35,\"length\":65.58956965628094,\"color\":\"transparent\"},{\"d0\":27,\"d1\":31,\"length\":65.589569656281,\"color\":\"transparent\"},{\"d0\":19,\"d1\":23,\"length\":39.62410812137776,\"color\":\"transparent\"},{\"d0\":19,\"d1\":31,\"length\":39.62410812137803,\"color\":\"transparent\"},{\"d0\":19,\"d1\":21,\"length\":37.38130883916499,\"color\":\"transparent\"},{\"d0\":19,\"d1\":24,\"length\":58.49892692046713,\"color\":\"transparent\"},{\"d0\":19,\"d1\":22,\"length\":56.08736168361973,\"color\":\"transparent\"},{\"d0\":19,\"d1\":30,\"length\":56.08736168361978,\"color\":\"transparent\"},{\"d0\":19,\"d1\":29,\"length\":37.381308839165044,\"color\":\"transparent\"},{\"d0\":19,\"d1\":32,\"length\":58.49892692046719,\"color\":\"transparent\"},{\"d0\":19,\"d1\":31,\"length\":39.62410812137803,\"color\":\"transparent\"},{\"d0\":20,\"d1\":27,\"length\":36.531622640562226,\"color\":\"transparent\"},{\"d0\":20,\"d1\":35,\"length\":36.531622640562446,\"color\":\"transparent\"},{\"d0\":20,\"d1\":36,\"length\":49.64886517062596,\"color\":\"transparent\"},{\"d0\":20,\"d1\":34,\"length\":48.82616310544167,\"color\":\"transparent\"},{\"d0\":20,\"d1\":26,\"length\":48.826163105441665,\"color\":\"transparent\"},{\"d0\":20,\"d1\":25,\"length\":31.9459772720998,\"color\":\"transparent\"},{\"d0\":20,\"d1\":28,\"length\":49.6488651706259,\"color\":\"transparent\"},{\"d0\":28,\"d1\":32,\"length\":91.83565600254467,\"color\":\"transparent\"},{\"d0\":24,\"d1\":36,\"length\":91.83565600254467,\"color\":\"transparent\"},{\"d0\":26,\"d1\":30,\"length\":85.95418041280804,\"color\":\"transparent\"},{\"d0\":22,\"d1\":34,\"length\":85.95418041280801,\"color\":\"transparent\"},{\"d0\":28,\"d1\":36,\"length\":47.54892974565371,\"color\":\"transparent\"},{\"d0\":24,\"d1\":32,\"length\":68.15346596876998,\"color\":\"transparent\"},{\"d0\":27,\"d1\":35,\"length\":55.47375136992906,\"color\":\"transparent\"},{\"d0\":23,\"d1\":31,\"length\":63.398572994204756,\"color\":\"transparent\"}],\"redSpawnPoints\":[[-159,55],[-120,158],[2,182],[-291,108],[-213,239],[-5,297]],\"blueSpawnPoints\":[[-48,-187],[61,-110],[163,-18],[63,-263],[223,-204],[283,-81]]}";

// Estado del juego
var gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false
};

// Configuración
var config = {
    minPlayers: 2,
    // Zona de respawn izquierda: x = -500, desde y = -522 hasta y = 500
    respawnLeftX: -500,
    respawnLeftMinY: -522,
    respawnLeftMaxY: 500,
    // Zona de respawn arriba: y = -525, desde x = -15000 hasta x = 1000
    respawnTopY: -525,
    respawnTopMinX: -15000,
    respawnTopMaxX: 1000
};

// ============================================
// INICIAR JUEGO
// ============================================
function start(room, onGameEnd) {
    console.log('🎮 WEB SURVIVAL - Iniciando juego...');
    console.log('📊 Jugadores:', room.getPlayerList().filter(p => p.id !== 0).length);
    
    try {
        console.log('🗺️ Cargando mapa..., tipo:', typeof mapData);
        if (!mapData) {
            console.error('❌ mapData es null o undefined!');
            return;
        }
        
        room.setCustomStadium(mapData);
        console.log('✅ Mapa cargado');
    } catch (e) {
        console.error('❌ Error al cargar mapa:', e.message);
        return;
    }
    
    // Revolver y asignar equipos
    try {
        shuffleTeams(room);
        console.log('✅ Equipos asignados');
    } catch (e) {
        console.error('❌ Error al asignar equipos:', e.message);
        return;
    }
    
    gameState.active = true;
    gameState.players = room.getPlayerList().filter(p => p.id !== 0);
    gameState.eliminated = [];
    
    room.sendAnnouncement(
        "🎮 WEB SURVIVAL - ¡AGUANTA EN LA TELARAÑA! 🎮\n" +
        "👥 Jugadores: " + gameState.players.length,
        null,
        0x00BFFF,
        "bold",
        2
    );
    
    setTimeout(() => {
        room.startGame();
        room.pauseGame(true);
        
        gameState.chatBlocked = true;
        
        room.sendAnnouncement(
            "\n📋 INSTRUCCIONES:\n" +
            "⚠️ Aguanta en la telaraña central\n" +
            "🕷️ NO toques las arañas ni los bordes\n" +
            "❌ Si te mandan fuera y reapareces, quedas ELIMINADO\n" +
            "🏆 El último jugador que sobreviva gana!\n\n" +
            "⏱️ El juego comenzará en 5 segundos...",
            null,
            0xFFFF00,
            "bold",
            2
        );
        
        setTimeout(() => {
            room.pauseGame(false);
            gameState.chatBlocked = false;
            room.sendAnnouncement(
                "🟢 ¡COMIENZA!",
                null,
                0x00FF00,
                "bold",
                2
            );
        }, 5000);
    }, 1500);
    
    // Esperar 8 segundos antes de empezar a verificar
    setTimeout(() => {
        gameState.checkInterval = setInterval(() => checkPlayers(room, onGameEnd), 100);
    }, 8500);
}

// ============================================
// VERIFICAR JUGADORES
// ============================================
function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;
    
    var alivePlayers = [];
    
    gameState.players.forEach(p => {
        if (gameState.eliminated.indexOf(p.id) !== -1) return;
        
        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            room.sendAnnouncement("❌ " + p.name + " se desconectó", null, 0xFF6600);
            return;
        }
        
        var pos = player.position;
        if (!pos) return;
        
        var eliminated = false;
        var reason = "";
        
        // Detectar si llegó a la zona de respawn izquierda
        // x < -500 (más a la izquierda de -500), desde y = -522 hasta y = 500
        if (pos.x < config.respawnLeftX && 
            pos.y >= config.respawnLeftMinY && 
            pos.y <= config.respawnLeftMaxY) {
            eliminated = true;
            reason = "fue mandado fuera de la telaraña (izquierda)";
            console.log("💀 " + p.name + " llegó al respawn izquierdo - X: " + pos.x.toFixed(0) + " Y: " + pos.y.toFixed(0));
        }
        
        // Detectar si llegó a la zona de respawn arriba
        // y < -525 (más arriba de -525), desde x = -15000 hasta x = 1000
        if (!eliminated && 
            pos.y < config.respawnTopY && 
            pos.x >= config.respawnTopMinX && 
            pos.x <= config.respawnTopMaxX) {
            eliminated = true;
            reason = "fue mandado fuera de la telaraña (arriba)";
            console.log("💀 " + p.name + " llegó al respawn superior - X: " + pos.x.toFixed(0) + " Y: " + pos.y.toFixed(0));
        }
        
        if (eliminated && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            room.setPlayerTeam(p.id, 0);
            
            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement(
                "❌ " + p.name + " " + reason + "! (" + remaining + " restantes)",
                null,
                0xFF6600
            );
        } else if (!eliminated) {
            alivePlayers.push(p);
        }
    });
    
    // Verificar ganador
    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0], onGameEnd);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement("❌ No hay ganador - todos fueron eliminados", null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

// ============================================
// DECLARAR GANADOR
// ============================================
function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    room.sendAnnouncement(
        "\n🏆 ¡" + winner.name.toUpperCase() + " HA GANADO! 🏆\n",
        null,
        0xFFD700,
        "bold",
        2
    );
    
    // Notificar al bot principal que hay un ganador
    setTimeout(() => {
        if (onGameEnd) {
            onGameEnd(winner);
        }
    }, 3000);
}

// ============================================
// REVOLVER EQUIPOS
// ============================================
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(p => p.id !== 0);
    
    // Revolver array
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = players[i];
        players[i] = players[j];
        players[j] = temp;
    }
    
    // Asignar equipos
    var halfPoint = Math.floor(players.length / 2);
    
    for (var i = 0; i < players.length; i++) {
        if (i < halfPoint) {
            room.setPlayerTeam(players[i].id, 1);
        } else {
            room.setPlayerTeam(players[i].id, 2);
        }
    }
}

// ============================================
// DETENER JUEGO
// ============================================
function stop(room) {
    gameState.active = false;
    
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    gameState.players = [];
    gameState.eliminated = [];
    
    room.stopGame();
}

// ============================================
// EVENTOS
// ============================================
function onPlayerLeave(room, player) {
    if (gameState.active && gameState.eliminated.indexOf(player.id) === -1) {
        gameState.eliminated.push(player.id);
        
        var remaining = gameState.players.length - gameState.eliminated.length;
        room.sendAnnouncement(
            "❌ " + player.name + " se fue (" + remaining + " restantes)",
            null,
            0xFF6600
        );
    }
}

function onPlayerChat(room, player, message) {
    if (gameState.chatBlocked) {
        return false;
    }
    return true;
}

function isActive() {
    return gameState.active;
}

// ============================================
// EXPORTAR
// ============================================
return {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerChat: onPlayerChat,
    onPlayerLeave: onPlayerLeave
};

})();

// ============================================
// MÓDULO: GALACTIC FIT
// ============================================
var GALACTIC = (function() {
// ============================================
// MINIJUEGO: GALACTIC FIT - Esquiva los meteoritos
// ============================================

// NOTA: El mapa será inyectado por bot.js
// No se carga aquí para evitar problemas con fs en el contexto del navegador
// ⚠️ IMPORTANTE: mapData debe ser una STRING JSON, no un objeto JavaScript
// Haxball's room.setCustomStadium() requiere string JSON
var mapData = "{\"name\":\"Galactic Fit by Vhagar & Jordan [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ]\",\"width\":950,\"height\":280,\"bg\":{\"width\":1600,\"height\":280,\"color\":\"7146B1\"},\"vertexes\":[{\"x\":-2000,\"y\":225,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":2000,\"y\":225,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-2000,\"y\":223,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":2000,\"y\":223,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-2000,\"y\":221,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":2000,\"y\":221,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-2000,\"y\":219,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":2000,\"y\":219,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-2000,\"y\":217,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":2000,\"y\":217,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-2000,\"y\":215,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":2000,\"y\":215,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-2000,\"y\":227,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":2000,\"y\":227,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-2000,\"y\":229,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":2000,\"y\":229,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-2000,\"y\":231,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":2000,\"y\":231,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-2000,\"y\":233,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":2000,\"y\":233,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-2000,\"y\":235,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":2000,\"y\":235,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-2000,\"y\":237,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":2000,\"y\":237,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-2000,\"y\":239,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":2000,\"y\":239,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-2000,\"y\":241,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":2000,\"y\":241,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-950,\"y\":20,\"cMask\":[\"wall\"]},{\"x\":-385,\"y\":29,\"cMask\":[\"wall\"]},{\"x\":43,\"y\":21,\"cMask\":[\"wall\"]},{\"x\":481,\"y\":33,\"cMask\":[\"wall\"]},{\"x\":950,\"y\":9,\"cMask\":[\"wall\"]},{\"x\":-955,\"y\":150,\"cMask\":[\"wall\"]},{\"x\":-389,\"y\":114,\"cMask\":[\"wall\"]},{\"x\":-135,\"y\":111,\"cMask\":[\"wall\"]},{\"x\":299,\"y\":130,\"cMask\":[\"wall\"]},{\"x\":639,\"y\":107,\"cMask\":[\"wall\"]},{\"x\":949,\"y\":128,\"cMask\":[\"wall\"]},{\"x\":-950,\"y\":22,\"cMask\":[\"wall\"]},{\"x\":-385,\"y\":31,\"cMask\":[\"wall\"]},{\"x\":43,\"y\":23,\"cMask\":[\"wall\"]},{\"x\":481,\"y\":35,\"cMask\":[\"wall\"]},{\"x\":950,\"y\":11,\"cMask\":[\"wall\"]},{\"x\":-955,\"y\":148,\"cMask\":[\"wall\"]},{\"x\":-389,\"y\":112,\"cMask\":[\"wall\"]},{\"x\":-135,\"y\":109,\"cMask\":[\"wall\"]},{\"x\":299,\"y\":128,\"cMask\":[\"wall\"]},{\"x\":639,\"y\":109,\"cMask\":[\"wall\"]},{\"x\":949,\"y\":126,\"cMask\":[\"wall\"]},{\"x\":-185,\"y\":-152,\"cMask\":[\"wall\"]},{\"x\":-183,\"y\":-152,\"cMask\":[\"wall\"]},{\"x\":-533,\"y\":-60,\"cMask\":[\"wall\"]},{\"x\":-531,\"y\":-60,\"cMask\":[\"wall\"]},{\"x\":-535,\"y\":-60,\"cMask\":[\"wall\"]},{\"x\":-529,\"y\":-60,\"cMask\":[\"wall\"]},{\"x\":683,\"y\":-57,\"cMask\":[\"wall\"]},{\"x\":685,\"y\":-57,\"cMask\":[\"wall\"]},{\"x\":681,\"y\":-57,\"cMask\":[\"wall\"]},{\"x\":687,\"y\":-57,\"cMask\":[\"wall\"]},{\"x\":679,\"y\":-57,\"cMask\":[\"wall\"]},{\"x\":689,\"y\":-57,\"cMask\":[\"wall\"]},{\"x\":751,\"y\":-195,\"cMask\":[\"wall\"]},{\"x\":753,\"y\":-195,\"cMask\":[\"wall\"]},{\"x\":-415,\"y\":-173,\"cMask\":[\"wall\"]},{\"x\":-413,\"y\":-173,\"cMask\":[\"wall\"]},{\"x\":-417,\"y\":-173,\"cMask\":[\"wall\"]},{\"x\":-411,\"y\":-173,\"cMask\":[\"wall\"]},{\"x\":-419,\"y\":-173,\"cMask\":[\"wall\"]},{\"x\":-409,\"y\":-173,\"cMask\":[\"wall\"]},{\"x\":219,\"y\":-39,\"cMask\":[\"wall\"]},{\"x\":221,\"y\":-39,\"cMask\":[\"wall\"]},{\"x\":217,\"y\":-39,\"cMask\":[\"wall\"]},{\"x\":223,\"y\":-39,\"cMask\":[\"wall\"]},{\"x\":-289,\"y\":-76,\"cMask\":[\"wall\"]},{\"x\":-287,\"y\":-76,\"cMask\":[\"wall\"]},{\"x\":-118,\"y\":-7,\"cMask\":[\"wall\"]},{\"x\":-116,\"y\":-7,\"cMask\":[\"wall\"]},{\"x\":-120,\"y\":-7,\"cMask\":[\"wall\"]},{\"x\":-114,\"y\":-7,\"cMask\":[\"wall\"]},{\"x\":-122,\"y\":-7,\"cMask\":[\"wall\"]},{\"x\":-112,\"y\":-7,\"cMask\":[\"wall\"]},{\"x\":-728,\"y\":-142,\"cMask\":[\"wall\"]},{\"x\":-726,\"y\":-142,\"cMask\":[\"wall\"]},{\"x\":-730,\"y\":-142,\"cMask\":[\"wall\"]},{\"x\":-724,\"y\":-142,\"cMask\":[\"wall\"]},{\"x\":952,\"y\":-255,\"bCoef\":0.01,\"cMask\":[\"red\",\"blue\"]},{\"x\":-948,\"y\":-255,\"bCoef\":0.01,\"cMask\":[\"red\",\"blue\"]},{\"x\":38.34609113940883,\"y\":-207.841564857164,\"cMask\":[\"wall\"]},{\"x\":14.154109960144353,\"y\":-142.1548230699348,\"cMask\":[\"wall\"]},{\"x\":38.34609113940883,\"y\":-207.841564857164,\"cMask\":[\"wall\"]},{\"x\":14.154109960144353,\"y\":-142.1548230699348,\"cMask\":[\"wall\"]},{\"x\":38.34609113940883,\"y\":-207.841564857164,\"cMask\":[\"wall\"]},{\"x\":14.154109960144353,\"y\":-142.1548230699348,\"cMask\":[\"wall\"]},{\"x\":38.34609113940883,\"y\":-207.841564857164,\"cMask\":[\"wall\"]},{\"x\":14.154109960144353,\"y\":-142.1548230699348,\"cMask\":[\"wall\"]},{\"x\":38.34609113940883,\"y\":-207.841564857164,\"cMask\":[\"wall\"]},{\"x\":14.154109960144353,\"y\":-142.1548230699348,\"cMask\":[\"wall\"]},{\"x\":38.34609113940883,\"y\":-207.841564857164,\"cMask\":[\"wall\"]},{\"x\":14.154109960144353,\"y\":-142.1548230699348,\"cMask\":[\"wall\"]},{\"x\":38.34609113940883,\"y\":-207.841564857164,\"cMask\":[\"wall\"]},{\"x\":14.154109960144353,\"y\":-142.1548230699348,\"cMask\":[\"wall\"]},{\"x\":38.34609113940883,\"y\":-207.841564857164,\"cMask\":[\"wall\"]},{\"x\":14.154109960144353,\"y\":-142.1548230699348,\"cMask\":[\"wall\"]},{\"x\":38.34609113940883,\"y\":-207.841564857164,\"cMask\":[\"wall\"]},{\"x\":14.154109960144353,\"y\":-142.1548230699348,\"cMask\":[\"wall\"]},{\"x\":38.34609113940883,\"y\":-207.841564857164,\"cMask\":[\"wall\"]},{\"x\":14.154109960144353,\"y\":-142.1548230699348,\"cMask\":[\"wall\"]},{\"x\":38.34609113940883,\"y\":-207.841564857164,\"cMask\":[\"wall\"]},{\"x\":14.154109960144353,\"y\":-142.1548230699348,\"cMask\":[\"wall\"]},{\"x\":38.34609113940883,\"y\":-207.841564857164,\"cMask\":[\"wall\"]},{\"x\":14.154109960144353,\"y\":-142.1548230699348,\"cMask\":[\"wall\"]},{\"x\":38.34609113940883,\"y\":-207.841564857164,\"cMask\":[\"wall\"]},{\"x\":14.154109960144353,\"y\":-142.1548230699348,\"cMask\":[\"wall\"]},{\"x\":38.34609113940883,\"y\":-207.841564857164,\"cMask\":[\"wall\"]},{\"x\":14.154109960144353,\"y\":-142.1548230699348,\"cMask\":[\"wall\"]},{\"x\":338,\"y\":-165,\"cMask\":[\"wall\"]},{\"x\":340,\"y\":-165,\"cMask\":[\"wall\"]},{\"x\":336,\"y\":-165,\"cMask\":[\"wall\"]},{\"x\":342,\"y\":-165,\"cMask\":[\"wall\"]},{\"x\":334,\"y\":-165,\"cMask\":[\"wall\"]},{\"x\":344,\"y\":-165,\"cMask\":[\"wall\"]},{\"x\":537,\"y\":-170,\"cMask\":[\"wall\"]},{\"x\":539,\"y\":-170,\"cMask\":[\"wall\"]},{\"x\":535,\"y\":-170,\"cMask\":[\"wall\"]},{\"x\":541,\"y\":-170,\"cMask\":[\"wall\"]},{\"x\":533,\"y\":-170,\"cMask\":[\"wall\"]},{\"x\":543,\"y\":-170,\"cMask\":[\"wall\"]},{\"x\":489,\"y\":-45,\"cMask\":[\"wall\"]},{\"x\":491,\"y\":-45,\"cMask\":[\"wall\"]},{\"x\":16.63375796178343,\"y\":-44.69443295557946,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":82.62060550914055,\"y\":-44.69443295557946,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":28.36475308131358,\"y\":-69.62279758458102,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":49.62718173546199,\"y\":-12.43419637687154,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":71.62279758458101,\"y\":-69.62279758458102,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":576,\"y\":216,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":666,\"y\":216,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":578,\"y\":214,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":664,\"y\":214,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":580,\"y\":212,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":662,\"y\":212,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":582,\"y\":210,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":660,\"y\":210,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":582,\"y\":208,\"bCoef\":2.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":660,\"y\":208,\"bCoef\":2.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":582,\"y\":208,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":660,\"y\":208,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":582,\"y\":208,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":660,\"y\":208,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":7,\"y\":216,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":97,\"y\":216,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":9,\"y\":214,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":95,\"y\":214,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":11,\"y\":212,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":93,\"y\":212,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":13,\"y\":210,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":91,\"y\":210,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":13,\"y\":208,\"bCoef\":2.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":91,\"y\":208,\"bCoef\":2.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":13,\"y\":208,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":91,\"y\":208,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":13,\"y\":208,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":91,\"y\":208,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-678,\"y\":217,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-588,\"y\":217,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-676,\"y\":215,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-590,\"y\":215,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-674,\"y\":213,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-592,\"y\":213,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-672,\"y\":211,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-594,\"y\":211,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-672,\"y\":209,\"bCoef\":2.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":-594,\"y\":209,\"bCoef\":2.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":-672,\"y\":209,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-594,\"y\":209,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-672,\"y\":209,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-594,\"y\":209,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]}],\"segments\":[{\"v0\":0,\"v1\":1,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"239FE7\"},{\"v0\":2,\"v1\":3,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6AA4EF\"},{\"v0\":4,\"v1\":5,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"9AA4F8\"},{\"v0\":6,\"v1\":7,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"C3B0FB\"},{\"v0\":8,\"v1\":9,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"B8A9FB\"},{\"v0\":10,\"v1\":11,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"FEAFFC\"},{\"v0\":12,\"v1\":13,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"19BE1\"},{\"v0\":14,\"v1\":15,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"588D6\"},{\"v0\":16,\"v1\":17,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"86D7\"},{\"v0\":18,\"v1\":19,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"86D7\"},{\"v0\":20,\"v1\":21,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"7EC9\"},{\"v0\":22,\"v1\":23,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6EB0\"},{\"v0\":24,\"v1\":25,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"7EC9\"},{\"v0\":26,\"v1\":27,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"76BD\"},{\"v0\":28,\"v1\":29,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"5A5EBF\"},{\"v0\":30,\"v1\":29,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"5A5EBF\"},{\"v0\":30,\"v1\":31,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"5A5EBF\"},{\"v0\":32,\"v1\":31,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"5A5EBF\"},{\"v0\":33,\"v1\":34,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"9B47BA\"},{\"v0\":35,\"v1\":34,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"9B47BA\"},{\"v0\":35,\"v1\":36,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"9B47BA\"},{\"v0\":37,\"v1\":36,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"9B47BA\"},{\"v0\":37,\"v1\":38,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"9B47BA\"},{\"v0\":39,\"v1\":40,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"5A5EBF\"},{\"v0\":41,\"v1\":40,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"5A5EBF\"},{\"v0\":41,\"v1\":42,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"5A5EBF\"},{\"v0\":43,\"v1\":42,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"5A5EBF\"},{\"v0\":44,\"v1\":45,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"9B47BA\"},{\"v0\":46,\"v1\":45,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"9B47BA\"},{\"v0\":46,\"v1\":47,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"9B47BA\"},{\"v0\":48,\"v1\":47,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"9B47BA\"},{\"v0\":48,\"v1\":49,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"wall\"],\"color\":\"9B47BA\"},{\"v0\":50,\"v1\":51,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":51,\"v1\":50,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":52,\"v1\":53,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":53,\"v1\":52,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":54,\"v1\":55,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":55,\"v1\":54,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":56,\"v1\":57,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":57,\"v1\":56,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":58,\"v1\":59,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":59,\"v1\":58,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":60,\"v1\":61,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":61,\"v1\":60,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":62,\"v1\":63,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":63,\"v1\":62,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":64,\"v1\":65,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":65,\"v1\":64,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":66,\"v1\":67,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":67,\"v1\":66,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":68,\"v1\":69,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":69,\"v1\":68,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":70,\"v1\":71,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":71,\"v1\":70,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":72,\"v1\":73,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":73,\"v1\":72,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":74,\"v1\":75,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":75,\"v1\":74,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":76,\"v1\":77,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":77,\"v1\":76,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":78,\"v1\":79,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":79,\"v1\":78,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":80,\"v1\":81,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":81,\"v1\":80,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":82,\"v1\":83,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"686DE0\"},{\"v0\":83,\"v1\":82,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"686DE0\"},{\"v0\":84,\"v1\":85,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"686DE0\"},{\"v0\":85,\"v1\":84,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"686DE0\"},{\"v0\":86,\"v1\":87,\"bCoef\":0.01,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":88,\"v1\":89,\"curve\":-109.99999999999999,\"curveF\":-0.7002075382097099,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":90,\"v1\":91,\"curve\":-160.00000000000003,\"curveF\":-0.17632698070846492,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":92,\"v1\":93,\"curve\":-113,\"curveF\":-0.6618855611956914,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":94,\"v1\":95,\"curve\":-116.00000000000004,\"curveF\":-0.6248693519093272,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":96,\"v1\":97,\"curve\":-119,\"curveF\":-0.5890450164205512,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":98,\"v1\":99,\"curve\":-123.00000000000001,\"curveF\":-0.5429556996384369,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":100,\"v1\":101,\"curve\":-126.00000000000003,\"curveF\":-0.5095254494944287,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":102,\"v1\":103,\"curve\":-130.00000000000003,\"curveF\":-0.4663076581549984,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":104,\"v1\":105,\"curve\":-134,\"curveF\":-0.42447481620960476,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":106,\"v1\":107,\"curve\":-138.00000000000003,\"curveF\":-0.38386403503541583,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":108,\"v1\":109,\"curve\":-142.00000000000003,\"curveF\":-0.3443276132896652,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":110,\"v1\":111,\"curve\":-146.00000000000003,\"curveF\":-0.3057306814586602,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":112,\"v1\":113,\"curve\":-150,\"curveF\":-0.26794919243112275,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":114,\"v1\":115,\"curve\":-154,\"curveF\":-0.23086819112556317,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":116,\"v1\":117,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":117,\"v1\":116,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":118,\"v1\":119,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":119,\"v1\":118,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":120,\"v1\":121,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":121,\"v1\":120,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":122,\"v1\":123,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":123,\"v1\":122,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":124,\"v1\":125,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":125,\"v1\":124,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":126,\"v1\":127,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":127,\"v1\":126,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":128,\"v1\":129,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":129,\"v1\":128,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"E6E6E6\"},{\"v0\":130,\"v1\":131,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"9B47BA\"},{\"v0\":131,\"v1\":130,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"9B47BA\"},{\"v0\":132,\"v1\":133,\"bCoef\":0,\"cMask\":[\"wall\"],\"color\":\"9B47BA\"},{\"v0\":133,\"v1\":134,\"bCoef\":0,\"cMask\":[\"wall\"],\"color\":\"9B47BA\"},{\"v0\":135,\"v1\":136,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6EB0\"},{\"v0\":137,\"v1\":138,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6EB0\"},{\"v0\":139,\"v1\":140,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6EB0\"},{\"v0\":141,\"v1\":142,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6EB0\"},{\"v0\":143,\"v1\":144,\"bCoef\":2.1,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"red\",\"blue\"],\"color\":\"4B78\"},{\"v0\":146,\"v1\":145,\"bCoef\":1.6,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"red\",\"blue\"],\"color\":\"5B91\"},{\"v0\":147,\"v1\":135,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"19BE1\"},{\"v0\":149,\"v1\":150,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6EB0\"},{\"v0\":151,\"v1\":152,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6EB0\"},{\"v0\":153,\"v1\":154,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6EB0\"},{\"v0\":155,\"v1\":156,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6EB0\"},{\"v0\":157,\"v1\":158,\"bCoef\":2.1,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"red\",\"blue\"],\"color\":\"4B78\"},{\"v0\":160,\"v1\":159,\"bCoef\":1.6,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"red\",\"blue\"],\"color\":\"5B91\"},{\"v0\":161,\"v1\":149,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"19BE1\"},{\"v0\":163,\"v1\":164,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6EB0\"},{\"v0\":165,\"v1\":166,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6EB0\"},{\"v0\":167,\"v1\":168,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6EB0\"},{\"v0\":169,\"v1\":170,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"6EB0\"},{\"v0\":171,\"v1\":172,\"bCoef\":2.1,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"red\",\"blue\"],\"color\":\"4B78\"},{\"v0\":174,\"v1\":173,\"bCoef\":1.6,\"curve\":20,\"curveF\":5.671281819617709,\"cMask\":[\"red\",\"blue\"],\"color\":\"5B91\"},{\"v0\":175,\"v1\":163,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"color\":\"19BE1\"}],\"planes\":[{\"normal\":[1,0],\"dist\":-950,\"bCoef\":1e-10,\"cMask\":[\"ball\"]},{\"normal\":[-1,0],\"dist\":-950,\"bCoef\":100,\"cMask\":[\"ball\"]},{\"normal\":[0,1],\"dist\":-280,\"bCoef\":0.00001,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[-1,0],\"dist\":-850,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[1,0],\"dist\":-738,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,-1],\"dist\":-215,\"bCoef\":0.0001,\"cMask\":[\"ball\"]},{\"normal\":[0,1],\"dist\":-232,\"bCoef\":0.0001,\"cMask\":[\"ball\"]},{\"normal\":[0,-1],\"dist\":-223,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"red\"]}],\"goals\":[],\"discs\":[{\"gravity\":[0,1e-87],\"radius\":0,\"cMask\":[\"c0\"],\"cGroup\":[\"kick\",\"score\",\"c0\"]},{\"pos\":[-883,113],\"speed\":[1.75,0],\"gravity\":[0,0.05],\"radius\":12,\"bCoef\":10000,\"invMass\":0.00001,\"damping\":1.0001,\"color\":\"A10066\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[827,178],\"speed\":[1.75,0],\"gravity\":[0,0.05],\"radius\":12,\"bCoef\":10000,\"invMass\":0.00001,\"damping\":1.0001,\"color\":\"A10066\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[-705,143],\"speed\":[1.75,0],\"gravity\":[0,0.05],\"radius\":12,\"bCoef\":10000,\"invMass\":0.00001,\"damping\":1.0001,\"color\":\"A10066\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[-561,88],\"speed\":[1.75,0],\"gravity\":[0,0.05],\"radius\":12,\"bCoef\":10000,\"invMass\":0.00001,\"damping\":1.0001,\"color\":\"A10066\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[-645,-46],\"speed\":[1.75,0],\"gravity\":[0,0.05],\"radius\":12,\"bCoef\":10000,\"invMass\":0.00001,\"damping\":1.0001,\"color\":\"A10066\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[552,46],\"speed\":[1.75,0],\"gravity\":[0,0.05],\"radius\":12,\"bCoef\":10000,\"invMass\":0.00001,\"damping\":1.0001,\"color\":\"A10066\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[721,-90],\"speed\":[1.75,0],\"gravity\":[0,0.05],\"radius\":12,\"bCoef\":10000,\"invMass\":0.00001,\"damping\":1.0001,\"color\":\"A10066\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[-795,-62],\"speed\":[1.75,0],\"gravity\":[0,0.05],\"radius\":12,\"bCoef\":10000,\"invMass\":0.00001,\"damping\":1.0001,\"color\":\"A10066\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[0,10000240],\"radius\":10000000,\"color\":\"76BD\",\"cMask\":[\"c3\"],\"cGroup\":[\"c3\"]}],\"playerPhysics\":{\"bCoef\":1.2,\"invMass\":0.7,\"damping\":0.97,\"acceleration\":0.12,\"kickingAcceleration\":0.12,\"kickingDamping\":0.97,\"cGroup\":[\"red\",\"blue\"],\"gravity\":[0,0.2],\"radius\":8},\"ballPhysics\":\"disc0\",\"spawnDistance\":150,\"redSpawnPoints\":[[-30,180],[50,180],[130,180],[210,180],[290,180],[370,180],[-10,180],[-90,180],[-170,180],[-250,180],[-330,180]],\"blueSpawnPoints\":[[10,180],[90,180],[170,180],[250,180],[330,180],[410,180],[490,180],[30,180],[-50,180],[-130,180],[-210,180]]}";

// Estado del juego
var gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false
};

// Configuración
var config = {
    minPlayers: 2,
    // Zona de respawn cuando tocan un meteorito (zona horizontal arriba)
    // Línea desde x: -948 hasta x: 952, en y: -255
    respawnY: -255,
    respawnMinX: -948,
    respawnMaxX: 952
};

// ============================================
// INICIAR JUEGO
// ============================================
function start(room, onGameEnd) {
    console.log('🎮 GALACTIC FIT - Iniciando juego...');
    console.log('📊 Jugadores:', room.getPlayerList().filter(p => p.id !== 0).length);
    
    try {
        console.log('🗺️ Cargando mapa..., tipo:', typeof mapData);
        if (!mapData) {
            console.error('❌ mapData es null o undefined!');
            return;
        }
        
        room.setCustomStadium(mapData);
        console.log('✅ Mapa cargado');
    } catch (e) {
        console.error('❌ Error al cargar mapa:', e.message);
        return;
    }
    
    // Revolver y asignar equipos
    try {
        shuffleTeams(room);
        console.log('✅ Equipos asignados');
    } catch (e) {
        console.error('❌ Error al asignar equipos:', e.message);
        return;
    }
    
    gameState.active = true;
    gameState.players = room.getPlayerList().filter(p => p.id !== 0);
    gameState.eliminated = [];
    
    room.sendAnnouncement(
        "🎮 GALACTIC FIT - ¡ESQUIVA LOS METEORITOS! 🎮\n" +
        "👥 Jugadores: " + gameState.players.length,
        null,
        0x00BFFF,
        "bold",
        2
    );
    
    setTimeout(() => {
        room.startGame();
        room.pauseGame(true);
        
        gameState.chatBlocked = true;
        
        room.sendAnnouncement(
            "\n📋 INSTRUCCIONES:\n" +
            "⚠️ Esquiva los meteoritos que caen\n" +
            "☄️ Si un meteorito te toca, serás eliminado\n" +
            "❌ Los meteoritos te teletransportan al respawn\n" +
            "🏆 El último jugador en pie gana!\n\n" +
            "⏱️ El juego comenzará en 5 segundos...",
            null,
            0xFFFF00,
            "bold",
            2
        );
        
        setTimeout(() => {
            room.pauseGame(false);
            gameState.chatBlocked = false;
            room.sendAnnouncement(
                "🟢 ¡COMIENZA!",
                null,
                0x00FF00,
                "bold",
                2
            );
        }, 5000);
    }, 1500);
    
    // Esperar 8 segundos antes de empezar a verificar
    setTimeout(() => {
        gameState.checkInterval = setInterval(() => checkPlayers(room, onGameEnd), 100);
    }, 8500);
}

// ============================================
// VERIFICAR JUGADORES
// ============================================
function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;
    
    var alivePlayers = [];
    
    gameState.players.forEach(p => {
        if (gameState.eliminated.indexOf(p.id) !== -1) return;
        
        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            room.sendAnnouncement("❌ " + p.name + " se desconectó", null, 0xFF6600);
            return;
        }
        
        var pos = player.position;
        if (!pos) return;
        
        var eliminated = false;
        var reason = "";
        
        // Detectar si llegó a la zona de respawn horizontal arriba (tocó un meteorito)
        // Zona: y <= -255, x entre -948 y 952
        if (pos.y <= config.respawnY && 
            pos.x >= config.respawnMinX && 
            pos.x <= config.respawnMaxX) {
            eliminated = true;
            reason = "fue tocado por un meteorito";
            console.log("☄️ " + p.name + " tocó un meteorito - X: " + pos.x.toFixed(0) + " Y: " + pos.y.toFixed(0));
        }
        
        if (eliminated && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            room.setPlayerTeam(p.id, 0);
            
            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement(
                "❌ " + p.name + " " + reason + "! (" + remaining + " restantes)",
                null,
                0xFF6600
            );
        } else if (!eliminated) {
            alivePlayers.push(p);
        }
    });
    
    // Verificar ganador
    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0], onGameEnd);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement("❌ No hay ganador - todos fueron eliminados", null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

// ============================================
// DECLARAR GANADOR
// ============================================
function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    room.sendAnnouncement(
        "\n🏆 ¡" + winner.name.toUpperCase() + " HA GANADO! 🏆\n",
        null,
        0xFFD700,
        "bold",
        2
    );
    
    // Notificar al bot principal que hay un ganador
    setTimeout(() => {
        if (onGameEnd) {
            onGameEnd(winner);
        }
    }, 3000);
}

// ============================================
// REVOLVER EQUIPOS
// ============================================
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(p => p.id !== 0);
    
    // Revolver array
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = players[i];
        players[i] = players[j];
        players[j] = temp;
    }
    
    // Asignar equipos
    var halfPoint = Math.floor(players.length / 2);
    
    for (var i = 0; i < players.length; i++) {
        if (i < halfPoint) {
            room.setPlayerTeam(players[i].id, 1);
        } else {
            room.setPlayerTeam(players[i].id, 2);
        }
    }
}

// ============================================
// DETENER JUEGO
// ============================================
function stop(room) {
    gameState.active = false;
    
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    gameState.players = [];
    gameState.eliminated = [];
    
    room.stopGame();
}

// ============================================
// EVENTOS
// ============================================
function onPlayerLeave(room, player) {
    if (gameState.active && gameState.eliminated.indexOf(player.id) === -1) {
        gameState.eliminated.push(player.id);
        
        var remaining = gameState.players.length - gameState.eliminated.length;
        room.sendAnnouncement(
            "❌ " + player.name + " se fue (" + remaining + " restantes)",
            null,
            0xFF6600
        );
    }
}

function onPlayerChat(room, player, message) {
    if (gameState.chatBlocked) {
        return false;
    }
    return true;
}

function isActive() {
    return gameState.active;
}

// ============================================
// EXPORTAR
// ============================================
return {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerChat: onPlayerChat,
    onPlayerLeave: onPlayerLeave
};

})();

// ============================================
// MÓDULO: SPACE MELEE
// ============================================
var SPACE_MELEE = (function() {
// ============================================
// MINIJUEGO: SPACE MELEE - Elimina al que salga del cuadrado
// ============================================

// NOTA: El mapa será inyectado por bot.js
// mapData debe ser una STRING JSON, no un objeto JavaScript
var mapData = "{\"name\":\"Space Melee by Namajunas [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ]\",\"width\":400,\"height\":400,\"bg\":{\"width\":300,\"height\":300,\"kickOffRadius\":75,\"cornerRadius\":300,\"color\":\"90909\"},\"vertexes\":[{\"x\":-353.32921610431345,\"y\":0,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":351.8196375602522,\"y\":0,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":-339.50276799324354,\"y\":0,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":337.9931894491822,\"y\":0,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":-325.6763198821736,\"y\":0,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":324.1667413381123,\"y\":0,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":317.25351728257726,\"y\":0,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":331.0799653936473,\"y\":0,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":344.9064135047172,\"y\":0,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":-318.7630958266386,\"y\":0,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":-332.5895439377086,\"y\":0,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":-346.4159920487785,\"y\":0,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":310.34029322704237,\"y\":0,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":-311.84987177110366,\"y\":0,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"]},{\"x\":-377,\"y\":-377,\"bCoef\":0,\"cMask\":[\"red\",\"blue\",\"c2\"],\"cGroup\":[\"red\",\"blue\",\"c2\"]},{\"x\":377,\"y\":-377,\"bCoef\":0,\"cMask\":[\"red\",\"blue\",\"c2\"],\"cGroup\":[\"red\",\"blue\",\"c2\"]},{\"x\":377,\"y\":377,\"bCoef\":0,\"cMask\":[\"red\",\"blue\",\"c2\"],\"cGroup\":[\"red\",\"blue\",\"c2\"]},{\"x\":-377,\"y\":377,\"bCoef\":0,\"cMask\":[\"red\",\"blue\",\"c2\"],\"cGroup\":[\"red\",\"blue\",\"c2\"]},{\"x\":-6.816577511584228,\"y\":17.721691909880462,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-6.816577511584228,\"y\":-21.242069272147845,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":15.57652796637808,\"y\":14.419678250386525,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":15.57652796637808,\"y\":-15.298444685058847,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":8.112159473723977,\"y\":-15.298444685058847,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":8.112159473723977,\"y\":-3.4111955108806313,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-4.017439326839053,\"y\":3.1928318081071936,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":8.112159473723977,\"y\":23.665316496969574,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":8.112159473723977,\"y\":9.136456395196248,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-14.28094600423853,\"y\":17.721691909880462,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-14.28094600423853,\"y\":-11.996431025564902,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-9.61571569632963,\"y\":-4.732000974678286,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":0.6477909810698748,\"y\":-31.808512982528356,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":0.6477909810698748,\"y\":34.23176020735008,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]}],\"segments\":[{\"v0\":0,\"v1\":1,\"bCoef\":-100000,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"],\"color\":\"333333\"},{\"v0\":1,\"v1\":0,\"bCoef\":-100000,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"],\"color\":\"333333\"},{\"v0\":2,\"v1\":3,\"bCoef\":-100000,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"],\"color\":\"333333\"},{\"v0\":3,\"v1\":2,\"bCoef\":-100000,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"],\"color\":\"333333\"},{\"v0\":4,\"v1\":5,\"bCoef\":-100000,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"],\"color\":\"333333\"},{\"v0\":5,\"v1\":4,\"bCoef\":-100000,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"],\"color\":\"333333\"},{\"v0\":6,\"v1\":9,\"bCoef\":-100000,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"],\"color\":\"333333\"},{\"v0\":9,\"v1\":6,\"bCoef\":-100000,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"],\"color\":\"333333\"},{\"v0\":7,\"v1\":10,\"bCoef\":-100000,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"],\"color\":\"333333\"},{\"v0\":10,\"v1\":7,\"bCoef\":-100000,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"],\"color\":\"333333\"},{\"v0\":8,\"v1\":11,\"bCoef\":-100000,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"],\"color\":\"333333\"},{\"v0\":11,\"v1\":8,\"bCoef\":-100000,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"],\"color\":\"333333\"},{\"v0\":12,\"v1\":13,\"bCoef\":-100000,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"],\"color\":\"333333\"},{\"v0\":13,\"v1\":12,\"bCoef\":-100000,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"all\"],\"color\":\"333333\"},{\"v0\":14,\"v1\":15,\"bias\":10,\"bCoef\":0,\"cMask\":[\"red\",\"blue\",\"c2\"],\"cGroup\":[\"red\",\"blue\",\"c2\"],\"color\":\"80808\"},{\"v0\":15,\"v1\":16,\"bias\":10,\"bCoef\":0,\"cMask\":[\"red\",\"blue\",\"c2\"],\"cGroup\":[\"red\",\"blue\",\"c2\"],\"color\":\"80808\"},{\"v0\":16,\"v1\":17,\"bias\":10,\"bCoef\":0,\"cMask\":[\"red\",\"blue\",\"c2\"],\"cGroup\":[\"red\",\"blue\",\"c2\"],\"color\":\"80808\"},{\"v0\":14,\"v1\":17,\"bias\":-10,\"bCoef\":0,\"cMask\":[\"red\",\"blue\",\"c2\"],\"cGroup\":[\"red\",\"blue\",\"c2\"],\"color\":\"80808\"},{\"v0\":18,\"v1\":19,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"v0\":19,\"v1\":20,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"v0\":20,\"v1\":21,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"v0\":21,\"v1\":22,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"v0\":22,\"v1\":23,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"v0\":24,\"v1\":25,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"v0\":25,\"v1\":26,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"v0\":18,\"v1\":27,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"v0\":27,\"v1\":28,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"v0\":28,\"v1\":29,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"v0\":30,\"v1\":31,\"curve\":-179.9999999999998,\"curveF\":-1.9371691043679142e-15,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"v0\":31,\"v1\":30,\"curve\":-179.9999999999998,\"curveF\":-1.9371691043679142e-15,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]}],\"planes\":[{\"normal\":[0,-1],\"dist\":-437,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[1,0],\"dist\":-426,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[-1,0],\"dist\":-416,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,1],\"dist\":-433,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,-1],\"dist\":-596,\"bCoef\":0,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]}],\"goals\":[],\"discs\":[{\"radius\":0,\"bCoef\":1,\"invMass\":1e-15,\"damping\":0,\"color\":\"90909\",\"cMask\":[\"c1\"],\"cGroup\":[\"kick\",\"score\",\"c0\"]},{\"radius\":0,\"bCoef\":1,\"invMass\":0,\"damping\":0,\"color\":\"851D08\",\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[0,272],\"speed\":[0.1,0],\"radius\":27,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"color\":\"A1988C\",\"cMask\":[\"red\",\"blue\",\"c3\"],\"cGroup\":[\"red\",\"blue\",\"c1\"]},{\"pos\":[0,-272],\"speed\":[-0.1,0],\"radius\":27,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"color\":\"F0BC13\",\"cMask\":[\"red\",\"blue\",\"c1\"],\"cGroup\":[\"red\",\"blue\",\"c1\"]},{\"pos\":[-264,0],\"speed\":[0,0.1],\"radius\":27,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"color\":\"A70FF\",\"cMask\":[\"red\",\"blue\",\"c2\"],\"cGroup\":[\"red\",\"blue\",\"c2\"]},{\"pos\":[-262,-7],\"speed\":[0,0.1],\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"color\":\"17C407\",\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-249,8],\"speed\":[0,0.1],\"radius\":4,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"color\":\"17C407\",\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[280,0],\"speed\":[0,-0.1],\"radius\":27,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"color\":\"FCC783\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[280,0],\"speed\":[0,-0.1],\"radius\":19,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"color\":\"40812\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[280,0],\"speed\":[0,-0.1],\"radius\":15,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"color\":\"F0B553\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[280,0],\"speed\":[0,-0.1],\"radius\":23,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"color\":\"transparent\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[0,-50],\"speed\":[0,1],\"bCoef\":15,\"invMass\":1e+22,\"damping\":1,\"color\":\"transparent\",\"cMask\":[\"c0\"],\"cGroup\":[\"c1\"]},{\"pos\":[-338,-345],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-342,-258],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-244,-346],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-270,-279],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[263,-354],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[259,-267],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[357,-355],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[331,-288],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[265,256],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[261,343],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[359,255],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[333,322],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-351,276],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-357,361],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-259,273],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-285,340],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-391,131],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[370,93],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[380,55],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[354,122],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[347,-220],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[321,-153],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-356,-185],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-382,-118],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-180,-336],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-108,-357],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[130,-343],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[204,-323],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-200,382],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-128,361],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-33,391],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[39,370],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[117,376],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[189,355],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[462,-346],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[458,-259],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[556,-347],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[530,-280],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[464,264],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[460,351],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[558,263],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[532,330],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[495,33],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[505,-5],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[479,62],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[546,-212],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[520,-145],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[329,-335],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[403,-315],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-1,390],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[71,369],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[166,399],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[238,378],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[316,384],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[388,363],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-666,-298],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-732,246],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-736,333],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-638,245],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-664,312],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-627,83],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-617,45],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-643,112],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-650,-230],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-676,-163],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-565,-114],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-535,-356],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-539,-269],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-441,-357],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-467,-290],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-533,254],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-537,341],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-439,253],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-465,320],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-428,91],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-418,53],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-444,120],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-451,-222],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-477,-155],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-668,-345],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-594,-325],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-588,-70],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-759,368],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[569,4],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[585,72],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[559,139],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[670,188],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[696,33],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[567,-43],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[641,-23],\"radius\":2.5,\"bCoef\":1,\"invMass\":0.00001,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[-2000,0],\"speed\":[0.3,0],\"radius\":400,\"bCoef\":-10000,\"invMass\":1e-73,\"damping\":1,\"color\":\"111111\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[2000,0],\"speed\":[-0.3,0],\"radius\":400,\"bCoef\":-10000,\"invMass\":1e-73,\"damping\":1,\"color\":\"111111\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]}],\"playerPhysics\":{\"bCoef\":1.6,\"invMass\":1e+307,\"damping\":0.991,\"acceleration\":0.03,\"kickingAcceleration\":0.04,\"kickingDamping\":0.98,\"kickStrength\":0},\"ballPhysics\":\"disc0\",\"spawnDistance\":350,\"joints\":[{\"d0\":1,\"d1\":6,\"length\":249.12848090894786,\"color\":\"transparent\"},{\"d0\":1,\"d1\":5,\"length\":262.0934947685654,\"color\":\"transparent\"},{\"d0\":1,\"d1\":4,\"length\":264,\"color\":\"transparent\"},{\"d0\":1,\"d1\":2,\"length\":272,\"color\":\"transparent\"},{\"d0\":1,\"d1\":3,\"length\":272,\"color\":\"transparent\"},{\"d0\":5,\"d1\":6,\"length\":19.849433241279208,\"color\":\"transparent\"},{\"d0\":4,\"d1\":6,\"length\":17,\"color\":\"transparent\"},{\"d0\":4,\"d1\":5,\"length\":7.280109889280518,\"color\":\"transparent\"},{\"d0\":3,\"d1\":4,\"length\":379.0514476954283,\"color\":\"transparent\"},{\"d0\":3,\"d1\":5,\"length\":372.651311550087,\"color\":\"transparent\"},{\"d0\":3,\"d1\":6,\"length\":374.70121430280955,\"color\":\"transparent\"},{\"d0\":2,\"d1\":4,\"length\":379.0514476954283,\"color\":\"transparent\"},{\"d0\":1,\"d1\":7,\"length\":280,\"color\":\"transparent\"},{\"d0\":1,\"d1\":8,\"length\":280,\"color\":\"transparent\"},{\"d0\":1,\"d1\":10,\"length\":280,\"color\":\"transparent\"},{\"d0\":1,\"d1\":9,\"length\":280,\"color\":\"transparent\"}],\"redSpawnPoints\":[[-208.2222213745117,-9.87847900390625],[-208.2222213745117,-88.87847900390625],[-208.2222213745117,69.12152099609375],[-208.2222213745117,155.12152099609375],[-208.2222213745117,-164.87847900390625]],\"blueSpawnPoints\":[[208.2222213745117,-9.87847900390625],[208.2222213745117,-88.87847900390625],[208.2222213745117,69.12152099609375],[208.2222213745117,155.12152099609375],[208.2222213745117,-164.87847900390625]]}";

var gameState = {
    active: false,
    checkInterval: null,
    players: []
};

var config = {
    minPlayers: 2,
    bounds: 377,
    checkMs: 500
};

function isOutside(x, y) {
    var b = config.bounds;
    return x < -b || x > b || y < -b || y > b;
}

function start(room, onEnd) {
    if (gameState.active) return;
    gameState.active = true;

    try {
        if (!mapData) {
            console.error('❌ SPACE_MELEE: mapData no está disponible');
        } else {
            room.setCustomStadium(mapData);
        }
    } catch (e) {
        console.error('❌ SPACE_MELEE: fallo al cargar mapa', e && e.message);
    }

    // Mezclar equipos y pausar como en LALALA
    try {
        shuffleTeams(room);
    } catch (e) {}

    gameState.players = room.getPlayerList().filter(function(p){ return p.id !== 0; });

    room.sendAnnouncement('🎲 Minijuego: SPACE MELEE\n👥 Jugadores: ' + gameState.players.length + '\n⏱️ Iniciando en 3 segundos...', null, 0x00BFFF, 'bold', 2);

    setTimeout(function(){
        room.startGame();
        room.pauseGame(true);

        room.sendAnnouncement('\n📋 INSTRUCCIONES:\n⚠️ No salgas del área cuadrada (A/B/C/D ±' + config.bounds + ')\n🏆 Último jugador en equipo gana\n\n⏱️ Comienza en 3s...', null, 0xFFFF00, 'bold', 2);

        setTimeout(function(){
            room.pauseGame(false);
            room.sendAnnouncement('🟢 ¡COMIENZA SPACE MELEE!', null, 0x00FF00, 'bold', 2);
        }, 3000);
    }, 1500);

    // Inicio de comprobación periódica
    setTimeout(function(){
        gameState.checkInterval = setInterval(function(){ checkPlayers(room, onEnd); }, config.checkMs);
    }, 4500);
}

function checkPlayers(room, onEnd) {
    if (!gameState.active) return;

    var players = room.getPlayerList().filter(function(p){ return p.id !== 0; });

    players.forEach(function(p){
        if (!p) return;
        try {
            var x = (typeof p.x === 'number') ? p.x : (p.position && p.position.x) || 0;
            var y = (typeof p.y === 'number') ? p.y : (p.position && p.position.y) || 0;

            if (p.team === 0) return;

            if (isOutside(x, y)) {
                try {
                    room.setPlayerTeam(p.id, 0);
                    room.sendAnnouncement('❌ ' + p.name + ' eliminado (salió del área)', null, 0xFF0000);
                } catch(e) {}
            }
        } catch(e) {}
    });

    var alive = room.getPlayerList().filter(function(p){ return p.id !== 0 && p.team !== 0; });

    if (alive.length <= 1) {
        if (gameState.checkInterval) {
            clearInterval(gameState.checkInterval);
            gameState.checkInterval = null;
        }
        gameState.active = false;
        if (alive.length === 1) {
            room.sendAnnouncement('\n🏆 ¡' + alive[0].name.toUpperCase() + ' HA GANADO! 🏆', null, 0xFFD700, 'bold', 2);
            setTimeout(function(){ onEnd && onEnd(alive[0]); }, 1000);
        } else {
            room.sendAnnouncement('❌ No hay ganador - todos fueron eliminados', null, 0xFF0000);
            setTimeout(function(){ onEnd && onEnd(null); }, 1000);
        }
    }
}

function stop(room) {
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    gameState.active = false;
    gameState.players = [];
}

function shuffleTeams(room) {
    var players = room.getPlayerList().filter(function(p){ return p.id !== 0; });
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
    }
    var half = Math.floor(players.length / 2);
    for (var k = 0; k < players.length; k++) {
        room.setPlayerTeam(players[k].id, (k < half) ? 1 : 2);
    }
}

function onPlayerLeave(room, player) {
    // no-op adicional
}

function onPlayerChat(player) {
    return true;
}

function setMapData(m) { mapData = m; }

function isActive() { return gameState.active; }

return {
    start: start,
    stop: stop,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: setMapData,
    isActive: isActive
};
// ============================================
// MINIJUEGO: SPACE MELEE - Elimina al que salga del cuadrado
// ============================================

// NOTA: El mapa será inyectado por bot.js
// mapData debe ser una STRING JSON, no un objeto JavaScript
var mapData = null;

var gameState = {
    active: false,
    checkInterval: null,
    players: []
};

var config = {
    minPlayers: 2,
    bounds: 377,
    checkMs: 500
};

function isOutside(x, y) {
    var b = config.bounds;
    return x < -b || x > b || y < -b || y > b;
}

function start(room, onEnd) {
    if (gameState.active) return;
    gameState.active = true;

    try {
        if (!mapData) {
            console.error('❌ SPACE_MELEE: mapData no está disponible');
        } else {
            room.setCustomStadium(mapData);
        }
    } catch (e) {
        console.error('❌ SPACE_MELEE: fallo al cargar mapa', e && e.message);
    }

    // Mezclar equipos y pausar como en LALALA
    try {
        shuffleTeams(room);
    } catch (e) {}

    gameState.players = room.getPlayerList().filter(function(p){ return p.id !== 0; });

    room.sendAnnouncement('🎲 Minijuego: SPACE MELEE\n👥 Jugadores: ' + gameState.players.length + '\n⏱️ Iniciando en 3 segundos...', null, 0x00BFFF, 'bold', 2);

    setTimeout(function(){
        room.startGame();
        room.pauseGame(true);

        room.sendAnnouncement('\n📋 INSTRUCCIONES:\n⚠️ No salgas del área cuadrada (A/B/C/D ±' + config.bounds + ')\n🏆 Último jugador en equipo gana\n\n⏱️ Comienza en 3s...', null, 0xFFFF00, 'bold', 2);

        setTimeout(function(){
            room.pauseGame(false);
            room.sendAnnouncement('🟢 ¡COMIENZA SPACE MELEE!', null, 0x00FF00, 'bold', 2);
        }, 3000);
    }, 1500);

    // Inicio de comprobación periódica
    setTimeout(function(){
        gameState.checkInterval = setInterval(function(){ checkPlayers(room, onEnd); }, config.checkMs);
    }, 4500);
}

function checkPlayers(room, onEnd) {
    if (!gameState.active) return;

    var players = room.getPlayerList().filter(function(p){ return p.id !== 0; });

    players.forEach(function(p){
        if (!p) return;
        try {
            var x = (typeof p.x === 'number') ? p.x : (p.position && p.position.x) || 0;
            var y = (typeof p.y === 'number') ? p.y : (p.position && p.position.y) || 0;

            if (p.team === 0) return;

            if (isOutside(x, y)) {
                try {
                    room.setPlayerTeam(p.id, 0);
                    room.sendAnnouncement('❌ ' + p.name + ' eliminado (salió del área)', null, 0xFF0000);
                } catch(e) {}
            }
        } catch(e) {}
    });

    var alive = room.getPlayerList().filter(function(p){ return p.id !== 0 && p.team !== 0; });

    if (alive.length <= 1) {
        if (gameState.checkInterval) {
            clearInterval(gameState.checkInterval);
            gameState.checkInterval = null;
        }
        gameState.active = false;
        if (alive.length === 1) {
            room.sendAnnouncement('\n🏆 ¡' + alive[0].name.toUpperCase() + ' HA GANADO! 🏆', null, 0xFFD700, 'bold', 2);
            setTimeout(function(){ onEnd && onEnd(alive[0]); }, 1000);
        } else {
            room.sendAnnouncement('❌ No hay ganador - todos fueron eliminados', null, 0xFF0000);
            setTimeout(function(){ onEnd && onEnd(null); }, 1000);
        }
    }
}

function stop(room) {
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    gameState.active = false;
    gameState.players = [];
}

function shuffleTeams(room) {
    var players = room.getPlayerList().filter(function(p){ return p.id !== 0; });
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
    }
    var half = Math.floor(players.length / 2);
    for (var k = 0; k < players.length; k++) {
        room.setPlayerTeam(players[k].id, (k < half) ? 1 : 2);
    }
}

function onPlayerLeave(room, player) {
    // no-op adicional
}

function onPlayerChat(player) {
    return true;
}

function setMapData(m) { mapData = m; }

function isActive() { return gameState.active; }

return {
    start: start,
    stop: stop,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: setMapData,
    isActive: isActive
};

})();

// ============================================
// MÓDULO: GYM
// ============================================
var GYM = (function() {
// ============================================
// MINIJUEGO: GYM - Entra a los recuadros
// ============================================

// NOTA: El mapa será inyectado por bot.js
// No se carga aquí para evitar problemas con fs en el contexto del navegador
// ⚠️ IMPORTANTE: mapData debe ser una STRING JSON, no un objeto JavaScript
// Haxball's room.setCustomStadium() requiere string JSON
var mapData = "{\"name\":\"GYM from HaxMaps\",\"width\":420,\"height\":200,\"bg\":{\"type\":\"hockey\"},\"vertexes\":[{\"x\":-15,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":15,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":-25,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":-55,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":-95,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":-65,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":-105,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":-135,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":-175,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":-145,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":-185,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":-215,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":-255,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":-225,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":25,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":55,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":95,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":65,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":105,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":135,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":175,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":145,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":185,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":215,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":255,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":225,\"y\":50,\"bCoef\":0,\"cMask\":[\"wall\"]},{\"x\":-259,\"y\":76,\"bCoef\":-3,\"cMask\":[\"red\",\"blue\"]},{\"x\":259,\"y\":76,\"bCoef\":-3,\"cMask\":[\"red\",\"blue\"]},{\"x\":-60,\"y\":20,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-60,\"y\":84,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-100,\"y\":20,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-100,\"y\":84,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-140,\"y\":20,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-140,\"y\":84,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-180,\"y\":20,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-180,\"y\":84,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-220,\"y\":20,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-220,\"y\":84,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-260,\"y\":20,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-260,\"y\":84,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":60,\"y\":20,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":60,\"y\":84,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":100,\"y\":20,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":100,\"y\":84,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":140,\"y\":20,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":140,\"y\":84,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":180,\"y\":20,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":180,\"y\":84,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":220,\"y\":20,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":220,\"y\":84,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":260,\"y\":20,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":260,\"y\":84,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":20,\"y\":20,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":20,\"y\":84,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-20,\"y\":20,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-20,\"y\":84,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-420,\"y\":65,\"bCoef\":0,\"cMask\":[\"ball\"],\"cGroup\":[\"ball\"]},{\"x\":420,\"y\":65,\"bCoef\":0,\"cMask\":[\"ball\"],\"cGroup\":[\"ball\"]},{\"x\":-420,\"y\":200,\"cMask\":[\"red\",\"blue\"]},{\"x\":-420,\"y\":-200,\"cMask\":[\"red\",\"blue\"]},{\"x\":420,\"y\":-200,\"cMask\":[\"red\",\"blue\"]},{\"x\":420,\"y\":200,\"cMask\":[\"red\",\"blue\"]},{\"x\":-470,\"y\":200,\"cMask\":[\"red\",\"blue\"]},{\"x\":-470,\"y\":-250,\"cMask\":[\"red\",\"blue\"]},{\"x\":470,\"y\":-250,\"cMask\":[\"red\",\"blue\"]},{\"x\":470,\"y\":200,\"cMask\":[\"red\",\"blue\"]},{\"x\":-420,\"y\":35,\"bCoef\":10,\"cMask\":[\"ball\"],\"cGroup\":[\"ball\"]},{\"x\":420,\"y\":35,\"bCoef\":10,\"cMask\":[\"ball\"],\"cGroup\":[\"ball\"]},{\"x\":-260,\"y\":-193,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"]},{\"x\":260,\"y\":-193,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"]},{\"x\":260,\"y\":-210,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"]},{\"x\":-260,\"y\":-210,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"]},{\"x\":-413,\"y\":-110,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"]},{\"x\":-413,\"y\":-10,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"]},{\"x\":-430,\"y\":-10,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"]},{\"x\":-430,\"y\":-110,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"]},{\"x\":413,\"y\":-110,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"]},{\"x\":413,\"y\":-10,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"]},{\"x\":430,\"y\":-10,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"]},{\"x\":430,\"y\":-110,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"]}],\"segments\":[{\"v0\":0,\"v1\":1,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":1,\"v1\":0,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":2,\"v1\":3,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":3,\"v1\":2,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":4,\"v1\":5,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":5,\"v1\":4,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":6,\"v1\":7,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":7,\"v1\":6,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":8,\"v1\":9,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":9,\"v1\":8,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":10,\"v1\":11,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":11,\"v1\":10,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":12,\"v1\":13,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":13,\"v1\":12,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":14,\"v1\":15,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":15,\"v1\":14,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":16,\"v1\":17,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":17,\"v1\":16,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":18,\"v1\":19,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":19,\"v1\":18,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":20,\"v1\":21,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":21,\"v1\":20,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":22,\"v1\":23,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":23,\"v1\":22,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":24,\"v1\":25,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":25,\"v1\":24,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"444444\"},{\"v0\":26,\"v1\":27,\"bCoef\":-3,\"cMask\":[\"red\",\"blue\"],\"color\":\"CCCCCC\"},{\"v0\":28,\"v1\":29,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"222222\"},{\"v0\":30,\"v1\":31,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"222222\"},{\"v0\":32,\"v1\":33,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"222222\"},{\"v0\":34,\"v1\":35,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"222222\"},{\"v0\":36,\"v1\":37,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"222222\"},{\"v0\":38,\"v1\":39,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"222222\"},{\"v0\":40,\"v1\":41,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"222222\"},{\"v0\":42,\"v1\":43,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"222222\"},{\"v0\":44,\"v1\":45,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"222222\"},{\"v0\":46,\"v1\":47,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"222222\"},{\"v0\":48,\"v1\":49,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"222222\"},{\"v0\":50,\"v1\":51,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"222222\"},{\"v0\":52,\"v1\":53,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"222222\"},{\"v0\":54,\"v1\":55,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"222222\"},{\"v0\":39,\"v1\":51,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"222222\"},{\"v0\":38,\"v1\":50,\"bCoef\":0.25,\"cMask\":[\"wall\"],\"color\":\"333333\"},{\"v0\":56,\"v1\":57,\"bCoef\":0,\"vis\":false,\"cMask\":[\"ball\"],\"cGroup\":[\"ball\"]},{\"v0\":58,\"v1\":59,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":59,\"v1\":60,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":60,\"v1\":61,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":62,\"v1\":63,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":63,\"v1\":64,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":64,\"v1\":65,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":66,\"v1\":67,\"bCoef\":10,\"vis\":false,\"cMask\":[\"ball\"],\"cGroup\":[\"ball\"]},{\"v0\":68,\"v1\":69,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"],\"color\":\"6A1B7E\"},{\"v0\":69,\"v1\":70,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"],\"color\":\"6A1B7E\"},{\"v0\":68,\"v1\":71,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"],\"color\":\"6A1B7E\"},{\"v0\":72,\"v1\":73,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"],\"color\":\"6A1B7E\"},{\"v0\":73,\"v1\":74,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"],\"color\":\"6A1B7E\"},{\"v0\":72,\"v1\":75,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"],\"color\":\"6A1B7E\"},{\"v0\":76,\"v1\":77,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"],\"color\":\"6A1B7E\"},{\"v0\":77,\"v1\":78,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"],\"color\":\"6A1B7E\"},{\"v0\":76,\"v1\":79,\"bCoef\":5,\"cMask\":[\"red\",\"blue\"],\"color\":\"6A1B7E\"}],\"planes\":[{\"normal\":[0,1],\"dist\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0,-1],\"dist\":-70,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[1,0],\"dist\":-220,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-1,0],\"dist\":-220,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[1,0],\"dist\":-6500,\"bCoef\":-0.0001,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"normal\":[-1,0],\"dist\":-6500,\"bCoef\":-0.0001,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"normal\":[0,1],\"dist\":-1000,\"bCoef\":0,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"normal\":[0,-1],\"dist\":-200,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[1,0],\"dist\":-720,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[-1,0],\"dist\":-720,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,1],\"dist\":-500,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[1,0],\"dist\":-6500,\"cMask\":[\"ball\"]},{\"normal\":[-1,0],\"dist\":-6500,\"cMask\":[\"ball\"]}],\"goals\":[],\"discs\":[{\"radius\":15,\"bCoef\":1,\"damping\":1,\"color\":\"transparent\",\"cMask\":[\"ball\"],\"cGroup\":[\"ball\",\"kick\",\"score\"]},{\"pos\":[0,-85],\"speed\":[-10,0],\"radius\":100,\"bCoef\":-10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[300,-85],\"speed\":[-10,0],\"radius\":100,\"bCoef\":-10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[600,-85],\"speed\":[-10,0],\"radius\":100,\"bCoef\":-10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-365,1350],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[365,1350],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-325,2650],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[325,2650],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[0,-500],\"speed\":[0,5],\"radius\":15,\"bCoef\":3,\"damping\":1,\"color\":\"0\",\"cMask\":[\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[-295,3950],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[295,3950],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-245,5250],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-455,5250],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[245,5250],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[455,5250],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-205,6550],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-415,6550],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[205,6550],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[415,6550],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-165,7850],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-375,7850],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[165,7850],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[375,7850],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-125,9150],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-335,9150],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[125,9150],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[335,9150],\"speed\":[0,-1],\"radius\":100,\"bCoef\":10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[0,-85],\"speed\":[10,0],\"radius\":100,\"bCoef\":-10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-120,1220],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[-160,1220],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[-200,1220],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[-240,1220],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[-80,1220],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[-40,1220],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[0,1220],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[120,1220],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[160,1220],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[200,1220],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[240,1220],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[80,1220],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[40,1220],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[3700,80],\"speed\":[-2.5,0],\"radius\":15,\"bCoef\":0,\"invMass\":1e-160,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[-120,3820],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[-160,3820],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[-80,3820],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[-40,3820],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[0,3820],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[120,3820],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[160,3820],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[80,3820],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[40,3820],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[-80,6420],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[-40,6420],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[0,6420],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[80,6420],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[40,6420],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[0,9020],\"speed\":[0,-1],\"radius\":15,\"bCoef\":0,\"invMass\":1e-96,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[10100,80],\"speed\":[-2.5,0],\"radius\":15,\"bCoef\":0,\"invMass\":1e-160,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[16400,80],\"speed\":[-2.5,0],\"radius\":15,\"bCoef\":0,\"invMass\":1e-160,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[2400,40],\"speed\":[-10,0],\"radius\":15,\"bCoef\":1,\"invMass\":1e-80,\"damping\":1,\"color\":\"CCCCCC\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[300,180],\"speed\":[-10,0],\"radius\":100,\"bCoef\":-10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[600,180],\"speed\":[-10,0],\"radius\":100,\"bCoef\":-10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-300,-85],\"speed\":[10,0],\"radius\":100,\"bCoef\":-10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-600,-85],\"speed\":[10,0],\"radius\":100,\"bCoef\":-10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-300,180],\"speed\":[10,0],\"radius\":100,\"bCoef\":-10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-600,180],\"speed\":[10,0],\"radius\":100,\"bCoef\":-10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[0,180],\"speed\":[10,0],\"radius\":100,\"bCoef\":-10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[0,180],\"speed\":[-10,0],\"radius\":100,\"bCoef\":-10000,\"invMass\":1e-90,\"damping\":1,\"color\":\"0\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]}],\"playerPhysics\":{\"damping\":0.982,\"acceleration\":0.08,\"kickingAcceleration\":0.08,\"kickingDamping\":0.982,\"kickStrength\":0},\"ballPhysics\":\"disc0\",\"spawnDistance\":170}";

// Estado del juego
var gameState = {
    active: false,
    players: [],
    eliminated: [],
    checkInterval: null,
    chatBlocked: false
};

// Configuración
var config = {
    minPlayers: 2,
    // Zonas de respawn cuando tocan las bolas negras
    // Coordenadas exactas del mapa
    
    // Zona arriba: y <= -200, x entre -420 y 420
    respawnTopY: -200,
    respawnTopMinX: -420,
    respawnTopMaxX: 420,
    
    // Zona izquierda: x <= -420, y entre -200 y 200
    respawnLeftX: -420,
    respawnLeftMinY: -200,
    respawnLeftMaxY: 200,
    
    // Zona derecha: x >= 420, y entre -200 y 200
    respawnRightX: 420,
    respawnRightMinY: -200,
    respawnRightMaxY: 200
};

// ============================================
// INICIAR JUEGO
// ============================================
function start(room, onGameEnd) {
    console.log('🎮 GYM - Iniciando juego...');
    console.log('📊 Jugadores:', room.getPlayerList().filter(p => p.id !== 0).length);
    
    try {
        console.log('🗺️ Cargando mapa..., tipo:', typeof mapData);
        if (!mapData) {
            console.error('❌ mapData es null o undefined!');
            return;
        }
        
        room.setCustomStadium(mapData);
        console.log('✅ Mapa cargado');
    } catch (e) {
        console.error('❌ Error al cargar mapa:', e.message);
        return;
    }
    
    // Revolver y asignar equipos
    try {
        shuffleTeams(room);
        console.log('✅ Equipos asignados');
    } catch (e) {
        console.error('❌ Error al asignar equipos:', e.message);
        return;
    }
    
    gameState.active = true;
    gameState.players = room.getPlayerList().filter(p => p.id !== 0);
    gameState.eliminated = [];
    
    room.sendAnnouncement(
        "🎮 GYM - ¡ENTRA A LOS RECUADROS! 🎮\n" +
        "👥 Jugadores: " + gameState.players.length,
        null,
        0x00BFFF,
        "bold",
        2
    );
    
    setTimeout(() => {
        room.startGame();
        room.pauseGame(true);
        
        gameState.chatBlocked = true;
        
        room.sendAnnouncement(
            "\n📋 INSTRUCCIONES:\n" +
            "⚠️ Entra a los recuadros para evitar las bolas negras\n" +
            "⚫ Si una bola negra te toca, serás eliminado\n" +
            "🏋️ Las bolas te mandan a los lados cuando te tocan\n" +
            "🏆 El último jugador en pie gana!\n\n" +
            "⏱️ El juego comenzará en 5 segundos...",
            null,
            0xFFFF00,
            "bold",
            2
        );
        
        setTimeout(() => {
            room.pauseGame(false);
            gameState.chatBlocked = false;
            room.sendAnnouncement(
                "🟢 ¡COMIENZA!",
                null,
                0x00FF00,
                "bold",
                2
            );
            
            // Iniciar verificación INMEDIATAMENTE cuando empieza el juego
            gameState.checkInterval = setInterval(() => checkPlayers(room, onGameEnd), 100);
        }, 5000);
    }, 1500);
}

// ============================================
// VERIFICAR JUGADORES
// ============================================
function checkPlayers(room, onGameEnd) {
    if (!gameState.active) return;
    
    var alivePlayers = [];
    
    gameState.players.forEach(p => {
        if (gameState.eliminated.indexOf(p.id) !== -1) return;
        
        var player = room.getPlayer(p.id);
        if (!player) {
            gameState.eliminated.push(p.id);
            room.sendAnnouncement("❌ " + p.name + " se desconectó", null, 0xFF6600);
            return;
        }
        
        var pos = player.position;
        if (!pos) return;
        
        var eliminated = false;
        var reason = "";
        
        // Detectar si llegó a la zona de respawn arriba
        // y < -200 (más arriba de -200), x entre -420 y 420
        if (pos.y < config.respawnTopY && 
            pos.x >= config.respawnTopMinX && 
            pos.x <= config.respawnTopMaxX) {
            eliminated = true;
            reason = "fue tocado por una bola negra (arriba)";
            console.log("⚫ " + p.name + " tocado - respawn arriba - X: " + pos.x.toFixed(0) + " Y: " + pos.y.toFixed(0));
        }
        
        // Detectar si llegó a la zona de respawn izquierda
        // x < -420 (más a la izquierda de -420), y entre -200 y 200
        if (!eliminated && 
            pos.x < config.respawnLeftX && 
            pos.y >= config.respawnLeftMinY && 
            pos.y <= config.respawnLeftMaxY) {
            eliminated = true;
            reason = "fue tocado por una bola negra (izquierda)";
            console.log("⚫ " + p.name + " tocado - respawn izquierda - X: " + pos.x.toFixed(0) + " Y: " + pos.y.toFixed(0));
        }
        
        // Detectar si llegó a la zona de respawn derecha
        // x > 420 (más a la derecha de 420), y entre -200 y 200
        if (!eliminated && 
            pos.x > config.respawnRightX && 
            pos.y >= config.respawnRightMinY && 
            pos.y <= config.respawnRightMaxY) {
            eliminated = true;
            reason = "fue tocado por una bola negra (derecha)";
            console.log("⚫ " + p.name + " tocado - respawn derecha - X: " + pos.x.toFixed(0) + " Y: " + pos.y.toFixed(0));
        }

            // Detectar si llegó a la esquina superior-izquierda (fuera por la "L")
            // x < -420 y y < -200
            if (!eliminated && pos.x < config.respawnLeftX && pos.y < config.respawnTopY) {
                eliminated = true;
                reason = "fue tocado por una bola negra (esquina superior-izquierda)";
                console.log("⚫ " + p.name + " tocado - esquina superior-izquierda - X: " + pos.x.toFixed(0) + " Y: " + pos.y.toFixed(0));
            }

            // Detectar si llegó a la esquina superior-derecha (fuera por la "L" derecha)
            // x > 420 y y < -200
            if (!eliminated && pos.x > config.respawnRightX && pos.y < config.respawnTopY) {
                eliminated = true;
                reason = "fue tocado por una bola negra (esquina superior-derecha)";
                console.log("⚫ " + p.name + " tocado - esquina superior-derecha - X: " + pos.x.toFixed(0) + " Y: " + pos.y.toFixed(0));
            }
        
        if (eliminated && gameState.eliminated.indexOf(p.id) === -1) {
            gameState.eliminated.push(p.id);
            room.setPlayerTeam(p.id, 0);
            
            var remaining = gameState.players.length - gameState.eliminated.length;
            room.sendAnnouncement(
                "❌ " + p.name + " " + reason + "! (" + remaining + " restantes)",
                null,
                0xFF6600
            );
        } else if (!eliminated) {
            alivePlayers.push(p);
        }
    });
    
    // Verificar ganador
    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0], onGameEnd);
    } else if (alivePlayers.length === 0 && gameState.eliminated.length > 0) {
        room.sendAnnouncement("❌ No hay ganador - todos fueron eliminados", null, 0xFF0000);
        stop(room);
        if (onGameEnd) onGameEnd(null);
    }
}

// ============================================
// DECLARAR GANADOR
// ============================================
function declareWinner(room, winner, onGameEnd) {
    gameState.active = false;
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    room.sendAnnouncement(
        "\n🏆 ¡" + winner.name.toUpperCase() + " HA GANADO! 🏆\n",
        null,
        0xFFD700,
        "bold",
        2
    );
    
    // Notificar al bot principal que hay un ganador
    setTimeout(() => {
        if (onGameEnd) {
            onGameEnd(winner);
        }
    }, 3000);
}

// ============================================
// REVOLVER EQUIPOS
// ============================================
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(p => p.id !== 0);
    
    // Revolver array
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = players[i];
        players[i] = players[j];
        players[j] = temp;
    }
    
    // Asignar equipos
    var halfPoint = Math.floor(players.length / 2);
    
    for (var i = 0; i < players.length; i++) {
        if (i < halfPoint) {
            room.setPlayerTeam(players[i].id, 1);
        } else {
            room.setPlayerTeam(players[i].id, 2);
        }
    }
}

// ============================================
// DETENER JUEGO
// ============================================
function stop(room) {
    gameState.active = false;
    
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    
    gameState.players = [];
    gameState.eliminated = [];
    
    room.stopGame();
}

// ============================================
// EVENTOS
// ============================================
function onPlayerLeave(room, player) {
    if (gameState.active && gameState.eliminated.indexOf(player.id) === -1) {
        gameState.eliminated.push(player.id);
        
        var remaining = gameState.players.length - gameState.eliminated.length;
        room.sendAnnouncement(
            "❌ " + player.name + " se fue (" + remaining + " restantes)",
            null,
            0xFF6600
        );
    }
}

function onPlayerChat(room, player, message) {
    if (gameState.chatBlocked) {
        return false;
    }
    return true;
}

function isActive() {
    return gameState.active;
}

// ============================================
// EXPORTAR
// ============================================
return {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerChat: onPlayerChat,
    onPlayerLeave: onPlayerLeave
};

})();

// ============================================
// MÓDULO: MULTIBALLS
// ============================================
var MULTIBALLS = (function() {
// ============================================
// MULTIBALLS SURVIVAL - EVITA LOS BORDES
// ============================================

// NOTA: El mapa será inyectado por bot.js
// No se carga aquí para evitar problemas con fs en el contexto del navegador
// ⚠️ IMPORTANTE: mapData debe ser una STRING JSON, no un objeto JavaScript
// Haxball's room.setCustomStadium() requiere string JSON
var mapData = "{\"name\":\"MultiBalls Survival by Galactic Boy from HaxMaps\",\"width\":420,\"height\":200,\"bg\":{\"type\":\"hockey\",\"width\":420,\"height\":200},\"vertexes\":[{\"x\":-420,\"y\":-200,\"bCoef\":-1000,\"cMask\":[\"red\",\"blue\"]},{\"x\":420,\"y\":-200,\"bCoef\":-1000,\"cMask\":[\"red\",\"blue\"]},{\"x\":420,\"y\":200,\"bCoef\":-1000,\"cMask\":[\"red\",\"blue\"]},{\"x\":-420,\"y\":200,\"bCoef\":-1000,\"cMask\":[\"red\",\"blue\"]},{\"x\":-420,\"y\":-202.5,\"cMask\":[\"red\",\"blue\"]},{\"x\":422.5,\"y\":-202.5,\"cMask\":[\"red\",\"blue\"]},{\"x\":422.5,\"y\":202.5,\"cMask\":[\"red\",\"blue\"]},{\"x\":-422.5,\"y\":202.5,\"cMask\":[\"red\",\"blue\"]},{\"x\":-417.5,\"y\":-197.5,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":417.5,\"y\":-197.5,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":417.5,\"y\":197.5,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-417.5,\"y\":197.5,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-15,\"y\":105,\"cMask\":[]},{\"x\":-45,\"y\":105,\"cMask\":[]},{\"x\":-45,\"y\":165,\"cMask\":[]},{\"x\":-15,\"y\":165,\"cMask\":[]},{\"x\":-15,\"y\":135,\"cMask\":[]},{\"x\":-30,\"y\":135,\"cMask\":[]},{\"x\":15,\"y\":105,\"cMask\":[]},{\"x\":15,\"y\":165,\"cMask\":[]},{\"x\":30,\"y\":105,\"cMask\":[]},{\"x\":15,\"y\":135,\"cMask\":[]},{\"x\":30,\"y\":135,\"cMask\":[]},{\"x\":30,\"y\":165,\"cMask\":[]},{\"x\":0,\"y\":-200,\"cMask\":[]},{\"x\":0,\"y\":200,\"cMask\":[]}],\"segments\":[{\"v0\":0,\"v1\":1,\"bCoef\":-1000,\"cMask\":[\"red\",\"blue\"],\"color\":\"808080\"},{\"v0\":1,\"v1\":2,\"bCoef\":-1000,\"cMask\":[\"red\",\"blue\"],\"color\":\"808080\"},{\"v0\":2,\"v1\":3,\"bCoef\":-1000,\"cMask\":[\"red\",\"blue\"],\"color\":\"808080\"},{\"v0\":3,\"v1\":0,\"bCoef\":-1000,\"cMask\":[\"red\",\"blue\"],\"color\":\"808080\"},{\"v0\":4,\"v1\":5,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":5,\"v1\":6,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":6,\"v1\":7,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":7,\"v1\":4,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":8,\"v1\":9,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"A9A9A9\"},{\"v0\":9,\"v1\":10,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"A9A9A9\"},{\"v0\":10,\"v1\":11,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"A9A9A9\"},{\"v0\":11,\"v1\":8,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"A9A9A9\"},{\"v0\":12,\"v1\":13,\"cMask\":[],\"color\":\"B0B0B0\"},{\"v0\":13,\"v1\":14,\"cMask\":[],\"color\":\"B0B0B0\"},{\"v0\":14,\"v1\":15,\"cMask\":[],\"color\":\"B0B0B0\"},{\"v0\":15,\"v1\":16,\"cMask\":[],\"color\":\"B0B0B0\"},{\"v0\":16,\"v1\":17,\"cMask\":[],\"color\":\"B0B0B0\"},{\"v0\":18,\"v1\":19,\"cMask\":[],\"color\":\"B0B0B0\"},{\"v0\":18,\"v1\":20,\"cMask\":[],\"color\":\"B0B0B0\"},{\"v0\":21,\"v1\":22,\"cMask\":[],\"color\":\"B0B0B0\"},{\"v0\":19,\"v1\":23,\"cMask\":[],\"color\":\"B0B0B0\"},{\"v0\":20,\"v1\":22,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[],\"color\":\"B0B0B0\"},{\"v0\":22,\"v1\":23,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[],\"color\":\"B0B0B0\"},{\"v0\":24,\"v1\":25,\"cMask\":[],\"color\":\"808080\"}],\"planes\":[{\"normal\":[0,1],\"dist\":-197.5,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"normal\":[0,-1],\"dist\":-197.5,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"normal\":[-1,0],\"dist\":-417.5,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"normal\":[1,0],\"dist\":-417.5,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"normal\":[-1,0],\"dist\":-840,\"bCoef\":0.001,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[1,0],\"dist\":-840,\"bCoef\":0.001,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,1],\"dist\":-840,\"bCoef\":0.001,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,-1],\"dist\":-840,\"bCoef\":0.001,\"cMask\":[\"red\",\"blue\"]}],\"goals\":[],\"discs\":[{\"radius\":0,\"bCoef\":0,\"invMass\":0,\"damping\":0,\"color\":\"transparent\",\"cMask\":[],\"cGroup\":[\"kick\",\"score\"]},{\"pos\":[-420,-200],\"radius\":30,\"invMass\":0,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[-210,-200],\"radius\":30,\"invMass\":0,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[0,-200],\"radius\":30,\"invMass\":0,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[210,-200],\"radius\":30,\"invMass\":0,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[420,-200],\"radius\":30,\"invMass\":0,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[420,0],\"radius\":30,\"invMass\":0,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[420,200],\"radius\":30,\"invMass\":0,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[210,200],\"radius\":30,\"invMass\":0,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[0,200],\"radius\":30,\"invMass\":0,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[-210,200],\"radius\":30,\"invMass\":0,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[-420,200],\"radius\":30,\"invMass\":0,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"pos\":[-420,0],\"radius\":30,\"invMass\":0,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"ball\"]},{\"radius\":50,\"bCoef\":1,\"invMass\":0.01,\"damping\":1.0025,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"wall\"]},{\"radius\":50,\"bCoef\":1,\"invMass\":0.01,\"damping\":1.0025,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"wall\"]},{\"radius\":50,\"bCoef\":1,\"invMass\":0.01,\"damping\":1.0025,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"wall\"]},{\"radius\":50,\"bCoef\":1,\"invMass\":0.01,\"damping\":1.0025,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"wall\"]},{\"radius\":50,\"bCoef\":1,\"invMass\":0.01,\"damping\":1.0025,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"wall\"]},{\"radius\":50,\"bCoef\":1,\"invMass\":0.01,\"damping\":1.0025,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"wall\"]},{\"radius\":50,\"bCoef\":1,\"invMass\":0.01,\"damping\":1.0025,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"wall\"]},{\"radius\":50,\"bCoef\":1,\"invMass\":0.01,\"damping\":1.0025,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"wall\"]},{\"radius\":50,\"bCoef\":1,\"invMass\":0.01,\"damping\":1.0025,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"wall\"]},{\"radius\":50,\"bCoef\":1,\"invMass\":0.01,\"damping\":1.0025,\"color\":\"808080\",\"cMask\":[\"red\",\"blue\",\"ball\"],\"cGroup\":[\"wall\"]},{\"pos\":[-420,-200],\"radius\":15,\"invMass\":0,\"color\":\"A9A9A9\",\"cMask\":[]},{\"pos\":[-210,-200],\"radius\":15,\"invMass\":0,\"color\":\"A9A9A9\",\"cMask\":[]},{\"pos\":[0,-200],\"radius\":15,\"invMass\":0,\"color\":\"A9A9A9\",\"cMask\":[]},{\"pos\":[210,-200],\"radius\":15,\"invMass\":0,\"color\":\"A9A9A9\",\"cMask\":[]},{\"pos\":[420,-200],\"radius\":15,\"invMass\":0,\"color\":\"A9A9A9\",\"cMask\":[]},{\"pos\":[420,0],\"radius\":15,\"invMass\":0,\"color\":\"A9A9A9\",\"cMask\":[]},{\"pos\":[420,200],\"radius\":15,\"invMass\":0,\"color\":\"A9A9A9\",\"cMask\":[]},{\"pos\":[210,200],\"radius\":15,\"invMass\":0,\"color\":\"A9A9A9\",\"cMask\":[]},{\"pos\":[0,200],\"radius\":15,\"invMass\":0,\"color\":\"A9A9A9\",\"cMask\":[]},{\"pos\":[-210,200],\"radius\":15,\"invMass\":0,\"color\":\"A9A9A9\",\"cMask\":[]},{\"pos\":[-420,200],\"radius\":15,\"invMass\":0,\"color\":\"A9A9A9\",\"cMask\":[]},{\"pos\":[-420,0],\"radius\":15,\"invMass\":0,\"color\":\"A9A9A9\",\"cMask\":[]}],\"playerPhysics\":{\"kickStrength\":0},\"ballPhysics\":\"disc0\",\"spawnDistance\":170}";




// Estado del juego
var gameState = {
    active: false,
    paused: false,
    players: new Map(),
    checkInterval: null,
    callback: null,
    explanationPhase: false,
    chatBlocked: false
};

// Configuración
var config = {
    // Bordes del área de juego (interior gray walls)
    minX: -417.5,
    maxX: 417.5,
    minY: -197.5,
    maxY: 197.5,
    
    // Tolerancia para evitar eliminación prematura
    tolerance: 5,
    
    checkIntervalMs: 100,
    countdownSeconds: 10,
    explanationDuration: 8000,
    winnerAnnouncementDelay: 2000
};

// Ajustar límites con tolerancia (más estrictos)
var adjustedLimits = {
    minX: config.minX + config.tolerance,  // -412.5
    maxX: config.maxX - config.tolerance,  // 412.5
    minY: config.minY + config.tolerance,  // -192.5
    maxY: config.maxY - config.tolerance   // 192.5
};

function isActive() {
    return gameState.active;
}

function start(room, callback) {
    if (gameState.active) {
        console.log('[MULTIBALLS] Ya está activo');
        return;
    }

    console.log('🎮 MULTIBALLS - Iniciando juego...');
    console.log('📊 Jugadores:', room.getPlayerList().filter(p => p.id !== 0).length);
    
    // Cargar mapa
    try {
        console.log('🗺️ Cargando mapa..., tipo:', typeof mapData);
        if (!mapData) {
            console.error('❌ mapData es null o undefined!');
            return;
        }
        
        room.setCustomStadium(mapData);
        console.log('✅ Mapa cargado');
    } catch (e) {
        console.error('❌ Error al cargar mapa:', e.message);
        return;
    }
    
    // Revolver y asignar equipos
    try {
        shuffleTeams(room);
        console.log('✅ Equipos asignados');
    } catch (e) {
        console.error('❌ Error al asignar equipos:', e.message);
        return;
    }

    gameState.active = true;
    gameState.paused = true;
    gameState.callback = callback;
    gameState.players.clear();
    gameState.explanationPhase = true;

    // Obtener jugadores actuales (excluyendo ID 0)
    var playerList = room.getPlayerList().filter(p => p.id !== 0);
    
    playerList.forEach(player => {
        gameState.players.set(player.id, {
            id: player.id,
            name: player.name,
            alive: true
        });
    });

    console.log(`[MULTIBALLS] ${gameState.players.size} jugadores registrados`);

    if (gameState.players.size < 2) {
        room.sendAnnouncement('⚠️ Se necesitan al menos 2 jugadores para MULTIBALLS', null, 0xFF6347, 'bold', 2);
        stop(room);
        return;
    }
    
    room.sendAnnouncement(
        "🎮 MULTIBALLS - EVITA LOS BORDES 🎮\n" +
        "👥 Jugadores: " + gameState.players.size,
        null,
        0x00BFFF,
        "bold",
        2
    );

    // Iniciar juego y pausar
    setTimeout(() => {
        room.startGame();
        room.pauseGame(true);
        
        gameState.chatBlocked = true;
        
        // Explicación
        room.sendAnnouncement(
            "\n📋 INSTRUCCIONES:\n" +
            "⚠️ Empuja la bola del medio para que rebote\n" +
            "🔵 Las bolas grises te empujarán\n" +
            "🚫 NO TOQUES LOS BORDES GRISES\n" +
            "🏆 Si tocas un borde: ¡ELIMINADO!\n\n" +
            "⏱️ El juego comenzará en 5 segundos...",
            null,
            0xFFFF00,
            "bold",
            2
        );
        
        setTimeout(() => {
            gameState.explanationPhase = false;
            gameState.chatBlocked = false;
            room.pauseGame(false);
            room.sendAnnouncement(
                "🟢 ¡COMIENZA!",
                null,
                0x00FF00,
                "bold",
                2
            );
            unpause(room);
        }, 5000);
    }, 1500);
}

function unpause(room) {
    if (!gameState.active) return;

    gameState.paused = false;

    console.log('[MULTIBALLS] Juego reanudado, iniciando verificación');

    // Esperar un momento antes de comenzar las verificaciones
    setTimeout(() => {
        if (gameState.active && !gameState.paused) {
            startChecking(room);
        }
    }, 500);
}

function startChecking(room) {
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
    }

    gameState.checkInterval = setInterval(() => {
        if (!gameState.active || gameState.paused || gameState.explanationPhase) return;
        checkPlayers(room);
    }, config.checkIntervalMs);

    console.log('[MULTIBALLS] Verificación de jugadores iniciada');
}

function checkPlayers(room) {
    var playerList = room.getPlayerList().filter(p => p.id !== 0);
    
    playerList.forEach(player => {
        var playerData = gameState.players.get(player.id);
        if (!playerData || !playerData.alive) return;

        var pos = player.position;
        if (!pos) return;

        // Verificar si tocó los bordes (fuera del área permitida)
        var touchedBorder = 
            pos.x <= adjustedLimits.minX ||
            pos.x >= adjustedLimits.maxX ||
            pos.y <= adjustedLimits.minY ||
            pos.y >= adjustedLimits.maxY;

        if (touchedBorder) {
            eliminatePlayer(room, player);
        }
    });

    // Verificar ganador
    var alivePlayers = Array.from(gameState.players.values()).filter(p => p.alive);
    
    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0]);
    } else if (alivePlayers.length === 0) {
        room.sendAnnouncement('⚠️ No hay ganador en MULTIBALLS', null, 0xFF6347, 'bold', 2);
        stop(room);
    }
}

function eliminatePlayer(room, player) {
    var playerData = gameState.players.get(player.id);
    if (!playerData || !playerData.alive) return;

    playerData.alive = false;
    // Pasar a espectador
    room.setPlayerTeam(player.id, 0);
    var alivePlayers = Array.from(gameState.players.values()).filter(p => p.alive);
    room.sendAnnouncement(
        `💀 ${player.name} tocó los bordes y ha sido eliminado! (${alivePlayers.length} restantes)`,
        null,
        0xFF6347,
        'bold',
        2
    );
    console.log(`[MULTIBALLS] ${player.name} eliminado (${alivePlayers.length} restantes)`);
}

function declareWinner(room, winner) {
    if (!gameState.active) return;

    console.log(`[MULTIBALLS] Ganador: ${winner.name}`);

    // Pausar verificaciones
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }

    room.sendAnnouncement('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', null, 0xFFD700, 'bold', 2);
    room.sendAnnouncement(`🏆 ¡${winner.name} ha ganado MULTIBALLS! 🏆`, null, 0xFFD700, 'bold', 2);
    room.sendAnnouncement('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', null, 0xFFD700, 'bold', 2);

    setTimeout(() => {
        var winnerObject = { id: winner.id, name: winner.name };
        var callback = gameState.callback;
        stop(room);
        
        if (callback) {
            callback(winnerObject);
        }
    }, config.winnerAnnouncementDelay);
}

function stop(room) {
    if (!gameState.active) return;

    console.log('[MULTIBALLS] Deteniendo juego');

    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }

    gameState.active = false;
    gameState.paused = false;
    gameState.players.clear();
    gameState.explanationPhase = false;

    var callback = gameState.callback;
    gameState.callback = null;

    if (callback) {
        callback(null);
    }
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;

    var playerData = gameState.players.get(player.id);
    if (!playerData) return;

    console.log(`[MULTIBALLS] Jugador salió: ${player.name}`);
    
    playerData.alive = false;

    var alivePlayers = Array.from(gameState.players.values()).filter(p => p.alive);

    if (alivePlayers.length === 1) {
        declareWinner(room, alivePlayers[0]);
    } else if (alivePlayers.length === 0) {
        room.sendAnnouncement('⚠️ No quedan jugadores en MULTIBALLS', null, 0xFF6347, 'bold', 2);
        stop(room);
    }
}

function onPlayerChat(player) {
    // Permitir chat cuando no está activo
    if (!gameState.active) return true;
    
    // Bloquear chat durante explicación
    if (gameState.chatBlocked) {
        return false;
    }
    
    return true;
}

// ============================================
// UTILIDADES
// ============================================
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(p => p.id !== 0);
    
    // Revolver array
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = players[i];
        players[i] = players[j];
        players[j] = temp;
    }
    
    // Asignar equipos
    var halfPoint = Math.floor(players.length / 2);
    
    for (var i = 0; i < players.length; i++) {
        if (i < halfPoint) {
            room.setPlayerTeam(players[i].id, 1);
        } else {
            room.setPlayerTeam(players[i].id, 2);
        }
    }
}

return {
    isActive,
    start,
    stop,
    onPlayerLeave,
    onPlayerChat
};

})();

// ============================================
// MÓDULO: DODGEBALL
// ============================================
var DODGEBALL = (function() {
// ============================================
// MINIJUEGO: DODGEBALL - Los rojos esquivan la bola negra
// ============================================

// mapData será inyectado desde bot.js como string JSON
var mapData = "{\"name\":\"Dodgeball by MC\",\"width\":600,\"height\":350,\"bg\":{\"type\":\"hockey\",\"width\":500,\"height\":250},\"vertexes\":[{\"x\":-497.5,\"y\":247.5,\"bCoef\":-100,\"cMask\":[\"wall\"]},{\"x\":497.5,\"y\":247.5,\"bCoef\":-100,\"cMask\":[\"wall\"]},{\"x\":497.5,\"y\":-247.5,\"bCoef\":-100,\"cMask\":[\"wall\"]},{\"x\":-497.5,\"y\":-247.5,\"bCoef\":-100,\"cMask\":[\"wall\"]},{\"x\":-530,\"y\":280,\"cMask\":[\"red\"]},{\"x\":-530,\"y\":-280,\"cMask\":[\"red\"]},{\"x\":530,\"y\":-280,\"cMask\":[\"red\"]},{\"x\":530,\"y\":280,\"cMask\":[\"red\"]},{\"x\":-500,\"y\":-250,\"bCoef\":-1000,\"cMask\":[\"red\"]},{\"x\":-500,\"y\":250,\"bCoef\":-1000,\"cMask\":[\"red\"]},{\"x\":500,\"y\":250,\"bCoef\":-1000,\"cMask\":[\"red\"]},{\"x\":500,\"y\":-250,\"bCoef\":-1000,\"cMask\":[\"red\"]},{\"x\":-400,\"y\":-15,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-400,\"y\":15,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":400,\"y\":-15,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":400,\"y\":15,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-502.5,\"y\":-252.5,\"cMask\":[\"wall\"]},{\"x\":502.5,\"y\":-252.5,\"cMask\":[\"wall\"]},{\"x\":502.5,\"y\":252.5,\"cMask\":[\"wall\"]},{\"x\":-502.5,\"y\":252.5,\"cMask\":[\"wall\"]},{\"x\":1,\"y\":-250,\"cMask\":[\"wall\"]},{\"x\":1,\"y\":250,\"cMask\":[\"wall\"]},{\"x\":-1,\"y\":-250,\"cMask\":[\"wall\"]},{\"x\":-1,\"y\":250,\"cMask\":[\"wall\"]},{\"x\":-505,\"y\":-255,\"cMask\":[\"wall\"]},{\"x\":-505,\"y\":255,\"cMask\":[\"wall\"]},{\"x\":505,\"y\":-255,\"cMask\":[\"wall\"]},{\"x\":505,\"y\":255,\"cMask\":[\"wall\"]}],\"segments\":[{\"v0\":1,\"v1\":2,\"bCoef\":-100,\"cMask\":[\"wall\"],\"color\":\"C15C5C\"},{\"v0\":3,\"v1\":0,\"bCoef\":-100,\"cMask\":[\"wall\"],\"color\":\"C15C5C\"},{\"v0\":4,\"v1\":5,\"vis\":false,\"cMask\":[\"red\"]},{\"v0\":5,\"v1\":6,\"vis\":false,\"cMask\":[\"red\"]},{\"v0\":6,\"v1\":7,\"vis\":false,\"cMask\":[\"red\"]},{\"v0\":7,\"v1\":4,\"vis\":false,\"cMask\":[\"red\"]},{\"v0\":8,\"v1\":9,\"bCoef\":-1000,\"cMask\":[\"red\"],\"color\":\"333333\"},{\"v0\":10,\"v1\":11,\"bCoef\":-1000,\"cMask\":[\"red\"],\"color\":\"333333\"},{\"v0\":12,\"v1\":13,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":13,\"v1\":12,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":14,\"v1\":15,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":15,\"v1\":14,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":17,\"v1\":18,\"cMask\":[\"wall\"],\"color\":\"333333\"},{\"v0\":19,\"v1\":16,\"cMask\":[\"wall\"],\"color\":\"333333\"},{\"v0\":20,\"v1\":21,\"cMask\":[\"wall\"],\"color\":\"6B6B6B\"},{\"v0\":22,\"v1\":23,\"cMask\":[\"wall\"],\"color\":\"6B6B6B\"},{\"v0\":25,\"v1\":24,\"cMask\":[\"wall\"],\"color\":\"333333\"},{\"v0\":26,\"v1\":27,\"cMask\":[\"wall\"],\"color\":\"333333\"},{\"v0\":3,\"v1\":2,\"bCoef\":-100,\"cMask\":[\"wall\"],\"color\":\"C15C5C\"},{\"v0\":1,\"v1\":0,\"bCoef\":-100,\"cMask\":[\"wall\"],\"color\":\"C15C5C\"},{\"v0\":9,\"v1\":10,\"bCoef\":-1000,\"cMask\":[\"red\"],\"color\":\"333333\"},{\"v0\":11,\"v1\":8,\"bCoef\":-1000,\"cMask\":[\"red\"],\"color\":\"333333\"},{\"v0\":19,\"v1\":18,\"cMask\":[\"wall\"],\"color\":\"333333\"},{\"v0\":17,\"v1\":16,\"cMask\":[\"wall\"],\"color\":\"333333\"},{\"v0\":25,\"v1\":27,\"cMask\":[\"wall\"],\"color\":\"333333\"},{\"v0\":26,\"v1\":24,\"cMask\":[\"wall\"],\"color\":\"333333\"},{\"v0\":25,\"v1\":9,\"cMask\":[\"wall\"],\"color\":\"333333\"},{\"v0\":24,\"v1\":8,\"cMask\":[\"wall\"],\"color\":\"333333\"},{\"v0\":27,\"v1\":10,\"cMask\":[\"wall\"],\"color\":\"333333\"},{\"v0\":26,\"v1\":11,\"cMask\":[\"wall\"],\"color\":\"333333\"}],\"planes\":[{\"normal\":[0,1],\"dist\":-400,\"bCoef\":0,\"cMask\":[\"red\"]},{\"normal\":[0,-1],\"dist\":-400,\"bCoef\":0,\"cMask\":[\"red\"]},{\"normal\":[1,0],\"dist\":-650,\"bCoef\":0,\"cMask\":[\"red\"]},{\"normal\":[-1,0],\"dist\":-650,\"bCoef\":0,\"cMask\":[\"red\"]},{\"normal\":[1,0],\"dist\":-500,\"cMask\":[\"ball\"],\"cGroup\":[\"ball\"]},{\"normal\":[0,1],\"dist\":-250,\"cMask\":[\"ball\"],\"cGroup\":[\"ball\"]},{\"normal\":[-1,0],\"dist\":-500,\"cMask\":[\"ball\"],\"cGroup\":[\"ball\"]},{\"normal\":[0,-1],\"dist\":-250,\"cMask\":[\"ball\"],\"cGroup\":[\"ball\"]},{\"normal\":[1,0],\"dist\":-525,\"bCoef\":0,\"cMask\":[\"blue\"]},{\"normal\":[0,-1],\"dist\":-275,\"bCoef\":0,\"cMask\":[\"blue\"]},{\"normal\":[0,1],\"dist\":-275,\"bCoef\":0,\"cMask\":[\"blue\"]},{\"normal\":[-1,0],\"dist\":-525,\"bCoef\":0,\"cMask\":[\"blue\"]},{\"normal\":[0,1],\"dist\":-1,\"bCoef\":0,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"normal\":[0,-1],\"dist\":-500,\"bCoef\":0,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"normal\":[0,-1],\"dist\":-220,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[1,0],\"dist\":-470,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0,1],\"dist\":-220,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-1,0],\"dist\":-470,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]}],\"goals\":[],\"discs\":[{\"radius\":0.01,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"kick\",\"score\",\"c1\"]},{\"pos\":[-250,0],\"radius\":20,\"bCoef\":-10000,\"color\":\"transparent\",\"cMask\":[\"red\"]},{\"pos\":[-250,0],\"radius\":15,\"invMass\":1e-112,\"color\":\"0\",\"cMask\":[\"ball\"],\"cGroup\":[\"ball\",\"kick\"]},{\"pos\":[0,300],\"speed\":[0,-1],\"radius\":1,\"bCoef\":3,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]}],\"playerPhysics\":{\"kickStrength\":1e+113},\"ballPhysics\":\"disc0\",\"cameraFollow\":\"player\",\"spawnDistance\":-300,\"joints\":[{\"d0\":1,\"d1\":2,\"length\":0,\"color\":\"555555\"}],\"blueSpawnPoints\":[[-400,0],[400,0],[475,0]]}";

var gameState = {
    active: false,
    players: [], // { id, name, alive, team }
    checkInterval: null,
    explanationPhase: false,
    chatBlocked: false,
    callback: null
};

var config = {
    minPlayers: 2,
    blueCountThreshold: 8, // si hay >=8 jugadores elegimos 2 azules, sino 1
    arena: {
        // Coordenadas del cuadro según puntos A,B,C,D proporcionados
        // A: (-505,255), B: (505,255), C: (505,-255), D:(-505,-255)
        minX: -505,
        maxX: 505,
        minY: -255,
        maxY: 255
    },
    // Si true: eliminar solo cuando salen del rectángulo (ignorar impacto con la bola)
    onlyEliminateWhenOutOfBounds: true,
    checkIntervalMs: 120,
    hitDistance: 26, // distancia para considerar impacto bola->jugador
    explanationMs: 5000,
    selectionPauseMs: 1500
};

function start(room, onGameEnd) {
    if (!mapData) {
        console.error('[DODGEBALL] mapData no inyectado.');
        return;
    }

    gameState.callback = onGameEnd || null;

    try {
        room.setCustomStadium(mapData);
    } catch (e) {
        console.error('[DODGEBALL] Error cargando mapa:', e.message);
        return;
    }

    var players = room.getPlayerList().filter(p => p.id !== 0);
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para DODGEBALL', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.players = players.map(p => ({ id: p.id, name: p.name, alive: true, team: 1 }));

    // Determinar cantidad de azules (tiradores)
    var blueCount = (players.length >= config.blueCountThreshold) ? 2 : 1;

    // Elegir azules aleatoriamente
    var shuffled = players.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
    }
    var bluePlayers = shuffled.slice(0, blueCount);
    // Asignar equipos: azules = team 2, rojos = team 1
    gameState.players.forEach(p => {
        var isBlue = bluePlayers.find(b => b.id === p.id);
        if (isBlue) {
            p.team = 2;
            try { room.setPlayerTeam(p.id, 2); } catch(e){};
        } else {
            p.team = 1;
            try { room.setPlayerTeam(p.id, 1); } catch(e){};
        }
    });

    room.sendAnnouncement('🎮 DODGEBALL - ¡SOBREVIVE A LA BOLA NEGRA!', null, 0x00BFFF, 'bold', 2);
    room.sendAnnouncement('👥 Jugadores: ' + players.length + ' • Tiradores (azul): ' + blueCount, null, 0x00BFFF);

    // Pausar para explicación
    room.startGame();
    room.pauseGame(true);
    gameState.chatBlocked = true;

    room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
        '🔵 Los jugadores AZULES serán los que tiren la bola negra\n' +
        '🔴 Los ROJOS deben esquivar la bola: si la tocan quedan eliminados\n' +
        '📏 Si sales del cuadro central serás eliminado\n' +
        '🏆 El último ROJO en pie gana y será enviado a Lucky',
        null, 0xFFFF00, 'bold', 2);

    setTimeout(() => {
        // Fin de explicación
        gameState.explanationPhase = false;
        gameState.chatBlocked = false;
        room.pauseGame(false);
        room.sendAnnouncement('🟢 ¡COMIENZA DODGEBALL! • Evita la bola negra', null, 0x00FF00, 'bold', 2);

        // Empezar verificación
        if (gameState.checkInterval) clearInterval(gameState.checkInterval);
        gameState.checkInterval = setInterval(() => checkPlayers(room), config.checkIntervalMs);
    }, config.explanationMs + config.selectionPauseMs);
}

function checkPlayers(room) {
    if (!gameState.active) return;

    var ballPos = room.getBallPosition();

    gameState.players.forEach(p => {
        if (!p.alive) return;
        var playerObj = room.getPlayer(p.id);
        if (!playerObj) {
            p.alive = false;
            try { room.setPlayerTeam(p.id, 0); } catch(e){}
            return;
        }
        var pos = playerObj.position;
        if (!pos) return;

        // Fuera del cuadro = eliminado (solo afecta a ROJOS)
        if (pos.x < config.arena.minX || pos.x > config.arena.maxX || pos.y < config.arena.minY || pos.y > config.arena.maxY) {
            if (p.team === 1) {
                eliminatePlayer(room, p, 'salió del cuadro');
            } else {
                // Ignorar azules fuera del cuadro (no afectan al conteo de rojos)
                // Opcional: mover azul a espectador silenciosamente si deseas
                try { room.setPlayerTeam(p.id, 2); } catch(e){}
            }
            return;
        }

        // Impacto con bola: solamente se considera si la opción está desactivada
        if (!config.onlyEliminateWhenOutOfBounds) {
            // Si es ROJO y la bola lo toca -> eliminado
            if (p.team === 1 && ballPos) {
                var dx = pos.x - ballPos.x;
                var dy = pos.y - ballPos.y;
                var dist2 = dx*dx + dy*dy;
                if (dist2 <= config.hitDistance * config.hitDistance) {
                    eliminatePlayer(room, p, 'fue golpeado por la bola negra');
                    return;
                }
            }
        }
    });

    // Verificar ganador (último rojo vivo)
    var aliveReds = gameState.players.filter(p => p.team === 1 && p.alive);
    if (aliveReds.length === 1) {
        var winner = aliveReds[0];
        declareWinner(room, winner);
    } else if (aliveReds.length === 0) {
        // No hay ganador
        room.sendAnnouncement('⚠️ No hay ganador en DODGEBALL', null, 0xFF6600);
        stop(room);
    }
}

function eliminatePlayer(room, player, reason) {
    if (!player || !player.alive) return;
    // Solo procesamos eliminaciones visibles para ROJOS
    if (player.team !== 1) {
        // Marcar como no activo pero no contar ni anunciar
        player.alive = false;
        try { room.setPlayerTeam(player.id, 0); } catch(e){}
        return;
    }
    player.alive = false;
    try { room.setPlayerTeam(player.id, 0); } catch(e){}

    var aliveReds = gameState.players.filter(p => p.team === 1 && p.alive).length;
    var msg = `💀 ${player.name} ha sido eliminado${reason ? ' - ' + reason : ''} (${aliveReds} rojos restantes)`;
    room.sendAnnouncement(msg, null, 0xFF6347, 'bold', 2);
    console.log('[DODGEBALL] ' + msg);
}

function declareWinner(room, winner) {
    if (!gameState.active) return;
    gameState.active = false;
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    room.sendAnnouncement(`\n🏆 ${winner.name.toUpperCase()} HA GANADO DODGEBALL! 🏆`, null, 0xFFD700, 'bold', 2);
    // Enviar al ganador a Lucky mediante callback
    setTimeout(() => {
        if (gameState.callback) gameState.callback({ id: winner.id, name: winner.name });
        stop(room);
    }, 2500);
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) {
        clearInterval(gameState.checkInterval);
        gameState.checkInterval = null;
    }
    gameState.players = [];
    gameState.chatBlocked = false;
    gameState.explanationPhase = false;
    // Intentar detener el juego
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    var p = gameState.players.find(x => x.id === player.id);
    if (p) p.alive = false;
    try { room.setPlayerTeam(player.id, 0); } catch(e){}
}

function onPlayerChat(room, player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

return {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    // permitimos que bot.js inyecte mapData
    setMapData: function(jsonString) { mapData = jsonString; }
};

})();

// ============================================
// MÓDULO: SUPERMAN
// ============================================
var SUPERMAN = (function() {
// ============================================
// MINIJUEGO: SUPERMAN CHAIR - Párate en la cabeza de Superman
// ============================================

// mapData será inyectado desde bot.js
var mapData = "{\"name\":\"Superman Chair v2 by Namajunas [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ]\",\"width\":520,\"height\":600,\"bg\":{\"width\":255,\"height\":255,\"kickOffRadius\":190,\"cornerRadius\":250,\"color\":\"80808\"},\"vertexes\":[{\"x\":-255,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":255,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-305,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":305,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-245,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":245,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-235,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":235,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-209.5,\"y\":256.5,\"bCoef\":100,\"cMask\":[\"c0\"]},{\"x\":209.5,\"y\":256.5,\"bCoef\":0,\"cMask\":[\"c0\"]},{\"x\":256.5,\"y\":-144,\"bCoef\":0,\"cMask\":[\"c1\"],\"cGroup\":[\"kick\"]},{\"x\":256.5,\"y\":153,\"bCoef\":0,\"cMask\":[\"c1\"],\"cGroup\":[\"kick\"]},{\"x\":256.5,\"y\":-144,\"bCoef\":0,\"cMask\":[\"c3\"],\"cGroup\":[\"kick\"]},{\"x\":256.5,\"y\":153,\"bCoef\":0,\"cMask\":[\"c3\"],\"cGroup\":[\"kick\"]},{\"x\":-189,\"y\":-190,\"bCoef\":100000000,\"cMask\":[\"c3\"],\"cGroup\":[\"kick\"]},{\"x\":209,\"y\":-190,\"bCoef\":100000000,\"cMask\":[\"c3\"],\"cGroup\":[\"kick\"]},{\"x\":230,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":240,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":250,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-230,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-240,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-250,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":225,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-225,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-121.56757590242933,\"y\":-109.55421108988384,\"cMask\":[\"c0\"]},{\"x\":-117.8695049075144,\"y\":-71.74701162314061,\"cMask\":[\"c0\"]},{\"x\":-128.14192433783376,\"y\":-116.8423459268464,\"cMask\":[\"c0\"]},{\"x\":-126.49833722898262,\"y\":-133.69615773732232,\"cMask\":[\"c0\"]},{\"x\":-109.24067258604617,\"y\":-64.45887678617805,\"cMask\":[\"c0\"]},{\"x\":-94.85928538359911,\"y\":-32.57328687446693,\"cMask\":[\"c0\"]},{\"x\":-82.53238206721596,\"y\":-23.918626755573882,\"cMask\":[\"c0\"]},{\"x\":-43.49718823200254,\"y\":72.19365140686978,\"cMask\":[\"c0\"]},{\"x\":30.46423166629654,\"y\":78.57076938921199,\"cMask\":[\"c0\"]},{\"x\":-43.49718823200254,\"y\":72.19365140686978,\"cMask\":[\"c0\"]},{\"x\":-36.92283979659817,\"y\":105.90127502782161,\"cMask\":[\"c0\"]},{\"x\":-19.66517515366172,\"y\":122.75508683829753,\"cMask\":[\"c0\"]},{\"x\":-11.036342832193498,\"y\":131.40974695719046,\"cMask\":[\"c0\"]},{\"x\":-0.7639234018741661,\"y\":132.77627223912094,\"cMask\":[\"c0\"]},{\"x\":-131.83999533274869,\"y\":-158.29361281207088,\"cMask\":[\"c0\"]},{\"x\":-124.44385334291877,\"y\":-161.02666337593186,\"cMask\":[\"c0\"]},{\"x\":-118.69129846193994,\"y\":-135.51819144656292,\"cMask\":[\"c0\"]},{\"x\":-125.26564689734425,\"y\":-164.67073079441312,\"cMask\":[\"c0\"]},{\"x\":-116.22591779866332,\"y\":-166.0372560763436,\"cMask\":[\"c0\"]},{\"x\":-107.59708547719504,\"y\":-137.34022515580364,\"cMask\":[\"c0\"]},{\"x\":-115.81502102145055,\"y\":-170.5923403494452,\"cMask\":[\"c0\"]},{\"x\":-104.72080803670565,\"y\":-172.869882485996,\"cMask\":[\"c0\"]},{\"x\":-105.95349836834396,\"y\":-166.0372560763436,\"cMask\":[\"c0\"]},{\"x\":-97.73556282408856,\"y\":-166.9482729309639,\"cMask\":[\"c0\"]},{\"x\":-85.40865950770535,\"y\":-139.61776729235442,\"cMask\":[\"c0\"]},{\"x\":-97.32466604687579,\"y\":-139.16225886504418,\"cMask\":[\"c0\"]},{\"x\":-103.89901448228011,\"y\":-167.40378135827405,\"cMask\":[\"c0\"]},{\"x\":-104.72080803670565,\"y\":-172.869882485996,\"cMask\":[\"c0\"]},{\"x\":-73.49265296853491,\"y\":-140.52878414697471,\"cMask\":[\"c0\"]},{\"x\":-75.54713685459882,\"y\":-126.8635313276699,\"cMask\":[\"c0\"]},{\"x\":-69.38368519640721,\"y\":-121.85293862725811,\"cMask\":[\"c0\"]},{\"x\":-87.87404017098197,\"y\":-126.8635313276699,\"cMask\":[\"c0\"]},{\"x\":-84.17596917606704,\"y\":-118.66437963608703,\"cMask\":[\"c0\"]},{\"x\":-125.26564689734425,\"y\":-129.14107346422068,\"cMask\":[\"c0\"]},{\"x\":-89.92852405704588,\"y\":-134.60717459194262,\"cMask\":[\"c0\"]},{\"x\":-82.94327884442873,\"y\":-93.15590770671814,\"cMask\":[\"c0\"]},{\"x\":-91.5721111658969,\"y\":-90.42285714285714,\"cMask\":[\"c0\"]},{\"x\":-108.0079822544078,\"y\":-99.53302568906034,\"cMask\":[\"c0\"]},{\"x\":-71.0272723052583,\"y\":-74.93557061431177,\"cMask\":[\"c0\"]},{\"x\":-110.06246614047171,\"y\":-89.51184028823683,\"cMask\":[\"c0\"]},{\"x\":-91.98300794310973,\"y\":-87.68980657899614,\"cMask\":[\"c0\"]},{\"x\":-114.58233068981224,\"y\":-113.19827850836515,\"cMask\":[\"c0\"]},{\"x\":-111.29515647211002,\"y\":-118.66437963608703,\"cMask\":[\"c0\"]},{\"x\":-90.75031761147142,\"y\":-122.30844705456835,\"cMask\":[\"c0\"]},{\"x\":-100.20094348736518,\"y\":-104.54361838947212,\"cMask\":[\"c0\"]},{\"x\":-87.05224661655643,\"y\":-115.47582064491593,\"cMask\":[\"c0\"]},{\"x\":-95.27018216081188,\"y\":-90.42285714285714,\"cMask\":[\"c0\"]},{\"x\":-67.74009808755613,\"y\":-53.071166103424076,\"cMask\":[\"c0\"]},{\"x\":-55.002297993960184,\"y\":-38.03938800218879,\"cMask\":[\"c0\"]},{\"x\":-34.45745913332152,\"y\":-67.64743577734914,\"cMask\":[\"c0\"]},{\"x\":-10.828626811853297,\"y\":-46.60506497570219,\"cMask\":[\"c0\"]},{\"x\":-36.5119430193854,\"y\":-48.51608183032246,\"cMask\":[\"c0\"]},{\"x\":-59.52216254330065,\"y\":-55.348708239974854,\"cMask\":[\"c0\"]},{\"x\":-26.239523589066067,\"y\":-12.530916072819906,\"cMask\":[\"c0\"]},{\"x\":-72.67085941410937,\"y\":22.54323283006238,\"cMask\":[\"c0\"]},{\"x\":-53.358710885109076,\"y\":61.7169575787361,\"cMask\":[\"c0\"]},{\"x\":20.19181223597724,\"y\":9.788996865377925,\"cMask\":[\"c0\"]},{\"x\":40.3257543194031,\"y\":-29.840236310605917,\"cMask\":[\"c0\"]},{\"x\":10.741186360083475,\"y\":-16.99701720054179,\"cMask\":[\"c0\"]},{\"x\":-27.13055581693834,\"y\":-30.76184586563801,\"cMask\":[\"c0\"]},{\"x\":-17.199794490385102,\"y\":-7.064814945097993,\"cMask\":[\"c0\"]},{\"x\":-12.214549277767958,\"y\":-26.374135182884032,\"cMask\":[\"c0\"]},{\"x\":-0.1500653917041086,\"y\":-16.45252562785194,\"cMask\":[\"c0\"]},{\"x\":-7.407510510725274,\"y\":-2.965239099306501,\"cMask\":[\"c0\"]},{\"x\":4.414283043700266,\"y\":1.6788283191747269,\"cMask\":[\"c0\"]},{\"x\":11.152083137296245,\"y\":6.144929446896668,\"cMask\":[\"c0\"]},{\"x\":25.355263894168814,\"y\":-20.74066046481451,\"cMask\":[\"c0\"]},{\"x\":31.57319943842427,\"y\":-32.21735429294816,\"cMask\":[\"c0\"]},{\"x\":51.419967304147946,\"y\":-24.82964361019421,\"cMask\":[\"c0\"]},{\"x\":-81.71058851279042,\"y\":22.99874125737253,\"cMask\":[\"c0\"]},{\"x\":-53.358710885109076,\"y\":62.62797443335643,\"cMask\":[\"c0\"]},{\"x\":30.46423166629654,\"y\":78.11526096190187,\"cMask\":[\"c0\"]},{\"x\":60.45969640282897,\"y\":42.585603631709404,\"cMask\":[\"c0\"]},{\"x\":63.746870620531126,\"y\":38.48602778591797,\"cMask\":[\"c0\"]},{\"x\":86.75709014444641,\"y\":19.810182266201423,\"cMask\":[\"c0\"]},{\"x\":86.75709014444641,\"y\":20.265690693511573,\"cMask\":[\"c0\"]},{\"x\":70.3212190559355,\"y\":-14.352949782060534,\"cMask\":[\"c0\"]},{\"x\":51.830864081360744,\"y\":-22.552101473643432,\"cMask\":[\"c0\"]},{\"x\":73.60839327363769,\"y\":9.788996865377925,\"cMask\":[\"c0\"]},{\"x\":54.29624474463736,\"y\":58.07289016025484,\"cMask\":[\"c0\"]},{\"x\":76.07377393691434,\"y\":68.09407556107834,\"cMask\":[\"c0\"]},{\"x\":75.66287715970157,\"y\":37.11950250398749,\"cMask\":[\"c0\"]},{\"x\":87.57888369887195,\"y\":50.7847553232923,\"cMask\":[\"c0\"]},{\"x\":86.75709014444641,\"y\":77.20424410728154,\"cMask\":[\"c0\"]},{\"x\":90.45516113936134,\"y\":53.06229745984305,\"cMask\":[\"c0\"]},{\"x\":111.82179355442554,\"y\":48.05170475943132,\"cMask\":[\"c0\"]},{\"x\":124.55959364802152,\"y\":53.51780588715326,\"cMask\":[\"c0\"]},{\"x\":127.43587108851091,\"y\":61.7169575787361,\"cMask\":[\"c0\"]},{\"x\":125.79228397965983,\"y\":65.36102499721741,\"cMask\":[\"c0\"]},{\"x\":119.21793554425545,\"y\":65.36102499721741,\"cMask\":[\"c0\"]},{\"x\":124.97049042523423,\"y\":73.56017668880025,\"cMask\":[\"c0\"]},{\"x\":116.34165810376606,\"y\":72.19365140686978,\"cMask\":[\"c0\"]},{\"x\":113.05448388606385,\"y\":52.6067890325329,\"cMask\":[\"c0\"]},{\"x\":119.62883232146822,\"y\":62.17246600604625,\"cMask\":[\"c0\"]},{\"x\":116.34165810376606,\"y\":74.92670197073076,\"cMask\":[\"c0\"]},{\"x\":107.71282578229778,\"y\":73.1046682614901,\"cMask\":[\"c0\"]},{\"x\":109.35641289114892,\"y\":65.81653342452756,\"cMask\":[\"c0\"]},{\"x\":101.54937412410624,\"y\":56.250856451014215,\"cMask\":[\"c0\"]},{\"x\":111.82179355442554,\"y\":67.63856713376819,\"cMask\":[\"c0\"]},{\"x\":122.91600653917038,\"y\":74.0156851161104,\"cMask\":[\"c0\"]},{\"x\":121.2724194303193,\"y\":81.30381995307295,\"cMask\":[\"c0\"]},{\"x\":101.54937412410624,\"y\":76.29322725266121,\"cMask\":[\"c0\"]},{\"x\":104.42565156459563,\"y\":69.916109270319,\"cMask\":[\"c0\"]},{\"x\":105.65834189623394,\"y\":61.7169575787361,\"cMask\":[\"c0\"]},{\"x\":100.7275805696807,\"y\":76.74873567997136,\"cMask\":[\"c0\"]},{\"x\":104.01475478738286,\"y\":69.916109270319,\"cMask\":[\"c0\"]},{\"x\":101.13847734689347,\"y\":79.48178624383235,\"cMask\":[\"c0\"]},{\"x\":114.28717421770222,\"y\":86.76992108079486,\"cMask\":[\"c0\"]},{\"x\":156.6095422706178,\"y\":-7.520323372408143,\"cMask\":[\"c0\"]},{\"x\":191.53576833370346,\"y\":14.799589565789717,\"cMask\":[\"c0\"]},{\"x\":83.05901914953148,\"y\":29.83136766702492,\"cMask\":[\"c0\"]},{\"x\":144.69353573144735,\"y\":36.20848564936719,\"cMask\":[\"c0\"]},{\"x\":143.04994862259628,\"y\":17.077131702340495,\"cMask\":[\"c0\"]},{\"x\":164.8274778148732,\"y\":95.88008962699809,\"cMask\":[\"c0\"]},{\"x\":110.94551611393615,\"y\":107.44576660051143,\"cMask\":[\"c0\"]},{\"x\":43.61292853710529,\"y\":67.18305870645804,\"cMask\":[\"c0\"]},{\"x\":69.49942550150996,\"y\":175.13855597896577,\"cMask\":[\"c0\"]},{\"x\":73.60839327363769,\"y\":99.52415704547934,\"cMask\":[\"c0\"]},{\"x\":111.41089677721277,\"y\":107.72330873706221,\"cMask\":[\"c0\"]},{\"x\":56.76162540791401,\"y\":170.12796327855403,\"cMask\":[\"c0\"]},{\"x\":20.19181223597724,\"y\":106.81229188244191,\"cMask\":[\"c0\"]},{\"x\":60.45969640282897,\"y\":80.39280309845265,\"cMask\":[\"c0\"]},{\"x\":-11.036342832193498,\"y\":159.19576102311026,\"cMask\":[\"c0\"]},{\"x\":16.90463801827508,\"y\":166.48389586007278,\"cMask\":[\"c0\"]},{\"x\":16.08284446384951,\"y\":185.61524980709947,\"cMask\":[\"c0\"]},{\"x\":34.16230266121153,\"y\":200.64702790833474,\"cMask\":[\"c0\"]},{\"x\":23.889883230892167,\"y\":155.09618517731877,\"cMask\":[\"c0\"]},{\"x\":19.78091545876447,\"y\":156.4627104592493,\"cMask\":[\"c0\"]},{\"x\":9.097599251232367,\"y\":109.54534244630287,\"cMask\":[\"c0\"]},{\"x\":38.682167210551995,\"y\":138.6978817941531,\"cMask\":[\"c0\"]},{\"x\":33.75140588399873,\"y\":140.97542393070387,\"cMask\":[\"c0\"]},{\"x\":47.72189630923299,\"y\":192.44787621675187,\"cMask\":[\"c0\"]},{\"x\":58.81610929397789,\"y\":200.19151948102456,\"cMask\":[\"c0\"]},{\"x\":30.05333488908377,\"y\":79.02627781652217,\"cMask\":[\"c0\"]},{\"x\":-33.351394685782026,\"y\":-3.14684203250917,\"cMask\":[\"c0\"]},{\"x\":20.089266287732528,\"y\":16.465214355607486,\"cMask\":[\"c0\"]},{\"x\":24.425637239052804,\"y\":42.52740313449064,\"cMask\":[\"c0\"]},{\"x\":-40.36343593611599,\"y\":18.920173585844623,\"cMask\":[\"c0\"]},{\"x\":-24.104352085338064,\"y\":74.66109969519616,\"cMask\":[\"c0\"]},{\"x\":-24.041895205674507,\"y\":74.23163860640528,\"cMask\":[\"c0\"]},{\"x\":-18.858779831758397,\"y\":43.309540843207344,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"]},{\"x\":-11.234236618523653,\"y\":17.777244266296776,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"]},{\"x\":-1.4878856211363427,\"y\":47.283560364396294,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"]},{\"x\":4.327443948279949,\"y\":27.809774839633974,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"]},{\"x\":-1.2474715452823375,\"y\":25.763850350172333,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"]},{\"x\":-3.5736033730488828,\"y\":33.55336456007734,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"]},{\"x\":-13.925136509958008,\"y\":34.556245159093805,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"]},{\"x\":-8.872014758517082,\"y\":51.29614692708299,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"]},{\"x\":-6.028964746802444,\"y\":41.77562955942142,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"]},{\"x\":-24.43369532532074,\"y\":41.263616353745675,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"]},{\"x\":-18.61836575590442,\"y\":21.789830828983327,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"]},{\"x\":-16.555568578285317,\"y\":27.828792318727636,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"]},{\"x\":21.013605790402778,\"y\":156.4627104592493,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"]},{\"x\":-36.10104624217263,\"y\":74.47119354342058,\"cMask\":[\"c0\"]},{\"x\":-35,\"y\":80.2148368076933,\"cMask\":[\"c0\"]},{\"x\":-25.021588044810613,\"y\":87.76992108079486,\"cMask\":[\"c0\"]},{\"x\":-23.48696870808726,\"y\":78.02627781652217,\"cMask\":[\"c0\"]},{\"x\":-10.92737506006577,\"y\":82.39280309845265,\"cMask\":[\"c0\"]},{\"x\":-9.283787951214663,\"y\":89.50297164465582,\"cMask\":[\"c0\"]},{\"x\":4.57773470189187,\"y\":90.41398849927617,\"cMask\":[\"c0\"]},{\"x\":4.22132181074295,\"y\":83.84831152576282,\"cMask\":[\"c0\"]},{\"x\":5.39952825631741,\"y\":90.8694969265863,\"cMask\":[\"c0\"]},{\"x\":17.850154132211173,\"y\":89.958480071966,\"cMask\":[\"c0\"]},{\"x\":15.850154132211173,\"y\":83.39280309845265,\"cMask\":[\"c0\"]},{\"x\":33.69692199793485,\"y\":87.58136208962378,\"cMask\":[\"c0\"]},{\"x\":47.31099953202022,\"y\":69.00509241569864,\"cMask\":[\"c0\"]},{\"x\":39.914857542190305,\"y\":80.65975253459169,\"cMask\":[\"c0\"]},{\"x\":34.98409621563707,\"y\":74.92670197073076,\"cMask\":[\"c0\"]},{\"x\":81.82632881789311,\"y\":60.35043229680562,\"cMask\":[\"c0\"]},{\"x\":92.09874824821247,\"y\":67.18305870645804,\"cMask\":[\"c0\"]},{\"x\":100.31668379246787,\"y\":60.8059407241158,\"cMask\":[\"c0\"]},{\"x\":-60.75485287493899,\"y\":-60.814809367696796,\"cMask\":[\"c0\"]},{\"x\":31.37008306619805,\"y\":-35.62323695935606,\"bCoef\":-0.5,\"cMask\":[\"red\",\"blue\"]},{\"x\":-9.29658644231995,\"y\":-47.15456260594999,\"bCoef\":-0.5,\"cMask\":[\"red\",\"blue\"]},{\"x\":33.081194366766,\"y\":-34.58781524958397,\"bCoef\":-0.5,\"cMask\":[\"red\",\"blue\"]},{\"x\":-11.007697742888013,\"y\":-48.18998431572004,\"bCoef\":-0.5,\"cMask\":[\"red\",\"blue\"]},{\"x\":-43.49718823200254,\"y\":72.19365140686978,\"cMask\":[\"c0\"]},{\"x\":-36.92283979659817,\"y\":105.90127502782161,\"cMask\":[\"c0\"]},{\"x\":-19.66517515366172,\"y\":122.75508683829753,\"cMask\":[\"c0\"]},{\"x\":-43.49718823200254,\"y\":72.19365140686978,\"cMask\":[\"c0\"]},{\"x\":30.46423166629654,\"y\":78.57076938921199,\"cMask\":[\"c0\"]},{\"x\":63.746870620531126,\"y\":38.48602778591797,\"cMask\":[\"c0\"]},{\"x\":86.75709014444641,\"y\":19.810182266201423,\"cMask\":[\"c0\"]},{\"x\":-71.0272723052583,\"y\":-74.93557061431177,\"cMask\":[\"c0\"]},{\"x\":-55.002297993960184,\"y\":-38.03938800218879,\"cMask\":[\"c0\"]}],\"segments\":[{\"v0\":0,\"v1\":1,\"bias\":100,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"7D7D7D\"},{\"v0\":1,\"v1\":0,\"bias\":100,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"7D7D7D\"},{\"v0\":2,\"v1\":3,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"7D7D7D\"},{\"v0\":3,\"v1\":2,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"7D7D7D\"},{\"v0\":4,\"v1\":5,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"7D7D7D\"},{\"v0\":5,\"v1\":4,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"7D7D7D\"},{\"v0\":6,\"v1\":7,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"7D7D7D\"},{\"v0\":7,\"v1\":6,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"7D7D7D\"},{\"v0\":8,\"v1\":9,\"bCoef\":0,\"vis\":false,\"cMask\":[\"c0\"]},{\"v0\":10,\"v1\":11,\"bCoef\":0,\"vis\":false,\"cMask\":[\"c1\"],\"cGroup\":[\"kick\"]},{\"v0\":14,\"v1\":15,\"bCoef\":100000000,\"vis\":false,\"cMask\":[\"c3\"],\"cGroup\":[\"kick\"]},{\"v0\":16,\"v1\":19,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"7D7D7D\"},{\"v0\":19,\"v1\":16,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"7D7D7D\"},{\"v0\":17,\"v1\":20,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"7D7D7D\"},{\"v0\":20,\"v1\":17,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"7D7D7D\"},{\"v0\":18,\"v1\":21,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"7D7D7D\"},{\"v0\":21,\"v1\":18,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"7D7D7D\"},{\"v0\":22,\"v1\":23,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"7D7D7D\"},{\"v0\":23,\"v1\":22,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"7D7D7D\"},{\"v0\":25,\"v1\":24,\"curve\":64.96405995790032,\"curveF\":1.570772520142078,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":26,\"v1\":27,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":25,\"v1\":28,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":28,\"v1\":29,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":30,\"v1\":29,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":32,\"v1\":31,\"curve\":32.896817252945965,\"curveF\":3.3871402029615347,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":34,\"v1\":33,\"curve\":27.124327352767555,\"curveF\":4.145480599090436,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":35,\"v1\":34,\"curve\":19.799004144835102,\"curveF\":5.730035659631905,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":36,\"v1\":35,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":37,\"v1\":36,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":27,\"v1\":38,\"curve\":24.730268645066644,\"curveF\":4.561494257691355,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":38,\"v1\":39,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":40,\"v1\":39,\"curve\":18.41362648243927,\"curveF\":6.169537913429568,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":39,\"v1\":41,\"curve\":18.41362648243927,\"curveF\":6.169537913429568,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":41,\"v1\":42,\"curve\":21.915546244188963,\"curveF\":5.16487377239243,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":43,\"v1\":42,\"curve\":38.944544906887664,\"curveF\":2.8282619139896754,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":42,\"v1\":44,\"curve\":18.050278458828576,\"curveF\":6.295871698932099,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":44,\"v1\":45,\"curve\":21.8052165427344,\"curveF\":5.191653556610735,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":46,\"v1\":47,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":47,\"v1\":48,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":49,\"v1\":46,\"curve\":27.73342289539634,\"curveF\":4.050903786761786,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":50,\"v1\":51,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":48,\"v1\":52,\"curve\":81.30191852531571,\"curveF\":1.1646220964678007,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":52,\"v1\":53,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":53,\"v1\":54,\"curve\":10.353662901125611,\"curveF\":11.037597317814962,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":48,\"v1\":55,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":55,\"v1\":56,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":57,\"v1\":58,\"curve\":11.001514358984423,\"curveF\":10.383958709310516,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":54,\"v1\":59,\"curve\":25.657051368936308,\"curveF\":4.391395397620451,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":59,\"v1\":60,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":61,\"v1\":26,\"curve\":26.19340662251534,\"curveF\":4.298364314427916,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":62,\"v1\":59,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":63,\"v1\":24,\"curve\":24.584185739580775,\"curveF\":4.589457036422791,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":59,\"v1\":64,\"curve\":28.193616078605846,\"curveF\":3.982105783675394,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":64,\"v1\":63,\"curve\":55.91587746137646,\"curveF\":1.884061814192793,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":65,\"v1\":66,\"curve\":28.10341115624527,\"curveF\":3.995417246335218,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":66,\"v1\":67,\"curve\":32.61569864873935,\"curveF\":3.41799500576564,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":68,\"v1\":69,\"curve\":87.27222248408626,\"curveF\":1.0487790667177925,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":70,\"v1\":68,\"curve\":91.01129754822391,\"curveF\":0.9825034847024159,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":62,\"v1\":71,\"curve\":29.679637608212033,\"curveF\":3.7742255719252302,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":62,\"v1\":72,\"curve\":38.075988956856925,\"curveF\":2.897966653385071,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":73,\"v1\":74,\"curve\":19.384947656810187,\"curveF\":5.854871588894215,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":76,\"v1\":75,\"curve\":61.39739147490446,\"curveF\":1.6842792845253598,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":75,\"v1\":77,\"curve\":53.083351564723365,\"curveF\":2.002041553938593,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":33,\"v1\":79,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":77,\"v1\":80,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":81,\"v1\":80,\"curve\":33.69401762448199,\"curveF\":3.302365191186738,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":77,\"v1\":83,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":84,\"v1\":85,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":86,\"v1\":87,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":82,\"v1\":88,\"curve\":31.24091808873227,\"curveF\":3.5766662286774022,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":90,\"v1\":89,\"curve\":30.364030662738248,\"curveF\":3.6851828884427547,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":91,\"v1\":81,\"curve\":93.66680521853249,\"curveF\":0.9379660214601289,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":92,\"v1\":80,\"curve\":83.23166495655077,\"curveF\":1.125700419035067,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":92,\"v1\":81,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":93,\"v1\":29,\"curve\":45.24800680751066,\"curveF\":2.3995118120026895,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":94,\"v1\":93,\"curve\":32.0560435128164,\"curveF\":3.480988210289005,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":96,\"v1\":95,\"curve\":32.01673397912919,\"curveF\":3.4854933466810993,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":98,\"v1\":97,\"curve\":91.83529806656588,\"curveF\":0.9684702897636337,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":100,\"v1\":99,\"curve\":67.2576434076964,\"curveF\":1.5034796396810843,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":101,\"v1\":100,\"curve\":33.05114644011864,\"curveF\":3.3704185114565597,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":102,\"v1\":96,\"curve\":30.0435058470788,\"curveF\":3.7263911827871468,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":103,\"v1\":104,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":105,\"v1\":106,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":104,\"v1\":106,\"curve\":44.60355628644665,\"curveF\":2.4380364231202005,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":104,\"v1\":107,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":106,\"v1\":108,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":108,\"v1\":109,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":109,\"v1\":110,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":110,\"v1\":111,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":111,\"v1\":112,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":112,\"v1\":113,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":112,\"v1\":114,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":114,\"v1\":115,\"curve\":56.668454363854,\"curveF\":1.8545466400993478,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":116,\"v1\":117,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":117,\"v1\":118,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":118,\"v1\":119,\"curve\":74.04421877335461,\"curveF\":1.3259799292949979,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":119,\"v1\":120,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":122,\"v1\":121,\"curve\":36.430631189146524,\"curveF\":3.038779381443299,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":123,\"v1\":124,\"curve\":27.155748927511137,\"curveF\":4.140499840735493,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":124,\"v1\":125,\"curve\":35.39220413586051,\"curveF\":3.1341502479219243,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":126,\"v1\":127,\"curve\":33.774787809352404,\"curveF\":3.293992970613421,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":128,\"v1\":129,\"curve\":34.429219205480635,\"curveF\":3.227564427484375,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":129,\"v1\":119,\"curve\":39.35221415833419,\"curveF\":2.796565756721433,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":130,\"v1\":128,\"curve\":34.43471553611999,\"curveF\":3.2270168929149774,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":131,\"v1\":130,\"curve\":40.563000900530575,\"curveF\":2.7060361202683034,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":124,\"v1\":131,\"curve\":37.253499283375646,\"curveF\":2.9668571607548597,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":107,\"v1\":128,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":99,\"v1\":132,\"curve\":21.310552719513687,\"curveF\":5.315088063949703,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":132,\"v1\":133,\"curve\":21.296731454659813,\"curveF\":5.318618285231218,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":134,\"v1\":133,\"curve\":21.938724593814587,\"curveF\":5.159281626379893,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":135,\"v1\":136,\"curve\":94.09607649080162,\"curveF\":0.9309488030450684,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":135,\"v1\":137,\"curve\":98.44426196508834,\"curveF\":0.8625030200638429,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":137,\"v1\":138,\"curve\":101.98784492803861,\"curveF\":0.8099596786938144,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":139,\"v1\":140,\"curve\":96.72215814582727,\"curveF\":0.8890570429120243,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":141,\"v1\":142,\"curve\":106.82634658399935,\"curveF\":0.7423088737289484,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":140,\"v1\":143,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":143,\"v1\":144,\"curve\":12.680956564390383,\"curveF\":8.99958993632498,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":144,\"v1\":145,\"curve\":39.55647378406414,\"curveF\":2.780920675417801,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":146,\"v1\":35,\"curve\":36.49786919292764,\"curveF\":3.032785038108542,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":147,\"v1\":146,\"curve\":43.22587800227712,\"curveF\":2.524046203715973,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":148,\"v1\":147,\"curve\":20.77543721891776,\"curveF\":5.455156960989275,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":148,\"v1\":149,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":150,\"v1\":149,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":151,\"v1\":150,\"curve\":25.18736400915398,\"curveF\":4.47606122431419,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":151,\"v1\":152,\"curve\":20.77501634159551,\"curveF\":5.455269935405155,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":153,\"v1\":154,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":154,\"v1\":155,\"curve\":11.086651825137466,\"curveF\":10.303723398180301,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":155,\"v1\":156,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":143,\"v1\":156,\"curve\":34.53187891748314,\"curveF\":3.2173655557434166,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":158,\"v1\":159,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":159,\"v1\":160,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":158,\"v1\":161,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":160,\"v1\":162,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":161,\"v1\":163,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":164,\"v1\":165,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"],\"color\":\"FF0000\"},{\"v0\":165,\"v1\":166,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"],\"color\":\"FF0000\"},{\"v0\":166,\"v1\":167,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"],\"color\":\"FF0000\"},{\"v0\":167,\"v1\":168,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"],\"color\":\"FF0000\"},{\"v0\":168,\"v1\":169,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"],\"color\":\"FF0000\"},{\"v0\":170,\"v1\":171,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"],\"color\":\"FF0000\"},{\"v0\":171,\"v1\":172,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"],\"color\":\"FF0000\"},{\"v0\":164,\"v1\":173,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"],\"color\":\"FF0000\"},{\"v0\":173,\"v1\":174,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"],\"color\":\"FF0000\"},{\"v0\":174,\"v1\":175,\"cMask\":[\"c0\"],\"cGroup\":[\"all\"],\"color\":\"FF0000\"},{\"v0\":177,\"v1\":178,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":178,\"v1\":179,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":180,\"v1\":179,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":181,\"v1\":182,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":182,\"v1\":183,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":185,\"v1\":184,\"curve\":134.03331227698212,\"curveF\":0.4241317752722216,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":187,\"v1\":186,\"curve\":132.1722674366651,\"curveF\":0.4434285714285756,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":185,\"v1\":186,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":186,\"v1\":188,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":188,\"v1\":157,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":189,\"v1\":190,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":190,\"v1\":191,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":193,\"v1\":192,\"curve\":113.9478583399237,\"curveF\":0.6500547027368867,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":194,\"v1\":193,\"curve\":37.28317663789911,\"curveF\":2.964320488312706,\"cMask\":[\"c0\"],\"color\":\"FFFDD0\"},{\"v0\":195,\"v1\":73,\"curve\":41.841234870808414,\"curveF\":2.615916230574092,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":196,\"v1\":197,\"bCoef\":-0.5,\"curve\":-160.00000000000003,\"curveF\":-0.17632698070846492,\"cMask\":[\"red\",\"blue\"],\"color\":\"252525\"},{\"v0\":198,\"v1\":199,\"bCoef\":-0.5,\"curve\":-160.00000000000003,\"curveF\":-0.17632698070846492,\"cMask\":[\"red\",\"blue\"],\"color\":\"252525\"},{\"v0\":199,\"v1\":198,\"bias\":-1,\"bCoef\":-0.5,\"curve\":130,\"curveF\":0.4663076581549986,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"color\":\"E6842E\"},{\"v0\":34,\"v1\":152,\"curve\":25.227797256892945,\"curveF\":4.46865075476096,\"cMask\":[\"c0\"],\"color\":\"FF0000\"},{\"v0\":201,\"v1\":200,\"curve\":27.124327352767555,\"curveF\":4.145480599090436,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":202,\"v1\":201,\"curve\":19.799004144835102,\"curveF\":5.730035659631905,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":204,\"v1\":203,\"curve\":32.896817252945965,\"curveF\":3.3871402029615347,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":206,\"v1\":205,\"curve\":91.83529806656588,\"curveF\":0.9684702897636337,\"cMask\":[\"c0\"],\"color\":\"769BF\"},{\"v0\":207,\"v1\":208,\"curve\":38.075988956856925,\"curveF\":2.897966653385071,\"cMask\":[\"c0\"],\"color\":\"769BF\"}],\"planes\":[{\"normal\":[0,1],\"dist\":-800,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,-1],\"dist\":-793,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[1,0],\"dist\":-922,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[-1,0],\"dist\":-922,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[1,0],\"dist\":-309,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-1,0],\"dist\":-307,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0,-1],\"dist\":-303,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0,1],\"dist\":-308,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0.7071067811865476,0.7071067811865476],\"dist\":-306.920310216783,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-0.7071067811865476,0.7071067811865476],\"dist\":-308.3345237791561,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-0.7071067811865476,-0.7071067811865476],\"dist\":-308.3345237791561,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0.7071067811865476,-0.7071067811865476],\"dist\":-307.62741699796953,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0.9424277454812465,-0.33440984517076494],\"dist\":-307.07104978127046,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0.33440984517076494,-0.9424277454812465],\"dist\":-307.80067126164306,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-0.33440984517076494,-0.9424277454812465],\"dist\":-307.31425694139466,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-0.9424277454812465,-0.33440984517076494],\"dist\":-307.6182658915499,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-0.9424277454812465,0.33440984517076494],\"dist\":-307.95267573672066,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-0.33440984517076494,0.9424277454812465],\"dist\":-306.52383367099105,\"bCoef\":20,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0.33440984517076494,0.9424277454812465],\"dist\":-306.46303188096,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0.9424277454812465,0.33440984517076494],\"dist\":-310.6279544980868,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0,1],\"dist\":-850,\"bCoef\":0,\"cMask\":[\"ball\"],\"cGroup\":[\"ball\"]},{\"normal\":[1,0],\"dist\":-309,\"bCoef\":5,\"cMask\":[\"kick\"],\"cGroup\":[\"c3\"]},{\"normal\":[1,0],\"dist\":308,\"bCoef\":5,\"cMask\":[\"kick\"],\"cGroup\":[\"c3\"]},{\"normal\":[0,1],\"dist\":-600,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,-1],\"dist\":-600,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,-1],\"dist\":-650,\"bCoef\":10000,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"normal\":[0,1],\"dist\":-650,\"bCoef\":0.0001,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]}],\"goals\":[],\"discs\":[{\"radius\":0,\"bCoef\":1,\"invMass\":0.01,\"damping\":0,\"color\":\"0\",\"cMask\":[\"ball\"],\"cGroup\":[\"ball\",\"kick\",\"score\"]},{\"pos\":[-2450,2],\"speed\":[0.4,0],\"radius\":0.01,\"bCoef\":10000000,\"damping\":1,\"color\":\"FA3A0A\",\"cMask\":[\"c1\"],\"cGroup\":[\"kick\"]},{\"radius\":1,\"bCoef\":0.3,\"invMass\":0,\"damping\":1.0027,\"color\":\"3B2C25\",\"cMask\":[\"c0\"],\"cGroup\":[\"c2\"]},{\"pos\":[0,-250],\"speed\":[0,0.2],\"bCoef\":5,\"damping\":1,\"color\":\"transparent\",\"cMask\":[\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[-961,250.55263581912408],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-563,-176.5967332862158],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-706,414.75797359604417],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-961,518.990737469004],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-609,656.4811004085838],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-872,-452.96700690743546],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-616,-370.76537651239573],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-506,-316.0366886270358],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-594,60.228778833534534],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-464,-614.7231637735877],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-494,485.380285211064],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-751,-128.65314620107472],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-494,242.96979279698093],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-464,-534.7231637735877],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-872,-350.96700690743546],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-616,-262.76537651239573],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-506,-238.0366886270358],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-751,-0.6531462010747191],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-594,166.22877883353453],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-862.5,154.2712921170687],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-563,-27.596733286215795],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-706,565.7579735960442],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[-609,775.4811004085838],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[690,-484.52705156661614],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[554,-160.5967332862158],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[411,430.75797359604417],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[508,672.4811004085838],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[553,-574.9670069074355],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[501,-354.76537651239573],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[611,-300.0366886270358],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[523,76.22877883353453],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[707,-32.06841039915025],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[727,591.9361792871871],\"speed\":[0,20],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[690,-403.52705156661614],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[553,-472.96700690743546],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[501,-246.76537651239573],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[611,-222.0366886270358],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[707,156.93158960084975],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[523,182.22877883353453],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[554,-11.596733286215795],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[411,581.7579735960442],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[726.9029363784665,773.0876502917861],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[508,787.4811004085838],\"speed\":[0,23],\"radius\":0,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c1\"],\"cGroup\":[\"c1\"]},{\"pos\":[153,-234],\"speed\":[0,5],\"radius\":20,\"bCoef\":0.3,\"invMass\":1e-30,\"damping\":1.00127,\"color\":\"C21717\",\"cMask\":[\"red\",\"blue\",\"redKO\",\"blueKO\"]},{\"pos\":[-152,236],\"speed\":[0,-5],\"radius\":20,\"bCoef\":0.3,\"invMass\":1e-30,\"damping\":1.00127,\"color\":\"C21717\",\"cMask\":[\"red\",\"blue\",\"redKO\",\"blueKO\"]}],\"playerPhysics\":{\"bCoef\":0.1,\"damping\":0.9995,\"acceleration\":0.025,\"kickingAcceleration\":0.025,\"kickingDamping\":0.9995,\"kickStrength\":0,\"radius\":20},\"ballPhysics\":\"disc0\",\"spawnDistance\":300,\"joints\":[{\"d0\":13,\"d1\":17,\"length\":80,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":9,\"d1\":18,\"length\":102,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":10,\"d1\":19,\"length\":108,\"color\":\"FFFFFF\"},{\"d0\":10,\"d1\":19,\"length\":108,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":11,\"d1\":20,\"length\":78,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":15,\"d1\":21,\"length\":128,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":12,\"d1\":22,\"length\":106,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":5,\"d1\":24,\"length\":149,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":6,\"d1\":25,\"length\":151,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":14,\"d1\":16,\"length\":242.41049241408308,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":4,\"d1\":7,\"length\":268.4381016498799,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":8,\"d1\":26,\"length\":119,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":31,\"d1\":38,\"length\":102,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":27,\"d1\":37,\"length\":81,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":32,\"d1\":39,\"length\":108,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":33,\"d1\":40,\"length\":78,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":28,\"d1\":43,\"length\":149,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":34,\"d1\":42,\"length\":106,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":35,\"d1\":41,\"length\":189,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":29,\"d1\":44,\"length\":151,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":36,\"d1\":45,\"length\":181.15149700865484,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":30,\"d1\":46,\"length\":115,\"color\":\"FFFFFF\",\"strength\":0},{\"d0\":2,\"d1\":48,\"length\":280.713376952364,\"color\":\"transparent\"},{\"d0\":2,\"d1\":47,\"length\":279.5800422061632,\"color\":\"transparent\"}]}";

var gameState = {
    active: false,
    players: [], // {id, name, alive}
    checkInterval: null,
    explanationPhase: false,
    chatBlocked: false,
    timers: {}, // acumulador de tiempo en zona por jugador (ms)
    callback: null
};

// Configuración basada en coordenadas provistas
var config = {
    pointA: { x: -9.29, y: -47.15 },
    pointB: { x: 33.08, y: -34.58 },
    // tolerancia en píxeles alrededor de la línea AB
    tolerance: 20,
    requiredMs: 3000,
    checkIntervalMs: 100,
    explanationMs: 5000
};

function start(room, onGameEnd) {
    if (!mapData) {
        console.error('[SUPERMAN] mapData no inyectado.');
        return;
    }
    gameState.callback = onGameEnd || null;

    // Obtener lista de jugadores y comprobar mínimo
    var players = room.getPlayerList().filter(p => p.id !== 0);
    if (players.length < 2) { room.sendAnnouncement('⚠️ No hay suficientes jugadores para SUPERMAN', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    // Revolver y asignar equipos ANTES de cargar el mapa (pedido del usuario)
    try { shuffleTeams(room); } catch(e) { console.error('[SUPERMAN] shuffle error', e.message); }

    try { room.setCustomStadium(mapData); } catch (e) { console.error('[SUPERMAN] Error cargando mapa', e.message); return; }

    gameState.active = true;
    gameState.players = players.map(p => ({ id: p.id, name: p.name, alive: true }));
    gameState.timers = {};

    room.sendAnnouncement('🎮 SUPERMAN CHAIR - Párate en la cabeza de Superman', null, 0x00BFFF, 'bold', 2);
    room.startGame();
    room.pauseGame(true);
    gameState.chatBlocked = true;

    room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
        '🔴 Todos se separan en equipos\n' +
        '🎯 Debes pararte en la cabeza de Superman (zona marcada en el mapa)\n' +
        '⏱️ Si permaneces 3s en esa zona, ganas y vas a Lucky\n' +
        '⏳ El juego comenzará después de la explicación de 5s...'
    , null, 0xFFFF00, 'bold', 2);

    setTimeout(function() {
        gameState.explanationPhase = false;
        gameState.chatBlocked = false;
        room.pauseGame(false);
        room.sendAnnouncement('🟢 ¡COMIENZA SUPERMAN CHAIR! Ponte en la cabeza de Superman', null, 0x00FF00, 'bold', 2);

        if (gameState.checkInterval) clearInterval(gameState.checkInterval);
        gameState.checkInterval = setInterval(() => checkPlayers(room), config.checkIntervalMs);
    }, config.explanationMs);
}

function checkPlayers(room) {
    if (!gameState.active) return;

    var AB = { x: config.pointB.x - config.pointA.x, y: config.pointB.y - config.pointA.y };
    var ABlen2 = AB.x*AB.x + AB.y*AB.y;

    var playersList = room.getPlayerList().filter(p => p.id !== 0);
    for (var p of playersList) {
        var ps = gameState.players.find(x => x.id === p.id);
        if (!ps || !ps.alive) continue;
        var pos = p.position;
        if (!pos) continue;

        // Distancia al segmento AB
        var AP = { x: pos.x - config.pointA.x, y: pos.y - config.pointA.y };
        var t = (AP.x * AB.x + AP.y * AB.y) / ABlen2;
        // Proyección más cercana
        var closest;
        if (t < 0) closest = config.pointA;
        else if (t > 1) closest = config.pointB;
        else closest = { x: config.pointA.x + AB.x * t, y: config.pointA.y + AB.y * t };

        var dx = pos.x - closest.x;
        var dy = pos.y - closest.y;
        var dist2 = dx*dx + dy*dy;

        var inZone = dist2 <= config.tolerance * config.tolerance;

        if (inZone) {
            gameState.timers[p.id] = (gameState.timers[p.id] || 0) + config.checkIntervalMs;
            if (gameState.timers[p.id] >= config.requiredMs) {
                declareWinner(room, { id: p.id, name: p.name });
                return;
            }
        } else {
            gameState.timers[p.id] = 0;
        }
    }
}

function declareWinner(room, winner) {
    if (!gameState.active) return;
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    room.sendAnnouncement('\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO SUPERMAN CHAIR! 🏆', null, 0xFFD700, 'bold', 2);
    setTimeout(function() {
        if (gameState.callback) gameState.callback({ id: winner.id, name: winner.name });
        stop(room);
    }, 2500);
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.players = [];
    gameState.timers = {};
    gameState.chatBlocked = false;
    try { room.stopGame(); } catch(e) {}
}

function onPlayerLeave(room, player) {
    var p = gameState.players.find(x => x.id === player.id);
    if (p) p.alive = false;
}

function onPlayerChat(room, player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

// Helpers
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(p => p.id !== 0);
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
    }
    var half = Math.floor(players.length / 2);
    for (var i = 0; i < players.length; i++) {
        try { room.setPlayerTeam(players[i].id, i < half ? 1 : 2); } catch(e){}
    }
}

return {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: function(jsonString) { mapData = jsonString; }
};

})();

// ============================================
// MÓDULO: ULTRABALL
// ============================================
var ULTRABALL = (function() {
// ============================================
// MINIJUEGO: ULTRABALL - Partido de goles con eliminación por rondas
// ============================================

var mapData = "{\"name\":\"ULTRABALL\",\"width\":600,\"height\":270,\"bg\":{\"type\":\"hockey\",\"width\":550,\"height\":271,\"kickOffRadius\":75},\"vertexes\":[{\"x\":-550,\"y\":500,\"cMask\":[\"ball\"]},{\"x\":-550,\"y\":80,\"cMask\":[\"ball\"]},{\"x\":-550,\"y\":-80,\"cMask\":[\"ball\"]},{\"x\":-550,\"y\":-500,\"cMask\":[\"ball\"]},{\"x\":550,\"y\":500,\"cMask\":[\"ball\"]},{\"x\":550,\"y\":80,\"cMask\":[\"ball\"]},{\"x\":550,\"y\":-80,\"cMask\":[\"ball\"]},{\"x\":550,\"y\":-500,\"cMask\":[\"ball\"]},{\"x\":0,\"y\":270,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":0,\"y\":75,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":0,\"y\":-75,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":0,\"y\":-270,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-560,\"y\":-80,\"bCoef\":0.1,\"cMask\":[\"ball\"]},{\"x\":-580,\"y\":-60,\"bCoef\":0.1,\"cMask\":[\"ball\"]},{\"x\":-580,\"y\":60,\"bCoef\":0.1,\"cMask\":[\"ball\"]},{\"x\":-560,\"y\":80,\"bCoef\":0.1,\"cMask\":[\"ball\"]},{\"x\":560,\"y\":-80,\"bCoef\":0.1,\"cMask\":[\"ball\"]},{\"x\":580,\"y\":-60,\"bCoef\":0.1,\"cMask\":[\"ball\"]},{\"x\":580,\"y\":60,\"bCoef\":0.1,\"cMask\":[\"ball\"]},{\"x\":560,\"y\":80,\"bCoef\":0.1,\"cMask\":[\"ball\"]},{\"x\":-565,\"y\":85,\"cMask\":[\"ball\"]},{\"x\":-565,\"y\":500,\"cMask\":[\"ball\"]},{\"x\":-565,\"y\":-85,\"cMask\":[\"ball\"]},{\"x\":-565,\"y\":-500,\"cMask\":[\"ball\"]},{\"x\":565,\"y\":-85,\"cMask\":[\"ball\"]},{\"x\":565,\"y\":-500,\"cMask\":[\"ball\"]},{\"x\":565,\"y\":85,\"cMask\":[\"ball\"]},{\"x\":565,\"y\":500,\"cMask\":[\"ball\"]},{\"x\":-553,\"y\":-271,\"cMask\":[\"wall\"]},{\"x\":-553,\"y\":271,\"cMask\":[\"wall\"]},{\"x\":553,\"y\":271,\"cMask\":[\"wall\"]},{\"x\":553,\"y\":-271,\"cMask\":[\"wall\"]},{\"x\":-550,\"y\":-268,\"cMask\":[\"wall\"]},{\"x\":-550,\"y\":268,\"cMask\":[\"wall\"]},{\"x\":550,\"y\":268,\"cMask\":[\"wall\"]},{\"x\":550,\"y\":-268,\"cMask\":[\"wall\"]},{\"x\":-3,\"y\":264,\"cMask\":[\"wall\"]},{\"x\":-3,\"y\":78,\"cMask\":[\"wall\"]},{\"x\":-3,\"y\":-78,\"cMask\":[\"wall\"]},{\"x\":-3,\"y\":-264,\"cMask\":[\"wall\"]},{\"x\":3,\"y\":-264,\"cMask\":[\"wall\"]},{\"x\":3,\"y\":-78,\"cMask\":[\"wall\"]},{\"x\":3,\"y\":78,\"cMask\":[\"wall\"]},{\"x\":3,\"y\":264,\"cMask\":[\"wall\"]},{\"x\":0,\"y\":-72,\"cMask\":[\"wall\"]},{\"x\":0,\"y\":72,\"cMask\":[\"wall\"]},{\"x\":-546,\"y\":264,\"cMask\":[\"wall\"]},{\"x\":546,\"y\":264,\"cMask\":[\"wall\"]},{\"x\":546,\"y\":-264,\"cMask\":[\"wall\"]},{\"x\":-546,\"y\":-264,\"cMask\":[\"wall\"]},{\"x\":0,\"y\":-78,\"cMask\":[\"wall\"]},{\"x\":0,\"y\":78,\"cMask\":[\"wall\"]},{\"x\":-3,\"y\":-71,\"cMask\":[\"wall\"]},{\"x\":-3,\"y\":71,\"cMask\":[\"wall\"]},{\"x\":3,\"y\":71,\"cMask\":[\"wall\"]},{\"x\":3,\"y\":-71,\"cMask\":[\"wall\"]},{\"x\":-30,\"y\":256,\"cMask\":[\"wall\"]},{\"x\":-30,\"y\":236,\"cMask\":[\"wall\"]},{\"x\":-21,\"y\":245,\"cMask\":[\"wall\"]},{\"x\":-12,\"y\":236,\"cMask\":[\"wall\"]},{\"x\":-12,\"y\":256,\"cMask\":[\"wall\"]},{\"x\":12,\"y\":236,\"cMask\":[\"wall\"]},{\"x\":12,\"y\":256,\"cMask\":[\"wall\"]},{\"x\":26,\"y\":256,\"cMask\":[\"wall\"]},{\"x\":26,\"y\":252,\"cMask\":[\"wall\"]},{\"x\":26,\"y\":240,\"cMask\":[\"wall\"]},{\"x\":26,\"y\":236,\"cMask\":[\"wall\"]}],\"segments\":[{\"v0\":0,\"v1\":1,\"vis\":false,\"cMask\":[\"ball\"]},{\"v0\":2,\"v1\":3,\"vis\":false,\"cMask\":[\"ball\"]},{\"v0\":4,\"v1\":5,\"vis\":false,\"cMask\":[\"ball\"]},{\"v0\":6,\"v1\":7,\"vis\":false,\"cMask\":[\"ball\"]},{\"v0\":13,\"v1\":12,\"bCoef\":0.1,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"ball\"]},{\"v0\":13,\"v1\":14,\"bCoef\":0.1,\"cMask\":[\"ball\"]},{\"v0\":15,\"v1\":14,\"bCoef\":0.1,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"ball\"]},{\"v0\":16,\"v1\":17,\"bCoef\":0.1,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"ball\"]},{\"v0\":17,\"v1\":18,\"bCoef\":0.1,\"cMask\":[\"ball\"]},{\"v0\":18,\"v1\":19,\"bCoef\":0.1,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"ball\"]},{\"v0\":8,\"v1\":9,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"1121F0\"},{\"v0\":9,\"v1\":10,\"bCoef\":0.1,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"blueKO\"],\"color\":\"1121F0\"},{\"v0\":10,\"v1\":9,\"bCoef\":0.1,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\"],\"color\":\"1121F0\"},{\"v0\":10,\"v1\":11,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"1121F0\"},{\"v0\":20,\"v1\":21,\"vis\":false,\"cMask\":[\"ball\"]},{\"v0\":22,\"v1\":23,\"vis\":false,\"cMask\":[\"ball\"]},{\"v0\":24,\"v1\":25,\"vis\":false,\"cMask\":[\"ball\"]},{\"v0\":26,\"v1\":27,\"vis\":false,\"cMask\":[\"ball\"]},{\"v0\":28,\"v1\":29,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":29,\"v1\":30,\"cMask\":[\"ball\"],\"color\":\"FFFFFF\"},{\"v0\":30,\"v1\":31,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":31,\"v1\":28,\"cMask\":[\"ball\"],\"color\":\"FFFFFF\"},{\"v0\":32,\"v1\":33,\"cMask\":[\"wall\"],\"color\":\"1121F0\"},{\"v0\":33,\"v1\":34,\"cMask\":[\"wall\"],\"color\":\"1121F0\"},{\"v0\":34,\"v1\":35,\"cMask\":[\"wall\"],\"color\":\"1121F0\"},{\"v0\":35,\"v1\":32,\"cMask\":[\"wall\"],\"color\":\"1121F0\"},{\"v0\":36,\"v1\":37,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":37,\"v1\":38,\"curve\":176,\"curveF\":0.03492076949174784,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":38,\"v1\":39,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":40,\"v1\":41,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":41,\"v1\":42,\"curve\":176,\"curveF\":0.03492076949174784,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":42,\"v1\":43,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":44,\"v1\":45,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":45,\"v1\":44,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":47,\"v1\":48,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":49,\"v1\":46,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":46,\"v1\":36,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":43,\"v1\":47,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":39,\"v1\":49,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":40,\"v1\":48,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":50,\"v1\":51,\"cMask\":[\"wall\"],\"color\":\"1121F0\"},{\"v0\":52,\"v1\":53,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":54,\"v1\":55,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":56,\"v1\":57,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":57,\"v1\":58,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":58,\"v1\":59,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":59,\"v1\":60,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":61,\"v1\":62,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":62,\"v1\":63,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":63,\"v1\":64,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":65,\"v1\":66,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":66,\"v1\":61,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"}],\"planes\":[{\"normal\":[0,1],\"dist\":-270,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,-1],\"dist\":-270,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[1,0],\"dist\":-600,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[-1,0],\"dist\":-600,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[1,0],\"dist\":-100000,\"bCoef\":0,\"cGroup\":[\"ball\"]},{\"normal\":[-1,0],\"dist\":-100000,\"bCoef\":0,\"cGroup\":[\"ball\"]},{\"normal\":[0,-1],\"dist\":-199000,\"bCoef\":0,\"cGroup\":[\"ball\"]},{\"normal\":[0,1],\"dist\":-199000,\"bCoef\":0,\"cGroup\":[\"ball\"]}],\"goals\":[{\"p0\":[-550,80],\"p1\":[-550,-80],\"team\":\"red\"},{\"p0\":[550,80],\"p1\":[550,-80],\"team\":\"blue\"}],\"discs\":[{\"bCoef\":0.4,\"damping\":1,\"color\":\"5150B0\",\"cGroup\":[\"ball\",\"kick\",\"score\"]},{\"pos\":[-550,80],\"radius\":8,\"invMass\":0,\"color\":\"0\"},{\"pos\":[-550,-80],\"radius\":8,\"invMass\":0,\"color\":\"0\"},{\"pos\":[550,80],\"radius\":8,\"invMass\":0,\"color\":\"0\"},{\"pos\":[550,-80],\"radius\":8,\"invMass\":0,\"color\":\"0\"},{\"pos\":[0,-100000],\"radius\":100000,\"bCoef\":0,\"invMass\":100,\"color\":\"transparent\",\"cMask\":[\"ball\"]},{\"pos\":[0,100000],\"radius\":100000,\"bCoef\":0,\"invMass\":100,\"color\":\"transparent\",\"cMask\":[\"ball\"]}],\"playerPhysics\":{\"invMass\":1e+100,\"kickStrength\":9},\"ballPhysics\":\"disc0\",\"spawnDistance\":350}";

var gameState = {
    active: false,
    firstRound: true,
    players: [], // lista de player ids activos en torneo
    spectatorPool: [],
    currentMatch: null,
    stopRequested: false,
    chatBlocked: false,
    callback: null
};

// Config
var config = {
    firstExplanationMs: 5000,
    matchTimeMs: 60000, // tiempo por partido (ajustable)
    goalsToWin: 2
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[ULTRABALL] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;
    gameState.stopRequested = false;

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[ULTRABALL] Error cargando mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    var players = room.getPlayerList().filter(p => p.id !== 0);
    if (players.length < 2) { room.sendAnnouncement('⚠️ No hay suficientes jugadores para ULTRABALL', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = players.map(p => p.id);
    gameState.spectatorPool = [];

    // Repartir equipos inicialmente
    shuffleTeams(room);

    // Anuncio inicial
    room.sendAnnouncement('⚽ ULTRABALL - Partido de goles. Primero a ' + config.goalsToWin + ' goles gana cada ronda.', null, 0x00BFFF, 'bold', 2);

    // Seguir el patrón de otros minijuegos: cargar mapa, esperar un momento, startGame(), pause(), instrucciones, despause
    if (gameState.firstRound) {
        setTimeout(function() {
            try { room.startGame(); } catch(e){}
            try { room.pauseGame(true); } catch(e){}
            try { lockTeamChanges(); } catch(e) {}
            gameState.chatBlocked = true;

            room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
                '🔴 Equipo vs 🔵 Equipo. Marca ' + config.goalsToWin + ' goles para ganar la ronda.\n' +
                '⚠️ El mapa permite curvas; el control del balón puede ser impredecible.\n' +
                '⏱️ Si llega el tiempo, gana el equipo con más goles.\n' +
                '⏳ Comienza en 5s...'
            , null, 0xFFFF00, 'bold', 2);

            setTimeout(function() {
                try { unlockTeamChanges(); } catch(e) {}
                gameState.chatBlocked = false;
                try { room.pauseGame(false); } catch(e){}
                runTournament(room);
            }, config.firstExplanationMs);
        }, 1500);
    } else {
        runTournament(room);
    }
        // Nota: este mapa tiene curvas y el control del balón puede ser inestable, juega con cuidado.
}

// Ejecuta las rondas hasta quedar 1v1 y enviar ganador a Lucky
function runTournament(room) {
    (async function loop() {
        while (!gameState.stopRequested) {
            // si quedan solo 1 o 0 jugadores, finalizar
            if (gameState.players.length <= 1) {
                var lone = gameState.players[0];
                if (lone && gameState.callback) {
                    var p = room.getPlayerList().find(x => x.id === lone);
                    gameState.callback({ id: p.id, name: p.name });
                }
                stop(room);
                return;
            }

            // Si queda 2 jugadores, jugar final 1v1
                    // Si hay 3 jugadores exactos: mover uno aleatorio a espectador y seguir al 1v1
                    if (gameState.players.length === 3) {
                        var rnd = Math.floor(Math.random() * gameState.players.length);
                        var moved = gameState.players.splice(rnd,1)[0];
                        gameState.spectatorPool.push(moved);
                        try { room.setPlayerTeam(moved, 0); } catch(e){}
                        room.sendAnnouncement('ℹ️ Se movió a espectador a un jugador para equilibrar (3 jugadores).', null, 0xFFFF00);
                    }
            if (gameState.players.length === 2) {
                var ids = gameState.players.slice();
                // Asignar equipos 1 vs 2
                try { room.setPlayerTeam(ids[0], 1); room.setPlayerTeam(ids[1], 2); } catch(e){}
                var result = await playMatch(room, ids, config.goalsToWin, config.matchTimeMs);
                if (result && result.winners && result.winners.length > 0) {
                    var winnerId = result.winners[0];
                    var p = room.getPlayerList().find(x => x.id === winnerId);
                    if (p) {
                        room.sendAnnouncement('\n🏆 ¡' + p.name.toUpperCase() + ' HA GANADO EL 1v1! 🏆', null, 0xFFD700, 'bold', 2);
                        setTimeout(function() {
                            if (gameState.callback) gameState.callback({ id: p.id, name: p.name });
                        }, 2000);
                    }
                }
                stop(room);
                return;
            }

            // Juego normal: jugar con equipos actuales
            var matchPlayers = gameState.players.slice();
            var result = await playMatch(room, matchPlayers, config.goalsToWin, config.matchTimeMs);
            if (!result) {
                // empate o fallo, terminar torneo
                stop(room);
                return;
            }

            // result: { team: 1|2, winners: [ids], losers: [ids] }
            // detener el juego momentáneamente y mover perdedores a espectador
            try { room.stopGame(); } catch(e){}
            for (var id of result.losers) {
                try { room.setPlayerTeam(id, 0); } catch(e){}
                // quitar de players y añadir a spectatorPool
                var idx = gameState.players.indexOf(id); if (idx !== -1) gameState.players.splice(idx,1);
                gameState.spectatorPool.push(id);
            }

            // Si ganadores >1, repartir mitad al otro equipo para la siguiente ronda
            var winners = result.winners.slice();
            if (winners.length > 1) {
                // Si impar y hay espectador, traer uno aleatorio para balancear
                if ((winners.length % 2) === 1 && gameState.spectatorPool.length > 0) {
                    var rndIdx = Math.floor(Math.random() * gameState.spectatorPool.length);
                    var picked = gameState.spectatorPool.splice(rndIdx,1)[0];
                    gameState.players.push(picked);
                    try { room.setPlayerTeam(picked, 1); } catch(e){}
                    winners.push(picked);
                }

                // dividir winners en dos mitades para la siguiente ronda
                var half = Math.floor(winners.length/2);
                // reasignar equipos según las mitades
                for (var i=0;i<winners.length;i++) {
                    var id = winners[i];
                    try { room.setPlayerTeam(id, i < half ? 1 : 2); } catch(e){}
                }
                // mantener gameState.players como los winners
                gameState.players = winners.slice();
            } else if (winners.length === 1) {
                // único ganador => final, enviar a Lucky
                var p = room.getPlayerList().find(x => x.id === winners[0]);
                if (p && gameState.callback) gameState.callback({ id: p.id, name: p.name });
                stop(room);
                return;
            } else {
                stop(room); return;
            }

            gameState.firstRound = false;
            // pequeña pausa antes de la siguiente ronda
            await new Promise(r => setTimeout(r, 2000));
        }
    })();
}

// Juega un partido con los jugadores indicados; devuelve ganadores/losers
function playMatch(room, playerIds, goalsToWin, timeMs) {
    return new Promise(function(resolve) {
        var scores = { 1:0, 2:0 };
        var stopped = false;
        var sdTo = null; // sudden-death timeout
        room.startGame();

        // Establecer equipos según posición en lista (mitad)
        var half = Math.floor(playerIds.length/2);
        for (var i=0;i<playerIds.length;i++) {
            try { room.setPlayerTeam(playerIds[i], i < half ? 1 : 2); } catch(e){}
        }

        // Handler de gol
        var prevOnGoal = room.onTeamGoal;
        room.onTeamGoal = function(team) {
            if (stopped) return;
            if (team === 1 || team === 2) {
                scores[team]++;
                room.sendAnnouncement('⚽ Gol del equipo ' + (team===1?'🔴':'🔵') + ' — ' + scores[1] + ' : ' + scores[2], null, 0x00FF00);
                if (scores[team] >= goalsToWin) {
                    stopped = true;
                    cleanupAndResolve(team);
                }
            }
        };

        // timeout
        var to = setTimeout(function() {
            if (stopped) return;
            stopped = true;
            // Si nadie anotó, considerar que no hubo resultado
            if (scores[1] === 0 && scores[2] === 0) {
                room.sendAnnouncement('\n⚠️ No hubo goles en el partido. Empate sin resultado.', null, 0xFF6600);
                cleanupAndResolve(null);
                return;
            }

            // Si está empate con goles, entrar a tiempo extra: siguiente gol gana (30s)
            if (scores[1] === scores[2]) {
                room.sendAnnouncement('\n⚡ Empate. Tiempo extra: SIGUIENTE GOL GANA (30s)...', null, 0xFFFF00);
                // instalar handler que resuelve al primer gol
                var suddenMs = 30000;
                // sobrescribir onTeamGoal temporalmente
                room.onTeamGoal = function(team) {
                    if (stopped) return;
                    stopped = true;
                    if (sdTo) { clearTimeout(sdTo); sdTo = null; }
                    cleanupAndResolve(team);
                };
                sdTo = setTimeout(function() {
                    if (stopped) return;
                    stopped = true;
                    // si no hay gol en tiempo extra, elegir ganador aleatoriamente
                    var winnerTeam = (Math.random() < 0.5) ? 1 : 2;
                    cleanupAndResolve(winnerTeam);
                }, suddenMs);
                return;
            }

            // decidir por mayor score (si empate lógica anterior no llega aquí)
            var winnerTeam = (scores[1] > scores[2] ? 1 : 2);
            cleanupAndResolve(winnerTeam);
        }, timeMs);

        function cleanupAndResolve(team) {
            clearTimeout(to);
            if (sdTo) { clearTimeout(sdTo); sdTo = null; }
            // restaurar handler
            try { room.onTeamGoal = prevOnGoal; } catch(e){}

            // recopilar ids de ganadores/losers
            if (team === null) {
                // No hay ganador (por ejemplo, no se anotaron goles)
                resolve(null);
                return;
            }

            var winners = [];
            var losers = [];
            var half = Math.floor(playerIds.length/2);
            for (var i=0;i<playerIds.length;i++) {
                var id = playerIds[i];
                var teamOf = (i < half) ? 1 : 2;
                if (teamOf === team) winners.push(id); else losers.push(id);
            }

            room.sendAnnouncement('\n🏁 Ronda finalizada. Ganó el equipo ' + (team===1?'🔴':'🔵') + ' (' + scores[1] + ' : ' + scores[2] + ')', null, 0xFFD700);
            resolve({ team: team, winners: winners, losers: losers });
        }
    });
}

function stop(room) {
    gameState.active = false;
    gameState.stopRequested = true;
    gameState.players = [];
    gameState.spectatorPool = [];
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    var idx = gameState.players.indexOf(player.id);
    if (idx !== -1) gameState.players.splice(idx,1);
}

function onPlayerChat(room, player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

// Helpers
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(p => p.id !== 0);
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
    }
    var half = Math.floor(players.length / 2);
    for (var i = 0; i < players.length; i++) {
        try { room.setPlayerTeam(players[i].id, i < half ? 1 : 2); } catch(e){}
    }
}

return {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: function(jsonString) { mapData = jsonString; }
};

})();

// ============================================
// MÓDULO: NUMBER CHAIRS
// ============================================
var NUMBERCHAIRS = (function() {
// ============================================
// MINIJUEGO: NUMBER CHAIRS - Entra al número 1 (círculo) y mantente 3s
// ============================================

var mapData = "{\"name\":\"NumberChairs v2 by Şerefli Şeref [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ]\",\"width\":1050,\"height\":1050,\"bg\":{\"color\":\"0\"},\"vertexes\":[{\"x\":-12.199999999999989,\"y\":157,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"c0\"]},{\"x\":20.19999999999999,\"y\":157,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"c0\"]},{\"x\":-6,\"y\":141,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":16,\"y\":141,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":23,\"y\":132,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":5,\"y\":124,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-13,\"y\":132,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":10,\"y\":138,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":1,\"y\":138,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":6,\"y\":139,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":1,\"y\":142,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":10,\"y\":141,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"]},{\"x\":-16,\"y\":-114,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":-16,\"y\":176,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":22,\"y\":-190,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":24,\"y\":176,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":-96,\"y\":176,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":-96,\"y\":203.09756097560975,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":104,\"y\":203.09756097560975,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":104,\"y\":176,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":-83,\"y\":-110,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":-81,\"y\":-69,\"bCoef\":0.1,\"cMask\":[\"c0\"]},{\"x\":-83,\"y\":-110,\"bCoef\":0.1,\"cMask\":[\"c0\"]},{\"x\":-310,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"c0\"]},{\"x\":-340,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"c0\"]},{\"x\":310,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"c0\"]},{\"x\":340,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"c0\"]},{\"x\":-310,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":310,\"y\":0,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]}],\"segments\":[{\"v0\":0,\"v1\":1,\"bias\":-1,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"red\",\"blue\"],\"color\":\"FFD500\"},{\"v0\":1,\"v1\":0,\"bias\":-1,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"red\",\"blue\"],\"color\":\"FFD500\"},{\"v0\":2,\"v1\":3,\"curve\":110.35102168608641,\"curveF\":0.6956521739130435,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"FFD500\"},{\"v0\":3,\"v1\":4,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"FFD500\"},{\"v0\":6,\"v1\":2,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"FFD500\"},{\"v0\":6,\"v1\":3,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"FFD500\"},{\"v0\":4,\"v1\":2,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"FFD500\"},{\"v0\":2,\"v1\":5,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"FFD500\"},{\"v0\":5,\"v1\":3,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"FFD500\"},{\"v0\":6,\"v1\":7,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"FFD500\"},{\"v0\":4,\"v1\":8,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"FFD500\"},{\"v0\":8,\"v1\":5,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"FFD500\"},{\"v0\":7,\"v1\":5,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"FFD500\"},{\"v0\":5,\"v1\":9,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"FFD500\"},{\"v0\":6,\"v1\":10,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"FFD500\"},{\"v0\":4,\"v1\":11,\"cMask\":[\"wall\"],\"cGroup\":[\"all\"],\"color\":\"FFD500\"},{\"v0\":12,\"v1\":13,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":14,\"v1\":15,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":15,\"v1\":16,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":16,\"v1\":17,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":17,\"v1\":18,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":18,\"v1\":19,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":19,\"v1\":15,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":14,\"v1\":20,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":12,\"v1\":21,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":21,\"v1\":22,\"bCoef\":0.1,\"cMask\":[\"c0\"],\"color\":\"7FDD2C\"},{\"v0\":25,\"v1\":23,\"bias\":100,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"FFFFFF\"},{\"v0\":26,\"v1\":24,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"FFFFFF\"},{\"v0\":24,\"v1\":26,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"FFFFFF\"},{\"v0\":27,\"v1\":28,\"bias\":100,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\",\"wall\"],\"cGroup\":[\"redKO\",\"blueKO\"],\"color\":\"FFFFFF\"}],\"planes\":[{\"normal\":[0,-1],\"dist\":-146,\"bCoef\":0,\"cMask\":[\"c0\"],\"cGroup\":[\"kick\"]},{\"normal\":[0,-1],\"dist\":-176,\"bCoef\":1e-7,\"cMask\":[\"score\"],\"cGroup\":[\"blueKO\"]},{\"normal\":[0,1],\"dist\":106,\"bCoef\":10000000,\"cMask\":[\"score\"],\"cGroup\":[\"blueKO\"]},{\"normal\":[1,0],\"dist\":-1000,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[-1,0],\"dist\":-1000,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,1],\"dist\":-1000,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,-1],\"dist\":-1000,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,1],\"dist\":-343,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0,-1],\"dist\":-343,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[1,0],\"dist\":-343,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-1,0],\"dist\":-343,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0.7071067811865476,0.7071067811865476],\"dist\":-343,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-0.7071067811865476,0.7071067811865476],\"dist\":-343,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-0.7071067811865476,-0.7071067811865476],\"dist\":-343,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0.7071067811865476,-0.7071067811865476],\"dist\":-343,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0.3826834323650898,0.9238795325112867],\"dist\":-343,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-0.3826834323650898,0.9238795325112867],\"dist\":-343,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-0.3826834323650898,-0.9238795325112867],\"dist\":-343,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0.3826834323650898,-0.9238795325112867],\"dist\":-343,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0.9238795325112867,0.3826834323650898],\"dist\":-343,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-0.9238795325112867,0.3826834323650898],\"dist\":-343,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-0.9238795325112867,-0.3826834323650898],\"dist\":-343,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0.9238795325112867,-0.3826834323650898],\"dist\":-343,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]}],\"goals\":[],\"discs\":[{\"radius\":0,\"bCoef\":9,\"invMass\":1e-40,\"damping\":0,\"color\":\"18141C\",\"cMask\":[\"ball\"],\"cGroup\":[\"ball\",\"kick\",\"score\"]},{\"pos\":[495,-430],\"radius\":0,\"bCoef\":0,\"invMass\":0,\"damping\":0,\"color\":\"0\",\"cMask\":[\"ball\"],\"cGroup\":[\"blue\"]},{\"pos\":[295,-430],\"radius\":0,\"bCoef\":0,\"invMass\":0,\"damping\":0,\"color\":\"0\",\"cMask\":[\"ball\"],\"cGroup\":[\"blue\"]},{\"pos\":[-487,146],\"speed\":[0,-1],\"bCoef\":1,\"damping\":1,\"color\":\"DBD52A\",\"cMask\":[\"blueKO\"],\"cGroup\":[\"score\"]},{\"pos\":[-496,133],\"speed\":[0,-1],\"bCoef\":1,\"damping\":1,\"color\":\"DB8727\",\"cMask\":[\"blueKO\"],\"cGroup\":[\"score\"]},{\"pos\":[-507,159],\"speed\":[0,-1],\"bCoef\":1,\"damping\":1,\"color\":\"EBAB4D\",\"cMask\":[\"blueKO\"],\"cGroup\":[\"score\"]},{\"pos\":[-504,143],\"speed\":[0,-1],\"bCoef\":1,\"damping\":1,\"color\":\"DBD52A\",\"cMask\":[\"blueKO\"],\"cGroup\":[\"score\"]},{\"pos\":[-492,143],\"speed\":[0,-1],\"bCoef\":1,\"damping\":1,\"color\":\"C44221\",\"cMask\":[\"blueKO\"],\"cGroup\":[\"score\"]},{\"pos\":[-497,156],\"speed\":[0,-1],\"bCoef\":1,\"damping\":1,\"color\":\"DB8727\",\"cMask\":[\"blueKO\"],\"cGroup\":[\"score\"]},{\"pos\":[-489,163],\"speed\":[0,-1],\"bCoef\":1,\"damping\":1,\"color\":\"DBD142\",\"cMask\":[\"blueKO\"],\"cGroup\":[\"score\"]},{\"pos\":[557,146],\"speed\":[0,-1],\"bCoef\":1,\"damping\":1,\"color\":\"DBD52A\",\"cMask\":[\"blueKO\"],\"cGroup\":[\"score\"]},{\"pos\":[548,133],\"speed\":[0,-1],\"bCoef\":1,\"damping\":1,\"color\":\"DB8727\",\"cMask\":[\"blueKO\"],\"cGroup\":[\"score\"]},{\"pos\":[537,159],\"speed\":[0,-1],\"bCoef\":1,\"damping\":1,\"color\":\"EBAB4D\",\"cMask\":[\"blueKO\"],\"cGroup\":[\"score\"]},{\"pos\":[540,143],\"speed\":[0,-1],\"bCoef\":1,\"damping\":1,\"color\":\"DBD52A\",\"cMask\":[\"blueKO\"],\"cGroup\":[\"score\"]},{\"pos\":[552,143],\"speed\":[0,-1],\"bCoef\":1,\"damping\":1,\"color\":\"C44221\",\"cMask\":[\"blueKO\"],\"cGroup\":[\"score\"]},{\"pos\":[547,156],\"speed\":[0,-1],\"bCoef\":1,\"damping\":1,\"color\":\"DB8727\",\"cMask\":[\"blueKO\"],\"cGroup\":[\"score\"]},{\"pos\":[555,163],\"speed\":[0,-1],\"bCoef\":1,\"damping\":1,\"color\":\"DBD142\",\"cMask\":[\"blueKO\"],\"cGroup\":[\"score\"]},{\"pos\":[-499,139],\"radius\":100,\"invMass\":0,\"damping\":1,\"color\":\"0\",\"cGroup\":[\"c0\"]},{\"pos\":[548,139],\"radius\":100,\"invMass\":0,\"damping\":1,\"color\":\"0\",\"cGroup\":[\"c0\"]},{\"pos\":[2,164],\"radius\":0,\"bCoef\":-1e+89,\"invMass\":1e+137,\"damping\":1e+250,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[24,-244],\"speed\":[0,0.2],\"radius\":0.5,\"bCoef\":5,\"damping\":1,\"color\":\"transparent\",\"cMask\":[\"ball\"],\"cGroup\":[\"ball\"]},{\"pos\":[5,121],\"radius\":4,\"color\":\"FFD500\",\"cMask\":[\"wall\"]},{\"pos\":[25,131],\"radius\":3,\"color\":\"FFD500\",\"cMask\":[\"wall\"]},{\"pos\":[-15,131],\"radius\":3,\"color\":\"FFD500\",\"cMask\":[\"wall\"]},{\"pos\":[0,324],\"speed\":[3.3,0],\"radius\":14.99,\"bCoef\":1,\"invMass\":1e-30,\"damping\":1.0016,\"color\":\"7FDD2C\",\"cMask\":[\"red\",\"blue\",\"redKO\",\"blueKO\"],\"cGroup\":[\"wall\"]},{\"pos\":[0,-250],\"speed\":[0,0.2],\"radius\":1,\"bCoef\":1,\"invMass\":1e-30,\"damping\":1,\"color\":\"transparent\",\"cMask\":[\"ball\"],\"cGroup\":[\"ball\"]}],\"playerPhysics\":{\"bCoef\":0.1,\"damping\":0.9995,\"acceleration\":0.025,\"kickingAcceleration\":0.025,\"kickingDamping\":0.9995,\"kickStrength\":0},\"ballPhysics\":\"disc0\",\"spawnDistance\":320,\"joints\":[{\"d0\":17,\"d1\":19,\"length\":501.6233646870927,\"color\":\"transparent\"},{\"d0\":18,\"d1\":19,\"length\":546.5720446565118,\"color\":\"transparent\"}]}";

var gameState = {
    active: false,
    players: [],
    timers: {},
    chatBlocked: false,
    checkInterval: null,
    callback: null
};

var config = {
    explanationMs: 5000,
    requiredMs: 3000,
    checkIntervalMs: 100,
    // Circle derived from semicircles A(-12.19,157) B(20.19,157)
    circleCenter: { x: 4.0, y: 157.0 },
    circleRadius: 16.19,
    tolerance: 6
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[NUMBERCHAIRS] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;

    // Obtener jugadores y asignar equipos ANTES de cargar mapa
    var players = room.getPlayerList().filter(p => p.id !== 0);
    if (players.length < 1) { room.sendAnnouncement('⚠️ No hay jugadores para NUMBER CHAIRS', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }
    try { shuffleTeams(room); } catch(e){ }

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[NUMBERCHAIRS] Error cargando mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = players.map(p => ({ id: p.id, name: p.name }));
    gameState.timers = {};

    // Explanation phase: block chat for a few seconds, then start the game and begin checks
    gameState.chatBlocked = true;
    room.sendAnnouncement('\n🔢 NUMBER CHAIRS - Entra en el número 1 y quédate 3s\n', null, 0x00BFFF, 'bold', 2);
    room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
        '🔵 Debes entrar y mantenerte dentro del círculo del número 1 durante 3s para ganar.\n' +
        '⏳ Explicación: 5s (chat bloqueado).\n'
    , null, 0xFFFF00, 'bold', 2);

    setTimeout(function(){
        gameState.chatBlocked = false;
        try { room.startGame(); } catch(e){}
        // Ensure previous interval cleared
        if (gameState.checkInterval) clearInterval(gameState.checkInterval);
        gameState.checkInterval = setInterval(() => checkPlayers(room), config.checkIntervalMs);
    }, config.explanationMs);
}

function checkPlayers(room) {
    if (!gameState.active) return;
    var playersList = room.getPlayerList().filter(p=>p.id!==0);
    for (var p of playersList) {
        var ps = gameState.players.find(x=>x.id===p.id);
        if (!ps) continue;
        var pos = p.position;
        if (!pos) continue;
        var dx = pos.x - config.circleCenter.x;
        var dy = pos.y - config.circleCenter.y;
        var dist2 = dx*dx + dy*dy;
        var inCircle = dist2 <= Math.pow(config.circleRadius + config.tolerance,2);
        if (inCircle) {
            gameState.timers[p.id] = (gameState.timers[p.id]||0) + config.checkIntervalMs;
            if (gameState.timers[p.id] >= config.requiredMs) {
                declareWinner(room, { id: p.id, name: p.name });
                return;
            }
        } else {
            gameState.timers[p.id] = 0;
        }
    }
}

function declareWinner(room, winner) {
    if (!gameState.active) return;
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    room.sendAnnouncement('\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO NUMBER CHAIRS! 🏆', null, 0xFFD700, 'bold', 2);
    setTimeout(function(){
        if (gameState.callback) gameState.callback({ id: winner.id, name: winner.name });
        stop(room);
    }, 2000);
}

function stop(room){
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.players = [];
    gameState.timers = {};
    gameState.chatBlocked = false;
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player){
    var idx = gameState.players.findIndex(x=>x.id===player.id);
    if (idx!==-1) gameState.players.splice(idx,1);
}

function onPlayerChat(room, player, message){
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive(){ return gameState.active; }

function shuffleTeams(room) {
    var players = room.getPlayerList().filter(p => p.id !== 0);
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
    }
    var half = Math.floor(players.length / 2);
    for (var i = 0; i < players.length; i++) {
        try { room.setPlayerTeam(players[i].id, i < half ? 1 : 2); } catch(e){}
    }
}

return {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: function(jsonString){ mapData = jsonString; }
};

})();

// ============================================
// MÓDULO: SURVIVAL SQUARE
// ============================================
var SURVIVAL_SQ = (function() {
// ============================================
// MINIJUEGO: SURVIVAL SQUARE - Empuja la pelota roja del centro y evita salir del cuadro
// ============================================

var mapData = "{\"name\":\"Survival Square Deluxe by /R [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ]\",\"width\":420,\"height\":334,\"bg\":{\"width\":300,\"height\":300,\"kickOffRadius\":295,\"cornerRadius\":300,\"color\":\"444749\",\"goalLine\":-1},\"vertexes\":[{\"x\":-23.5,\"y\":43,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":-5.5,\"y\":-5,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":25.5,\"y\":-5,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":-3,\"y\":-30,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":31.5,\"y\":-30,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":31.5,\"y\":14,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":10,\"y\":12,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":10,\"y\":18,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":22,\"y\":43,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":31.5,\"y\":18,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":45.5,\"y\":43,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":26,\"y\":-7,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":-8,\"y\":-7,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":-25.5,\"y\":43,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":-3,\"y\":-28,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":31.5,\"y\":-28,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":29.5,\"y\":12,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":29.5,\"y\":18,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":43.5,\"y\":43,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":8,\"y\":12,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":8,\"y\":18,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":20,\"y\":43,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":-63,\"y\":43,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":-10,\"y\":-43,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":-61,\"y\":43,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":-8,\"y\":-43,\"cMask\":[\"wall\"],\"cGroup\":[]},{\"x\":-295,\"y\":-295,\"cMask\":[],\"cGroup\":[]},{\"x\":-295,\"y\":295,\"cMask\":[],\"cGroup\":[]},{\"x\":295,\"y\":295,\"cMask\":[],\"cGroup\":[]},{\"x\":295,\"y\":-295,\"cMask\":[],\"cGroup\":[]},{\"x\":-295,\"y\":-295,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"]},{\"x\":295,\"y\":-295,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"]},{\"x\":295,\"y\":295,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"]},{\"x\":-295,\"y\":295,\"bCoef\":-100000,\"cMask\":[\"red\",\"blue\"]},{\"x\":-302,\"y\":-302,\"cMask\":[],\"cGroup\":[]},{\"x\":-302,\"y\":302,\"cMask\":[],\"cGroup\":[]},{\"x\":302,\"y\":302,\"cMask\":[],\"cGroup\":[]},{\"x\":302,\"y\":-302,\"cMask\":[],\"cGroup\":[]},{\"x\":-300,\"y\":-300,\"bCoef\":0.125},{\"x\":-300,\"y\":300,\"bCoef\":0.125},{\"x\":300,\"y\":300,\"bCoef\":0.125},{\"x\":300,\"y\":-300,\"bCoef\":0.125}],\"segments\":[{\"v0\":0,\"v1\":1,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":1,\"v1\":2,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":3,\"v1\":4,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":4,\"v1\":5,\"curve\":173.7557390757686,\"curveF\":0.05454545454545445,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":6,\"v1\":7,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":7,\"v1\":8,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":5,\"v1\":9,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":9,\"v1\":10,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":11,\"v1\":2,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":11,\"v1\":12,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":12,\"v1\":13,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":14,\"v1\":15,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":15,\"v1\":16,\"curve\":175.8889487825513,\"curveF\":0.03589108910891094,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":16,\"v1\":17,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":17,\"v1\":18,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":19,\"v1\":20,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":20,\"v1\":21,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":22,\"v1\":23,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":24,\"v1\":25,\"cMask\":[\"wall\"],\"cGroup\":[],\"color\":\"8B8B8B\"},{\"v0\":26,\"v1\":27,\"cMask\":[],\"cGroup\":[],\"color\":\"E3D500\"},{\"v0\":27,\"v1\":28,\"cMask\":[],\"cGroup\":[],\"color\":\"E3D500\"},{\"v0\":28,\"v1\":29,\"cMask\":[],\"cGroup\":[],\"color\":\"E3D500\"},{\"v0\":29,\"v1\":26,\"cMask\":[],\"cGroup\":[],\"color\":\"E3D500\"},{\"v0\":30,\"v1\":31,\"bCoef\":-100000,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":31,\"v1\":32,\"bCoef\":-100000,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":32,\"v1\":33,\"bCoef\":-100000,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":33,\"v1\":30,\"bCoef\":-100000,\"vis\":false,\"cMask\":[\"red\",\"blue\"]},{\"v0\":34,\"v1\":35,\"cMask\":[],\"cGroup\":[]},{\"v0\":35,\"v1\":36,\"cMask\":[],\"cGroup\":[]},{\"v0\":36,\"v1\":37,\"cMask\":[],\"cGroup\":[]},{\"v0\":37,\"v1\":34,\"cMask\":[],\"cGroup\":[]},{\"v0\":38,\"v1\":39,\"bCoef\":0.125},{\"v0\":39,\"v1\":40,\"bCoef\":0.125},{\"v0\":40,\"v1\":41,\"bCoef\":0.125},{\"v0\":41,\"v1\":38,\"bCoef\":0.125}],\"planes\":[{\"normal\":[-0.9998838319648692,-0.015242131584830322],\"dist\":-403.1208477292754,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"red\",\"blue\"]},{\"normal\":[1,0],\"dist\":-393,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"red\",\"blue\"]},{\"normal\":[0,-1],\"dist\":-380,\"bCoef\":0,\"cGroup\":[\"ball\"]},{\"normal\":[0,1],\"dist\":-380,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"red\",\"blue\"]}],\"goals\":[],\"discs\":[{\"radius\":30,\"bCoef\":5,\"invMass\":0.001,\"damping\":1.007,\"color\":\"990000\",\"cGroup\":[\"wall\"]},{\"pos\":[-300,0],\"radius\":24.5,\"bCoef\":0.2,\"invMass\":0,\"color\":\"FFF1E1\"},{\"pos\":[0,-300],\"radius\":24.5,\"bCoef\":0.2,\"invMass\":0,\"color\":\"FFF1E1\"},{\"pos\":[0,300],\"radius\":24.5,\"bCoef\":0.2,\"invMass\":0,\"color\":\"FFF1E1\"},{\"pos\":[300,0],\"radius\":24.5,\"bCoef\":0.2,\"invMass\":0,\"color\":\"FFF1E1\"},{\"pos\":[300,-300],\"radius\":24.5,\"bCoef\":0.14,\"invMass\":0,\"color\":\"E1FFFF\"},{\"pos\":[-300,300],\"radius\":24.5,\"bCoef\":0.14,\"invMass\":0,\"color\":\"E1FFFF\"},{\"pos\":[-300,-300],\"radius\":24.5,\"bCoef\":0.14,\"invMass\":0,\"color\":\"E1FFFF\"},{\"pos\":[300,300],\"radius\":24.5,\"bCoef\":0.14,\"invMass\":0,\"color\":\"E1FFFF\"},{\"pos\":[300,200],\"radius\":15,\"bCoef\":0.2,\"invMass\":0,\"color\":\"FAE1FF\"},{\"pos\":[200,300],\"radius\":15,\"bCoef\":0.14,\"invMass\":0,\"color\":\"FAE1FF\"},{\"pos\":[-200,300],\"radius\":15,\"bCoef\":0.14,\"invMass\":0,\"color\":\"FAE1FF\"},{\"pos\":[300,-200],\"radius\":15,\"bCoef\":0.2,\"invMass\":0,\"color\":\"FAE1FF\"},{\"pos\":[-300,200],\"radius\":15,\"bCoef\":0.14,\"invMass\":0,\"color\":\"FAE1FF\"},{\"pos\":[-300,-200],\"radius\":15,\"bCoef\":0.14,\"invMass\":0,\"color\":\"FAE1FF\"},{\"pos\":[-200,-300],\"radius\":15,\"bCoef\":0.14,\"invMass\":0,\"color\":\"FAE1FF\"},{\"pos\":[200,-300],\"radius\":15,\"bCoef\":0.14,\"invMass\":0,\"color\":\"FAE1FF\"},{\"pos\":[-300,-100],\"radius\":15,\"bCoef\":0.14,\"invMass\":0,\"color\":\"FAE1FF\"},{\"pos\":[-100,-300],\"radius\":15,\"bCoef\":0.14,\"invMass\":0,\"color\":\"FAE1FF\"},{\"pos\":[100,-300],\"radius\":15,\"bCoef\":0.14,\"invMass\":0,\"color\":\"FAE1FF\"},{\"pos\":[300,-100],\"radius\":15,\"bCoef\":0.2,\"invMass\":0,\"color\":\"FAE1FF\"},{\"pos\":[300,100],\"radius\":15,\"bCoef\":0.2,\"invMass\":0,\"color\":\"FAE1FF\"},{\"pos\":[-300,100],\"radius\":15,\"bCoef\":0.2,\"invMass\":0,\"color\":\"FAE1FF\"},{\"pos\":[100,300],\"radius\":15,\"bCoef\":0.14,\"invMass\":0,\"color\":\"FAE1FF\"},{\"pos\":[-100,300],\"radius\":15,\"bCoef\":0.14,\"invMass\":0,\"color\":\"FAE1FF\"}],\"playerPhysics\":{\"kickingAcceleration\":0.16,\"radius\":12},\"ballPhysics\":\"disc0\",\"spawnDistance\":20}";

var gameState = {
    active: false,
    players: [], // {id, name}
    eliminated: [],
    checkInterval: null,
    chatBlocked: false,
    callback: null
};

var config = {
    // Rectángulo A(-302,-302) a C(302,302)
    minX: -302,
    maxX: 302,
    minY: -302,
    maxY: 302,
    explanationMs: 5000,
    checkIntervalMs: 100
};

function start(room, onGameEnd) {
    if (!mapData) { console.error('[SURVIVAL_SQ] mapData no inyectado.'); if (onGameEnd) onGameEnd(null); return; }
    gameState.callback = onGameEnd || null;
    gameState.eliminated = [];

    // Obtener jugadores y asignar equipos ANTES de cargar el mapa
    var players = room.getPlayerList().filter(p => p.id !== 0);
    if (players.length < 2) { room.sendAnnouncement('⚠️ No hay suficientes jugadores para SURVIVAL SQUARE', null, 0xFF6600); if (onGameEnd) onGameEnd(null); return; }

    try { shuffleTeams(room); } catch(e) { console.error('[SURVIVAL_SQ] shuffle error', e.message); }

    try { room.setCustomStadium(mapData); } catch(e) { console.error('[SURVIVAL_SQ] Error cargando mapa', e.message); if (onGameEnd) onGameEnd(null); return; }

    gameState.active = true;
    gameState.players = players.map(p => ({ id: p.id, name: p.name }));

    // Anuncio y explicación (pausar mapa y bloquear chat durante explicación)
    room.sendAnnouncement('🧱 SURVIVAL SQUARE - Empuja la pelota roja y evita salir del cuadro', null, 0x00BFFF, 'bold', 2);
    gameState.chatBlocked = true;
    try { room.startGame(); } catch(e){}
    try { room.pauseGame(true); } catch(e){}

    room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
        '🟥 Mantente dentro del cuadrado central para no ser eliminado.\n' +
        '🔴 Hay una pelota en el centro que empujan los jugadores.\n' +
        '⏱️ El último jugador dentro del cuadrado gana y va a Lucky.\n' +
        '⏳ Comienza en 5s...'
    , null, 0xFFFF00, 'bold', 2);

    setTimeout(function() {
        gameState.chatBlocked = false;
        try { room.pauseGame(false); } catch(e){}
        // Comenzar verificación periódica
        if (gameState.checkInterval) clearInterval(gameState.checkInterval);
        gameState.checkInterval = setInterval(function() { checkPlayers(room); }, config.checkIntervalMs);
    }, config.explanationMs);
}

function checkPlayers(room) {
    if (!gameState.active) return;

    var alive = [];
    for (var pInfo of gameState.players) {
        if (gameState.eliminated.indexOf(pInfo.id) !== -1) continue;
        var p = room.getPlayer(pInfo.id);
        if (!p) { gameState.eliminated.push(pInfo.id); continue; }
        var pos = p.position;
        if (!pos) continue;

        if (pos.x < config.minX || pos.x > config.maxX || pos.y < config.minY || pos.y > config.maxY) {
            // Eliminado
            gameState.eliminated.push(pInfo.id);
            try { room.setPlayerTeam(pInfo.id, 0); } catch(e){}
            room.sendAnnouncement('❌ ' + pInfo.name + ' salió del cuadro y fue eliminado', null, 0xFF6600);
        } else {
            alive.push(pInfo);
        }
    }

    if (alive.length === 1) {
        var winner = alive[0];
        declareWinner(room, winner);
    } else if (alive.length === 0) {
        // nadie -> no winner
        room.sendAnnouncement('❌ No hay ganador - todos fuera del cuadro', null, 0xFF0000);
        stop(room);
        if (gameState.callback) gameState.callback(null);
    }
}

function declareWinner(room, winner) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    room.sendAnnouncement('\n🏆 ¡' + winner.name.toUpperCase() + ' HA GANADO SURVIVAL SQUARE! 🏆', null, 0xFFD700, 'bold', 2);
    setTimeout(function() {
        if (gameState.callback) gameState.callback({ id: winner.id, name: winner.name });
        stop(room);
    }, 2000);
}

function stop(room) {
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.players = [];
    gameState.eliminated = [];
    gameState.chatBlocked = false;
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    if (gameState.active && gameState.eliminated.indexOf(player.id) === -1) {
        gameState.eliminated.push(player.id);
    }
}

function onPlayerChat(room, player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

return {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: function(jsonString) { mapData = jsonString; }
};

// Helper: shuffle teams similar a otros minijuegos
function shuffleTeams(room) {
    var players = room.getPlayerList().filter(p => p.id !== 0);
    for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = players[i]; players[i] = players[j]; players[j] = tmp;
    }
    var half = Math.floor(players.length / 2);
    for (var i = 0; i < players.length; i++) {
        try { room.setPlayerTeam(players[i].id, i < half ? 1 : 2); } catch(e){}
    }
}

})();

// ============================================
// MÓDULO: COLLISION TEAM RACING
// ============================================
var COLLISION_TEAM_RACING = (function() {
// ============================================
// MINIJUEGO: COLLISION TEAM RACING
// Carrera por equipos — el primero que cruce ambas líneas gana
// ============================================

// mapData será inyectado desde bot.js como string JSON
var mapData = "{\"name\":\"Collision team racing 9 by MC  from HaxMaps\",\"width\":420,\"height\":4920,\"bg\":{\"type\":\"hockey\"},\"vertexes\":[{\"x\":-120,\"y\":255,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-150,\"y\":220,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-150,\"y\":-250,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":150,\"y\":-250,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":150,\"y\":220,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":120,\"y\":255,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-15,\"y\":-4650,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":15,\"y\":-4650,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-15,\"y\":-4840.77786255,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":45,\"y\":-4900.77786255,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":400,\"y\":-4900.77786255,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":400,\"y\":-4870.77786255,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"x\":45,\"y\":-4870.77786255,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":15,\"y\":-4840.77786255,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":-148,\"y\":100,\"bCoef\":0.1,\"cMask\":[\"wall\"]},{\"x\":-1,\"y\":100,\"bCoef\":0.1,\"cMask\":[\"wall\"]},{\"x\":1,\"y\":100,\"bCoef\":0.1,\"cMask\":[\"wall\"]},{\"x\":148,\"y\":100,\"bCoef\":0.1,\"cMask\":[\"wall\"]},{\"x\":-15,\"y\":-4702.77786255,\"bCoef\":-3,\"cMask\":[\"red\",\"blue\"]},{\"x\":15,\"y\":-4702.77786255,\"bCoef\":-3,\"cMask\":[\"red\",\"blue\"]},{\"x\":-148,\"y\":97,\"bCoef\":0.1,\"cMask\":[\"wall\"]},{\"x\":-1,\"y\":97,\"bCoef\":0.1,\"cMask\":[\"wall\"]},{\"x\":-148,\"y\":103,\"bCoef\":0.1,\"cMask\":[\"wall\"]},{\"x\":-1,\"y\":103,\"bCoef\":0.1,\"cMask\":[\"wall\"]},{\"x\":1,\"y\":97,\"bCoef\":0.1,\"cMask\":[\"wall\"]},{\"x\":148,\"y\":97,\"bCoef\":0.1,\"cMask\":[\"wall\"]},{\"x\":1,\"y\":103,\"bCoef\":0.1,\"cMask\":[\"wall\"]},{\"x\":148,\"y\":103,\"bCoef\":0.1,\"cMask\":[\"wall\"]},{\"x\":-15,\"y\":-4690.77786255,\"bCoef\":0.1,\"cMask\":[\"ball\"]},{\"x\":-15,\"y\":-4740.77786255,\"bCoef\":0.1,\"cMask\":[\"ball\"]},{\"x\":15,\"y\":-4690.77786255,\"bCoef\":0.1,\"cMask\":[\"ball\"]},{\"x\":15,\"y\":-4740.77786255,\"bCoef\":0.1,\"cMask\":[\"ball\"]},{\"x\":150,\"y\":-4740.77786255,\"bCoef\":0,\"cMask\":[\"ball\"]},{\"x\":180,\"y\":-4740.77786255,\"bCoef\":0,\"cMask\":[\"ball\"]},{\"x\":180,\"y\":-4696.22218323,\"bCoef\":0,\"cMask\":[\"ball\"]},{\"x\":150,\"y\":-4696.22218323,\"bCoef\":0,\"cMask\":[\"ball\"]},{\"x\":-15,\"y\":-4710.77786255,\"cMask\":[\"red\",\"blue\"]},{\"x\":15,\"y\":-4710.77786255,\"cMask\":[\"red\",\"blue\"]},{\"x\":-26,\"y\":-4600.77786255,\"bCoef\":-3,\"cMask\":[\"red\",\"blue\"]},{\"x\":26,\"y\":-4600.77786255,\"bCoef\":-3,\"cMask\":[\"red\",\"blue\"]},{\"x\":-23,\"y\":-4608.77786255,\"cMask\":[\"red\",\"blue\"]},{\"x\":23,\"y\":-4608.77786255,\"cMask\":[\"red\",\"blue\"]},{\"x\":60,\"y\":-210,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":60,\"y\":-170,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-130,\"y\":-1850.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-20,\"y\":-1750.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":20,\"y\":-1750.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":130,\"y\":-1850.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":130,\"y\":-1890.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":20,\"y\":-1990.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-20,\"y\":-1990.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-130,\"y\":-1890.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-180,\"y\":-1784.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-70,\"y\":-1684.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-45,\"y\":-1630.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-45,\"y\":-1580,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":45,\"y\":-1630.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":45,\"y\":-1580,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":180,\"y\":-1784.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":70,\"y\":-1684.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-70,\"y\":-2048.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-180,\"y\":-1948.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":70,\"y\":-2048.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":180,\"y\":-1948.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-130,\"y\":-2261.44458008,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-20,\"y\":-2161.44458008,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":20,\"y\":-2161.44458008,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":130,\"y\":-2261.44458008,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":130,\"y\":-2301.44458008,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":20,\"y\":-2401.44458008,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-20,\"y\":-2401.44458008,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-130,\"y\":-2301.44458008,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-180,\"y\":-2195.44458008,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-70,\"y\":-2095.44458008,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":180,\"y\":-2195.44458008,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":70,\"y\":-2095.44458008,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-70,\"y\":-2459.44458008,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-180,\"y\":-2359.44458008,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":70,\"y\":-2459.44458008,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":180,\"y\":-2359.44458008,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-130,\"y\":-2690.00024414,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-20,\"y\":-2590.00024414,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":20,\"y\":-2590.00024414,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":130,\"y\":-2690.00024414,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":130,\"y\":-2730.00024414,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":20,\"y\":-2830.00024414,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-20,\"y\":-2830.00024414,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-130,\"y\":-2730.00024414,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-180,\"y\":-2624.00024414,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-70,\"y\":-2524.00024414,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":180,\"y\":-2624.00024414,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":70,\"y\":-2524.00024414,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-70,\"y\":-2888.00024414,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-180,\"y\":-2788.00024414,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":70,\"y\":-2888.00024414,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":180,\"y\":-2788.00024414,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-130,\"y\":-3101.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-20,\"y\":-3001.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":20,\"y\":-3001.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":130,\"y\":-3101.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":130,\"y\":-3141.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":20,\"y\":-3241.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-20,\"y\":-3241.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-130,\"y\":-3141.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-180,\"y\":-3035.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-70,\"y\":-2935.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":180,\"y\":-3035.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":70,\"y\":-2935.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-105,\"y\":-3268.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-180,\"y\":-3199.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":105,\"y\":-3268.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":180,\"y\":-3199.22241211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-75,\"y\":-3340,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":75,\"y\":-3340,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":78,\"y\":-3310.22241211,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":-78,\"y\":-3310.22241211,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":-200,\"y\":-1920.22241211,\"bCoef\":3.7,\"cMask\":[\"red\",\"blue\"]},{\"x\":-200,\"y\":-1810.22241211,\"bCoef\":3.7,\"cMask\":[\"red\",\"blue\"]},{\"x\":200,\"y\":-1920.22241211,\"bCoef\":3.7,\"cMask\":[\"red\",\"blue\"]},{\"x\":200,\"y\":-1810.22241211,\"bCoef\":3.7,\"cMask\":[\"red\",\"blue\"]},{\"x\":-200,\"y\":-2760.22241211,\"bCoef\":3.7,\"cMask\":[\"red\",\"blue\"]},{\"x\":-200,\"y\":-2650.22241211,\"bCoef\":3.7,\"cMask\":[\"red\",\"blue\"]},{\"x\":200,\"y\":-2760.22241211,\"bCoef\":3.7,\"cMask\":[\"red\",\"blue\"]},{\"x\":200,\"y\":-2650.22241211,\"bCoef\":3.7,\"cMask\":[\"red\",\"blue\"]},{\"x\":-60,\"y\":-210,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-60,\"y\":-170,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-130,\"y\":-270,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-100,\"y\":-270,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-100,\"y\":-300,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-130,\"y\":-300,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-150,\"y\":-320,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-150,\"y\":-390,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":130,\"y\":-270,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":100,\"y\":-270,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":100,\"y\":-300,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":130,\"y\":-300,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":150,\"y\":-320,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":150,\"y\":-390,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":0,\"y\":-305,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":0,\"y\":-265,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":60,\"y\":-360,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":60,\"y\":-400,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-60,\"y\":-360,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-60,\"y\":-400,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-75,\"y\":-560,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-75,\"y\":-1270,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":75,\"y\":-560,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":75,\"y\":-1270,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":2,\"y\":-707.666381836,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":2,\"y\":-625,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":22,\"y\":-600,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":73,\"y\":-600,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":22,\"y\":-727.666381836,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":73,\"y\":-727.666381836,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":-2,\"y\":-707.666381836,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":-2,\"y\":-625,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":-22,\"y\":-600,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":-73,\"y\":-600,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":-22,\"y\":-727.666381836,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":-73,\"y\":-727.666381836,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":2,\"y\":-955,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":2,\"y\":-875,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":22,\"y\":-855,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":73,\"y\":-855,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":22,\"y\":-975,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":73,\"y\":-975,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":-2,\"y\":-955,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":-2,\"y\":-875,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":-22,\"y\":-855,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":-73,\"y\":-855,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":-22,\"y\":-975,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":-73,\"y\":-975,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":2,\"y\":-1225,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":2,\"y\":-1125,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":22,\"y\":-1105,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":73,\"y\":-1105,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":22,\"y\":-1245,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":73,\"y\":-1245,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":-2,\"y\":-1225,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":-2,\"y\":-1125,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":-22,\"y\":-1105,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":-73,\"y\":-1105,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":-22,\"y\":-1245,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":-73,\"y\":-1245,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":-132,\"y\":-450,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-87,\"y\":-515,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":132,\"y\":-450,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":87,\"y\":-515,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":0,\"y\":-465,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":0,\"y\":-505,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-95,\"y\":-1290,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-230,\"y\":-1290,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-225,\"y\":-1390,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":225,\"y\":-1390,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":225,\"y\":-1430,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-225,\"y\":-1430,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":95,\"y\":-1290,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":230,\"y\":-1290,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-95,\"y\":-1530,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-230,\"y\":-1530,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":95,\"y\":-1530,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":230,\"y\":-1530,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":95,\"y\":-1388,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":95,\"y\":-1432,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":-95,\"y\":-1388,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":-95,\"y\":-1432,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":-95,\"y\":-4185,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-270,\"y\":-4300,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-200,\"y\":-4385,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":200,\"y\":-4385,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":180,\"y\":-4405,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-180,\"y\":-4405,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":95,\"y\":-4185,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":270,\"y\":-4300,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-137,\"y\":-4487,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":137,\"y\":-4487,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-75,\"y\":-4150,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":75,\"y\":-4150,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":0,\"y\":-3410,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":0,\"y\":-3370,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":0,\"y\":-3580,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":0,\"y\":-3620,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-75,\"y\":-3495,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":0,\"y\":-3495,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":75,\"y\":-3495,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":-75,\"y\":-3705,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":0,\"y\":-3705,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":75,\"y\":-3705,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":0,\"y\":-3790,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":0,\"y\":-3830,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-75,\"y\":-3905,\"bCoef\":0.25,\"cMask\":[\"blue\"]},{\"x\":0,\"y\":-3905,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":75,\"y\":-3905,\"bCoef\":0.25,\"cMask\":[\"red\"]},{\"x\":0,\"y\":-4030,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":0,\"y\":-3990,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-40,\"y\":-4285,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":40,\"y\":-4285,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":40,\"y\":-4315,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-40,\"y\":-4315,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-40,\"y\":-4580,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":40,\"y\":-4580,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-70,\"y\":-4500,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-70,\"y\":-4475,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-97,\"y\":-4458,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":70,\"y\":-4500,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":70,\"y\":-4475,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":97,\"y\":-4458,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"]},{\"x\":-67,\"y\":-4335,\"bCoef\":7,\"cMask\":[\"red\",\"blue\"]},{\"x\":67,\"y\":-4335,\"bCoef\":7,\"cMask\":[\"red\",\"blue\"]}],\"segments\":[{\"v0\":0,\"v1\":1,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":1,\"v1\":2,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":3,\"v1\":4,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":4,\"v1\":5,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":6,\"v1\":8,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":8,\"v1\":9,\"bCoef\":0,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":9,\"v1\":10,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":11,\"v1\":12,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":13,\"v1\":12,\"bCoef\":0,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":13,\"v1\":7,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":14,\"v1\":15,\"bCoef\":0.1,\"cMask\":[\"wall\"],\"color\":\"FF0000\"},{\"v0\":16,\"v1\":17,\"bCoef\":0.1,\"cMask\":[\"wall\"],\"color\":\"FF\"},{\"v0\":18,\"v1\":19,\"bCoef\":-3,\"cMask\":[\"red\",\"blue\"],\"color\":\"FF0000\"},{\"v0\":20,\"v1\":21,\"bCoef\":0.1,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":22,\"v1\":23,\"bCoef\":0.1,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":24,\"v1\":25,\"bCoef\":0.1,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":26,\"v1\":27,\"bCoef\":0.1,\"cMask\":[\"wall\"],\"color\":\"FFFFFF\"},{\"v0\":28,\"v1\":29,\"bCoef\":0.1,\"vis\":false,\"cMask\":[\"ball\"]},{\"v0\":30,\"v1\":31,\"bCoef\":0.1,\"vis\":false,\"cMask\":[\"ball\"]},{\"v0\":33,\"v1\":34,\"bCoef\":0,\"vis\":false,\"cMask\":[\"ball\"]},{\"v0\":32,\"v1\":35,\"bCoef\":0,\"vis\":false,\"cMask\":[\"ball\"]},{\"v0\":34,\"v1\":35,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"ball\"]},{\"v0\":31,\"v1\":32,\"bCoef\":0.1,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"ball\"]},{\"v0\":29,\"v1\":33,\"bCoef\":0.1,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"ball\"]},{\"v0\":36,\"v1\":37,\"cMask\":[\"red\",\"blue\"],\"color\":\"FF\"},{\"v0\":10,\"v1\":11,\"bCoef\":0.1,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":38,\"v1\":39,\"bCoef\":-3,\"cMask\":[\"red\",\"blue\"],\"color\":\"FF0000\"},{\"v0\":40,\"v1\":41,\"cMask\":[\"red\",\"blue\"],\"color\":\"FF\"},{\"v0\":42,\"v1\":43,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":43,\"v1\":42,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":44,\"v1\":45,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":46,\"v1\":45,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":46,\"v1\":47,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":48,\"v1\":47,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":48,\"v1\":49,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":50,\"v1\":49,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":50,\"v1\":51,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":44,\"v1\":51,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":52,\"v1\":53,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":54,\"v1\":55,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":53,\"v1\":54,\"bCoef\":0.25,\"curve\":50,\"curveF\":2.1445069205095586,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":56,\"v1\":57,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":58,\"v1\":59,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":56,\"v1\":59,\"bCoef\":0.25,\"curve\":50,\"curveF\":2.1445069205095586,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":60,\"v1\":61,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":52,\"v1\":61,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":62,\"v1\":63,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":63,\"v1\":58,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":64,\"v1\":65,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":66,\"v1\":65,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":66,\"v1\":67,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":68,\"v1\":67,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":68,\"v1\":69,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":70,\"v1\":69,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":70,\"v1\":71,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":64,\"v1\":71,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":72,\"v1\":73,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":74,\"v1\":75,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":76,\"v1\":77,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":72,\"v1\":77,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":78,\"v1\":79,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":79,\"v1\":74,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":62,\"v1\":75,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":73,\"v1\":60,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":80,\"v1\":81,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":82,\"v1\":81,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":82,\"v1\":83,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":84,\"v1\":83,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":84,\"v1\":85,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":86,\"v1\":85,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":86,\"v1\":87,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":80,\"v1\":87,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":88,\"v1\":89,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":90,\"v1\":91,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":92,\"v1\":93,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":88,\"v1\":93,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":94,\"v1\":95,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":95,\"v1\":90,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":96,\"v1\":97,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":98,\"v1\":97,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":98,\"v1\":99,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":100,\"v1\":99,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":100,\"v1\":101,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":102,\"v1\":101,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":102,\"v1\":103,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":96,\"v1\":103,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":104,\"v1\":105,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":106,\"v1\":107,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":108,\"v1\":109,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":104,\"v1\":109,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":110,\"v1\":111,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":111,\"v1\":106,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":94,\"v1\":107,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":105,\"v1\":92,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":89,\"v1\":76,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":78,\"v1\":91,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":112,\"v1\":108,\"bCoef\":0.25,\"curve\":45.00000000000001,\"curveF\":2.414213562373095,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":110,\"v1\":113,\"bCoef\":0.25,\"curve\":45.00000000000001,\"curveF\":2.414213562373095,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":53,\"v1\":45,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":60,\"v1\":50,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":66,\"v1\":75,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":69,\"v1\":78,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":89,\"v1\":81,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":92,\"v1\":86,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":98,\"v1\":107,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":101,\"v1\":114,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":46,\"v1\":59,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":49,\"v1\":62,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":73,\"v1\":65,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":76,\"v1\":70,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":82,\"v1\":91,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":85,\"v1\":94,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":105,\"v1\":97,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":102,\"v1\":115,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":116,\"v1\":117,\"bCoef\":3.7,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":118,\"v1\":119,\"bCoef\":3.7,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":120,\"v1\":121,\"bCoef\":3.7,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":122,\"v1\":123,\"bCoef\":3.7,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":0,\"v1\":5,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":124,\"v1\":125,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":125,\"v1\":124,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":2,\"v1\":126,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":126,\"v1\":127,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":128,\"v1\":127,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":128,\"v1\":129,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":129,\"v1\":130,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":130,\"v1\":131,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":132,\"v1\":3,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":132,\"v1\":133,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":133,\"v1\":134,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":134,\"v1\":135,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":136,\"v1\":135,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":136,\"v1\":137,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":138,\"v1\":139,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":139,\"v1\":138,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":140,\"v1\":141,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":141,\"v1\":140,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":142,\"v1\":143,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":143,\"v1\":142,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":144,\"v1\":145,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":146,\"v1\":147,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":148,\"v1\":149,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":150,\"v1\":149,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":150,\"v1\":151,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":148,\"v1\":152,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":152,\"v1\":153,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":154,\"v1\":155,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":155,\"v1\":156,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":156,\"v1\":157,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":158,\"v1\":154,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":158,\"v1\":159,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":160,\"v1\":161,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":162,\"v1\":161,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":162,\"v1\":163,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":160,\"v1\":164,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":164,\"v1\":165,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":166,\"v1\":167,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":167,\"v1\":168,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":168,\"v1\":169,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":170,\"v1\":166,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":170,\"v1\":171,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":172,\"v1\":173,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":174,\"v1\":173,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":174,\"v1\":175,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":172,\"v1\":176,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":176,\"v1\":177,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":178,\"v1\":179,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":179,\"v1\":180,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":180,\"v1\":181,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":182,\"v1\":178,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":182,\"v1\":183,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":184,\"v1\":185,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":131,\"v1\":184,\"bCoef\":0.25,\"curve\":40,\"curveF\":2.7474774194546225,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":144,\"v1\":185,\"bCoef\":0.25,\"curve\":35,\"curveF\":3.1715948023632126,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":186,\"v1\":187,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":187,\"v1\":146,\"bCoef\":0.25,\"curve\":35,\"curveF\":3.1715948023632126,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":186,\"v1\":137,\"bCoef\":0.25,\"curve\":40,\"curveF\":2.7474774194546225,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":188,\"v1\":189,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":189,\"v1\":188,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":190,\"v1\":191,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":192,\"v1\":193,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":194,\"v1\":193,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":194,\"v1\":195,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":192,\"v1\":195,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":196,\"v1\":197,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":190,\"v1\":145,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":147,\"v1\":196,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":198,\"v1\":199,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":200,\"v1\":201,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":191,\"v1\":199,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":201,\"v1\":197,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":55,\"v1\":198,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":200,\"v1\":57,\"bCoef\":0.25,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":196,\"v1\":202,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":200,\"v1\":203,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":190,\"v1\":204,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":198,\"v1\":205,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":206,\"v1\":207,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":210,\"v1\":209,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":208,\"v1\":211,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":212,\"v1\":213,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":207,\"v1\":214,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":215,\"v1\":213,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":112,\"v1\":216,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":113,\"v1\":217,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":206,\"v1\":216,\"bCoef\":0.25,\"curve\":54.99999999999999,\"curveF\":1.920982126971166,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":217,\"v1\":212,\"bCoef\":0.25,\"curve\":54.99999999999999,\"curveF\":1.920982126971166,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":218,\"v1\":219,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":219,\"v1\":218,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":220,\"v1\":221,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":221,\"v1\":220,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":222,\"v1\":223,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":223,\"v1\":224,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":225,\"v1\":226,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":226,\"v1\":227,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":228,\"v1\":229,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":229,\"v1\":228,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":230,\"v1\":231,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":231,\"v1\":232,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":233,\"v1\":234,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":234,\"v1\":233,\"bCoef\":0.25,\"curve\":180,\"curveF\":6.123233995736766e-17,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":208,\"v1\":235,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":236,\"v1\":235,\"bCoef\":0.25,\"curve\":54.99999999999999,\"curveF\":1.920982126971166,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":236,\"v1\":209,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":210,\"v1\":237,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":237,\"v1\":238,\"bCoef\":0.25,\"curve\":54.99999999999999,\"curveF\":1.920982126971166,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":238,\"v1\":211,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":6,\"v1\":239,\"bCoef\":0.25,\"curve\":38,\"curveF\":2.9042108776758226,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":240,\"v1\":7,\"bCoef\":0.25,\"curve\":38,\"curveF\":2.9042108776758226,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":241,\"v1\":242,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":242,\"v1\":243,\"bCoef\":0.25,\"curve\":119.99999999999999,\"curveF\":0.577350269189626,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":243,\"v1\":214,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":241,\"v1\":239,\"bCoef\":0.25,\"curve\":37,\"curveF\":2.988684962742893,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":244,\"v1\":245,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":246,\"v1\":245,\"bCoef\":0.25,\"curve\":119.99999999999999,\"curveF\":0.577350269189626,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":246,\"v1\":215,\"bCoef\":0.25,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":240,\"v1\":244,\"bCoef\":0.25,\"curve\":37,\"curveF\":2.988684962742893,\"cMask\":[\"red\",\"blue\"],\"color\":\"303030\"},{\"v0\":247,\"v1\":248,\"bCoef\":7,\"cMask\":[\"red\",\"blue\"],\"color\":\"FFFFFF\"},{\"v0\":206,\"v1\":235,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":243,\"v1\":247,\"bCoef\":0.25,\"cMask\":[\"red\"],\"color\":\"FF\"},{\"v0\":236,\"v1\":212,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"},{\"v0\":246,\"v1\":248,\"bCoef\":0.25,\"cMask\":[\"blue\"],\"color\":\"FF0000\"}],\"planes\":[{\"normal\":[0,-1],\"dist\":-255,\"bCoef\":0.1},{\"normal\":[1,0],\"dist\":-420,\"bCoef\":0.1},{\"normal\":[-1,0],\"dist\":-420,\"bCoef\":0.1},{\"normal\":[0,1],\"dist\":100,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[1,0],\"dist\":-150,\"bCoef\":0.1,\"cMask\":[\"red\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-1,0],\"dist\":-1,\"bCoef\":0.1,\"cMask\":[\"red\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[1,0],\"dist\":-1,\"bCoef\":0.1,\"cMask\":[\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[-1,0],\"dist\":-150,\"bCoef\":0.1,\"cMask\":[\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"normal\":[0,1],\"dist\":-4901,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0.5370903057318278,0.8435247497785063],\"dist\":-4123.04888559,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0.7595879524674986,0.6504045990506474],\"dist\":-3177.90693426,\"bCoef\":0.1,\"cMask\":[\"red\",\"blue\"]}],\"goals\":[],\"discs\":[{\"radius\":15,\"bCoef\":0.1,\"damping\":1,\"color\":\"FF0000\",\"cMask\":[\"ball\",\"wall\"],\"cGroup\":[\"ball\",\"kick\",\"score\"]},{\"pos\":[0,2350],\"speed\":[0,-4.05],\"bCoef\":0.1,\"invMass\":1e-12,\"damping\":1,\"color\":\"FF\",\"cMask\":[\"ball\"]},{\"pos\":[-85,-4645.77786255],\"radius\":60,\"bCoef\":0.25,\"invMass\":0,\"damping\":0,\"color\":\"transparent\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[85,-4645.77786255],\"radius\":60,\"bCoef\":0.25,\"invMass\":0,\"damping\":0,\"color\":\"transparent\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-85,-4685.77786255],\"radius\":60,\"bCoef\":0.25,\"invMass\":0,\"damping\":0,\"color\":\"transparent\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[85,-4685.77786255],\"radius\":60,\"bCoef\":0.25,\"invMass\":0,\"damping\":0,\"color\":\"transparent\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[-85,-4725.77786255],\"radius\":60,\"bCoef\":0.25,\"invMass\":0,\"damping\":0,\"color\":\"transparent\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]},{\"pos\":[85,-4725.77786255],\"radius\":60,\"bCoef\":0.25,\"invMass\":0,\"damping\":0,\"color\":\"transparent\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"ball\"]}],\"playerPhysics\":{\"damping\":0.985,\"acceleration\":0.09,\"kickingDamping\":0.984,\"kickStrength\":0},\"ballPhysics\":\"disc0\",\"spawnDistance\":40}";

var gameState = {
    active: false,
    players: [], // { id, name, team, finished }
    checkInterval: null,
    chatBlocked: false,
    callback: null,
    firstCross: {}, // playerId -> { crossedLine1: bool }
    winnerDeclared: false
};

var config = {
    minPlayers: 2,
    checkIntervalMs: 100,
    explanationMs: 5000,
    selectionPauseMs: 1500,
    // Líneas de meta (usaremos rango X entre A.x y B.x y comprobación por Y)
    line1Y: -4702.777,
    line2Y: -4710.777,
    lineMinX: -15,
    lineMaxX: 15
};

function start(room, onGameEnd) {
    if (!mapData) {
        console.error('[COLLISION_RACING] mapData no inyectado.');
        return;
    }

    gameState.callback = onGameEnd || null;

    try { room.setCustomStadium(mapData); } catch (e) { console.error('[COLLISION_RACING] Error cargando mapa:', e.message); return; }

    var players = room.getPlayerList().filter(p => p.id !== 0);
    if (players.length < config.minPlayers) {
        room.sendAnnouncement('⚠️ No hay suficientes jugadores para COLLISION TEAM RACING', null, 0xFF6600);
        if (onGameEnd) onGameEnd(null);
        return;
    }

    gameState.active = true;
    gameState.winnerDeclared = false;
    gameState.firstCross = {};

    // Inicializar players state
    gameState.players = players.map(p => ({ id: p.id, name: p.name, team: 1, finished: false }));

    // Separar equipos (mitad rojo, mitad azul)
    var shuffled = players.slice();
    for (var i = shuffled.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp; }
    var half = Math.floor(shuffled.length / 2);
    for (var k = 0; k < shuffled.length; k++) {
        var p = shuffled[k];
        var team = (k < half) ? 1 : 2;
        try { room.setPlayerTeam(p.id, team); } catch(e){}
        var rec = gameState.players.find(x => x.id === p.id);
        if (rec) rec.team = team;
    }

    room.sendAnnouncement('🏁 COLLISION TEAM RACING — ¡A competir!', null, 0x00BFFF, 'bold', 2);
    room.sendAnnouncement('👥 Jugadores: ' + players.length + ' • Equipos separados', null, 0x00BFFF);

    // Pausa para explicación
    room.startGame();
    try { room.pauseGame(true); } catch(e){}
    gameState.chatBlocked = true;

    room.sendAnnouncement('\n📋 INSTRUCCIONES:\n' +
        '🔴 vs 🔵 — Cruza la meta primero para ganar\n' +
        '📏 La meta tiene DOS LÍNEAS de verificación. Debes pasar ambas (se detecta por coordenadas)\n' +
        '🏆 El PRIMERO que complete ambas líneas gana y será enviado a Lucky',
        null, 0xFFFF00, 'bold', 2);

    setTimeout(() => {
        // Fin de explicación
        try { room.pauseGame(false); } catch(e){}
        gameState.chatBlocked = false;

        // Iniciar verificación periódica
        if (gameState.checkInterval) clearInterval(gameState.checkInterval);
        gameState.checkInterval = setInterval(() => checkPlayers(room), config.checkIntervalMs);
    }, config.explanationMs + config.selectionPauseMs);
}

function checkPlayers(room) {
    if (!gameState.active || gameState.winnerDeclared) return;

    gameState.players.forEach(p => {
        if (!p || p.finished) return;
        var playerObj = room.getPlayer(p.id);
        if (!playerObj) return;
        var pos = playerObj.position;
        if (!pos) return;

        // Solo considerar si está dentro del rango X de la línea
        if (pos.x >= config.lineMinX && pos.x <= config.lineMaxX) {
            // Línea 1
            if (!gameState.firstCross[p.id] && pos.y <= config.line1Y) {
                gameState.firstCross[p.id] = { crossedLine1: true };
                // pequeño log
                try { room.sendAnnouncement('ℹ️ ' + p.name + ' cruzó la primera línea de meta', p.id, 0xFFFF00); } catch(e){}
            }
            // Línea 2 (confirmación). Solo si ya cruzó línea1
            if (gameState.firstCross[p.id] && gameState.firstCross[p.id].crossedLine1 && pos.y <= config.line2Y) {
                // declarar ganador (solo el primero)
                declareWinner(room, p);
            }
        }
    });
}

function declareWinner(room, winnerRec) {
    if (gameState.winnerDeclared) return;
    gameState.winnerDeclared = true;
    gameState.active = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }

    room.sendAnnouncement('\n🏆 ¡' + winnerRec.name.toUpperCase() + ' HA GANADO COLLISION TEAM RACING! 🏆', null, 0xFFD700, 'bold', 2);
    console.log('[COLLISION_RACING] Ganador:', winnerRec.name);

    // Enviar ganador al callback para que el bot lo lleve a Lucky
    setTimeout(() => {
        if (gameState.callback) {
            try { gameState.callback({ id: winnerRec.id, name: winnerRec.name }); } catch(e){}
        }
        stop(room);
    }, 1500);
}

function stop(room) {
    gameState.active = false;
    gameState.winnerDeclared = false;
    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
    gameState.players = [];
    gameState.firstCross = {};
    gameState.chatBlocked = false;
    gameState.callback = null;
    try { room.stopGame(); } catch(e){}
}

function onPlayerLeave(room, player) {
    if (!gameState.active) return;
    var rec = gameState.players.find(x => x.id === player.id);
    if (rec) rec.finished = true;
}

function onPlayerChat(room, player, message) {
    if (gameState.chatBlocked) return false;
    return true;
}

function isActive() { return gameState.active; }

return {
    start: start,
    stop: stop,
    isActive: isActive,
    onPlayerLeave: onPlayerLeave,
    onPlayerChat: onPlayerChat,
    setMapData: function(jsonString) { mapData = jsonString; }
};

})();

// ============================================
// MÓDULO: LUCKY
// ============================================
// ============================================
// MÓDULO: LUCKY MAP
// ============================================
// Mapa de la suerte con 15 colores diferentes
// El ganador de LALALA cae en un color aleatorio

var LUCKY = (function() {
    // Variables globales para mapas (se pasan desde bot.js)
    var mapLuck = null;
    var mapLuckDios = null;
    var mapLuckHell = null;
    
    // Configuración de colores y sus posiciones
    var colorZones = [
        { name: 'NARANJA', color: 'FF8C00', x: -130, minX: -150, maxX: -110, effect: 'ban_current' },
        { name: 'BLANCO', color: 'FFFFFF', x: -90, minX: -110, maxX: -70, effect: 'load_luck_dios' },
        { name: 'MAGENTA', color: 'FF00FF', x: -50, minX: -70, maxX: -30, effect: 'spectator_next' },
        { name: 'AMARILLO', color: 'FFFF00', x: -10, minX: -30, maxX: 10, effect: 'kick_current' },
        { name: 'AZUL', color: '0000FF', x: 30, minX: 10, maxX: 50, effect: 'protection' },
        { name: 'VERDE', color: '4BE608', x: 70, minX: 50, maxX: 90, effect: 'choose_kick' },
        { name: 'ROJO', color: 'FF0000', x: 110, minX: 90, maxX: 130, effect: 'choose_admin' },
        { name: 'ROJO OSCURO', color: '8B0000', x: 150, minX: 130, maxX: 170, effect: 'receive_admin' },
        { name: 'DORADO', color: 'D2AB0B', x: 190, minX: 170, maxX: 210, effect: 'choose_ban_1min' },
        { name: 'CELESTE', color: '93C9FF', x: 230, minX: 210, maxX: 250, effect: 'repeat_roulette' },
        { name: 'MORADO', color: '800180', x: 270, minX: 250, maxX: 290, effect: 'choose_spectator_next' },
        { name: 'ROSA', color: 'FFC0CB', x: 310, minX: 290, maxX: 330, effect: 'gay_message' },
        { name: 'VIOLETA', color: '7400FF', x: 350, minX: 330, maxX: 370, effect: 'choose_pass_roulette' },
        { name: 'NEGRO', color: '000000', x: 390, minX: 370, maxX: 410, effect: 'load_luck_hell' },
        { name: 'CIAN', color: '00FFFF', x: 430, minX: 410, maxX: 450, effect: 'choose_dios_player' }
    ];
    
    var gameState = {
        active: false,
        winner: null,
        checkInterval: null,
        globalTimeout: null,
        startTime: 0,
        colorDetected: false,
        onGameEnd: null,
        detectionBuffer: [],  // Buffer para confirmar detecciones
        lastDetectedZone: null,
        callbacks: {
            onTempAdmin: null,
            onSpectatorNext: null,
            onBanTemp: null
        },
        // Sistema de selección
        selectionActive: false,
        explanationPhase: false,
        selectionEffect: null,
        selectionTimeout: null,
        selectionReminderTimeout: null,
        playerList: [],  // Lista de jugadores disponibles para selección
        room: null,  // Guardar referencia a room
        chatBlocked: false // Bloqueo de chat global
    };
    
    var config = {
        detectionY: 320,  // Y donde están los discos de colores (más profundo = más preciso)
        detectionDelay: 2000,  // Esperar 2s antes de empezar a detectar
        stopDelay: 5000,  // Detener el mapa 5s después de detectar el color
        confirmationCount: 3,  // Número de detecciones consecutivas para confirmar
        selectionTimeout: 10000,  // 10 segundos para escoger
        selectionReminder: 5000,  // Recordatorio a los 5 segundos
        maxGameTime: 60000  // 60 segundos máximo por Lucky
    };
    
    // Detectar en qué color cayó la bola
    function detectColor(room) {
        if (!gameState.active || gameState.colorDetected) return;
        
        var ballPos = room.getBallPosition();
        if (!ballPos) return;
        
        // Verificar si la bola está en la zona de colores (más profundo = más preciso)
        if (ballPos.y > config.detectionY) {
            var detectedZone = null;
            
            // Buscar en qué zona de color está la bola
            for (var i = 0; i < colorZones.length; i++) {
                var zone = colorZones[i];
                // Detectar con un margen más centrado
                var centerMargin = 5; // Margen de 5px desde los bordes
                if (ballPos.x >= (zone.minX + centerMargin) && ballPos.x <= (zone.maxX - centerMargin)) {
                    detectedZone = zone;
                    break;
                }
            }
            
            if (detectedZone) {
                // Verificar si es el mismo color que las últimas detecciones
                if (gameState.lastDetectedZone && gameState.lastDetectedZone.name === detectedZone.name) {
                    gameState.detectionBuffer.push(detectedZone);
                } else {
                    // Nuevo color detectado, resetear buffer
                    gameState.detectionBuffer = [detectedZone];
                    gameState.lastDetectedZone = detectedZone;
                }
                
                // Confirmar solo si se detectó el mismo color varias veces consecutivas
                if (gameState.detectionBuffer.length >= config.confirmationCount) {
                    gameState.colorDetected = true;
                    
                    console.log("🎯 Color confirmado: " + detectedZone.name + " en X=" + ballPos.x.toFixed(0) + " Y=" + ballPos.y.toFixed(0));
                    
                    // Ejecutar el efecto del color (sin anuncio de color)
                    executeEffect(room, detectedZone);
                }
            } else {
                // Si no detecta ningún color, resetear buffer
                gameState.detectionBuffer = [];
                gameState.lastDetectedZone = null;
            }
        } else {
            // Si la bola no está en la zona de detección, resetear buffer
            gameState.detectionBuffer = [];
            gameState.lastDetectedZone = null;
        }
    }
    
    // Sistema de selección de jugadores
    function startSelection(room, effectType, effectData) {
        gameState.selectionActive = true;
        gameState.explanationPhase = true;
        gameState.chatBlocked = true;
        gameState.selectionEffect = { type: effectType, data: effectData };
        
        var players = room.getPlayerList().filter(function(p) {
            return p.id !== 0 && p.id !== gameState.winner.id;
        });
        
        if (players.length === 0) {
            room.sendAnnouncement("⚠️ No hay otros jugadores para seleccionar", null, 0xFF6600, "bold");
            finishEffect(room);
            return;
        }
        
        // Guardar lista de jugadores para referencia
        gameState.playerList = players;
        
        // PAUSAR EL JUEGO durante la selección
        room.pauseGame(true);
        
        // Mover al ganador a espectador para que no haya 2 en rojo
        room.setPlayerTeam(gameState.winner.id, 0);
        
        // Determinar el propósito de la selección
        var purpose = "";
        switch(effectType) {
            case 'choose_kick':
                purpose = "para KICKEAR";
                break;
            case 'choose_admin':
                purpose = "para dar ADMIN";
                break;
            case 'choose_ban_1min':
                purpose = "para BANEAR por 1 minuto";
                break;
            case 'choose_spectator_next':
                purpose = "para ESPECTADOR en el próximo juego";
                break;
            case 'choose_pass_roulette':
                purpose = "para PASARLE LA RULETA";
                break;
            case 'choose_dios_player':
                purpose = "para jugar LUCK DIOS";
                break;
            default:
                purpose = "para seleccionar";
        }
        
        // Mostrar lista de jugadores EN HORIZONTAL
        var playerList = "\n📋 JUGADORES: ";
        var playerListParts = [];
        players.forEach(function(p, i) {
            playerListParts.push((i + 1) + "." + p.name);
        });
        playerList += playerListParts.join("  |  ");
        playerList += "\n\n📖 " + gameState.winner.name + ", escribe el NÚMERO " + purpose;
        playerList += "\n⏳ Espera 5 segundos para la explicación...";
        
        room.sendAnnouncement(
            playerList,
            null,
            0xFFFF00,
            "bold",
            2
        );
        
        // Fase de explicación: 5 segundos donde nadie puede escribir
        setTimeout(function() {
            // Termina la explicación, empieza el timeout de selección
            gameState.explanationPhase = false;
            gameState.chatBlocked = false;
            // Despausar el juego después de la explicación
            room.pauseGame(false);
            room.sendAnnouncement(
                "⏱️ ¡AHORA! Escribe el NÚMERO (10 segundos)",
                null,
                0x00FF00,
                "bold",
                2
            );
            // Recordatorio a los 5 segundos
            gameState.selectionReminderTimeout = setTimeout(function() {
                if (gameState.selectionActive) {
                    room.sendAnnouncement(
                        "⏰ ¡5 SEGUNDOS RESTANTES! Escribe el NÚMERO",
                        gameState.winner.id,
                        0xFFFF00,
                        "bold"
                    );
                }
            }, 5000);
            // Timeout de 10 segundos - selección aleatoria
            gameState.selectionTimeout = setTimeout(function() {
                if (gameState.selectionActive) {
                    var randomPlayer = gameState.playerList[Math.floor(Math.random() * gameState.playerList.length)];
                    room.sendAnnouncement(
                        "⏱️ Tiempo agotado - Selección ALEATORIA: " + randomPlayer.name,
                        null,
                        0xFF6600,
                        "bold"
                    );
                    executeSelectionEffect(room, randomPlayer);
                }
            }, 10000);
        }, 5000); // 5 segundos de explicación
    }
    
    function cancelSelection() {
        gameState.selectionActive = false;
        gameState.explanationPhase = false;
        gameState.playerList = [];
        if (gameState.selectionTimeout) {
            clearTimeout(gameState.selectionTimeout);
            gameState.selectionTimeout = null;
        }
        if (gameState.selectionReminderTimeout) {
            clearTimeout(gameState.selectionReminderTimeout);
            gameState.selectionReminderTimeout = null;
        }
        // Reanudar el juego
        if (gameState.room) {
            gameState.room.pauseGame(false);
        }
    }
    
    function handleSelectionInput(room, message) {
        if (!gameState.selectionActive || gameState.explanationPhase) return;
        
        // Selección solo por número (1, 2, 3, etc)
        var selectedNumber = parseInt(message.trim());
        
        if (isNaN(selectedNumber) || selectedNumber < 1 || selectedNumber > gameState.playerList.length) {
            room.sendAnnouncement(
                "❌ Número inválido. Escribe un número del 1 al " + gameState.playerList.length,
                gameState.winner.id,
                0xFF0000
            );
            return;
        }
        
        // Obtener jugador por índice (restamos 1 porque el usuario escribe 1-based)
        var selectedPlayer = gameState.playerList[selectedNumber - 1];
        
        if (selectedPlayer) {
            room.sendAnnouncement(
                "✅ " + gameState.winner.name + " seleccionó a " + selectedPlayer.name,
                null,
                0x00FF00,
                "bold"
            );
            cancelSelection();
            executeSelectionEffect(room, selectedPlayer);
        }
    }
    
    function executeSelectionEffect(room, targetPlayer) {
        var effect = gameState.selectionEffect;
        
        switch(effect.type) {
            case 'choose_kick':
                room.sendAnnouncement(
                    "⚡ " + targetPlayer.name + " ha sido KICKEADO por " + gameState.winner.name,
                    null,
                    0x4BE608,
                    "bold",
                    2
                );
                setTimeout(function() {
                    room.kickPlayer(targetPlayer.id, "Kickeado por " + gameState.winner.name, false);
                }, 2000);
                break;
                
            case 'choose_admin':
                room.sendAnnouncement(
                    "👑 " + targetPlayer.name + " recibe ADMIN temporal (otorgado por " + gameState.winner.name + ")",
                    null,
                    0xFF0000,
                    "bold",
                    2
                );
                room.sendAnnouncement("⚠️ Admin temporal: NO puedes kickear, banear ni cambiar mapas", targetPlayer.id, 0xFFFF00, "bold");
                // Dar permisos de admin visible
                room.setPlayerAdmin(targetPlayer.id, true);
                if (gameState.callbacks.onTempAdmin) {
                    gameState.callbacks.onTempAdmin(targetPlayer.id);
                }
                break;
                
            case 'choose_ban_1min':
                room.sendAnnouncement(
                    "⚔️ " + targetPlayer.name + " ha sido BANEADO por 1 MINUTO (por " + gameState.winner.name + ")",
                    null,
                    0xD2AB0B,
                    "bold",
                    2
                );
                if (gameState.callbacks.onBanTemp) {
                    gameState.callbacks.onBanTemp(targetPlayer.id, 60);
                }
                break;
                
            case 'choose_spectator_next':
                room.sendAnnouncement(
                    "👁️ " + targetPlayer.name + " será ESPECTADOR en el próximo minijuego (elegido por " + gameState.winner.name + ")",
                    null,
                    0x800180,
                    "bold",
                    2
                );
                if (gameState.callbacks.onSpectatorNext) {
                    gameState.callbacks.onSpectatorNext(targetPlayer.id);
                }
                break;
                
            case 'choose_pass_roulette':
                room.sendAnnouncement(
                    "🔀 " + gameState.winner.name + " le pasa la ruleta a " + targetPlayer.name,
                    null,
                    0x7400FF,
                    "bold",
                    2
                );
                setTimeout(function() {
                    room.stopGame();
                    room.setCustomStadium(mapLuck);
                    room.startGame();
                    room.setPlayerTeam(targetPlayer.id, 1);
                    // Cambiar el ganador por el nuevo jugador
                    gameState.winner = targetPlayer;
                    gameState.colorDetected = false;
                    gameState.detectionBuffer = [];
                    gameState.lastDetectedZone = null;
                    
                    // Reiniciar detección con timeout completo
                    setTimeout(function() {
                        if (gameState.active) {
                            gameState.checkInterval = setInterval(function() {
                                detectColor(room);
                            }, 100);
                        }
                    }, config.detectionDelay);
                }, 3000);
                return; // No llamar finishEffect aún
                
            case 'choose_dios_player':
                room.sendAnnouncement(
                    "⭐ " + targetPlayer.name + " tirará la RULETA DE DIOS (elegido por " + gameState.winner.name + ")",
                    null,
                    0x00FFFF,
                    "bold",
                    2
                );
                setTimeout(function() {
                    stop(room, true); // Detener Lucky normal sin invocar onGameEnd
                    room.stopGame();
                    room.setCustomStadium(mapLuckDios);
                    room.startGame();
                    
                    setTimeout(function() {
                        room.setPlayerTeam(targetPlayer.id, 1);
                        
                        // Iniciar Lucky DIOS
                        if (typeof LUCKY_DIOS !== 'undefined' && LUCKY_DIOS.start) {
                            LUCKY_DIOS.start(room, targetPlayer, gameState.onGameEnd, gameState.callbacks);
                        }
                    }, 100);
                }, 3000);
                return; // No llamar finishEffect todavía
        }
        
        finishEffect(room);
    }
    
    // Ejecutar el efecto del color detectado
    function executeEffect(room, zone) {
        var effect = zone.effect;
        var winner = gameState.winner;
        
        console.log("⚡ Ejecutando efecto: " + effect);
        
        switch(effect) {
            case 'ban_current':
                // NARANJA: Ban temporal por 60 segundos (usar callback centralizado)
                room.sendAnnouncement("⚔️ Has sido BANEADO por 60 segundos!", winner.id, 0xFF8C00, "bold", 2);
                if (gameState.callbacks && gameState.callbacks.onBanTemp) {
                    gameState.callbacks.onBanTemp(winner.id, 60);
                }
                finishEffect(room);
                break;
                
            case 'load_luck_dios':
                // BLANCO: Cargar ruleta de dios
                room.sendAnnouncement("✨ Cargando RULETA DE DIOS...", null, 0xFFFFFF, "bold", 2);
                setTimeout(function() {
                    stop(room, true); // Detener Lucky normal sin invocar onGameEnd (se cambiará mapa)
                    room.stopGame();
                    room.setCustomStadium(mapLuckDios);
                    room.startGame();
                    
                    setTimeout(function() {
                        room.setPlayerTeam(winner.id, 1);
                        
                        // Iniciar Lucky DIOS
                        if (typeof LUCKY_DIOS !== 'undefined' && LUCKY_DIOS.start) {
                            // Pasar onGameEnd y callbacks
                            LUCKY_DIOS.start(room, winner, gameState.onGameEnd, gameState.callbacks);
                        }
                    }, 100);
                }, 3000);
                break;
                
            case 'spectator_next':
                // MAGENTA: No puede jugar siguiente minijuego
                room.sendAnnouncement("👻 " + winner.name + " será ESPECTADOR en el siguiente minijuego!", null, 0xFF00FF, "bold", 2);
                if (gameState.callbacks.onSpectatorNext) {
                    gameState.callbacks.onSpectatorNext(winner.id);
                }
                finishEffect(room);
                break;
                
            case 'kick_current':
                // AMARILLO: Kickeado
                room.sendAnnouncement("⚡ " + winner.name + " ha sido KICKEADO!", null, 0xFFFF00, "bold", 2);
                setTimeout(function() {
                    room.kickPlayer(winner.id, "Kickeado por caer en AMARILLO", false);
                    finishEffect(room);
                }, 2000);
                break;
                
            case 'protection':
                // AZUL: Protección
                room.sendAnnouncement("🛡️ " + winner.name + " ¡SALVADO POR EL CONDÓN! 🛡️", null, 0x0000FF, "bold", 2);
                finishEffect(room);
                break;
                
            case 'choose_kick':
                // VERDE: Escoger a quien kickear
                room.sendAnnouncement("🎯 " + winner.name + " debe ESCOGER A QUIEN KICKEAR", null, 0x4BE608, "bold", 2);
                startSelection(room, 'choose_kick');
                break;
                
            case 'choose_admin':
                // ROJO: Escoger admin
                room.sendAnnouncement("👑 " + winner.name + " debe ESCOGER UN ADMIN", null, 0xFF0000, "bold", 2);
                startSelection(room, 'choose_admin');
                break;
                
            case 'receive_admin':
                // ROJO OSCURO: Recibe admin
                room.sendAnnouncement("👑 " + winner.name + " recibe ADMIN temporal!", null, 0x8B0000, "bold", 2);
                room.sendAnnouncement("⚠️ Admin temporal: NO puedes kickear, banear ni cambiar mapas", winner.id, 0xFFFF00, "bold");
                // Dar permisos de admin visible
                room.setPlayerAdmin(winner.id, true);
                if (gameState.callbacks.onTempAdmin) {
                    gameState.callbacks.onTempAdmin(winner.id);
                }
                finishEffect(room);
                break;
                
            case 'choose_ban_1min':
                // DORADO: Escoger a quien banear por 1 minuto
                room.sendAnnouncement("⚔️ " + winner.name + " debe ESCOGER A QUIEN BANEAR por 1 minuto", null, 0xD2AB0B, "bold", 2);
                startSelection(room, 'choose_ban_1min');
                break;
                
            case 'repeat_roulette':
                // CELESTE: Repite lanzamiento
                room.sendAnnouncement("🔄 " + winner.name + " REPITE la ruleta!", null, 0x93C9FF, "bold", 2);
                setTimeout(function() {
                    room.stopGame();
                    room.setCustomStadium(mapLuck);
                    room.startGame();
                    room.setPlayerTeam(winner.id, 1);
                    
                    // Reiniciar Lucky completamente
                    gameState.colorDetected = false;
                    gameState.detectionBuffer = [];
                    gameState.lastDetectedZone = null;
                    gameState.startTime = Date.now(); // RESETEAR TIEMPO para timeout global
                    
                    // Cancelar timeout global anterior si existe
                    if (gameState.globalTimeout) {
                        clearTimeout(gameState.globalTimeout);
                    }
                    
                    // Nuevo timeout global
                    gameState.globalTimeout = setTimeout(function() {
                        if (gameState.active && !gameState.colorDetected) {
                            console.log("⏰ Lucky: Timeout global alcanzado en repeat_roulette");
                            room.sendAnnouncement("⏰ Tiempo agotado en Lucky - Continuando...", null, 0xFF6600, "bold");
                            finishEffect(room);
                        }
                    }, config.maxGameTime);
                    
                    // Reiniciar detección con timeout completo
                    setTimeout(function() {
                        if (gameState.active) {
                            gameState.checkInterval = setInterval(function() {
                                detectColor(room);
                            }, 100);
                        }
                    }, config.detectionDelay);
                }, 3000);
                break;
                
            case 'choose_spectator_next':
                // MORADO: Escoge quien no puede jugar próximo minijuego
                room.sendAnnouncement("👁️ " + winner.name + " debe ESCOGER QUIEN SERÁ ESPECTADOR", null, 0x800180, "bold", 2);
                startSelection(room, 'choose_spectator_next');
                break;
                
            case 'gay_message':
                // ROSA: Mensaje gay
                room.sendAnnouncement("🌈 " + winner.name + " ES GAY 🌈", null, 0xFFC0CB, "bold", 2);
                finishEffect(room);
                break;
                
            case 'choose_pass_roulette':
                // VIOLETA: Escoge a quien le pasa la ruleta
                room.sendAnnouncement("🔀 " + winner.name + " debe ESCOGER A QUIEN LE PASA LA RULETA", null, 0x7400FF, "bold", 2);
                startSelection(room, 'choose_pass_roulette');
                break;
                
            case 'load_luck_hell':
                // NEGRO: Cargar ruleta de hell
                room.sendAnnouncement("💀 Cargando RULETA DEL INFIERNO...", null, 0x000000, "bold", 2);
                setTimeout(function() {
                    stop(room); // Detener Lucky normal
                    room.stopGame();
                    room.setCustomStadium(mapLuckHell);
                    room.startGame();
                    room.setPlayerTeam(winner.id, 1);
                    
                    // Iniciar Lucky HELL
                    if (typeof LUCKY_HELL !== 'undefined') {
                        LUCKY_HELL.start(room, winner, gameState.onGameEnd, {
                            onBanTemp: gameState.callbacks.onBanTemp
                        });
                    } else {
                        // Si no existe el módulo, terminar después de 30s
                        setTimeout(function() {
                            if (gameState.onGameEnd) {
                                gameState.onGameEnd();
                            }
                        }, 30000);
                    }
                }, 3000);
                break;
                
            case 'choose_dios_player':
                // CIAN: Escoge a alguien para que tire ruleta de dios
                room.sendAnnouncement("⭐ " + winner.name + " debe ESCOGER QUIEN TIRA LA RULETA DE DIOS", null, 0x00FFFF, "bold", 2);
                startSelection(room, 'choose_dios_player');
                break;
                
            default:
                finishEffect(room);
        }
    }
    
    function finishEffect(room) {
        // Detener el mapa después de ejecutar el efecto
        setTimeout(function() {
            if (gameState.active) {
                room.sendAnnouncement(
                    "⏸️ Mapa Lucky finalizado" + "\n" + "⏱️ Próximo minijuego en 3 segundos...",
                    null,
                    0xFFFF00,
                    "bold"
                );
                
                setTimeout(function() {
                    stop(room);
                }, 3000);
            }
        }, config.stopDelay);
    }
    
    function start(room, winner, onGameEnd, callbacks) {
        gameState.active = true;
        gameState.winner = winner;
        gameState.colorDetected = false;
        gameState.startTime = Date.now();
        gameState.onGameEnd = onGameEnd;
        gameState.detectionBuffer = [];
        gameState.lastDetectedZone = null;
        gameState.callbacks = callbacks || {};
        gameState.room = room;  // Guardar referencia
        
        console.log("🍀 Iniciando Lucky Map para: " + winner.name);
        
        // Timeout global: 60 segundos máximo
        gameState.globalTimeout = setTimeout(function() {
            if (gameState.active) {
                room.sendAnnouncement(
                    "⏱️ Tiempo agotado en Lucky! (60 segundos)",
                    null,
                    0xFF6600,
                    "bold",
                    2
                );
                stop(room);
                if (gameState.onGameEnd) {
                    gameState.onGameEnd();
                }
            }
        }, config.maxGameTime);
        
        // Esperar un poco antes de empezar a detectar (dar tiempo a que caiga)
        setTimeout(function() {
            if (gameState.active) {
                gameState.checkInterval = setInterval(function() {
                    detectColor(room);
                }, 100);
            }
        }, config.detectionDelay);
    }
    
    function stop(room, suppressCallback) {
        gameState.active = false;

        if (gameState.checkInterval) {
            clearInterval(gameState.checkInterval);
            gameState.checkInterval = null;
        }

        if (gameState.globalTimeout) {
            clearTimeout(gameState.globalTimeout);
            gameState.globalTimeout = null;
        }

        room.stopGame();
        console.log("🛑 Lucky Map detenido");

        // Llamar al callback para continuar con el siguiente minijuego
        if (!suppressCallback && gameState.onGameEnd) {
            var callback = gameState.onGameEnd;
            gameState.onGameEnd = null;
            try { callback(); } catch(e) { console.error('[LUCKY] onGameEnd callback error', e); }
        }
    }
    
    function isActive() {
        return gameState.active;
    }
    
    function onPlayerChat(player, message) {
        // Bloquear chat para todos durante la explicación de selección
        if (gameState.chatBlocked) return false;

        // Si hay una selección activa, reenviar el mensaje al manejador de selección
        // Solo permitir que el GANADOR escriba la opción; bloquear el chat público
        if (gameState.selectionActive && !gameState.explanationPhase) {
            if (player && gameState.winner && player.id === gameState.winner.id) {
                // Usar la referencia a room guardada en el estado
                handleSelectionInput(gameState.room, message);
            } else {
                if (gameState.room) {
                    gameState.room.sendAnnouncement(
                        "⛔ Solo el ganador puede elegir el número",
                        player.id,
                        0xFF6600
                    );
                }
            }
            return false; // bloquear el mensaje público
        }

        return true;
    }
    
    function setMaps(luck, dios, hell) {
        mapLuck = luck;
        mapLuckDios = dios;
        mapLuckHell = hell;
    }
    
    return {
        config: config,
        colorZones: colorZones,
        start: start,
        stop: stop,
        isActive: isActive,
        onPlayerChat: onPlayerChat,
        setMaps: setMaps
    };
})();


// ============================================
// MÓDULO: LUCKY HELL
// ============================================
// LUCKY_HELL - Ruleta del INFIERNO (simplificada)
const LUCKY_HELL = (function() {
    var map = null;
    var gameState = {
        active: false,
        currentPlayer: null,
        room: null,
        onGameEnd: null,
        callbacks: {},
        checkInterval: null,
        globalTimeout: null,
        detection: { zone: null, startTs: 0 },
        selection: { active: false, explanation: false, effect: null, timeout: null, reminderTimeout: null, playerList: [] }
    };

    var config = {
        detectionDelay: 1000,
        checkIntervalMs: 100,
        confirmationTime: 3000,
        maxGameTime: 60000,
        selectionTimeout: 10000,
        selectionReminder: 5000
    };

    // Zonas (curvas) - según coordenadas que enviaste
    // AZUL => ban 1min, VERDE => pasar, ROJO => cerrar sala
    var zones = [];

    // Ban (AZUL) -- 8 tramos
    var banCoords = [
        {a:[-7.38,338.96], b:[16.25,338.47]},
        {a:[41.25,338.47], b:[66.25,338.47]},
        {a:[91.25,338.47], b:[116.25,338.47]},
        {a:[141.25,338.47], b:[166.25,338.47]},
        {a:[211,338.47], b:[236,338.47]},
        {a:[261,338.47], b:[286,338.47]},
        {a:[311,338.47], b:[336,338.47]},
        {a:[361,338.47], b:[386,338.47]}
    ];

    banCoords.forEach(function(c,i){
        zones.push({
            name: 'BAN_'+(i+1),
            color: '0000FF',
            minX: Math.min(c.a[0], c.b[0]),
            maxX: Math.max(c.a[0], c.b[0]),
            minY: Math.min(c.a[1], c.b[1]),
            maxY: Math.max(c.a[1], c.b[1]),
            effect: 'ban_current',
            detectionType: 'curve',
            confirmationTime: config.confirmationTime
        });
    });

    // Pass (VERDE) -- 8 tramos (intercalados)
    var passCoords = [
        {a:[16.25,338.47], b:[41.25,338.47]},
        {a:[66.25,338.47], b:[91.25,338.47]},
        {a:[116.25,338.47], b:[141.25,338.47]},
        {a:[166.25,338.47], b:[211,338.47]},
        {a:[236,338.47], b:[261,338.47]},
        {a:[286,338.47], b:[311,338.47]},
        {a:[336,338.47], b:[361,338.47]},
        {a:[386,338.47], b:[408.49,338.47]}
    ];

    passCoords.forEach(function(c,i){
        zones.push({
            name: 'PASS_'+(i+1),
            color: '00FF00',
            minX: Math.min(c.a[0], c.b[0]),
            maxX: Math.max(c.a[0], c.b[0]),
            minY: Math.min(c.a[1], c.b[1]),
            maxY: Math.max(c.a[1], c.b[1]),
            effect: 'pass_hell',
            detectionType: 'curve',
            confirmationTime: config.confirmationTime
        });
    });

    // Close room (ROJO) - A(166.25,338.47) B(191.25,338.47)
    zones.push({
        name: 'CLOSE_ROOM',
        color: 'FF0000',
        minX: 166.25,
        maxX: 191.25,
        minY: 338.47,
        maxY: 338.47,
        effect: 'close_room',
        detectionType: 'curve',
        confirmationTime: config.confirmationTime
    });

    // Helper: in curve zone if x in range and y >= minY (ball below curve)
    function inZone(ball, z) {
        if (!ball) return false;
        return ball.x >= z.minX && ball.x <= z.maxX && ball.y >= (z.minY || 0);
    }

    function resetDetection() {
        gameState.detection.zone = null;
        gameState.detection.startTs = 0;
    }

    function detectLoop() {
        // no procesar nuevas detecciones mientras hay una selección activa
        if (gameState.selection && gameState.selection.active) return;
        if (!gameState.active || !gameState.room) return;
        var ball = gameState.room.getBallPosition();
        if (!ball) return;

        var found = null;
        for (var i=0;i<zones.length;i++){
            if (inZone(ball, zones[i])) { found = zones[i]; break; }
        }

        var now = Date.now();
        if (found) {
            if (!gameState.detection.zone || gameState.detection.zone.name !== found.name) {
                gameState.detection.zone = found;
                gameState.detection.startTs = now;
            } else {
                var elapsed = now - gameState.detection.startTs;
                var needed = found.confirmationTime || config.confirmationTime;
                if (elapsed >= needed) {
                    resetDetection();
                    executeEffect(gameState.room, found);
                }
            }
        } else {
            resetDetection();
        }
    }

    // Selection (for pass)
    function startSelection(room, effectType, effectData) {
        // evitar iniciar selección si ya hay una en curso
        if (gameState.selection && gameState.selection.active) return;
        try { lockTeamChanges(); } catch(e) {}
        gameState.selection.active = true;
        gameState.selection.explanation = true;
        gameState.selection.effect = { type: effectType, data: effectData };
        gameState.selection.playerList = room.getPlayerList().filter(function(p){ return p.id !== 0 && (!gameState.currentPlayer || p.id !== gameState.currentPlayer.id); });

        if (gameState.selection.playerList.length === 0) {
            room.sendAnnouncement('⚠️ No hay otros jugadores para seleccionar', null, 0xFF6600, 'bold');
            finishEffect(room);
            return;
        }

        room.pauseGame(true);
        if (gameState.currentPlayer) try { room.setPlayerTeam(gameState.currentPlayer.id, 0); } catch(e){}

        var parts = [];
        gameState.selection.playerList.forEach(function(p,i){ parts.push((i+1)+'.'+p.name); });
        var txt = '\n📋 JUGADORES: ' + parts.join('  |  ') + '\n\n📖 ' + (gameState.currentPlayer?gameState.currentPlayer.name:'GANADOR') + ', escribe el NÚMERO para PASAR';
        txt += '\n⏳ Espera 3 segundos para la explicación...';
        room.sendAnnouncement(txt, null, 0x00FF00, 'bold', 2);

        setTimeout(function(){
            gameState.selection.explanation = false;
            room.pauseGame(false);
            room.sendAnnouncement('⏱️ ¡AHORA! Escribe el NÚMERO ('+(config.selectionTimeout/1000)+'s)', null, 0x00FF00, 'bold', 2);

            gameState.selection.reminderTimeout = setTimeout(function(){
                if (gameState.selection.active) room.sendAnnouncement('⏰ ¡5 SEGUNDOS RESTANTES! Escribe el NÚMERO', (gameState.currentPlayer?gameState.currentPlayer.id:null), 0xFFFF00, 'bold');
            }, config.selectionReminder);

            gameState.selection.timeout = setTimeout(function(){
                if (gameState.selection.active) {
                    var r = gameState.selection.playerList[Math.floor(Math.random()*gameState.selection.playerList.length)];
                    room.sendAnnouncement('⏱️ Tiempo agotado - Selección ALEATORIA: '+r.name, null, 0xFF6600, 'bold');
                    cancelSelection();
                    executeSelectionEffect(room, r);
                }
            }, config.selectionTimeout);
        }, 3000);
    }

    function cancelSelection() {
        gameState.selection.active = false;
        gameState.selection.explanation = false;
        gameState.selection.playerList = [];
        if (gameState.selection.timeout) { clearTimeout(gameState.selection.timeout); gameState.selection.timeout = null; }
        if (gameState.selection.reminderTimeout) { clearTimeout(gameState.selection.reminderTimeout); gameState.selection.reminderTimeout = null; }
        if (gameState.room) {
            try { unlockTeamChanges(); gameState.room.pauseGame(false); if (gameState.currentPlayer) gameState.room.setPlayerTeam(gameState.currentPlayer.id,1); } catch(e){}
        }
    }

    function handleSelectionInput(room, message) {
        if (!gameState.selection.active || gameState.selection.explanation) return;
        var n = parseInt(message.trim());
        if (isNaN(n) || n < 1 || n > gameState.selection.playerList.length) {
            room.sendAnnouncement('❌ Número inválido. Escribe un número del 1 al '+gameState.selection.playerList.length, (gameState.currentPlayer?gameState.currentPlayer.id:null), 0xFF0000);
            return;
        }
        var sel = gameState.selection.playerList[n-1];
        if (sel) {
            room.sendAnnouncement('✅ '+(gameState.currentPlayer?gameState.currentPlayer.name:'Se eligió')+' seleccionó a '+sel.name, null, 0x00FF00, 'bold');
            cancelSelection();
            executeSelectionEffect(room, sel);
        }
    }

    function executeSelectionEffect(room, target) {
        var eff = gameState.selection.effect;
        if (!eff) { finishEffect(room); return; }
        switch(eff.type) {
            case 'pass_hell':
                room.sendAnnouncement('🔀 '+(gameState.currentPlayer?gameState.currentPlayer.name:'Jugador')+' le pasa LUCKY HELL a '+target.name, null, 0x00FF00, 'bold', 2);
                setTimeout(function(){
                    // Detener y recargar mapa, mover equipos: current -> espectador, target -> rojo
                    try { room.stopGame(); } catch(e){}
                    try { room.setCustomStadium(map); } catch(e){}
                    try { room.startGame(); } catch(e){}

                    if (gameState.currentPlayer) {
                        try { room.setPlayerTeam(gameState.currentPlayer.id, 0); } catch(e){}
                    }
                    try { room.setPlayerTeam(target.id, 1); } catch(e){}

                    gameState.currentPlayer = target;

                    // Reset detection/timers
                    resetDetection();
                    if (gameState.globalTimeout) { clearTimeout(gameState.globalTimeout); gameState.globalTimeout = null; }
                    gameState.globalTimeout = setTimeout(function(){ if (gameState.active) { room.sendAnnouncement('⏱️ Tiempo agotado en Lucky HELL!', null, 0xFF6600, 'bold'); stop(room); if (gameState.onGameEnd) gameState.onGameEnd(); } }, config.maxGameTime);
                    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
                    setTimeout(function(){ if (gameState.active) gameState.checkInterval = setInterval(detectLoop, config.checkIntervalMs); }, config.detectionDelay);
                },800);
                break;
            default:
                finishEffect(room);
        }
    }

    function executeEffect(room, zone) {
        var player = gameState.currentPlayer;
        switch(zone.effect) {
            case 'ban_current':
                if (!player) { finishEffect(room); return; }
                room.sendAnnouncement('⚔️ '+player.name+' ha sido BANEADO por 1 MINUTO (Lucky HELL)', null, 0x0000FF, 'bold', 2);
                if (gameState.callbacks && gameState.callbacks.onBanTemp) gameState.callbacks.onBanTemp(player.id, 60);
                finishEffect(room);
                break;

            case 'pass_hell':
                if (!player) { finishEffect(room); return; }
                room.sendAnnouncement('🔀 '+player.name+' cayó en zona VERDE: puede PASAR la RULETA', null, 0x00FF00, 'bold', 2);
                startSelection(room, 'pass_hell');
                break;

            case 'close_room':
                room.sendAnnouncement('🔴 Lucky HELL: Se cerrará la sala. Se kickeará a todos...', null, 0xFF0000, 'bold', 3);
                setTimeout(function(){
                    var pls = room.getPlayerList();
                    pls.forEach(function(p){
                        if (p && p.id !== 0) {
                            try { room.kickPlayer(p.id, 'Has sido kickeado por cierre de Lucky HELL', false); } catch(e){}
                        }
                    });
                    finishEffect(room);
                }, 2500);
                break;

            default:
                finishEffect(room);
        }
    }

    function finishEffect(room) {
        setTimeout(function(){
            if (!gameState.active) return;
            room.sendAnnouncement('⏸️ Lucky HELL finalizado\n⏱️ Próximo minijuego en 3 segundos...', null, 0xFFFF00, 'bold');
            setTimeout(function(){ stop(room); }, 3000);
        }, 1500);
    }

    function start(room, player, onGameEnd, callbacks) {
        gameState.active = true;
        gameState.room = room;
        gameState.currentPlayer = player;
        gameState.onGameEnd = onGameEnd;
        gameState.callbacks = callbacks || {};

        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
        if (gameState.globalTimeout) { clearTimeout(gameState.globalTimeout); gameState.globalTimeout = null; }

        room.sendAnnouncement('🔥 Iniciando LUCKY HELL para '+player.name, null, 0x9E9E9E, 'bold');
        // asegurar que el jugador quede en equipo ROJO (1)
        try { room.setPlayerTeam(player.id, 1); } catch(e) {}

        gameState.globalTimeout = setTimeout(function(){ if (gameState.active) { room.sendAnnouncement('⏱️ Tiempo agotado en Lucky HELL!', null, 0xFF6600, 'bold'); stop(room); if (gameState.onGameEnd) gameState.onGameEnd(); } }, config.maxGameTime);

        setTimeout(function(){ if (!gameState.active) return; if (gameState.checkInterval) clearInterval(gameState.checkInterval); gameState.checkInterval = setInterval(detectLoop, config.checkIntervalMs); }, config.detectionDelay);
    }

    function stop(room, suppressCallback) {
        gameState.active = false;
        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
        if (gameState.globalTimeout) { clearTimeout(gameState.globalTimeout); gameState.globalTimeout = null; }
        cancelSelection();
        try { room.stopGame(); } catch(e){}
        if (!suppressCallback && gameState.onGameEnd) { var cb = gameState.onGameEnd; gameState.onGameEnd = null; try { cb(); } catch(e){ console.error('[LUCKY_HELL] onGameEnd callback error', e); } }
        gameState.room = null; gameState.currentPlayer = null; resetDetection();
    }

    function isActive() { return gameState.active; }

    function onPlayerChat(player, message) {
        if (!gameState.active) return true;
        if (gameState.selection.active) {
            if (gameState.selection.explanation) return false;
            if (gameState.currentPlayer && player.id === gameState.currentPlayer.id) {
                handleSelectionInput(gameState.room, message);
            } else {
                if (gameState.room) gameState.room.sendAnnouncement('⛔ Solo el jugador con la ruleta puede elegir el número', player.id, 0xFF6600);
            }
            return false;
        }
        return true;
    }

    function setMap(m) { map = m; }

    return { start: start, stop: stop, isActive: isActive, onPlayerChat: onPlayerChat, setMap: setMap, config: config, zones: zones };
})();


// ============================================
// MÓDULO: LUCKY DIOS
// ============================================
// LUCKY_DIOS - Ruleta "Dios" basada en tu snippet
const LUCKY_DIOS = (function() {
    var mapLuckDios = null;
    var mapLuckNormal = null;
    var gameState = {
        active: false,
        currentPlayer: null, // jugador que tira
        room: null,
        onGameEnd: null,
        callbacks: {},
        checkInterval: null,
        globalTimeout: null,
        detection: {
            zone: null,
            startTs: 0
        },
        selection: {
            active: false,
            explanation: false,
            effect: null,
            timeout: null,
            reminderTimeout: null,
            playerList: []
        },
        kickCounters: {} // map playerId -> remaining kicks (si quieres persistir)
    };

    var config = {
        detectionDelay: 1000,
        checkIntervalMs: 100,
        maxGameTime: 60000,
        selectionTimeout: 10000,
        selectionReminder: 5000,
        defaultConfirmation: 3000
    };

    const colorZones = [
        {
            name: 'ROJO',
            color: 'FF1100',
            minX: 20.8,
            maxX: 55.76,
            minY: 350,
            maxY: 376.5,
            effect: 'receive_admin',
            needsSelection: false,
            confirmationTime: 3000,
            detectionType: 'platform'
        },
        {
            name: 'MAGENTA',
            color: 'EC08EC',
            minX: 92.27,
            maxX: 127.23,
            minY: 350,
            maxY: 375.5,
            effect: 'choose_ban_1min',
            needsSelection: true,
            confirmationTime: 3000,
            detectionType: 'platform'
        },
        {
            name: 'GRIS',
            color: '2A505E',
            minX: 166.86,
            maxX: 201.82,
            minY: 350,
            maxY: 375.5,
            effect: 'give_lucky_normal',
            needsSelection: true,
            confirmationTime: 3000,
            detectionType: 'platform'
        },
        {
            name: 'AZUL',
            color: '1B4BED',
            minX: 245.42,
            maxX: 280.38,
            minY: 350,
            maxY: 376.5,
            effect: 'choose_admin',
            needsSelection: true,
            confirmationTime: 3000,
            detectionType: 'platform'
        },
        {
            name: 'NARANJA',
            color: 'ED7006',
            minX: 317.44,
            maxX: 352.40,
            minY: 350,
            maxY: 377.5,
            effect: 'protection',
            needsSelection: false,
            confirmationTime: 3000,
            detectionType: 'platform'
        },
        {
            name: 'MARRON',
            color: '67290A',
            minX: 389.45,
            maxX: 424.42,
            minY: 350,
            maxY: 377.5,
            effect: 'kick_10_times',
            needsSelection: false,
            confirmationTime: 3000,
            detectionType: 'platform'
        },
        {
            name: 'SEGUNDO_ROJO',
            color: 'FF1100',
            minX: 454.6,
            maxX: 489.5,
            minY: 350,
            maxY: 378.5,
            effect: 'receive_admin',
            needsSelection: false,
            confirmationTime: 3000,
            detectionType: 'platform'
        },
        {
            name: 'VERDE_AMARILLO',
            color: 'CE004',
            minX: 140,
            maxX: 520,
            minY: 300,
            maxY: 1000,
            effect: 'pass_dios',
            needsSelection: true,
            confirmationTime: 3000,
            detectionType: 'curve'
        }
    ];

    // Helpers
    function inZone(ball, zone) {
        if (!ball) return false;
        // platform: strict rectangle
        if (zone.detectionType === 'platform') {
            return ball.x >= zone.minX && ball.x <= zone.maxX && ball.y >= zone.minY && ball.y <= zone.maxY;
        }
        // curve: allow if ball is below minY (under curve) and x within range
        if (zone.detectionType === 'curve') {
            return ball.x >= zone.minX && ball.x <= zone.maxX && ball.y >= zone.minY;
        }
        // fallback rectangle
        return ball.x >= zone.minX && ball.x <= zone.maxX && ball.y >= zone.minY && ball.y <= zone.maxY;
    }

    function resetDetection() {
        gameState.detection.zone = null;
        gameState.detection.startTs = 0;
    }

    // Detección periódica con confirmación por tiempo
    function detectLoop() {
        // no procesar nuevas detecciones mientras hay una selección activa
        if (gameState.selection && gameState.selection.active) return;
        if (!gameState.active) return;
        var room = gameState.room;
        if (!room) return;
        var ball = room.getBallPosition();
        if (!ball) return;

        var found = null;
        for (var i = 0; i < colorZones.length; i++) {
            var z = colorZones[i];
            if (inZone(ball, z)) {
                found = z;
                break;
            }
        }

        var now = Date.now();
        if (found) {
            if (!gameState.detection.zone || gameState.detection.zone.name !== found.name) {
                // nueva detección
                gameState.detection.zone = found;
                gameState.detection.startTs = now;
            } else {
                var elapsed = now - gameState.detection.startTs;
                var needed = found.confirmationTime || config.defaultConfirmation;
                if (elapsed >= needed) {
                    // confirmar y ejecutar efecto
                    // reset para evitar re-ejecución inmediata
                    resetDetection();
                    executeEffect(room, found);
                }
            }
        } else {
            resetDetection();
        }
    }

    // Selección de jugadores (misma UX que Lucky)
    function startSelection(room, effectType, effectData) {
        // evitar iniciar selección si ya hay una en curso
        if (gameState.selection && gameState.selection.active) return;
        gameState.selection.active = true;
        gameState.selection.explanation = true;
        gameState.selection.effect = { type: effectType, data: effectData };
        gameState.selection.playerList = room.getPlayerList().filter(function(p) {
            return p.id !== 0 && (!gameState.currentPlayer || p.id !== gameState.currentPlayer.id);
        });

        if (gameState.selection.playerList.length === 0) {
            room.sendAnnouncement("⚠️ No hay otros jugadores para seleccionar", null, 0xFF6600, "bold");
            finishEffect(room);
            return;
        }

        // Pausar juego durante explicación y mover currentPlayer a espectador para evitar solapamientos
        room.pauseGame(true);
        try { lockTeamChanges(); } catch(e) {}
        if (gameState.currentPlayer) {
            try { room.setPlayerTeam(gameState.currentPlayer.id, 0); } catch(e) {}
        }

        var purpose = "";
        switch(effectType) {
            case 'choose_ban_1min': purpose = "para BANEAR por 1 minuto"; break;
            case 'choose_admin': purpose = "para dar ADMIN"; break;
            case 'give_lucky_normal': purpose = "para recibir LUCKY NORMAL"; break;
            case 'pass_dios': purpose = "para recibir la RULETA DIOS"; break;
            default: purpose = "para seleccionar";
        }

        var playerListStr = "\n📋 JUGADORES: ";
        var parts = [];
        gameState.selection.playerList.forEach(function(p,i){ parts.push((i+1)+"."+p.name); });
        playerListStr += parts.join("  |  ");
        playerListStr += "\n\n📖 " + (gameState.currentPlayer ? gameState.currentPlayer.name : "GANADOR") + ", escribe el NÚMERO " + purpose;
        playerListStr += "\n⏳ Espera 3 segundos para la explicación...";

        room.sendAnnouncement(playerListStr, null, 0xFFFF00, "bold", 2);

        setTimeout(function() {
            gameState.selection.explanation = false;
            room.pauseGame(false);
            room.sendAnnouncement("⏱️ ¡AHORA! Escribe el NÚMERO (" + (config.selectionTimeout/1000) + " segundos)", null, 0x00FF00, "bold", 2);

            gameState.selection.reminderTimeout = setTimeout(function() {
                if (gameState.selection.active) {
                    room.sendAnnouncement("⏰ ¡5 SEGUNDOS RESTANTES! Escribe el NÚMERO", (gameState.currentPlayer ? gameState.currentPlayer.id : null), 0xFFFF00, "bold");
                }
            }, config.selectionReminder);

            gameState.selection.timeout = setTimeout(function() {
                if (gameState.selection.active) {
                    var randomPlayer = gameState.selection.playerList[Math.floor(Math.random()*gameState.selection.playerList.length)];
                    room.sendAnnouncement("⏱️ Tiempo agotado - Selección ALEATORIA: " + randomPlayer.name, null, 0xFF6600, "bold");
                    cancelSelection();
                    executeSelectionEffect(room, randomPlayer);
                }
            }, config.selectionTimeout);
        }, 3000);
    }

    function cancelSelection() {
        gameState.selection.active = false;
        gameState.selection.explanation = false;
        gameState.selection.playerList = [];
        if (gameState.selection.timeout) { clearTimeout(gameState.selection.timeout); gameState.selection.timeout = null; }
        if (gameState.selection.reminderTimeout) { clearTimeout(gameState.selection.reminderTimeout); gameState.selection.reminderTimeout = null; }
        // reanudar juego y restaurar equipo del currentPlayer si existe
        if (gameState.room) {
            try {
                try { unlockTeamChanges(); } catch(e) {}
                gameState.room.pauseGame(false);
                if (gameState.currentPlayer) {
                    gameState.room.setPlayerTeam(gameState.currentPlayer.id, 1);
                }
            } catch (e) {}
        }
    }

    function handleSelectionInput(room, message) {
        if (!gameState.selection.active || gameState.selection.explanation) return;
        var selectedNumber = parseInt(message.trim());
        if (isNaN(selectedNumber) || selectedNumber < 1 || selectedNumber > gameState.selection.playerList.length) {
            room.sendAnnouncement("❌ Número inválido. Escribe un número del 1 al " + gameState.selection.playerList.length, (gameState.currentPlayer ? gameState.currentPlayer.id : null), 0xFF0000);
            return;
        }
        var selectedPlayer = gameState.selection.playerList[selectedNumber - 1];
        if (selectedPlayer) {
            room.sendAnnouncement("✅ " + (gameState.currentPlayer ? gameState.currentPlayer.name : "Se eligió") + " seleccionó a " + selectedPlayer.name, null, 0x00FF00, "bold");
            cancelSelection();
            executeSelectionEffect(room, selectedPlayer);
        }
    }

    function executeSelectionEffect(room, targetPlayer) {
        var effect = gameState.selection.effect;
        if (!effect) {
            finishEffect(room);
            return;
        }

        switch(effect.type) {
            case 'choose_ban_1min':
                room.sendAnnouncement("⚔️ " + targetPlayer.name + " ha sido BANEADO por 1 MINUTO (elegido por " + gameState.currentPlayer.name + ")", null, 0xD2AB0B, "bold", 2);
                if (gameState.callbacks.onBanTemp) gameState.callbacks.onBanTemp(targetPlayer.id, 60);
                finishEffect(room);
                break;

            case 'choose_admin':
                room.sendAnnouncement("👑 " + targetPlayer.name + " recibe ADMIN temporal (otorgado por " + gameState.currentPlayer.name + ")", null, 0xFF0000, "bold", 2);
                room.sendAnnouncement("⚠️ Admin temporal: NO puedes kickear, banear ni cambiar mapas", targetPlayer.id, 0xFFFF00, "bold");
                room.setPlayerAdmin(targetPlayer.id, true);
                if (gameState.callbacks.onTempAdmin) gameState.callbacks.onTempAdmin(targetPlayer.id);
                finishEffect(room);
                break;

            case 'give_lucky_normal':
                room.sendAnnouncement("🎯 " + targetPlayer.name + " recibirá LUCKY NORMAL (elegido por " + gameState.currentPlayer.name + ")", null, 0x2A505E, "bold", 2);
                setTimeout(function() {
                    // Invocar lucky normal (LUCKY) si existe
                    stop(room, true);
                    try {
                        room.stopGame();
                        if (typeof LUCKY !== 'undefined' && LUCKY.start) {
                            // usar el mapa normal si se proporcionó, si no, usar el mapa dios como fallback
                            var stadium = mapLuckNormal || mapLuckDios || null;
                            if (stadium) room.setCustomStadium(stadium);
                            room.startGame();
                            // start normal lucky for that player
                            LUCKY.start(room, targetPlayer, gameState.onGameEnd, gameState.callbacks);
                        } else {
                            finishEffect(room);
                        }
                    } catch(e) { finishEffect(room); }
                }, 1000);
                break;

            case 'pass_dios':
                room.sendAnnouncement("🔀 " + gameState.currentPlayer.name + " le pasa la RULETA DIOS a " + targetPlayer.name, null, 0xCE004, "bold", 2);
                setTimeout(function() {
                    // Detener y recargar mapa, mover equipos: current -> espectador, target -> rojo
                    try { room.stopGame(); } catch(e){}
                    try { room.setCustomStadium(mapLuckDios); } catch(e){}
                    try { room.startGame(); } catch(e){}

                    // mover quien pasa a espectador
                    if (gameState.currentPlayer) {
                        try { room.setPlayerTeam(gameState.currentPlayer.id, 0); } catch(e){}
                    }
                    // poner receptor en equipo rojo (1)
                    try { room.setPlayerTeam(targetPlayer.id, 1); } catch(e){}

                    // actualizar currentPlayer
                    gameState.currentPlayer = targetPlayer;

                    // Reset timers and detection
                    resetDetection();
                    if (gameState.globalTimeout) { clearTimeout(gameState.globalTimeout); gameState.globalTimeout = null; }
                    gameState.globalTimeout = setTimeout(function() {
                        if (gameState.active) {
                            room.sendAnnouncement("⏱️ Tiempo agotado en Lucky DIOS!", null, 0xFF6600, "bold");
                            stop(room);
                            if (gameState.onGameEnd) gameState.onGameEnd();
                        }
                    }, config.maxGameTime);
                    if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
                    setTimeout(function() {
                        if (gameState.active) {
                            gameState.checkInterval = setInterval(detectLoop, config.checkIntervalMs);
                        }
                    }, config.detectionDelay);
                }, 800);
                break;

            default:
                finishEffect(room);
        }
    }

    // Ejecutar efectos no selectivos
    function executeEffect(room, zone) {
        var effect = zone.effect;
        var player = gameState.currentPlayer;

        room.sendAnnouncement("🎯 Color confirmado: " + zone.name + " (" + zone.color + ")", null, 0xFFFFFF, "bold");

        switch(effect) {
            case 'receive_admin':
                room.sendAnnouncement("👑 " + player.name + " recibe ADMIN temporal!", null, 0xFF1100, "bold", 2);
                room.sendAnnouncement("⚠️ Admin temporal: NO puedes kickear, banear ni cambiar mapas", player.id, 0xFFFF00, "bold");
                try { room.setPlayerAdmin(player.id, true); } catch(e){}
                if (gameState.callbacks.onTempAdmin) gameState.callbacks.onTempAdmin(player.id);
                finishEffect(room);
                break;

            case 'choose_ban_1min':
                room.sendAnnouncement("⚔️ " + player.name + " cayó en MAGENTA: debe ESCOGER a quien BANEAR", null, 0xEC08EC, "bold", 2);
                startSelection(room, 'choose_ban_1min');
                break;

            case 'give_lucky_normal':
                room.sendAnnouncement("⭐ " + player.name + " cayó en GRIS: debe elegir quién recibe LUCKY NORMAL", null, 0x2A505E, "bold", 2);
                startSelection(room, 'give_lucky_normal');
                break;

            case 'choose_admin':
                room.sendAnnouncement("👑 " + player.name + " cayó en AZUL: debe ESCOGER a quien dar ADMIN", null, 0x1B4BED, "bold", 2);
                startSelection(room, 'choose_admin');
                break;

            case 'protection':
                room.sendAnnouncement("🛡️ " + player.name + " ¡SALVADO POR EL CONDÓN! 🛡️", null, 0xED7006, "bold", 2);
                finishEffect(room);
                break;

            case 'kick_10_times':
                room.sendAnnouncement("🔨 " + player.name + " ha caído en MARRÓN: recibirá hasta 10 KICKS", null, 0x67290A, "bold", 2);
                // start kicking attempts
                var remaining = 10;
                gameState.kickCounters[player.id] = remaining;
                (function doKicks(pid) {
                    if (!gameState.active) return;
                    var p = room.getPlayer(pid);
                    if (!p) {
                        // jugador no está en sala; detener
                        return;
                    }
                    var rem = gameState.kickCounters[pid] || 0;
                    if (rem <= 0) {
                        room.sendAnnouncement("✅ " + p.name + " ya recibió todos los kicks.", null, 0xFF6600, "bold");
                        delete gameState.kickCounters[pid];
                        finishEffect(room);
                        return;
                    }
                    room.sendAnnouncement("⚠️ Kick a " + p.name + " (" + rem + " restantes)", null, 0x67290A, "bold");
                    try { room.kickPlayer(pid, "Kick por caer en MARRÓN (" + rem + " restantes)", false); } catch(e) {}
                    gameState.kickCounters[pid] = rem - 1;

                    // esperar 1.2s y verificar si sigue en sala; si volvió o sigue, intentar de nuevo
                    setTimeout(function() {
                        var exists = room.getPlayer(pid);
                        if (!exists) {
                            // si no está, intentar de nuevo al reconectar no es trivial; terminamos por ahora
                            // notificamos cuantos quedaron
                            // guardamos contador para posteriores lógicas si quisieras implementarlo
                            room.sendAnnouncement("ℹ️ " + p.name + " fue kickeado. Quedan " + (gameState.kickCounters[pid] || 0) + " kicks pendientes si vuelve.", null, 0xFF6600);
                            finishEffect(room);
                            return;
                        }
                        // si aún está, continuar
                        doKicks(pid);
                    }, 1200);
                })(player.id);
                break;

            case 'pass_dios':
                room.sendAnnouncement("🔀 " + player.name + " puede PASAR la RULETA DIOS", null, 0xCE004, "bold", 2);
                startSelection(room, 'pass_dios');
                break;

            default:
                finishEffect(room);
        }
    }

    function finishEffect(room) {
        // Esperar un poco y continuar (no detener la ruleta DIOS automáticamente si la intención es seguir)
        setTimeout(function() {
            if (!gameState.active) return;
            room.sendAnnouncement("⏸️ Lucky DIOS finalizado\n⏱️ Próximo minijuego en 3 segundos...", null, 0xFFFF00, "bold");
            setTimeout(function() {
                stop(room);
            }, 3000);
        }, 1500);
    }

    function start(room, player, onGameEnd, callbacks) {
        gameState.active = true;
        gameState.room = room;
        gameState.currentPlayer = player;
        gameState.onGameEnd = onGameEnd;
        gameState.callbacks = callbacks || {};

        // limpiar posibles intervalos previos
        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
        if (gameState.globalTimeout) { clearTimeout(gameState.globalTimeout); gameState.globalTimeout = null; }

        room.sendAnnouncement("✨ Iniciando LUCKY DIOS para " + player.name, null, 0xAC6FF3, "bold");
        // Asegurar que el jugador que tira quede en equipo ROJO (1)
        try { room.setPlayerTeam(player.id, 1); } catch(e) {}
        // Timeout global
        gameState.globalTimeout = setTimeout(function() {
            if (!gameState.active) return;
            room.sendAnnouncement("⏱️ Tiempo agotado en Lucky DIOS!", null, 0xFF6600, "bold");
            stop(room);
            if (gameState.onGameEnd) gameState.onGameEnd();
        }, config.maxGameTime);

        // iniciar detección después de delay
        setTimeout(function() {
            if (!gameState.active) return;
            // asegurar único interval
            if (gameState.checkInterval) clearInterval(gameState.checkInterval);
            gameState.checkInterval = setInterval(detectLoop, config.checkIntervalMs);
        }, config.detectionDelay);
    }

    function stop(room, suppressCallback) {
        gameState.active = false;

        if (gameState.checkInterval) { clearInterval(gameState.checkInterval); gameState.checkInterval = null; }
        if (gameState.globalTimeout) { clearTimeout(gameState.globalTimeout); gameState.globalTimeout = null; }

        // limpiar selección si activa
        cancelSelection();

        try { room.stopGame(); } catch(e){}

        if (!suppressCallback && gameState.onGameEnd) {
            var cb = gameState.onGameEnd;
            gameState.onGameEnd = null;
            try { cb(); } catch(e) { console.error('[LUCKY_DIOS] onGameEnd callback error', e); }
        }
        // reset state
        gameState.room = null;
        gameState.currentPlayer = null;
    }

    function isActive() { return gameState.active; }

    // Manejo de chat para selecciones: solo permitir que currentPlayer escriba durante selección
    function onPlayerChat(player, message) {
        if (!gameState.active) return true;
        if (gameState.selection.active) {
            if (gameState.selection.explanation) return false; // bloquear todo
            if (gameState.currentPlayer && player.id === gameState.currentPlayer.id) {
                handleSelectionInput(gameState.room, message);
            } else {
                if (gameState.room) gameState.room.sendAnnouncement("⛔ Solo el jugador con la ruleta puede elegir el número", player.id, 0xFF6600);
            }
            return false;
        }
        return true;
    }

    function setMap(map) { mapLuckDios = map; }

    function setMaps(diosMap, normalMap) {
        mapLuckDios = diosMap;
        mapLuckNormal = normalMap;
    }

    return {
        start: start,
        stop: stop,
        isActive: isActive,
        onPlayerChat: onPlayerChat,
        setMap: setMap,
        setMaps: setMaps,
        config: config,
        zones: colorZones
    };
})();

var roomConfig = {
    roomName: "Minijuegos + lucky",
    maxPlayers: 20,
    public: true,
    token: "thr1.AAAAAGl_okIBMBkfgD5Nuw._Rjq_nJJiH4",
    noPlayer: true
};

var room = HBInit(roomConfig);
room.setTeamsLock(true);

console.log("✅ Bot iniciado");
console.log("🔗 Link: " + room.link);
// Asegurar que la sala no tenga límite de tiempo ni de goles
try { if (typeof room !== 'undefined') { if (room.setTimeLimit) room.setTimeLimit(0); if (room.setScoreLimit) room.setScoreLimit(0); } } catch(e) {}

// ============================================
// SISTEMA DE OWNER (DUEÑO)
// ============================================
var OWNER_AUTH = "JHcYct4vfesGbi6tGaauh08AxSwWnZq3QCm4rnzn2GE";

// Estado del bot
var botState = {
    gameActive: false,
    startTimeout: null,
    tempAdmins: [],  // Admins temporales
    bannedPlayers: [],  // Jugadores baneados temporalmente
    spectatorNext: [],  // Jugadores que deben estar en espectador el siguiente minijuego
    chatBlocked: false,  // Bloqueo de chat temporal para anuncios
    banTimers: {},  // Timers de unban individuales por jugador
    lastKickBy: {}, // timestamps of last kick action by admin id
    teamLock: false, // si true, se evita que jugadores cambien equipo via UI
    discordCooldowns: {}, // Timestamps de último uso del comando !discord por jugador
    lastMinigame: null, // Último minijuego jugado para evitar repeticiones
    pendingAnnouncement: false // Si true, hay un anuncio pendiente por haber sido omitido
};

// Invite de Discord (usado por comando !discord)
var DISCORD_INVITE = "https://discord.gg/ACpTeXu7Pj";

// Cargar mapas Lucky
var mapLuck = "\"{\\\"name\\\":\\\"Lucky Map 2 by Meeelany [\\\\u029c\\\\u1d00x\\\\u1d0d\\\\u1d0f\\\\u1d05s.\\\\u1d04\\\\u1d0f\\\\u1d0d]\\\",\\\"width\\\":450,\\\"height\\\":370,\\\"cameraWidth\\\":0,\\\"cameraHeight\\\":0,\\\"maxViewWidth\\\":0,\\\"cameraFollow\\\":\\\"player\\\",\\\"spawnDistance\\\":170,\\\"redSpawnPoints\\\":[[-230,-180]],\\\"blueSpawnPoints\\\":[[160,0]],\\\"canBeStored\\\":true,\\\"kickOffReset\\\":\\\"partial\\\",\\\"bg\\\":{\\\"color\\\":\\\"6753AD\\\",\\\"type\\\":\\\"\\\"},\\\"traits\\\":{\\\"ballArea\\\":{\\\"vis\\\":false,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\"]},\\\"goalPost\\\":{\\\"radius\\\":8,\\\"invMass\\\":0,\\\"bCoef\\\":0.5},\\\"goalNet\\\":{\\\"vis\\\":true,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"ball\\\"]},\\\"kickOffBarrier\\\":{\\\"vis\\\":false,\\\"bCoef\\\":0.1,\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]}},\\\"vertexes\\\":[{\\\"x\\\":-224.26904758895245,\\\"y\\\":259.94250690430385,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"ffffff\\\",\\\"curve\\\":0,\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-213.88423746237018,\\\"y\\\":259.94250690430385,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"ffffff\\\",\\\"curve\\\":0,\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-213.88423746237018,\\\"y\\\":319.28427905620254,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"ffffff\\\",\\\"curve\\\":0,\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-224.26904758895245,\\\"y\\\":319.28427905620254,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"ffffff\\\",\\\"curve\\\":0,\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-239.10449062692712,\\\"y\\\":271.8108613346836,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"ffffff\\\",\\\"curve\\\":0,\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-199.04879442439548,\\\"y\\\":271.8108613346836,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"ffffff\\\",\\\"curve\\\":0,\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-199.04879442439548,\\\"y\\\":282.1956714612658,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"ffffff\\\",\\\"curve\\\":0,\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-239.10449062692712,\\\"y\\\":282.1956714612658,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"ffffff\\\",\\\"curve\\\":0,\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-313.2817058168006,\\\"y\\\":319.28427905620254,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-10,\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-298.4462627788258,\\\"y\\\":259.94250690430385,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-10,\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-283.6108197408512,\\\"y\\\":319.28427905620254,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-10,\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-320.69942733578785,\\\"y\\\":282.1956714612658,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-10,\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-276.1930982218638,\\\"y\\\":282.1956714612658,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-10,\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-338.32871036037534,\\\"y\\\":-307.6457267639441,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":180,\\\"color\\\":\\\"8B0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-332.71321971383776,\\\"y\\\":-330.1076893500944,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8B0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-327.0977290673002,\\\"y\\\":-307.6457267639441,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":180,\\\"color\\\":\\\"8B0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-316.98940874016523,\\\"y\\\":-330.10768935009435,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8B0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-316.98940874016523,\\\"y\\\":-307.645726763944,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8B0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-299.5536379041398,\\\"y\\\":-307.9059621495564,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"8B0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-299.5536379041398,\\\"y\\\":-330.3679247357067,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"8B0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-293.9381472576022,\\\"y\\\":-319.13694344263155,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"8B0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-288.32265661106464,\\\"y\\\":-330.3679247357067,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"8B0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-288.32265661106464,\\\"y\\\":-307.9059621495564,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"8B0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-337.5056030736755,\\\"y\\\":-292.3523578713767,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-337.5056030736755,\\\"y\\\":-269.8903952852264,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-326.27462178060034,\\\"y\\\":-269.8903952852264,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-337.5056030736755,\\\"y\\\":-280.81334021449925,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-331.8901124271379,\\\"y\\\":-280.81334021449925,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-326.27462178060034,\\\"y\\\":-292.3523578713767,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-296.50158064661383,\\\"y\\\":-229.49423408616624,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF8C00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-296.50158064661383,\\\"y\\\":-251.95619667231657,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF8C00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-285.27059935353867,\\\"y\\\":-229.49423408616624,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF8C00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-285.27059935353867,\\\"y\\\":-251.95619667231657,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF8C00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-337.9469910865436,\\\"y\\\":-173.49301540537394,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFF00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-337.9469910865436,\\\"y\\\":-151.03105281922365,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFF00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-337.9469910865436,\\\"y\\\":-162.26203411229883,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFF00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-326.71600979346846,\\\"y\\\":-173.49301540537394,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFF00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-326.71600979346846,\\\"y\\\":-151.03105281922365,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFF00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-316.35478610705206,\\\"y\\\":-173.25205671499216,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFF00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-316.35478610705206,\\\"y\\\":-150.79009412884182,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFF00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-293.3780446823259,\\\"y\\\":-171.06010394869918,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":90,\\\"color\\\":\\\"FFFF00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-293.3780446823259,\\\"y\\\":-154.21363200908644,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-90,\\\"color\\\":\\\"FFFF00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-300.2982936216126,\\\"y\\\":-86.4436077112845,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"00FFFF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-300.2982936216126,\\\"y\\\":-65.1047432544417,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"00FFFF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-295.8059011043825,\\\"y\\\":-76.33572454751686,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"00FFFF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-289.0673123285374,\\\"y\\\":-65.1047432544417,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"00FFFF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-268.1483348121749,\\\"y\\\":-86.8655732850392,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"00FFFF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-268.1483348121749,\\\"y\\\":-64.40361069888885,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"00FFFF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-256.9173535190997,\\\"y\\\":-64.40361069888885,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"00FFFF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-340.8025269018594,\\\"y\\\":3.0103344789363504,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"0000FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-340.8025269018594,\\\"y\\\":14.241315772011497,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"0000FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-340.8025269018594,\\\"y\\\":25.472297065086657,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"0000FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-299.0651156024811,\\\"y\\\":2.055999272818859,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":100,\\\"color\\\":\\\"0000FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-282.67486645169174,\\\"y\\\":1.578831669760099,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"0000FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-282.67486645169174,\\\"y\\\":24.040794255910406,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"0000FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-288.2903570982293,\\\"y\\\":1.578831669760099,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"0000FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-277.05937580515416,\\\"y\\\":1.578831669760099,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"0000FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-299.0651156024811,\\\"y\\\":24.517961858969166,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":100,\\\"color\\\":\\\"0000FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-298.3884434160347,\\\"y\\\":49.57263651734863,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-210,\\\"color\\\":\\\"7400FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-303.3582234672315,\\\"y\\\":59.51219661974207,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":210,\\\"color\\\":\\\"7400FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-308.3280035184282,\\\"y\\\":69.45175672213551,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":210,\\\"color\\\":\\\"7400FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-326.0151657897859,\\\"y\\\":99.11330653505868,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-311,\\\"color\\\":\\\"FFC0CB\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-323.49700341487465,\\\"y\\\":106.57130346835166,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-311,\\\"color\\\":\\\"FFC0CB\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-333.53806789742697,\\\"y\\\":106.57130346835166,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"FFC0CB\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-296.0315394451972,\\\"y\\\":93.45851423902641,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"FFC0CB\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-290.41604879865963,\\\"y\\\":102.44329927348653,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"FFC0CB\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-284.80055815212205,\\\"y\\\":93.45851423902641,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"FFC0CB\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-290.41604879865963,\\\"y\\\":117.4662112038917,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"FFC0CB\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-283.2908081683169,\\\"y\\\":140.29959986605303,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-272.05982687524175,\\\"y\\\":140.29959986605303,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-283.2908081683169,\\\"y\\\":159.39226806428078,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-180,\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-264.7749563878461,\\\"y\\\":139.49048749710184,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-264.7749563878461,\\\"y\\\":156.3369594367146,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-180,\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-253.54397509477096,\\\"y\\\":156.3369594367146,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-180,\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-253.54397509477096,\\\"y\\\":139.49048749710184,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-370,\\\"y\\\":-370,\\\"color\\\":\\\"000000\\\"},{\\\"x\\\":450,\\\"y\\\":-370,\\\"dist\\\":-450},{\\\"x\\\":450,\\\"y\\\":370,\\\"curve\\\":0,\\\"dist\\\":-450},{\\\"x\\\":-370,\\\"y\\\":370,\\\"curve\\\":0,\\\"color\\\":\\\"000000\\\"},{\\\"x\\\":-150,\\\"y\\\":369,\\\"color\\\":\\\"000000\\\"},{\\\"x\\\":-150,\\\"y\\\":-291,\\\"color\\\":\\\"000000\\\"},{\\\"x\\\":-110,\\\"y\\\":330,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":-110,\\\"y\\\":370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":-70,\\\"y\\\":330,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":-70,\\\"y\\\":370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":-30,\\\"y\\\":330,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":-30,\\\"y\\\":370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":10,\\\"y\\\":330,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":10,\\\"y\\\":370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":50,\\\"y\\\":330,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":50,\\\"y\\\":370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":90,\\\"y\\\":330,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":90,\\\"y\\\":370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":130,\\\"y\\\":330,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":130,\\\"y\\\":370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":170,\\\"y\\\":330,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":170,\\\"y\\\":370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":210,\\\"y\\\":330,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":210,\\\"y\\\":370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":250,\\\"y\\\":330,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":250,\\\"y\\\":370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":290,\\\"y\\\":330,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":290,\\\"y\\\":370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":330,\\\"y\\\":330,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":330,\\\"y\\\":370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":-150,\\\"y\\\":330,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"bias\\\":-5},{\\\"x\\\":450,\\\"y\\\":330,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"bias\\\":-5},{\\\"x\\\":145,\\\"y\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":180,\\\"radius\\\":15},{\\\"x\\\":175,\\\"y\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":180},{\\\"x\\\":370,\\\"y\\\":330,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":370,\\\"y\\\":370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":410,\\\"y\\\":330,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":410,\\\"y\\\":370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"x\\\":350,\\\"y\\\":315.2853851067946,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"vis\\\":false},{\\\"x\\\":350,\\\"y\\\":265.2853851067946,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"vis\\\":false},{\\\"x\\\":-50,\\\"y\\\":315.2853851067946,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"vis\\\":false},{\\\"x\\\":-50,\\\"y\\\":265.2853851067946,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"vis\\\":false},{\\\"x\\\":70,\\\"y\\\":315.2853851067946,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"vis\\\":false},{\\\"x\\\":70,\\\"y\\\":265.2853851067946,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"vis\\\":false},{\\\"x\\\":230,\\\"y\\\":315.2853851067946,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"vis\\\":false},{\\\"x\\\":230,\\\"y\\\":265.2853851067946,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"vis\\\":false},{\\\"x\\\":-306.57681219831863,\\\"y\\\":-269.30331957794454,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":180,\\\"color\\\":\\\"FF0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-300.96132155178105,\\\"y\\\":-291.76528216409486,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-295.3458309052435,\\\"y\\\":-269.30331957794454,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":180,\\\"color\\\":\\\"FF0000\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-317.8983588950318,\\\"y\\\":-230.14987736232717,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":180,\\\"color\\\":\\\"FF8C00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-312.2828682484942,\\\"y\\\":-252.6118399484775,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF8C00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-306.6673776019566,\\\"y\\\":-230.14987736232717,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":180,\\\"color\\\":\\\"FF8C00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-337.6730670842144,\\\"y\\\":-253.94334574931992,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"FF8C00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-337.6730670842144,\\\"y\\\":-231.4813831631696,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-200,\\\"color\\\":\\\"FF8C00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-330.93447830836925,\\\"y\\\":-242.71236445624476,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-200,\\\"color\\\":\\\"FF8C00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-338.3826018358108,\\\"y\\\":-211.50170999523053,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"D2AB0B\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-338.3826018358108,\\\"y\\\":-189.03974740908023,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"D2AB0B\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-327.15162054273566,\\\"y\\\":-189.03974740908023,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"D2AB0B\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-338.3826018358108,\\\"y\\\":-199.9626923383531,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"D2AB0B\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-332.76711118927324,\\\"y\\\":-199.9626923383531,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"D2AB0B\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-327.15162054273566,\\\"y\\\":-211.50170999523053,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"D2AB0B\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-305.9952796461139,\\\"y\\\":-211.29895123782617,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"D2AB0B\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-305.9952796461139,\\\"y\\\":-188.83698865167588,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-200,\\\"color\\\":\\\"D2AB0B\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-299.25669087026876,\\\"y\\\":-200.067969944751,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-200,\\\"color\\\":\\\"D2AB0B\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-283.42247309305054,\\\"y\\\":-174.10144157316935,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFF00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-283.42247309305054,\\\"y\\\":-151.6394789870191,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFF00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-283.42247309305054,\\\"y\\\":-162.87046028009425,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFF00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-272.1914917999754,\\\"y\\\":-174.10144157316935,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFF00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-272.1914917999754,\\\"y\\\":-151.6394789870191,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFF00\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-303.8713286930477,\\\"y\\\":-131.53463453986492,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"4BE608\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-303.8713286930477,\\\"y\\\":-109.07267195371466,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"4BE608\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-303.8713286930477,\\\"y\\\":-120.30365324678984,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"4BE608\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-292.6403473999726,\\\"y\\\":-131.53463453986492,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"4BE608\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-292.6403473999726,\\\"y\\\":-109.07267195371466,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"4BE608\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-338.69275095749913,\\\"y\\\":-130.79479497691673,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"4BE608\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-338.69275095749913,\\\"y\\\":-108.33283239076643,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"4BE608\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-327.46176966442397,\\\"y\\\":-108.33283239076643,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"4BE608\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-338.69275095749913,\\\"y\\\":-119.2557773200393,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"4BE608\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-333.07726031096155,\\\"y\\\":-119.2557773200393,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"4BE608\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-327.46176966442397,\\\"y\\\":-130.79479497691673,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"4BE608\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-321.75704633723126,\\\"y\\\":-65.1823192334759,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":180,\\\"color\\\":\\\"00FFFF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-316.1415556906937,\\\"y\\\":-87.6442818196262,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"00FFFF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-310.5260650441561,\\\"y\\\":-65.1823192334759,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":180,\\\"color\\\":\\\"00FFFF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-339.1523311549604,\\\"y\\\":-88.40846155512597,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"00FFFF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-339.1523311549604,\\\"y\\\":-65.94649896897566,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"00FFFF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-322.9831824019929,\\\"y\\\":3.4922731942479075,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"0000FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-322.9831824019929,\\\"y\\\":24.831137651090692,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"0000FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-318.4907898847629,\\\"y\\\":13.600156358015546,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"0000FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-311.75220110891775,\\\"y\\\":24.831137651090692,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"0000FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-283.15269543134957,\\\"y\\\":49.757448862068316,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-210,\\\"color\\\":\\\"7400FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-288.1224754825464,\\\"y\\\":59.69700896446179,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":210,\\\"color\\\":\\\"7400FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-293.09225553374307,\\\"y\\\":69.63656906685526,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":210,\\\"color\\\":\\\"7400FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-327.2575868419893,\\\"y\\\":71.17712974771109,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":180,\\\"color\\\":\\\"7400FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-321.6420961954517,\\\"y\\\":48.71516716156077,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"7400FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-316.0266055489142,\\\"y\\\":71.17712974771109,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":180,\\\"color\\\":\\\"7400FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-341.0325519987515,\\\"y\\\":48.48586520828897,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"7400FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-341.0325519987515,\\\"y\\\":59.71684650136413,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"7400FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-341.0325519987515,\\\"y\\\":70.94782779443929,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"7400FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-340.16192570827474,\\\"y\\\":-41.180734208594664,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"93C9FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-340.16192570827474,\\\"y\\\":-19.841869751751872,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"93C9FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-335.6695331910447,\\\"y\\\":-31.072851044827026,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"93C9FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-328.93094441519963,\\\"y\\\":-19.841869751751872,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"93C9FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-318.68522595539093,\\\"y\\\":-41.5466479670398,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"93C9FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-318.68522595539093,\\\"y\\\":-19.084685380889496,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"93C9FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-307.4542446623158,\\\"y\\\":-19.084685380889496,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"93C9FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-318.68522595539093,\\\"y\\\":-30.00763031016237,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"93C9FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-313.06973530885335,\\\"y\\\":-30.00763031016237,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"93C9FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-307.4542446623158,\\\"y\\\":-41.5466479670398,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"93C9FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-296.240504398315,\\\"y\\\":-41.88466472448672,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"93C9FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-296.240504398315,\\\"y\\\":-30.653683431411565,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"93C9FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-296.240504398315,\\\"y\\\":-19.422702138336405,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"93C9FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-315.26336926082246,\\\"y\\\":117.53929160583002,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":180,\\\"color\\\":\\\"FFC0CB\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-309.6478786142849,\\\"y\\\":95.0773290196797,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFC0CB\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-304.0323879677473,\\\"y\\\":117.53929160583002,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":180,\\\"color\\\":\\\"FFC0CB\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-277.67531752177933,\\\"y\\\":159.39226806428078,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-180,\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-277.67531752177933,\\\"y\\\":140.29959986605303,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-244.76693805681435,\\\"y\\\":139.5422107997669,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-244.76693805681435,\\\"y\\\":162.00417338591723,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-233.53595676373916,\\\"y\\\":162.00417338591723,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-244.76693805681435,\\\"y\\\":151.08122845664437,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-239.15144741027675,\\\"y\\\":151.08122845664437,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-233.53595676373916,\\\"y\\\":139.5422107997669,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-202.90930226038378,\\\"y\\\":160.39945790407745,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":180,\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-197.2938116138462,\\\"y\\\":137.9374953179271,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-191.67832096730862,\\\"y\\\":160.39945790407745,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":180,\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-212.2062886396959,\\\"y\\\":143.22861106043877,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-311,\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-209.68812626478467,\\\"y\\\":150.68660799373177,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-311,\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-219.729190747337,\\\"y\\\":150.68660799373177,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":0,\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-339.7594433924866,\\\"y\\\":162.03451553713685,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-339.7594433924866,\\\"y\\\":139.5725529509866,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-328.52846209941146,\\\"y\\\":162.03451553713685,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-328.52846209941146,\\\"y\\\":139.5725529509866,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-313.8415066314176,\\\"y\\\":138.77072310750387,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":100,\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-313.8415066314176,\\\"y\\\":161.23268569365413,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":100,\\\"color\\\":\\\"FF00FF\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-253.33566780736714,\\\"y\\\":185.94724336403846,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-242.104686514292,\\\"y\\\":185.94724336403846,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-253.33566780736714,\\\"y\\\":205.03991156226624,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-180,\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-247.72017716082956,\\\"y\\\":205.03991156226624,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":-180,\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-247.72017716082956,\\\"y\\\":185.94724336403846,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-307.37720313750793,\\\"y\\\":208.2889340086296,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-307.37720313750793,\\\"y\\\":185.8269714224793,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-296.1462218444328,\\\"y\\\":208.2889340086296,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-296.1462218444328,\\\"y\\\":185.8269714224793,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-281.4592663764391,\\\"y\\\":185.02514157899657,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":100,\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-281.4592663764391,\\\"y\\\":207.4871041651469,\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"curve\\\":100,\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-340.42364327737477,\\\"y\\\":185.35959259994587,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-340.42364327737477,\\\"y\\\":207.8215551860962,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-329.1926619842996,\\\"y\\\":207.8215551860962,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-340.42364327737477,\\\"y\\\":196.89861025682336,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-334.8081526308372,\\\"y\\\":196.89861025682336,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-329.1926619842996,\\\"y\\\":185.35959259994587,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"800180\\\",\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"x\\\":-148,\\\"y\\\":-310},{\\\"x\\\":-148,\\\"y\\\":-370},{\\\"x\\\":-150,\\\"y\\\":-280},{\\\"x\\\":-97,\\\"y\\\":-259.5},{\\\"x\\\":397,\\\"y\\\":-259.5},{\\\"x\\\":450,\\\"y\\\":-280},{\\\"x\\\":90,\\\"y\\\":220,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":90,\\\"y\\\":180,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":100,\\\"y\\\":200,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":110,\\\"y\\\":180,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":110,\\\"y\\\":220,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":120,\\\"y\\\":180,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":120,\\\"y\\\":220,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":140,\\\"y\\\":220,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":140,\\\"y\\\":180,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":150,\\\"y\\\":180,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":150,\\\"y\\\":220,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":170,\\\"y\\\":220,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":170,\\\"y\\\":180,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":180,\\\"y\\\":180,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":180,\\\"y\\\":220,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":200,\\\"y\\\":220,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":200,\\\"y\\\":180,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":210,\\\"y\\\":180,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":210,\\\"y\\\":220,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":230,\\\"y\\\":220,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":120,\\\"y\\\":200,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"},{\\\"x\\\":200,\\\"y\\\":200,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"color\\\":\\\"8167DC\\\"}],\\\"segments\\\":[{\\\"v0\\\":0,\\\"v1\\\":1,\\\"curve\\\":0,\\\"color\\\":\\\"ffffff\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":0,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-224.26904758895245,259.94250690430385],\\\"b\\\":[-213.88423746237018,259.94250690430385],\\\"curve\\\":0}}},{\\\"v0\\\":1,\\\"v1\\\":2,\\\"curve\\\":0,\\\"color\\\":\\\"ffffff\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":7,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-213.88423746237018,259.94250690430385],\\\"b\\\":[-213.88423746237018,319.28427905620254],\\\"curve\\\":0}}},{\\\"v0\\\":2,\\\"v1\\\":3,\\\"curve\\\":0,\\\"color\\\":\\\"ffffff\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":40,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-213.88423746237018,319.28427905620254],\\\"b\\\":[-224.26904758895245,319.28427905620254],\\\"curve\\\":0}}},{\\\"v0\\\":3,\\\"v1\\\":0,\\\"curve\\\":0,\\\"color\\\":\\\"ffffff\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":0,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-224.26904758895245,319.28427905620254],\\\"b\\\":[-224.26904758895245,259.94250690430385],\\\"curve\\\":0}}},{\\\"v0\\\":4,\\\"v1\\\":5,\\\"curve\\\":0,\\\"color\\\":\\\"ffffff\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":8,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-239.10449062692712,271.8108613346836],\\\"b\\\":[-199.04879442439548,271.8108613346836],\\\"curve\\\":0}}},{\\\"v0\\\":5,\\\"v1\\\":6,\\\"curve\\\":0,\\\"color\\\":\\\"ffffff\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":17,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-199.04879442439548,271.8108613346836],\\\"b\\\":[-199.04879442439548,282.1956714612658],\\\"curve\\\":0}}},{\\\"v0\\\":6,\\\"v1\\\":7,\\\"curve\\\":0,\\\"color\\\":\\\"ffffff\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":15,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-199.04879442439548,282.1956714612658],\\\"b\\\":[-239.10449062692712,282.1956714612658],\\\"curve\\\":0}}},{\\\"v0\\\":7,\\\"v1\\\":4,\\\"curve\\\":0,\\\"color\\\":\\\"ffffff\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-10,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-239.10449062692712,282.1956714612658],\\\"b\\\":[-239.10449062692712,271.8108613346836],\\\"curve\\\":0}}},{\\\"v0\\\":8,\\\"v1\\\":9,\\\"curve\\\":-10,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-313.2817058168006,319.28427905620254],\\\"b\\\":[-298.4462627788258,259.94250690430385],\\\"curve\\\":-10,\\\"radius\\\":350.91261183731524,\\\"center\\\":[-645.0037640151875,204.82844805090912],\\\"from\\\":0.1577122005271491,\\\"to\\\":0.33224512572658205}}},{\\\"v0\\\":9,\\\"v1\\\":10,\\\"curve\\\":-10,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-298.4462627788258,259.94250690430385],\\\"b\\\":[-283.6108197408512,319.28427905620254],\\\"curve\\\":-10,\\\"radius\\\":350.91261183731507,\\\"center\\\":[48.11123845753576,204.8284480509098],\\\"from\\\":2.809347527863213,\\\"to\\\":2.983880453062646}}},{\\\"v0\\\":10,\\\"v1\\\":11,\\\"curve\\\":-10,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-283.6108197408512,319.28427905620254],\\\"b\\\":[-320.69942733578785,282.1956714612658],\\\"curve\\\":-10,\\\"radius\\\":300.90508219380985,\\\"center\\\":[-514.1174858616787,512.702337582093],\\\"from\\\":-0.8726646259971641,\\\"to\\\":-0.6981317007977311}}},{\\\"v0\\\":11,\\\"v1\\\":12,\\\"curve\\\":-10,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":15,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-320.69942733578785,282.1956714612658],\\\"b\\\":[-276.1930982218638,282.1956714612658],\\\"curve\\\":-10,\\\"radius\\\":255.32642893528612,\\\"center\\\":[-298.4462627788258,27.840836673234975],\\\"from\\\":1.4835298641951802,\\\"to\\\":1.6580627893946132}}},{\\\"v0\\\":13,\\\"v1\\\":14,\\\"color\\\":\\\"8B0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-338.32871036037534,-307.6457267639441],\\\"b\\\":[-332.71321971383776,-330.1076893500944],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":14,\\\"v1\\\":15,\\\"color\\\":\\\"8B0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-332.71321971383776,-330.1076893500944],\\\"b\\\":[-327.0977290673002,-307.6457267639441],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":16,\\\"v1\\\":17,\\\"color\\\":\\\"8B0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-316.98940874016523,-330.10768935009435],\\\"b\\\":[-316.98940874016523,-307.645726763944],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":17,\\\"v1\\\":16,\\\"curve\\\":-172.64880520820827,\\\"color\\\":\\\"8B0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-316.98940874016523,-307.645726763944],\\\"b\\\":[-316.98940874016523,-330.10768935009435],\\\"curve\\\":-172.64880520820827,\\\"radius\\\":11.254130900266897,\\\"center\\\":[-317.71088051018694,-318.8767080570192],\\\"from\\\":-1.506645050258784,\\\"to\\\":1.506645050258784}}},{\\\"v0\\\":18,\\\"v1\\\":19,\\\"curve\\\":0,\\\"color\\\":\\\"8B0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-299.5536379041398,-307.9059621495564],\\\"b\\\":[-299.5536379041398,-330.3679247357067],\\\"curve\\\":0}}},{\\\"v0\\\":19,\\\"v1\\\":20,\\\"curve\\\":0,\\\"color\\\":\\\"8B0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-299.5536379041398,-330.3679247357067],\\\"b\\\":[-293.9381472576022,-319.13694344263155],\\\"curve\\\":0}}},{\\\"v0\\\":20,\\\"v1\\\":21,\\\"curve\\\":0,\\\"color\\\":\\\"8B0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-293.9381472576022,-319.13694344263155],\\\"b\\\":[-288.32265661106464,-330.3679247357067],\\\"curve\\\":0}}},{\\\"v0\\\":21,\\\"v1\\\":22,\\\"curve\\\":0,\\\"color\\\":\\\"8B0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-250,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-288.32265661106464,-330.3679247357067],\\\"b\\\":[-288.32265661106464,-307.9059621495564],\\\"curve\\\":0}}},{\\\"v0\\\":23,\\\"v1\\\":24,\\\"color\\\":\\\"FF0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-337.5056030736755,-292.3523578713767],\\\"b\\\":[-337.5056030736755,-269.8903952852264],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":24,\\\"v1\\\":25,\\\"color\\\":\\\"FF0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-320,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-337.5056030736755,-269.8903952852264],\\\"b\\\":[-326.27462178060034,-269.8903952852264],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":26,\\\"v1\\\":27,\\\"color\\\":\\\"FF0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-337.5056030736755,-280.81334021449925],\\\"b\\\":[-331.8901124271379,-280.81334021449925],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":23,\\\"v1\\\":28,\\\"color\\\":\\\"FF0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-340,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-337.5056030736755,-292.3523578713767],\\\"b\\\":[-326.27462178060034,-292.3523578713767],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":29,\\\"v1\\\":30,\\\"curve\\\":0,\\\"color\\\":\\\"FF8C00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-296.50158064661383,-229.49423408616624],\\\"b\\\":[-296.50158064661383,-251.95619667231657],\\\"curve\\\":0}}},{\\\"v0\\\":30,\\\"v1\\\":31,\\\"curve\\\":0,\\\"color\\\":\\\"FF8C00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-296.50158064661383,-251.95619667231657],\\\"b\\\":[-285.27059935353867,-229.49423408616624],\\\"curve\\\":0}}},{\\\"v0\\\":31,\\\"v1\\\":32,\\\"curve\\\":0,\\\"color\\\":\\\"FF8C00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-250,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-285.27059935353867,-229.49423408616624],\\\"b\\\":[-285.27059935353867,-251.95619667231657],\\\"curve\\\":0}}},{\\\"v0\\\":33,\\\"v1\\\":34,\\\"color\\\":\\\"FFFF00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-337.9469910865436,-173.49301540537394],\\\"b\\\":[-337.9469910865436,-151.03105281922365],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":35,\\\"v1\\\":36,\\\"color\\\":\\\"FFFF00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-337.9469910865436,-162.26203411229883],\\\"b\\\":[-326.71600979346846,-173.49301540537394],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":38,\\\"v1\\\":39,\\\"color\\\":\\\"FFFF00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-316.35478610705206,-173.25205671499216],\\\"b\\\":[-316.35478610705206,-150.79009412884182],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":42,\\\"v1\\\":43,\\\"curve\\\":0,\\\"color\\\":\\\"00FFFF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-300.2982936216126,-86.4436077112845],\\\"b\\\":[-300.2982936216126,-65.1047432544417],\\\"curve\\\":0}}},{\\\"v0\\\":42,\\\"v1\\\":44,\\\"curve\\\":219.05985958618143,\\\"color\\\":\\\"00FFFF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-300.2982936216126,-86.4436077112845],\\\"b\\\":[-295.8059011043825,-76.33572454751686],\\\"curve\\\":219.05985958618143,\\\"radius\\\":5.86823405100995,\\\"center\\\":[-296.2594311280513,-82.18640667826568],\\\"from\\\":-2.3298822339468925,\\\"to\\\":1.49343357478843}}},{\\\"v0\\\":44,\\\"v1\\\":45,\\\"curve\\\":0,\\\"color\\\":\\\"00FFFF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-295.8059011043825,-76.33572454751686],\\\"b\\\":[-289.0673123285374,-65.1047432544417],\\\"curve\\\":0}}},{\\\"v0\\\":46,\\\"v1\\\":47,\\\"curve\\\":0,\\\"color\\\":\\\"00FFFF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-268.1483348121749,-86.8655732850392],\\\"b\\\":[-268.1483348121749,-64.40361069888885],\\\"curve\\\":0}}},{\\\"v0\\\":47,\\\"v1\\\":48,\\\"curve\\\":0,\\\"color\\\":\\\"00FFFF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-268.1483348121749,-64.40361069888885],\\\"b\\\":[-256.9173535190997,-64.40361069888885],\\\"curve\\\":0}}},{\\\"v0\\\":49,\\\"v1\\\":50,\\\"curve\\\":237.6508404498954,\\\"color\\\":\\\"0000FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-340.8025269018594,3.0103344789363504],\\\"b\\\":[-340.8025269018594,14.241315772011497],\\\"curve\\\":237.6508404498954,\\\"radius\\\":6.409698024007857,\\\"center\\\":[-337.71213961907114,8.625825125473924],\\\"from\\\":-2.0738948179912002,\\\"to\\\":2.0738948179912002}}},{\\\"v0\\\":49,\\\"v1\\\":51,\\\"curve\\\":0,\\\"color\\\":\\\"0000FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-340.8025269018594,3.0103344789363504],\\\"b\\\":[-340.8025269018594,25.472297065086657],\\\"curve\\\":0}}},{\\\"v0\\\":53,\\\"v1\\\":54,\\\"curve\\\":0,\\\"color\\\":\\\"0000FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-255,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-282.67486645169174,1.578831669760099],\\\"b\\\":[-282.67486645169174,24.040794255910406],\\\"curve\\\":0}}},{\\\"v0\\\":55,\\\"v1\\\":56,\\\"curve\\\":0,\\\"color\\\":\\\"0000FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-340,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-288.2903570982293,1.578831669760099],\\\"b\\\":[-277.05937580515416,1.578831669760099],\\\"curve\\\":0}}},{\\\"v0\\\":57,\\\"v1\\\":52,\\\"curve\\\":100,\\\"color\\\":\\\"0000FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-299.0651156024811,24.517961858969166],\\\"b\\\":[-299.0651156024811,2.055999272818859],\\\"curve\\\":100,\\\"radius\\\":14.661004846334764,\\\"center\\\":[-289.6412033417028,13.286980565894012],\\\"from\\\":2.2689280275926293,\\\"to\\\":-2.2689280275926293}}},{\\\"v0\\\":58,\\\"v1\\\":59,\\\"curve\\\":-210,\\\"color\\\":\\\"7400FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-255,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-298.3884434160347,49.57263651734863],\\\"b\\\":[-303.3582234672315,59.51219661974207],\\\"curve\\\":-210,\\\"radius\\\":5.752390983473205,\\\"center\\\":[-302.2049819929116,53.8765922929061],\\\"from\\\":1.7726445479965511,\\\"to\\\":-0.8453493299949307}}},{\\\"v0\\\":59,\\\"v1\\\":60,\\\"curve\\\":210,\\\"color\\\":\\\"7400FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-255,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-303.3582234672315,59.51219661974207],\\\"b\\\":[-308.3280035184282,69.45175672213551],\\\"curve\\\":210,\\\"radius\\\":5.752390983473193,\\\"center\\\":[-304.51146494155137,65.14780094657803],\\\"from\\\":-1.368948105593242,\\\"to\\\":2.2962433235948545}}},{\\\"v0\\\":61,\\\"v1\\\":62,\\\"curve\\\":-311,\\\"vis\\\":true,\\\"color\\\":\\\"FFC0CB\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-326.0151657897859,99.11330653505868],\\\"b\\\":[-323.49700341487465,106.57130346835166],\\\"curve\\\":-311,\\\"radius\\\":9.490930064541898,\\\"center\\\":[-332.9386249352075,105.605106512854],\\\"from\\\":0.10197880210546355,\\\"to\\\":-0.7532325313717595}}},{\\\"v0\\\":62,\\\"v1\\\":63,\\\"curve\\\":0,\\\"vis\\\":true,\\\"color\\\":\\\"FFC0CB\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-323.49700341487465,106.57130346835166],\\\"b\\\":[-333.53806789742697,106.57130346835166],\\\"curve\\\":0}}},{\\\"v0\\\":64,\\\"v1\\\":65,\\\"curve\\\":0,\\\"vis\\\":true,\\\"color\\\":\\\"FFC0CB\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-296.0315394451972,93.45851423902641],\\\"b\\\":[-290.41604879865963,102.44329927348653],\\\"curve\\\":0}}},{\\\"v0\\\":65,\\\"v1\\\":66,\\\"curve\\\":0,\\\"vis\\\":true,\\\"color\\\":\\\"FFC0CB\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-290.41604879865963,102.44329927348653],\\\"b\\\":[-284.80055815212205,93.45851423902641],\\\"curve\\\":0}}},{\\\"v0\\\":65,\\\"v1\\\":67,\\\"curve\\\":0,\\\"vis\\\":true,\\\"color\\\":\\\"FFC0CB\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-255,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-290.41604879865963,102.44329927348653],\\\"b\\\":[-290.41604879865963,117.4662112038917],\\\"curve\\\":0}}},{\\\"v0\\\":68,\\\"v1\\\":69,\\\"curve\\\":0,\\\"color\\\":\\\"FF00FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-340,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-283.2908081683169,140.29959986605303],\\\"b\\\":[-272.05982687524175,140.29959986605303],\\\"curve\\\":0}}},{\\\"v0\\\":71,\\\"v1\\\":72,\\\"curve\\\":0,\\\"color\\\":\\\"FF00FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-264.7749563878461,139.49048749710184],\\\"b\\\":[-264.7749563878461,156.3369594367146],\\\"curve\\\":0}}},{\\\"v0\\\":72,\\\"v1\\\":73,\\\"curve\\\":-180,\\\"color\\\":\\\"FF00FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-325,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-264.7749563878461,156.3369594367146],\\\"b\\\":[-253.54397509477096,156.3369594367146],\\\"curve\\\":-180,\\\"radius\\\":5.615490646537566,\\\"center\\\":[-259.1594657413085,156.3369594367146],\\\"from\\\":0,\\\"to\\\":3.141592653589793}}},{\\\"v0\\\":73,\\\"v1\\\":74,\\\"curve\\\":0,\\\"color\\\":\\\"FF00FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-250,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-253.54397509477096,156.3369594367146],\\\"b\\\":[-253.54397509477096,139.49048749710184],\\\"curve\\\":0}}},{\\\"v0\\\":75,\\\"v1\\\":76,\\\"y\\\":-370},{\\\"v0\\\":76,\\\"v1\\\":77,\\\"x\\\":450,\\\"dist\\\":-450},{\\\"v0\\\":77,\\\"v1\\\":78,\\\"curve\\\":0,\\\"y\\\":370},{\\\"v0\\\":78,\\\"v1\\\":75,\\\"color\\\":\\\"000000\\\",\\\"x\\\":-370},{\\\"v0\\\":79,\\\"v1\\\":80,\\\"color\\\":\\\"000000\\\",\\\"x\\\":-150},{\\\"v0\\\":81,\\\"v1\\\":82,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-110},{\\\"v0\\\":83,\\\"v1\\\":84,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-70},{\\\"v0\\\":85,\\\"v1\\\":86,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-30},{\\\"v0\\\":87,\\\"v1\\\":88,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":10},{\\\"v0\\\":89,\\\"v1\\\":90,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":50},{\\\"v0\\\":91,\\\"v1\\\":92,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":90},{\\\"v0\\\":93,\\\"v1\\\":94,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":130},{\\\"v0\\\":95,\\\"v1\\\":96,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":170},{\\\"v0\\\":97,\\\"v1\\\":98,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":210},{\\\"v0\\\":99,\\\"v1\\\":100,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":250},{\\\"v0\\\":101,\\\"v1\\\":102,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":290},{\\\"v0\\\":103,\\\"v1\\\":104,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":330},{\\\"v0\\\":105,\\\"v1\\\":106,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"bias\\\":-5,\\\"y\\\":330},{\\\"v0\\\":57,\\\"v1\\\":52,\\\"curve\\\":-100,\\\"color\\\":\\\"0000FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-299.0651156024811,24.517961858969166],\\\"b\\\":[-299.0651156024811,2.055999272818859],\\\"curve\\\":-100,\\\"radius\\\":14.661004846334764,\\\"center\\\":[-308.4890278632594,13.286980565894012],\\\"from\\\":-0.872664625997164,\\\"to\\\":0.872664625997164}}},{\\\"v0\\\":12,\\\"v1\\\":8,\\\"curve\\\":-10,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-276.1930982218638,282.1956714612658],\\\"b\\\":[-313.2817058168006,319.28427905620254],\\\"curve\\\":-10,\\\"radius\\\":300.9050821938103,\\\"center\\\":[-82.77503969597302,512.7023375820936],\\\"from\\\":-2.4434609527920608,\\\"to\\\":-2.268928027592628}}},{\\\"v0\\\":107,\\\"v1\\\":108,\\\"curve\\\":180,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":0},{\\\"v0\\\":108,\\\"v1\\\":107,\\\"curve\\\":180,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":0},{\\\"v0\\\":109,\\\"v1\\\":110,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":370},{\\\"v0\\\":111,\\\"v1\\\":112,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":410},{\\\"v0\\\":113,\\\"v1\\\":114,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"x\\\":350},{\\\"v0\\\":115,\\\"v1\\\":116,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"x\\\":-50},{\\\"v0\\\":117,\\\"v1\\\":118,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"x\\\":70},{\\\"v0\\\":119,\\\"v1\\\":120,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"x\\\":230},{\\\"v0\\\":13,\\\"v1\\\":15,\\\"curve\\\":180,\\\"color\\\":\\\"8B0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-338.32871036037534,-307.6457267639441],\\\"b\\\":[-327.0977290673002,-307.6457267639441],\\\"curve\\\":180,\\\"radius\\\":5.61549064653758,\\\"center\\\":[-332.71321971383776,-307.6457267639441],\\\"from\\\":3.141592653589793,\\\"to\\\":0}}},{\\\"v0\\\":121,\\\"v1\\\":122,\\\"color\\\":\\\"FF0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-306.57681219831863,-269.30331957794454],\\\"b\\\":[-300.96132155178105,-291.76528216409486],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":122,\\\"v1\\\":123,\\\"color\\\":\\\"FF0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-300.96132155178105,-291.76528216409486],\\\"b\\\":[-295.3458309052435,-269.30331957794454],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":121,\\\"v1\\\":123,\\\"curve\\\":180,\\\"color\\\":\\\"FF0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-306.57681219831863,-269.30331957794454],\\\"b\\\":[-295.3458309052435,-269.30331957794454],\\\"curve\\\":180,\\\"radius\\\":5.61549064653758,\\\"center\\\":[-300.96132155178105,-269.30331957794454],\\\"from\\\":3.141592653589793,\\\"to\\\":0}}},{\\\"v0\\\":124,\\\"v1\\\":125,\\\"color\\\":\\\"FF8C00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-317.8983588950318,-230.14987736232717],\\\"b\\\":[-312.2828682484942,-252.6118399484775],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":125,\\\"v1\\\":126,\\\"color\\\":\\\"FF8C00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-312.2828682484942,-252.6118399484775],\\\"b\\\":[-306.6673776019566,-230.14987736232717],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":124,\\\"v1\\\":126,\\\"curve\\\":180,\\\"color\\\":\\\"FF8C00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-317.8983588950318,-230.14987736232717],\\\"b\\\":[-306.6673776019566,-230.14987736232717],\\\"curve\\\":180,\\\"radius\\\":5.61549064653758,\\\"center\\\":[-312.2828682484942,-230.14987736232717],\\\"from\\\":3.141592653589793,\\\"to\\\":0}}},{\\\"v0\\\":127,\\\"v1\\\":128,\\\"curve\\\":0,\\\"color\\\":\\\"FF8C00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-337.6730670842144,-253.94334574931992],\\\"b\\\":[-337.6730670842144,-231.4813831631696],\\\"curve\\\":0}}},{\\\"v0\\\":128,\\\"v1\\\":129,\\\"curve\\\":-200,\\\"color\\\":\\\"FF8C00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-337.6730670842144,-231.4813831631696],\\\"b\\\":[-330.93447830836925,-242.71236445624476],\\\"curve\\\":-200,\\\"radius\\\":6.649755899212242,\\\"center\\\":[-333.31361018539127,-236.50277630316683],\\\"from\\\":-1.2049097517237355,\\\"to\\\":2.285748752264909}}},{\\\"v0\\\":129,\\\"v1\\\":127,\\\"curve\\\":-184.44144694207336,\\\"color\\\":\\\"FF8C00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-330.93447830836925,-242.71236445624476],\\\"b\\\":[-337.6730670842144,-253.94334574931992],\\\"curve\\\":-184.44144694207336,\\\"radius\\\":6.55365317856843,\\\"center\\\":[-334.0860131974067,-248.4585108021134],\\\"from\\\":-2.1499747634113855,\\\"to\\\":1.0691357628702125}}},{\\\"v0\\\":130,\\\"v1\\\":131,\\\"color\\\":\\\"D2AB0B\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-338.3826018358108,-211.50170999523053],\\\"b\\\":[-338.3826018358108,-189.03974740908023],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":131,\\\"v1\\\":132,\\\"color\\\":\\\"D2AB0B\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-320,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-338.3826018358108,-189.03974740908023],\\\"b\\\":[-327.15162054273566,-189.03974740908023],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":133,\\\"v1\\\":134,\\\"color\\\":\\\"D2AB0B\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-338.3826018358108,-199.9626923383531],\\\"b\\\":[-332.76711118927324,-199.9626923383531],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":130,\\\"v1\\\":135,\\\"color\\\":\\\"D2AB0B\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-340,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-338.3826018358108,-211.50170999523053],\\\"b\\\":[-327.15162054273566,-211.50170999523053],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":136,\\\"v1\\\":137,\\\"curve\\\":0,\\\"color\\\":\\\"D2AB0B\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-305.9952796461139,-211.29895123782617],\\\"b\\\":[-305.9952796461139,-188.83698865167588],\\\"curve\\\":0}}},{\\\"v0\\\":137,\\\"v1\\\":138,\\\"curve\\\":-200,\\\"color\\\":\\\"D2AB0B\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-305.9952796461139,-188.83698865167588],\\\"b\\\":[-299.25669087026876,-200.067969944751],\\\"curve\\\":-200,\\\"radius\\\":6.64975589921223,\\\"center\\\":[-301.6358227472908,-193.8583817916731],\\\"from\\\":-1.204909751723734,\\\"to\\\":2.285748752264909}}},{\\\"v0\\\":138,\\\"v1\\\":136,\\\"curve\\\":-184.44144694207336,\\\"color\\\":\\\"D2AB0B\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-299.25669087026876,-200.067969944751],\\\"b\\\":[-305.9952796461139,-211.29895123782617],\\\"curve\\\":-184.44144694207336,\\\"radius\\\":6.55365317856843,\\\"center\\\":[-302.4082257593062,-205.81411629061967],\\\"from\\\":-2.1499747634113855,\\\"to\\\":1.0691357628702125}}},{\\\"v0\\\":37,\\\"v1\\\":35,\\\"color\\\":\\\"FFFF00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-326.71600979346846,-151.03105281922365],\\\"b\\\":[-337.9469910865436,-162.26203411229883],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":139,\\\"v1\\\":140,\\\"color\\\":\\\"FFFF00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-283.42247309305054,-174.10144157316935],\\\"b\\\":[-283.42247309305054,-151.6394789870191],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":141,\\\"v1\\\":142,\\\"color\\\":\\\"FFFF00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-283.42247309305054,-162.87046028009425],\\\"b\\\":[-272.1914917999754,-174.10144157316935],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":143,\\\"v1\\\":141,\\\"color\\\":\\\"FFFF00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-272.1914917999754,-151.6394789870191],\\\"b\\\":[-283.42247309305054,-162.87046028009425],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":144,\\\"v1\\\":145,\\\"color\\\":\\\"4BE608\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-303.8713286930477,-131.53463453986492],\\\"b\\\":[-303.8713286930477,-109.07267195371466],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":146,\\\"v1\\\":147,\\\"color\\\":\\\"4BE608\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-303.8713286930477,-120.30365324678984],\\\"b\\\":[-292.6403473999726,-131.53463453986492],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":148,\\\"v1\\\":146,\\\"color\\\":\\\"4BE608\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-292.6403473999726,-109.07267195371466],\\\"b\\\":[-303.8713286930477,-120.30365324678984],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":149,\\\"v1\\\":150,\\\"color\\\":\\\"4BE608\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-338.69275095749913,-130.79479497691673],\\\"b\\\":[-338.69275095749913,-108.33283239076643],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":150,\\\"v1\\\":151,\\\"color\\\":\\\"4BE608\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-320,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-338.69275095749913,-108.33283239076643],\\\"b\\\":[-327.46176966442397,-108.33283239076643],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":152,\\\"v1\\\":153,\\\"color\\\":\\\"4BE608\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-338.69275095749913,-119.2557773200393],\\\"b\\\":[-333.07726031096155,-119.2557773200393],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":149,\\\"v1\\\":154,\\\"color\\\":\\\"4BE608\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-340,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-338.69275095749913,-130.79479497691673],\\\"b\\\":[-327.46176966442397,-130.79479497691673],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":155,\\\"v1\\\":156,\\\"color\\\":\\\"00FFFF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-321.75704633723126,-65.1823192334759],\\\"b\\\":[-316.1415556906937,-87.6442818196262],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":156,\\\"v1\\\":157,\\\"color\\\":\\\"00FFFF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-316.1415556906937,-87.6442818196262],\\\"b\\\":[-310.5260650441561,-65.1823192334759],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":158,\\\"v1\\\":159,\\\"color\\\":\\\"00FFFF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-339.1523311549604,-88.40846155512597],\\\"b\\\":[-339.1523311549604,-65.94649896897566],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":159,\\\"v1\\\":158,\\\"curve\\\":-172.64880520820827,\\\"color\\\":\\\"00FFFF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-339.1523311549604,-65.94649896897566],\\\"b\\\":[-339.1523311549604,-88.40846155512597],\\\"curve\\\":-172.64880520820827,\\\"radius\\\":11.25413090026689,\\\"center\\\":[-339.8738029249821,-77.1774802620508],\\\"from\\\":-1.506645050258784,\\\"to\\\":1.506645050258784}}},{\\\"v0\\\":155,\\\"v1\\\":157,\\\"curve\\\":180,\\\"color\\\":\\\"00FFFF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-321.75704633723126,-65.1823192334759],\\\"b\\\":[-310.5260650441561,-65.1823192334759],\\\"curve\\\":180,\\\"radius\\\":5.61549064653758,\\\"center\\\":[-316.1415556906937,-65.1823192334759],\\\"from\\\":3.141592653589793,\\\"to\\\":0}}},{\\\"v0\\\":160,\\\"v1\\\":161,\\\"curve\\\":0,\\\"color\\\":\\\"0000FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-322.9831824019929,3.4922731942479075],\\\"b\\\":[-322.9831824019929,24.831137651090692],\\\"curve\\\":0}}},{\\\"v0\\\":160,\\\"v1\\\":162,\\\"curve\\\":219.05985958618143,\\\"color\\\":\\\"0000FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-322.9831824019929,3.4922731942479075],\\\"b\\\":[-318.4907898847629,13.600156358015546],\\\"curve\\\":219.05985958618143,\\\"radius\\\":5.868234051009938,\\\"center\\\":[-318.9443199084316,7.749474227266728],\\\"from\\\":-2.329882233946892,\\\"to\\\":1.4934335747884395}}},{\\\"v0\\\":162,\\\"v1\\\":163,\\\"curve\\\":0,\\\"color\\\":\\\"0000FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-318.4907898847629,13.600156358015546],\\\"b\\\":[-311.75220110891775,24.831137651090692],\\\"curve\\\":0}}},{\\\"v0\\\":164,\\\"v1\\\":165,\\\"curve\\\":-210,\\\"color\\\":\\\"7400FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-255,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-283.15269543134957,49.757448862068316],\\\"b\\\":[-288.1224754825464,59.69700896446179],\\\"curve\\\":-210,\\\"radius\\\":5.752390983473232,\\\"center\\\":[-286.96923400822646,54.0614046376258],\\\"from\\\":1.77264454799656,\\\"to\\\":-0.8453493299949315}}},{\\\"v0\\\":165,\\\"v1\\\":166,\\\"curve\\\":210,\\\"color\\\":\\\"7400FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-255,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-288.1224754825464,59.69700896446179],\\\"b\\\":[-293.09225553374307,69.63656906685526],\\\"curve\\\":210,\\\"radius\\\":5.752390983473193,\\\"center\\\":[-289.2757169568663,65.33261329129775],\\\"from\\\":-1.368948105593242,\\\"to\\\":2.296243323594844}}},{\\\"v0\\\":167,\\\"v1\\\":168,\\\"color\\\":\\\"7400FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-327.2575868419893,71.17712974771109],\\\"b\\\":[-321.6420961954517,48.71516716156077],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":168,\\\"v1\\\":169,\\\"color\\\":\\\"7400FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-321.6420961954517,48.71516716156077],\\\"b\\\":[-316.0266055489142,71.17712974771109],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":167,\\\"v1\\\":169,\\\"curve\\\":180,\\\"color\\\":\\\"7400FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-327.2575868419893,71.17712974771109],\\\"b\\\":[-316.0266055489142,71.17712974771109],\\\"curve\\\":180,\\\"radius\\\":5.615490646537552,\\\"center\\\":[-321.6420961954517,71.17712974771109],\\\"from\\\":3.141592653589793,\\\"to\\\":0}}},{\\\"v0\\\":170,\\\"v1\\\":171,\\\"curve\\\":237.6508404498954,\\\"color\\\":\\\"7400FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-341.0325519987515,48.48586520828897],\\\"b\\\":[-341.0325519987515,59.71684650136413],\\\"curve\\\":237.6508404498954,\\\"radius\\\":6.409698024007864,\\\"center\\\":[-337.94216471596326,54.10135585482655],\\\"from\\\":-2.0738948179911993,\\\"to\\\":2.0738948179911993}}},{\\\"v0\\\":170,\\\"v1\\\":172,\\\"curve\\\":0,\\\"color\\\":\\\"7400FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-341.0325519987515,48.48586520828897],\\\"b\\\":[-341.0325519987515,70.94782779443929],\\\"curve\\\":0}}},{\\\"v0\\\":173,\\\"v1\\\":174,\\\"curve\\\":0,\\\"color\\\":\\\"93C9FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-340.16192570827474,-41.180734208594664],\\\"b\\\":[-340.16192570827474,-19.841869751751872],\\\"curve\\\":0}}},{\\\"v0\\\":173,\\\"v1\\\":175,\\\"curve\\\":219.05985958618143,\\\"color\\\":\\\"93C9FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-340.16192570827474,-41.180734208594664],\\\"b\\\":[-335.6695331910447,-31.072851044827026],\\\"curve\\\":219.05985958618143,\\\"radius\\\":5.868234051009938,\\\"center\\\":[-336.12306321471345,-36.92353317557584],\\\"from\\\":-2.3298822339468916,\\\"to\\\":1.4934335747884395}}},{\\\"v0\\\":175,\\\"v1\\\":176,\\\"curve\\\":0,\\\"color\\\":\\\"93C9FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-335.6695331910447,-31.072851044827026],\\\"b\\\":[-328.93094441519963,-19.841869751751872],\\\"curve\\\":0}}},{\\\"v0\\\":177,\\\"v1\\\":178,\\\"color\\\":\\\"93C9FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-318.68522595539093,-41.5466479670398],\\\"b\\\":[-318.68522595539093,-19.084685380889496],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":178,\\\"v1\\\":179,\\\"color\\\":\\\"93C9FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-320,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-318.68522595539093,-19.084685380889496],\\\"b\\\":[-307.4542446623158,-19.084685380889496],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":180,\\\"v1\\\":181,\\\"color\\\":\\\"93C9FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-318.68522595539093,-30.00763031016237],\\\"b\\\":[-313.06973530885335,-30.00763031016237],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":177,\\\"v1\\\":182,\\\"color\\\":\\\"93C9FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-340,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-318.68522595539093,-41.5466479670398],\\\"b\\\":[-307.4542446623158,-41.5466479670398],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":183,\\\"v1\\\":184,\\\"curve\\\":237.6508404498954,\\\"color\\\":\\\"93C9FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-296.240504398315,-41.88466472448672],\\\"b\\\":[-296.240504398315,-30.653683431411565],\\\"curve\\\":237.6508404498954,\\\"radius\\\":6.409698024007859,\\\"center\\\":[-293.15011711552677,-36.269174077949145],\\\"from\\\":-2.0738948179912002,\\\"to\\\":2.0738948179911993}}},{\\\"v0\\\":183,\\\"v1\\\":185,\\\"curve\\\":0,\\\"color\\\":\\\"93C9FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-296.240504398315,-41.88466472448672],\\\"b\\\":[-296.240504398315,-19.422702138336405],\\\"curve\\\":0}}},{\\\"v0\\\":186,\\\"v1\\\":187,\\\"color\\\":\\\"FFC0CB\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-315.26336926082246,117.53929160583002],\\\"b\\\":[-309.6478786142849,95.0773290196797],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":187,\\\"v1\\\":188,\\\"color\\\":\\\"FFC0CB\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-309.6478786142849,95.0773290196797],\\\"b\\\":[-304.0323879677473,117.53929160583002],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":186,\\\"v1\\\":188,\\\"curve\\\":180,\\\"color\\\":\\\"FFC0CB\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-315.26336926082246,117.53929160583002],\\\"b\\\":[-304.0323879677473,117.53929160583002],\\\"curve\\\":180,\\\"radius\\\":5.61549064653758,\\\"center\\\":[-309.6478786142849,117.53929160583002],\\\"from\\\":3.141592653589793,\\\"to\\\":0}}},{\\\"v0\\\":70,\\\"v1\\\":189,\\\"curve\\\":-180,\\\"color\\\":\\\"FF00FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-323,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-283.2908081683169,159.39226806428078],\\\"b\\\":[-277.67531752177933,159.39226806428078],\\\"curve\\\":-180,\\\"radius\\\":2.80774532326879,\\\"center\\\":[-280.48306284504815,159.39226806428078],\\\"from\\\":0,\\\"to\\\":3.141592653589793}}},{\\\"v0\\\":189,\\\"v1\\\":190,\\\"color\\\":\\\"FF00FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-277.67531752177933,159.39226806428078],\\\"b\\\":[-277.67531752177933,140.29959986605303],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":191,\\\"v1\\\":192,\\\"color\\\":\\\"FF00FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-244.76693805681435,139.5422107997669],\\\"b\\\":[-244.76693805681435,162.00417338591723],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":192,\\\"v1\\\":193,\\\"color\\\":\\\"FF00FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-320,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-244.76693805681435,162.00417338591723],\\\"b\\\":[-233.53595676373916,162.00417338591723],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":194,\\\"v1\\\":195,\\\"color\\\":\\\"FF00FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-244.76693805681435,151.08122845664437],\\\"b\\\":[-239.15144741027675,151.08122845664437],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":191,\\\"v1\\\":196,\\\"color\\\":\\\"FF00FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-340,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-244.76693805681435,139.5422107997669],\\\"b\\\":[-233.53595676373916,139.5422107997669],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":197,\\\"v1\\\":198,\\\"color\\\":\\\"FF00FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-202.90930226038378,160.39945790407745],\\\"b\\\":[-197.2938116138462,137.9374953179271],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":198,\\\"v1\\\":199,\\\"color\\\":\\\"FF00FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-197.2938116138462,137.9374953179271],\\\"b\\\":[-191.67832096730862,160.39945790407745],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":197,\\\"v1\\\":199,\\\"curve\\\":180,\\\"color\\\":\\\"FF00FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-202.90930226038378,160.39945790407745],\\\"b\\\":[-191.67832096730862,160.39945790407745],\\\"curve\\\":180,\\\"radius\\\":5.61549064653758,\\\"center\\\":[-197.2938116138462,160.39945790407745],\\\"from\\\":3.141592653589793,\\\"to\\\":0}}},{\\\"v0\\\":200,\\\"v1\\\":201,\\\"curve\\\":-311,\\\"vis\\\":true,\\\"color\\\":\\\"FF00FF\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-212.2062886396959,143.22861106043877],\\\"b\\\":[-209.68812626478467,150.68660799373177],\\\"curve\\\":-311,\\\"radius\\\":9.49093006454193,\\\"center\\\":[-219.12974778511756,149.7204110382341],\\\"from\\\":0.10197880210546442,\\\"to\\\":-0.7532325313717564}}},{\\\"v0\\\":201,\\\"v1\\\":202,\\\"curve\\\":0,\\\"vis\\\":true,\\\"color\\\":\\\"FF00FF\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-209.68812626478467,150.68660799373177],\\\"b\\\":[-219.729190747337,150.68660799373177],\\\"curve\\\":0}}},{\\\"v0\\\":203,\\\"v1\\\":204,\\\"curve\\\":0,\\\"color\\\":\\\"FF00FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-339.7594433924866,162.03451553713685],\\\"b\\\":[-339.7594433924866,139.5725529509866],\\\"curve\\\":0}}},{\\\"v0\\\":204,\\\"v1\\\":205,\\\"curve\\\":0,\\\"color\\\":\\\"FF00FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-339.7594433924866,139.5725529509866],\\\"b\\\":[-328.52846209941146,162.03451553713685],\\\"curve\\\":0}}},{\\\"v0\\\":205,\\\"v1\\\":206,\\\"curve\\\":0,\\\"color\\\":\\\"FF00FF\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-250,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-328.52846209941146,162.03451553713685],\\\"b\\\":[-328.52846209941146,139.5725529509866],\\\"curve\\\":0}}},{\\\"v0\\\":208,\\\"v1\\\":207,\\\"curve\\\":100,\\\"color\\\":\\\"FF00FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-313.8415066314176,161.23268569365413],\\\"b\\\":[-313.8415066314176,138.77072310750387],\\\"curve\\\":100,\\\"radius\\\":14.661004846334736,\\\"center\\\":[-304.41759437063934,150.001704400579],\\\"from\\\":2.268928027592627,\\\"to\\\":-2.268928027592627}}},{\\\"v0\\\":208,\\\"v1\\\":207,\\\"curve\\\":-100,\\\"color\\\":\\\"FF00FF\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-313.8415066314176,161.23268569365413],\\\"b\\\":[-313.8415066314176,138.77072310750387],\\\"curve\\\":-100,\\\"radius\\\":14.661004846334736,\\\"center\\\":[-323.26541889219584,150.001704400579],\\\"from\\\":-0.872664625997166,\\\"to\\\":0.872664625997166}}},{\\\"v0\\\":209,\\\"v1\\\":210,\\\"curve\\\":0,\\\"color\\\":\\\"800180\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-340,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-253.33566780736714,185.94724336403846],\\\"b\\\":[-242.104686514292,185.94724336403846],\\\"curve\\\":0}}},{\\\"v0\\\":211,\\\"v1\\\":212,\\\"curve\\\":-180,\\\"color\\\":\\\"800180\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-323,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-253.33566780736714,205.03991156226624],\\\"b\\\":[-247.72017716082956,205.03991156226624],\\\"curve\\\":-180,\\\"radius\\\":2.80774532326879,\\\"center\\\":[-250.52792248409835,205.03991156226624],\\\"from\\\":0,\\\"to\\\":3.141592653589793}}},{\\\"v0\\\":212,\\\"v1\\\":213,\\\"color\\\":\\\"800180\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-247.72017716082956,205.03991156226624],\\\"b\\\":[-247.72017716082956,185.94724336403846],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":214,\\\"v1\\\":215,\\\"curve\\\":0,\\\"color\\\":\\\"800180\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-307.37720313750793,208.2889340086296],\\\"b\\\":[-307.37720313750793,185.8269714224793],\\\"curve\\\":0}}},{\\\"v0\\\":215,\\\"v1\\\":216,\\\"curve\\\":0,\\\"color\\\":\\\"800180\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-307.37720313750793,185.8269714224793],\\\"b\\\":[-296.1462218444328,208.2889340086296],\\\"curve\\\":0}}},{\\\"v0\\\":216,\\\"v1\\\":217,\\\"curve\\\":0,\\\"color\\\":\\\"800180\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-250,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-296.1462218444328,208.2889340086296],\\\"b\\\":[-296.1462218444328,185.8269714224793],\\\"curve\\\":0}}},{\\\"v0\\\":219,\\\"v1\\\":218,\\\"curve\\\":100,\\\"color\\\":\\\"800180\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-281.4592663764391,207.4871041651469],\\\"b\\\":[-281.4592663764391,185.02514157899657],\\\"curve\\\":100,\\\"radius\\\":14.661004846334773,\\\"center\\\":[-272.03535411566077,196.25612287207173],\\\"from\\\":2.268928027592629,\\\"to\\\":-2.268928027592629}}},{\\\"v0\\\":219,\\\"v1\\\":218,\\\"curve\\\":-100,\\\"color\\\":\\\"800180\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-281.4592663764391,207.4871041651469],\\\"b\\\":[-281.4592663764391,185.02514157899657],\\\"curve\\\":-100,\\\"radius\\\":14.661004846334773,\\\"center\\\":[-290.8831786372174,196.25612287207173],\\\"from\\\":-0.8726646259971642,\\\"to\\\":0.8726646259971642}}},{\\\"v0\\\":220,\\\"v1\\\":221,\\\"color\\\":\\\"800180\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":-260,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-340.42364327737477,185.35959259994587],\\\"b\\\":[-340.42364327737477,207.8215551860962],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":221,\\\"v1\\\":222,\\\"color\\\":\\\"800180\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-320,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-340.42364327737477,207.8215551860962],\\\"b\\\":[-329.1926619842996,207.8215551860962],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":223,\\\"v1\\\":224,\\\"color\\\":\\\"800180\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-340.42364327737477,196.89861025682336],\\\"b\\\":[-334.8081526308372,196.89861025682336],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":220,\\\"v1\\\":225,\\\"color\\\":\\\"800180\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":-340,\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-340.42364327737477,185.35959259994587],\\\"b\\\":[-329.1926619842996,185.35959259994587],\\\"radius\\\":null,\\\"center\\\":[null,null],\\\"from\\\":null,\\\"to\\\":null}}},{\\\"v0\\\":226,\\\"v1\\\":227,\\\"x\\\":-148},{\\\"v0\\\":228,\\\"v1\\\":229,\\\"color\\\":\\\"000000\\\"},{\\\"v0\\\":230,\\\"v1\\\":231,\\\"color\\\":\\\"000000\\\"},{\\\"v0\\\":231,\\\"v1\\\":106,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":105,\\\"v1\\\":228,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":41,\\\"v1\\\":40,\\\"curve\\\":232.13272008899736,\\\"color\\\":\\\"FFFF00\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[],\\\"arc\\\":{\\\"a\\\":[-293.3780446823259,-154.21363200908644],\\\"b\\\":[-293.3780446823259,-171.06010394869918],\\\"curve\\\":232.13272008899736,\\\"radius\\\":9.377011976968529,\\\"center\\\":[-297.4984147401206,-162.6368679788928],\\\"from\\\":1.115852520008099,\\\"to\\\":-1.115852520008099}}},{\\\"v0\\\":232,\\\"v1\\\":233,\\\"color\\\":\\\"8167DC\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":90},{\\\"v0\\\":233,\\\"v1\\\":234,\\\"color\\\":\\\"8167DC\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"v0\\\":234,\\\"v1\\\":235,\\\"color\\\":\\\"8167DC\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"v0\\\":235,\\\"v1\\\":236,\\\"color\\\":\\\"8167DC\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":110},{\\\"v0\\\":238,\\\"v1\\\":237,\\\"color\\\":\\\"8167DC\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":120},{\\\"v0\\\":237,\\\"v1\\\":240,\\\"color\\\":\\\"8167DC\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":180},{\\\"v0\\\":238,\\\"v1\\\":239,\\\"color\\\":\\\"8167DC\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":220},{\\\"v0\\\":242,\\\"v1\\\":241,\\\"color\\\":\\\"8167DC\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":150},{\\\"v0\\\":241,\\\"v1\\\":244,\\\"color\\\":\\\"8167DC\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":180},{\\\"v0\\\":242,\\\"v1\\\":243,\\\"color\\\":\\\"8167DC\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":220},{\\\"v0\\\":245,\\\"v1\\\":246,\\\"color\\\":\\\"8167DC\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":180},{\\\"v0\\\":246,\\\"v1\\\":247,\\\"color\\\":\\\"8167DC\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":220},{\\\"v0\\\":245,\\\"v1\\\":248,\\\"color\\\":\\\"8167DC\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":180},{\\\"v0\\\":249,\\\"v1\\\":250,\\\"color\\\":\\\"8167DC\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":210},{\\\"v0\\\":250,\\\"v1\\\":251,\\\"color\\\":\\\"8167DC\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":220},{\\\"v0\\\":252,\\\"v1\\\":253,\\\"color\\\":\\\"8167DC\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"y\\\":200}],\\\"goals\\\":[],\\\"discs\\\":[{\\\"radius\\\":7,\\\"pos\\\":[-150,-300],\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"ball\\\",\\\"kick\\\"],\\\"gravity\\\":[0,0.05]},{\\\"invMass\\\":1.0e-16,\\\"pos\\\":[-110,-180],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[-6,0]},{\\\"invMass\\\":1.0e-16,\\\"pos\\\":[410,-180],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[6,0]},{\\\"pos\\\":[-130,350],\\\"color\\\":\\\"FF8C00\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[0,0]},{\\\"pos\\\":[-90,350],\\\"color\\\":\\\"ffffff\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[0,0]},{\\\"pos\\\":[-50,350],\\\"color\\\":\\\"FF00FF\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[0,0]},{\\\"pos\\\":[-10,350],\\\"color\\\":\\\"ffff00\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[0,0]},{\\\"pos\\\":[30,350],\\\"color\\\":\\\"0000ff\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[0,0]},{\\\"pos\\\":[70,350],\\\"color\\\":\\\"4BE608\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[0,0]},{\\\"pos\\\":[110,350],\\\"color\\\":\\\"FF0000\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[0,0]},{\\\"pos\\\":[150,350],\\\"color\\\":\\\"8B0000\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[0,0]},{\\\"pos\\\":[190,350],\\\"color\\\":\\\"D2AB0B\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[0,0]},{\\\"pos\\\":[230,350],\\\"color\\\":\\\"93C9FF\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[0,0]},{\\\"pos\\\":[270,350],\\\"color\\\":\\\"800180\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[0,0]},{\\\"pos\\\":[310,350],\\\"color\\\":\\\"FFC0CB\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[0,0]},{\\\"pos\\\":[350,350],\\\"color\\\":\\\"7400FF\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[0,0]},{\\\"pos\\\":[390,350],\\\"color\\\":\\\"000000\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[0,0]},{\\\"pos\\\":[430,350],\\\"color\\\":\\\"00FFFF\\\",\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[0,0]},{\\\"invMass\\\":1.0e-15,\\\"pos\\\":[390,290.2853851067946],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[5.5,0]},{\\\"invMass\\\":1.0e-15,\\\"pos\\\":[110,290.2853851067946],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[-5.5,0]},{\\\"invMass\\\":1.0e-15,\\\"pos\\\":[190,290.2853851067946],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[5.5,0]},{\\\"invMass\\\":1.0e-15,\\\"pos\\\":[-90,290.2853851067946],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[-5.5,0]},{\\\"radius\\\":2.246196258615031,\\\"pos\\\":[-316.54772525859863,-269.4136332011714],\\\"color\\\":\\\"000000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"radius\\\":2.246196258615031,\\\"pos\\\":[-318.78832922682165,-188.55783786853993],\\\"color\\\":\\\"000000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"radius\\\":2.246196258615031,\\\"pos\\\":[-319.35071713503413,-108.82234452001995],\\\"color\\\":\\\"000000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"radius\\\":2.246196258615031,\\\"pos\\\":[-323.28519557636525,206.7704667315487],\\\"color\\\":\\\"000000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[]}},{\\\"invMass\\\":1.0e-16,\\\"pos\\\":[410,-120],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[6,0]},{\\\"invMass\\\":1.0e-16,\\\"pos\\\":[410,-60],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[6,0]},{\\\"invMass\\\":1.0e-16,\\\"pos\\\":[410,0],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[6,0]},{\\\"invMass\\\":1.0e-16,\\\"pos\\\":[410,60],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[6,0]},{\\\"invMass\\\":1.0e-16,\\\"pos\\\":[410,120],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[6,0]},{\\\"invMass\\\":1.0e-16,\\\"pos\\\":[-110,-120],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[-6,0]},{\\\"invMass\\\":1.0e-16,\\\"pos\\\":[-110,-60],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[-6,0]},{\\\"invMass\\\":1.0e-16,\\\"pos\\\":[-110,0],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[-6,0]},{\\\"invMass\\\":1.0e-16,\\\"pos\\\":[-110,60],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[-6,0]},{\\\"invMass\\\":1.0e-16,\\\"pos\\\":[-110,120],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":1,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"damping\\\":1,\\\"speed\\\":[-6,0]},{\\\"invMass\\\":1.0e-15,\\\"pos\\\":[-100,-250],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":3},{\\\"invMass\\\":1.0e-15,\\\"pos\\\":[0,-246],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":2},{\\\"invMass\\\":1.0e-15,\\\"pos\\\":[100,-242],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":3},{\\\"invMass\\\":1.0e-15,\\\"pos\\\":[200,-242],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":3},{\\\"invMass\\\":1.0e-15,\\\"pos\\\":[300,-246],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":2},{\\\"invMass\\\":1.0e-15,\\\"pos\\\":[400,-250],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":3},{\\\"invMass\\\":1.0e-15,\\\"pos\\\":[350,-248],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":2},{\\\"invMass\\\":1.0e-15,\\\"pos\\\":[250,-244],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":3},{\\\"radius\\\":20,\\\"invMass\\\":1.0e-15,\\\"pos\\\":[150,-240],\\\"color\\\":\\\"303D8F\\\",\\\"bCoef\\\":3},{\\\"invMass\\\":1.0e-15,\\\"pos\\\":[50,-244],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":3},{\\\"invMass\\\":1.0e-15,\\\"pos\\\":[-50,-248],\\\"color\\\":\\\"7A91F9\\\",\\\"bCoef\\\":2},{\\\"radius\\\":2.246196258615031,\\\"pos\\\":[-247.92116725376334,-63.60547349426139],\\\"color\\\":\\\"000000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"mirror\\\":[]}}],\\\"planes\\\":[{\\\"normal\\\":[1,0],\\\"dist\\\":-370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"all\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"extremes\\\":{\\\"normal\\\":[1,0],\\\"dist\\\":-370,\\\"canvas_rect\\\":[-825.9259259259258,-342.5925925925925,826.8518518518516,342.5925925925925],\\\"a\\\":[-370,-342.5925925925925],\\\"b\\\":[-370,342.5925925925925]}}},{\\\"normal\\\":[-1,0],\\\"dist\\\":-450,\\\"bCoef\\\":3,\\\"cMask\\\":[\\\"all\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"x\\\":450,\\\"_data\\\":{\\\"extremes\\\":{\\\"normal\\\":[-1,0],\\\"dist\\\":-450,\\\"canvas_rect\\\":[-825.9259259259258,-342.5925925925925,826.8518518518516,342.5925925925925],\\\"a\\\":[450,-342.5925925925925],\\\"b\\\":[450,342.5925925925925]}}},{\\\"normal\\\":[0,1],\\\"dist\\\":-370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"all\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"extremes\\\":{\\\"normal\\\":[0,1],\\\"dist\\\":-370,\\\"canvas_rect\\\":[-825.9259259259258,-342.5925925925925,826.8518518518516,342.5925925925925],\\\"a\\\":[-825.9259259259258,-370],\\\"b\\\":[826.8518518518516,-370]}}},{\\\"normal\\\":[0.9997435031666573,-0.01264791107497282],\\\"dist\\\":-155.01477902176902,\\\"bCoef\\\":3,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"extremes\\\":{\\\"normal\\\":[0.9997435031666573,-0.01264791107497282],\\\"dist\\\":-155.01477902176902,\\\"canvas_rect\\\":[-825.9259259259258,-342.5925925925925,826.8518518518516,342.5925925925925],\\\"a\\\":[-159.36137607140495,-342.5925925925925],\\\"b\\\":[-150.69299136606685,342.5925925925925]}}},{\\\"normal\\\":[0,-1],\\\"dist\\\":-370,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"all\\\"],\\\"cGroup\\\":[\\\"wall\\\"],\\\"_data\\\":{\\\"extremes\\\":{\\\"normal\\\":[0,-1],\\\"dist\\\":-370,\\\"canvas_rect\\\":[-825.9259259259258,-342.5925925925925,826.8518518518516,342.5925925925925],\\\"a\\\":[-825.9259259259258,370],\\\"b\\\":[826.8518518518516,370]}}}],\\\"joints\\\":[],\\\"playerPhysics\\\":{\\\"radius\\\":15,\\\"bCoef\\\":0.5,\\\"invMass\\\":0.5,\\\"damping\\\":0.96,\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\"],\\\"acceleration\\\":0.1,\\\"gravity\\\":[0,0],\\\"kickingAcceleration\\\":0.07,\\\"kickingDamping\\\":0.96,\\\"kickStrength\\\":10,\\\"kickback\\\":0},\\\"ballPhysics\\\":\\\"disc0\\\"}\"";
var mapLuckDios = "\"{\\\"name\\\":\\\"Luck DIOS 2 by Pagus\\\",\\\"width\\\":600,\\\"height\\\":600,\\\"bg\\\":{\\\"color\\\":\\\"AC6FF3\\\"},\\\"vertexes\\\":[{\\\"x\\\":0,\\\"y\\\":9,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"]},{\\\"x\\\":515,\\\"y\\\":-102.00000000000006,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"]},{\\\"x\\\":515,\\\"y\\\":540,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"]},{\\\"x\\\":-237.98009254208867,\\\"y\\\":540,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"]},{\\\"x\\\":-237.98009254208867,\\\"y\\\":-104.99900462710445,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"]},{\\\"x\\\":-191.2688904517049,\\\"y\\\":99.24886291712517,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-184.2688904517049,\\\"y\\\":77.24886291712517,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-177.2688904517049,\\\"y\\\":100.24886291712517,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-189.2688904517049,\\\"y\\\":91.24886291712517,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-182.2688904517049,\\\"y\\\":91.24886291712517,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-3.6907663828201613,\\\"y\\\":540.8457299639617,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"]},{\\\"x\\\":-0.2597120000000075,\\\"y\\\":22.712947796982142,\\\"bCoef\\\":5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"]},{\\\"x\\\":-170.2688904517049,\\\"y\\\":99.24886291712517,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-170.2688904517049,\\\"y\\\":79.24886291712517,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-152.2688904517049,\\\"y\\\":101.24886291712517,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-146.2688904517049,\\\"y\\\":82.24886291712517,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-141.2688904517049,\\\"y\\\":101.24886291712517,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-135.2688904517049,\\\"y\\\":82.24886291712517,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-129.2688904517049,\\\"y\\\":101.24886291712517,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-189.29629130539075,\\\"y\\\":165.57854002835467,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-188.1931975313741,\\\"y\\\":189.11120720737642,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-188.62960824181192,\\\"y\\\":165.85720828144548,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-186.8329878543726,\\\"y\\\":180.86028046138875,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-174.11442307447385,\\\"y\\\":187.73008564409918,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-167.62796823978476,\\\"y\\\":165.83830057702352,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-157.89828598775117,\\\"y\\\":186.64900983831774,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-170.8711956571293,\\\"y\\\":178.00040339206555,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-160.87124445365032,\\\"y\\\":178.81121024640174,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-141.36690719606253,\\\"y\\\":168.67590835203885,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-148.66416888508775,\\\"y\\\":176.24343899250948,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-150.28578259376005,\\\"y\\\":187.05419705032466,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-144.27980589497383,\\\"y\\\":178.67585955551783,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-150.85607884508818,\\\"y\\\":254.59825191343194,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-151.78930839060192,\\\"y\\\":273.26284282370636,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-150.45189905547332,\\\"y\\\":263.9244785080384,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-139.45801596519266,\\\"y\\\":256.45693527690435,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-140.44578623386118,\\\"y\\\":273.98985754577063,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-133.03750921884728,\\\"y\\\":273.98985754577063,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-133.03750921884728,\\\"y\\\":260.6549589187456,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-134.02527948751577,\\\"y\\\":254.23445217240018,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-131.30891124867736,\\\"y\\\":254.72833730673446,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-119.20872545748796,\\\"y\\\":255.71610757540302,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-118.71484032315371,\\\"y\\\":274.19185261463224,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-111.80044844247405,\\\"y\\\":254.48139473956738,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-112.9247262486295,\\\"y\\\":275.4347012722134,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-111.55350587530691,\\\"y\\\":265.7123426943284,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-103.26611332117801,\\\"y\\\":256.7038778440716,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-101.97213426922225,\\\"y\\\":273.7824257893502,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-134.7997502888905,\\\"y\\\":322.35013752626253,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-127.7997502888905,\\\"y\\\":300.35013752626253,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-120.79975028889048,\\\"y\\\":323.35013752626253,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-132.7997502888905,\\\"y\\\":314.35013752626253,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-122.32406932894476,\\\"y\\\":314.35013752626253,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-114.34029795108542,\\\"y\\\":323.76132683106607,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-114.50785982132948,\\\"y\\\":301.6434718922909,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-102.79975028889048,\\\"y\\\":323.1915772062806,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-102.73825580823487,\\\"y\\\":301.0371164978628,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-148.7997502888905,\\\"y\\\":321.35013752626253,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-148.7997502888905,\\\"y\\\":299.35013752626253,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-148.7997502888905,\\\"y\\\":309.35013752626253,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-190.89343404857402,\\\"y\\\":251.6049752537518,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-191.349167280479,\\\"y\\\":270.9736376097136,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-179.50010325094945,\\\"y\\\":270.7457709937611,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-190.66556743262154,\\\"y\\\":261.85897297161387,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-180.41156971475942,\\\"y\\\":261.85897297161387,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-180.63943633071193,\\\"y\\\":251.8328418697043,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-189.813434048574,\\\"y\\\":299.86120540308866,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-190.269167280479,\\\"y\\\":319.2298677590504,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-178.42010325094944,\\\"y\\\":319.0020011430979,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-189.58556743262153,\\\"y\\\":310.1152031209507,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-179.3315697147594,\\\"y\\\":310.1152031209507,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-179.55943633071192,\\\"y\\\":300.08907201904117,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-170.05961637367344,\\\"y\\\":262.4104774054905,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-158.9732988636929,\\\"y\\\":262.99396780075267,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-167.72619256162886,\\\"y\\\":310.4236604009826,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-156.05638465638617,\\\"y\\\":310.4236604009826,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-69.56658302823656,\\\"y\\\":255.60661252806315,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-60.67904357151592,\\\"y\\\":251.37445088200568,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-62.44894103246462,\\\"y\\\":273.9536530861801,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-190.37629130539077,\\\"y\\\":125.3851218601,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-189.2731975313741,\\\"y\\\":148.91778903912171,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-189.70960824181194,\\\"y\\\":125.66379011319081,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-179.74598948996757,\\\"y\\\":137.94452950499902,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-188.55104792183008,\\\"y\\\":137.01768124901355,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-155.37703854139548,\\\"y\\\":137.38639589600336,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-141.12998645457395,\\\"y\\\":137.06916808021873,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-170.59289909354146,\\\"y\\\":150.27446269044333,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-169.95305782591507,\\\"y\\\":125.96037899857451,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-169.95305782591507,\\\"y\\\":137.79750021069572,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-159.93949000263234,\\\"y\\\":150.46640351852454,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-137.13136175799005,\\\"y\\\":128.44190943989219,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-119.92408261862222,\\\"y\\\":128.46983065337258,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-128.87314379715903,\\\"y\\\":130.04678791417496,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-128.51510574864312,\\\"y\\\":149.06943229254784,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-110.96155766693127,\\\"y\\\":128.32280790575413,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-111.46205572516345,\\\"y\\\":149.59397538062194,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-98.44910621112672,\\\"y\\\":149.34372635150584,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-110.7113086378152,\\\"y\\\":139.58401421597824,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-99.45010232759108,\\\"y\\\":139.58401421597824,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-99.70035135670716,\\\"y\\\":128.57305693487024,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-137.20483055657863,\\\"y\\\":398.07998318889264,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-134.97480204373346,\\\"y\\\":504.3053550172798,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-114.83418837677611,\\\"y\\\":506.84084309323043,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-118.10758567572033,\\\"y\\\":398.07998318889264,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-171.12030959687405,\\\"y\\\":422.21302569597697,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-84.44350999104431,\\\"y\\\":424.38899800133623,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-85.27065394719916,\\\"y\\\":443.5402990896806,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-169.71742504018357,\\\"y\\\":444.00792727524407,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-0.3065145065159425,\\\"y\\\":-14.537257088640963,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"]},{\\\"x\\\":0.4285153462805109,\\\"y\\\":-103.47586927701181,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"]},{\\\"x\\\":514.0308336059327,\\\"y\\\":19.180927226696248,\\\"bCoef\\\":5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"]},{\\\"x\\\":-87.87392318124745,\\\"y\\\":265.00827223107535,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-78.71893780429448,\\\"y\\\":273.78289842765423,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-87.42474530924613,\\\"y\\\":273.78289842765423,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-78.71893780429448,\\\"y\\\":263.83340413628093,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-43.38748677499267,\\\"y\\\":255.5734572699965,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-45.4301464442484,\\\"y\\\":274.3659262271492,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-43.79601870884382,\\\"y\\\":254.7563934022942,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-45.98113485650522,\\\"y\\\":274.3659262271492,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-22.80110952678448,\\\"y\\\":256.00234012933413,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-24.843769196040213,\\\"y\\\":274.7948090864869,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-23.20964146063563,\\\"y\\\":255.18527626163186,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-25.394757608297034,\\\"y\\\":274.7948090864868,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-55.38628219255011,\\\"y\\\":212.5970836566464,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-55.38628219255011,\\\"y\\\":234.60803821043058,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-45.381302849920914,\\\"y\\\":233.6075402761676,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-4.5942229688320015,\\\"y\\\":443.18657401651217,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":514.7074509455362,\\\"y\\\":446.36032266240016,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-77.53465248666423,\\\"y\\\":129.39799244160258,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-77.04076735232998,\\\"y\\\":150.59607026896683,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-77.04076735232998,\\\"y\\\":150.59607026896683,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":247.67610926098757,\\\"y\\\":297.32576726921684,\\\"bCoef\\\":4,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":245.42663837736902,\\\"y\\\":375.98585537866944,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":280.38799872748814,\\\"y\\\":375.98585537866944,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":276.94783295033017,\\\"y\\\":294.88063827373117,\\\"bCoef\\\":4,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":460.81069958847735,\\\"y\\\":60.30178326474622,\\\"bCoef\\\":5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":40.29492455418381,\\\"y\\\":66.87242798353908,\\\"bCoef\\\":5},{\\\"x\\\":-149.5342800388111,\\\"y\\\":211.49258832259943,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-147.17488539846943,\\\"y\\\":233.38431901351913,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-146.84213208551674,\\\"y\\\":222.19898822350868,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-189.813434048574,\\\"y\\\":341.8612054030886,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-190.269167280479,\\\"y\\\":361.2298677590505,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-178.42010325094944,\\\"y\\\":361.00200114309797,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-189.58556743262153,\\\"y\\\":352.11520312095075,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-179.3315697147594,\\\"y\\\":352.11520312095075,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-179.55943633071192,\\\"y\\\":342.0890720190411,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-167.72619256162886,\\\"y\\\":352.42366040098256,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-156.05638465638617,\\\"y\\\":352.42366040098256,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-149.2592882569175,\\\"y\\\":362.45188074977256,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-142.2592882569175,\\\"y\\\":340.45188074977256,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-135.2592882569175,\\\"y\\\":363.45188074977256,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-147.2592882569175,\\\"y\\\":354.45188074977256,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-140.2592882569175,\\\"y\\\":354.45188074977256,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-128.2592882569175,\\\"y\\\":362.45188074977256,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-128.2592882569175,\\\"y\\\":342.45188074977256,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-110.2592882569175,\\\"y\\\":364.45188074977256,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-104.2592882569175,\\\"y\\\":345.45188074977256,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-99.2592882569175,\\\"y\\\":364.45188074977256,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-93.2592882569175,\\\"y\\\":345.45188074977256,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-87.2592882569175,\\\"y\\\":364.45188074977256,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":503.74984711172976,\\\"y\\\":-101.05064892915225,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":512.7876350426677,\\\"y\\\":-93.75663036832907,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":1.0112756294625074,\\\"y\\\":-96.30595126246358,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":6.6534762842855,\\\"y\\\":-100.65138396338929,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":169.10957976853214,\\\"y\\\":296.3347371766242,\\\"bCoef\\\":4,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":166.8601088849136,\\\"y\\\":374.99482528607683,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":201.8214692350327,\\\"y\\\":374.99482528607683,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":198.38130345787474,\\\"y\\\":293.8896081811385,\\\"bCoef\\\":4,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":94.521102402277,\\\"y\\\":296.3347371766242,\\\"bCoef\\\":4,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":92.27163151865844,\\\"y\\\":374.99482528607683,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":127.23299186877756,\\\"y\\\":374.99482528607683,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":123.79282609161959,\\\"y\\\":293.8896081811385,\\\"bCoef\\\":4,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":23.05333834192035,\\\"y\\\":297.32576726921684,\\\"bCoef\\\":4,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":20.803867458301795,\\\"y\\\":375.98585537866944,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":55.76522780842092,\\\"y\\\":375.98585537866944,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":52.325062031262945,\\\"y\\\":294.88063827373117,\\\"bCoef\\\":4,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":319.69257016633736,\\\"y\\\":298.2433877253211,\\\"bCoef\\\":4,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":317.4430992827188,\\\"y\\\":376.9034758347737,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":352.4044596328379,\\\"y\\\":376.9034758347737,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":348.96429385567995,\\\"y\\\":295.7982587298354,\\\"bCoef\\\":4,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":391.70903107168715,\\\"y\\\":298.2433877253211,\\\"bCoef\\\":4,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":389.45956018806856,\\\"y\\\":376.9034758347737,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":424.4209205381877,\\\"y\\\":376.9034758347737,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":420.98075476102974,\\\"y\\\":295.7982587298354,\\\"bCoef\\\":4,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":456.86678141462266,\\\"y\\\":299.1610081814253,\\\"bCoef\\\":4,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":454.6173105310041,\\\"y\\\":377.82109629087796,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":489.57867088112323,\\\"y\\\":377.82109629087796,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":486.13850510396526,\\\"y\\\":296.7158791859397,\\\"bCoef\\\":4,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":249.01276850987534,\\\"y\\\":72.21848639091921,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":265.0323538840176,\\\"y\\\":74.68303798694107,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":239.42826898125261,\\\"y\\\":131.85031060110097,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":156.1012685281933,\\\"y\\\":190.95434580617803,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":268.4958272788315,\\\"y\\\":129.9124733812624,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":352.79174634181004,\\\"y\\\":189.98542719625868,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":303.376897235926,\\\"y\\\":215.17731105416033,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":288.84311808713665,\\\"y\\\":176.42056665738858,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":341.57630790342427,\\\"y\\\":342.6173064870583,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":181.04733088464224,\\\"y\\\":333.29967620738114,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":233.61475732173685,\\\"y\\\":174.48272943755,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":157.07018713811257,\\\"y\\\":192.8921830260166,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":215.20530373327026,\\\"y\\\":230.68000881286906,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":162.88369879762834,\\\"y\\\":207.42596217480605,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":351.8228277318907,\\\"y\\\":212.27055522440247,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":230.70800149197896,\\\"y\\\":138.63274087053605,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":159.00802435795114,\\\"y\\\":117.31653145231158,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":16.897894543419994,\\\"y\\\":227.1283407563489,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":107.97624387583383,\\\"y\\\":241.6621199051383,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":154.16343130835466,\\\"y\\\":234.55568325254626,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":185.16882682577213,\\\"y\\\":224.8664971533533,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":275.27825754826654,\\\"y\\\":141.53949670029397,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":356.6674207814873,\\\"y\\\":120.22328728206944,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":500.0673750495429,\\\"y\\\":223.897578543434,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":412.8647001568063,\\\"y\\\":234.55568325254626,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":373.1390371501153,\\\"y\\\":228.7421715930305,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":341.1647230227785,\\\"y\\\":220.99082271367615,\\\"bCoef\\\":100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-2.7209779200000015,\\\"y\\\":43.535646720000024,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-238.0855680000001,\\\"y\\\":43.535646720000024,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-191.6909782015878,\\\"y\\\":233.98619592559496,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-191.0511369339614,\\\"y\\\":209.67211223372612,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-191.0511369339614,\\\"y\\\":221.50923344584734,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-181.03756911067867,\\\"y\\\":234.17813675367617,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-173.87885412273022,\\\"y\\\":212.8117330228279,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-174.3345873546352,\\\"y\\\":232.18039537878968,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-162.48552332510565,\\\"y\\\":231.95252876283718,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-173.65098750677774,\\\"y\\\":223.06573074068996,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-163.39698978891562,\\\"y\\\":223.06573074068996,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-163.62485640486813,\\\"y\\\":213.0395996387804,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-134.61076793407972,\\\"y\\\":232.84497601591607,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-128.3992308314626,\\\"y\\\":211.51238288202998,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-120.55654682775054,\\\"y\\\":231.90802794216086,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-131.21007505272846,\\\"y\\\":222.05304871177688,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-122.54330537049212,\\\"y\\\":222.7557597670934,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-94.50105904827157,\\\"y\\\":233.43482467600148,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-88.28952194565446,\\\"y\\\":212.1022315421154,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-80.44683794194239,\\\"y\\\":232.49787660224627,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-91.10036616692031,\\\"y\\\":222.6428973718623,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-82.43359648468397,\\\"y\\\":223.3456084271788,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-38.79324223092392,\\\"y\\\":234.8012029766448,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-35.39032624575516,\\\"y\\\":234.80120297664482,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-112.5205870699032,\\\"y\\\":213.6971780814491,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-112.5205870699032,\\\"y\\\":232.77365852841885,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-103.84945959400784,\\\"y\\\":231.90654578082928,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"]}],\\\"segments\\\":[{\\\"v0\\\":1,\\\"v1\\\":2,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":2,\\\"v1\\\":3,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":3,\\\"v1\\\":4,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":4,\\\"v1\\\":1,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":5,\\\"v1\\\":6,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FF1100\\\"},{\\\"v0\\\":6,\\\"v1\\\":7,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FF1100\\\"},{\\\"v0\\\":8,\\\"v1\\\":9,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FF1100\\\"},{\\\"v0\\\":0,\\\"v1\\\":10,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":13,\\\"v1\\\":12,\\\"bCoef\\\":0.5,\\\"curve\\\":-151.1866061420753,\\\"curveF\\\":-0.25688095297274743,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FF1100\\\"},{\\\"v0\\\":14,\\\"v1\\\":15,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FF1100\\\"},{\\\"v0\\\":15,\\\"v1\\\":16,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FF1100\\\"},{\\\"v0\\\":16,\\\"v1\\\":17,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FF1100\\\"},{\\\"v0\\\":17,\\\"v1\\\":18,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FF1100\\\"},{\\\"v0\\\":19,\\\"v1\\\":20,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"CE004\\\"},{\\\"v0\\\":21,\\\"v1\\\":22,\\\"bCoef\\\":0.5,\\\"curve\\\":-130.871212692778,\\\"curveF\\\":-0.45708424779477314,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"CE004\\\"},{\\\"v0\\\":23,\\\"v1\\\":24,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"CE004\\\"},{\\\"v0\\\":24,\\\"v1\\\":25,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"CE004\\\"},{\\\"v0\\\":26,\\\"v1\\\":27,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"CE004\\\"},{\\\"v0\\\":29,\\\"v1\\\":28,\\\"bCoef\\\":0.5,\\\"curve\\\":-134.83333663799147,\\\"curveF\\\":-0.41591854060621836,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"CE004\\\"},{\\\"v0\\\":29,\\\"v1\\\":30,\\\"bCoef\\\":0.5,\\\"curve\\\":-134.57447549767548,\\\"curveF\\\":-0.4185708052883361,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"CE004\\\"},{\\\"v0\\\":29,\\\"v1\\\":29,\\\"bCoef\\\":0.5,\\\"curve\\\":-160.00000000000003,\\\"curveF\\\":-0.17632698070846492,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"CE004\\\"},{\\\"v0\\\":31,\\\"v1\\\":29,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"CE004\\\"},{\\\"v0\\\":32,\\\"v1\\\":33,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":34,\\\"v1\\\":35,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":34,\\\"v1\\\":36,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":37,\\\"v1\\\":38,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":39,\\\"v1\\\":40,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":42,\\\"v1\\\":41,\\\"bCoef\\\":0.5,\\\"curve\\\":-172.84733125000344,\\\"curveF\\\":-0.06250000000001638,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":43,\\\"v1\\\":44,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":45,\\\"v1\\\":46,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":45,\\\"v1\\\":47,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":48,\\\"v1\\\":49,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"EC08EC\\\"},{\\\"v0\\\":49,\\\"v1\\\":50,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"EC08EC\\\"},{\\\"v0\\\":51,\\\"v1\\\":52,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"EC08EC\\\"},{\\\"v0\\\":53,\\\"v1\\\":54,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"EC08EC\\\"},{\\\"v0\\\":54,\\\"v1\\\":55,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"EC08EC\\\"},{\\\"v0\\\":55,\\\"v1\\\":56,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"EC08EC\\\"},{\\\"v0\\\":57,\\\"v1\\\":58,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"EC08EC\\\"},{\\\"v0\\\":58,\\\"v1\\\":59,\\\"bCoef\\\":0.5,\\\"curve\\\":-126.86989764584402,\\\"curveF\\\":-0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"EC08EC\\\"},{\\\"v0\\\":59,\\\"v1\\\":57,\\\"bCoef\\\":0.5,\\\"curve\\\":-146.3826167475863,\\\"curveF\\\":-0.3020833333333334,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"EC08EC\\\"},{\\\"v0\\\":60,\\\"v1\\\":61,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":61,\\\"v1\\\":62,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":63,\\\"v1\\\":64,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":60,\\\"v1\\\":65,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":66,\\\"v1\\\":67,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"EC08EC\\\"},{\\\"v0\\\":67,\\\"v1\\\":68,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"EC08EC\\\"},{\\\"v0\\\":69,\\\"v1\\\":70,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"EC08EC\\\"},{\\\"v0\\\":66,\\\"v1\\\":71,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"EC08EC\\\"},{\\\"v0\\\":72,\\\"v1\\\":73,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":74,\\\"v1\\\":75,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"EC08EC\\\"},{\\\"v0\\\":76,\\\"v1\\\":77,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":77,\\\"v1\\\":78,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":79,\\\"v1\\\":80,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":81,\\\"v1\\\":82,\\\"bCoef\\\":0.5,\\\"curve\\\":140,\\\"curveF\\\":0.36397023426620245,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":82,\\\"v1\\\":83,\\\"bCoef\\\":0.5,\\\"curve\\\":140,\\\"curveF\\\":0.36397023426620245,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":84,\\\"v1\\\":85,\\\"bCoef\\\":0.5,\\\"curve\\\":175.14491094635713,\\\"curveF\\\":0.042394014962580856,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":85,\\\"v1\\\":84,\\\"bCoef\\\":0.5,\\\"curve\\\":-146.6667050322256,\\\"curveF\\\":-0.2993799822852247,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":86,\\\"v1\\\":87,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":87,\\\"v1\\\":88,\\\"bCoef\\\":0.5,\\\"curve\\\":-142.15071116789767,\\\"curveF\\\":-0.34285714285714175,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":88,\\\"v1\\\":89,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":90,\\\"v1\\\":91,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":92,\\\"v1\\\":93,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":94,\\\"v1\\\":95,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":95,\\\"v1\\\":96,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":97,\\\"v1\\\":98,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":94,\\\"v1\\\":99,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":100,\\\"v1\\\":101,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":101,\\\"v1\\\":102,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":102,\\\"v1\\\":103,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":100,\\\"v1\\\":103,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":104,\\\"v1\\\":105,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":105,\\\"v1\\\":106,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":106,\\\"v1\\\":107,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":104,\\\"v1\\\":107,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":13,\\\"v1\\\":12,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FF1100\\\"},{\\\"v0\\\":108,\\\"v1\\\":109,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":111,\\\"v1\\\":112,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":113,\\\"v1\\\":114,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":116,\\\"v1\\\":115,\\\"bCoef\\\":0.5,\\\"curve\\\":155.1747036937615,\\\"curveF\\\":0.22009569377993432,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":117,\\\"v1\\\":118,\\\"bCoef\\\":0.5,\\\"curve\\\":153.00853343839822,\\\"curveF\\\":0.2400000000000938,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":120,\\\"v1\\\":119,\\\"bCoef\\\":0.5,\\\"curve\\\":155.1747036937615,\\\"curveF\\\":0.22009569377993432,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":121,\\\"v1\\\":122,\\\"bCoef\\\":0.5,\\\"curve\\\":153.00853343839822,\\\"curveF\\\":0.2400000000000938,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"67290A\\\"},{\\\"v0\\\":123,\\\"v1\\\":124,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":124,\\\"v1\\\":125,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":127,\\\"v1\\\":126,\\\"bCoef\\\":0,\\\"curve\\\":38.086963699741275,\\\"curveF\\\":2.897066811123707,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":129,\\\"v1\\\":128,\\\"bCoef\\\":0.5,\\\"curve\\\":-151.2154130014845,\\\"curveF\\\":-0.25661299449997027,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":131,\\\"v1\\\":132,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":132,\\\"v1\\\":133,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":133,\\\"v1\\\":134,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":110,\\\"v1\\\":135,\\\"bCoef\\\":5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":11,\\\"v1\\\":136,\\\"bCoef\\\":5,\\\"color\\\":\\\"ED7006\\\"},{\\\"v0\\\":138,\\\"v1\\\":137,\\\"bCoef\\\":0.5,\\\"curve\\\":122.77908066807078,\\\"curveF\\\":0.5454545454545318,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":139,\\\"v1\\\":138,\\\"bCoef\\\":0.5,\\\"curve\\\":178.09031749225443,\\\"curveF\\\":0.016666666666677217,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":140,\\\"v1\\\":141,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"1B4BED\\\"},{\\\"v0\\\":141,\\\"v1\\\":142,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"1B4BED\\\"},{\\\"v0\\\":143,\\\"v1\\\":144,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"1B4BED\\\"},{\\\"v0\\\":140,\\\"v1\\\":145,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"1B4BED\\\"},{\\\"v0\\\":146,\\\"v1\\\":147,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"1B4BED\\\"},{\\\"v0\\\":148,\\\"v1\\\":149,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"1B4BED\\\"},{\\\"v0\\\":149,\\\"v1\\\":150,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"1B4BED\\\"},{\\\"v0\\\":151,\\\"v1\\\":152,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"1B4BED\\\"},{\\\"v0\\\":154,\\\"v1\\\":153,\\\"bCoef\\\":0.5,\\\"curve\\\":-151.1866061420753,\\\"curveF\\\":-0.25688095297274743,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"1B4BED\\\"},{\\\"v0\\\":155,\\\"v1\\\":156,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"1B4BED\\\"},{\\\"v0\\\":156,\\\"v1\\\":157,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"1B4BED\\\"},{\\\"v0\\\":157,\\\"v1\\\":158,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"1B4BED\\\"},{\\\"v0\\\":158,\\\"v1\\\":159,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"1B4BED\\\"},{\\\"v0\\\":154,\\\"v1\\\":153,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"1B4BED\\\"},{\\\"v0\\\":161,\\\"v1\\\":160,\\\"bCoef\\\":0.5,\\\"curve\\\":-40.673546357463,\\\"curveF\\\":-2.698028253724163,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":163,\\\"v1\\\":162,\\\"bCoef\\\":0.5,\\\"curve\\\":-25.681156281906436,\\\"curveF\\\":-4.3871324193184105,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":164,\\\"v1\\\":165,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":165,\\\"v1\\\":166,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":166,\\\"v1\\\":167,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":168,\\\"v1\\\":169,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":169,\\\"v1\\\":170,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":170,\\\"v1\\\":171,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":172,\\\"v1\\\":173,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":173,\\\"v1\\\":174,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":174,\\\"v1\\\":175,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":176,\\\"v1\\\":177,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":177,\\\"v1\\\":178,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":178,\\\"v1\\\":179,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":180,\\\"v1\\\":181,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":181,\\\"v1\\\":182,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":182,\\\"v1\\\":183,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":184,\\\"v1\\\":185,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":185,\\\"v1\\\":186,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":186,\\\"v1\\\":187,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"E3FAFF\\\"},{\\\"v0\\\":189,\\\"v1\\\":188,\\\"bCoef\\\":0.5,\\\"curve\\\":-29.89415969131536,\\\"curveF\\\":-3.745886654479038,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":190,\\\"v1\\\":191,\\\"bCoef\\\":100000,\\\"curve\\\":40.50375873525814,\\\"curveF\\\":2.7103448275862165,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":193,\\\"v1\\\":192,\\\"bCoef\\\":100000,\\\"curve\\\":26.80006689912635,\\\"curveF\\\":4.197549770290945,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":193,\\\"v1\\\":194,\\\"bCoef\\\":100000,\\\"curve\\\":169.79566949528405,\\\"curveF\\\":0.08928571428571067,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":195,\\\"v1\\\":196,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":196,\\\"v1\\\":197,\\\"bCoef\\\":0.5,\\\"curve\\\":48.01660231051513,\\\"curveF\\\":2.2451612903225806,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":197,\\\"v1\\\":198,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":200,\\\"v1\\\":199,\\\"bCoef\\\":100000,\\\"curve\\\":84.09844178198757,\\\"curveF\\\":1.1086956521739078,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":201,\\\"v1\\\":199,\\\"bCoef\\\":100000,\\\"curve\\\":-84.79487559500102,\\\"curveF\\\":-1.0952380952380831,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":193,\\\"v1\\\":202,\\\"bCoef\\\":100000,\\\"curve\\\":-126.86989764584489,\\\"curveF\\\":-0.49999999999999056,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":204,\\\"v1\\\":203,\\\"bCoef\\\":100000,\\\"curve\\\":52.63829610761478,\\\"curveF\\\":2.021645021645013,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":204,\\\"v1\\\":205,\\\"bCoef\\\":100000,\\\"curve\\\":13.163889310355986,\\\"curveF\\\":8.666666666666691,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":206,\\\"v1\\\":205,\\\"bCoef\\\":100000,\\\"curve\\\":104.17244871573367,\\\"curveF\\\":0.7788649706457973,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":207,\\\"v1\\\":206,\\\"bCoef\\\":100000,\\\"curve\\\":101.53977011575921,\\\"curveF\\\":0.8164556962025329,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":208,\\\"v1\\\":207,\\\"bCoef\\\":100000,\\\"curve\\\":161.85700484564566,\\\"curveF\\\":0.15966386554621853,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":209,\\\"v1\\\":210,\\\"bCoef\\\":100000,\\\"curve\\\":52.63829610761478,\\\"curveF\\\":2.021645021645013,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":211,\\\"v1\\\":210,\\\"bCoef\\\":100000,\\\"curve\\\":15.923913497584604,\\\"curveF\\\":7.149812734082422,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":211,\\\"v1\\\":212,\\\"bCoef\\\":100000,\\\"curve\\\":89.14992984418244,\\\"curveF\\\":1.0149476831091186,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":212,\\\"v1\\\":213,\\\"bCoef\\\":100000,\\\"curve\\\":52.63829610761478,\\\"curveF\\\":2.021645021645013,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":213,\\\"v1\\\":214,\\\"bCoef\\\":100000,\\\"curve\\\":52.63829610761478,\\\"curveF\\\":2.021645021645013,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":215,\\\"v1\\\":216,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF1100\\\"},{\\\"v0\\\":217,\\\"v1\\\":218,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":218,\\\"v1\\\":219,\\\"bCoef\\\":0.5,\\\"curve\\\":-142.15071116789767,\\\"curveF\\\":-0.34285714285714175,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":219,\\\"v1\\\":220,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":221,\\\"v1\\\":222,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":222,\\\"v1\\\":223,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":224,\\\"v1\\\":225,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":221,\\\"v1\\\":226,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":227,\\\"v1\\\":228,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":228,\\\"v1\\\":229,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":230,\\\"v1\\\":231,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":232,\\\"v1\\\":233,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":233,\\\"v1\\\":234,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":235,\\\"v1\\\":236,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":237,\\\"v1\\\":238,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":239,\\\"v1\\\":240,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"},{\\\"v0\\\":240,\\\"v1\\\":241,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"2A505E\\\"}],\\\"planes\\\":[{\\\"normal\\\":[1,0],\\\"dist\\\":-240.97810179629755,\\\"bCoef\\\":0.5},{\\\"normal\\\":[-1,0],\\\"dist\\\":-517.0032,\\\"bCoef\\\":0.5},{\\\"normal\\\":[0,1],\\\"dist\\\":-103,\\\"bCoef\\\":0.5},{\\\"normal\\\":[0,-1],\\\"dist\\\":-539.8128,\\\"bCoef\\\":0.5},{\\\"normal\\\":[1,0],\\\"dist\\\":-8.499200000000002,\\\"cMask\\\":[\\\"ball\\\"]}],\\\"goals\\\":[],\\\"discs\\\":[{\\\"gravity\\\":[0,0.05],\\\"radius\\\":7,\\\"color\\\":\\\"FF0000\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"ball\\\",\\\"kick\\\",\\\"score\\\"]},{\\\"pos\\\":[298.7539837913851,59.0480739195222],\\\"radius\\\":6.757894736842105,\\\"bCoef\\\":3,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[40.50735371858315,68.95954480546658],\\\"radius\\\":6.757894736842105,\\\"bCoef\\\":3,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[421.17232685387415,81.3625158146687],\\\"radius\\\":6.757894736842105,\\\"bCoef\\\":3,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[73.85855621326837,73.44482887105451],\\\"radius\\\":6.757894736842105,\\\"bCoef\\\":3,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[-210.90637344573474,135.9511263256453],\\\"radius\\\":12.806248474865697,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[-210.22632801770496,177.77482991456566],\\\"radius\\\":12.806248474865697,\\\"invMass\\\":0,\\\"color\\\":\\\"CE004\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[-211.88969710521084,88.24886291712517],\\\"radius\\\":12.806248474865697,\\\"invMass\\\":0,\\\"color\\\":\\\"FF1100\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[-211.58397603061076,263.86161190264284],\\\"radius\\\":12.806248474865697,\\\"invMass\\\":0,\\\"color\\\":\\\"67290A\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[-209.9984684838792,310.4997551974383],\\\"radius\\\":12.806248474865697,\\\"invMass\\\":0,\\\"color\\\":\\\"EC08EC\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[-212.64215772312647,223.56486274523937],\\\"radius\\\":12.806248474865697,\\\"invMass\\\":0,\\\"color\\\":\\\"2A505E\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[123.0751787918217,55.7820463311657],\\\"radius\\\":6.757894736842105,\\\"bCoef\\\":3,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[165.47800868524226,76.61287859967018],\\\"radius\\\":6.757894736842105,\\\"bCoef\\\":3,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[208.68439425400382,64.15302382012057],\\\"radius\\\":6.757894736842105,\\\"bCoef\\\":3,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[336.2929616244735,78.48915219165144],\\\"radius\\\":6.757894736842105,\\\"bCoef\\\":3,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[263.46827764229465,513.2383388100366],\\\"radius\\\":12.806248474865697,\\\"invMass\\\":0,\\\"color\\\":\\\"CE004\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[407.8401691404173,402.52612638565006],\\\"radius\\\":10.94708900792234,\\\"invMass\\\":0,\\\"color\\\":\\\"67290A\\\",\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[111.00617361824382,400.07922373262204],\\\"radius\\\":11.746969392110763,\\\"invMass\\\":0,\\\"color\\\":\\\"EC08EC\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[186.30412629367953,397.8038322344074],\\\"radius\\\":10.324214235017338,\\\"invMass\\\":0,\\\"color\\\":\\\"2A505E\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[335.5787701803519,401.89249773593014],\\\"radius\\\":11.83925423354525,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[39.790067154629185,400.84037017571217],\\\"radius\\\":10.372116413846001,\\\"invMass\\\":0,\\\"color\\\":\\\"FF1100\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[473.474215060221,402.8616125562106],\\\"radius\\\":10.372116413846001,\\\"invMass\\\":0,\\\"color\\\":\\\"FF1100\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[263.77400667315624,400.5162134378554],\\\"radius\\\":10.931348029002592,\\\"invMass\\\":0,\\\"color\\\":\\\"1B4BED\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[277.36985133905074,297.11356966920516],\\\"radius\\\":6.322893129248053,\\\"bCoef\\\":4,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[247.69025489017173,296.956260730657],\\\"radius\\\":6.322893129248053,\\\"bCoef\\\":4,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[353.62366829069924,43.61597515409011],\\\"radius\\\":6.757894736842105,\\\"bCoef\\\":3,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[460.3534350945401,61.050817403747175],\\\"radius\\\":6.757894736842105,\\\"bCoef\\\":3,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[377.17232685387415,85.3625158146687],\\\"radius\\\":6.757894736842105,\\\"bCoef\\\":3,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[-209.9984684838792,352.4997551974382],\\\"radius\\\":12.806248474865697,\\\"invMass\\\":0,\\\"color\\\":\\\"1B4BED\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[198.8033218465953,296.12253957661255],\\\"radius\\\":6.322893129248053,\\\"bCoef\\\":4,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[169.1237253977163,295.9652306380643],\\\"radius\\\":6.322893129248053,\\\"bCoef\\\":4,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[124.21484448034016,296.12253957661255],\\\"radius\\\":6.322893129248053,\\\"bCoef\\\":4,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[94.53524803146115,295.9652306380643],\\\"radius\\\":6.322893129248053,\\\"bCoef\\\":4,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[52.74708041998352,297.11356966920516],\\\"radius\\\":6.322893129248053,\\\"bCoef\\\":4,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[23.067483971104508,296.956260730657],\\\"radius\\\":6.322893129248053,\\\"bCoef\\\":4,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[349.38631224440053,298.0311901253094],\\\"radius\\\":6.322893129248053,\\\"bCoef\\\":4,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[319.7067157955215,297.87388118676125],\\\"radius\\\":6.322893129248053,\\\"bCoef\\\":4,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[421.4027731497503,298.0311901253094],\\\"radius\\\":6.322893129248053,\\\"bCoef\\\":4,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[391.7231767008713,297.87388118676125],\\\"radius\\\":6.322893129248053,\\\"bCoef\\\":4,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[486.56052349268583,298.9488105814137],\\\"radius\\\":6.322893129248053,\\\"bCoef\\\":4,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[456.8809270438068,298.79150164286546],\\\"radius\\\":6.322893129248053,\\\"bCoef\\\":4,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[239.65715718027215,95.24383964643904],\\\"radius\\\":7,\\\"bCoef\\\":1.5,\\\"invMass\\\":0.1,\\\"cMask\\\":[\\\"ball\\\",\\\"wall\\\"]},{\\\"pos\\\":[264.40209547854545,96.55221546849461],\\\"radius\\\":7,\\\"bCoef\\\":1.5,\\\"invMass\\\":0.1,\\\"cMask\\\":[\\\"ball\\\",\\\"wall\\\"]},{\\\"pos\\\":[398.2118764240467,42.76670134574382],\\\"radius\\\":6.757894736842105,\\\"bCoef\\\":3,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[256.65355545910467,69.66930690704837],\\\"radius\\\":6.757894736842105,\\\"bCoef\\\":3,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[107.42698679182168,87.20937433116572],\\\"radius\\\":6.757894736842105,\\\"bCoef\\\":3,\\\"invMass\\\":0,\\\"color\\\":\\\"ED7006\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]}],\\\"playerPhysics\\\":{\\\"kickStrength\\\":10,\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\"]},\\\"ballPhysics\\\":\\\"disc0\\\",\\\"spawnDistance\\\":170,\\\"blueSpawnPoints\\\":[[498.85,-83.14],[20.16,-83.14]]}\"";
var mapLuckHell = "\"{\\\"name\\\":\\\"Lucky Hell Map 1 by Meeelany from HaxMaps\\\",\\\"width\\\":520,\\\"height\\\":400,\\\"bg\\\":{\\\"color\\\":\\\"9E9E9E\\\"},\\\"vertexes\\\":[{\\\"x\\\":127.87510953404325,\\\"y\\\":-112.09338880090974,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":133.91967651011336,\\\"y\\\":-128.64740946172714,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":173.90158176151402,\\\"y\\\":-163.20700263885453,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":169.87510953404325,\\\"y\\\":-113.09338880090974,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":169.87510953404325,\\\"y\\\":-127.29163608748581,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":188.87510953404322,\\\"y\\\":-144.9985077504203,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":222.13413347019602,\\\"y\\\":-144.33896879178343,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":217.95776662168763,\\\"y\\\":-113.09338880090974,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":237.9677253069459,\\\"y\\\":-153.67031964453054,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":233.83656292903086,\\\"y\\\":-195.92511008682737,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":239.6976093411157,\\\"y\\\":-205.39726401794087,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":248.37433228238456,\\\"y\\\":-205.73743969680464,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":254.2157523230128,\\\"y\\\":-197.3569443124196,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":259.9818056948655,\\\"y\\\":-219.73107505780467,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":222.64254890504006,\\\"y\\\":-227.838857131645,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":211.05845844613364,\\\"y\\\":-241.4936374629046,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":132.43848017466811,\\\"y\\\":-139.11112397815896,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":132.21237536407241,\\\"y\\\":-159.7567487677345,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":150.06615393631213,\\\"y\\\":-176.1860299787474,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":202.53729327033372,\\\"y\\\":-190.5618599022293,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":223.88590987438195,\\\"y\\\":-213.69243745412888,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":132.72876904844279,\\\"y\\\":-175.10334074019823,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":121.63693128112445,\\\"y\\\":-179.4816977536134,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":233.76957329936172,\\\"y\\\":-144.1045730852191,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":249.21641684269036,\\\"y\\\":-144.1045730852191,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":241.3811501416883,\\\"y\\\":-124.920605005445,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":231.87812306956639,\\\"y\\\":-122.98337885250447,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":169.87510953404325,\\\"y\\\":-126.09338880090974,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":189.33569446935385,\\\"y\\\":-145.09338880090974,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":93.56252346166482,\\\"y\\\":-112.57579338165732,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":268.6496619576755,\\\"y\\\":-113.96537384591136,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":169.87510953404325,\\\"y\\\":-113.09338880090974,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":217.87510953404322,\\\"y\\\":-113.57693407237679,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":127.67514911737703,\\\"y\\\":-112.36650754149031,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":127.7296226035869,\\\"y\\\":-112.65595761734033,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":0,\\\"y\\\":7.164074074074062},{\\\"x\\\":-185,\\\"y\\\":371},{\\\"x\\\":409,\\\"y\\\":370},{\\\"x\\\":409,\\\"y\\\":-89},{\\\"x\\\":-185,\\\"y\\\":-89},{\\\"x\\\":211.25897544066697,\\\"y\\\":338.47118783272015},{\\\"x\\\":191.25897544066697,\\\"y\\\":338.47118783272015},{\\\"x\\\":166.25897544066697,\\\"y\\\":338.47118783272015},{\\\"x\\\":141.25897544066697,\\\"y\\\":338.47118783272015},{\\\"x\\\":116.25897544066697,\\\"y\\\":338.47118783272015},{\\\"x\\\":91.25897544066697,\\\"y\\\":338.47118783272015},{\\\"x\\\":66.25897544066697,\\\"y\\\":338.47118783272015},{\\\"x\\\":41.25897544066699,\\\"y\\\":338.47118783272015},{\\\"x\\\":16.25897544066699,\\\"y\\\":338.47118783272015},{\\\"x\\\":386.0026911003952,\\\"y\\\":338.47118783272015},{\\\"x\\\":361.0026911003952,\\\"y\\\":338.47118783272015},{\\\"x\\\":336.0026911003952,\\\"y\\\":338.47118783272015},{\\\"x\\\":311.0026911003952,\\\"y\\\":338.47118783272015},{\\\"x\\\":286.0026911003952,\\\"y\\\":338.47118783272015},{\\\"x\\\":261.00269110039517,\\\"y\\\":338.47118783272015},{\\\"x\\\":236.00269110039514,\\\"y\\\":338.47118783272015},{\\\"x\\\":211.00269110039514,\\\"y\\\":338.47118783272015},{\\\"x\\\":378.3380775133884,\\\"y\\\":-88.98020081102827,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":409,\\\"y\\\":318,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":409,\\\"y\\\":318,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":409,\\\"y\\\":-89,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-8,\\\"y\\\":56.71871012889795,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":408.26497014720354,\\\"y\\\":56.71871012889795,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":408.26497014720354,\\\"y\\\":76.71871012889795,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-8,\\\"y\\\":76.71871012889795,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-8,\\\"y\\\":97.47106605782996,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":408.8484605424657,\\\"y\\\":97.47106605782996,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":408.8484605424657,\\\"y\\\":117.47106605782996,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-8,\\\"y\\\":117.47106605782996,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-8,\\\"y\\\":137.24038467507245,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":408.8484605424657,\\\"y\\\":137.24038467507245,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":408.8484605424657,\\\"y\\\":157.24038467507242,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-8,\\\"y\\\":157.24038467507242,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-8,\\\"y\\\":177.99274060400444,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":409.4319509377279,\\\"y\\\":177.99274060400444,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":409.4319509377279,\\\"y\\\":197.99274060400444,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-8,\\\"y\\\":197.99274060400444,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-8,\\\"y\\\":218.92904001177115,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":408.8484605424657,\\\"y\\\":218.92904001177115,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":408.8484605424657,\\\"y\\\":238.92904001177115,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-8,\\\"y\\\":238.92904001177115,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-8,\\\"y\\\":259.68139594070317,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":409.4319509377279,\\\"y\\\":259.68139594070317,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":409.4319509377279,\\\"y\\\":279.68139594070317,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-8,\\\"y\\\":279.68139594070317,\\\"bCoef\\\":0.5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-124.37602920792445,\\\"y\\\":45.89046594913075,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-123.51826348924911,\\\"y\\\":81.91662613349507,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-124.63713286607836,\\\"y\\\":61.47573742117052,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-123.33725805753046,\\\"y\\\":61.551673851836156,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-74.67852244689418,\\\"y\\\":80.55478196804243,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-75.95194479437232,\\\"y\\\":42.976707751741564,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-62.42682759681601,\\\"y\\\":80.2539996182839,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-62.18801460396222,\\\"y\\\":44.603817371117735,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-103.39554515298761,\\\"y\\\":81.15292571501587,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-96.10453654424721,\\\"y\\\":44.37064786048559,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-84.5246993421301,\\\"y\\\":80.3968080448499,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-98.67783370027324,\\\"y\\\":63.67037653068076,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-89.31760638228413,\\\"y\\\":62.64899340659128,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-126.72716539628775,\\\"y\\\":101.82307070398244,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-126.41192369132186,\\\"y\\\":133.66248290553733,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-126.72716539628775,\\\"y\\\":117.58515595227693,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-74.14036672403066,\\\"y\\\":105.55568143223934,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-81.15433920933879,\\\"y\\\":117.36340632549728,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-88.62973791722953,\\\"y\\\":130.344640128781,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-109.7003792523054,\\\"y\\\":135.05925726418303,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-101.46364552866731,\\\"y\\\":102.05987986924345,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-93.6667087861409,\\\"y\\\":135.24886470891477,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-107.50460143931815,\\\"y\\\":120.41388342454096,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-96.25292389153368,\\\"y\\\":119.70774200541736,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-53.33441419628192,\\\"y\\\":106.18616484217111,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-60.348386681590064,\\\"y\\\":117.99388973542905,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-67.8237853894808,\\\"y\\\":130.9751235387128,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-122.702103956202,\\\"y\\\":-46.48625964860516,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-122.16156605331122,\\\"y\\\":-17.837750795395003,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-110.26973218971457,\\\"y\\\":-47.2970665029413,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-109.72919428682381,\\\"y\\\":-17.026943941058864,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-100.26978098623556,\\\"y\\\":-17.837750795395003,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-81.62122333650441,\\\"y\\\":-45.405183842823654,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-90.26982978275653,\\\"y\\\":-44.05383908559675,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-130.15357923736352,\\\"y\\\":-3.987716923504066,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-130.18673791145187,\\\"y\\\":31.108298201154255,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-127.93589972551541,\\\"y\\\":11.466560989601282,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-117.63831078565534,\\\"y\\\":29.204835762731364,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-53.067190946820254,\\\"y\\\":28.295343216544005,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-51.142149612614304,\\\"y\\\":-0.8000174064446055,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-41.445626034668976,\\\"y\\\":15.642440509743661,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-32.730702240240234,\\\"y\\\":-2.118203489583191,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-26.801364645486053,\\\"y\\\":30.920925934929645,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-51.34884540305196,\\\"y\\\":-44.717063443305534,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-58.362817888360105,\\\"y\\\":-32.90933855004759,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-65.83821659625085,\\\"y\\\":-19.928104746763836,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-98.30000119963604,\\\"y\\\":0.6600121601113287,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-106.94860764588816,\\\"y\\\":2.011356917338233,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-67.72224178389472,\\\"y\\\":0.6600121601113287,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":-76.37084823014683,\\\"y\\\":2.011356917338233,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"x\\\":408.49504764683155,\\\"y\\\":338.7520827159883},{\\\"x\\\":-7.380793657015788,\\\"y\\\":338.9604412155588},{\\\"x\\\":0,\\\"y\\\":20,\\\"bCoef\\\":2,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"]},{\\\"x\\\":-8,\\\"y\\\":20,\\\"bCoef\\\":2,\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"]},{\\\"x\\\":-8,\\\"y\\\":370},{\\\"x\\\":0,\\\"y\\\":-7},{\\\"x\\\":0,\\\"y\\\":-20},{\\\"x\\\":-8,\\\"y\\\":-20},{\\\"x\\\":-8,\\\"y\\\":-89},{\\\"x\\\":-8,\\\"y\\\":20},{\\\"x\\\":-21.43347050754458,\\\"y\\\":371.5134887974394}],\\\"segments\\\":[{\\\"v0\\\":0,\\\"v1\\\":1,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":2,\\\"v1\\\":1,\\\"curve\\\":74.15782367670546,\\\"curveF\\\":1.323249044383725,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":3,\\\"v1\\\":4,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":5,\\\"v1\\\":6,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":7,\\\"v1\\\":8,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":8,\\\"v1\\\":9,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":9,\\\"v1\\\":10,\\\"curve\\\":82.95210321163383,\\\"curveF\\\":1.131246809358717,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":10,\\\"v1\\\":11,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":11,\\\"v1\\\":12,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":12,\\\"v1\\\":13,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":13,\\\"v1\\\":14,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":14,\\\"v1\\\":15,\\\"curve\\\":58.745616193328274,\\\"curveF\\\":1.7766851120228797,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":16,\\\"v1\\\":17,\\\"curve\\\":26.417490400806255,\\\"curveF\\\":4.260596531725539,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":17,\\\"v1\\\":18,\\\"curve\\\":70.69773951590726,\\\"curveF\\\":1.4097993971754292,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":19,\\\"v1\\\":18,\\\"curve\\\":13.14319715549535,\\\"curveF\\\":8.680431829323924,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":20,\\\"v1\\\":19,\\\"curve\\\":57.47787339823631,\\\"curveF\\\":1.8235942287057898,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":21,\\\"v1\\\":22,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":23,\\\"v1\\\":24,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":24,\\\"v1\\\":25,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":25,\\\"v1\\\":26,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":27,\\\"v1\\\":28,\\\"curve\\\":94.92490129107054,\\\"curveF\\\":0.9175375398270866,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":29,\\\"v1\\\":30,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":36,\\\"v1\\\":37},{\\\"v0\\\":38,\\\"v1\\\":39},{\\\"v0\\\":39,\\\"v1\\\":36},{\\\"v0\\\":40,\\\"v1\\\":41,\\\"curve\\\":133.74588116899182,\\\"curveF\\\":0.427094457152492,\\\"color\\\":\\\"8B0000\\\"},{\\\"v0\\\":41,\\\"v1\\\":42,\\\"curve\\\":163.59012457744694,\\\"curveF\\\":0.14419017130150555,\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":42,\\\"v1\\\":43,\\\"curve\\\":163.59012457744694,\\\"curveF\\\":0.14419017130150555,\\\"color\\\":\\\"32FF\\\"},{\\\"v0\\\":43,\\\"v1\\\":44,\\\"curve\\\":163.59012457744694,\\\"curveF\\\":0.14419017130150555,\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":44,\\\"v1\\\":45,\\\"curve\\\":163.59012457744694,\\\"curveF\\\":0.14419017130150555,\\\"color\\\":\\\"32FF\\\"},{\\\"v0\\\":45,\\\"v1\\\":46,\\\"curve\\\":163.59012457744694,\\\"curveF\\\":0.14419017130150555,\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":46,\\\"v1\\\":47,\\\"curve\\\":163.59012457744694,\\\"curveF\\\":0.14419017130150555,\\\"color\\\":\\\"32FF\\\"},{\\\"v0\\\":47,\\\"v1\\\":48,\\\"curve\\\":163.59012457744694,\\\"curveF\\\":0.14419017130150555,\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":49,\\\"v1\\\":50,\\\"curve\\\":163.59012457744694,\\\"curveF\\\":0.14419017130150555,\\\"color\\\":\\\"32FF\\\"},{\\\"v0\\\":50,\\\"v1\\\":51,\\\"curve\\\":163.59012457744694,\\\"curveF\\\":0.14419017130150555,\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":51,\\\"v1\\\":52,\\\"curve\\\":163.59012457744694,\\\"curveF\\\":0.14419017130150555,\\\"color\\\":\\\"32FF\\\"},{\\\"v0\\\":52,\\\"v1\\\":53,\\\"curve\\\":163.59012457744694,\\\"curveF\\\":0.14419017130150555,\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":53,\\\"v1\\\":54,\\\"curve\\\":163.59012457744694,\\\"curveF\\\":0.14419017130150555,\\\"color\\\":\\\"32FF\\\"},{\\\"v0\\\":54,\\\"v1\\\":55,\\\"curve\\\":163.59012457744694,\\\"curveF\\\":0.14419017130150555,\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":55,\\\"v1\\\":56,\\\"curve\\\":163.59012457744694,\\\"curveF\\\":0.14419017130150555,\\\"color\\\":\\\"32FF\\\"},{\\\"v0\\\":37,\\\"v1\\\":58,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":59,\\\"v1\\\":60,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":61,\\\"v1\\\":62,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":62,\\\"v1\\\":63,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":63,\\\"v1\\\":64,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":64,\\\"v1\\\":61,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":65,\\\"v1\\\":66,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":66,\\\"v1\\\":67,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":67,\\\"v1\\\":68,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":68,\\\"v1\\\":65,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":69,\\\"v1\\\":70,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":70,\\\"v1\\\":71,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":71,\\\"v1\\\":72,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":72,\\\"v1\\\":69,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":73,\\\"v1\\\":74,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":74,\\\"v1\\\":75,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":75,\\\"v1\\\":76,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":76,\\\"v1\\\":73,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":77,\\\"v1\\\":78,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":78,\\\"v1\\\":79,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":79,\\\"v1\\\":80,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":80,\\\"v1\\\":77,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":81,\\\"v1\\\":82,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":82,\\\"v1\\\":83,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":83,\\\"v1\\\":84,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":84,\\\"v1\\\":81,\\\"bCoef\\\":0.5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"],\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":85,\\\"v1\\\":86,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":87,\\\"v1\\\":86,\\\"bCoef\\\":0,\\\"curve\\\":-143.82227442226213,\\\"curveF\\\":-0.32663524834431934,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":85,\\\"v1\\\":88,\\\"bCoef\\\":0,\\\"curve\\\":-126.60315256597518,\\\"curveF\\\":-0.5029131332849102,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":89,\\\"v1\\\":90,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":90,\\\"v1\\\":91,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":91,\\\"v1\\\":92,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":93,\\\"v1\\\":94,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":94,\\\"v1\\\":95,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":96,\\\"v1\\\":97,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":98,\\\"v1\\\":99,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":98,\\\"v1\\\":100,\\\"bCoef\\\":0,\\\"curve\\\":-120.46088703921694,\\\"curveF\\\":-0.5719999999999846,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":102,\\\"v1\\\":101,\\\"bCoef\\\":0,\\\"curve\\\":-128.3661115344086,\\\"curveF\\\":-0.4837837837837713,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":102,\\\"v1\\\":103,\\\"bCoef\\\":0,\\\"curve\\\":-129.08836361370012,\\\"curveF\\\":-0.47602932882119564,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":104,\\\"v1\\\":105,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":105,\\\"v1\\\":106,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":107,\\\"v1\\\":108,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":110,\\\"v1\\\":109,\\\"bCoef\\\":0,\\\"curve\\\":-128.3661115344086,\\\"curveF\\\":-0.4837837837837713,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":110,\\\"v1\\\":111,\\\"bCoef\\\":0,\\\"curve\\\":-129.08836361370012,\\\"curveF\\\":-0.47602932882119564,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":113,\\\"v1\\\":112,\\\"bCoef\\\":0,\\\"curve\\\":179.7256392496482,\\\"curveF\\\":0.002394253790905902,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":114,\\\"v1\\\":115,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":115,\\\"v1\\\":116,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":117,\\\"v1\\\":118,\\\"bCoef\\\":0,\\\"curve\\\":-39.12030318077227,\\\"curveF\\\":-2.814518930184092,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":119,\\\"v1\\\":120,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":119,\\\"v1\\\":121,\\\"bCoef\\\":0,\\\"curve\\\":-155.22885413286065,\\\"curveF\\\":-0.2196003021353992,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":121,\\\"v1\\\":122,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":123,\\\"v1\\\":124,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":124,\\\"v1\\\":125,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":125,\\\"v1\\\":126,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":126,\\\"v1\\\":127,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":129,\\\"v1\\\":128,\\\"bCoef\\\":0,\\\"curve\\\":-128.3661115344086,\\\"curveF\\\":-0.4837837837837713,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":129,\\\"v1\\\":130,\\\"bCoef\\\":0,\\\"curve\\\":-129.08836361370012,\\\"curveF\\\":-0.47602932882119564,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":131,\\\"v1\\\":132,\\\"bCoef\\\":0,\\\"curve\\\":-39.12030318077227,\\\"curveF\\\":-2.814518930184092,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":133,\\\"v1\\\":134,\\\"bCoef\\\":0,\\\"curve\\\":-39.12030318077227,\\\"curveF\\\":-2.814518930184092,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"v0\\\":135,\\\"v1\\\":49,\\\"curve\\\":-175.7597607885848,\\\"curveF\\\":-0.03701996544380749,\\\"color\\\":\\\"FF3E\\\"},{\\\"v0\\\":48,\\\"v1\\\":136,\\\"curve\\\":170.71608448856227,\\\"curveF\\\":0.08119517471268344,\\\"color\\\":\\\"32FF\\\"},{\\\"v0\\\":35,\\\"v1\\\":137},{\\\"v0\\\":138,\\\"v1\\\":139},{\\\"v0\\\":140,\\\"v1\\\":141},{\\\"v0\\\":141,\\\"v1\\\":142},{\\\"v0\\\":142,\\\"v1\\\":143},{\\\"v0\\\":137,\\\"v1\\\":144},{\\\"v0\\\":145,\\\"v1\\\":144,\\\"vis\\\":false}],\\\"planes\\\":[{\\\"normal\\\":[0,1],\\\"dist\\\":-90.40867189396376,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-186.4835080469892,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-7.801592707900083,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-370.50713681670976,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"normal\\\":[-1,0],\\\"dist\\\":-408.5183867662844},{\\\"normal\\\":[0,-1],\\\"dist\\\":-351.8869139113088}],\\\"goals\\\":[],\\\"discs\\\":[{\\\"gravity\\\":[0,0.05],\\\"radius\\\":6,\\\"bCoef\\\":0.3,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"ball\\\",\\\"kick\\\",\\\"score\\\"]},{\\\"pos\\\":[-149.2603392537662,-9.795597687142449],\\\"color\\\":\\\"8B0000\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[-148,61],\\\"color\\\":\\\"32FF\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[-148,111],\\\"color\\\":\\\"FF3E\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[33.385532677587435,66.2655941733348],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[101.55219934388745,66.2655941733348],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[169.71886601088744,66.2655941733348],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[237.88553267788745,66.2655941733348],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[306.0521993448874,66.2655941733348],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[374.21886601088744,66.2655941733348],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[33.96902307284961,107.01795010226681],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[102.13568973914963,107.01795010226681],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[170.3023564061496,107.01795010226681],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[238.46902307314963,107.01795010226681],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[306.6356897401496,107.01795010226681],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[374.8023564061496,107.01795010226681],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[33.96902307284961,146.78726871950929],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[102.13568973914963,146.78726871950929],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[170.3023564061496,146.78726871950929],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[238.46902307314963,146.78726871950929],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[306.6356897401496,146.78726871950929],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[374.8023564061496,146.78726871950929],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[34.55251346811178,187.53962464844128],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[102.7191801344118,187.53962464844128],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[170.8858468014118,187.53962464844128],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[239.0525134684118,187.53962464844128],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[307.21918013541176,187.53962464844128],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[375.3858468014118,187.53962464844128],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[33.96902307284961,228.47592405620802],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[102.13568973914963,228.47592405620802],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[170.3023564061496,228.47592405620802],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[238.46902307314963,228.47592405620802],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[306.6356897401496,228.47592405620802],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[374.8023564061496,228.47592405620802],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[34.55251346811178,269.22827998514003],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[102.7191801344118,269.22827998514003],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[170.8858468014118,269.22827998514003],\\\"speed\\\":[3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[239.0525134684118,269.22827998514003],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[307.21918013541176,269.22827998514003],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[375.3858468014118,269.22827998514003],\\\"speed\\\":[-3.3,0],\\\"radius\\\":8,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF7800\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[189.61210136672523,338.20848638435723],\\\"radius\\\":2,\\\"bCoef\\\":5,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF3E\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[212.37955783648397,337.6247054492352],\\\"radius\\\":2,\\\"bCoef\\\":5,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"FF3E\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[28.852229054589007,25.367697924672214],\\\"radius\\\":5,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"F0F0F\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[78.852229054589,25.367697924672214],\\\"radius\\\":5,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"F0F0F\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[132.852229054589,25.367697924672214],\\\"radius\\\":5,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"F0F0F\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[182.852229054589,25.367697924672214],\\\"radius\\\":5,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"F0F0F\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[232.852229054589,25.367697924672214],\\\"radius\\\":5,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"F0F0F\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[282.85222905458903,25.367697924672214],\\\"radius\\\":5,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"F0F0F\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[382.85222905458903,25.367697924672214],\\\"radius\\\":5,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"F0F0F\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[332.85222905458903,25.367697924672214],\\\"radius\\\":5,\\\"bCoef\\\":2,\\\"invMass\\\":0.0001,\\\"damping\\\":1,\\\"color\\\":\\\"F0F0F\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"wall\\\"]}],\\\"playerPhysics\\\":{\\\"kickStrength\\\":10,\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\"]},\\\"ballPhysics\\\":\\\"disc0\\\",\\\"spawnDistance\\\":170,\\\"redSpawnPoints\\\":[[-70,13]],\\\"blueSpawnPoints\\\":[[-101,14]]}\"";
// Cargar mapa Dodgeball
var mapDodgeball = "\"{\\\"name\\\":\\\"Dodgeball by MC\\\",\\\"width\\\":600,\\\"height\\\":350,\\\"bg\\\":{\\\"type\\\":\\\"hockey\\\",\\\"width\\\":500,\\\"height\\\":250},\\\"vertexes\\\":[{\\\"x\\\":-497.5,\\\"y\\\":247.5,\\\"bCoef\\\":-100,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":497.5,\\\"y\\\":247.5,\\\"bCoef\\\":-100,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":497.5,\\\"y\\\":-247.5,\\\"bCoef\\\":-100,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-497.5,\\\"y\\\":-247.5,\\\"bCoef\\\":-100,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-530,\\\"y\\\":280,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-530,\\\"y\\\":-280,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":530,\\\"y\\\":-280,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":530,\\\"y\\\":280,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-500,\\\"y\\\":-250,\\\"bCoef\\\":-1000,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-500,\\\"y\\\":250,\\\"bCoef\\\":-1000,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":500,\\\"y\\\":250,\\\"bCoef\\\":-1000,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":500,\\\"y\\\":-250,\\\"bCoef\\\":-1000,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-400,\\\"y\\\":-15,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":-400,\\\"y\\\":15,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":400,\\\"y\\\":-15,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":400,\\\"y\\\":15,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":-502.5,\\\"y\\\":-252.5,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":502.5,\\\"y\\\":-252.5,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":502.5,\\\"y\\\":252.5,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-502.5,\\\"y\\\":252.5,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":1,\\\"y\\\":-250,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":1,\\\"y\\\":250,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-1,\\\"y\\\":-250,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-1,\\\"y\\\":250,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-505,\\\"y\\\":-255,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-505,\\\"y\\\":255,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":505,\\\"y\\\":-255,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":505,\\\"y\\\":255,\\\"cMask\\\":[\\\"wall\\\"]}],\\\"segments\\\":[{\\\"v0\\\":1,\\\"v1\\\":2,\\\"bCoef\\\":-100,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"C15C5C\\\"},{\\\"v0\\\":3,\\\"v1\\\":0,\\\"bCoef\\\":-100,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"C15C5C\\\"},{\\\"v0\\\":4,\\\"v1\\\":5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\"]},{\\\"v0\\\":5,\\\"v1\\\":6,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\"]},{\\\"v0\\\":6,\\\"v1\\\":7,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\"]},{\\\"v0\\\":7,\\\"v1\\\":4,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\"]},{\\\"v0\\\":8,\\\"v1\\\":9,\\\"bCoef\\\":-1000,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":10,\\\"v1\\\":11,\\\"bCoef\\\":-1000,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":12,\\\"v1\\\":13,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"v0\\\":13,\\\"v1\\\":12,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"v0\\\":14,\\\"v1\\\":15,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"v0\\\":15,\\\"v1\\\":14,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"v0\\\":17,\\\"v1\\\":18,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":19,\\\"v1\\\":16,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":20,\\\"v1\\\":21,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"6B6B6B\\\"},{\\\"v0\\\":22,\\\"v1\\\":23,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"6B6B6B\\\"},{\\\"v0\\\":25,\\\"v1\\\":24,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":26,\\\"v1\\\":27,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":3,\\\"v1\\\":2,\\\"bCoef\\\":-100,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"C15C5C\\\"},{\\\"v0\\\":1,\\\"v1\\\":0,\\\"bCoef\\\":-100,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"C15C5C\\\"},{\\\"v0\\\":9,\\\"v1\\\":10,\\\"bCoef\\\":-1000,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":11,\\\"v1\\\":8,\\\"bCoef\\\":-1000,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":19,\\\"v1\\\":18,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":17,\\\"v1\\\":16,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":25,\\\"v1\\\":27,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":26,\\\"v1\\\":24,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":25,\\\"v1\\\":9,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":24,\\\"v1\\\":8,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":27,\\\"v1\\\":10,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":26,\\\"v1\\\":11,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"333333\\\"}],\\\"planes\\\":[{\\\"normal\\\":[0,1],\\\"dist\\\":-400,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-400,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-650,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\"]},{\\\"normal\\\":[-1,0],\\\"dist\\\":-650,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-500,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"normal\\\":[0,1],\\\"dist\\\":-250,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"normal\\\":[-1,0],\\\"dist\\\":-500,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-250,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-525,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-275,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"normal\\\":[0,1],\\\"dist\\\":-275,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"normal\\\":[-1,0],\\\"dist\\\":-525,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"normal\\\":[0,1],\\\"dist\\\":-1,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-500,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-220,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-470,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0,1],\\\"dist\\\":-220,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-1,0],\\\"dist\\\":-470,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]}],\\\"goals\\\":[],\\\"discs\\\":[{\\\"radius\\\":0.01,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"kick\\\",\\\"score\\\",\\\"c1\\\"]},{\\\"pos\\\":[-250,0],\\\"radius\\\":20,\\\"bCoef\\\":-10000,\\\"color\\\":\\\"transparent\\\",\\\"cMask\\\":[\\\"red\\\"]},{\\\"pos\\\":[-250,0],\\\"radius\\\":15,\\\"invMass\\\":1e-112,\\\"color\\\":\\\"0\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"ball\\\",\\\"kick\\\"]},{\\\"pos\\\":[0,300],\\\"speed\\\":[0,-1],\\\"radius\\\":1,\\\"bCoef\\\":3,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]}],\\\"playerPhysics\\\":{\\\"kickStrength\\\":1e+113},\\\"ballPhysics\\\":\\\"disc0\\\",\\\"cameraFollow\\\":\\\"player\\\",\\\"spawnDistance\\\":-300,\\\"joints\\\":[{\\\"d0\\\":1,\\\"d1\\\":2,\\\"length\\\":0,\\\"color\\\":\\\"555555\\\"}],\\\"blueSpawnPoints\\\":[[-400,0],[400,0],[475,0]]}\"";
var mapSuperman = "\"{\\\"name\\\":\\\"Superman Chair v2 by Namajunas [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ]\\\",\\\"width\\\":520,\\\"height\\\":600,\\\"bg\\\":{\\\"width\\\":255,\\\"height\\\":255,\\\"kickOffRadius\\\":190,\\\"cornerRadius\\\":250,\\\"color\\\":\\\"80808\\\"},\\\"vertexes\\\":[{\\\"x\\\":-255,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":255,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":-305,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":305,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":-245,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":245,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":-235,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":235,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":-209.5,\\\"y\\\":256.5,\\\"bCoef\\\":100,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":209.5,\\\"y\\\":256.5,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":256.5,\\\"y\\\":-144,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"kick\\\"]},{\\\"x\\\":256.5,\\\"y\\\":153,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"kick\\\"]},{\\\"x\\\":256.5,\\\"y\\\":-144,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"c3\\\"],\\\"cGroup\\\":[\\\"kick\\\"]},{\\\"x\\\":256.5,\\\"y\\\":153,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"c3\\\"],\\\"cGroup\\\":[\\\"kick\\\"]},{\\\"x\\\":-189,\\\"y\\\":-190,\\\"bCoef\\\":100000000,\\\"cMask\\\":[\\\"c3\\\"],\\\"cGroup\\\":[\\\"kick\\\"]},{\\\"x\\\":209,\\\"y\\\":-190,\\\"bCoef\\\":100000000,\\\"cMask\\\":[\\\"c3\\\"],\\\"cGroup\\\":[\\\"kick\\\"]},{\\\"x\\\":230,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":240,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":250,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":-230,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":-240,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":-250,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":225,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":-225,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":-121.56757590242933,\\\"y\\\":-109.55421108988384,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-117.8695049075144,\\\"y\\\":-71.74701162314061,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-128.14192433783376,\\\"y\\\":-116.8423459268464,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-126.49833722898262,\\\"y\\\":-133.69615773732232,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-109.24067258604617,\\\"y\\\":-64.45887678617805,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-94.85928538359911,\\\"y\\\":-32.57328687446693,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-82.53238206721596,\\\"y\\\":-23.918626755573882,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-43.49718823200254,\\\"y\\\":72.19365140686978,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":30.46423166629654,\\\"y\\\":78.57076938921199,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-43.49718823200254,\\\"y\\\":72.19365140686978,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-36.92283979659817,\\\"y\\\":105.90127502782161,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-19.66517515366172,\\\"y\\\":122.75508683829753,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-11.036342832193498,\\\"y\\\":131.40974695719046,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-0.7639234018741661,\\\"y\\\":132.77627223912094,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-131.83999533274869,\\\"y\\\":-158.29361281207088,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-124.44385334291877,\\\"y\\\":-161.02666337593186,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-118.69129846193994,\\\"y\\\":-135.51819144656292,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-125.26564689734425,\\\"y\\\":-164.67073079441312,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-116.22591779866332,\\\"y\\\":-166.0372560763436,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-107.59708547719504,\\\"y\\\":-137.34022515580364,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-115.81502102145055,\\\"y\\\":-170.5923403494452,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-104.72080803670565,\\\"y\\\":-172.869882485996,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-105.95349836834396,\\\"y\\\":-166.0372560763436,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-97.73556282408856,\\\"y\\\":-166.9482729309639,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-85.40865950770535,\\\"y\\\":-139.61776729235442,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-97.32466604687579,\\\"y\\\":-139.16225886504418,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-103.89901448228011,\\\"y\\\":-167.40378135827405,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-104.72080803670565,\\\"y\\\":-172.869882485996,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-73.49265296853491,\\\"y\\\":-140.52878414697471,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-75.54713685459882,\\\"y\\\":-126.8635313276699,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-69.38368519640721,\\\"y\\\":-121.85293862725811,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-87.87404017098197,\\\"y\\\":-126.8635313276699,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-84.17596917606704,\\\"y\\\":-118.66437963608703,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-125.26564689734425,\\\"y\\\":-129.14107346422068,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-89.92852405704588,\\\"y\\\":-134.60717459194262,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-82.94327884442873,\\\"y\\\":-93.15590770671814,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-91.5721111658969,\\\"y\\\":-90.42285714285714,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-108.0079822544078,\\\"y\\\":-99.53302568906034,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-71.0272723052583,\\\"y\\\":-74.93557061431177,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-110.06246614047171,\\\"y\\\":-89.51184028823683,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-91.98300794310973,\\\"y\\\":-87.68980657899614,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-114.58233068981224,\\\"y\\\":-113.19827850836515,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-111.29515647211002,\\\"y\\\":-118.66437963608703,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-90.75031761147142,\\\"y\\\":-122.30844705456835,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-100.20094348736518,\\\"y\\\":-104.54361838947212,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-87.05224661655643,\\\"y\\\":-115.47582064491593,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-95.27018216081188,\\\"y\\\":-90.42285714285714,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-67.74009808755613,\\\"y\\\":-53.071166103424076,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-55.002297993960184,\\\"y\\\":-38.03938800218879,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-34.45745913332152,\\\"y\\\":-67.64743577734914,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-10.828626811853297,\\\"y\\\":-46.60506497570219,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-36.5119430193854,\\\"y\\\":-48.51608183032246,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-59.52216254330065,\\\"y\\\":-55.348708239974854,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-26.239523589066067,\\\"y\\\":-12.530916072819906,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-72.67085941410937,\\\"y\\\":22.54323283006238,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-53.358710885109076,\\\"y\\\":61.7169575787361,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":20.19181223597724,\\\"y\\\":9.788996865377925,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":40.3257543194031,\\\"y\\\":-29.840236310605917,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":10.741186360083475,\\\"y\\\":-16.99701720054179,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-27.13055581693834,\\\"y\\\":-30.76184586563801,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-17.199794490385102,\\\"y\\\":-7.064814945097993,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-12.214549277767958,\\\"y\\\":-26.374135182884032,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-0.1500653917041086,\\\"y\\\":-16.45252562785194,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-7.407510510725274,\\\"y\\\":-2.965239099306501,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":4.414283043700266,\\\"y\\\":1.6788283191747269,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":11.152083137296245,\\\"y\\\":6.144929446896668,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":25.355263894168814,\\\"y\\\":-20.74066046481451,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":31.57319943842427,\\\"y\\\":-32.21735429294816,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":51.419967304147946,\\\"y\\\":-24.82964361019421,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-81.71058851279042,\\\"y\\\":22.99874125737253,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-53.358710885109076,\\\"y\\\":62.62797443335643,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":30.46423166629654,\\\"y\\\":78.11526096190187,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":60.45969640282897,\\\"y\\\":42.585603631709404,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":63.746870620531126,\\\"y\\\":38.48602778591797,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":86.75709014444641,\\\"y\\\":19.810182266201423,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":86.75709014444641,\\\"y\\\":20.265690693511573,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":70.3212190559355,\\\"y\\\":-14.352949782060534,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":51.830864081360744,\\\"y\\\":-22.552101473643432,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":73.60839327363769,\\\"y\\\":9.788996865377925,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":54.29624474463736,\\\"y\\\":58.07289016025484,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":76.07377393691434,\\\"y\\\":68.09407556107834,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":75.66287715970157,\\\"y\\\":37.11950250398749,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":87.57888369887195,\\\"y\\\":50.7847553232923,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":86.75709014444641,\\\"y\\\":77.20424410728154,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":90.45516113936134,\\\"y\\\":53.06229745984305,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":111.82179355442554,\\\"y\\\":48.05170475943132,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":124.55959364802152,\\\"y\\\":53.51780588715326,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":127.43587108851091,\\\"y\\\":61.7169575787361,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":125.79228397965983,\\\"y\\\":65.36102499721741,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":119.21793554425545,\\\"y\\\":65.36102499721741,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":124.97049042523423,\\\"y\\\":73.56017668880025,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":116.34165810376606,\\\"y\\\":72.19365140686978,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":113.05448388606385,\\\"y\\\":52.6067890325329,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":119.62883232146822,\\\"y\\\":62.17246600604625,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":116.34165810376606,\\\"y\\\":74.92670197073076,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":107.71282578229778,\\\"y\\\":73.1046682614901,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":109.35641289114892,\\\"y\\\":65.81653342452756,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":101.54937412410624,\\\"y\\\":56.250856451014215,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":111.82179355442554,\\\"y\\\":67.63856713376819,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":122.91600653917038,\\\"y\\\":74.0156851161104,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":121.2724194303193,\\\"y\\\":81.30381995307295,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":101.54937412410624,\\\"y\\\":76.29322725266121,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":104.42565156459563,\\\"y\\\":69.916109270319,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":105.65834189623394,\\\"y\\\":61.7169575787361,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":100.7275805696807,\\\"y\\\":76.74873567997136,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":104.01475478738286,\\\"y\\\":69.916109270319,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":101.13847734689347,\\\"y\\\":79.48178624383235,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":114.28717421770222,\\\"y\\\":86.76992108079486,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":156.6095422706178,\\\"y\\\":-7.520323372408143,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":191.53576833370346,\\\"y\\\":14.799589565789717,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":83.05901914953148,\\\"y\\\":29.83136766702492,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":144.69353573144735,\\\"y\\\":36.20848564936719,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":143.04994862259628,\\\"y\\\":17.077131702340495,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":164.8274778148732,\\\"y\\\":95.88008962699809,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":110.94551611393615,\\\"y\\\":107.44576660051143,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":43.61292853710529,\\\"y\\\":67.18305870645804,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":69.49942550150996,\\\"y\\\":175.13855597896577,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":73.60839327363769,\\\"y\\\":99.52415704547934,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":111.41089677721277,\\\"y\\\":107.72330873706221,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":56.76162540791401,\\\"y\\\":170.12796327855403,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":20.19181223597724,\\\"y\\\":106.81229188244191,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":60.45969640282897,\\\"y\\\":80.39280309845265,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-11.036342832193498,\\\"y\\\":159.19576102311026,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":16.90463801827508,\\\"y\\\":166.48389586007278,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":16.08284446384951,\\\"y\\\":185.61524980709947,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":34.16230266121153,\\\"y\\\":200.64702790833474,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":23.889883230892167,\\\"y\\\":155.09618517731877,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":19.78091545876447,\\\"y\\\":156.4627104592493,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":9.097599251232367,\\\"y\\\":109.54534244630287,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":38.682167210551995,\\\"y\\\":138.6978817941531,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":33.75140588399873,\\\"y\\\":140.97542393070387,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":47.72189630923299,\\\"y\\\":192.44787621675187,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":58.81610929397789,\\\"y\\\":200.19151948102456,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":30.05333488908377,\\\"y\\\":79.02627781652217,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-33.351394685782026,\\\"y\\\":-3.14684203250917,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":20.089266287732528,\\\"y\\\":16.465214355607486,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":24.425637239052804,\\\"y\\\":42.52740313449064,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-40.36343593611599,\\\"y\\\":18.920173585844623,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-24.104352085338064,\\\"y\\\":74.66109969519616,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-24.041895205674507,\\\"y\\\":74.23163860640528,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-18.858779831758397,\\\"y\\\":43.309540843207344,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-11.234236618523653,\\\"y\\\":17.777244266296776,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-1.4878856211363427,\\\"y\\\":47.283560364396294,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":4.327443948279949,\\\"y\\\":27.809774839633974,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-1.2474715452823375,\\\"y\\\":25.763850350172333,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-3.5736033730488828,\\\"y\\\":33.55336456007734,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-13.925136509958008,\\\"y\\\":34.556245159093805,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-8.872014758517082,\\\"y\\\":51.29614692708299,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-6.028964746802444,\\\"y\\\":41.77562955942142,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-24.43369532532074,\\\"y\\\":41.263616353745675,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-18.61836575590442,\\\"y\\\":21.789830828983327,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-16.555568578285317,\\\"y\\\":27.828792318727636,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":21.013605790402778,\\\"y\\\":156.4627104592493,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-36.10104624217263,\\\"y\\\":74.47119354342058,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-35,\\\"y\\\":80.2148368076933,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-25.021588044810613,\\\"y\\\":87.76992108079486,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-23.48696870808726,\\\"y\\\":78.02627781652217,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-10.92737506006577,\\\"y\\\":82.39280309845265,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-9.283787951214663,\\\"y\\\":89.50297164465582,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":4.57773470189187,\\\"y\\\":90.41398849927617,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":4.22132181074295,\\\"y\\\":83.84831152576282,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":5.39952825631741,\\\"y\\\":90.8694969265863,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":17.850154132211173,\\\"y\\\":89.958480071966,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":15.850154132211173,\\\"y\\\":83.39280309845265,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":33.69692199793485,\\\"y\\\":87.58136208962378,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":47.31099953202022,\\\"y\\\":69.00509241569864,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":39.914857542190305,\\\"y\\\":80.65975253459169,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":34.98409621563707,\\\"y\\\":74.92670197073076,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":81.82632881789311,\\\"y\\\":60.35043229680562,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":92.09874824821247,\\\"y\\\":67.18305870645804,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":100.31668379246787,\\\"y\\\":60.8059407241158,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-60.75485287493899,\\\"y\\\":-60.814809367696796,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":31.37008306619805,\\\"y\\\":-35.62323695935606,\\\"bCoef\\\":-0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-9.29658644231995,\\\"y\\\":-47.15456260594999,\\\"bCoef\\\":-0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":33.081194366766,\\\"y\\\":-34.58781524958397,\\\"bCoef\\\":-0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-11.007697742888013,\\\"y\\\":-48.18998431572004,\\\"bCoef\\\":-0.5,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-43.49718823200254,\\\"y\\\":72.19365140686978,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-36.92283979659817,\\\"y\\\":105.90127502782161,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-19.66517515366172,\\\"y\\\":122.75508683829753,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-43.49718823200254,\\\"y\\\":72.19365140686978,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":30.46423166629654,\\\"y\\\":78.57076938921199,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":63.746870620531126,\\\"y\\\":38.48602778591797,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":86.75709014444641,\\\"y\\\":19.810182266201423,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-71.0272723052583,\\\"y\\\":-74.93557061431177,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-55.002297993960184,\\\"y\\\":-38.03938800218879,\\\"cMask\\\":[\\\"c0\\\"]}],\\\"segments\\\":[{\\\"v0\\\":0,\\\"v1\\\":1,\\\"bias\\\":100,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"7D7D7D\\\"},{\\\"v0\\\":1,\\\"v1\\\":0,\\\"bias\\\":100,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"7D7D7D\\\"},{\\\"v0\\\":2,\\\"v1\\\":3,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"7D7D7D\\\"},{\\\"v0\\\":3,\\\"v1\\\":2,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"7D7D7D\\\"},{\\\"v0\\\":4,\\\"v1\\\":5,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"7D7D7D\\\"},{\\\"v0\\\":5,\\\"v1\\\":4,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"7D7D7D\\\"},{\\\"v0\\\":6,\\\"v1\\\":7,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"7D7D7D\\\"},{\\\"v0\\\":7,\\\"v1\\\":6,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"7D7D7D\\\"},{\\\"v0\\\":8,\\\"v1\\\":9,\\\"bCoef\\\":0,\\\"vis\\\":false,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"v0\\\":10,\\\"v1\\\":11,\\\"bCoef\\\":0,\\\"vis\\\":false,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"kick\\\"]},{\\\"v0\\\":14,\\\"v1\\\":15,\\\"bCoef\\\":100000000,\\\"vis\\\":false,\\\"cMask\\\":[\\\"c3\\\"],\\\"cGroup\\\":[\\\"kick\\\"]},{\\\"v0\\\":16,\\\"v1\\\":19,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"7D7D7D\\\"},{\\\"v0\\\":19,\\\"v1\\\":16,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"7D7D7D\\\"},{\\\"v0\\\":17,\\\"v1\\\":20,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"7D7D7D\\\"},{\\\"v0\\\":20,\\\"v1\\\":17,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"7D7D7D\\\"},{\\\"v0\\\":18,\\\"v1\\\":21,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"7D7D7D\\\"},{\\\"v0\\\":21,\\\"v1\\\":18,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"7D7D7D\\\"},{\\\"v0\\\":22,\\\"v1\\\":23,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"7D7D7D\\\"},{\\\"v0\\\":23,\\\"v1\\\":22,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"7D7D7D\\\"},{\\\"v0\\\":25,\\\"v1\\\":24,\\\"curve\\\":64.96405995790032,\\\"curveF\\\":1.570772520142078,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":26,\\\"v1\\\":27,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":25,\\\"v1\\\":28,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":28,\\\"v1\\\":29,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":30,\\\"v1\\\":29,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":32,\\\"v1\\\":31,\\\"curve\\\":32.896817252945965,\\\"curveF\\\":3.3871402029615347,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":34,\\\"v1\\\":33,\\\"curve\\\":27.124327352767555,\\\"curveF\\\":4.145480599090436,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":35,\\\"v1\\\":34,\\\"curve\\\":19.799004144835102,\\\"curveF\\\":5.730035659631905,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":36,\\\"v1\\\":35,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":37,\\\"v1\\\":36,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":27,\\\"v1\\\":38,\\\"curve\\\":24.730268645066644,\\\"curveF\\\":4.561494257691355,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":38,\\\"v1\\\":39,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":40,\\\"v1\\\":39,\\\"curve\\\":18.41362648243927,\\\"curveF\\\":6.169537913429568,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":39,\\\"v1\\\":41,\\\"curve\\\":18.41362648243927,\\\"curveF\\\":6.169537913429568,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":41,\\\"v1\\\":42,\\\"curve\\\":21.915546244188963,\\\"curveF\\\":5.16487377239243,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":43,\\\"v1\\\":42,\\\"curve\\\":38.944544906887664,\\\"curveF\\\":2.8282619139896754,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":42,\\\"v1\\\":44,\\\"curve\\\":18.050278458828576,\\\"curveF\\\":6.295871698932099,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":44,\\\"v1\\\":45,\\\"curve\\\":21.8052165427344,\\\"curveF\\\":5.191653556610735,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":46,\\\"v1\\\":47,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":47,\\\"v1\\\":48,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":49,\\\"v1\\\":46,\\\"curve\\\":27.73342289539634,\\\"curveF\\\":4.050903786761786,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":50,\\\"v1\\\":51,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":48,\\\"v1\\\":52,\\\"curve\\\":81.30191852531571,\\\"curveF\\\":1.1646220964678007,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":52,\\\"v1\\\":53,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":53,\\\"v1\\\":54,\\\"curve\\\":10.353662901125611,\\\"curveF\\\":11.037597317814962,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":48,\\\"v1\\\":55,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":55,\\\"v1\\\":56,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":57,\\\"v1\\\":58,\\\"curve\\\":11.001514358984423,\\\"curveF\\\":10.383958709310516,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":54,\\\"v1\\\":59,\\\"curve\\\":25.657051368936308,\\\"curveF\\\":4.391395397620451,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":59,\\\"v1\\\":60,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":61,\\\"v1\\\":26,\\\"curve\\\":26.19340662251534,\\\"curveF\\\":4.298364314427916,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":62,\\\"v1\\\":59,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":63,\\\"v1\\\":24,\\\"curve\\\":24.584185739580775,\\\"curveF\\\":4.589457036422791,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":59,\\\"v1\\\":64,\\\"curve\\\":28.193616078605846,\\\"curveF\\\":3.982105783675394,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":64,\\\"v1\\\":63,\\\"curve\\\":55.91587746137646,\\\"curveF\\\":1.884061814192793,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":65,\\\"v1\\\":66,\\\"curve\\\":28.10341115624527,\\\"curveF\\\":3.995417246335218,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":66,\\\"v1\\\":67,\\\"curve\\\":32.61569864873935,\\\"curveF\\\":3.41799500576564,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":68,\\\"v1\\\":69,\\\"curve\\\":87.27222248408626,\\\"curveF\\\":1.0487790667177925,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":70,\\\"v1\\\":68,\\\"curve\\\":91.01129754822391,\\\"curveF\\\":0.9825034847024159,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":62,\\\"v1\\\":71,\\\"curve\\\":29.679637608212033,\\\"curveF\\\":3.7742255719252302,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":62,\\\"v1\\\":72,\\\"curve\\\":38.075988956856925,\\\"curveF\\\":2.897966653385071,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":73,\\\"v1\\\":74,\\\"curve\\\":19.384947656810187,\\\"curveF\\\":5.854871588894215,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":76,\\\"v1\\\":75,\\\"curve\\\":61.39739147490446,\\\"curveF\\\":1.6842792845253598,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":75,\\\"v1\\\":77,\\\"curve\\\":53.083351564723365,\\\"curveF\\\":2.002041553938593,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":33,\\\"v1\\\":79,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":77,\\\"v1\\\":80,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":81,\\\"v1\\\":80,\\\"curve\\\":33.69401762448199,\\\"curveF\\\":3.302365191186738,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":77,\\\"v1\\\":83,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":84,\\\"v1\\\":85,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":86,\\\"v1\\\":87,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":82,\\\"v1\\\":88,\\\"curve\\\":31.24091808873227,\\\"curveF\\\":3.5766662286774022,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":90,\\\"v1\\\":89,\\\"curve\\\":30.364030662738248,\\\"curveF\\\":3.6851828884427547,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":91,\\\"v1\\\":81,\\\"curve\\\":93.66680521853249,\\\"curveF\\\":0.9379660214601289,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":92,\\\"v1\\\":80,\\\"curve\\\":83.23166495655077,\\\"curveF\\\":1.125700419035067,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":92,\\\"v1\\\":81,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":93,\\\"v1\\\":29,\\\"curve\\\":45.24800680751066,\\\"curveF\\\":2.3995118120026895,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":94,\\\"v1\\\":93,\\\"curve\\\":32.0560435128164,\\\"curveF\\\":3.480988210289005,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":96,\\\"v1\\\":95,\\\"curve\\\":32.01673397912919,\\\"curveF\\\":3.4854933466810993,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":98,\\\"v1\\\":97,\\\"curve\\\":91.83529806656588,\\\"curveF\\\":0.9684702897636337,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":100,\\\"v1\\\":99,\\\"curve\\\":67.2576434076964,\\\"curveF\\\":1.5034796396810843,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":101,\\\"v1\\\":100,\\\"curve\\\":33.05114644011864,\\\"curveF\\\":3.3704185114565597,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":102,\\\"v1\\\":96,\\\"curve\\\":30.0435058470788,\\\"curveF\\\":3.7263911827871468,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":103,\\\"v1\\\":104,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":105,\\\"v1\\\":106,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":104,\\\"v1\\\":106,\\\"curve\\\":44.60355628644665,\\\"curveF\\\":2.4380364231202005,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":104,\\\"v1\\\":107,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":106,\\\"v1\\\":108,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":108,\\\"v1\\\":109,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":109,\\\"v1\\\":110,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":110,\\\"v1\\\":111,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":111,\\\"v1\\\":112,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":112,\\\"v1\\\":113,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":112,\\\"v1\\\":114,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":114,\\\"v1\\\":115,\\\"curve\\\":56.668454363854,\\\"curveF\\\":1.8545466400993478,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":116,\\\"v1\\\":117,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":117,\\\"v1\\\":118,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":118,\\\"v1\\\":119,\\\"curve\\\":74.04421877335461,\\\"curveF\\\":1.3259799292949979,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":119,\\\"v1\\\":120,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":122,\\\"v1\\\":121,\\\"curve\\\":36.430631189146524,\\\"curveF\\\":3.038779381443299,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":123,\\\"v1\\\":124,\\\"curve\\\":27.155748927511137,\\\"curveF\\\":4.140499840735493,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":124,\\\"v1\\\":125,\\\"curve\\\":35.39220413586051,\\\"curveF\\\":3.1341502479219243,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":126,\\\"v1\\\":127,\\\"curve\\\":33.774787809352404,\\\"curveF\\\":3.293992970613421,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":128,\\\"v1\\\":129,\\\"curve\\\":34.429219205480635,\\\"curveF\\\":3.227564427484375,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":129,\\\"v1\\\":119,\\\"curve\\\":39.35221415833419,\\\"curveF\\\":2.796565756721433,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":130,\\\"v1\\\":128,\\\"curve\\\":34.43471553611999,\\\"curveF\\\":3.2270168929149774,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":131,\\\"v1\\\":130,\\\"curve\\\":40.563000900530575,\\\"curveF\\\":2.7060361202683034,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":124,\\\"v1\\\":131,\\\"curve\\\":37.253499283375646,\\\"curveF\\\":2.9668571607548597,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":107,\\\"v1\\\":128,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":99,\\\"v1\\\":132,\\\"curve\\\":21.310552719513687,\\\"curveF\\\":5.315088063949703,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":132,\\\"v1\\\":133,\\\"curve\\\":21.296731454659813,\\\"curveF\\\":5.318618285231218,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":134,\\\"v1\\\":133,\\\"curve\\\":21.938724593814587,\\\"curveF\\\":5.159281626379893,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":135,\\\"v1\\\":136,\\\"curve\\\":94.09607649080162,\\\"curveF\\\":0.9309488030450684,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":135,\\\"v1\\\":137,\\\"curve\\\":98.44426196508834,\\\"curveF\\\":0.8625030200638429,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":137,\\\"v1\\\":138,\\\"curve\\\":101.98784492803861,\\\"curveF\\\":0.8099596786938144,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":139,\\\"v1\\\":140,\\\"curve\\\":96.72215814582727,\\\"curveF\\\":0.8890570429120243,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":141,\\\"v1\\\":142,\\\"curve\\\":106.82634658399935,\\\"curveF\\\":0.7423088737289484,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":140,\\\"v1\\\":143,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":143,\\\"v1\\\":144,\\\"curve\\\":12.680956564390383,\\\"curveF\\\":8.99958993632498,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":144,\\\"v1\\\":145,\\\"curve\\\":39.55647378406414,\\\"curveF\\\":2.780920675417801,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":146,\\\"v1\\\":35,\\\"curve\\\":36.49786919292764,\\\"curveF\\\":3.032785038108542,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":147,\\\"v1\\\":146,\\\"curve\\\":43.22587800227712,\\\"curveF\\\":2.524046203715973,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":148,\\\"v1\\\":147,\\\"curve\\\":20.77543721891776,\\\"curveF\\\":5.455156960989275,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":148,\\\"v1\\\":149,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":150,\\\"v1\\\":149,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":151,\\\"v1\\\":150,\\\"curve\\\":25.18736400915398,\\\"curveF\\\":4.47606122431419,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":151,\\\"v1\\\":152,\\\"curve\\\":20.77501634159551,\\\"curveF\\\":5.455269935405155,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":153,\\\"v1\\\":154,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":154,\\\"v1\\\":155,\\\"curve\\\":11.086651825137466,\\\"curveF\\\":10.303723398180301,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":155,\\\"v1\\\":156,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":143,\\\"v1\\\":156,\\\"curve\\\":34.53187891748314,\\\"curveF\\\":3.2173655557434166,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":158,\\\"v1\\\":159,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":159,\\\"v1\\\":160,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":158,\\\"v1\\\":161,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":160,\\\"v1\\\":162,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":161,\\\"v1\\\":163,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":164,\\\"v1\\\":165,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":165,\\\"v1\\\":166,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":166,\\\"v1\\\":167,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":167,\\\"v1\\\":168,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":168,\\\"v1\\\":169,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":170,\\\"v1\\\":171,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":171,\\\"v1\\\":172,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":164,\\\"v1\\\":173,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":173,\\\"v1\\\":174,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":174,\\\"v1\\\":175,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":177,\\\"v1\\\":178,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":178,\\\"v1\\\":179,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":180,\\\"v1\\\":179,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":181,\\\"v1\\\":182,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":182,\\\"v1\\\":183,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":185,\\\"v1\\\":184,\\\"curve\\\":134.03331227698212,\\\"curveF\\\":0.4241317752722216,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":187,\\\"v1\\\":186,\\\"curve\\\":132.1722674366651,\\\"curveF\\\":0.4434285714285756,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":185,\\\"v1\\\":186,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":186,\\\"v1\\\":188,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":188,\\\"v1\\\":157,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":189,\\\"v1\\\":190,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":190,\\\"v1\\\":191,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":193,\\\"v1\\\":192,\\\"curve\\\":113.9478583399237,\\\"curveF\\\":0.6500547027368867,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":194,\\\"v1\\\":193,\\\"curve\\\":37.28317663789911,\\\"curveF\\\":2.964320488312706,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FFFDD0\\\"},{\\\"v0\\\":195,\\\"v1\\\":73,\\\"curve\\\":41.841234870808414,\\\"curveF\\\":2.615916230574092,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":196,\\\"v1\\\":197,\\\"bCoef\\\":-0.5,\\\"curve\\\":-160.00000000000003,\\\"curveF\\\":-0.17632698070846492,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"252525\\\"},{\\\"v0\\\":198,\\\"v1\\\":199,\\\"bCoef\\\":-0.5,\\\"curve\\\":-160.00000000000003,\\\"curveF\\\":-0.17632698070846492,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"252525\\\"},{\\\"v0\\\":199,\\\"v1\\\":198,\\\"bias\\\":-1,\\\"bCoef\\\":-0.5,\\\"curve\\\":130,\\\"curveF\\\":0.4663076581549986,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"E6842E\\\"},{\\\"v0\\\":34,\\\"v1\\\":152,\\\"curve\\\":25.227797256892945,\\\"curveF\\\":4.46865075476096,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":201,\\\"v1\\\":200,\\\"curve\\\":27.124327352767555,\\\"curveF\\\":4.145480599090436,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":202,\\\"v1\\\":201,\\\"curve\\\":19.799004144835102,\\\"curveF\\\":5.730035659631905,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":204,\\\"v1\\\":203,\\\"curve\\\":32.896817252945965,\\\"curveF\\\":3.3871402029615347,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":206,\\\"v1\\\":205,\\\"curve\\\":91.83529806656588,\\\"curveF\\\":0.9684702897636337,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"},{\\\"v0\\\":207,\\\"v1\\\":208,\\\"curve\\\":38.075988956856925,\\\"curveF\\\":2.897966653385071,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"769BF\\\"}],\\\"planes\\\":[{\\\"normal\\\":[0,1],\\\"dist\\\":-800,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-793,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-922,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[-1,0],\\\"dist\\\":-922,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-309,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-1,0],\\\"dist\\\":-307,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-303,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0,1],\\\"dist\\\":-308,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0.7071067811865476,0.7071067811865476],\\\"dist\\\":-306.920310216783,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-0.7071067811865476,0.7071067811865476],\\\"dist\\\":-308.3345237791561,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-0.7071067811865476,-0.7071067811865476],\\\"dist\\\":-308.3345237791561,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0.7071067811865476,-0.7071067811865476],\\\"dist\\\":-307.62741699796953,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0.9424277454812465,-0.33440984517076494],\\\"dist\\\":-307.07104978127046,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0.33440984517076494,-0.9424277454812465],\\\"dist\\\":-307.80067126164306,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-0.33440984517076494,-0.9424277454812465],\\\"dist\\\":-307.31425694139466,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-0.9424277454812465,-0.33440984517076494],\\\"dist\\\":-307.6182658915499,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-0.9424277454812465,0.33440984517076494],\\\"dist\\\":-307.95267573672066,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-0.33440984517076494,0.9424277454812465],\\\"dist\\\":-306.52383367099105,\\\"bCoef\\\":20,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0.33440984517076494,0.9424277454812465],\\\"dist\\\":-306.46303188096,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0.9424277454812465,0.33440984517076494],\\\"dist\\\":-310.6279544980868,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0,1],\\\"dist\\\":-850,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-309,\\\"bCoef\\\":5,\\\"cMask\\\":[\\\"kick\\\"],\\\"cGroup\\\":[\\\"c3\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":308,\\\"bCoef\\\":5,\\\"cMask\\\":[\\\"kick\\\"],\\\"cGroup\\\":[\\\"c3\\\"]},{\\\"normal\\\":[0,1],\\\"dist\\\":-600,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-600,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-650,\\\"bCoef\\\":10000,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"normal\\\":[0,1],\\\"dist\\\":-650,\\\"bCoef\\\":0.0001,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]}],\\\"goals\\\":[],\\\"discs\\\":[{\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"invMass\\\":0.01,\\\"damping\\\":0,\\\"color\\\":\\\"0\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"ball\\\",\\\"kick\\\",\\\"score\\\"]},{\\\"pos\\\":[-2450,2],\\\"speed\\\":[0.4,0],\\\"radius\\\":0.01,\\\"bCoef\\\":10000000,\\\"damping\\\":1,\\\"color\\\":\\\"FA3A0A\\\",\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"kick\\\"]},{\\\"radius\\\":1,\\\"bCoef\\\":0.3,\\\"invMass\\\":0,\\\"damping\\\":1.0027,\\\"color\\\":\\\"3B2C25\\\",\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c2\\\"]},{\\\"pos\\\":[0,-250],\\\"speed\\\":[0,0.2],\\\"bCoef\\\":5,\\\"damping\\\":1,\\\"color\\\":\\\"transparent\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"pos\\\":[-961,250.55263581912408],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-563,-176.5967332862158],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-706,414.75797359604417],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-961,518.990737469004],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-609,656.4811004085838],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-872,-452.96700690743546],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-616,-370.76537651239573],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-506,-316.0366886270358],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-594,60.228778833534534],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-464,-614.7231637735877],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-494,485.380285211064],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-751,-128.65314620107472],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-494,242.96979279698093],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-464,-534.7231637735877],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-872,-350.96700690743546],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-616,-262.76537651239573],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-506,-238.0366886270358],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-751,-0.6531462010747191],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-594,166.22877883353453],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-862.5,154.2712921170687],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-563,-27.596733286215795],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-706,565.7579735960442],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-609,775.4811004085838],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[690,-484.52705156661614],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[554,-160.5967332862158],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[411,430.75797359604417],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[508,672.4811004085838],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[553,-574.9670069074355],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[501,-354.76537651239573],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[611,-300.0366886270358],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[523,76.22877883353453],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[707,-32.06841039915025],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[727,591.9361792871871],\\\"speed\\\":[0,20],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[690,-403.52705156661614],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[553,-472.96700690743546],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[501,-246.76537651239573],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[611,-222.0366886270358],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[707,156.93158960084975],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[523,182.22877883353453],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[554,-11.596733286215795],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[411,581.7579735960442],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[726.9029363784665,773.0876502917861],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[508,787.4811004085838],\\\"speed\\\":[0,23],\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[153,-234],\\\"speed\\\":[0,5],\\\"radius\\\":20,\\\"bCoef\\\":0.3,\\\"invMass\\\":1e-30,\\\"damping\\\":1.00127,\\\"color\\\":\\\"C21717\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"pos\\\":[-152,236],\\\"speed\\\":[0,-5],\\\"radius\\\":20,\\\"bCoef\\\":0.3,\\\"invMass\\\":1e-30,\\\"damping\\\":1.00127,\\\"color\\\":\\\"C21717\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"redKO\\\",\\\"blueKO\\\"]}],\\\"playerPhysics\\\":{\\\"bCoef\\\":0.1,\\\"damping\\\":0.9995,\\\"acceleration\\\":0.025,\\\"kickingAcceleration\\\":0.025,\\\"kickingDamping\\\":0.9995,\\\"kickStrength\\\":0,\\\"radius\\\":20},\\\"ballPhysics\\\":\\\"disc0\\\",\\\"spawnDistance\\\":300,\\\"joints\\\":[{\\\"d0\\\":13,\\\"d1\\\":17,\\\"length\\\":80,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":9,\\\"d1\\\":18,\\\"length\\\":102,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":10,\\\"d1\\\":19,\\\"length\\\":108,\\\"color\\\":\\\"FFFFFF\\\"},{\\\"d0\\\":10,\\\"d1\\\":19,\\\"length\\\":108,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":11,\\\"d1\\\":20,\\\"length\\\":78,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":15,\\\"d1\\\":21,\\\"length\\\":128,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":12,\\\"d1\\\":22,\\\"length\\\":106,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":5,\\\"d1\\\":24,\\\"length\\\":149,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":6,\\\"d1\\\":25,\\\"length\\\":151,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":14,\\\"d1\\\":16,\\\"length\\\":242.41049241408308,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":4,\\\"d1\\\":7,\\\"length\\\":268.4381016498799,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":8,\\\"d1\\\":26,\\\"length\\\":119,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":31,\\\"d1\\\":38,\\\"length\\\":102,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":27,\\\"d1\\\":37,\\\"length\\\":81,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":32,\\\"d1\\\":39,\\\"length\\\":108,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":33,\\\"d1\\\":40,\\\"length\\\":78,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":28,\\\"d1\\\":43,\\\"length\\\":149,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":34,\\\"d1\\\":42,\\\"length\\\":106,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":35,\\\"d1\\\":41,\\\"length\\\":189,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":29,\\\"d1\\\":44,\\\"length\\\":151,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":36,\\\"d1\\\":45,\\\"length\\\":181.15149700865484,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":30,\\\"d1\\\":46,\\\"length\\\":115,\\\"color\\\":\\\"FFFFFF\\\",\\\"strength\\\":0},{\\\"d0\\\":2,\\\"d1\\\":48,\\\"length\\\":280.713376952364,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":2,\\\"d1\\\":47,\\\"length\\\":279.5800422061632,\\\"color\\\":\\\"transparent\\\"}]}\"";
var mapUltraball = "\"{\\\"name\\\":\\\"ULTRABALL\\\",\\\"width\\\":600,\\\"height\\\":270,\\\"bg\\\":{\\\"type\\\":\\\"hockey\\\",\\\"width\\\":550,\\\"height\\\":271,\\\"kickOffRadius\\\":75},\\\"vertexes\\\":[{\\\"x\\\":-550,\\\"y\\\":500,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-550,\\\"y\\\":80,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-550,\\\"y\\\":-80,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-550,\\\"y\\\":-500,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":550,\\\"y\\\":500,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":550,\\\"y\\\":80,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":550,\\\"y\\\":-80,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":550,\\\"y\\\":-500,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":0,\\\"y\\\":270,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":0,\\\"y\\\":75,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":0,\\\"y\\\":-75,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":0,\\\"y\\\":-270,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":-560,\\\"y\\\":-80,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-580,\\\"y\\\":-60,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-580,\\\"y\\\":60,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-560,\\\"y\\\":80,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":560,\\\"y\\\":-80,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":580,\\\"y\\\":-60,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":580,\\\"y\\\":60,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":560,\\\"y\\\":80,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-565,\\\"y\\\":85,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-565,\\\"y\\\":500,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-565,\\\"y\\\":-85,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-565,\\\"y\\\":-500,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":565,\\\"y\\\":-85,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":565,\\\"y\\\":-500,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":565,\\\"y\\\":85,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":565,\\\"y\\\":500,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-553,\\\"y\\\":-271,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-553,\\\"y\\\":271,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":553,\\\"y\\\":271,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":553,\\\"y\\\":-271,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-550,\\\"y\\\":-268,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-550,\\\"y\\\":268,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":550,\\\"y\\\":268,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":550,\\\"y\\\":-268,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-3,\\\"y\\\":264,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-3,\\\"y\\\":78,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-3,\\\"y\\\":-78,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-3,\\\"y\\\":-264,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":3,\\\"y\\\":-264,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":3,\\\"y\\\":-78,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":3,\\\"y\\\":78,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":3,\\\"y\\\":264,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":0,\\\"y\\\":-72,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":0,\\\"y\\\":72,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-546,\\\"y\\\":264,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":546,\\\"y\\\":264,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":546,\\\"y\\\":-264,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-546,\\\"y\\\":-264,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":0,\\\"y\\\":-78,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":0,\\\"y\\\":78,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-3,\\\"y\\\":-71,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-3,\\\"y\\\":71,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":3,\\\"y\\\":71,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":3,\\\"y\\\":-71,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-30,\\\"y\\\":256,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-30,\\\"y\\\":236,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-21,\\\"y\\\":245,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-12,\\\"y\\\":236,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-12,\\\"y\\\":256,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":12,\\\"y\\\":236,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":12,\\\"y\\\":256,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":26,\\\"y\\\":256,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":26,\\\"y\\\":252,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":26,\\\"y\\\":240,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":26,\\\"y\\\":236,\\\"cMask\\\":[\\\"wall\\\"]}],\\\"segments\\\":[{\\\"v0\\\":0,\\\"v1\\\":1,\\\"vis\\\":false,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":2,\\\"v1\\\":3,\\\"vis\\\":false,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":4,\\\"v1\\\":5,\\\"vis\\\":false,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":6,\\\"v1\\\":7,\\\"vis\\\":false,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":13,\\\"v1\\\":12,\\\"bCoef\\\":0.1,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":13,\\\"v1\\\":14,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":15,\\\"v1\\\":14,\\\"bCoef\\\":0.1,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":16,\\\"v1\\\":17,\\\"bCoef\\\":0.1,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":17,\\\"v1\\\":18,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":18,\\\"v1\\\":19,\\\"bCoef\\\":0.1,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":8,\\\"v1\\\":9,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"1121F0\\\"},{\\\"v0\\\":9,\\\"v1\\\":10,\\\"bCoef\\\":0.1,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"blueKO\\\"],\\\"color\\\":\\\"1121F0\\\"},{\\\"v0\\\":10,\\\"v1\\\":9,\\\"bCoef\\\":0.1,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\"],\\\"color\\\":\\\"1121F0\\\"},{\\\"v0\\\":10,\\\"v1\\\":11,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"1121F0\\\"},{\\\"v0\\\":20,\\\"v1\\\":21,\\\"vis\\\":false,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":22,\\\"v1\\\":23,\\\"vis\\\":false,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":24,\\\"v1\\\":25,\\\"vis\\\":false,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":26,\\\"v1\\\":27,\\\"vis\\\":false,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":28,\\\"v1\\\":29,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":29,\\\"v1\\\":30,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":30,\\\"v1\\\":31,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":31,\\\"v1\\\":28,\\\"cMask\\\":[\\\"ball\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":32,\\\"v1\\\":33,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"1121F0\\\"},{\\\"v0\\\":33,\\\"v1\\\":34,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"1121F0\\\"},{\\\"v0\\\":34,\\\"v1\\\":35,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"1121F0\\\"},{\\\"v0\\\":35,\\\"v1\\\":32,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"1121F0\\\"},{\\\"v0\\\":36,\\\"v1\\\":37,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":37,\\\"v1\\\":38,\\\"curve\\\":176,\\\"curveF\\\":0.03492076949174784,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":38,\\\"v1\\\":39,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":40,\\\"v1\\\":41,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":41,\\\"v1\\\":42,\\\"curve\\\":176,\\\"curveF\\\":0.03492076949174784,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":42,\\\"v1\\\":43,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":44,\\\"v1\\\":45,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":45,\\\"v1\\\":44,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":47,\\\"v1\\\":48,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":49,\\\"v1\\\":46,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":46,\\\"v1\\\":36,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":43,\\\"v1\\\":47,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":39,\\\"v1\\\":49,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":40,\\\"v1\\\":48,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":50,\\\"v1\\\":51,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"1121F0\\\"},{\\\"v0\\\":52,\\\"v1\\\":53,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":54,\\\"v1\\\":55,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":56,\\\"v1\\\":57,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":57,\\\"v1\\\":58,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":58,\\\"v1\\\":59,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":59,\\\"v1\\\":60,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":61,\\\"v1\\\":62,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":62,\\\"v1\\\":63,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":63,\\\"v1\\\":64,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":65,\\\"v1\\\":66,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":66,\\\"v1\\\":61,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"}],\\\"planes\\\":[{\\\"normal\\\":[0,1],\\\"dist\\\":-270,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-270,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-600,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[-1,0],\\\"dist\\\":-600,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-100000,\\\"bCoef\\\":0,\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"normal\\\":[-1,0],\\\"dist\\\":-100000,\\\"bCoef\\\":0,\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-199000,\\\"bCoef\\\":0,\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"normal\\\":[0,1],\\\"dist\\\":-199000,\\\"bCoef\\\":0,\\\"cGroup\\\":[\\\"ball\\\"]}],\\\"goals\\\":[{\\\"p0\\\":[-550,80],\\\"p1\\\":[-550,-80],\\\"team\\\":\\\"red\\\"},{\\\"p0\\\":[550,80],\\\"p1\\\":[550,-80],\\\"team\\\":\\\"blue\\\"}],\\\"discs\\\":[{\\\"bCoef\\\":0.4,\\\"damping\\\":1,\\\"color\\\":\\\"5150B0\\\",\\\"cGroup\\\":[\\\"ball\\\",\\\"kick\\\",\\\"score\\\"]},{\\\"pos\\\":[-550,80],\\\"radius\\\":8,\\\"invMass\\\":0,\\\"color\\\":\\\"0\\\"},{\\\"pos\\\":[-550,-80],\\\"radius\\\":8,\\\"invMass\\\":0,\\\"color\\\":\\\"0\\\"},{\\\"pos\\\":[550,80],\\\"radius\\\":8,\\\"invMass\\\":0,\\\"color\\\":\\\"0\\\"},{\\\"pos\\\":[550,-80],\\\"radius\\\":8,\\\"invMass\\\":0,\\\"color\\\":\\\"0\\\"},{\\\"pos\\\":[0,-100000],\\\"radius\\\":100000,\\\"bCoef\\\":0,\\\"invMass\\\":100,\\\"color\\\":\\\"transparent\\\",\\\"cMask\\\":[\\\"ball\\\"]},{\\\"pos\\\":[0,100000],\\\"radius\\\":100000,\\\"bCoef\\\":0,\\\"invMass\\\":100,\\\"color\\\":\\\"transparent\\\",\\\"cMask\\\":[\\\"ball\\\"]}],\\\"playerPhysics\\\":{\\\"invMass\\\":1e+100,\\\"kickStrength\\\":9},\\\"ballPhysics\\\":\\\"disc0\\\",\\\"spawnDistance\\\":350}\"";
var mapSurvivalSquare = "\"{\\\"name\\\":\\\"Survival Square Deluxe by /R [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ]\\\",\\\"width\\\":420,\\\"height\\\":334,\\\"bg\\\":{\\\"width\\\":300,\\\"height\\\":300,\\\"kickOffRadius\\\":295,\\\"cornerRadius\\\":300,\\\"color\\\":\\\"444749\\\",\\\"goalLine\\\":-1},\\\"vertexes\\\":[{\\\"x\\\":-23.5,\\\"y\\\":43,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":-5.5,\\\"y\\\":-5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":25.5,\\\"y\\\":-5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":-3,\\\"y\\\":-30,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":31.5,\\\"y\\\":-30,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":31.5,\\\"y\\\":14,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":10,\\\"y\\\":12,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":10,\\\"y\\\":18,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":22,\\\"y\\\":43,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":31.5,\\\"y\\\":18,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":45.5,\\\"y\\\":43,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":26,\\\"y\\\":-7,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":-8,\\\"y\\\":-7,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":-25.5,\\\"y\\\":43,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":-3,\\\"y\\\":-28,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":31.5,\\\"y\\\":-28,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":29.5,\\\"y\\\":12,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":29.5,\\\"y\\\":18,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":43.5,\\\"y\\\":43,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":8,\\\"y\\\":12,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":8,\\\"y\\\":18,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":20,\\\"y\\\":43,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":-63,\\\"y\\\":43,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":-10,\\\"y\\\":-43,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":-61,\\\"y\\\":43,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":-8,\\\"y\\\":-43,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[]},{\\\"x\\\":-295,\\\"y\\\":-295,\\\"cMask\\\":[],\\\"cGroup\\\":[]},{\\\"x\\\":-295,\\\"y\\\":295,\\\"cMask\\\":[],\\\"cGroup\\\":[]},{\\\"x\\\":295,\\\"y\\\":295,\\\"cMask\\\":[],\\\"cGroup\\\":[]},{\\\"x\\\":295,\\\"y\\\":-295,\\\"cMask\\\":[],\\\"cGroup\\\":[]},{\\\"x\\\":-295,\\\"y\\\":-295,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":295,\\\"y\\\":-295,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":295,\\\"y\\\":295,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-295,\\\"y\\\":295,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-302,\\\"y\\\":-302,\\\"cMask\\\":[],\\\"cGroup\\\":[]},{\\\"x\\\":-302,\\\"y\\\":302,\\\"cMask\\\":[],\\\"cGroup\\\":[]},{\\\"x\\\":302,\\\"y\\\":302,\\\"cMask\\\":[],\\\"cGroup\\\":[]},{\\\"x\\\":302,\\\"y\\\":-302,\\\"cMask\\\":[],\\\"cGroup\\\":[]},{\\\"x\\\":-300,\\\"y\\\":-300,\\\"bCoef\\\":0.125},{\\\"x\\\":-300,\\\"y\\\":300,\\\"bCoef\\\":0.125},{\\\"x\\\":300,\\\"y\\\":300,\\\"bCoef\\\":0.125},{\\\"x\\\":300,\\\"y\\\":-300,\\\"bCoef\\\":0.125}],\\\"segments\\\":[{\\\"v0\\\":0,\\\"v1\\\":1,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":1,\\\"v1\\\":2,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":3,\\\"v1\\\":4,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":4,\\\"v1\\\":5,\\\"curve\\\":173.7557390757686,\\\"curveF\\\":0.05454545454545445,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":6,\\\"v1\\\":7,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":7,\\\"v1\\\":8,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":5,\\\"v1\\\":9,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":9,\\\"v1\\\":10,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":11,\\\"v1\\\":2,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":11,\\\"v1\\\":12,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":12,\\\"v1\\\":13,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":14,\\\"v1\\\":15,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":15,\\\"v1\\\":16,\\\"curve\\\":175.8889487825513,\\\"curveF\\\":0.03589108910891094,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":16,\\\"v1\\\":17,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":17,\\\"v1\\\":18,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":19,\\\"v1\\\":20,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":20,\\\"v1\\\":21,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":22,\\\"v1\\\":23,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":24,\\\"v1\\\":25,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[],\\\"color\\\":\\\"8B8B8B\\\"},{\\\"v0\\\":26,\\\"v1\\\":27,\\\"cMask\\\":[],\\\"cGroup\\\":[],\\\"color\\\":\\\"E3D500\\\"},{\\\"v0\\\":27,\\\"v1\\\":28,\\\"cMask\\\":[],\\\"cGroup\\\":[],\\\"color\\\":\\\"E3D500\\\"},{\\\"v0\\\":28,\\\"v1\\\":29,\\\"cMask\\\":[],\\\"cGroup\\\":[],\\\"color\\\":\\\"E3D500\\\"},{\\\"v0\\\":29,\\\"v1\\\":26,\\\"cMask\\\":[],\\\"cGroup\\\":[],\\\"color\\\":\\\"E3D500\\\"},{\\\"v0\\\":30,\\\"v1\\\":31,\\\"bCoef\\\":-100000,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"v0\\\":31,\\\"v1\\\":32,\\\"bCoef\\\":-100000,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"v0\\\":32,\\\"v1\\\":33,\\\"bCoef\\\":-100000,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"v0\\\":33,\\\"v1\\\":30,\\\"bCoef\\\":-100000,\\\"vis\\\":false,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"v0\\\":34,\\\"v1\\\":35,\\\"cMask\\\":[],\\\"cGroup\\\":[]},{\\\"v0\\\":35,\\\"v1\\\":36,\\\"cMask\\\":[],\\\"cGroup\\\":[]},{\\\"v0\\\":36,\\\"v1\\\":37,\\\"cMask\\\":[],\\\"cGroup\\\":[]},{\\\"v0\\\":37,\\\"v1\\\":34,\\\"cMask\\\":[],\\\"cGroup\\\":[]},{\\\"v0\\\":38,\\\"v1\\\":39,\\\"bCoef\\\":0.125},{\\\"v0\\\":39,\\\"v1\\\":40,\\\"bCoef\\\":0.125},{\\\"v0\\\":40,\\\"v1\\\":41,\\\"bCoef\\\":0.125},{\\\"v0\\\":41,\\\"v1\\\":38,\\\"bCoef\\\":0.125}],\\\"planes\\\":[{\\\"normal\\\":[-0.9998838319648692,-0.015242131584830322],\\\"dist\\\":-403.1208477292754,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-393,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-380,\\\"bCoef\\\":0,\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"normal\\\":[0,1],\\\"dist\\\":-380,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\"]}],\\\"goals\\\":[],\\\"discs\\\":[{\\\"radius\\\":30,\\\"bCoef\\\":5,\\\"invMass\\\":0.001,\\\"damping\\\":1.007,\\\"color\\\":\\\"990000\\\",\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[-300,0],\\\"radius\\\":24.5,\\\"bCoef\\\":0.2,\\\"invMass\\\":0,\\\"color\\\":\\\"FFF1E1\\\"},{\\\"pos\\\":[0,-300],\\\"radius\\\":24.5,\\\"bCoef\\\":0.2,\\\"invMass\\\":0,\\\"color\\\":\\\"FFF1E1\\\"},{\\\"pos\\\":[0,300],\\\"radius\\\":24.5,\\\"bCoef\\\":0.2,\\\"invMass\\\":0,\\\"color\\\":\\\"FFF1E1\\\"},{\\\"pos\\\":[300,0],\\\"radius\\\":24.5,\\\"bCoef\\\":0.2,\\\"invMass\\\":0,\\\"color\\\":\\\"FFF1E1\\\"},{\\\"pos\\\":[300,-300],\\\"radius\\\":24.5,\\\"bCoef\\\":0.14,\\\"invMass\\\":0,\\\"color\\\":\\\"E1FFFF\\\"},{\\\"pos\\\":[-300,300],\\\"radius\\\":24.5,\\\"bCoef\\\":0.14,\\\"invMass\\\":0,\\\"color\\\":\\\"E1FFFF\\\"},{\\\"pos\\\":[-300,-300],\\\"radius\\\":24.5,\\\"bCoef\\\":0.14,\\\"invMass\\\":0,\\\"color\\\":\\\"E1FFFF\\\"},{\\\"pos\\\":[300,300],\\\"radius\\\":24.5,\\\"bCoef\\\":0.14,\\\"invMass\\\":0,\\\"color\\\":\\\"E1FFFF\\\"},{\\\"pos\\\":[300,200],\\\"radius\\\":15,\\\"bCoef\\\":0.2,\\\"invMass\\\":0,\\\"color\\\":\\\"FAE1FF\\\"},{\\\"pos\\\":[200,300],\\\"radius\\\":15,\\\"bCoef\\\":0.14,\\\"invMass\\\":0,\\\"color\\\":\\\"FAE1FF\\\"},{\\\"pos\\\":[-200,300],\\\"radius\\\":15,\\\"bCoef\\\":0.14,\\\"invMass\\\":0,\\\"color\\\":\\\"FAE1FF\\\"},{\\\"pos\\\":[300,-200],\\\"radius\\\":15,\\\"bCoef\\\":0.2,\\\"invMass\\\":0,\\\"color\\\":\\\"FAE1FF\\\"},{\\\"pos\\\":[-300,200],\\\"radius\\\":15,\\\"bCoef\\\":0.14,\\\"invMass\\\":0,\\\"color\\\":\\\"FAE1FF\\\"},{\\\"pos\\\":[-300,-200],\\\"radius\\\":15,\\\"bCoef\\\":0.14,\\\"invMass\\\":0,\\\"color\\\":\\\"FAE1FF\\\"},{\\\"pos\\\":[-200,-300],\\\"radius\\\":15,\\\"bCoef\\\":0.14,\\\"invMass\\\":0,\\\"color\\\":\\\"FAE1FF\\\"},{\\\"pos\\\":[200,-300],\\\"radius\\\":15,\\\"bCoef\\\":0.14,\\\"invMass\\\":0,\\\"color\\\":\\\"FAE1FF\\\"},{\\\"pos\\\":[-300,-100],\\\"radius\\\":15,\\\"bCoef\\\":0.14,\\\"invMass\\\":0,\\\"color\\\":\\\"FAE1FF\\\"},{\\\"pos\\\":[-100,-300],\\\"radius\\\":15,\\\"bCoef\\\":0.14,\\\"invMass\\\":0,\\\"color\\\":\\\"FAE1FF\\\"},{\\\"pos\\\":[100,-300],\\\"radius\\\":15,\\\"bCoef\\\":0.14,\\\"invMass\\\":0,\\\"color\\\":\\\"FAE1FF\\\"},{\\\"pos\\\":[300,-100],\\\"radius\\\":15,\\\"bCoef\\\":0.2,\\\"invMass\\\":0,\\\"color\\\":\\\"FAE1FF\\\"},{\\\"pos\\\":[300,100],\\\"radius\\\":15,\\\"bCoef\\\":0.2,\\\"invMass\\\":0,\\\"color\\\":\\\"FAE1FF\\\"},{\\\"pos\\\":[-300,100],\\\"radius\\\":15,\\\"bCoef\\\":0.2,\\\"invMass\\\":0,\\\"color\\\":\\\"FAE1FF\\\"},{\\\"pos\\\":[100,300],\\\"radius\\\":15,\\\"bCoef\\\":0.14,\\\"invMass\\\":0,\\\"color\\\":\\\"FAE1FF\\\"},{\\\"pos\\\":[-100,300],\\\"radius\\\":15,\\\"bCoef\\\":0.14,\\\"invMass\\\":0,\\\"color\\\":\\\"FAE1FF\\\"}],\\\"playerPhysics\\\":{\\\"kickingAcceleration\\\":0.16,\\\"radius\\\":12},\\\"ballPhysics\\\":\\\"disc0\\\",\\\"spawnDistance\\\":20}\"";
var mapNumberChairs = "\"{\\\"name\\\":\\\"NumberChairs v2 by Şerefli Şeref [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ]\\\",\\\"width\\\":1050,\\\"height\\\":1050,\\\"bg\\\":{\\\"color\\\":\\\"0\\\"},\\\"vertexes\\\":[{\\\"x\\\":-12.199999999999989,\\\"y\\\":157,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"x\\\":20.19999999999999,\\\"y\\\":157,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"x\\\":-6,\\\"y\\\":141,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":16,\\\"y\\\":141,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":23,\\\"y\\\":132,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":5,\\\"y\\\":124,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-13,\\\"y\\\":132,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":10,\\\"y\\\":138,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":1,\\\"y\\\":138,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":6,\\\"y\\\":139,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":1,\\\"y\\\":142,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":10,\\\"y\\\":141,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-16,\\\"y\\\":-114,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-16,\\\"y\\\":176,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":22,\\\"y\\\":-190,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":24,\\\"y\\\":176,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-96,\\\"y\\\":176,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-96,\\\"y\\\":203.09756097560975,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":104,\\\"y\\\":203.09756097560975,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":104,\\\"y\\\":176,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-83,\\\"y\\\":-110,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-81,\\\"y\\\":-69,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-83,\\\"y\\\":-110,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"c0\\\"]},{\\\"x\\\":-310,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"wall\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"x\\\":-340,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"wall\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"x\\\":310,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"wall\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"x\\\":340,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"wall\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"x\\\":-310,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"x\\\":310,\\\"y\\\":0,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]}],\\\"segments\\\":[{\\\"v0\\\":0,\\\"v1\\\":1,\\\"bias\\\":-1,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFD500\\\"},{\\\"v0\\\":1,\\\"v1\\\":0,\\\"bias\\\":-1,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFD500\\\"},{\\\"v0\\\":2,\\\"v1\\\":3,\\\"curve\\\":110.35102168608641,\\\"curveF\\\":0.6956521739130435,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FFD500\\\"},{\\\"v0\\\":3,\\\"v1\\\":4,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FFD500\\\"},{\\\"v0\\\":6,\\\"v1\\\":2,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FFD500\\\"},{\\\"v0\\\":6,\\\"v1\\\":3,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FFD500\\\"},{\\\"v0\\\":4,\\\"v1\\\":2,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FFD500\\\"},{\\\"v0\\\":2,\\\"v1\\\":5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FFD500\\\"},{\\\"v0\\\":5,\\\"v1\\\":3,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FFD500\\\"},{\\\"v0\\\":6,\\\"v1\\\":7,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FFD500\\\"},{\\\"v0\\\":4,\\\"v1\\\":8,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FFD500\\\"},{\\\"v0\\\":8,\\\"v1\\\":5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FFD500\\\"},{\\\"v0\\\":7,\\\"v1\\\":5,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FFD500\\\"},{\\\"v0\\\":5,\\\"v1\\\":9,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FFD500\\\"},{\\\"v0\\\":6,\\\"v1\\\":10,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FFD500\\\"},{\\\"v0\\\":4,\\\"v1\\\":11,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"FFD500\\\"},{\\\"v0\\\":12,\\\"v1\\\":13,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":14,\\\"v1\\\":15,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":15,\\\"v1\\\":16,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":16,\\\"v1\\\":17,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":17,\\\"v1\\\":18,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":18,\\\"v1\\\":19,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":19,\\\"v1\\\":15,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":14,\\\"v1\\\":20,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":12,\\\"v1\\\":21,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":21,\\\"v1\\\":22,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"c0\\\"],\\\"color\\\":\\\"7FDD2C\\\"},{\\\"v0\\\":25,\\\"v1\\\":23,\\\"bias\\\":100,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"wall\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":26,\\\"v1\\\":24,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"wall\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":24,\\\"v1\\\":26,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"wall\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":27,\\\"v1\\\":28,\\\"bias\\\":100,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"wall\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"],\\\"color\\\":\\\"FFFFFF\\\"}],\\\"planes\\\":[{\\\"normal\\\":[0,-1],\\\"dist\\\":-146,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"kick\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-176,\\\"bCoef\\\":1e-7,\\\"cMask\\\":[\\\"score\\\"],\\\"cGroup\\\":[\\\"blueKO\\\"]},{\\\"normal\\\":[0,1],\\\"dist\\\":106,\\\"bCoef\\\":10000000,\\\"cMask\\\":[\\\"score\\\"],\\\"cGroup\\\":[\\\"blueKO\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-1000,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[-1,0],\\\"dist\\\":-1000,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[0,1],\\\"dist\\\":-1000,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-1000,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[0,1],\\\"dist\\\":-343,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-343,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-343,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-1,0],\\\"dist\\\":-343,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0.7071067811865476,0.7071067811865476],\\\"dist\\\":-343,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-0.7071067811865476,0.7071067811865476],\\\"dist\\\":-343,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-0.7071067811865476,-0.7071067811865476],\\\"dist\\\":-343,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0.7071067811865476,-0.7071067811865476],\\\"dist\\\":-343,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0.3826834323650898,0.9238795325112867],\\\"dist\\\":-343,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-0.3826834323650898,0.9238795325112867],\\\"dist\\\":-343,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-0.3826834323650898,-0.9238795325112867],\\\"dist\\\":-343,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0.3826834323650898,-0.9238795325112867],\\\"dist\\\":-343,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0.9238795325112867,0.3826834323650898],\\\"dist\\\":-343,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-0.9238795325112867,0.3826834323650898],\\\"dist\\\":-343,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-0.9238795325112867,-0.3826834323650898],\\\"dist\\\":-343,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0.9238795325112867,-0.3826834323650898],\\\"dist\\\":-343,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]}],\\\"goals\\\":[],\\\"discs\\\":[{\\\"radius\\\":0,\\\"bCoef\\\":9,\\\"invMass\\\":1e-40,\\\"damping\\\":0,\\\"color\\\":\\\"18141C\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"ball\\\",\\\"kick\\\",\\\"score\\\"]},{\\\"pos\\\":[495,-430],\\\"radius\\\":0,\\\"bCoef\\\":0,\\\"invMass\\\":0,\\\"damping\\\":0,\\\"color\\\":\\\"0\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"blue\\\"]},{\\\"pos\\\":[295,-430],\\\"radius\\\":0,\\\"bCoef\\\":0,\\\"invMass\\\":0,\\\"damping\\\":0,\\\"color\\\":\\\"0\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"blue\\\"]},{\\\"pos\\\":[-487,146],\\\"speed\\\":[0,-1],\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"color\\\":\\\"DBD52A\\\",\\\"cMask\\\":[\\\"blueKO\\\"],\\\"cGroup\\\":[\\\"score\\\"]},{\\\"pos\\\":[-496,133],\\\"speed\\\":[0,-1],\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"color\\\":\\\"DB8727\\\",\\\"cMask\\\":[\\\"blueKO\\\"],\\\"cGroup\\\":[\\\"score\\\"]},{\\\"pos\\\":[-507,159],\\\"speed\\\":[0,-1],\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"color\\\":\\\"EBAB4D\\\",\\\"cMask\\\":[\\\"blueKO\\\"],\\\"cGroup\\\":[\\\"score\\\"]},{\\\"pos\\\":[-504,143],\\\"speed\\\":[0,-1],\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"color\\\":\\\"DBD52A\\\",\\\"cMask\\\":[\\\"blueKO\\\"],\\\"cGroup\\\":[\\\"score\\\"]},{\\\"pos\\\":[-492,143],\\\"speed\\\":[0,-1],\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"color\\\":\\\"C44221\\\",\\\"cMask\\\":[\\\"blueKO\\\"],\\\"cGroup\\\":[\\\"score\\\"]},{\\\"pos\\\":[-497,156],\\\"speed\\\":[0,-1],\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"color\\\":\\\"DB8727\\\",\\\"cMask\\\":[\\\"blueKO\\\"],\\\"cGroup\\\":[\\\"score\\\"]},{\\\"pos\\\":[-489,163],\\\"speed\\\":[0,-1],\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"color\\\":\\\"DBD142\\\",\\\"cMask\\\":[\\\"blueKO\\\"],\\\"cGroup\\\":[\\\"score\\\"]},{\\\"pos\\\":[557,146],\\\"speed\\\":[0,-1],\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"color\\\":\\\"DBD52A\\\",\\\"cMask\\\":[\\\"blueKO\\\"],\\\"cGroup\\\":[\\\"score\\\"]},{\\\"pos\\\":[548,133],\\\"speed\\\":[0,-1],\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"color\\\":\\\"DB8727\\\",\\\"cMask\\\":[\\\"blueKO\\\"],\\\"cGroup\\\":[\\\"score\\\"]},{\\\"pos\\\":[537,159],\\\"speed\\\":[0,-1],\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"color\\\":\\\"EBAB4D\\\",\\\"cMask\\\":[\\\"blueKO\\\"],\\\"cGroup\\\":[\\\"score\\\"]},{\\\"pos\\\":[540,143],\\\"speed\\\":[0,-1],\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"color\\\":\\\"DBD52A\\\",\\\"cMask\\\":[\\\"blueKO\\\"],\\\"cGroup\\\":[\\\"score\\\"]},{\\\"pos\\\":[552,143],\\\"speed\\\":[0,-1],\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"color\\\":\\\"C44221\\\",\\\"cMask\\\":[\\\"blueKO\\\"],\\\"cGroup\\\":[\\\"score\\\"]},{\\\"pos\\\":[547,156],\\\"speed\\\":[0,-1],\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"color\\\":\\\"DB8727\\\",\\\"cMask\\\":[\\\"blueKO\\\"],\\\"cGroup\\\":[\\\"score\\\"]},{\\\"pos\\\":[555,163],\\\"speed\\\":[0,-1],\\\"bCoef\\\":1,\\\"damping\\\":1,\\\"color\\\":\\\"DBD142\\\",\\\"cMask\\\":[\\\"blueKO\\\"],\\\"cGroup\\\":[\\\"score\\\"]},{\\\"pos\\\":[-499,139],\\\"radius\\\":100,\\\"invMass\\\":0,\\\"damping\\\":1,\\\"color\\\":\\\"0\\\",\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[548,139],\\\"radius\\\":100,\\\"invMass\\\":0,\\\"damping\\\":1,\\\"color\\\":\\\"0\\\",\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[2,164],\\\"radius\\\":0,\\\"bCoef\\\":-1e+89,\\\"invMass\\\":1e+137,\\\"damping\\\":1e+250,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[24,-244],\\\"speed\\\":[0,0.2],\\\"radius\\\":0.5,\\\"bCoef\\\":5,\\\"damping\\\":1,\\\"color\\\":\\\"transparent\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"pos\\\":[5,121],\\\"radius\\\":4,\\\"color\\\":\\\"FFD500\\\",\\\"cMask\\\":[\\\"wall\\\"]},{\\\"pos\\\":[25,131],\\\"radius\\\":3,\\\"color\\\":\\\"FFD500\\\",\\\"cMask\\\":[\\\"wall\\\"]},{\\\"pos\\\":[-15,131],\\\"radius\\\":3,\\\"color\\\":\\\"FFD500\\\",\\\"cMask\\\":[\\\"wall\\\"]},{\\\"pos\\\":[0,324],\\\"speed\\\":[3.3,0],\\\"radius\\\":14.99,\\\"bCoef\\\":1,\\\"invMass\\\":1e-30,\\\"damping\\\":1.0016,\\\"color\\\":\\\"7FDD2C\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"redKO\\\",\\\"blueKO\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[0,-250],\\\"speed\\\":[0,0.2],\\\"radius\\\":1,\\\"bCoef\\\":1,\\\"invMass\\\":1e-30,\\\"damping\\\":1,\\\"color\\\":\\\"transparent\\\",\\\"cMask\\\":[\\\"ball\\\"],\\\"cGroup\\\":[\\\"ball\\\"]}],\\\"playerPhysics\\\":{\\\"bCoef\\\":0.1,\\\"damping\\\":0.9995,\\\"acceleration\\\":0.025,\\\"kickingAcceleration\\\":0.025,\\\"kickingDamping\\\":0.9995,\\\"kickStrength\\\":0},\\\"ballPhysics\\\":\\\"disc0\\\",\\\"spawnDistance\\\":320,\\\"joints\\\":[{\\\"d0\\\":17,\\\"d1\\\":19,\\\"length\\\":501.6233646870927,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":18,\\\"d1\\\":19,\\\"length\\\":546.5720446565118,\\\"color\\\":\\\"transparent\\\"}]}\"";
var mapCollision = "\"{\\\"name\\\":\\\"Collision team racing 9 by MC  from HaxMaps\\\",\\\"width\\\":420,\\\"height\\\":4920,\\\"bg\\\":{\\\"type\\\":\\\"hockey\\\"},\\\"vertexes\\\":[{\\\"x\\\":-120,\\\"y\\\":255,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-150,\\\"y\\\":220,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-150,\\\"y\\\":-250,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":150,\\\"y\\\":-250,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":150,\\\"y\\\":220,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":120,\\\"y\\\":255,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-15,\\\"y\\\":-4650,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":15,\\\"y\\\":-4650,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-15,\\\"y\\\":-4840.77786255,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":45,\\\"y\\\":-4900.77786255,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":400,\\\"y\\\":-4900.77786255,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":400,\\\"y\\\":-4870.77786255,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":45,\\\"y\\\":-4870.77786255,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":15,\\\"y\\\":-4840.77786255,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-148,\\\"y\\\":100,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-1,\\\"y\\\":100,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":1,\\\"y\\\":100,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":148,\\\"y\\\":100,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-15,\\\"y\\\":-4702.77786255,\\\"bCoef\\\":-3,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":15,\\\"y\\\":-4702.77786255,\\\"bCoef\\\":-3,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-148,\\\"y\\\":97,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-1,\\\"y\\\":97,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-148,\\\"y\\\":103,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-1,\\\"y\\\":103,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":1,\\\"y\\\":97,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":148,\\\"y\\\":97,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":1,\\\"y\\\":103,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":148,\\\"y\\\":103,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"]},{\\\"x\\\":-15,\\\"y\\\":-4690.77786255,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-15,\\\"y\\\":-4740.77786255,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":15,\\\"y\\\":-4690.77786255,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":15,\\\"y\\\":-4740.77786255,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":150,\\\"y\\\":-4740.77786255,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":180,\\\"y\\\":-4740.77786255,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":180,\\\"y\\\":-4696.22218323,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":150,\\\"y\\\":-4696.22218323,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"x\\\":-15,\\\"y\\\":-4710.77786255,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":15,\\\"y\\\":-4710.77786255,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-26,\\\"y\\\":-4600.77786255,\\\"bCoef\\\":-3,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":26,\\\"y\\\":-4600.77786255,\\\"bCoef\\\":-3,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-23,\\\"y\\\":-4608.77786255,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":23,\\\"y\\\":-4608.77786255,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":60,\\\"y\\\":-210,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":60,\\\"y\\\":-170,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-130,\\\"y\\\":-1850.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-20,\\\"y\\\":-1750.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":20,\\\"y\\\":-1750.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":130,\\\"y\\\":-1850.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":130,\\\"y\\\":-1890.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":20,\\\"y\\\":-1990.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-20,\\\"y\\\":-1990.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-130,\\\"y\\\":-1890.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-180,\\\"y\\\":-1784.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-70,\\\"y\\\":-1684.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-45,\\\"y\\\":-1630.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-45,\\\"y\\\":-1580,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":45,\\\"y\\\":-1630.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":45,\\\"y\\\":-1580,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":180,\\\"y\\\":-1784.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":70,\\\"y\\\":-1684.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-70,\\\"y\\\":-2048.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-180,\\\"y\\\":-1948.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":70,\\\"y\\\":-2048.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":180,\\\"y\\\":-1948.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-130,\\\"y\\\":-2261.44458008,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-20,\\\"y\\\":-2161.44458008,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":20,\\\"y\\\":-2161.44458008,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":130,\\\"y\\\":-2261.44458008,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":130,\\\"y\\\":-2301.44458008,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":20,\\\"y\\\":-2401.44458008,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-20,\\\"y\\\":-2401.44458008,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-130,\\\"y\\\":-2301.44458008,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-180,\\\"y\\\":-2195.44458008,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-70,\\\"y\\\":-2095.44458008,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":180,\\\"y\\\":-2195.44458008,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":70,\\\"y\\\":-2095.44458008,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-70,\\\"y\\\":-2459.44458008,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-180,\\\"y\\\":-2359.44458008,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":70,\\\"y\\\":-2459.44458008,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":180,\\\"y\\\":-2359.44458008,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-130,\\\"y\\\":-2690.00024414,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-20,\\\"y\\\":-2590.00024414,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":20,\\\"y\\\":-2590.00024414,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":130,\\\"y\\\":-2690.00024414,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":130,\\\"y\\\":-2730.00024414,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":20,\\\"y\\\":-2830.00024414,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-20,\\\"y\\\":-2830.00024414,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-130,\\\"y\\\":-2730.00024414,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-180,\\\"y\\\":-2624.00024414,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-70,\\\"y\\\":-2524.00024414,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":180,\\\"y\\\":-2624.00024414,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":70,\\\"y\\\":-2524.00024414,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-70,\\\"y\\\":-2888.00024414,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-180,\\\"y\\\":-2788.00024414,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":70,\\\"y\\\":-2888.00024414,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":180,\\\"y\\\":-2788.00024414,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-130,\\\"y\\\":-3101.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-20,\\\"y\\\":-3001.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":20,\\\"y\\\":-3001.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":130,\\\"y\\\":-3101.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":130,\\\"y\\\":-3141.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":20,\\\"y\\\":-3241.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-20,\\\"y\\\":-3241.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-130,\\\"y\\\":-3141.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-180,\\\"y\\\":-3035.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-70,\\\"y\\\":-2935.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":180,\\\"y\\\":-3035.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":70,\\\"y\\\":-2935.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-105,\\\"y\\\":-3268.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-180,\\\"y\\\":-3199.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":105,\\\"y\\\":-3268.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":180,\\\"y\\\":-3199.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-75,\\\"y\\\":-3340,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":75,\\\"y\\\":-3340,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":78,\\\"y\\\":-3310.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":-78,\\\"y\\\":-3310.22241211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-200,\\\"y\\\":-1920.22241211,\\\"bCoef\\\":3.7,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-200,\\\"y\\\":-1810.22241211,\\\"bCoef\\\":3.7,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":200,\\\"y\\\":-1920.22241211,\\\"bCoef\\\":3.7,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":200,\\\"y\\\":-1810.22241211,\\\"bCoef\\\":3.7,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-200,\\\"y\\\":-2760.22241211,\\\"bCoef\\\":3.7,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-200,\\\"y\\\":-2650.22241211,\\\"bCoef\\\":3.7,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":200,\\\"y\\\":-2760.22241211,\\\"bCoef\\\":3.7,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":200,\\\"y\\\":-2650.22241211,\\\"bCoef\\\":3.7,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-60,\\\"y\\\":-210,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-60,\\\"y\\\":-170,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-130,\\\"y\\\":-270,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-100,\\\"y\\\":-270,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-100,\\\"y\\\":-300,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-130,\\\"y\\\":-300,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-150,\\\"y\\\":-320,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-150,\\\"y\\\":-390,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":130,\\\"y\\\":-270,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":100,\\\"y\\\":-270,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":100,\\\"y\\\":-300,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":130,\\\"y\\\":-300,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":150,\\\"y\\\":-320,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":150,\\\"y\\\":-390,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":0,\\\"y\\\":-305,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":0,\\\"y\\\":-265,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":60,\\\"y\\\":-360,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":60,\\\"y\\\":-400,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-60,\\\"y\\\":-360,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-60,\\\"y\\\":-400,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-75,\\\"y\\\":-560,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-75,\\\"y\\\":-1270,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":75,\\\"y\\\":-560,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":75,\\\"y\\\":-1270,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":2,\\\"y\\\":-707.666381836,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":2,\\\"y\\\":-625,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":22,\\\"y\\\":-600,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":73,\\\"y\\\":-600,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":22,\\\"y\\\":-727.666381836,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":73,\\\"y\\\":-727.666381836,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":-2,\\\"y\\\":-707.666381836,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-2,\\\"y\\\":-625,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-22,\\\"y\\\":-600,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-73,\\\"y\\\":-600,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-22,\\\"y\\\":-727.666381836,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-73,\\\"y\\\":-727.666381836,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":2,\\\"y\\\":-955,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":2,\\\"y\\\":-875,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":22,\\\"y\\\":-855,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":73,\\\"y\\\":-855,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":22,\\\"y\\\":-975,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":73,\\\"y\\\":-975,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-2,\\\"y\\\":-955,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":-2,\\\"y\\\":-875,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":-22,\\\"y\\\":-855,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":-73,\\\"y\\\":-855,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":-22,\\\"y\\\":-975,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":-73,\\\"y\\\":-975,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":2,\\\"y\\\":-1225,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":2,\\\"y\\\":-1125,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":22,\\\"y\\\":-1105,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":73,\\\"y\\\":-1105,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":22,\\\"y\\\":-1245,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":73,\\\"y\\\":-1245,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":-2,\\\"y\\\":-1225,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-2,\\\"y\\\":-1125,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-22,\\\"y\\\":-1105,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-73,\\\"y\\\":-1105,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-22,\\\"y\\\":-1245,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-73,\\\"y\\\":-1245,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-132,\\\"y\\\":-450,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-87,\\\"y\\\":-515,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":132,\\\"y\\\":-450,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":87,\\\"y\\\":-515,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":0,\\\"y\\\":-465,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":0,\\\"y\\\":-505,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-95,\\\"y\\\":-1290,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-230,\\\"y\\\":-1290,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-225,\\\"y\\\":-1390,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":225,\\\"y\\\":-1390,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":225,\\\"y\\\":-1430,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-225,\\\"y\\\":-1430,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":95,\\\"y\\\":-1290,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":230,\\\"y\\\":-1290,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-95,\\\"y\\\":-1530,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-230,\\\"y\\\":-1530,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":95,\\\"y\\\":-1530,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":230,\\\"y\\\":-1530,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":95,\\\"y\\\":-1388,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":95,\\\"y\\\":-1432,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-95,\\\"y\\\":-1388,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":-95,\\\"y\\\":-1432,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":-95,\\\"y\\\":-4185,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-270,\\\"y\\\":-4300,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-200,\\\"y\\\":-4385,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":200,\\\"y\\\":-4385,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":180,\\\"y\\\":-4405,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-180,\\\"y\\\":-4405,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":95,\\\"y\\\":-4185,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":270,\\\"y\\\":-4300,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-137,\\\"y\\\":-4487,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":137,\\\"y\\\":-4487,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-75,\\\"y\\\":-4150,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":75,\\\"y\\\":-4150,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":0,\\\"y\\\":-3410,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":0,\\\"y\\\":-3370,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":0,\\\"y\\\":-3580,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":0,\\\"y\\\":-3620,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-75,\\\"y\\\":-3495,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":0,\\\"y\\\":-3495,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":75,\\\"y\\\":-3495,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":-75,\\\"y\\\":-3705,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":0,\\\"y\\\":-3705,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":75,\\\"y\\\":-3705,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":0,\\\"y\\\":-3790,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":0,\\\"y\\\":-3830,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-75,\\\"y\\\":-3905,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"]},{\\\"x\\\":0,\\\"y\\\":-3905,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":75,\\\"y\\\":-3905,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"]},{\\\"x\\\":0,\\\"y\\\":-4030,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":0,\\\"y\\\":-3990,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-40,\\\"y\\\":-4285,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":40,\\\"y\\\":-4285,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":40,\\\"y\\\":-4315,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-40,\\\"y\\\":-4315,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-40,\\\"y\\\":-4580,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":40,\\\"y\\\":-4580,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-70,\\\"y\\\":-4500,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-70,\\\"y\\\":-4475,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-97,\\\"y\\\":-4458,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":70,\\\"y\\\":-4500,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":70,\\\"y\\\":-4475,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":97,\\\"y\\\":-4458,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":-67,\\\"y\\\":-4335,\\\"bCoef\\\":7,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"x\\\":67,\\\"y\\\":-4335,\\\"bCoef\\\":7,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]}],\\\"segments\\\":[{\\\"v0\\\":0,\\\"v1\\\":1,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":1,\\\"v1\\\":2,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":3,\\\"v1\\\":4,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":4,\\\"v1\\\":5,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":6,\\\"v1\\\":8,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":8,\\\"v1\\\":9,\\\"bCoef\\\":0,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":9,\\\"v1\\\":10,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":11,\\\"v1\\\":12,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":13,\\\"v1\\\":12,\\\"bCoef\\\":0,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":13,\\\"v1\\\":7,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":14,\\\"v1\\\":15,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":16,\\\"v1\\\":17,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":18,\\\"v1\\\":19,\\\"bCoef\\\":-3,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":20,\\\"v1\\\":21,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":22,\\\"v1\\\":23,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":24,\\\"v1\\\":25,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":26,\\\"v1\\\":27,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"wall\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":28,\\\"v1\\\":29,\\\"bCoef\\\":0.1,\\\"vis\\\":false,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":30,\\\"v1\\\":31,\\\"bCoef\\\":0.1,\\\"vis\\\":false,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":33,\\\"v1\\\":34,\\\"bCoef\\\":0,\\\"vis\\\":false,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":32,\\\"v1\\\":35,\\\"bCoef\\\":0,\\\"vis\\\":false,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":34,\\\"v1\\\":35,\\\"bCoef\\\":0,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":31,\\\"v1\\\":32,\\\"bCoef\\\":0.1,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":29,\\\"v1\\\":33,\\\"bCoef\\\":0.1,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"vis\\\":false,\\\"cMask\\\":[\\\"ball\\\"]},{\\\"v0\\\":36,\\\"v1\\\":37,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":10,\\\"v1\\\":11,\\\"bCoef\\\":0.1,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":38,\\\"v1\\\":39,\\\"bCoef\\\":-3,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":40,\\\"v1\\\":41,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":42,\\\"v1\\\":43,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":43,\\\"v1\\\":42,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":44,\\\"v1\\\":45,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":46,\\\"v1\\\":45,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":46,\\\"v1\\\":47,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":48,\\\"v1\\\":47,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":48,\\\"v1\\\":49,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":50,\\\"v1\\\":49,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":50,\\\"v1\\\":51,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":44,\\\"v1\\\":51,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":52,\\\"v1\\\":53,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":54,\\\"v1\\\":55,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":53,\\\"v1\\\":54,\\\"bCoef\\\":0.25,\\\"curve\\\":50,\\\"curveF\\\":2.1445069205095586,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":56,\\\"v1\\\":57,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":58,\\\"v1\\\":59,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":56,\\\"v1\\\":59,\\\"bCoef\\\":0.25,\\\"curve\\\":50,\\\"curveF\\\":2.1445069205095586,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":60,\\\"v1\\\":61,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":52,\\\"v1\\\":61,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":62,\\\"v1\\\":63,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":63,\\\"v1\\\":58,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":64,\\\"v1\\\":65,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":66,\\\"v1\\\":65,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":66,\\\"v1\\\":67,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":68,\\\"v1\\\":67,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":68,\\\"v1\\\":69,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":70,\\\"v1\\\":69,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":70,\\\"v1\\\":71,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":64,\\\"v1\\\":71,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":72,\\\"v1\\\":73,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":74,\\\"v1\\\":75,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":76,\\\"v1\\\":77,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":72,\\\"v1\\\":77,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":78,\\\"v1\\\":79,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":79,\\\"v1\\\":74,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":62,\\\"v1\\\":75,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":73,\\\"v1\\\":60,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":80,\\\"v1\\\":81,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":82,\\\"v1\\\":81,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":82,\\\"v1\\\":83,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":84,\\\"v1\\\":83,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":84,\\\"v1\\\":85,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":86,\\\"v1\\\":85,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":86,\\\"v1\\\":87,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":80,\\\"v1\\\":87,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":88,\\\"v1\\\":89,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":90,\\\"v1\\\":91,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":92,\\\"v1\\\":93,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":88,\\\"v1\\\":93,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":94,\\\"v1\\\":95,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":95,\\\"v1\\\":90,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":96,\\\"v1\\\":97,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":98,\\\"v1\\\":97,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":98,\\\"v1\\\":99,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":100,\\\"v1\\\":99,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":100,\\\"v1\\\":101,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":102,\\\"v1\\\":101,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":102,\\\"v1\\\":103,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":96,\\\"v1\\\":103,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":104,\\\"v1\\\":105,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":106,\\\"v1\\\":107,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":108,\\\"v1\\\":109,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":104,\\\"v1\\\":109,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":110,\\\"v1\\\":111,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":111,\\\"v1\\\":106,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":94,\\\"v1\\\":107,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":105,\\\"v1\\\":92,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":89,\\\"v1\\\":76,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":78,\\\"v1\\\":91,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":112,\\\"v1\\\":108,\\\"bCoef\\\":0.25,\\\"curve\\\":45.00000000000001,\\\"curveF\\\":2.414213562373095,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":110,\\\"v1\\\":113,\\\"bCoef\\\":0.25,\\\"curve\\\":45.00000000000001,\\\"curveF\\\":2.414213562373095,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":53,\\\"v1\\\":45,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":60,\\\"v1\\\":50,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":66,\\\"v1\\\":75,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":69,\\\"v1\\\":78,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":89,\\\"v1\\\":81,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":92,\\\"v1\\\":86,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":98,\\\"v1\\\":107,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":101,\\\"v1\\\":114,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":46,\\\"v1\\\":59,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":49,\\\"v1\\\":62,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":73,\\\"v1\\\":65,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":76,\\\"v1\\\":70,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":82,\\\"v1\\\":91,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":85,\\\"v1\\\":94,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":105,\\\"v1\\\":97,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":102,\\\"v1\\\":115,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":116,\\\"v1\\\":117,\\\"bCoef\\\":3.7,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":118,\\\"v1\\\":119,\\\"bCoef\\\":3.7,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":120,\\\"v1\\\":121,\\\"bCoef\\\":3.7,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":122,\\\"v1\\\":123,\\\"bCoef\\\":3.7,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":0,\\\"v1\\\":5,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":124,\\\"v1\\\":125,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":125,\\\"v1\\\":124,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":2,\\\"v1\\\":126,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":126,\\\"v1\\\":127,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":128,\\\"v1\\\":127,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":128,\\\"v1\\\":129,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":129,\\\"v1\\\":130,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":130,\\\"v1\\\":131,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":132,\\\"v1\\\":3,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":132,\\\"v1\\\":133,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":133,\\\"v1\\\":134,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":134,\\\"v1\\\":135,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":136,\\\"v1\\\":135,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":136,\\\"v1\\\":137,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":138,\\\"v1\\\":139,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":139,\\\"v1\\\":138,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":140,\\\"v1\\\":141,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":141,\\\"v1\\\":140,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":142,\\\"v1\\\":143,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":143,\\\"v1\\\":142,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":144,\\\"v1\\\":145,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":146,\\\"v1\\\":147,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":148,\\\"v1\\\":149,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":150,\\\"v1\\\":149,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":150,\\\"v1\\\":151,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":148,\\\"v1\\\":152,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":152,\\\"v1\\\":153,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":154,\\\"v1\\\":155,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":155,\\\"v1\\\":156,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":156,\\\"v1\\\":157,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":158,\\\"v1\\\":154,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":158,\\\"v1\\\":159,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":160,\\\"v1\\\":161,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":162,\\\"v1\\\":161,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":162,\\\"v1\\\":163,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":160,\\\"v1\\\":164,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":164,\\\"v1\\\":165,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":166,\\\"v1\\\":167,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":167,\\\"v1\\\":168,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":168,\\\"v1\\\":169,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":170,\\\"v1\\\":166,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":170,\\\"v1\\\":171,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":172,\\\"v1\\\":173,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":174,\\\"v1\\\":173,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":174,\\\"v1\\\":175,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":172,\\\"v1\\\":176,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":176,\\\"v1\\\":177,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":178,\\\"v1\\\":179,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":179,\\\"v1\\\":180,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":180,\\\"v1\\\":181,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":182,\\\"v1\\\":178,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":182,\\\"v1\\\":183,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":184,\\\"v1\\\":185,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":131,\\\"v1\\\":184,\\\"bCoef\\\":0.25,\\\"curve\\\":40,\\\"curveF\\\":2.7474774194546225,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":144,\\\"v1\\\":185,\\\"bCoef\\\":0.25,\\\"curve\\\":35,\\\"curveF\\\":3.1715948023632126,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":186,\\\"v1\\\":187,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":187,\\\"v1\\\":146,\\\"bCoef\\\":0.25,\\\"curve\\\":35,\\\"curveF\\\":3.1715948023632126,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":186,\\\"v1\\\":137,\\\"bCoef\\\":0.25,\\\"curve\\\":40,\\\"curveF\\\":2.7474774194546225,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":188,\\\"v1\\\":189,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":189,\\\"v1\\\":188,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":190,\\\"v1\\\":191,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":192,\\\"v1\\\":193,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":194,\\\"v1\\\":193,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":194,\\\"v1\\\":195,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":192,\\\"v1\\\":195,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":196,\\\"v1\\\":197,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":190,\\\"v1\\\":145,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":147,\\\"v1\\\":196,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":198,\\\"v1\\\":199,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":200,\\\"v1\\\":201,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":191,\\\"v1\\\":199,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":201,\\\"v1\\\":197,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":55,\\\"v1\\\":198,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":200,\\\"v1\\\":57,\\\"bCoef\\\":0.25,\\\"curve\\\":89.99999999999999,\\\"curveF\\\":1.0000000000000002,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":196,\\\"v1\\\":202,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":200,\\\"v1\\\":203,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":190,\\\"v1\\\":204,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":198,\\\"v1\\\":205,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":206,\\\"v1\\\":207,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":210,\\\"v1\\\":209,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":208,\\\"v1\\\":211,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":212,\\\"v1\\\":213,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":207,\\\"v1\\\":214,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":215,\\\"v1\\\":213,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":112,\\\"v1\\\":216,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":113,\\\"v1\\\":217,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":206,\\\"v1\\\":216,\\\"bCoef\\\":0.25,\\\"curve\\\":54.99999999999999,\\\"curveF\\\":1.920982126971166,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":217,\\\"v1\\\":212,\\\"bCoef\\\":0.25,\\\"curve\\\":54.99999999999999,\\\"curveF\\\":1.920982126971166,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":218,\\\"v1\\\":219,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":219,\\\"v1\\\":218,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":220,\\\"v1\\\":221,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":221,\\\"v1\\\":220,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":222,\\\"v1\\\":223,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":223,\\\"v1\\\":224,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":225,\\\"v1\\\":226,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":226,\\\"v1\\\":227,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":228,\\\"v1\\\":229,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":229,\\\"v1\\\":228,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":230,\\\"v1\\\":231,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":231,\\\"v1\\\":232,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":233,\\\"v1\\\":234,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":234,\\\"v1\\\":233,\\\"bCoef\\\":0.25,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":208,\\\"v1\\\":235,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":236,\\\"v1\\\":235,\\\"bCoef\\\":0.25,\\\"curve\\\":54.99999999999999,\\\"curveF\\\":1.920982126971166,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":236,\\\"v1\\\":209,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":210,\\\"v1\\\":237,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":237,\\\"v1\\\":238,\\\"bCoef\\\":0.25,\\\"curve\\\":54.99999999999999,\\\"curveF\\\":1.920982126971166,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":238,\\\"v1\\\":211,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":6,\\\"v1\\\":239,\\\"bCoef\\\":0.25,\\\"curve\\\":38,\\\"curveF\\\":2.9042108776758226,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":240,\\\"v1\\\":7,\\\"bCoef\\\":0.25,\\\"curve\\\":38,\\\"curveF\\\":2.9042108776758226,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":241,\\\"v1\\\":242,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":242,\\\"v1\\\":243,\\\"bCoef\\\":0.25,\\\"curve\\\":119.99999999999999,\\\"curveF\\\":0.577350269189626,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":243,\\\"v1\\\":214,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":241,\\\"v1\\\":239,\\\"bCoef\\\":0.25,\\\"curve\\\":37,\\\"curveF\\\":2.988684962742893,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":244,\\\"v1\\\":245,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":246,\\\"v1\\\":245,\\\"bCoef\\\":0.25,\\\"curve\\\":119.99999999999999,\\\"curveF\\\":0.577350269189626,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":246,\\\"v1\\\":215,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":240,\\\"v1\\\":244,\\\"bCoef\\\":0.25,\\\"curve\\\":37,\\\"curveF\\\":2.988684962742893,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"303030\\\"},{\\\"v0\\\":247,\\\"v1\\\":248,\\\"bCoef\\\":7,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"color\\\":\\\"FFFFFF\\\"},{\\\"v0\\\":206,\\\"v1\\\":235,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":243,\\\"v1\\\":247,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"red\\\"],\\\"color\\\":\\\"FF\\\"},{\\\"v0\\\":236,\\\"v1\\\":212,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"},{\\\"v0\\\":246,\\\"v1\\\":248,\\\"bCoef\\\":0.25,\\\"cMask\\\":[\\\"blue\\\"],\\\"color\\\":\\\"FF0000\\\"}],\\\"planes\\\":[{\\\"normal\\\":[0,-1],\\\"dist\\\":-255,\\\"bCoef\\\":0.1},{\\\"normal\\\":[1,0],\\\"dist\\\":-420,\\\"bCoef\\\":0.1},{\\\"normal\\\":[-1,0],\\\"dist\\\":-420,\\\"bCoef\\\":0.1},{\\\"normal\\\":[0,1],\\\"dist\\\":100,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-150,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-1,0],\\\"dist\\\":-1,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-1,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[-1,0],\\\"dist\\\":-150,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"blue\\\"],\\\"cGroup\\\":[\\\"redKO\\\",\\\"blueKO\\\"]},{\\\"normal\\\":[0,1],\\\"dist\\\":-4901,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[0.5370903057318278,0.8435247497785063],\\\"dist\\\":-4123.04888559,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[0.7595879524674986,0.6504045990506474],\\\"dist\\\":-3177.90693426,\\\"bCoef\\\":0.1,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]}],\\\"goals\\\":[],\\\"discs\\\":[{\\\"radius\\\":15,\\\"bCoef\\\":0.1,\\\"damping\\\":1,\\\"color\\\":\\\"FF0000\\\",\\\"cMask\\\":[\\\"ball\\\",\\\"wall\\\"],\\\"cGroup\\\":[\\\"ball\\\",\\\"kick\\\",\\\"score\\\"]},{\\\"pos\\\":[0,2350],\\\"speed\\\":[0,-4.05],\\\"bCoef\\\":0.1,\\\"invMass\\\":1e-12,\\\"damping\\\":1,\\\"color\\\":\\\"FF\\\",\\\"cMask\\\":[\\\"ball\\\"]},{\\\"pos\\\":[-85,-4645.77786255],\\\"radius\\\":60,\\\"bCoef\\\":0.25,\\\"invMass\\\":0,\\\"damping\\\":0,\\\"color\\\":\\\"transparent\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"pos\\\":[85,-4645.77786255],\\\"radius\\\":60,\\\"bCoef\\\":0.25,\\\"invMass\\\":0,\\\"damping\\\":0,\\\"color\\\":\\\"transparent\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"pos\\\":[-85,-4685.77786255],\\\"radius\\\":60,\\\"bCoef\\\":0.25,\\\"invMass\\\":0,\\\"damping\\\":0,\\\"color\\\":\\\"transparent\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"pos\\\":[85,-4685.77786255],\\\"radius\\\":60,\\\"bCoef\\\":0.25,\\\"invMass\\\":0,\\\"damping\\\":0,\\\"color\\\":\\\"transparent\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"pos\\\":[-85,-4725.77786255],\\\"radius\\\":60,\\\"bCoef\\\":0.25,\\\"invMass\\\":0,\\\"damping\\\":0,\\\"color\\\":\\\"transparent\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"pos\\\":[85,-4725.77786255],\\\"radius\\\":60,\\\"bCoef\\\":0.25,\\\"invMass\\\":0,\\\"damping\\\":0,\\\"color\\\":\\\"transparent\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"ball\\\"]}],\\\"playerPhysics\\\":{\\\"damping\\\":0.985,\\\"acceleration\\\":0.09,\\\"kickingDamping\\\":0.984,\\\"kickStrength\\\":0},\\\"ballPhysics\\\":\\\"disc0\\\",\\\"spawnDistance\\\":40}\"";
var mapSpaceMelee = "\"{\\\"name\\\":\\\"Space Melee by Namajunas [ʜᴀxᴍᴏᴅs.ᴄᴏᴍ]\\\",\\\"width\\\":400,\\\"height\\\":400,\\\"bg\\\":{\\\"width\\\":300,\\\"height\\\":300,\\\"kickOffRadius\\\":75,\\\"cornerRadius\\\":300,\\\"color\\\":\\\"90909\\\"},\\\"vertexes\\\":[{\\\"x\\\":-353.32921610431345,\\\"y\\\":0,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":351.8196375602522,\\\"y\\\":0,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-339.50276799324354,\\\"y\\\":0,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":337.9931894491822,\\\"y\\\":0,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-325.6763198821736,\\\"y\\\":0,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":324.1667413381123,\\\"y\\\":0,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":317.25351728257726,\\\"y\\\":0,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":331.0799653936473,\\\"y\\\":0,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":344.9064135047172,\\\"y\\\":0,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-318.7630958266386,\\\"y\\\":0,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-332.5895439377086,\\\"y\\\":0,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-346.4159920487785,\\\"y\\\":0,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":310.34029322704237,\\\"y\\\":0,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-311.84987177110366,\\\"y\\\":0,\\\"bCoef\\\":-100000,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-377,\\\"y\\\":-377,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"],\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"]},{\\\"x\\\":377,\\\"y\\\":-377,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"],\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"]},{\\\"x\\\":377,\\\"y\\\":377,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"],\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"]},{\\\"x\\\":-377,\\\"y\\\":377,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"],\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"]},{\\\"x\\\":-6.816577511584228,\\\"y\\\":17.721691909880462,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-6.816577511584228,\\\"y\\\":-21.242069272147845,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":15.57652796637808,\\\"y\\\":14.419678250386525,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":15.57652796637808,\\\"y\\\":-15.298444685058847,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":8.112159473723977,\\\"y\\\":-15.298444685058847,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":8.112159473723977,\\\"y\\\":-3.4111955108806313,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-4.017439326839053,\\\"y\\\":3.1928318081071936,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":8.112159473723977,\\\"y\\\":23.665316496969574,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":8.112159473723977,\\\"y\\\":9.136456395196248,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-14.28094600423853,\\\"y\\\":17.721691909880462,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-14.28094600423853,\\\"y\\\":-11.996431025564902,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":-9.61571569632963,\\\"y\\\":-4.732000974678286,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":0.6477909810698748,\\\"y\\\":-31.808512982528356,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"x\\\":0.6477909810698748,\\\"y\\\":34.23176020735008,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]}],\\\"segments\\\":[{\\\"v0\\\":0,\\\"v1\\\":1,\\\"bCoef\\\":-100000,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":1,\\\"v1\\\":0,\\\"bCoef\\\":-100000,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":2,\\\"v1\\\":3,\\\"bCoef\\\":-100000,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":3,\\\"v1\\\":2,\\\"bCoef\\\":-100000,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":4,\\\"v1\\\":5,\\\"bCoef\\\":-100000,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":5,\\\"v1\\\":4,\\\"bCoef\\\":-100000,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":6,\\\"v1\\\":9,\\\"bCoef\\\":-100000,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":9,\\\"v1\\\":6,\\\"bCoef\\\":-100000,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":7,\\\"v1\\\":10,\\\"bCoef\\\":-100000,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":10,\\\"v1\\\":7,\\\"bCoef\\\":-100000,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":8,\\\"v1\\\":11,\\\"bCoef\\\":-100000,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":11,\\\"v1\\\":8,\\\"bCoef\\\":-100000,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":12,\\\"v1\\\":13,\\\"bCoef\\\":-100000,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":13,\\\"v1\\\":12,\\\"bCoef\\\":-100000,\\\"curve\\\":180,\\\"curveF\\\":6.123233995736766e-17,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"all\\\"],\\\"color\\\":\\\"333333\\\"},{\\\"v0\\\":14,\\\"v1\\\":15,\\\"bias\\\":10,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"],\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"],\\\"color\\\":\\\"80808\\\"},{\\\"v0\\\":15,\\\"v1\\\":16,\\\"bias\\\":10,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"],\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"],\\\"color\\\":\\\"80808\\\"},{\\\"v0\\\":16,\\\"v1\\\":17,\\\"bias\\\":10,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"],\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"],\\\"color\\\":\\\"80808\\\"},{\\\"v0\\\":14,\\\"v1\\\":17,\\\"bias\\\":-10,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"],\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"],\\\"color\\\":\\\"80808\\\"},{\\\"v0\\\":18,\\\"v1\\\":19,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"v0\\\":19,\\\"v1\\\":20,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"v0\\\":20,\\\"v1\\\":21,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"v0\\\":21,\\\"v1\\\":22,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"v0\\\":22,\\\"v1\\\":23,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"v0\\\":24,\\\"v1\\\":25,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"v0\\\":25,\\\"v1\\\":26,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"v0\\\":18,\\\"v1\\\":27,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"v0\\\":27,\\\"v1\\\":28,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"v0\\\":28,\\\"v1\\\":29,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"v0\\\":30,\\\"v1\\\":31,\\\"curve\\\":-179.9999999999998,\\\"curveF\\\":-1.9371691043679142e-15,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]},{\\\"v0\\\":31,\\\"v1\\\":30,\\\"curve\\\":-179.9999999999998,\\\"curveF\\\":-1.9371691043679142e-15,\\\"cMask\\\":[\\\"wall\\\"],\\\"cGroup\\\":[\\\"all\\\"]}],\\\"planes\\\":[{\\\"normal\\\":[0,-1],\\\"dist\\\":-437,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[1,0],\\\"dist\\\":-426,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[-1,0],\\\"dist\\\":-416,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[0,1],\\\"dist\\\":-433,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"]},{\\\"normal\\\":[0,-1],\\\"dist\\\":-596,\\\"bCoef\\\":0,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]}],\\\"goals\\\":[],\\\"discs\\\":[{\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"invMass\\\":1e-15,\\\"damping\\\":0,\\\"color\\\":\\\"90909\\\",\\\"cMask\\\":[\\\"c1\\\"],\\\"cGroup\\\":[\\\"kick\\\",\\\"score\\\",\\\"c0\\\"]},{\\\"radius\\\":0,\\\"bCoef\\\":1,\\\"invMass\\\":0,\\\"damping\\\":0,\\\"color\\\":\\\"851D08\\\",\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[0,272],\\\"speed\\\":[0.1,0],\\\"radius\\\":27,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"color\\\":\\\"A1988C\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"c3\\\"],\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\",\\\"c1\\\"]},{\\\"pos\\\":[0,-272],\\\"speed\\\":[-0.1,0],\\\"radius\\\":27,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"color\\\":\\\"F0BC13\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"c1\\\"],\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\",\\\"c1\\\"]},{\\\"pos\\\":[-264,0],\\\"speed\\\":[0,0.1],\\\"radius\\\":27,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"color\\\":\\\"A70FF\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"],\\\"cGroup\\\":[\\\"red\\\",\\\"blue\\\",\\\"c2\\\"]},{\\\"pos\\\":[-262,-7],\\\"speed\\\":[0,0.1],\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"color\\\":\\\"17C407\\\",\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-249,8],\\\"speed\\\":[0,0.1],\\\"radius\\\":4,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"color\\\":\\\"17C407\\\",\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[280,0],\\\"speed\\\":[0,-0.1],\\\"radius\\\":27,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"color\\\":\\\"FCC783\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[280,0],\\\"speed\\\":[0,-0.1],\\\"radius\\\":19,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"color\\\":\\\"40812\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[280,0],\\\"speed\\\":[0,-0.1],\\\"radius\\\":15,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"color\\\":\\\"F0B553\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[280,0],\\\"speed\\\":[0,-0.1],\\\"radius\\\":23,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"color\\\":\\\"transparent\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\"],\\\"cGroup\\\":[\\\"wall\\\"]},{\\\"pos\\\":[0,-50],\\\"speed\\\":[0,1],\\\"bCoef\\\":15,\\\"invMass\\\":1e+22,\\\"damping\\\":1,\\\"color\\\":\\\"transparent\\\",\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c1\\\"]},{\\\"pos\\\":[-338,-345],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-342,-258],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-244,-346],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-270,-279],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[263,-354],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[259,-267],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[357,-355],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[331,-288],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[265,256],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[261,343],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[359,255],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[333,322],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-351,276],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-357,361],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-259,273],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-285,340],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-391,131],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[370,93],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[380,55],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[354,122],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[347,-220],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[321,-153],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-356,-185],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-382,-118],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-180,-336],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-108,-357],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[130,-343],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[204,-323],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-200,382],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-128,361],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-33,391],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[39,370],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[117,376],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[189,355],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[462,-346],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[458,-259],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[556,-347],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[530,-280],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[464,264],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[460,351],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[558,263],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[532,330],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[495,33],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[505,-5],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[479,62],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[546,-212],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[520,-145],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[329,-335],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[403,-315],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-1,390],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[71,369],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[166,399],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[238,378],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[316,384],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[388,363],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-666,-298],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-732,246],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-736,333],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-638,245],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-664,312],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-627,83],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-617,45],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-643,112],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-650,-230],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-676,-163],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-565,-114],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-535,-356],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-539,-269],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-441,-357],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-467,-290],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-533,254],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-537,341],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-439,253],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-465,320],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-428,91],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-418,53],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-444,120],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-451,-222],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-477,-155],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-668,-345],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-594,-325],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-588,-70],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-759,368],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[569,4],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[585,72],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[559,139],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[670,188],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[696,33],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[567,-43],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[641,-23],\\\"radius\\\":2.5,\\\"bCoef\\\":1,\\\"invMass\\\":0.00001,\\\"damping\\\":1,\\\"cMask\\\":[\\\"c0\\\"],\\\"cGroup\\\":[\\\"c0\\\"]},{\\\"pos\\\":[-2000,0],\\\"speed\\\":[0.3,0],\\\"radius\\\":400,\\\"bCoef\\\":-10000,\\\"invMass\\\":1e-73,\\\"damping\\\":1,\\\"color\\\":\\\"111111\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"],\\\"cGroup\\\":[\\\"ball\\\"]},{\\\"pos\\\":[2000,0],\\\"speed\\\":[-0.3,0],\\\"radius\\\":400,\\\"bCoef\\\":-10000,\\\"invMass\\\":1e-73,\\\"damping\\\":1,\\\"color\\\":\\\"111111\\\",\\\"cMask\\\":[\\\"red\\\",\\\"blue\\\",\\\"ball\\\"],\\\"cGroup\\\":[\\\"ball\\\"]}],\\\"playerPhysics\\\":{\\\"bCoef\\\":1.6,\\\"invMass\\\":1e+307,\\\"damping\\\":0.991,\\\"acceleration\\\":0.03,\\\"kickingAcceleration\\\":0.04,\\\"kickingDamping\\\":0.98,\\\"kickStrength\\\":0},\\\"ballPhysics\\\":\\\"disc0\\\",\\\"spawnDistance\\\":350,\\\"joints\\\":[{\\\"d0\\\":1,\\\"d1\\\":6,\\\"length\\\":249.12848090894786,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":1,\\\"d1\\\":5,\\\"length\\\":262.0934947685654,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":1,\\\"d1\\\":4,\\\"length\\\":264,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":1,\\\"d1\\\":2,\\\"length\\\":272,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":1,\\\"d1\\\":3,\\\"length\\\":272,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":5,\\\"d1\\\":6,\\\"length\\\":19.849433241279208,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":4,\\\"d1\\\":6,\\\"length\\\":17,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":4,\\\"d1\\\":5,\\\"length\\\":7.280109889280518,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":3,\\\"d1\\\":4,\\\"length\\\":379.0514476954283,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":3,\\\"d1\\\":5,\\\"length\\\":372.651311550087,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":3,\\\"d1\\\":6,\\\"length\\\":374.70121430280955,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":2,\\\"d1\\\":4,\\\"length\\\":379.0514476954283,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":1,\\\"d1\\\":7,\\\"length\\\":280,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":1,\\\"d1\\\":8,\\\"length\\\":280,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":1,\\\"d1\\\":10,\\\"length\\\":280,\\\"color\\\":\\\"transparent\\\"},{\\\"d0\\\":1,\\\"d1\\\":9,\\\"length\\\":280,\\\"color\\\":\\\"transparent\\\"}],\\\"redSpawnPoints\\\":[[-208.2222213745117,-9.87847900390625],[-208.2222213745117,-88.87847900390625],[-208.2222213745117,69.12152099609375],[-208.2222213745117,155.12152099609375],[-208.2222213745117,-164.87847900390625]],\\\"blueSpawnPoints\\\":[[208.2222213745117,-9.87847900390625],[208.2222213745117,-88.87847900390625],[208.2222213745117,69.12152099609375],[208.2222213745117,155.12152099609375],[208.2222213745117,-164.87847900390625]]}\"";

// Parsear mapas
mapLuck = JSON.parse(mapLuck);
mapLuckDios = JSON.parse(mapLuckDios);
mapLuckHell = JSON.parse(mapLuckHell);
// Parsear Dodgeball
mapDodgeball = JSON.parse(mapDodgeball);
// Parsear Superman
mapSuperman = JSON.parse(mapSuperman);
// Parsear Ultraball
mapUltraball = JSON.parse(mapUltraball);
// Parsear Survival Square
mapSurvivalSquare = JSON.parse(mapSurvivalSquare);
// Parsear NumberChairs
mapNumberChairs = JSON.parse(mapNumberChairs);
// Parsear mapa Collision Team Racing
mapCollision = JSON.parse(mapCollision);
// Parsear mapa Space Melee
mapSpaceMelee = JSON.parse(mapSpaceMelee);

// Configurar mapas en LUCKY, LUCKY_HELL y LUCKY_DIOS
LUCKY.setMaps(mapLuck, mapLuckDios, mapLuckHell);
LUCKY_HELL.setMap(mapLuckHell);
LUCKY_DIOS.setMaps(mapLuckDios, mapLuck);
// Inyectar mapa en DODGEBALL
if (typeof DODGEBALL !== 'undefined' && DODGEBALL.setMapData) {
    DODGEBALL.setMapData(mapDodgeball);
}
// Inyectar mapa en SUPERMAN
if (typeof SUPERMAN !== 'undefined' && SUPERMAN.setMapData) {
    SUPERMAN.setMapData(mapSuperman);
}
// Inyectar mapa en ULTRABALL
if (typeof ULTRABALL !== 'undefined' && ULTRABALL.setMapData) {
     ULTRABALL.setMapData(mapUltraball);
}
// Inyectar mapa en SURVIVAL_SQ
if (typeof SURVIVAL_SQ !== 'undefined' && SURVIVAL_SQ.setMapData) {
    SURVIVAL_SQ.setMapData(mapSurvivalSquare);
}
// Inyectar mapa en NUMBERCHAIRS
if (typeof NUMBERCHAIRS !== 'undefined' && NUMBERCHAIRS.setMapData) {
    NUMBERCHAIRS.setMapData(mapNumberChairs);
}
// Inyectar mapa en COLLISION_TEAM_RACING (si existe)
if (typeof COLLISION_TEAM_RACING !== 'undefined' && COLLISION_TEAM_RACING.setMapData) {
    COLLISION_TEAM_RACING.setMapData(mapCollision);
}
// Inyectar mapa en SPACE_MELEE (si existe)
if (typeof SPACE_MELEE !== 'undefined' && SPACE_MELEE.setMapData) {
    SPACE_MELEE.setMapData(mapSpaceMelee);
}

// ============================================
// SISTEMA DE ANUNCIOS AUTOMÁTICOS
// ============================================
function startAutoAnnouncements() {
    setInterval(function() {
        // No enviar anuncios si hay un juego activo (minijuego en curso)
        if (botState.gameActive || botState.chatBlocked) {
            // Marcar anuncio pendiente para enviarlo cuando termine la explicación/minijuego
            botState.pendingAnnouncement = true;
            return; // No enviar anuncios durante juegos activos o cuando el chat está bloqueado
        }
        
        botState.chatBlocked = true;
        
        room.sendAnnouncement(
            "━━━━━━━━━━━━━━━━━━━━━━━━\n" +
            "💬 ÚNETE A NUESTRO DISCORD\n" +
            "🔗 https://discord.gg/ACpTeXu7Pj\n" +
            "━━━━━━━━━━━━━━━━━━━━━━━━",
            null,
            0x5865F2,
            "bold",
            2
        );
        
        setTimeout(function() {
            botState.chatBlocked = false;
        }, 2000);
    }, 120000); // Cada 2 minutos
}

// Vigilar anuncios pendientes y enviarlos cuando sea seguro
function startPendingAnnouncementWatcher() {
    setInterval(function() {
        if (botState.pendingAnnouncement && !botState.gameActive && !botState.chatBlocked) {
            botState.pendingAnnouncement = false;
            botState.chatBlocked = true;
            room.sendAnnouncement(
                "━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                "💬 ÚNETE A NUESTRO DISCORD\n" +
                "🔗 https://discord.gg/ACpTeXu7Pj\n" +
                "━━━━━━━━━━━━━━━━━━━━━━━━",
                null,
                0x5865F2,
                "bold",
                2
            );
            setTimeout(function() { botState.chatBlocked = false; }, 2000);
        }
    }, 2000);
}

// Iniciar watcher de pendientes
startPendingAnnouncementWatcher();

// Iniciar anuncios automáticos
startAutoAnnouncements();

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

// Bloquear cambios de equipo (uso: lockTeamChanges(); unlockTeamChanges();)
function lockTeamChanges() {
    botState.teamLock = true;
    try { if (typeof room !== 'undefined' && room.setTeamsLock) room.setTeamsLock(true); } catch(e){}
}
function unlockTeamChanges() {
    botState.teamLock = false;
    try { if (typeof room !== 'undefined' && room.setTeamsLock) room.setTeamsLock(false); } catch(e){}
}

// Manejar kicks/bans realizados desde la UI (click en jugador)
// Firma: onPlayerKicked(kickedPlayer, reason, ban, byPlayer)
room.onPlayerKicked = function(kickedPlayer, reason, ban, byPlayer) {
    try {
        if (byPlayer && byPlayer.id !== 0) {
            // permitir solo al owner banear
            if (ban) {
                if (byPlayer.auth !== OWNER_AUTH) {
                    // revertir bans: limpiar bans y avisar
                    try { room.clearBans(); } catch(e){}
                    room.sendAnnouncement('⛔ Solo el OWNER puede banear desde la interfaz. Ban revertido.', null, 0xFF0000, 'bold');
                }
                return;
            }

            // Si es kick (no ban): aplicar cooldown de 2 minutos por admin
            var now = Date.now();
            botState.lastKickBy = botState.lastKickBy || {};
            var last = botState.lastKickBy[byPlayer.id] || 0;
            if (now - last < 120000 && byPlayer.auth !== OWNER_AUTH) {
                // Violó cooldown: revocar admin temporal y avisar
                try { room.setPlayerAdmin(byPlayer.id, false); } catch(e){}
                room.sendAnnouncement('⛔ Has kickeado demasiado seguido. Tu admin ha sido revocado temporalmente.', byPlayer.id, 0xFF0000, 'bold');
            } else {
                botState.lastKickBy[byPlayer.id] = now;
            }
        }
    } catch (e) { console.error('[ROOM] onPlayerKicked error', e); }
};


function startLALALA() {
    botState.gameActive = true;
    
    LALALA.start(room, function(winner) {
        if (winner) {
            loadLuckyMap(winner);
        } else {
            botState.gameActive = false;
            setTimeout(checkAndStart, 5000);
        }
    });
}

function startSURVIVAL() {
    botState.gameActive = true;
    
    SURVIVAL.start(room, function(winner) {
        if (winner) {
            loadLuckyMap(winner);
        } else {
            botState.gameActive = false;
            setTimeout(checkAndStart, 5000);
        }
    });
}

function startMETEORS() {
    botState.gameActive = true;
    
    METEORS.start(room, function(winner) {
        if (winner) {
            loadLuckyMap(winner);
        } else {
            botState.gameActive = false;
            setTimeout(checkAndStart, 5000);
        }
    });
}

function startJUMPING() {
    botState.gameActive = true;
    
    JUMPING.start(room, function(winner) {
        if (winner) {
            loadLuckyMap(winner);
        } else {
            botState.gameActive = false;
            setTimeout(checkAndStart, 5000);
        }
    });
}

function startWEBSURVIVAL() {
    botState.gameActive = true;
    
    WEBSURVIVAL.start(room, function(winner) {
        if (winner) {
            loadLuckyMap(winner);
        } else {
            botState.gameActive = false;
            setTimeout(checkAndStart, 5000);
        }
    });
}

function startGALACTIC() {
    botState.gameActive = true;
    
    GALACTIC.start(room, function(winner) {
        if (winner) {
            loadLuckyMap(winner);
        } else {
            botState.gameActive = false;
            setTimeout(checkAndStart, 5000);
        }
    });
}

function startSPACE_MELEE() {
    botState.gameActive = true;
    if (typeof SPACE_MELEE !== 'undefined') {
        SPACE_MELEE.start(room, function(winner) {
            if (winner) {
                loadLuckyMap(winner);
            } else {
                botState.gameActive = false;
                setTimeout(checkAndStart, 5000);
            }
        });
    } else {
        botState.gameActive = false;
        setTimeout(checkAndStart, 5000);
    }
}

function startCOLLISION() {
    botState.gameActive = true;
    if (typeof COLLISION_TEAM_RACING !== 'undefined') {
        COLLISION_TEAM_RACING.start(room, function(winner) {
            if (winner) {
                loadLuckyMap(winner);
            } else {
                botState.gameActive = false;
                setTimeout(checkAndStart, 5000);
            }
        });
    } else {
        // Módulo no disponible
        botState.gameActive = false;
        setTimeout(checkAndStart, 5000);
    }
}

function startGYM() {
    botState.gameActive = true;
    
    GYM.start(room, function(winner) {
        if (winner) {
            loadLuckyMap(winner);
        } else {
            botState.gameActive = false;
            setTimeout(checkAndStart, 5000);
        }
    });
}

function startMULTIBALLS() {
    botState.gameActive = true;
    
    MULTIBALLS.start(room, function(winner) {
        if (winner) {
            loadLuckyMap(winner);
        } else {
            botState.gameActive = false;
            setTimeout(checkAndStart, 5000);
        }
    });
}

function startDODGEBALL() {
    botState.gameActive = true;
    
    DODGEBALL.start(room, function(winner) {
        if (winner) {
            loadLuckyMap(winner);
        } else {
            botState.gameActive = false;
            setTimeout(checkAndStart, 5000);
        }
    });
}

function startSUPERMAN() {
    botState.gameActive = true;
    SUPERMAN.start(room, function(winner) {
        if (winner) {
            loadLuckyMap(winner);
        } else {
            botState.gameActive = false;
            setTimeout(checkAndStart, 5000);
        }
    });
}

function startULTRABALL() {
    botState.gameActive = true;
    ULTRABALL.start(room, function(winner) {
        if (winner) {
            loadLuckyMap(winner);
        } else {
            botState.gameActive = false;
            setTimeout(checkAndStart, 5000);
        }
    });
}

function startSURVIVAL_SQ() {
    botState.gameActive = true;
    SURVIVAL_SQ.start(room, function(winner) {
        if (winner) {
            loadLuckyMap(winner);
        } else {
            botState.gameActive = false;
            setTimeout(checkAndStart, 5000);
        }
    });
}

function startNUMBERCHAIRS() {
    botState.gameActive = true;
    NUMBERCHAIRS.start(room, function(winner) {
        if (winner) {
            loadLuckyMap(winner);
        } else {
            botState.gameActive = false;
            setTimeout(checkAndStart, 5000);
        }
    });
}

function loadLuckyMap(winner) {
    room.setPlayerTeam(winner.id, 1);
    
    var allPlayers = room.getPlayerList().filter(p => p.id !== 0);
    allPlayers.forEach(p => {
        if (p.id !== winner.id) {
            room.setPlayerTeam(p.id, 0);
        }
    });
    
    room.sendAnnouncement(
        "\n🎰 PREPARANDO LUCKY...\n🎲 Cargando la ruleta de la suerte...",
        null,
        0xFFD700,
        "bold",
        2
    );
    
    setTimeout(function() {
        room.stopGame();
        
        try {
            room.setCustomStadium(mapLuck);
            room.startGame();
            
            room.sendAnnouncement(
                "🍀 LUCKY MAP - MAPA DE LA SUERTE 🍀\n" +
                "👑 Ganador: " + winner.name + "\n" +
                "🎯 Cae en un color y descubre tu destino!",
                null,
                0xFFD700,
                "bold",
                2
            );
            
            console.log("✅ Mapa Lucky cargado correctamente");
            
            // Iniciar detección de colores con callbacks
            LUCKY.start(room, winner, function() {
                // Cuando termine Lucky, volver a iniciar otro minijuego
                room.sendAnnouncement(
                    "\n⏸️ Mapa Lucky finalizado\n\n⏱️ Próximo minijuego en 3 segundos...",
                    null,
                    0xFFFF00,
                    "bold"
                );
                botState.gameActive = false;
                setTimeout(checkAndStart, 3000);
            }, {
                onTempAdmin: function(playerId) {
                    // Agregar a lista de admins temporales
                    if (botState.tempAdmins.indexOf(playerId) === -1) {
                        botState.tempAdmins.push(playerId);
                        console.log("👑 Admin temporal agregado: " + playerId);
                    }
                },
                onSpectatorNext: function(playerId) {
                    // Agregar a lista de espectadores para el siguiente minijuego
                    if (botState.spectatorNext.indexOf(playerId) === -1) {
                        botState.spectatorNext.push(playerId);
                        console.log("👻 Espectador próximo minijuego: " + playerId);
                    }
                },
                onBanTemp: function(playerId, duration) {
                    // Banear temporalmente
                    var player = room.getPlayer(playerId);
                    var playerName = player ? player.name : "#" + playerId;
                    
                    // Limpiar timer anterior si existe
                    if (botState.banTimers[playerId]) {
                        clearTimeout(botState.banTimers[playerId]);
                    }
                    
                    // Agregar a lista de baneados
                    if (botState.bannedPlayers.indexOf(playerId) === -1) {
                        botState.bannedPlayers.push(playerId);
                    }
                    
                    room.kickPlayer(playerId, "Ban temporal por " + duration + "s", true);
                    console.log("⚔️ Ban temporal a " + playerName + " por " + duration + "s");
                    
                    botState.banTimers[playerId] = setTimeout(function() {
                        // Remover de lista de baneados
                        var index = botState.bannedPlayers.indexOf(playerId);
                        if (index !== -1) {
                            botState.bannedPlayers.splice(index, 1);
                        }
                        
                        room.clearBans();
                        room.sendAnnouncement(
                            "✅ Ban temporal removido - " + playerName + " puede volver a entrar",
                            null,
                            0x00FF00,
                            "bold"
                        );
                        delete botState.banTimers[playerId];
                        console.log("✅ Ban temporal removido para " + playerName);
                    }, duration * 1000);
                }
            });
        } catch (e) {
            console.log("❌ Error al cargar mapa Lucky: " + e.message);
            botState.gameActive = false;
            setTimeout(checkAndStart, 5000);
        }
    }, 2000);
}

function checkAndStart() {
    // Si hay un Lucky activo (normal, DIOS o HELL), no iniciar el siguiente minijuego
    if (LUCKY.isActive() || LUCKY_DIOS.isActive() || LUCKY_HELL.isActive()) {
        botState.startTimeout = setTimeout(checkAndStart, 5000);
        return;
    }
    
    if (botState.gameActive) return;
    if (botState.startTimeout) {
        clearTimeout(botState.startTimeout);
        botState.startTimeout = null;
    }
    
    var playerCount = room.getPlayerList().filter(p => p.id !== 0).length;
    
    if (playerCount < 2) {
        room.sendAnnouncement(
            "⏳ Esperando más jugadores... (mínimo 2)",
            null,
            0xFFFF00
        );
        botState.startTimeout = setTimeout(checkAndStart, 10000);
    } else {
        // SISTEMA DE MINIJUEGOS ALEATORIOS (evitar repetir el último)
        // Durante pruebas, solo habilitamos COLLISION_TEAM_RACING
        // MODO PRUEBAS: Solo habilitado SPACE_MELEE. Los demás minijuegos están desactivados/commented para pruebas.
        var minigames = [
            { name: 'SPACE_MELEE', module: SPACE_MELEE, displayName: 'SPACE MELEE', starter: startSPACE_MELEE }
        ];

        // Filtrar el último minijuego jugado
        var availableGames = minigames.filter(function(game) {
            return game.name !== botState.lastMinigame;
        });

        // Si hay menos de 3 jugadores, no permitir que se seleccione DODGEBALL
        if (playerCount < 3) {
            availableGames = availableGames.filter(function(game) {
                return game.name !== 'DODGEBALL';
            });
        }

        // Si hay más de 14 jugadores, ocultar MULTIBALLS de la selección
        if (playerCount > 14) {
            availableGames = availableGames.filter(function(game) {
                return game.name !== 'MULTIBALLS';
            });
        }

        // Si todos fueron jugados o el filtro dejó vacío, reconstruir lista aplicando la misma restricción de DODGEBALL
        if (availableGames.length === 0) {
            availableGames = minigames.filter(function(game) {
                if (game.name === 'DODGEBALL' && playerCount < 3) return false;
                return true;
            });
        }
        
        // Seleccionar minijuego aleatorio
        var randomIndex = Math.floor(Math.random() * availableGames.length);
        var selectedGame = availableGames[randomIndex];
        
        botState.lastMinigame = selectedGame.name;
        botState.currentMinigame = selectedGame.name;
        
        room.sendAnnouncement(
            "🎲 Minijuego: " + selectedGame.displayName + "\n👥 Jugadores: " + playerCount + "\n⏱️ Iniciando en 3 segundos...",
            null,
            0x00BFFF,
            "bold",
            2
        );
        // Aplicar spectactorNext SOLO para el próximo minijuego: mover a espectador ahora y limpiar la lista
        if (botState.spectatorNext && botState.spectatorNext.length > 0) {
            try {
                botState.spectatorNext.forEach(function(pid) {
                    try { room.setPlayerTeam(pid, 0); } catch(e){}
                });
            } catch(e) {}
            botState.spectatorNext = [];
        }
        botState.startTimeout = setTimeout(selectedGame.starter, 3000);
    }
}

// ============================================
// EVENTOS
// ============================================

room.onPlayerJoin = function(player) {
    console.log("👤 " + player.name + " entró");
    
    // ============================================
    // SISTEMA DE OWNER - DAR ADMIN AUTOMÁTICO
    // ============================================
    if (player.auth === OWNER_AUTH) {
        room.setPlayerAdmin(player.id, true);
        room.sendAnnouncement(
            "👑 Bienvenido OWNER! Admin activado automáticamente",
            player.id,
            0xFFD700,
            "bold"
        );
        console.log("👑 Owner detectado: " + player.name);
    }
    
    room.sendAnnouncement(
        "👋 Bienvenido " + player.name + "!\n" +
        "🎮 Sala de Minijuegos\n" +
        "Escribe !ayuda para ver comandos",
        player.id,
        0x00FF00
    );
    
    // Si está en la lista de spectatorNext, moverlo a espectador
    if (botState.spectatorNext.indexOf(player.id) !== -1) {
        room.setPlayerTeam(player.id, 0);
        room.sendAnnouncement(
            "👻 Debes esperar el próximo minijuego",
            player.id,
            0xFF6600,
            "bold"
        );
    }
    
    if (botState.gameActive) {
        room.sendAnnouncement(
            "⏳ Hay un juego en curso. Espera a que termine para jugar.",
            player.id,
            0xFFFF00
        );
        return;
    }
    
    if (!botState.startTimeout) {
        var playerCount = room.getPlayerList().filter(p => p.id !== 0).length;
        if (playerCount >= 2) {
            room.sendAnnouncement(
                "✅ Hay suficientes jugadores!\n⏱️ El juego comenzará en unos segundos...",
                null,
                0x00FF00,
                "bold"
            );
            botState.startTimeout = setTimeout(checkAndStart, 2000);
        }
    }
};

room.onPlayerLeave = function(player) {
    console.log("👋 " + player.name + " salió");
    
    // Notificar a los módulos activos sobre la salida del jugador
    if (LALALA.isActive()) {
        LALALA.onPlayerLeave(room, player);
    }
    if (SURVIVAL.isActive()) {
        SURVIVAL.onPlayerLeave(room, player);
    }
    if (METEORS.isActive()) {
        METEORS.onPlayerLeave(room, player);
    }
    if (JUMPING.isActive()) {
        JUMPING.onPlayerLeave(room, player);
    }
    if (WEBSURVIVAL.isActive()) {
        WEBSURVIVAL.onPlayerLeave(room, player);
    }
    if (GALACTIC.isActive()) {
        GALACTIC.onPlayerLeave(room, player);
    }
    if (SPACE_MELEE && SPACE_MELEE.isActive && SPACE_MELEE.isActive()) {
        try { SPACE_MELEE.onPlayerLeave(room, player); } catch(e){}
    }
    if (GYM.isActive()) {
        GYM.onPlayerLeave(room, player);
    }
    if (MULTIBALLS.isActive()) {
        MULTIBALLS.onPlayerLeave(room, player);
    }
    if (DODGEBALL.isActive()) {
        DODGEBALL.onPlayerLeave(room, player);
    }
    if (ULTRABALL && ULTRABALL.isActive && ULTRABALL.isActive()) {
        ULTRABALL.onPlayerLeave(room, player);
    }
    if (NUMBERCHAIRS && NUMBERCHAIRS.isActive && NUMBERCHAIRS.isActive()) {
        NUMBERCHAIRS.onPlayerLeave(room, player);
    }
    
    var playerCount = room.getPlayerList().filter(p => p.id !== 0).length;
    if (playerCount < 2 && botState.gameActive) {
        room.sendAnnouncement(
            "⏸️ Solo queda 1 jugador. Deteniendo juego...",
            null,
            0xFF6600,
            "bold"
        );
        
        if (LALALA.isActive()) {
            LALALA.stop(room);
        }
        // Detener Lucky si está activo
        if (LUCKY.isActive()) {
            LUCKY.stop(room);
        }
        if (LUCKY_HELL && LUCKY_HELL.isActive && LUCKY_HELL.isActive()) {
            LUCKY_HELL.stop(room);
        }
        if (LUCKY_DIOS && LUCKY_DIOS.isActive && LUCKY_DIOS.isActive()) {
            LUCKY_DIOS.stop(room);
        }
        if (SURVIVAL.isActive()) {
            SURVIVAL.stop(room);
        }
        if (METEORS.isActive()) {
            METEORS.stop(room);
        }
        if (JUMPING.isActive()) {
            JUMPING.stop(room);
        }
        if (WEBSURVIVAL.isActive()) {
            WEBSURVIVAL.stop(room);
        }
        if (GALACTIC.isActive()) {
            GALACTIC.stop(room);
        }
        if (SPACE_MELEE && SPACE_MELEE.isActive && SPACE_MELEE.isActive()) {
            SPACE_MELEE.stop(room);
        }
        if (GYM.isActive()) {
            GYM.stop(room);
        }
        if (MULTIBALLS.isActive()) {
            MULTIBALLS.stop(room);
        }
        if (DODGEBALL.isActive()) {
            DODGEBALL.stop(room);
        }
        if (SURVIVAL_SQ && SURVIVAL_SQ.isActive && SURVIVAL_SQ.isActive()) {
            SURVIVAL_SQ.stop(room);
        }
        if (NUMBERCHAIRS && NUMBERCHAIRS.isActive && NUMBERCHAIRS.isActive()) {
            NUMBERCHAIRS.stop(room);
        }
        if (ULTRABALL && ULTRABALL.isActive && ULTRABALL.isActive()) {
            ULTRABALL.stop(room);
        }
        
        botState.gameActive = false;
        if (botState.startTimeout) {
            clearTimeout(botState.startTimeout);
            botState.startTimeout = null;
        }
        
        // Reiniciar búsqueda de minijuego cuando haya 2 jugadores
        room.sendAnnouncement(
            "⏳ Esperando más jugadores...",
            null,
            0x00FF00,
            "normal"
        );
        
        // Verificar cada 5 segundos si hay suficientes jugadores
        var checkInterval = setInterval(function() {
            var currentPlayers = room.getPlayerList().filter(p => p.id !== 0).length;
            if (currentPlayers >= 2) {
                clearInterval(checkInterval);
                setTimeout(function() {
                    checkAndStart();
                }, 3000);
            }
        }, 5000);
        
        setTimeout(checkAndStart, 3000);
    }
};

room.onPlayerTeamChange = function(changedPlayer, byPlayer) {
    // Bloqueo general de cambios de equipo (por ejemplo durante pausas/instrucciones)
    if (botState.teamLock) {
        // revertir al equipo anterior (si existe)
        try { room.setPlayerTeam(changedPlayer.id, 0); } catch(e){}
        try { room.sendAnnouncement('⛔ Los cambios de equipo están bloqueados ahora mismo.', changedPlayer.id, 0xFF6600); } catch(e){}
        return;
    }

    // Evitar que alguien se mueva al equipo azul (equipo 2) SOLO DURANTE LUCKY o LUCKY HELL
    if ((LUCKY.isActive() || LUCKY_HELL.isActive() || LUCKY_DIOS.isActive()) && changedPlayer.team === 2) {
        room.setPlayerTeam(changedPlayer.id, 0);
        room.sendAnnouncement(
            "⚠️ No puedes unirte al equipo azul durante Lucky",
            changedPlayer.id,
            0xFF6600
        );
        return;
    }
    
    // Si está en spectatorNext, forzar a espectador
    if (botState.spectatorNext.indexOf(changedPlayer.id) !== -1 && changedPlayer.team !== 0) {
        room.setPlayerTeam(changedPlayer.id, 0);
        room.sendAnnouncement(
            "👻 Debes esperar el próximo minijuego",
            changedPlayer.id,
            0xFF6600,
            "bold"
        );
    }
};

room.onPlayerChat = function(player, message) {
    // Bloqueo de chat durante anuncios automáticos
    if (botState.chatBlocked) {
        return false;
    }
    
    // Control de admins temporales - no pueden usar comandos de admin
    if (botState.tempAdmins.indexOf(player.id) !== -1) {
        if (message.startsWith('!kick') || message.startsWith('!ban') || message.startsWith('!set')) {
            room.sendAnnouncement(
                "⛔ Los admins temporales NO pueden kickear, banear ni cambiar mapas",
                player.id,
                0xFF0000,
                "bold"
            );
            room.sendAnnouncement(
                "⚠️ " + player.name + " intentó usar comandos de admin - KICKEADO",
                null,
                0xFF6600,
                "bold"
            );
            setTimeout(function() {
                room.kickPlayer(player.id, "Uso indebido de admin temporal", false);
            }, 1000);
            return false;
        }
    }
    
    // Control de chat de Lucky (selección de jugadores)
    if (LUCKY.isActive()) {
        var result = LUCKY.onPlayerChat(player, message);
        if (result === false) return false; // Si retorna false, bloquear chat
    }
    
    // Control de chat de Lucky Hell (selección de jugadores)
    if (LUCKY_HELL.isActive()) {
        var result = LUCKY_HELL.onPlayerChat(player, message);
        if (result === false) return false; // Si retorna false, bloquear chat
    }
    
    // Control de chat de Lucky DIOS (selección de jugadores)
    if (LUCKY_DIOS.isActive()) {
        var result = LUCKY_DIOS.onPlayerChat(player, message);
        if (result === false) return false; // Si retorna false, bloquear chat
    }
    
    if (LALALA.isActive()) {
        var result = LALALA.onPlayerChat(player);
        if (result === false) return false;
    }
    
    if (SURVIVAL.isActive()) {
        var result = SURVIVAL.onPlayerChat(player);
        if (result === false) return false;
    }
    
    if (METEORS.isActive()) {
        var result = METEORS.onPlayerChat(player);
        if (result === false) return false;
    }
    
    if (JUMPING.isActive()) {
        var result = JUMPING.onPlayerChat(player);
        if (result === false) return false;
    }
    
    if (WEBSURVIVAL.isActive()) {
        var result = WEBSURVIVAL.onPlayerChat(player);
        if (result === false) return false;
    }
    
    if (GALACTIC.isActive()) {
        var result = GALACTIC.onPlayerChat(player);
        if (result === false) return false;
    }
    
    if (GYM.isActive()) {
        var result = GYM.onPlayerChat(player);
        if (result === false) return false;
    }
    
    if (MULTIBALLS.isActive()) {
        var result = MULTIBALLS.onPlayerChat(player);
        if (result === false) return false;
    }
    
    if (DODGEBALL.isActive()) {
        var result = DODGEBALL.onPlayerChat(player, message);
        if (result === false) return false;
    }
    
    if (ULTRABALL && ULTRABALL.isActive && ULTRABALL.isActive()) {
        var result = ULTRABALL.onPlayerChat(player, message);
        if (result === false) return false;
    }
    if (NUMBERCHAIRS && NUMBERCHAIRS.isActive && NUMBERCHAIRS.isActive()) {
        var result = NUMBERCHAIRS.onPlayerChat(player, message);
        if (result === false) return false;
    }
    
    // Comando !discord - enviar link privado al solicitante (cooldown 60s)
    if (message === "!discord") {
        var now = Date.now();
        var last = botState.discordCooldowns[player.id] || 0;
        var diff = now - last;
        if (diff < 60000) {
            var wait = Math.ceil((60000 - diff) / 1000);
            room.sendAnnouncement(
                "⏳ Espera " + wait + "s antes de pedir el enlace de Discord otra vez.",
                player.id,
                0xFF6600
            );
            return false;
        }

        // Registrar uso
        botState.discordCooldowns[player.id] = now;

        room.sendAnnouncement(
            "🔗 Enlace de Discord (privado):\n" + DISCORD_INVITE,
            player.id,
            0x5865F2
        );
        return false; // bloquear el mensaje público
    }
    
    // Comando !reiniciar solo para admins
    if (message === "!reiniciar") {
        var playerObj = room.getPlayer(player.id);
        if (playerObj && playerObj.admin) {
            room.sendAnnouncement(
                "🔄 REINICIANDO BOT...",
                null,
                0xFF6600,
                "bold",
                2
            );
            
            setTimeout(function() {
                // Detener todos los módulos
                if (LALALA.isActive()) LALALA.stop(room);
                if (SURVIVAL.isActive()) SURVIVAL.stop(room);
                if (METEORS.isActive()) METEORS.stop(room);
                if (JUMPING.isActive()) JUMPING.stop(room);
                if (WEBSURVIVAL.isActive()) WEBSURVIVAL.stop(room);
                if (GALACTIC.isActive()) GALACTIC.stop(room);
                if (GYM.isActive()) GYM.stop(room);
                if (MULTIBALLS.isActive()) MULTIBALLS.stop(room);
                if (DODGEBALL.isActive()) DODGEBALL.stop(room);
                if (NUMBERCHAIRS && NUMBERCHAIRS.isActive && NUMBERCHAIRS.isActive()) NUMBERCHAIRS.stop(room);
                if (LUCKY.isActive()) LUCKY.stop(room);
                if (LUCKY_HELL.isActive()) LUCKY_HELL.stop(room);
                if (LUCKY_DIOS.isActive()) LUCKY_DIOS.stop(room);
                
                // Resetear estado del bot
                botState.gameActive = false;
                botState.tempAdmins = [];
                botState.bannedPlayers = [];
                botState.spectatorNext = [];
                botState.chatBlocked = false;
                
                // Limpiar todos los timers de ban
                for (var id in botState.banTimers) {
                    clearTimeout(botState.banTimers[id]);
                }
                botState.banTimers = {};
                
                if (botState.startTimeout) {
                    clearTimeout(botState.startTimeout);
                    botState.startTimeout = null;
                }
                
                // Detener juego y resetear mapa
                room.stopGame();
                
                // Mover todos los jugadores a espectadores
                var players = room.getPlayerList();
                for (var i = 0; i < players.length; i++) {
                    if (players[i].id !== 0) {
                        room.setPlayerTeam(players[i].id, 0);
                    }
                }
                
                setTimeout(function() {
                    room.sendAnnouncement(
                        "✅ Bot reiniciado - Esperando jugadores...",
                        null,
                        0x00FF00,
                        "bold",
                        2
                    );
                    checkAndStart();
                }, 1000);
            }, 2000);
            
            return false;
        } else {
            room.sendAnnouncement(
                "⛔ Solo los admins pueden usar !reiniciar",
                player.id,
                0xFF0000,
                "bold"
            );
            return false;
        }
    }
    
    if (message === "!ayuda") {
        room.sendAnnouncement(
            "📋 COMANDOS:\n" +
            "!ayuda - Ver comandos\n" +
            "!reiniciar - Reiniciar bot (solo admin)\n" +
            "Los minijuegos se ejecutan automáticamente 🎲",
            player.id,
            0x00FF00
        );
        return false;
    }
    
    return true;
};

room.onGameStart = function() {
    console.log("🎮 Juego iniciado");
};

room.onGameStop = function() {
    console.log("⏹️ Juego detenido");
};

// ============================================
// INICIO
// ============================================

setTimeout(function() {
    room.sendAnnouncement(
        "🎮 Bienvenidos a la Sala de Minijuegos 🎮\n" +
        "Los minijuegos se ejecutan automáticamente",
        null,
        0x00FF00,
        "bold",
        2
    );
    checkAndStart();
}, 5000);
