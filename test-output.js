(function() {
// ============================================
// MINIJUEGO: LALALA - Esquiva las bolas
// ============================================

// NOTA: El mapa será inyectado por bot.js
// No se carga aquí para evitar problemas con fs en el contexto del navegador
// ⚠️ IMPORTANTE: mapData debe ser una STRING JSON, no un objeto JavaScript
// Haxball's room.setCustomStadium() requiere string JSON
var mapData = JSON.parse("{\"name\":\"LALALA from HaxMaps\",\"width\":650,\"height\":380,\"bg\":{\"color\":\"4C7296\"},\"vertexes\":[{\"x\":-507,\"y\":163,\"bCoef\":1.2,\"cMask\":[\"red\",\"blue\"]},{\"x\":508,\"y\":163,\"bCoef\":1.2,\"cMask\":[\"red\",\"blue\"]},{\"x\":-507,\"y\":203,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":508,\"y\":203,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":523,\"y\":188,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":523,\"y\":178,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":-522,\"y\":188,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-522,\"y\":178,\"bCoef\":1.6,\"cMask\":[\"red\",\"blue\"]},{\"x\":523,\"y\":185.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-522,\"y\":185.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":523,\"y\":183,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-522,\"y\":183,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":523,\"y\":180.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-522,\"y\":180.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":522,\"y\":190.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-521,\"y\":190.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":522,\"y\":175.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-521,\"y\":175.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-521,\"y\":193,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":521,\"y\":173,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-520,\"y\":173,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":521,\"y\":178,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-520,\"y\":178,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":520,\"y\":195.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-519,\"y\":195.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":520,\"y\":170.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-519,\"y\":170.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":521,\"y\":193,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-520,\"y\":193,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":518,\"y\":168,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-517,\"y\":168,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":515,\"y\":200.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-514,\"y\":200.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":518,\"y\":198,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-517,\"y\":198,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":515,\"y\":165.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-514,\"y\":165.5,\"bCoef\":1.6,\"cMask\":[\"wall\"]},{\"x\":-1000,\"y\":-250,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":1000,\"y\":-250,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":-120,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-120,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-1000,\"y\":-240,\"bCoef\":-5,\"cMask\":[\"red\",\"blue\"]},{\"x\":1000,\"y\":-240,\"bCoef\":-5,\"cMask\":[\"red\",\"blue\"]},{\"x\":-160,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-160,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-200,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-200,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-240,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-240,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-320,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-320,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-400,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-400,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-280,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-280,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-360,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-360,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-40,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-40,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-80,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-80,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":120,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":120,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":160,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":160,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":200,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":200,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":240,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":240,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":320,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":320,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":400,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":400,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":280,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":280,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":360,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":360,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":40,\"y\":35,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":40,\"y\":75,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":80,\"y\":-20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":80,\"y\":20,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"x\":-300,\"y\":-310,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":-300,\"y\":-250,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":300,\"y\":-310,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":300,\"y\":-250,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"x\":-508,\"y\":163,\"bCoef\":1.5,\"cMask\":[\"red\",\"blue\"]},{\"x\":508,\"y\":163,\"bCoef\":1.5,\"cMask\":[\"red\",\"blue\"]}],\"segments\":[{\"v0\":2,\"v1\":3,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":4,\"v1\":3,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":4,\"v1\":5,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":1,\"v1\":5,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"},{\"v0\":2,\"v1\":6,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":6,\"v1\":7,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":7,\"v1\":0,\"bCoef\":1.6,\"curve\":89.99999999999999,\"curveF\":1.0000000000000002,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"},{\"v0\":7,\"v1\":5,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":6,\"v1\":4,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":9,\"v1\":8,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":11,\"v1\":10,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":13,\"v1\":12,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":15,\"v1\":14,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":17,\"v1\":16,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":20,\"v1\":19,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":22,\"v1\":21,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":24,\"v1\":23,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":26,\"v1\":25,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":28,\"v1\":27,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":30,\"v1\":29,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":32,\"v1\":31,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":34,\"v1\":33,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":36,\"v1\":35,\"bCoef\":1.6,\"cMask\":[\"wall\"],\"color\":\"6497B1\"},{\"v0\":37,\"v1\":38,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"],\"color\":\"537EA7\"},{\"v0\":39,\"v1\":40,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":40,\"v1\":39,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":41,\"v1\":42,\"bCoef\":-5,\"cMask\":[\"red\",\"blue\"],\"color\":\"555555\"},{\"v0\":43,\"v1\":44,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":44,\"v1\":43,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":45,\"v1\":46,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":46,\"v1\":45,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":47,\"v1\":48,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":48,\"v1\":47,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":49,\"v1\":50,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":50,\"v1\":49,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":51,\"v1\":52,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":52,\"v1\":51,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":53,\"v1\":54,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":54,\"v1\":53,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":55,\"v1\":56,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":56,\"v1\":55,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":57,\"v1\":58,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":58,\"v1\":57,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":59,\"v1\":60,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":60,\"v1\":59,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":61,\"v1\":62,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":62,\"v1\":61,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":63,\"v1\":64,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":64,\"v1\":63,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":65,\"v1\":66,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":66,\"v1\":65,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":67,\"v1\":68,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":68,\"v1\":67,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":69,\"v1\":70,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":70,\"v1\":69,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":71,\"v1\":72,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":72,\"v1\":71,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":73,\"v1\":74,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":74,\"v1\":73,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":75,\"v1\":76,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":76,\"v1\":75,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":77,\"v1\":78,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":78,\"v1\":77,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":79,\"v1\":80,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":80,\"v1\":79,\"bCoef\":0,\"curve\":180,\"curveF\":6.123233995736766e-17,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"redKO\",\"blueKO\"]},{\"v0\":81,\"v1\":82,\"bCoef\":0,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"color\":\"537EA7\"},{\"v0\":83,\"v1\":84,\"bCoef\":0,\"vis\":false,\"cMask\":[\"red\",\"blue\"],\"color\":\"537EA7\"},{\"v0\":85,\"v1\":86,\"bCoef\":1.5,\"cMask\":[\"red\",\"blue\"],\"color\":\"6497B1\"}],\"planes\":[{\"normal\":[0,-1],\"dist\":-400,\"bCoef\":100000,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[1,0],\"dist\":-950,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[-1,0],\"dist\":-950,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,1],\"dist\":-450,\"bCoef\":0,\"cMask\":[\"red\",\"blue\"]},{\"normal\":[0,1],\"dist\":-25,\"bCoef\":0,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"normal\":[0,-1],\"dist\":-450,\"bCoef\":0,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]}],\"goals\":[],\"discs\":[{\"radius\":0.01,\"bCoef\":1,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"kick\",\"score\",\"c0\"]},{\"pos\":[0,200],\"speed\":[0,-1],\"radius\":1,\"bCoef\":3,\"damping\":1,\"cMask\":[\"c0\"],\"cGroup\":[\"c0\"]},{\"pos\":[900,20],\"speed\":[-0.2,0],\"radius\":250,\"bCoef\":-10000,\"invMass\":1e-107,\"damping\":1,\"color\":\"264B6D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]},{\"pos\":[-900,20],\"speed\":[0.2,0],\"radius\":250,\"bCoef\":-10000,\"invMass\":1e-107,\"damping\":1,\"color\":\"264B6D\",\"cMask\":[\"red\",\"blue\"],\"cGroup\":[\"wall\"]}],\"playerPhysics\":{\"bCoef\":1.2,\"invMass\":0.7,\"damping\":0.97,\"acceleration\":0.12,\"kickStrength\":0,\"gravity\":[0,0.2],\"radius\":20},\"ballPhysics\":\"disc0\",\"spawnDistance\":250,\"redSpawnPoints\":[[-120,55],[-200,55],[-280,55],[-360,55],[-40,55],[-160,0],[-240,0],[-320,0],[-400,0],[-80,0],[-875,250]],\"blueSpawnPoints\":[[120,55],[200,55],[280,55],[360,55],[40,55],[160,0],[240,0],[320,0],[400,0],[80,0],[875,250]]}"); // Será inyectado desde bot.js como string JSON

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

})()