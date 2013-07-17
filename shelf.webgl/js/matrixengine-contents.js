(function() {

var GL = window.WebGLRenderingContext ? window.WebGLRenderingContext : window.WebGLRenderContext;
var F32A = function(array) { return new Float32Array(array); };
var UI8A = function(array) { return new Uint8Array(array); };
var UI16A = function(array) { return new Uint16Array(array); };
var UI32A = function(array) { return new Uint32Array(array); };

MxeDefaultContents = function() {
    this.initialize.apply(this, arguments);
};

MxeDefaultContents.prototype = Object.create(MxeContents.prototype);
MxeDefaultContents.prototype.constructor = MxeDefaultContents;
MxeDefaultContents.prototype.initialize = function(player) {
    this.player = player;
    this.backgroundColor = F32A([0.000000, 0.000000, 0.000000, 1.000000]);
    this.frameRate = 30;
    this.presetWidth = 600;
    this.presetHeight = 600;
    this.createTextureCasts();
    this.createBitmapCasts();
    this.createCameraCasts();
    this.createLightCasts();
    this.createTextCasts();
    this.createMovieCasts();
    this.createShaderCasts();
    this.createProceduralCasts();
    this.createModelCasts();
    this.createScores();
};

MxeDefaultContents.prototype.createTextureCasts = function() {
    this.textureCasts = new Array(39);
    this.textureCastsL = {};
    var cast;
    var bbinfo;
    var bbmat;
    
    this.textureCasts[0] = this.textureCastsL["wood"] = cast = new MxeTexture(this, 0, "wood");
    cast.imageSrc = "images/t0000.png";
    cast.presetWidth = 512;
    cast.presetHeight = 512;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.250000, 0.833984, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[1] = this.textureCastsL["background_1"] = cast = new MxeTexture(this, 1, "background_1");
    cast.imageSrc = "images/t0001.png";
    cast.presetWidth = 512;
    cast.presetHeight = 512;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([0.976563, 0.976563, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[2] = this.textureCastsL["Texture_00"] = cast = new MxeTexture(this, 2, "Texture_00");
    cast.imageSrc = "images/t0002.png";
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[3] = this.textureCastsL["Texture_01"] = cast = new MxeTexture(this, 3, "Texture_01");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[4] = this.textureCastsL["Texture_02"] = cast = new MxeTexture(this, 4, "Texture_02");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[5] = this.textureCastsL["Texture_03"] = cast = new MxeTexture(this, 5, "Texture_03");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[6] = this.textureCastsL["Texture_04"] = cast = new MxeTexture(this, 6, "Texture_04");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[7] = this.textureCastsL["Texture_05"] = cast = new MxeTexture(this, 7, "Texture_05");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[8] = this.textureCastsL["Texture_06"] = cast = new MxeTexture(this, 8, "Texture_06");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[9] = this.textureCastsL["Texture_07"] = cast = new MxeTexture(this, 9, "Texture_07");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[10] = this.textureCastsL["Texture_08"] = cast = new MxeTexture(this, 10, "Texture_08");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[11] = this.textureCastsL["Texture_09"] = cast = new MxeTexture(this, 11, "Texture_09");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[12] = this.textureCastsL["Texture_10"] = cast = new MxeTexture(this, 12, "Texture_10");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[13] = this.textureCastsL["Texture_11"] = cast = new MxeTexture(this, 13, "Texture_11");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[14] = this.textureCastsL["Texture_12"] = cast = new MxeTexture(this, 14, "Texture_12");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[15] = this.textureCastsL["Texture_13"] = cast = new MxeTexture(this, 15, "Texture_13");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[16] = this.textureCastsL["Texture_14"] = cast = new MxeTexture(this, 16, "Texture_14");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[17] = this.textureCastsL["Texture_15"] = cast = new MxeTexture(this, 17, "Texture_15");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[18] = this.textureCastsL["Texture_16"] = cast = new MxeTexture(this, 18, "Texture_16");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[19] = this.textureCastsL["Texture_17"] = cast = new MxeTexture(this, 19, "Texture_17");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[20] = this.textureCastsL["Texture_18"] = cast = new MxeTexture(this, 20, "Texture_18");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[21] = this.textureCastsL["Texture_19"] = cast = new MxeTexture(this, 21, "Texture_19");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[22] = this.textureCastsL["Texture_20"] = cast = new MxeTexture(this, 22, "Texture_20");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[23] = this.textureCastsL["Texture_21"] = cast = new MxeTexture(this, 23, "Texture_21");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[24] = this.textureCastsL["Texture_22"] = cast = new MxeTexture(this, 24, "Texture_22");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[25] = this.textureCastsL["Texture_23"] = cast = new MxeTexture(this, 25, "Texture_23");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[26] = this.textureCastsL["Texture_24"] = cast = new MxeTexture(this, 26, "Texture_24");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[27] = this.textureCastsL["Texture_25"] = cast = new MxeTexture(this, 27, "Texture_25");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[28] = this.textureCastsL["Texture_26"] = cast = new MxeTexture(this, 28, "Texture_26");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[29] = this.textureCastsL["Texture_27"] = cast = new MxeTexture(this, 29, "Texture_27");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[30] = this.textureCastsL["Texture_28"] = cast = new MxeTexture(this, 30, "Texture_28");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[31] = this.textureCastsL["Texture_29"] = cast = new MxeTexture(this, 31, "Texture_29");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[32] = this.textureCastsL["Texture_30"] = cast = new MxeTexture(this, 32, "Texture_30");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[33] = this.textureCastsL["Texture_31"] = cast = new MxeTexture(this, 33, "Texture_31");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[34] = this.textureCastsL["Texture_32"] = cast = new MxeTexture(this, 34, "Texture_32");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[35] = this.textureCastsL["Texture_33"] = cast = new MxeTexture(this, 35, "Texture_33");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[36] = this.textureCastsL["Texture_34"] = cast = new MxeTexture(this, 36, "Texture_34");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[37] = this.textureCastsL["Texture_35"] = cast = new MxeTexture(this, 37, "Texture_35");
    cast.imageSrc = this.textureCasts[2].imageSrc;
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
    
    this.textureCasts[38] = this.textureCastsL["LoadTx"] = cast = new MxeTexture(this, 38, "LoadTx");
    cast.imageSrc = "images/t0038.png";
    cast.presetWidth = 256;
    cast.presetHeight = 256;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    bbinfo = cast.billboardInfo = new MxeBillboardInfo();
    bbinfo.pos = F32A([-0.000000, -0.000000, 0.000000]);
    bbinfo.siz = F32A([1.000000, 1.000000, 0.0]);
    bbmat = bbinfo.material;
    bbmat.blendFactorSrc = GL.SRC_ALPHA;
    bbmat.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    bbmat.blendFactorAlphaSrc = GL.SRC_ALPHA;
    bbmat.blendFactorAlphaDst = GL.DST_ALPHA;
    bbmat.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    bbmat.textureInfo[0].cast = cast
    
};

MxeDefaultContents.prototype.createBitmapCasts = function() {
    this.bitmapCasts = new Array(2);
    this.bitmapCastsL = {};
    var cast;
    var bbinfo;
    var bbmat;
    
    this.bitmapCasts[0] = this.bitmapCastsL["white"] = cast = new MxeBitmap(this, 0, "white");
    cast.rotatable = true;
    cast.alphaBlendable = true;
    cast.scalable = true;
    cast.imageSrc = "images/b0000.png";
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    
    
    this.bitmapCasts[1] = this.bitmapCastsL["black"] = cast = new MxeBitmap(this, 1, "black");
    cast.rotatable = true;
    cast.alphaBlendable = true;
    cast.scalable = true;
    cast.imageSrc = "images/b0001.png";
    cast.presetWidth = 8;
    cast.presetHeight = 8;
    cast.magFilter = GL.LINEAR;
    cast.minFilter = GL.LINEAR;
    cast.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    
};

MxeDefaultContents.prototype.createModelCasts = function() {
    this.modelCasts = new Array(38);
    this.modelCastsL = {};
    var textureCasts = this.textureCasts;
    var model;
    var sector;
    var material;
    var texInfo;
    var vertexSrc;
    
    this.modelCasts[0] = this.modelCastsL["shelf"] = model = new MxeModel(this, 0, "shelf");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -0.038270, 0.484850, 1.001480, -0.038270, 0.484850, 0.092390, -0.092390, 0.484850, 0.038270, -1.001480, 0.484850, 0.038270, -1.001480, 0.424240, 0.038270, -0.038270, 0.424240, 1.001480, -0.092390, 0.424240, 0.038270, -0.038270, 0.424240, 0.092390, -0.038270, -0.150970, 1.001480, -0.038270, -0.150970, 0.092390, -0.092390, -0.150970, 0.038270, -1.001480, -0.150970, 0.038270, -1.001480, -0.215910, 0.038270, -0.038270, -0.215910, 1.001480, -0.092390, -0.215910, 0.038270, -0.038270, -0.215910, 0.092390, -0.038270, -0.814390, 1.001480, -0.038270, -0.814390, 0.092390, -0.092390, -0.814390, 0.038270, -1.001480, -0.814390, 0.038270, -1.001480, -0.875540, 0.038270, -0.038270, -0.875540, 1.001480, -0.092390, -0.875540, 0.038270, -0.038270, -0.875540, 0.092390, -1.001480, 1.000000, -0.038270, -1.001480, -1.000000, -0.038270, -1.001480, -1.000000, 0.038270, -1.001480, 1.000000, 0.038270, -0.038270, 1.000000, 0.092390, -0.038270, -1.000000, 0.092390, -0.038270, -1.000000, 1.001480, -0.038270, 1.000000, 1.001480, -0.092390, 1.000000, 0.038270, -0.092390, -1.000000, 0.038270, 1.001480, 0.484850, 0.038270, 0.092390, 0.484850, 0.038270, 0.038270, 0.484850, 0.092390, 0.038270, 0.484850, 1.001480, 0.038270, 0.424240, 1.001480, 1.001480, 0.424240, 0.038270, 0.038270, 0.424240, 0.092390, 0.092390, 0.424240, 0.038270, 1.001480, -0.150970, 0.038270, 0.092390, -0.150970, 0.038270, 0.038270, -0.150970, 0.092390, 0.038270, -0.150970, 1.001480, 0.038270, -0.215910, 1.001480, 1.001480, -0.215910, 0.038270, 0.038270, -0.215910, 0.092390, 0.092390, -0.215910, 0.038270, 1.001480, -0.814390, 0.038270, 0.092390, -0.814390, 0.038270, 0.038270, -0.814390, 0.092390, 0.038270, -0.814390, 1.001480, 0.038270, -0.875540, 1.001480, 1.001480, -0.875540, 0.038270, 0.038270, -0.875540, 0.092390, 0.092390, -0.875540, 0.038270, 1.001480, 1.000000, 0.038270, 1.001480, -1.000000, 0.038270, 1.001480, -1.000000, -0.038270, 1.001480, 1.000000, -0.038270, 0.038270, 1.000000, 1.001480, 0.038270, -1.000000, 1.001480, 0.038270, -1.000000, 0.092390, 0.038270, 1.000000, 0.092390, 0.092390, -1.000000, 0.038270, 0.092390, 1.000000, 0.038270, -1.001480, 0.484850, -0.038270, -0.092390, 0.484850, -0.038270, -0.038270, 0.484850, -0.092390, -0.038270, 0.484850, -1.001480, -0.038270, 0.424240, -1.001480, -1.001480, 0.424240, -0.038270, -0.038270, 0.424240, -0.092390, -0.092390, 0.424240, -0.038270, -1.001480, -0.150970, -0.038270, -0.092390, -0.150970, -0.038270, -0.038270, -0.150970, -0.092390, -0.038270, -0.150970, -1.001480, -0.038270, -0.215910, -1.001480, -1.001480, -0.215910, -0.038270, -0.038270, -0.215910, -0.092390, -0.092390, -0.215910, -0.038270, -1.001480, -0.814390, -0.038270, -0.092390, -0.814390, -0.038270, -0.038270, -0.814390, -0.092390, -0.038270, -0.814390, -1.001480, -0.038270, -0.875540, -1.001480, -1.001480, -0.875540, -0.038270, -0.038270, -0.875540, -0.092390, -0.092390, -0.875540, -0.038270, -1.001480, 1.000000, -0.038270, -1.001480, -1.000000, -0.038270, -1.001480, -1.000000, 0.038270, -1.001480, 1.000000, 0.038270, -0.038270, 1.000000, -1.001480, -0.038270, -1.000000, -1.001480, -0.038270, -1.000000, -0.092390, -0.038270, 1.000000, -0.092390, -0.092390, -1.000000, -0.038270, -0.092390, 1.000000, -0.038270, 0.038270, 0.484850, -1.001480, 0.038270, 0.484850, -0.092390, 0.092390, 0.484850, -0.038270, 1.001480, 0.484850, -0.038270, 1.001480, 0.424240, -0.038270, 0.038270, 0.424240, -1.001480, 0.092390, 0.424240, -0.038270, 0.038270, 0.424240, -0.092390, 0.038270, -0.150970, -1.001480, 0.038270, -0.150970, -0.092390, 0.092390, -0.150970, -0.038270, 1.001480, -0.150970, -0.038270, 1.001480, -0.215910, -0.038270, 0.038270, -0.215910, -1.001480, 0.092390, -0.215910, -0.038270, 0.038270, -0.215910, -0.092390, 0.038270, -0.814390, -1.001480, 0.038270, -0.814390, -0.092390, 0.092390, -0.814390, -0.038270, 1.001480, -0.814390, -0.038270, 1.001480, -0.875540, -0.038270, 0.038270, -0.875540, -1.001480, 0.092390, -0.875540, -0.038270, 0.038270, -0.875540, -0.092390, 1.001480, 1.000000, 0.038270, 1.001480, -1.000000, 0.038270, 1.001480, -1.000000, -0.038270, 1.001480, 1.000000, -0.038270, 0.038270, 1.000000, -0.092390, 0.038270, -1.000000, -0.092390, 0.038270, -1.000000, -1.001480, 0.038270, 1.000000, -1.001480, 0.092390, 1.000000, -0.038270, 0.092390, -1.000000, -0.038270, 
        ]),
        normal: F32A([
            -0.289713, 0.819431, 0.494570, 0.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, -0.397052, 0.561517, -0.725981, -0.569268, -0.805067, 0.166735, -0.205599, -0.581522, 0.787122, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, -0.289713, 0.819431, 0.494570, 0.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, -0.397052, 0.561517, -0.725981, -0.569268, -0.805067, 0.166735, -0.205599, -0.581522, 0.787122, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, -0.160482, 0.907821, 0.387437, 0.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, -0.773459, 0.546918, -0.320377, -0.330201, -0.933949, -0.136774, -0.336557, -0.475963, 0.812520, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, -0.666667, 0.333333, -0.666667, -0.408248, -0.816497, -0.408248, -0.666667, -0.333333, 0.666667, -0.408248, 0.816497, 0.408248, -0.659908, 0.731307, 0.172371, -0.588510, -0.731307, 0.344741, -0.666667, -0.333333, 0.666667, -0.408248, 0.816497, 0.408248, -0.773459, 0.546918, -0.320377, -0.330201, -0.933949, -0.136774, 0.569268, 0.805067, 0.166735, 0.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.205599, 0.581522, 0.787122, 0.289713, -0.819431, 0.494570, 0.397052, -0.561517, -0.725981, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.569268, 0.805067, 0.166735, 0.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.205599, 0.581522, 0.787122, 0.289713, -0.819431, 0.494570, 0.397052, -0.561517, -0.725981, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.330201, 0.933949, -0.136774, 0.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.336557, 0.475963, 0.812520, 0.160482, -0.907821, 0.387437, 0.773459, -0.546918, -0.320377, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.666667, 0.333333, 0.666667, 0.408248, -0.816497, 0.408248, 0.666667, -0.333333, -0.666667, 0.408248, 0.816497, -0.408248, 0.666667, 0.333333, 0.666667, 0.408248, -0.816497, 0.408248, 0.659908, -0.731307, 0.172371, 0.588510, 0.731307, 0.344741, 0.773459, -0.546918, -0.320377, 0.330201, 0.933949, -0.136774, -0.569268, 0.805067, -0.166735, 0.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, -0.205599, 0.581522, -0.787122, -0.289713, -0.819431, -0.494570, -0.397052, -0.561517, 0.725981, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, -0.569268, 0.805067, -0.166735, 0.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, -0.205599, 0.581522, -0.787122, -0.289713, -0.819431, -0.494570, -0.397052, -0.561517, 0.725981, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, -0.330201, 0.933949, 0.136774, 0.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, -0.336557, 0.475963, -0.812520, -0.160482, -0.907821, -0.387437, -0.773459, -0.546918, 0.320377, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, -0.666667, 0.333333, -0.666667, -0.408248, -0.816497, -0.408248, -0.666667, -0.333333, 0.666667, -0.408248, 0.816497, 0.408248, -0.666667, 0.333333, -0.666667, -0.408248, -0.816497, -0.408248, -0.659908, -0.731307, -0.172371, -0.588510, 0.731307, -0.344741, -0.773459, -0.546918, 0.320377, -0.330201, 0.933949, 0.136774, 0.289713, 0.819431, -0.494570, 0.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.397052, 0.561517, 0.725981, 0.569268, -0.805067, -0.166735, 0.205599, -0.581522, -0.787122, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.289713, 0.819431, -0.494570, 0.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.397052, 0.561517, 0.725981, 0.569268, -0.805067, -0.166735, 0.205599, -0.581522, -0.787122, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.160482, 0.907821, -0.387437, 0.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.773459, 0.546918, 0.320377, 0.330201, -0.933949, 0.136774, 0.336557, -0.475963, -0.812520, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.666667, 0.333333, 0.666667, 0.408248, -0.816497, 0.408248, 0.666667, -0.333333, -0.666667, 0.408248, 0.816497, -0.408248, 0.659908, 0.731307, -0.172371, 0.588510, -0.731307, -0.344741, 0.666667, -0.333333, -0.666667, 0.408248, 0.816497, -0.408248, 0.773459, 0.546918, 0.320377, 0.330201, -0.933949, 0.136774, 
        ]),
        texture: [
            F32A([
                0.000000, 0.164035, 0.437168, 0.349264, 0.437168, 0.371318, 0.000000, 0.556547, 0.000000, 0.574012, 0.000000, 0.181500, 0.437168, 0.388783, 0.437168, 0.366729, 0.000000, 0.347246, 0.437168, 0.532475, 0.437168, 0.554529, 0.000000, 0.739758, 0.000000, 0.758470, 0.000000, 0.365958, 0.437168, 0.573241, 0.437168, 0.551187, 0.000000, 0.538410, 0.437168, 0.723638, 0.437168, 0.745693, 0.000000, 0.930921, 0.000000, 0.948542, 0.000000, 0.556030, 0.437168, 0.763313, 0.437168, 0.741259, 0.036807, 0.423702, 0.036807, 1.000000, 0.000000, 0.984405, 0.000000, 0.408107, 0.437168, 0.200824, 0.437168, 0.777122, 0.000000, 0.591893, 0.000000, 0.015595, 0.437168, 0.222878, 0.437168, 0.799176, 0.963193, 0.148440, 0.526025, 0.333669, 0.473975, 0.333669, 0.036807, 0.148440, 0.036807, 0.165905, 0.963193, 0.165905, 0.473975, 0.351133, 0.526025, 0.351133, 0.963193, 0.331651, 0.526025, 0.516880, 0.473975, 0.516880, 0.036807, 0.331651, 0.036807, 0.350363, 0.963193, 0.350363, 0.473975, 0.535592, 0.526025, 0.535592, 0.963193, 0.522814, 0.526025, 0.708043, 0.473975, 0.708043, 0.036807, 0.522814, 0.036807, 0.540435, 0.963193, 0.540435, 0.473975, 0.725664, 0.526025, 0.725664, 0.963193, 0.000000, 0.963193, 0.576298, 1.000000, 0.591893, 1.000000, 0.015595, 0.036807, 0.000000, 0.036807, 0.576298, 0.473975, 0.761527, 0.473975, 0.185229, 0.526025, 0.761527, 0.526025, 0.185229, 0.036807, 0.572142, 0.473975, 0.386913, 0.526025, 0.386913, 0.963193, 0.572142, 0.963193, 0.589607, 0.036807, 0.589607, 0.526025, 0.404378, 0.473975, 0.404378, 0.036807, 0.755353, 0.473975, 0.570124, 0.526025, 0.570124, 0.963193, 0.755353, 0.963193, 0.774065, 0.036807, 0.774065, 0.526025, 0.588836, 0.473975, 0.588836, 0.036807, 0.946517, 0.473975, 0.761288, 0.526025, 0.761288, 0.963193, 0.946517, 0.963193, 0.964137, 0.036807, 0.964137, 0.526025, 0.778908, 0.473975, 0.778908, 0.036807, 0.423702, 0.036807, 1.000000, 0.000000, 0.984405, 0.000000, 0.408107, 0.963193, 0.423702, 0.963193, 1.000000, 0.526025, 0.814771, 0.526025, 0.238473, 0.473975, 0.814771, 0.473975, 0.238473, 1.000000, 0.556547, 0.562832, 0.371318, 0.562832, 0.349264, 1.000000, 0.164035, 1.000000, 0.181500, 1.000000, 0.574012, 0.562832, 0.366729, 0.562832, 0.388783, 1.000000, 0.739758, 0.562832, 0.554529, 0.562832, 0.532475, 1.000000, 0.347246, 1.000000, 0.365958, 1.000000, 0.758470, 0.562832, 0.551187, 0.562832, 0.573241, 1.000000, 0.930921, 0.562832, 0.745693, 0.562832, 0.723638, 1.000000, 0.538410, 1.000000, 0.556030, 1.000000, 0.948542, 0.562832, 0.741259, 0.562832, 0.763313, 0.963193, 0.000000, 0.963193, 0.576298, 1.000000, 0.591893, 1.000000, 0.015595, 0.562832, 0.222878, 0.562832, 0.799176, 1.000000, 0.984405, 1.000000, 0.408107, 0.562832, 0.200824, 0.562832, 0.777122, 
            ]),
        ],
        index: UI16A([
            24, 25, 26, 24, 26, 27, 28, 29, 30, 28, 30, 31, 32, 33, 29, 32, 29, 28, 58, 59, 60, 58, 60, 61, 62, 63, 64, 62, 64, 65, 65, 64, 66, 65, 66, 67, 24, 61, 60, 24, 60, 25, 25, 60, 59, 25, 59, 26, 26, 59, 58, 26, 58, 27, 27, 58, 61, 27, 61, 24, 29, 64, 63, 29, 63, 30, 30, 63, 62, 30, 62, 31, 31, 62, 65, 31, 65, 28, 32, 67, 66, 32, 66, 33, 33, 66, 64, 33, 64, 29, 28, 65, 67, 28, 67, 32, 92, 93, 94, 92, 94, 95, 96, 97, 98, 96, 98, 99, 99, 98, 100, 99, 100, 101, 126, 127, 128, 126, 128, 129, 130, 131, 132, 130, 132, 133, 134, 135, 131, 134, 131, 130, 94, 127, 126, 94, 126, 95, 93, 128, 127, 93, 127, 94, 92, 129, 128, 92, 128, 93, 95, 126, 129, 95, 129, 92, 97, 132, 131, 97, 131, 98, 96, 133, 132, 96, 132, 97, 99, 130, 133, 99, 133, 96, 100, 135, 134, 100, 134, 101, 98, 131, 135, 98, 135, 100, 101, 134, 130, 101, 130, 99, 0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 5, 4, 6, 7, 4, 7, 5, 8, 9, 10, 8, 10, 11, 12, 13, 8, 12, 8, 11, 12, 14, 15, 12, 15, 13, 16, 17, 18, 16, 18, 19, 19, 20, 21, 19, 21, 16, 20, 22, 23, 20, 23, 21, 34, 35, 36, 34, 36, 37, 38, 39, 34, 38, 34, 37, 38, 40, 41, 38, 41, 39, 42, 43, 44, 42, 44, 45, 42, 45, 46, 42, 46, 47, 46, 48, 49, 46, 49, 47, 50, 51, 52, 50, 52, 53, 53, 54, 55, 53, 55, 50, 54, 56, 57, 54, 57, 55, 0, 37, 36, 0, 36, 1, 1, 36, 35, 1, 35, 2, 2, 35, 34, 2, 34, 3, 3, 34, 39, 3, 39, 4, 5, 38, 37, 5, 37, 0, 4, 39, 41, 4, 41, 6, 6, 41, 40, 6, 40, 7, 7, 40, 38, 7, 38, 5, 8, 45, 44, 8, 44, 9, 9, 44, 43, 9, 43, 10, 10, 43, 42, 10, 42, 11, 13, 46, 45, 13, 45, 8, 11, 42, 47, 11, 47, 12, 12, 47, 49, 12, 49, 14, 14, 49, 48, 14, 48, 15, 15, 48, 46, 15, 46, 13, 16, 53, 52, 16, 52, 17, 17, 52, 51, 17, 51, 18, 18, 51, 50, 18, 50, 19, 19, 50, 55, 19, 55, 20, 21, 54, 53, 21, 53, 16, 20, 55, 57, 20, 57, 22, 22, 57, 56, 22, 56, 23, 23, 56, 54, 23, 54, 21, 68, 69, 70, 68, 70, 71, 72, 73, 68, 72, 68, 71, 72, 74, 75, 72, 75, 73, 76, 77, 78, 76, 78, 79, 76, 79, 80, 76, 80, 81, 80, 82, 83, 80, 83, 81, 84, 85, 86, 84, 86, 87, 87, 88, 89, 87, 89, 84, 88, 90, 91, 88, 91, 89, 102, 103, 104, 102, 104, 105, 102, 105, 106, 102, 106, 107, 106, 108, 109, 106, 109, 107, 110, 111, 112, 110, 112, 113, 114, 115, 110, 114, 110, 113, 114, 116, 117, 114, 117, 115, 118, 119, 120, 118, 120, 121, 121, 122, 123, 121, 123, 118, 122, 124, 125, 122, 125, 123, 70, 103, 102, 70, 102, 71, 69, 104, 103, 69, 103, 70, 68, 105, 104, 68, 104, 69, 73, 106, 105, 73, 105, 68, 71, 102, 107, 71, 107, 72, 75, 108, 106, 75, 106, 73, 74, 109, 108, 74, 108, 75, 72, 107, 109, 72, 109, 74, 78, 111, 110, 78, 110, 79, 77, 112, 111, 77, 111, 78, 76, 113, 112, 76, 112, 77, 79, 110, 115, 79, 115, 80, 81, 114, 113, 81, 113, 76, 83, 116, 114, 83, 114, 81, 82, 117, 116, 82, 116, 83, 80, 115, 117, 80, 117, 82, 86, 119, 118, 86, 118, 87, 85, 120, 119, 85, 119, 86, 84, 121, 120, 84, 120, 85, 89, 122, 121, 89, 121, 84, 87, 118, 123, 87, 123, 88, 91, 124, 122, 91, 122, 89, 90, 125, 124, 90, 124, 91, 88, 123, 125, 88, 125, 90, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 696;
    sector.boxMin = F32A([-1.001480, -1.000000, -1.001480]);
    sector.boxMax = F32A([1.001480, 1.000000, 1.001480]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([0.882353, 0.882353, 0.882353, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.000000, 0.000000, 0.000000]);
    material.shininess = 0.000000;
    material.enableFog = false;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[0];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[1] = this.modelCastsL["background"] = model = new MxeModel(this, 1, "background");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[2] = this.modelCastsL["panel0"] = model = new MxeModel(this, 2, "panel0");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[2];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[3] = this.modelCastsL["panel1"] = model = new MxeModel(this, 3, "panel1");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[3];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[4] = this.modelCastsL["panel2"] = model = new MxeModel(this, 4, "panel2");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[4];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[5] = this.modelCastsL["panel3"] = model = new MxeModel(this, 5, "panel3");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[5];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[6] = this.modelCastsL["panel4"] = model = new MxeModel(this, 6, "panel4");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[6];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[7] = this.modelCastsL["panel5"] = model = new MxeModel(this, 7, "panel5");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[7];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[8] = this.modelCastsL["panel6"] = model = new MxeModel(this, 8, "panel6");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[8];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[9] = this.modelCastsL["panel7"] = model = new MxeModel(this, 9, "panel7");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[9];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[10] = this.modelCastsL["panel8"] = model = new MxeModel(this, 10, "panel8");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[10];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[11] = this.modelCastsL["panel9"] = model = new MxeModel(this, 11, "panel9");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[11];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[12] = this.modelCastsL["panel10"] = model = new MxeModel(this, 12, "panel10");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[12];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[13] = this.modelCastsL["panel11"] = model = new MxeModel(this, 13, "panel11");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[13];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[14] = this.modelCastsL["panel12"] = model = new MxeModel(this, 14, "panel12");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[14];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[15] = this.modelCastsL["panel13"] = model = new MxeModel(this, 15, "panel13");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[15];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[16] = this.modelCastsL["panel14"] = model = new MxeModel(this, 16, "panel14");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[16];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[17] = this.modelCastsL["panel15"] = model = new MxeModel(this, 17, "panel15");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[17];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[18] = this.modelCastsL["panel16"] = model = new MxeModel(this, 18, "panel16");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[18];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[19] = this.modelCastsL["panel17"] = model = new MxeModel(this, 19, "panel17");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[19];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[20] = this.modelCastsL["panel18"] = model = new MxeModel(this, 20, "panel18");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[20];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[21] = this.modelCastsL["panel19"] = model = new MxeModel(this, 21, "panel19");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[21];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[22] = this.modelCastsL["panel20"] = model = new MxeModel(this, 22, "panel20");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[22];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[23] = this.modelCastsL["panel21"] = model = new MxeModel(this, 23, "panel21");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[23];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[24] = this.modelCastsL["panel22"] = model = new MxeModel(this, 24, "panel22");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[24];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[25] = this.modelCastsL["panel23"] = model = new MxeModel(this, 25, "panel23");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[25];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[26] = this.modelCastsL["panel24"] = model = new MxeModel(this, 26, "panel24");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[26];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[27] = this.modelCastsL["panel25"] = model = new MxeModel(this, 27, "panel25");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[27];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[28] = this.modelCastsL["panel26"] = model = new MxeModel(this, 28, "panel26");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[28];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[29] = this.modelCastsL["panel27"] = model = new MxeModel(this, 29, "panel27");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[29];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[30] = this.modelCastsL["panel28"] = model = new MxeModel(this, 30, "panel28");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[30];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[31] = this.modelCastsL["panel29"] = model = new MxeModel(this, 31, "panel29");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[31];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[32] = this.modelCastsL["panel30"] = model = new MxeModel(this, 32, "panel30");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[32];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[33] = this.modelCastsL["panel31"] = model = new MxeModel(this, 33, "panel31");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[33];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[34] = this.modelCastsL["panel32"] = model = new MxeModel(this, 34, "panel32");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[34];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[35] = this.modelCastsL["panel33"] = model = new MxeModel(this, 35, "panel33");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[35];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[36] = this.modelCastsL["panel34"] = model = new MxeModel(this, 36, "panel34");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[36];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
    
    this.modelCasts[37] = this.modelCastsL["panel35"] = model = new MxeModel(this, 37, "panel35");
    model.sectors = new Array(1);
    model.sectorsL = {};
    
    vertexSrc = {
        position: F32A([
            -50.000000, -50.000000, 0.000000, 50.000000, -50.000000, 0.000000, -50.000000, 50.000000, 0.000000, 50.000000, 50.000000, 0.000000, 
        ]),
        normal: F32A([
            0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 0.000000, 0.000000, -1.000000, 
        ]),
        texture: [
            F32A([
                0.000000, 1.000000, 1.000000, 1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 
            ]),
        ],
        index: UI16A([
            2, 3, 1, 2, 1, 0, 
        ]),
    };
    model.sectors[0] = model.sectorsL["グループ0"] = sector = new MxeSector(model, 0, "グループ0");
    sector.vertexSrc = vertexSrc;
    sector.indexLength = 6;
    sector.boxMin = F32A([-50.000000, -50.000000, 0.000000]);
    sector.boxMax = F32A([50.000000, 50.000000, 0.000000]);
    
    sector.material = material = new MxeMaterial();
    material.color = F32A([1.000000, 1.000000, 1.000000, 1.000000]);
    material.emissionColor = F32A([0.000000, 0.000000, 0.000000]);
    material.specularColor = F32A([0.700000, 0.700000, 0.700000]);
    material.shininess = 0.000000;
    texInfo = material.textureInfo[0] = new MxeSectorTextureInfo();
    texInfo.cast = this.textureCasts[37];
    texInfo.option = 0;
    texInfo.mapType = 0;
    texInfo.blendValue = 0.000000;
    texInfo.blendMode = 0;
    material.blendFactorSrc = GL.SRC_ALPHA;
    material.blendFactorDst = GL.ONE_MINUS_SRC_ALPHA;
    material.blendFactorAlphaSrc = GL.SRC_ALPHA;
    material.blendFactorAlphaDst = GL.DST_ALPHA;
    material.clippingValue = 1.000000;
    
    
    
};

MxeDefaultContents.prototype.createCameraCasts = function() {
    this.cameraCasts = new Array(1);
    this.cameraCastsL = {};
    var camera;
    
    this.cameraCasts[0] = this.cameraCastsL["カメラ0"] = camera = new MxeCamera(this, 0, "カメラ0");
    camera.cameraAngle = 36.869896;
    camera.near = 10.000000;
    camera.far = 5000.000000;
    camera.fogEnable = false;
    camera.fogColor = F32A([1.000000, 1.000000, 1.000000]);
    camera.fogNear = 1.000000;
    camera.fogFar = 5000.000000;
    camera.fogDensity = 0.000000;
    
};

MxeDefaultContents.prototype.createLightCasts= function() {
    this.lightCasts = new Array(1);
    this.lightCastsL = {};
    var light;
    
    this.lightCasts[0] = this.lightCastsL["環境光0"] = light = new MxeLight(this, 0, "環境光0");
    light.type = 3;
    light.color = F32A([0.494118, 0.494118, 0.494118]);
    
    this.lightCasts[1] = this.lightCastsL["平行光1"] = light = new MxeLight(this, 1, "平行光1");
    light.type = 0;
    light.color = F32A([1.000000, 1.000000, 1.000000]);
    
};

MxeDefaultContents.prototype.createTextCasts= function() {
    this.textCasts = new Array(4);
    this.textCastsL = {};
    var text;
    
    this.textCasts[0] = this.textCastsL["ghost"] = text = new MxeText(this, 0, "ghost");
    text.rotateCenter = F32A([0.000000, 0.000000, 0]);
    text.color = F32A([1.000000, 1.000000, 1.000000, 1.0]);
    text.backgroundColor = F32A([0.000000, 0.000000, 0.000000, 1.0]);
    text.bgTransparent = true;
    text.fontSize = 8.000000;
    text.fontFamily = "'Tahoma'";
    text.lines = new Array(0);
    
    this.textCasts[1] = this.textCastsL["NameText"] = text = new MxeText(this, 1, "NameText");
    text.presetWidth = 131;
    text.presetHeight = 28;
    text.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    text.color = F32A([1.000000, 1.000000, 1.000000, 1.0]);
    text.backgroundColor = F32A([0.000000, 0.000000, 0.000000, 1.0]);
    text.bgTransparent = true;
    text.fontSize = 17.000000;
    text.fontFamily = "'Tahoma'";
    text.lines = new Array(1);
    text.lines[0] = "敍獳条呥硥t";
    
    this.textCasts[2] = this.textCastsL["PriceText"] = text = new MxeText(this, 2, "PriceText");
    text.presetWidth = 98;
    text.presetHeight = 29;
    text.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    text.color = F32A([1.000000, 1.000000, 1.000000, 1.0]);
    text.backgroundColor = F32A([0.000000, 0.000000, 0.000000, 1.0]);
    text.bgTransparent = true;
    text.fontSize = 18.000000;
    text.fontFamily = "'Tahoma'";
    text.lines = new Array(1);
    text.lines[0] = "牐捩呥硥t";
    
    this.textCasts[3] = this.textCastsL["Caption"] = text = new MxeText(this, 3, "Caption");
    text.presetWidth = 79;
    text.presetHeight = 29;
    text.rotateCenter = F32A([-0.000000, -0.000000, 0]);
    text.color = F32A([1.000000, 1.000000, 1.000000, 1.0]);
    text.backgroundColor = F32A([0.000000, 0.000000, 0.000000, 1.0]);
    text.bgTransparent = true;
    text.fontSize = 18.000000;
    text.fontFamily = "'Tahoma'";
    text.lines = new Array(1);
    text.lines[0] = "慃瑰潩n";
    
};

MxeDefaultContents.prototype.createMovieCasts= function() {
    this.movieCasts = [];
    this.movieCastsL = {};
    var cast;
};

MxeDefaultContents.prototype.createShaderCasts= function() {
    this.shaderCasts = new Array(1);
    this.shaderCastsL = {};
    var cast;
    
    this.shaderCasts[0] = this.shaderCastsL["Default"] = cast = new MxeShader(this, 0, "Default");
    cast.vsSrc = "\
        #define USE_TEXTURE\n\
        #define USE_TEXTUR2\n\
        #define USE_FOG_FNC\n\
        #define USE_D_LIGHT\n\
        #define USE_ALFATST\n\
        //\n\
        #define USE_SKIN_SHADER \n\
        #define TOTAL_USE_LIGHT 4\n\
        //#define USE_SPHERE_MAPPING \n\
        //#define USE_POINT_SPOT_LIGHT\n\
        //#define USE_VERTEX_COLOR\n\
        #ifdef USE_D_LIGHT  \n\
        #define USE_SPHERE_MAPPING \n\
        #endif\n\
        \n\
        precision highp float;\n\
        #define MEDIUMP   mediump\n\
        #define MAXLIGHT 8 \n\
        \n\
        // matrix\n\
        uniform mat4   uWorldMatrix;\n\
        uniform mat4   uViewProjMatrix;\n\
        //uniform mat4 uViewMatrix;\n\
        //uniform mat4 uProjMatrix;\n\
        //uniform mat4 uWorldViewProjMatrix;\n\
        #ifdef USE_SPHERE_MAPPING\n\
        uniform mat4   uViewMatrix;\n\
        uniform int    uWrapMode[3]; // 0:normal, 1:spher map\n\
        #endif\n\
        \n\
        // material\n\
        uniform vec4   uMatDiffuse;\n\
        uniform vec3   uMatSpecular, uMatEmissive;\n\
        uniform float  uPower;\n\
        \n\
        // camera\n\
        uniform vec3   uCameraPos;\n\
        #ifdef USE_FOG_FNC\n\
        //uniform float   uFogStart; \n\
        uniform float  uFogEnd; \n\
        uniform float  uFogFactor; // uFogFactor = 1 / (uFogEnd - uFogStart);  0:off\n\
        #endif\n\
        \n\
        // light\n\
        uniform vec3   uLightAmbient;\n\
        #ifdef USE_D_LIGHT\n\
        uniform int uLightType[MAXLIGHT]; // 0:none, 1:directional, 2:point, 3:spot\n\
        uniform vec3   uLightDir[MAXLIGHT];\n\
        uniform vec3   uLightPos[MAXLIGHT];\n\
        uniform vec3   uLightCol[MAXLIGHT];\n\
        #ifdef USE_POINT_SPOT_LIGHT \n\
        uniform float  uLightAtt0[MAXLIGHT]; \n\
        uniform float  uLightAtt1[MAXLIGHT];\n\
        uniform float  uLightAtt2[MAXLIGHT];\n\
        uniform float  uSpotExponent[MAXLIGHT];\n\
        uniform float  uSpotCutoff[MAXLIGHT];\n\
        #endif\n\
        #endif\n\
        \n\
        #ifdef USE_SKIN_SHADER\n\
        uniform mat4   uBlendMatrix[5]; // blend0 is world matrix\n\
        uniform int    uNBlend;\n\
        #endif\n\
        \n\
        // user value\n\
        uniform float  uUserFloatArray[10];\n\
        uniform int    uUserIntArray[10];\n\
        \n\
        // e.t.c\n\
        //uniform float uTime;\n\
        //uniform int  uRandom;\n\
        \n\
        // vertex attribute\n\
        attribute vec3 atVertex, atNormal;\n\
        attribute vec4 atVColor;\n\
        #ifdef USE_TEXTURE\n\
        attribute vec2 atUV0, atUV1, atUV2;\n\
        #endif\n\
        #ifdef USE_SKIN_SHADER\n\
        attribute vec3 atWeight0, atWeight1;\n\
        #endif\n\
        \n\
        // output\n\
        varying vec4   vrDiffuse;\n\
        \n\
        #ifdef USE_TEXTURE\n\
        varying vec2   vrTexCord0, vrTexCord1, vrTexCord2;\n\
        #endif\n\
        \n\
        #ifdef USE_D_LIGHT\n\
        varying vec3   vrSpecular;\n\
        #endif\n\
        \n\
        #ifdef USE_FOG_FNC\n\
        varying float  vrFogIntensity;\n\
        #endif\n\
        \n\
        //--------------------------------------------------------------------\n\
        // Gloabal\n\
        //--------------------------------------------------------------------\n\
        \n\
        mat4 worldMatrix;\n\
        vec4 worldVPos;\n\
        \n\
        #ifdef USE_D_LIGHT\n\
        vec4 worldNormal;\n\
        vec3 worldNormalInv;\n\
        vec3 fromCamera;\n\
        MEDIUMP vec3 diffuse;\n\
        MEDIUMP vec3 specular;\n\
        #endif\n\
        \n\
        //--------------------------------------------------------------------\n\
        // Subroutine\n\
        //--------------------------------------------------------------------\n\
        \n\
        #ifdef USE_D_LIGHT\n\
        #if TOTAL_USE_LIGHT > 0\n\
        void LightCulc(int lightID){\n\
           int lightType = uLightType[lightID];\n\
           if (lightType == 0) // light off\n\
              return; \n\
           if (lightType == 1){ // directional light\n\
              float diffuseVP = max(0.0, dot(worldNormalInv, uLightDir[lightID]));\n\
              diffuse += diffuseVP * uLightCol[lightID];\n\
              if (uPower != 0.0){\n\
                 vec3 halfVec = normalize(fromCamera + uLightDir[lightID]);\n\
                 float specularVP = max(0.0, dot(worldNormalInv, halfVec));\n\
                 specular += pow(specularVP, uPower) * uLightCol[lightID];\n\
              }\n\
              return;\n\
           }\n\
        #ifdef USE_POINT_SPOT_LIGHT \n\
           // point,spot light\n\
           vec3 fromLight = vec3(worldVPos) - uLightPos[lightID];\n\
           float length = length(fromLight);\n\
           fromLight = normalize(fromLight);\n\
           float att = 1.0e-6 + uLightAtt0[lightID] + uLightAtt1[lightID] * length +  uLightAtt2[lightID] * length * length;\n\
           att = 1.0 / att;\n\
           if (lightType == 3){ // spot light\n\
              float spotDot = dot(fromLight, uLightDir[lightID]);\n\
              if (spotDot < uSpotCutoff[lightID]) att = 0.0;\n\
              else att *= pow(spotDot, uSpotExponent[lightID]);\n\
           }\n\
           float diffuseVP = max(0.0, dot(worldNormalInv, fromLight));\n\
           diffuse += diffuseVP * uLightCol[lightID] * att;\n\
           if (uPower != 0.0){\n\
              vec3 halfVec2 = normalize(fromCamera + fromLight);\n\
              float specularVP = max(0.0, dot(worldNormalInv, halfVec2));\n\
              specular += pow(specularVP, uPower) * uLightCol[lightID] * att;\n\
           }\n\
        #endif\n\
        }\n\
        #endif\n\
        #endif\n\
        \n\
        //--------------------------------------------------------------------\n\
        // Main\n\
        //--------------------------------------------------------------------\n\
        \n\
        void main(void){\n\
           worldMatrix = uWorldMatrix;\n\
        \n\
        #ifdef USE_SKIN_SHADER\n\
           if (uNBlend > 0){\n\
              worldMatrix = worldMatrix * atWeight0.x + uBlendMatrix[0] * atWeight0.y + uBlendMatrix[1] * atWeight0.z;\n\
              if (uNBlend > 3) worldMatrix += uBlendMatrix[2] * atWeight1.x + uBlendMatrix[3] * atWeight1.y + uBlendMatrix[4] * atWeight1.z;\n\
              worldMatrix[3][3] = 1.0;\n\
           }\n\
        #endif\n\
        \n\
           worldVPos = worldMatrix * vec4(atVertex, 1.0);\n\
           gl_Position = uViewProjMatrix * worldVPos;\n\
        \n\
        #ifdef USE_D_LIGHT\n\
           diffuse = vec3(0.0);\n\
           specular = vec3(0.0);\n\
           worldNormal = normalize(worldMatrix * vec4(atNormal, 0.0)); \n\
           worldNormalInv = - vec3(worldNormal);\n\
        #if TOTAL_USE_LIGHT > 0\n\
           fromCamera = normalize(vec3(worldVPos) - uCameraPos);\n\
           LightCulc(0);\n\
        #endif\n\
        #if TOTAL_USE_LIGHT > 1\n\
           LightCulc(1);\n\
        #endif\n\
        #if TOTAL_USE_LIGHT > 2\n\
           LightCulc(2);\n\
        #endif\n\
        #if TOTAL_USE_LIGHT > 3\n\
           LightCulc(3);\n\
        #endif\n\
        #if TOTAL_USE_LIGHT > 4\n\
           LightCulc(4);\n\
        #endif\n\
        #if TOTAL_USE_LIGHT > 5\n\
           LightCulc(5);\n\
        #endif\n\
        #if TOTAL_USE_LIGHT > 6\n\
           LightCulc(6);\n\
        #endif\n\
        #if TOTAL_USE_LIGHT > 7\n\
           LightCulc(7);\n\
        #endif\n\
        #endif\n\
        \n\
        #ifdef USE_FOG_FNC\n\
           if (uFogFactor == 0.0) vrFogIntensity = 1.0;\n\
           else vrFogIntensity = (uFogEnd - gl_Position.z) * uFogFactor;\n\
           vrFogIntensity = clamp(vrFogIntensity, 0.0, 1.0);\n\
        #endif\n\
        \n\
        #ifdef USE_TEXTURE\n\
        #ifdef USE_SPHERE_MAPPING\n\
           vec4 viewNormal = uViewMatrix * worldNormal;\n\
           if (uWrapMode[0] == 0) vrTexCord0 = atUV0.st;\n\
           else {\n\
              vrTexCord0.x = viewNormal.x *  0.5 + 0.5;\n\
              vrTexCord0.y = viewNormal.y * -0.5 + 0.5;\n\
           }\n\
        #else\n\
           vrTexCord0 = atUV0.st;\n\
        #endif\n\
        #endif\n\
        \n\
        #ifdef USE_TEXTUR2\n\
        #ifdef USE_SPHERE_MAPPING\n\
           if (uWrapMode[1] == 0) vrTexCord1 = atUV1.st;\n\
           else {\n\
              vrTexCord1.x = viewNormal.x *  0.5 + 0.5;\n\
              vrTexCord1.y = viewNormal.y * -0.5 + 0.5;\n\
           }\n\
        #else\n\
           vrTexCord1 = atUV1.st;\n\
        #endif\n\
        #endif\n\
        \n\
        #ifdef USE_VERTEX_COLOR\n\
        #ifdef USE_D_LIGHT\n\
           diffuse = (diffuse + uLightAmbient) * vec3(atVColor) + uMatEmissive;\n\
           vrSpecular = specular * uMatSpecular; \n\
        #else\n\
           diffuse = uLightAmbient * vec3(atVColor) + uMatEmissive;\n\
        #endif\n\
           vrDiffuse = vec4(clamp(diffuse, 0.0, 1.0), atVColor.a * uMatDiffuse.a);\n\
        #else\n\
        #ifdef USE_D_LIGHT\n\
           diffuse = (diffuse + uLightAmbient) * vec3(uMatDiffuse) + uMatEmissive;\n\
           vrSpecular = specular * uMatSpecular; \n\
        #else\n\
           diffuse = uLightAmbient * vec3(uMatDiffuse) + uMatEmissive;\n\
        #endif\n\
           vrDiffuse = vec4(clamp(diffuse, 0.0, 1.0), uMatDiffuse.a);\n\
        #endif\n\
        }\n\
        \n\
        //--------------------------------------------------------------------\n\
        \n\
        \n\
        \n\
        \n\
        \n\
    ";
    
    cast.fsSrc = "\
        #define USE_TEXTURE\n\
        #define USE_TEXTUR2\n\
        #define USE_FOG_FNC\n\
        #define USE_D_LIGHT\n\
        #define USE_ALFATST\n\
        //\n\
        precision mediump float;\n\
        #define HIGHP   highp\n\
        \n\
        //--------------------------------------------------------------------\n\
        // Parameter\n\
        //--------------------------------------------------------------------\n\
        \n\
        uniform sampler2D   uTexture0, uTexture1, uTexture2, uTexture3, uTexture4, uTexture5, uTexture6, uTexture7;\n\
        uniform int         uBlendMode0, uBlendMode1; // 0:none, 1:modurate, 2:add, 3:sub\n\
        uniform float       uBlendValue1;\n\
        //uniform float     uBlendValue2;\n\
        \n\
        uniform vec3        uFogColor;\n\
        \n\
        varying vec4        vrDiffuse;\n\
        \n\
        #ifdef USE_TEXTURE\n\
        varying HIGHP vec2  vrTexCord0, vrTexCord1, vrTexCord2;\n\
        #endif\n\
        \n\
        #ifdef USE_D_LIGHT\n\
        varying vec3        vrSpecular;\n\
        #endif\n\
        \n\
        #ifdef USE_FOG_FNC\n\
        varying float       vrFogIntensity;\n\
        #endif\n\
        \n\
        //--------------------------------------------------------------------\n\
        // Main\n\
        //--------------------------------------------------------------------\n\
        \n\
        void main (void){\n\
          vec3 color = vec3(vrDiffuse);\n\
          float alpha = vrDiffuse.a;\n\
        \n\
        #ifdef USE_TEXTURE\n\
          vec4 texColor;\n\
          if (uBlendMode0 > 0){\n\
            texColor  = vec4(texture2D(uTexture0, vrTexCord0));\n\
            if (uBlendMode0 == 2) color += vec3(texColor);\n\
            else if (uBlendMode0 == 3) color -= vec3(texColor);\n\
            else color *= vec3(texColor);\n\
            alpha *= texColor.a;\n\
          }\n\
        #endif\n\
        \n\
        #ifdef USE_TEXTUR2\n\
          if (uBlendMode1 > 0){\n\
            vec3 texColor1  = vec3(texture2D(uTexture1, vrTexCord1)) * vec3(vrDiffuse) * uBlendValue1;\n\
            if (uBlendMode1 == 2) color += texColor1;\n\
            else if (uBlendMode1 == 3) color -= texColor1;\n\
            else color = color * (1.0 - uBlendValue1) + texColor1;\n\
          }\n\
        #endif\n\
        \n\
        #ifdef USE_D_LIGHT\n\
          color += vrSpecular;\n\
        #endif\n\
        \n\
        #ifdef USE_FOG_FNC\n\
          color = mix(uFogColor, color, vrFogIntensity);\n\
        #endif\n\
        \n\
        #ifdef USE_ALFATST\n\
          if (alpha == 0.0) discard; else \n\
        #endif\n\
        \n\
          gl_FragColor = vec4(color, alpha);\n\
        }\n\
        \n\
    ";
    
};

MxeDefaultContents.prototype.createProceduralCasts= function() {
    this.proceduralCasts = new Array(0);
    this.proceduralCastsL = {};
    var procedural;
    
};

MxeDefaultContents.prototype.createScores = function() {
    this.scores = new Array(4);
    this.scoresL = {};
    this.scores[0] = this.scoresL["スコア0"] = new MxeScore(this, 0, "スコア0");
    this.scores[1] = this.scoresL["shelf"] = new MxeScore(this, 1, "shelf");
    this.scores[2] = this.scoresL["background"] = new MxeScore(this, 2, "background");
    this.scores[3] = this.scoresL["screen"] = new MxeScore(this, 3, "screen");
    var score;
    var track;
    var animation;
    var keyFrame;
    var sectors;
    var casts;
    
    score = this.scores[0];
    score.tracks = new Array(7);
    score.tracksL = {};
    score.maxFrameOfScore = 2;
    score.loops = [
        0, 4, 
    ];
    score.frameLabelPos = {
        "L0": 1,
        length: 1,
    };
    
    score.tracks[0] = track = new MxeTrack3D(score, 0, "");
    track.castType = 7;
    track.cast = this.cameraCasts[0];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([-0.000122, 28.725393, -220.310699]), F32A([0.138132, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([-0.000122, 28.725393, -220.310699]), F32A([0.138132, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[1] = track = new MxeTrack3D(score, 1, "");
    track.castType = 10;
    track.cast = this.scores[3];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[2] = track = new MxeTrack3D(score, 2, "");
    track.castType = 10;
    track.cast = this.scores[1];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[3] = track = new MxeTrack3D(score, 3, "");
    track.castType = 10;
    track.cast = this.scores[2];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 103.150383]), F32A([0.000000, 0.000000, 0.000000]), F32A([10.000000, 10.000000, 10.000000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 103.150383]), F32A([0.000000, 0.000000, 0.000000]), F32A([10.000000, 10.000000, 10.000000]), ];
    
    
    score.tracks[4] = track = new MxeTrack3D(score, 4, "");
    track.castType = 8;
    track.cast = this.lightCasts[1];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([54.307312, 221.123001, -153.429947]), F32A([0.883378, -0.266764, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([54.307312, 221.123001, -153.429947]), F32A([0.883378, -0.266764, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[5] = track = new MxeTrack3D(score, 5, "");
    track.castType = 8;
    track.cast = this.lightCasts[0];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([3.131028, -2.054748, -351.595367]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([3.131028, -2.054748, -351.595367]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[6] = track = new MxeTrack3D(score, 6, "");
    track.castType = 8;
    track.cast = this.lightCasts[0];
    track.maxFrame = 0;
    animation = track.animationData = new Array(1);
    track.visibleData = UI8A(1);
    animation[0] = [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], ];
    
    
    
    
    score = this.scores[1];
    score.tracks = new Array(79);
    score.tracksL = {};
    score.maxFrameOfScore = 2;
    score.selfTrack = this.scores[0].tracks[2];
    score.loops = [
        0, 4, 
    ];
    score.frameLabelPos = {
        length: 0,
    };
    
    score.tracks[0] = score.tracksL["root"] = track = new MxeTrack3D(score, 0, "root");
    track.parentTrack = score.selfTrack;
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[1] = track = new MxeTrack3D(score, 1, "");
    track.parentTrack = score.tracks[0];
    track.castType = 0;
    track.cast = this.modelCasts[0];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000004, 0.000000]), F32A([0.000000, 0.785398, 0.000000]), F32A([50.000000, 50.000000, 50.000000]), ];
    animation[1] = [F32A([0.000000, 0.000004, 0.000000]), F32A([0.000000, 0.785398, 0.000000]), F32A([50.000000, 50.000000, 50.000000]), ];
    
    
    score.tracks[2] = score.tracksL["panel_root"] = track = new MxeTrack3D(score, 2, "panel_root");
    track.parentTrack = score.tracks[0];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[3] = score.tracksL["Axis0"] = track = new MxeTrack3D(score, 3, "Axis0");
    track.parentTrack = score.tracks[2];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([-20.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([-20.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[4] = score.tracksL["L0"] = track = new MxeTrack3D(score, 4, "L0");
    track.parentTrack = score.tracks[3];
    track.castType = 0;
    track.cast = this.modelCasts[2];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[5] = score.tracksL["Axis1"] = track = new MxeTrack3D(score, 5, "Axis1");
    track.parentTrack = score.tracks[2];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[6] = score.tracksL["L1"] = track = new MxeTrack3D(score, 6, "L1");
    track.parentTrack = score.tracks[5];
    track.castType = 0;
    track.cast = this.modelCasts[3];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[7] = score.tracksL["Axis2"] = track = new MxeTrack3D(score, 7, "Axis2");
    track.parentTrack = score.tracks[2];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([20.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([20.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[8] = score.tracksL["L2"] = track = new MxeTrack3D(score, 8, "L2");
    track.parentTrack = score.tracks[7];
    track.castType = 0;
    track.cast = this.modelCasts[4];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[9] = score.tracksL["Axis3"] = track = new MxeTrack3D(score, 9, "Axis3");
    track.parentTrack = score.tracks[2];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([-20.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([-20.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[10] = score.tracksL["L3"] = track = new MxeTrack3D(score, 10, "L3");
    track.parentTrack = score.tracks[9];
    track.castType = 0;
    track.cast = this.modelCasts[5];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[11] = score.tracksL["Axis4"] = track = new MxeTrack3D(score, 11, "Axis4");
    track.parentTrack = score.tracks[2];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[12] = score.tracksL["L4"] = track = new MxeTrack3D(score, 12, "L4");
    track.parentTrack = score.tracks[11];
    track.castType = 0;
    track.cast = this.modelCasts[6];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[13] = score.tracksL["Axis5"] = track = new MxeTrack3D(score, 13, "Axis5");
    track.parentTrack = score.tracks[2];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([20.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([20.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[14] = score.tracksL["L5"] = track = new MxeTrack3D(score, 14, "L5");
    track.parentTrack = score.tracks[13];
    track.castType = 0;
    track.cast = this.modelCasts[7];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[15] = score.tracksL["Axis6"] = track = new MxeTrack3D(score, 15, "Axis6");
    track.parentTrack = score.tracks[2];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([-20.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([-20.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[16] = score.tracksL["L6"] = track = new MxeTrack3D(score, 16, "L6");
    track.parentTrack = score.tracks[15];
    track.castType = 0;
    track.cast = this.modelCasts[8];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[17] = score.tracksL["Axis7"] = track = new MxeTrack3D(score, 17, "Axis7");
    track.parentTrack = score.tracks[2];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[18] = score.tracksL["L7"] = track = new MxeTrack3D(score, 18, "L7");
    track.parentTrack = score.tracks[17];
    track.castType = 0;
    track.cast = this.modelCasts[9];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[19] = score.tracksL["Axis8"] = track = new MxeTrack3D(score, 19, "Axis8");
    track.parentTrack = score.tracks[2];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([20.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([20.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[20] = score.tracksL["L8"] = track = new MxeTrack3D(score, 20, "L8");
    track.parentTrack = score.tracks[19];
    track.castType = 0;
    track.cast = this.modelCasts[10];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[21] = track = new MxeTrack3D(score, 21, "");
    track.parentTrack = score.tracks[0];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, -1.570796, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, -1.570796, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[22] = score.tracksL["Axis9"] = track = new MxeTrack3D(score, 22, "Axis9");
    track.parentTrack = score.tracks[21];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([-20.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([-20.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[23] = score.tracksL["L9"] = track = new MxeTrack3D(score, 23, "L9");
    track.parentTrack = score.tracks[22];
    track.castType = 0;
    track.cast = this.modelCasts[11];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[24] = score.tracksL["Axis10"] = track = new MxeTrack3D(score, 24, "Axis10");
    track.parentTrack = score.tracks[21];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[25] = score.tracksL["L10"] = track = new MxeTrack3D(score, 25, "L10");
    track.parentTrack = score.tracks[24];
    track.castType = 0;
    track.cast = this.modelCasts[12];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[26] = score.tracksL["Axis11"] = track = new MxeTrack3D(score, 26, "Axis11");
    track.parentTrack = score.tracks[21];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([20.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([20.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[27] = score.tracksL["L11"] = track = new MxeTrack3D(score, 27, "L11");
    track.parentTrack = score.tracks[26];
    track.castType = 0;
    track.cast = this.modelCasts[13];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[28] = score.tracksL["Axis12"] = track = new MxeTrack3D(score, 28, "Axis12");
    track.parentTrack = score.tracks[21];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([-20.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([-20.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[29] = score.tracksL["L12"] = track = new MxeTrack3D(score, 29, "L12");
    track.parentTrack = score.tracks[28];
    track.castType = 0;
    track.cast = this.modelCasts[14];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[30] = score.tracksL["Axis13"] = track = new MxeTrack3D(score, 30, "Axis13");
    track.parentTrack = score.tracks[21];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[31] = score.tracksL["L13"] = track = new MxeTrack3D(score, 31, "L13");
    track.parentTrack = score.tracks[30];
    track.castType = 0;
    track.cast = this.modelCasts[15];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[32] = score.tracksL["Axis14"] = track = new MxeTrack3D(score, 32, "Axis14");
    track.parentTrack = score.tracks[21];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([20.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([20.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[33] = score.tracksL["L14"] = track = new MxeTrack3D(score, 33, "L14");
    track.parentTrack = score.tracks[32];
    track.castType = 0;
    track.cast = this.modelCasts[16];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[34] = score.tracksL["Axis15"] = track = new MxeTrack3D(score, 34, "Axis15");
    track.parentTrack = score.tracks[21];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([-20.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([-20.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[35] = score.tracksL["L15"] = track = new MxeTrack3D(score, 35, "L15");
    track.parentTrack = score.tracks[34];
    track.castType = 0;
    track.cast = this.modelCasts[17];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[36] = score.tracksL["Axis16"] = track = new MxeTrack3D(score, 36, "Axis16");
    track.parentTrack = score.tracks[21];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[37] = score.tracksL["L16"] = track = new MxeTrack3D(score, 37, "L16");
    track.parentTrack = score.tracks[36];
    track.castType = 0;
    track.cast = this.modelCasts[18];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[38] = score.tracksL["Axis17"] = track = new MxeTrack3D(score, 38, "Axis17");
    track.parentTrack = score.tracks[21];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([20.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([20.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[39] = score.tracksL["L17"] = track = new MxeTrack3D(score, 39, "L17");
    track.parentTrack = score.tracks[38];
    track.castType = 0;
    track.cast = this.modelCasts[19];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[40] = track = new MxeTrack3D(score, 40, "");
    track.parentTrack = score.tracks[0];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, -3.141593, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, -3.141593, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[41] = score.tracksL["Axis18"] = track = new MxeTrack3D(score, 41, "Axis18");
    track.parentTrack = score.tracks[40];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([-20.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([-20.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[42] = score.tracksL["L18"] = track = new MxeTrack3D(score, 42, "L18");
    track.parentTrack = score.tracks[41];
    track.castType = 0;
    track.cast = this.modelCasts[20];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[43] = score.tracksL["Axis19"] = track = new MxeTrack3D(score, 43, "Axis19");
    track.parentTrack = score.tracks[40];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[44] = score.tracksL["L19"] = track = new MxeTrack3D(score, 44, "L19");
    track.parentTrack = score.tracks[43];
    track.castType = 0;
    track.cast = this.modelCasts[21];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[45] = score.tracksL["Axis20"] = track = new MxeTrack3D(score, 45, "Axis20");
    track.parentTrack = score.tracks[40];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([20.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([20.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[46] = score.tracksL["L20"] = track = new MxeTrack3D(score, 46, "L20");
    track.parentTrack = score.tracks[45];
    track.castType = 0;
    track.cast = this.modelCasts[22];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[47] = score.tracksL["Axis21"] = track = new MxeTrack3D(score, 47, "Axis21");
    track.parentTrack = score.tracks[40];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([-20.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([-20.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[48] = score.tracksL["L21"] = track = new MxeTrack3D(score, 48, "L21");
    track.parentTrack = score.tracks[47];
    track.castType = 0;
    track.cast = this.modelCasts[23];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[49] = score.tracksL["Axis22"] = track = new MxeTrack3D(score, 49, "Axis22");
    track.parentTrack = score.tracks[40];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[50] = score.tracksL["L22"] = track = new MxeTrack3D(score, 50, "L22");
    track.parentTrack = score.tracks[49];
    track.castType = 0;
    track.cast = this.modelCasts[24];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[51] = score.tracksL["Axis23"] = track = new MxeTrack3D(score, 51, "Axis23");
    track.parentTrack = score.tracks[40];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([20.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([20.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[52] = score.tracksL["L23"] = track = new MxeTrack3D(score, 52, "L23");
    track.parentTrack = score.tracks[51];
    track.castType = 0;
    track.cast = this.modelCasts[25];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[53] = score.tracksL["Axis24"] = track = new MxeTrack3D(score, 53, "Axis24");
    track.parentTrack = score.tracks[40];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([-20.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([-20.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[54] = score.tracksL["L24"] = track = new MxeTrack3D(score, 54, "L24");
    track.parentTrack = score.tracks[53];
    track.castType = 0;
    track.cast = this.modelCasts[26];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[55] = score.tracksL["Axis25"] = track = new MxeTrack3D(score, 55, "Axis25");
    track.parentTrack = score.tracks[40];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[56] = score.tracksL["L25"] = track = new MxeTrack3D(score, 56, "L25");
    track.parentTrack = score.tracks[55];
    track.castType = 0;
    track.cast = this.modelCasts[27];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[57] = score.tracksL["Axis26"] = track = new MxeTrack3D(score, 57, "Axis26");
    track.parentTrack = score.tracks[40];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([20.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([20.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[58] = score.tracksL["L26"] = track = new MxeTrack3D(score, 58, "L26");
    track.parentTrack = score.tracks[57];
    track.castType = 0;
    track.cast = this.modelCasts[28];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[59] = track = new MxeTrack3D(score, 59, "");
    track.parentTrack = score.tracks[0];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, -4.712389, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, -4.712389, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[60] = score.tracksL["Axis27"] = track = new MxeTrack3D(score, 60, "Axis27");
    track.parentTrack = score.tracks[59];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([-20.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([-20.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[61] = score.tracksL["L27"] = track = new MxeTrack3D(score, 61, "L27");
    track.parentTrack = score.tracks[60];
    track.castType = 0;
    track.cast = this.modelCasts[29];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[62] = score.tracksL["Axis28"] = track = new MxeTrack3D(score, 62, "Axis28");
    track.parentTrack = score.tracks[59];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[63] = score.tracksL["L28"] = track = new MxeTrack3D(score, 63, "L28");
    track.parentTrack = score.tracks[62];
    track.castType = 0;
    track.cast = this.modelCasts[30];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[64] = score.tracksL["Axis29"] = track = new MxeTrack3D(score, 64, "Axis29");
    track.parentTrack = score.tracks[59];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([20.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([20.000000, 35.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[65] = score.tracksL["L29"] = track = new MxeTrack3D(score, 65, "L29");
    track.parentTrack = score.tracks[64];
    track.castType = 0;
    track.cast = this.modelCasts[31];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[66] = score.tracksL["Axis30"] = track = new MxeTrack3D(score, 66, "Axis30");
    track.parentTrack = score.tracks[59];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([-20.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([-20.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[67] = score.tracksL["L30"] = track = new MxeTrack3D(score, 67, "L30");
    track.parentTrack = score.tracks[66];
    track.castType = 0;
    track.cast = this.modelCasts[32];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[68] = score.tracksL["Axis31"] = track = new MxeTrack3D(score, 68, "Axis31");
    track.parentTrack = score.tracks[59];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[69] = score.tracksL["L31"] = track = new MxeTrack3D(score, 69, "L31");
    track.parentTrack = score.tracks[68];
    track.castType = 0;
    track.cast = this.modelCasts[33];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[70] = score.tracksL["Axis32"] = track = new MxeTrack3D(score, 70, "Axis32");
    track.parentTrack = score.tracks[59];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([20.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([20.000000, 4.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[71] = score.tracksL["L32"] = track = new MxeTrack3D(score, 71, "L32");
    track.parentTrack = score.tracks[70];
    track.castType = 0;
    track.cast = this.modelCasts[34];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[72] = score.tracksL["Axis33"] = track = new MxeTrack3D(score, 72, "Axis33");
    track.parentTrack = score.tracks[59];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([-20.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([-20.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[73] = score.tracksL["L33"] = track = new MxeTrack3D(score, 73, "L33");
    track.parentTrack = score.tracks[72];
    track.castType = 0;
    track.cast = this.modelCasts[35];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[74] = score.tracksL["Axis34"] = track = new MxeTrack3D(score, 74, "Axis34");
    track.parentTrack = score.tracks[59];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([0.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[75] = score.tracksL["L34"] = track = new MxeTrack3D(score, 75, "L34");
    track.parentTrack = score.tracks[74];
    track.castType = 0;
    track.cast = this.modelCasts[36];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[76] = score.tracksL["Axis35"] = track = new MxeTrack3D(score, 76, "Axis35");
    track.parentTrack = score.tracks[59];
    track.castType = 0;
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([20.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    animation[1] = [F32A([20.000000, -28.000000, -40.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    score.tracks[77] = score.tracksL["L35"] = track = new MxeTrack3D(score, 77, "L35");
    track.parentTrack = score.tracks[76];
    track.castType = 0;
    track.cast = this.modelCasts[37];
    track.maxFrame = 2;
    animation = track.animationData = new Array(2);
    track.visibleData = UI8A([0,1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    animation[1] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([0.170000, 0.170000, 0.170000]), ];
    
    
    score.tracks[78] = track = new MxeTrackUnknown(score, 78, "");
    track.castType = 6;
    track.maxFrame = 2;
    
    
    track = score.tracks[1];
    sectors = this.modelCasts[0].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[4];
    sectors = this.modelCasts[2].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[6];
    sectors = this.modelCasts[3].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[8];
    sectors = this.modelCasts[4].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[10];
    sectors = this.modelCasts[5].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[12];
    sectors = this.modelCasts[6].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[14];
    sectors = this.modelCasts[7].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[16];
    sectors = this.modelCasts[8].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[18];
    sectors = this.modelCasts[9].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[20];
    sectors = this.modelCasts[10].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[23];
    sectors = this.modelCasts[11].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[25];
    sectors = this.modelCasts[12].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[27];
    sectors = this.modelCasts[13].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[29];
    sectors = this.modelCasts[14].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[31];
    sectors = this.modelCasts[15].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[33];
    sectors = this.modelCasts[16].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[35];
    sectors = this.modelCasts[17].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[37];
    sectors = this.modelCasts[18].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[39];
    sectors = this.modelCasts[19].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[42];
    sectors = this.modelCasts[20].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[44];
    sectors = this.modelCasts[21].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[46];
    sectors = this.modelCasts[22].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[48];
    sectors = this.modelCasts[23].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[50];
    sectors = this.modelCasts[24].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[52];
    sectors = this.modelCasts[25].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[54];
    sectors = this.modelCasts[26].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[56];
    sectors = this.modelCasts[27].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[58];
    sectors = this.modelCasts[28].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[61];
    sectors = this.modelCasts[29].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[63];
    sectors = this.modelCasts[30].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[65];
    sectors = this.modelCasts[31].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[67];
    sectors = this.modelCasts[32].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[69];
    sectors = this.modelCasts[33].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[71];
    sectors = this.modelCasts[34].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[73];
    sectors = this.modelCasts[35].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[75];
    sectors = this.modelCasts[36].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    track = score.tracks[77];
    sectors = this.modelCasts[37].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    
    
    score = this.scores[2];
    score.tracks = new Array(1);
    score.tracksL = {};
    score.maxFrameOfScore = 1;
    score.selfTrack = this.scores[0].tracks[3];
    score.loops = [
        4, 
    ];
    score.frameLabelPos = {
        "L0": 0,
        length: 1,
    };
    
    score.tracks[0] = track = new MxeTrack3D(score, 0, "");
    track.parentTrack = score.selfTrack;
    track.castType = 0;
    track.cast = this.modelCasts[1];
    track.maxFrame = 1;
    animation = track.animationData = new Array(1);
    track.visibleData = UI8A([1,]);
    animation[0] = [F32A([0.000000, 0.000000, 0.000000]), F32A([0.000000, 0.000000, 0.000000]), F32A([1.000000, 1.000000, 1.000000]), ];
    
    
    track = score.tracks[0];
    sectors = this.modelCasts[1].sectors;
    track.renderList = [
        [0, sectors[0], [track]],
    ];
    
    
    
    score = this.scores[3];
    score.tracks = new Array(7);
    score.tracksL = {};
    score.maxFrameOfScore = 1;
    score.selfTrack = this.scores[0].tracks[1];
    score.loops = [
        4, 
    ];
    score.frameLabelPos = {
        length: 0,
    };
    
    score.tracks[0] = track = new MxeTrack2D(score, 0, "");
    track.castType = 3;
    track.cast = this.textCasts[0];
    track.maxFrame = 1;
    casts = this.textCasts;
    animation = track.animationData = new Array(1);
    animation[0] = [casts[0], [0, 490], [1.000000, 1.000000]];
    
    
    score.tracks[1] = track = new MxeTrack2D(score, 1, "");
    track.parentTrack = score.tracks[0];
    track.castType = 2;
    track.cast = this.bitmapCasts[1];
    track.maxFrame = 1;
    casts = this.bitmapCasts;
    animation = track.animationData = new Array(1);
    animation[0] = [casts[1], [0, 0], [75.000000, 12.500000], 0.000000, 0x00, 0.835294];
    
    
    score.tracks[2] = track = new MxeTrack2D(score, 2, "");
    track.parentTrack = score.tracks[0];
    track.castType = 3;
    track.cast = this.textCasts[1];
    track.maxFrame = 1;
    casts = this.textCasts;
    animation = track.animationData = new Array(1);
    animation[0] = [casts[1], [20, 10], [0.488550, 0.464286]];
    
    
    score.tracks[3] = track = new MxeTrack2D(score, 3, "");
    track.parentTrack = score.tracks[0];
    track.castType = 3;
    track.cast = this.textCasts[2];
    track.maxFrame = 1;
    casts = this.textCasts;
    animation = track.animationData = new Array(1);
    animation[0] = [casts[2], [480, 60], [0.459184, 0.448276]];
    
    
    score.tracks[4] = track = new MxeTrack2D(score, 4, "");
    track.castType = 3;
    track.cast = this.textCasts[0];
    track.maxFrame = 0;
    casts = this.textCasts;
    animation = track.animationData = new Array(0);
    
    
    score.tracks[5] = track = new MxeTrack2D(score, 5, "");
    track.parentTrack = score.tracks[4];
    track.castType = 2;
    track.cast = this.bitmapCasts[1];
    track.maxFrame = 1;
    casts = this.bitmapCasts;
    animation = track.animationData = new Array(1);
    animation[0] = [casts[1], [0, 0], [50.000000, 6.250000], 0.000000, 0x00, 0.835294];
    
    
    score.tracks[6] = track = new MxeTrack2D(score, 6, "");
    track.parentTrack = score.tracks[4];
    track.castType = 3;
    track.cast = this.textCasts[3];
    track.maxFrame = 1;
    casts = this.textCasts;
    animation = track.animationData = new Array(1);
    animation[0] = [casts[3], [20, 10], [1.000000, 1.000000]];
    
    
    track = score.tracks[0];
    track.renderList = [[3, track]];
    
    track = score.tracks[1];
    track.renderList = [[2, track]];
    
    track = score.tracks[2];
    track.renderList = [[3, track]];
    
    track = score.tracks[3];
    track.renderList = [[3, track]];
    
    track = score.tracks[4];
    track.renderList = [[3, track]];
    
    track = score.tracks[5];
    track.renderList = [[2, track]];
    
    track = score.tracks[6];
    track.renderList = [[3, track]];
    
    
};
})();
MxePlayer.registerContentsClass(MxeDefaultContents);
