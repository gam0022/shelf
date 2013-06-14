var MxeDefaultController = function(contents) {
  var score;
  var track;
  var eventproc = MxeDefaultController.eventproc;
  //register event listeners

  score = contents.scores[0];

  score = contents.scores[1];

  track = score.tracks[4];
  track.addEventListener("onclick", eventproc.onCastClick004, this, [1,]);

  track = score.tracks[6];
  track.addEventListener("onclick", eventproc.onCastClick005, this, [1,]);

  track = score.tracks[8];
  track.addEventListener("onclick", eventproc.onCastClick006, this, [1,]);

  track = score.tracks[10];
  track.addEventListener("onclick", eventproc.onCastClick007, this, [1,]);

  track = score.tracks[12];
  track.addEventListener("onclick", eventproc.onCastClick008, this, [1,]);

  track = score.tracks[14];
  track.addEventListener("onclick", eventproc.onCastClick009, this, [1,]);

  track = score.tracks[16];
  track.addEventListener("onclick", eventproc.onCastClick010, this, [1,]);

  track = score.tracks[18];
  track.addEventListener("onclick", eventproc.onCastClick011, this, [1,]);

  track = score.tracks[20];
  track.addEventListener("onclick", eventproc.onCastClick012, this, [1,]);

  track = score.tracks[23];
  track.addEventListener("onclick", eventproc.onCastClick013, this, [1,]);

  track = score.tracks[25];
  track.addEventListener("onclick", eventproc.onCastClick014, this, [1,]);

  track = score.tracks[27];
  track.addEventListener("onclick", eventproc.onCastClick015, this, [1,]);

  track = score.tracks[29];
  track.addEventListener("onclick", eventproc.onCastClick016, this, [1,]);

  track = score.tracks[31];
  track.addEventListener("onclick", eventproc.onCastClick017, this, [1,]);

  track = score.tracks[33];
  track.addEventListener("onclick", eventproc.onCastClick018, this, [1,]);

  track = score.tracks[35];
  track.addEventListener("onclick", eventproc.onCastClick019, this, [1,]);

  track = score.tracks[37];
  track.addEventListener("onclick", eventproc.onCastClick020, this, [1,]);

  track = score.tracks[39];
  track.addEventListener("onclick", eventproc.onCastClick021, this, [1,]);

  track = score.tracks[42];
  track.addEventListener("onclick", eventproc.onCastClick022, this, [1,]);

  track = score.tracks[44];
  track.addEventListener("onclick", eventproc.onCastClick023, this, [1,]);

  track = score.tracks[46];
  track.addEventListener("onclick", eventproc.onCastClick024, this, [1,]);

  track = score.tracks[48];
  track.addEventListener("onclick", eventproc.onCastClick025, this, [1,]);

  track = score.tracks[50];
  track.addEventListener("onclick", eventproc.onCastClick026, this, [1,]);

  track = score.tracks[52];
  track.addEventListener("onclick", eventproc.onCastClick027, this, [1,]);

  track = score.tracks[54];
  track.addEventListener("onclick", eventproc.onCastClick028, this, [1,]);

  track = score.tracks[56];
  track.addEventListener("onclick", eventproc.onCastClick029, this, [1,]);

  track = score.tracks[58];
  track.addEventListener("onclick", eventproc.onCastClick030, this, [1,]);

  track = score.tracks[61];
  track.addEventListener("onclick", eventproc.onCastClick031, this, [1,]);

  track = score.tracks[63];
  track.addEventListener("onclick", eventproc.onCastClick032, this, [1,]);

  track = score.tracks[65];
  track.addEventListener("onclick", eventproc.onCastClick033, this, [1,]);

  track = score.tracks[67];
  track.addEventListener("onclick", eventproc.onCastClick034, this, [1,]);

  track = score.tracks[69];
  track.addEventListener("onclick", eventproc.onCastClick035, this, [1,]);

  track = score.tracks[71];
  track.addEventListener("onclick", eventproc.onCastClick036, this, [1,]);

  track = score.tracks[73];
  track.addEventListener("onclick", eventproc.onCastClick037, this, [1,]);

  track = score.tracks[75];
  track.addEventListener("onclick", eventproc.onCastClick038, this, [1,]);

  track = score.tracks[77];
  track.addEventListener("onclick", eventproc.onCastClick039, this, [1,]);

  track = score.tracks[79];
  score.addEventListener("onexitframe", eventproc.onExitFrame002, this, [1,]);

  score = contents.scores[2];

  score = contents.scores[3];

  track = score.tracks[0];
  track.addEventListener("onclick", eventproc.onCastClick000, this, [0,]);

  track = score.tracks[1];
  track.addEventListener("onclick", eventproc.onCastClick001, this, [0,]);

  this.contents = contents;

  //
  // IMAGES
  //

  this.ITEM_IMAGE_PATH = "./images/bag/";
  this.ITEM_MAX = 100;
  this.ITEM_DATA = [
    "bag001-256.jpg", "バルーン型トートバッグ【ネット限定カラーあり】", "価格\\3,045(税込)",
    "bag002-256.jpg", "一枚合皮のリバーシブルトートバッグ", "価格\\3,675(税込)",
    "bag003-256.jpg", "軽量２ウェイショルダーバッグ", "価格\\3,990(税込)",
    "bag004-256.jpg", "ナイロンコンビ３ウェイバッグ", "価格\\5,990(税込)",
    "bag005-256.jpg", "ラフィアビッグトートバッグ(アンチフォルムデザイン)", "価格\\12,075(税込)",
    "bag006-256.jpg", "【好評につき、新色追加】シンプルで使いやすい♪ベーシックミニトートバッグ", "価格\\1,990(税込)",
    "bag007-256.jpg", "ナイロン×レザーツーウェイバッグ(Fascina／ファシーナ)", "価格\\9,975(税込)",
    "bag008-256.jpg", "本革メッシュバッグ(zucchero filato)", "価格\\13,650(税込)",
    "bag009-256.jpg", "折りたたみトートバッグ", "価格\\1,995(税込)",
    "bag010-256.jpg", "仕分けができる９ポケットマザーズバッグ", "価格\\5,229(税込)",
    "bag011-256.jpg", "２ウェイボストンバッグ(SAC)", "価格\\5,145(税込)",
    "bag012-256.jpg", "メッシュショルダーバッグ", "価格\\2,990(税込)",
    "bag013-256.jpg", "１０ポケット２ウェイバッグ(ディズニー)", "価格\\4,990(税込)",
    "bag014-256.jpg", "多機能マルチショルダーバッグ(ディズニー)", "価格\\4,990(税込)",
    "bag015-256.jpg", "切り替えカラートートバッグ(マリ・クレール)", "価格\\12,600(税込)",
    "bag016-256.jpg", "セミショルダーバッグ", "価格\\3,990(税込)",
    "bag017-256.jpg", "２ウェイセミショルダーバッグ(mini labo)", "価格\\2,932(税込)",
    "bag018-256.jpg", "メタリック合皮使い２ウェイショルダーバッグ", "価格\\4,990(税込)",
    "bag019-256.jpg", "ツーウェイワンショルダーバッグ(フィッチ)", "価格\\8,190(税込)",
    "bag020-256.jpg", "パンチング手提げバッグ(ラメットベリー)", "価格\\7,980(税込)",
    "bag021-256.jpg", "ショルダーバッグ(ディズニー)", "価格\\4,990(税込)",
    "bag022-256.jpg", "綿麻トートバッグ", "価格\\3,990(税込)",
    "bag023-256.jpg", "折りたたみビッグトートバッグ(ディズニー)", "価格\\2,990(税込)",
    "bag024-256.jpg", "花柄トートバッグ", "価格\\9,870(税込)",
    "bag025-256.jpg", "花柄バッグ", "価格\\9,450(税込)",
    "bag026-256.jpg", "レザーツーウェイバッグ", "価格\\9,990(税込)",
    "bag027-256.jpg", "ディパック(コールマン)", "価格\\4,980(税込)",
    "bag028-256.jpg", "２ウェイがま口バッグ(ディズニー)", "価格\\4,990(税込)",
    "bag029-256.jpg", "メッシュトートバッグ(デラクラッセ)", "価格\\7,980(税込)",
    "bag030-256.jpg", "レザーワンショルダーバッグ", "価格\\9,990(税込)",
    "bag031-256.jpg", "デイバッグ／トートバッグ(キャスキッドソン／Cath Kidston)", "価格\\7,875(税込)",
    "bag032-256.jpg", "デイバッグ／トートバッグ(キャスキッドソン／Cath Kidston)", "価格\\7,875(税込)",
    "bag033-256.jpg", "トートバッグ(Fascina／ファシーナ)", "価格\\5,985(税込)",
    "bag034-256.jpg", "セミショルダーバッグ(デラクラッセ)", "価格\\7,980(税込)",
    "bag035-256.jpg", "レザートートバッグ(Lucca Italy／ルカ イタリー)", "価格\\10,500(税込)",
    "bag036-256.jpg", "レーザーカットトートバッグ", "価格\\4,990(税込)",
    "bag037-256.jpg", "２ウェイマルチトートバッグ(mini labo)", "価格\\5,990(税込)",
    "bag038-256.jpg", "ナイロンコンビ２ウェイバッグ", "価格\\4,990(税込)",
    "bag039-256.jpg", "お受験バッグ", "価格\\2,990(税込)",
    "bag040-256.jpg", "異素材コンビトートバッグ", "価格\\5,990(税込)",
    "bag041-256.jpg", "レザーツーウェイバッグ", "価格\\15,750(税込)",
    "bag042-256.jpg", "３ポケット２ウェイショルダーバッグ", "価格\\3,990(税込)",
    "bag043-256.jpg", "セミショルダーバッグ", "価格\\3,990(税込)",
    "bag044-256.jpg", "メッシュショルダーバッグ(ディズニー)", "価格\\3,990(税込)",
    "bag045-256.jpg", "ショルダーバッグ(adidas/アディダス)", "価格\\2,572(税込)",
    "bag046-256.jpg", "折りたたみ収納可能なナイロントートバッグ(ユナイテッドカラーズオブベネトン)", "価格\\2,980(税込)",
    "bag047-256.jpg", "２ウェイショルダーバッグ(SAC)", "価格\\5,145(税込)",
    "bag048-256.jpg", "カジュアルジムバッグ", "価格\\4,990(税込)",
    "bag049-256.jpg", "小ぶりな異素材コンビ手さげバッグ", "価格\\3,990(税込)",
    "bag050-256.jpg", "デイパック(SAC)", "価格\\5,145(税込)",
    "bag051-256.jpg", "ムラシワ合皮２ウェイバッグ", "価格\\6,195(税込)",
    "bag052-256.jpg", "三角形フォルムのショルダーバッグ", "価格\\4,990(税込)",
    "bag053-256.jpg", "ツーウェイバッグ(マリ・クレール)", "価格\\16,800(税込)",
    "bag054-256.jpg", "３室構造のショルダーバッグ", "価格\\4,990(税込)",
    "bag055-256.jpg", "トートバッグ(ディズニー)", "価格\\3,990(税込)",
    "bag056-256.jpg", "ジムバッグ(ディズニー)", "価格\\4,990(税込)",
    "bag057-256.jpg", "パッカブルボストンバッグ(le coq sportif／ルコックスポルティフ)", "価格\\1,995(税込)",
    "bag058-256.jpg", "チャーム付きセミショルダーバッグ(SAC)", "価格\\6,195(税込)",
    "bag059-256.jpg", "リュックにもなる２ウェイショルダーバッグ", "価格\\4,990(税込)",
    "bag060-256.jpg", "フェルト刺しゅう手提げバッグ", "価格\\1,428(税込)",
    "bag061-256.jpg", "ブックトート／トートバッグ(キャスキッドソン／Cath Kidston)", "価格\\3,307(税込)",
    "bag062-256.jpg", "２ウェイショルダーバッグ", "価格\\5,990(税込)",
    "bag063-256.jpg", "２ウェイショルダーバッグ／１２５６０(ヴェラ ブラッドリー／Vera Bradley)", "価格\\5,512(税込)",
    "bag064-256.jpg", "ミニバッグ(ルコック)", "価格\\1,050(税込)",
    "bag065-256.jpg", "レザートートバッグ", "価格\\9,990(税込)",
    "bag066-256.jpg", "通勤フィットネスバッグ（中）", "価格\\4,590(税込)",
    "bag067-256.jpg", "トートバッグ", "価格\\3,990(税込)",
    "bag068-256.jpg", "パンチングレザーツーウェイバッグ(ラメットベリー)", "価格\\13,650(税込)",
    "bag069-256.jpg", "２ウェイナイロンバッグ", "価格\\2,352(税込)",
    "bag070-256.jpg", "大容量！軽くて使いやすいピンドットボストンバッグ", "価格\\980(税込)",
    "bag071-256.jpg", "口金セミショルダーバッグ(デザインファクトリー)", "価格\\5,145(税込)",
    "bag072-256.jpg", "手提げバッグ(帆布工房)", "価格\\3,990(税込)",
    "bag073-256.jpg", "メッシュトートバッグ(ディズニー)", "価格\\4, 990(税込)",
    "bag074-256.jpg", "ＨＩＰＨＵＲＲＡＹ／手提げバッグ／１１２７６(キプリング／Kipling)", "価格\\2,940(税込)",
    "bag075-256.jpg", "ガーメントケース", "価格\\3,990(税込)",
    "bag076-256.jpg", "軽くてたっぷり入るトラベルボストンバッグ", "価格\\1,290(税込)",
    "bag077-256.jpg", "ハードキャリーバッグ（大）", "価格\\13,990(税込)",
    "bag078-256.jpg", "ミニドラムショルダー(ＲＯＸＹ／ロキシー)", "価格\\3,990(税込)",
    "bag079-256.jpg", "スパンコールのキラキラでゴージャス感たっぷり☆手提げバッグ(デザインファクトリー)", "価格\\3,045(税込)",
    "bag080-256.jpg", "コンパクト収納　ボストンバッグ(ルコック)", "価格\\1,995(税込)",
    "bag081-256.jpg", "カジュアルジムバッグ", "価格\\4,990(税込)",
    "bag082-256.jpg", "ダブルジップバッグ／ショルダーバッグ(キャスキッドソン／Cath Kidston)", "価格\\8,268(税込)",
    "bag083-256.jpg", "オープンキャリオール／トートバッグ(キャスキッドソン／Cath Kidston)", "価格\\4,567(税込)",
    "bag084-256.jpg", "ローズポーチ付きトートバッグ", "価格\\7,980(税込)",
    "bag085-256.jpg", "２ウェイボストンバッグ(ディズニー)", "価格\\5,990(税込)",
    "bag086-256.jpg", "キャリーケース（大）(ディズニー)", "価格\\18,690(税込)",
    "bag087-256.jpg", "母の日　軽量ポケットいっぱい多機能バッグ", "価格\\3,990(税込)",
    "bag088-256.jpg", "ポーチ付き軽量でＡ４も入り通勤にお役立ち☆２ウェイトートバッグ(ＳＡＣ／サック)", "価格\\4,095(税込)",
    "bag089-256.jpg", "ボストンバッグ“オールラウンダーＭ”(ライゼンタール)", "価格\\3,465～",
    "bag090-256.jpg", "レザー手提げバッグ", "価格\\9,990(税込)",
    "bag091-256.jpg", "たためるビックエコバッグ(ディズニー)", "価格\\1,990(税込)",
    "bag092-256.jpg", "キャリーケース(ROXY／ロキシー)", "価格\\12,316(税込)",
    "bag093-256.jpg", "ツーウェイバッグ(ラメットベリー)", "価格\\3,591(税込)",
    "bag094-256.jpg", "コーティングトートバッグ(ディズニー)", "価格\\4,990(税込)",
    "bag095-256.jpg", "レディスフォーマルバッグ", "価格\\6,990(税込)",
    "bag096-256.jpg", "ボストンバッグ／１２４７９(ヴェラ ブラッドリー／Vera Bradley)", "価格\\8,820(税込)",
    "bag097-256.jpg", "ヴィンテージ／ランチトート／ＨＢ１Ｐ０１９(フォリフォリ／Folli Follie)", "価格\\5,775(税込)",
    "bag098-256.jpg", "収納上手さんにオススメ☆２ウェイトートバッグ(ＳＡＣ／サック)", "価格\\6,195(税込)",
    "bag099-256.jpg", "ショッパーＭ(ライゼンタール)", "価格\\1,575(税込)",
    "bag100-256.jpg", "チェックウエストポーチ", "価格\\1,596(税込)"
      ];

  this.PANEL_TEXTURE = [
    contents.textureCastsL["Texture_00"].index,
    contents.textureCastsL["Texture_01"].index,
    contents.textureCastsL["Texture_02"].index,
    contents.textureCastsL["Texture_03"].index,
    contents.textureCastsL["Texture_04"].index,
    contents.textureCastsL["Texture_05"].index,
    contents.textureCastsL["Texture_06"].index,
    contents.textureCastsL["Texture_07"].index,
    contents.textureCastsL["Texture_08"].index,
    contents.textureCastsL["Texture_09"].index,
    contents.textureCastsL["Texture_10"].index,
    contents.textureCastsL["Texture_11"].index,
    contents.textureCastsL["Texture_12"].index,
    contents.textureCastsL["Texture_13"].index,
    contents.textureCastsL["Texture_14"].index,
    contents.textureCastsL["Texture_15"].index,
    contents.textureCastsL["Texture_16"].index,
    contents.textureCastsL["Texture_17"].index,
    contents.textureCastsL["Texture_18"].index,
    contents.textureCastsL["Texture_19"].index,
    contents.textureCastsL["Texture_20"].index,
    contents.textureCastsL["Texture_21"].index,
    contents.textureCastsL["Texture_22"].index,
    contents.textureCastsL["Texture_23"].index,
    contents.textureCastsL["Texture_24"].index,
    contents.textureCastsL["Texture_25"].index,
    contents.textureCastsL["Texture_26"].index,
    contents.textureCastsL["Texture_27"].index,
    contents.textureCastsL["Texture_28"].index,
    contents.textureCastsL["Texture_29"].index,
    contents.textureCastsL["Texture_30"].index,
    contents.textureCastsL["Texture_31"].index,
    contents.textureCastsL["Texture_32"].index,
    contents.textureCastsL["Texture_33"].index,
    contents.textureCastsL["Texture_34"].index,
    contents.textureCastsL["Texture_35"].index
      ];

  // add
  this.sShelfScore = contents.scoresL["shelf"];

  //
  // consts
  //

  // 棚1面あたりのパネル数
  this.NUM_PANEL  = 9;
  // 存在するパネル数
  this.MAX_PANELS = this.NUM_PANEL * 4;
  // 仮想的な棚の面数
  this.MAX_FACES  = this.ITEM_MAX / this.NUM_PANEL;

  // 棚の回転のフレーム数
  this.FRAME_SHELF_ROLL = 12;
  // パネルのポップアップのフレーム数
  this.FRAME_PANEL_POPUP = 5;

  //
  // member
  //

  this.main_count = 0;

  this.is_shelf_rolling = false;
  this.shelf_rol_state = 0;
  this.shelf_rol_state_pre = 0;
  this.shelf_rot = 0.0;
  this.shelf_rot_count = 0;
  this.is_shelf_rot_right = true;

  // 面が最後に読み込んだアイテムを記憶する
  this.shelf_texture_loaded_item = [-1, -1, -1, -1];

  // パペット化
  this.shelf_root = this.sShelfScore.tracks[0];
  this.shelf_root.setPuppet(true);
  this.shelf_root.frame.visible = true;

  this.PANEL_TRACKS = [];
  this.PANEL_GHOST_TRACKS = [];

  this.is_panel_popup = false; 
  this.popup_panel_id = 0;
  this.popup_panel_count = 0;// 0 ～ 100
  this.panel_original_pos = [];

  for (var i = 0; i < 4; ++i) {
    for (var j = 0; j < 9; ++j) {

      var pt = this.sShelfScore.tracks[i * 19 + j * 2 + 4];
      pt.setPuppet(true);
      pt.frame.visible = true;
      pt.frame.siz = [0.17, 0.17, 0.17];
      this.PANEL_TRACKS.push(pt);

      var gt = this.sShelfScore.tracks[i * 19 + j * 2 + 3];
      gt.setPuppet(true);
      gt.frame.pos = [(j%3 - 1) * 20, 35 - Math.floor( j / 3 ) * 31, -40];
      gt.frame.siz = [1, 1, 1];
      gt.frame.visible = true;
      this.PANEL_GHOST_TRACKS.push(gt);
      this.panel_original_pos.push(jQuery.extend(true, {}, gt.frame.pos));
    }
  }

  this.POPUP_TARGET_POS = [0, 23, -155];


  this.load_textures(0);
  this.load_textures(1);
  this.load_textures(2);
  this.load_textures(3);


};

MxePlayer.registerControllerClass(MxeDefaultController);

MxeDefaultController.eventproc = {};

//=============================================
// Click Shelf Turn Left Button
//=============================================
MxeDefaultController.eventproc.onCastClick000 = function(e) {
  e.userObj.shelf_turn_left();
};

//=============================================
// Click Shelf Turn Right Button
//=============================================
MxeDefaultController.eventproc.onCastClick001 = function(e) {
  e.userObj.shelf_turn_right();
};

//=============================================
// Main loop
//=============================================
MxeDefaultController.eventproc.onExitFrame002 = function(e) {
  e.userObj.shelf_loop();
};

//=============================================
// Click Panel 0
//=============================================

MxeDefaultController.eventproc.onCastClick004 = function(e) {
  e.userObj.panel_popup(0);
};

//=============================================
// Click Panel 1
//=============================================

MxeDefaultController.eventproc.onCastClick005 = function(e) {
  e.userObj.panel_popup(1);
};

//=============================================
// Click Panel 2
//=============================================

MxeDefaultController.eventproc.onCastClick006 = function(e) {
  e.userObj.panel_popup(2);
};

//=============================================
// Click Panel 3
//=============================================

MxeDefaultController.eventproc.onCastClick007 = function(e) {
  e.userObj.panel_popup(3);
};

//=============================================
// Click Panel 4
//=============================================

MxeDefaultController.eventproc.onCastClick008 = function(e) {
  e.userObj.panel_popup(4);
};

//=============================================
// Click Panel 5
//=============================================

MxeDefaultController.eventproc.onCastClick009 = function(e) {
  e.userObj.panel_popup(5);
};

//=============================================
// Click Panel 6
//=============================================

MxeDefaultController.eventproc.onCastClick010 = function(e) {
  e.userObj.panel_popup(6);
};

//=============================================
// Click Panel 7
//=============================================

MxeDefaultController.eventproc.onCastClick011 = function(e) {
  e.userObj.panel_popup(7);
};

//=============================================
// Click Panel 8
//=============================================

MxeDefaultController.eventproc.onCastClick012 = function(e) {
  e.userObj.panel_popup(8);
};

//=============================================
// Click Panel 9
//=============================================

MxeDefaultController.eventproc.onCastClick013 = function(e) {
  e.userObj.panel_popup(9);
};

//=============================================
// Click Panel 10
//=============================================

MxeDefaultController.eventproc.onCastClick014 = function(e) {
  e.userObj.panel_popup(10);
};

//=============================================
// Click Panel 11
//=============================================

MxeDefaultController.eventproc.onCastClick015 = function(e) {
  e.userObj.panel_popup(11);
};

//=============================================
// Click Panel 12
//=============================================

MxeDefaultController.eventproc.onCastClick016 = function(e) {
  e.userObj.panel_popup(12);
};

//=============================================
// Click Panel 13
//=============================================

MxeDefaultController.eventproc.onCastClick017 = function(e) {
  e.userObj.panel_popup(13);
};

//=============================================
// Click Panel 14
//=============================================

MxeDefaultController.eventproc.onCastClick018 = function(e) {
  e.userObj.panel_popup(14);
};

//=============================================
// Click Panel 15
//=============================================

MxeDefaultController.eventproc.onCastClick019 = function(e) {
  e.userObj.panel_popup(15);
};

//=============================================
// Click Panel 16
//=============================================

MxeDefaultController.eventproc.onCastClick020 = function(e) {
  e.userObj.panel_popup(16);
};

//=============================================
// Click Panel 17
//=============================================

MxeDefaultController.eventproc.onCastClick021 = function(e) {
  e.userObj.panel_popup(17);
};

//=============================================
// Click Panel 18
//=============================================

MxeDefaultController.eventproc.onCastClick022 = function(e) {
  e.userObj.panel_popup(18);
};

//=============================================
// Click Panel 19
//=============================================

MxeDefaultController.eventproc.onCastClick023 = function(e) {
  e.userObj.panel_popup(19);
};

//=============================================
// Click Panel 20
//=============================================

MxeDefaultController.eventproc.onCastClick024 = function(e) {
  e.userObj.panel_popup(20);
};

//=============================================
// Click Panel 21
//=============================================

MxeDefaultController.eventproc.onCastClick025 = function(e) {
  e.userObj.panel_popup(21);
};

//=============================================
// Click Panel 22
//=============================================

MxeDefaultController.eventproc.onCastClick026 = function(e) {
  e.userObj.panel_popup(22);
};

//=============================================
// Click Panel 23
//=============================================

MxeDefaultController.eventproc.onCastClick027 = function(e) {
  e.userObj.panel_popup(23);
};

//=============================================
// Click Panel 24
//=============================================

MxeDefaultController.eventproc.onCastClick028 = function(e) {
  e.userObj.panel_popup(24);
};

//=============================================
// Click Panel 25
//=============================================

MxeDefaultController.eventproc.onCastClick029 = function(e) {
  e.userObj.panel_popup(25);
};

//=============================================
// Click Panel 26
//=============================================

MxeDefaultController.eventproc.onCastClick030 = function(e) {
  e.userObj.panel_popup(26);
};

//=============================================
// Click Panel 27
//=============================================

MxeDefaultController.eventproc.onCastClick031 = function(e) {
  e.userObj.panel_popup(27);
};

//=============================================
// Click Panel 28
//=============================================

MxeDefaultController.eventproc.onCastClick032 = function(e) {
  e.userObj.panel_popup(28);
};

//=============================================
// Click Panel 29
//=============================================

MxeDefaultController.eventproc.onCastClick033 = function(e) {
  e.userObj.panel_popup(29);
};

//=============================================
// Click Panel 30
//=============================================

MxeDefaultController.eventproc.onCastClick034 = function(e) {
  e.userObj.panel_popup(30);
};

//=============================================
// Click Panel 31
//=============================================

MxeDefaultController.eventproc.onCastClick035 = function(e) {
  e.userObj.panel_popup(31);
};

//=============================================
// Click Panel 32
//=============================================

MxeDefaultController.eventproc.onCastClick036 = function(e) {
  e.userObj.panel_popup(32);
};

//=============================================
// Click Panel 33
//=============================================

MxeDefaultController.eventproc.onCastClick037 = function(e) {
  e.userObj.panel_popup(33);
};

//=============================================
// Click Panel 34
//=============================================

MxeDefaultController.eventproc.onCastClick038 = function(e) {
  e.userObj.panel_popup(34);
};

//=============================================
// Click Panel 35
//=============================================

MxeDefaultController.eventproc.onCastClick039 = function(e) {
  e.userObj.panel_popup(35);
};




//
// テスクチャの更新
//

MxeDefaultController.prototype.load_textures = function (face_n) {


  if (face_n == this.shelf_texture_loaded_item[face_n % 4] || face_n < 0 || face_n >= this.MAX_FACES) {
    return;
  }

  this.shelf_texture_loaded_item[face_n % 4] = face_n;
  var item_n = face_n * this.NUM_PANEL;

  for (var i = 0; i < this.NUM_PANEL; ++i) {

    var texture_id = (face_n * this.NUM_PANEL + i) % this.MAX_PANELS;
    var item_id = item_n + i;

    if (item_id < this.ITEM_MAX) {
      var url = this.ITEM_IMAGE_PATH + this.ITEM_DATA[item_id * 3 + 0];
      this.contents.textureCasts[this.PANEL_TEXTURE[texture_id]].loadImage(url);
      this.PANEL_TRACKS[texture_id].frame.visible = true;
    } else {
      this.PANEL_TRACKS[texture_id].frame.visible = false;
    }
  }
};

//
// ステータスバーの更新
//

MxeDefaultController.prototype.update_statusbar = function () {
  $("div#status").css("width", "" + (100.0 * (this.shelf_rol_state + 1) / (this.MAX_FACES - 1)) + "%");
}

//
// 漸近の関数を返す
//

// d: [0 1]
// n: 適当な係数。大きいほどカーブが強くなる
MxeDefaultController.prototype.curve = function (d, n) {
  return Math.log( 1 + (Math.E - 1) * Math.pow(d, n) );
}


MxeDefaultController.prototype.execute_pop_panel = function() {
  var scale_pos = function(pos, d) {
    var new_pos = [];
    new_pos[0] = pos[0] * d;
    new_pos[1] = pos[1] * d;
    new_pos[2] = pos[2] * d;
    return new_pos;
  }

  var add_pos = function(p0, p1) {
    var new_pos = [];
    new_pos[0] = p0[0] + p1[0];
    new_pos[1] = p0[1] + p1[1];
    new_pos[2] = p0[2] + p1[2];
    return new_pos;
  }

  var diff_pos = function(p0, p1) {
    var new_pos = [];
    new_pos[0] = p0[0] - p1[0];
    new_pos[1] = p0[1] - p1[1];
    new_pos[2] = p0[2] - p1[2];
    return new_pos;
  }

  var d = this.popup_panel_count / this.FRAME_PANEL_POPUP;// [0 1]の係数
  var z = this.curve(d, 3);
  var original_pos = this.panel_original_pos[this.popup_panel_id];
  var v = diff_pos(this.POPUP_TARGET_POS, original_pos);
  var diff = scale_pos(v, z);
  this.PANEL_GHOST_TRACKS[this.popup_panel_id].frame.pos = add_pos(original_pos, diff);
}

//
// Main
//

MxeDefaultController.prototype.shelf_loop = function () {

  // Shelf
  if (this.is_shelf_rolling) {
    var rd  = Math.PI / 2;
    var pad = this.shelf_rol_state_pre * rd;
    var d   = this.shelf_rot_count / this.FRAME_SHELF_ROLL;
    var z   = this.curve(d, 2);
    this.shelf_rot = this.is_shelf_rot_right ? pad + rd * z : pad - rd * z;
    this.shelf_root.frame.rot[1] = this.shelf_rot;

    ++this.shelf_rot_count;

    if (this.shelf_rot_count > this.FRAME_SHELF_ROLL) {
      this.is_shelf_rolling = false;
      //this.load_textures(this.shelf_rol_state + 1);
      //this.load_textures(this.shelf_rol_state - 1);
    }
  }

  // Panel PopUp
  if ( this.is_panel_popup && this.popup_panel_count < this.FRAME_PANEL_POPUP ) {
    ++this.popup_panel_count;
    this.execute_pop_panel();
  }

  // Panel PopDown
  if ( !this.is_panel_popup && this.popup_panel_count > 0 ) {
    --this.popup_panel_count;
    this.execute_pop_panel();
  }

  // Main Count
  if (this.main_count == 0) {
    this.update_statusbar();
  }
  ++this.main_count;
};

//
// 棚の左回転
//

MxeDefaultController.prototype.shelf_turn_left = function () {
  if (!this.is_shelf_rolling && this.shelf_rol_state > 0) {

    this.is_shelf_rolling = true;
    this.is_shelf_rot_right = false;
    this.shelf_rot_count = 0;

    this.shelf_rol_state_pre = this.shelf_rol_state;
    --this.shelf_rol_state;

    this.load_textures(this.shelf_rol_state-1);
    this.update_statusbar();
  }
};

//
// 棚の右回転
//

MxeDefaultController.prototype.shelf_turn_right = function () {
  if (!this.is_shelf_rolling && this.shelf_rol_state < this.MAX_FACES - 2) {

    this.is_shelf_rolling = true;
    this.is_shelf_rot_right = true;
    this.shelf_rot_count = 0;

    this.shelf_rol_state_pre = this.shelf_rol_state;
    ++this.shelf_rol_state;

    this.load_textures(this.shelf_rol_state+1);
    this.update_statusbar();
  }
};

//
// パネルのクリック
//

MxeDefaultController.prototype.panel_popup = function (id) {

  if (this.is_panel_popup) {
    // pop down
    if (id == this.popup_panel_id && this.popup_panel_count == this.FRAME_PANEL_POPUP) {
      this.is_panel_popup = false;
    }

  } else {
    // pop up
    if (this.popup_panel_count == 0) {
      this.is_panel_popup = true;
      this.popup_panel_id = id;
    }
  }

}
