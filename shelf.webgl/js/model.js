/*------------------------------
  Point2D
------------------------------*/

var Point2D = function (x, y) {
  this.x = x;
  this.y = y;
};



/*------------------------------
  Vector3D
------------------------------*/

var Vector3D = function (vec) {
  this.vec = jQuery.extend(true, {}, vec);
  return this;
};

Vector3D.prototype.clone = function() {
  return jQuery.extend(true, {}, this);
};

Vector3D.prototype.scale = function(d) {
  this.vec[0] *= d;
  this.vec[1] *= d;
  this.vec[2] *= d;
  return this;
};

Vector3D.prototype.add = function(v) {
  this.vec[0] += v.vec[0];
  this.vec[1] += v.vec[1];
  this.vec[2] += v.vec[2];
  return this;
};

Vector3D.prototype.diff = function(v) {
  this.vec[0] -= v.vec[0];
  this.vec[1] -= v.vec[1];
  this.vec[2] -= v.vec[2];
  return this;
};



var Model = function(){};

/*------------------------------
  Utility
------------------------------*/

//
// 等間隔な [0 1] を入力として、EaseOutするような関数を返す
//

Model.prototype.easeOut = function (x) {
  if (this.config_isEaseOut) {
    return 1 - Math.exp(-6 * x);
  } else {
    return x;
  }
}

//
// 上の逆関数
//

Model.prototype.easeOut_inv = function (x) {
  if (this.config_isEaseOut) {
    return -Math.log(1 - x) / 6;
  } else {
    return x;
  }
}


//
// sprintfメソッドの定義
// http://www.atmarkit.co.jp/ait/articles/1003/12/news088_11.html
//

Model.prototype.sprintf = function(format) {

  // 第2引数以降を順に処理
  for (var i = 1; i < arguments.length; i++) {

    // 正規表現でプレイスホルダと対応する引数の値を置換処理
    var reg = new RegExp('\\{' + (i - 1) + '\\}', 'g');
    format = format.replace(reg, arguments[i]);
  }

  // 最終的な置き換え結果を戻り値として返す
  return format;
}



/*==============================
  Model
==============================*/

Model.prototype.init = function (contents) {

  this.contents = contents;



  /*------------------------------
    ITEM DATA 
  ------------------------------*/

  this.ITEM_IMAGE_PATH = "./images/bag/resize/";
  this.ITEM_MAX = 100;

  this.ITEM_DATA = [
    [ 1, "bag001.jpg", "バルーン型トートバッグ【ネット限定カラーあり】", 3045, 36 ],
    [ 2, "bag002.jpg", "一枚合皮のリバーシブルトートバッグ", 3675, 28 ],
    [ 3, "bag003.jpg", "軽量２ウェイショルダーバッグ", 3990, 4 ],
    [ 4, "bag004.jpg", "ナイロンコンビ３ウェイバッグ", 5990, 78 ],
    [ 5, "bag005.jpg", "ラフィアビッグトートバッグ(アンチフォルムデザイン)", 12075, 18 ],
    [ 6, "bag006.jpg", "【好評につき、新色追加】シンプルで使いやすい♪\nベーシックミニトートバッグ", 1990, 14 ],
    [ 7, "bag007.jpg", "ナイロン×レザーツーウェイバッグ\n(Fascina／ファシーナ)", 9975, 34 ],
    [ 8, "bag008.jpg", "本革メッシュバッグ(zucchero filato)", 13650, 16 ],
    [ 9, "bag009.jpg", "折りたたみトートバッグ", 1995, 346 ],
    [ 10, "bag010.jpg", "仕分けができる９ポケットマザーズバッグ", 5229, 26 ],
    [ 11, "bag011.jpg", "２ウェイボストンバッグ(SAC)", 5145, 24 ],
    [ 12, "bag012.jpg", "メッシュショルダーバッグ", 2990, 4 ],
    [ 13, "bag013.jpg", "１０ポケット２ウェイバッグ(ディズニー)", 4990, 24 ],
    [ 14, "bag014.jpg", "多機能マルチショルダーバッグ(ディズニー)", 4990, 22 ],
    [ 15, "bag015.jpg", "切り替えカラートートバッグ(マリ・クレール)", 12600, 34 ],
    [ 16, "bag016.jpg", "セミショルダーバッグ", 3990, 20 ],
    [ 17, "bag017.jpg", "２ウェイセミショルダーバッグ(mini labo)", 2932, 22 ],
    [ 18, "bag018.jpg", "メタリック合皮使い２ウェイショルダーバッグ", 4990, 26 ],
    [ 19, "bag019.jpg", "ツーウェイワンショルダーバッグ(フィッチ)", 8190, 20 ],
    [ 20, "bag020.jpg", "パンチング手提げバッグ(ラメットベリー)", 7980, 6 ],
    [ 21, "bag021.jpg", "ショルダーバッグ(ディズニー)", 4990, 24 ],
    [ 22, "bag022.jpg", "綿麻トートバッグ", 3990, 34 ],
    [ 23, "bag023.jpg", "折りたたみビッグトートバッグ(ディズニー)", 2990, 8 ],
    [ 24, "bag024.jpg", "花柄トートバッグ", 9870, 14 ],
    [ 25, "bag025.jpg", "花柄バッグ", 9450, 32 ],
    [ 26, "bag026.jpg", "レザーツーウェイバッグ", 9990, 0 ],
    [ 27, "bag027.jpg", "ディパック(コールマン)", 4980, 184 ],
    [ 28, "bag028.jpg", "２ウェイがま口バッグ(ディズニー)", 4990, 18 ],
    [ 29, "bag029.jpg", "メッシュトートバッグ(デラクラッセ)", 7980, 52 ],
    [ 30, "bag030.jpg", "レザーワンショルダーバッグ", 9990, 30 ],
    [ 31, "bag031.jpg", "デイバッグ／トートバッグ\n(キャスキッドソン／Cath Kidston)", 7875, 204 ],
    [ 32, "bag032.jpg", "デイバッグ／トートバッグ\n(キャスキッドソン／Cath Kidston)", 7875, 158 ],
    [ 33, "bag033.jpg", "トートバッグ(Fascina／ファシーナ)", 5985, 22 ],
    [ 34, "bag034.jpg", "セミショルダーバッグ(デラクラッセ)", 7980, 34 ],
    [ 35, "bag035.jpg", "レザートートバッグ(Lucca Italy／ルカ イタリー)", 10500, 28 ],
    [ 36, "bag036.jpg", "レーザーカットトートバッグ", 4990, 20 ],
    [ 37, "bag037.jpg", "２ウェイマルチトートバッグ(mini labo)", 5990, 38 ],
    [ 38, "bag038.jpg", "ナイロンコンビ２ウェイバッグ", 4990, 14 ],
    [ 39, "bag039.jpg", "お受験バッグ", 2990, 20 ],
    [ 40, "bag040.jpg", "異素材コンビトートバッグ", 5990, 28 ],
    [ 41, "bag041.jpg", "レザーツーウェイバッグ", 15750, 0 ],
    [ 42, "bag042.jpg", "３ポケット２ウェイショルダーバッグ", 3990, 32 ],
    [ 43, "bag043.jpg", "セミショルダーバッグ", 3990, 36 ],
    [ 44, "bag044.jpg", "メッシュショルダーバッグ(ディズニー)", 3990, 32 ],
    [ 45, "bag045.jpg", "ショルダーバッグ(adidas/アディダス)", 2572, 10 ],
    [ 46, "bag046.jpg", "折りたたみ収納可能なナイロントートバッグ\n(ユナイテッドカラーズオブベネトン)", 2980, 356 ],
    [ 47, "bag047.jpg", "２ウェイショルダーバッグ(SAC)", 5145, 36 ],
    [ 48, "bag048.jpg", "カジュアルジムバッグ", 4990, 348 ],
    [ 49, "bag049.jpg", "小ぶりな異素材コンビ手さげバッグ", 3990, 24 ],
    [ 50, "bag050.jpg", "デイパック(SAC)", 5145, 36 ],
    [ 51, "bag051.jpg", "ムラシワ合皮２ウェイバッグ", 6195, 34 ],
    [ 52, "bag052.jpg", "三角形フォルムのショルダーバッグ", 4990, 28 ],
    [ 53, "bag053.jpg", "ツーウェイバッグ(マリ・クレール)", 16800, 26 ],
    [ 54, "bag054.jpg", "３室構造のショルダーバッグ", 4990, 16 ],
    [ 55, "bag055.jpg", "トートバッグ(ディズニー)", 3990, 12 ],
    [ 56, "bag056.jpg", "ジムバッグ(ディズニー)", 4990, 28 ],
    [ 57, "bag057.jpg", "パッカブルボストンバッグ\n(le coq sportif／ルコックスポルティフ)", 1995, 12 ],
    [ 58, "bag058.jpg", "チャーム付きセミショルダーバッグ(SAC)", 6195, 150 ],
    [ 59, "bag059.jpg", "リュックにもなる２ウェイショルダーバッグ", 4990, 28 ],
    [ 60, "bag060.jpg", "フェルト刺しゅう手提げバッグ", 1428, 286 ],
    [ 61, "bag061.jpg", "ブックトート／トートバッグ\n(キャスキッドソン／Cath Kidston)", 3307, 358 ],
    [ 62, "bag062.jpg", "２ウェイショルダーバッグ", 5990, 38 ],
    [ 63, "bag063.jpg", "２ウェイショルダーバッグ／１２５６０\n(ヴェラ ブラッドリー／Vera Bradley)", 5512, 196 ],
    [ 64, "bag064.jpg", "ミニバッグ(ルコック)", 1050, 300 ],
    [ 65, "bag065.jpg", "レザートートバッグ", 9990, 22 ],
    [ 66, "bag066.jpg", "通勤フィットネスバッグ（中）", 4590, 0 ],
    [ 67, "bag067.jpg", "トートバッグ", 3990, 30 ],
    [ 68, "bag068.jpg", "パンチングレザーツーウェイバッグ(ラメットベリー)", 13650, 30 ],
    [ 69, "bag069.jpg", "２ウェイナイロンバッグ", 2352, 28 ],
    [ 70, "bag070.jpg", "大容量！軽くて使いやすいピンドットボストンバッグ", 980, 262 ],
    [ 71, "bag071.jpg", "口金セミショルダーバッグ(デザインファクトリー)", 5145, 0 ],
    [ 72, "bag072.jpg", "手提げバッグ(帆布工房)", 3990, 34 ],
    [ 73, "bag073.jpg", "メッシュトートバッグ(ディズニー)", 4990, 16 ],
    [ 74, "bag074.jpg", "ＨＩＰＨＵＲＲＡＹ／手提げバッグ／\n１１２７６(キプリング／Kipling)", 2940, 42 ],
    [ 75, "bag075.jpg", "ガーメントケース", 3990, 36 ],
    [ 76, "bag076.jpg", "軽くてたっぷり入るトラベルボストンバッグ", 1290, 18 ],
    [ 77, "bag077.jpg", "ハードキャリーバッグ（大）", 13990, 270 ],
    [ 78, "bag078.jpg", "ミニドラムショルダー(ＲＯＸＹ／ロキシー)", 3990, 48 ],
    [ 79, "bag079.jpg", "スパンコールのキラキラでゴージャス感たっぷり☆\n手提げバッグ(デザインファクトリー)", 3045, 0 ],
    [ 80, "bag080.jpg", "コンパクト収納　ボストンバッグ(ルコック)", 1995, 300 ],
    [ 81, "bag081.jpg", "カジュアルジムバッグ", 4990, 30 ],
    [ 82, "bag082.jpg", "ダブルジップバッグ／ショルダーバッグ\n(キャスキッドソン／Cath Kidston)", 8268, 210 ],
    [ 83, "bag083.jpg", "オープンキャリオール／トートバッグ\n(キャスキッドソン／Cath Kidston)", 4567, 156 ],
    [ 84, "bag084.jpg", "ローズポーチ付きトートバッグ", 7980, 30 ],
    [ 85, "bag085.jpg", "２ウェイボストンバッグ(ディズニー)", 5990, 12 ],
    [ 86, "bag086.jpg", "キャリーケース（大）(ディズニー)", 18690, 16 ],
    [ 87, "bag087.jpg", "母の日　軽量ポケットいっぱい多機能バッグ", 3990, 0 ],
    [ 88, "bag088.jpg", "ポーチ付き軽量でＡ４も入り通勤にお役立ち☆\n２ウェイトートバッグ(ＳＡＣ／サック)", 4095, 48 ],
    [ 89, "bag089.jpg", "ボストンバッグ“オールラウンダーＭ”(ライゼンタール)", 3465, 334 ],
    [ 90, "bag090.jpg", "レザー手提げバッグ", 9990, 34 ],
    [ 91, "bag091.jpg", "たためるビックエコバッグ(ディズニー)", 1990, 26 ],
    [ 92, "bag092.jpg", "キャリーケース(ROXY／ロキシー)", 12316, 340 ],
    [ 93, "bag093.jpg", "ツーウェイバッグ(ラメットベリー)", 3591, 12 ],
    [ 94, "bag094.jpg", "コーティングトートバッグ(ディズニー)", 4990, 26 ],
    [ 95, "bag095.jpg", "レディスフォーマルバッグ", 6990, 0 ],
    [ 96, "bag096.jpg", "ボストンバッグ／１２４７９\n(ヴェラ ブラッドリー／Vera Bradley)", 8820, 8 ],
    [ 97, "bag097.jpg", "ヴィンテージ／ランチトート／ＨＢ１Ｐ０１９\n(フォリフォリ／Folli Follie)", 5775, 348 ],
    [ 98, "bag098.jpg", "収納上手さんにオススメ☆２ウェイトートバッグ\n(ＳＡＣ／サック)", 6195, 48 ],
    [ 99, "bag099.jpg", "ショッパーＭ(ライゼンタール)", 1575, 24 ],
    [ 100, "bag100.jpg", "チェックウエストポーチ", 1596, 166 ],
    ];



  /*------------------------------
    CONSTS
  ------------------------------*/

  this.SCORE_SHELF_INDEX = 1;

  // 棚1面あたりのパネル数
  this.NUM_PANEL = 9;
  // 存在する面数
  this.NUM_FACES = 4;
  // 存在するパネル数
  this.MAX_PANELS = this.NUM_PANEL * this.NUM_FACES;
  // 仮想的な面数
  this.MAX_FACES  = this.ITEM_MAX / this.NUM_PANEL;
  // 棚の1回の回転量
  this.SHELF_ROT = Math.PI / 2;


  //
  // アニメーションのフレーム数
  //

  this.FRAME_SHELF_ROLL = 20;
  this.FRAME_SHELF_LEAN = 20;
  this.FRAME_SHELF_OUT_DRAG = 8;
  this.FRAME_PANEL_POPUP = 5;
  this.FRAME_SCREEN_POP = 15;
  this.FRAME_CAMERA_INIT = 30;


  //
  // SORT KEYS
  //

  this.KEY_ID     = 0;
  this.KEY_URL    = 1;
  this.KEY_TITLE  = 2;
  this.KEY_PRICE  = 3;
  this.KEY_COLOR  = 4;

  this.KEY_NAMES = {};
  this.KEY_NAMES[this.KEY_ID]    =  "id";
  this.KEY_NAMES[this.KEY_URL]   =  "url";
  this.KEY_NAMES[this.KEY_TITLE] =  "title";
  this.KEY_NAMES[this.KEY_PRICE] =  "price";
  this.KEY_NAMES[this.KEY_COLOR] =  "color";


  //
  // States
  //
  
  // panel_pop_state 用
  this.POPDOWN = 0;
  this.POPING = 1;
  this.POPUP = 2;

  // screen_pop_state 用
  this.UPING = 3;
  this.DOWNING = 4;
  this.STOP = 5;

  // 昇順と降順
  this.ASC = 0;
  this.DESC = 1;


  //
  // Caption
  //

  this.SORT_FORMAT = {};
  this.SORT_FORMAT[this.KEY_ID]  = "# {0} - {1}";
  this.SORT_FORMAT[this.KEY_PRICE] = "{0} - {1} 円";
  this.SORT_FORMAT[this.KEY_COLOR] = '<div style="background: linear-gradient(to right, hsl({0}, 80%, 50%), hsl({1}, 80%, 50%));" class="maru-kado">color</div>';



  /*------------------------------
    MEMBER
  ------------------------------*/

  this.main_count = 0;

  //
  // Mouse
  //

  this.mouse_pos = new Point2D(0,0);
  this.mouse_drag_start_pos = new Point2D(0,0);
  this.is_mouse_drag = false;
  this.mouse_drag_weight = 0;
  this.mouse_drag_count = 0;


  //
  // Shelf
  //

  this.is_shelf_rolling = false;
  this.shelf_rot_state = 0;
  this.shelf_rot_state_pre = 0;
  this.shelf_rot = 0.0;
  this.shelf_rot_count = 0;

  // lean (傾き)
  this.shelf_lean_rot = 0;
  this.shelf_lean_count = 0;
  this.is_shelf_lean_right = true;
  this.is_shelf_leaning = false;
  this.is_shelf_outing = false;
  this.is_shelf_drag_outing = false;
  this.shelf_drag_end_rot = 0;

  // 面が最後に読み込んだアイテムの添字
  this.shelf_texture_loaded_item = [-1, -1, -1, -1];


  //
  // Panel
  //

  this.panel_original_pos = [];
  this.POPUP_TARGET_POS = new Vector3D([0, 23, -168]);

  this.panel_pop_state = [];

  this.is_panel_popup = false; 
  this.popup_panel_id = 0;
  this.popup_panel_count = 0;

  this.is_panel_popdown = false;
  this.popdown_panel_id = 0;
  this.popdown_panel_count = 0;

  // MouseDown時に選択されたパネルを記憶する
  this.select_panel_id_pre = -1;


  //
  // Sort
  //

  // current
  this.sort_key = this.KEY_ID;
  this.sort_order = this.ASC;

  // default
  this.sort_orders = {};
  this.sort_orders[this.KEY_ID]    = this.ASC;
  this.sort_orders[this.KEY_PRICE] = this.DESC;
  this.sort_orders[this.KEY_COLOR] = this.DESC;



  /*------------------------------
    TRACKの参照 と PUPPET化
  ------------------------------*/

  //
  // Shelf
  //

  this.sShelfScore = this.contents.scoresL["shelf"];
  this.shelf_root = this.sShelfScore.tracks[0];
  this.shelf_root.setPuppet(true);
  this.shelf_root.frame.visible = true;


  //
  // Panel
  //

  this.PANEL_TRACKS = [];
  this.PANEL_GHOST_TRACKS = [];
  this.PANEL_INDEX_TO_ID = {};

  var id = 0;
  for (var i = 0; i < 4; ++i) {
    for (var j = 0; j < 9; ++j) {

      var index = i * 19 + j * 2 + 4;
      var pt = this.sShelfScore.tracks[index];
      pt.setPuppet(true);
      pt.frame.visible = true;
      pt.frame.siz = [0.17, 0.17, 0];
      this.PANEL_TRACKS.push(pt);

      var gt = this.sShelfScore.tracks[i * 19 + j * 2 + 3];
      gt.setPuppet(true);
      gt.frame.pos = [(j%3 - 1) * 20, 35 - Math.floor( j / 3 ) * 31, -40];
      gt.frame.siz = [1, 1, 1];
      gt.frame.visible = true;
      this.PANEL_GHOST_TRACKS.push(gt);

      this.panel_original_pos.push(new Vector3D(gt.frame.pos));
      this.panel_pop_state.push(this.POPDOWN);
      this.PANEL_INDEX_TO_ID[index] = id++;
    }
  }


  //
  //  Camera
  //

  this.CAMERA_TRACK = this.contents.scoresL['スコア0'].tracks[0];
  this.CAMERA_TRACK.setPuppet(true);
  //this.CAMERA_TRACK.frame.make(1);
  this.CAMERA_TRACK.frame.visible = true;
  this.CAMERA_TRACK.frame.pos = [0, 28.7, -220];
  this.CAMERA_TRACK.frame.rot = [0.1381320059299469, 0, 0, 1];

  this.CAMERA_CAST = this.contents.cameraCasts[0];
  this.CAMERA_CAST.cameraAngle = 36;


  //
  // Screen
  //

  this.SCREEN_POS_UP = new Vector3D([0, 490, 0]);
  this.SCREEN_POS_DOWN = new Vector3D([0, 600, 0]);

  this.screen_ghost = this.contents.scoresL["screen"].tracks[0];
  this.screen_ghost.setPuppet(true);
  this.screen_ghost.frame.pos = this.SCREEN_POS_DOWN;
  this.screen_ghost.frame.visible = true;

  this.screen_pop_state = this.STOP;
  this.screen_pop_count = 0;


  //
  // Panel Texture
  //

  this.PANEL_TEXTURE = [
    this.contents.textureCastsL["Texture_00"].index,
    this.contents.textureCastsL["Texture_01"].index,
    this.contents.textureCastsL["Texture_02"].index,
    this.contents.textureCastsL["Texture_03"].index,
    this.contents.textureCastsL["Texture_04"].index,
    this.contents.textureCastsL["Texture_05"].index,
    this.contents.textureCastsL["Texture_06"].index,
    this.contents.textureCastsL["Texture_07"].index,
    this.contents.textureCastsL["Texture_08"].index,
    this.contents.textureCastsL["Texture_09"].index,
    this.contents.textureCastsL["Texture_10"].index,
    this.contents.textureCastsL["Texture_11"].index,
    this.contents.textureCastsL["Texture_12"].index,
    this.contents.textureCastsL["Texture_13"].index,
    this.contents.textureCastsL["Texture_14"].index,
    this.contents.textureCastsL["Texture_15"].index,
    this.contents.textureCastsL["Texture_16"].index,
    this.contents.textureCastsL["Texture_17"].index,
    this.contents.textureCastsL["Texture_18"].index,
    this.contents.textureCastsL["Texture_19"].index,
    this.contents.textureCastsL["Texture_20"].index,
    this.contents.textureCastsL["Texture_21"].index,
    this.contents.textureCastsL["Texture_22"].index,
    this.contents.textureCastsL["Texture_23"].index,
    this.contents.textureCastsL["Texture_24"].index,
    this.contents.textureCastsL["Texture_25"].index,
    this.contents.textureCastsL["Texture_26"].index,
    this.contents.textureCastsL["Texture_27"].index,
    this.contents.textureCastsL["Texture_28"].index,
    this.contents.textureCastsL["Texture_29"].index,
    this.contents.textureCastsL["Texture_30"].index,
    this.contents.textureCastsL["Texture_31"].index,
    this.contents.textureCastsL["Texture_32"].index,
    this.contents.textureCastsL["Texture_33"].index,
    this.contents.textureCastsL["Texture_34"].index,
    this.contents.textureCastsL["Texture_35"].index
      ];



  /*------------------------------
    Pagination
  ------------------------------*/

  jQuery("ul#pagination").append(
      '<li><a onclick="model.shelf_turn_left();" onmouseover="model.shelf_lean_left();" onmouseout="model.shelf_out_left();">&laquo;</a></li>');
  for (var i = 0; i < this.MAX_FACES; ++i) {
    jQuery("ul#pagination").append(
        this.sprintf('<li class="p{0}"><a onclick="model.shelf_jump({0});">{1}</a></li>', i, i+1));
  }
  jQuery("ul#pagination").append(
      '<li><a onclick="model.shelf_turn_right();" onmouseover="model.shelf_lean_right();" onmouseout="model.shelf_out_right();">&raquo;</a></li>');



  /*------------------------------
    Config
  ------------------------------*/

  this.config_isEaseOut = true;
  this.config_isPagination = true;
  this.config_isProgressBar = false;



  /*------------------------------
    Other
  ------------------------------*/

  //
  // Load Textures
  //

  this.invisible_textures(-1)
  this.update_textures(0);
  this.update_textures(1);
  this.update_textures(2);
  //this.invisible_textures(2)


  //
  // Nexsus7の判定
  //

  var agent = navigator.userAgent;
  this.is_android = false;
  if(agent.search(/Android/) != -1){
    this.is_android = true;
  }


  this.update_caption();
}

/*------------------------------
  Model Main
------------------------------*/

Model.prototype.shelf_main = function () {

  //
  // Shelf
  //

  if (this.is_shelf_rolling) {
    var r   = this.SHELF_ROT * (this.shelf_rot_state - this.shelf_rot_state_pre);
    var pad = this.shelf_rot_state_pre * this.SHELF_ROT;
    var t   = this.shelf_rot_count / this.FRAME_SHELF_ROLL;
    var x   = this.easeOut(t);
    this.shelf_rot = pad + r * x;

    if (this.shelf_rot_count >= this.FRAME_SHELF_ROLL) {
      this.is_shelf_rolling = false;
      this.update_textures(this.shelf_rot_state - 1);
      this.update_textures(this.shelf_rot_state + 1);
      //this.invisible_textures(this.shelf_rot_state + 2);
    } else {
      ++this.shelf_rot_count;
    }
  } else {
    this.shelf_rot = this.SHELF_ROT * this.shelf_rot_state;
  }

  //
  // Shelf Lean
  //

  if (this.is_shelf_leaning) {
    if (this.shelf_lean_count >= this.FRAME_SHELF_LEAN) {
      this.is_shelf_leaning = false;
    } else {
      ++this.shelf_lean_count;
    }
  }
  if (this.is_shelf_outing || this.is_shelf_drag_outing) {
    if (this.shelf_lean_count <= 0) {
      this.is_shelf_outing = false;
      this.is_shelf_drag_outing = false;
    } else {
      --this.shelf_lean_count;
    }
  }

  if (this.is_shelf_rolling) {
    this.shelf_lean_rot = 0;
  } else if (this.shelf_lean_count > 0) {
    if (this.is_shelf_drag_outing) {
      this.shelf_lean_rot = this.shelf_drag_end_rot * this.easeOut(this.shelf_lean_count / this.FRAME_SHELF_OUT_DRAG);
    } else {
      this.shelf_lean_rot = 0.3 * this.easeOut(this.shelf_lean_count / this.FRAME_SHELF_LEAN);
    }
  } else {
    var d = Math.abs(this.mouse_drag_weight);
    if (d > 170) {
      d = 170;
    }
    this.shelf_lean_rot = (d >= 30) ? 0.005 * d : 0;
    this.is_shelf_lean_right = (this.mouse_drag_weight < 0);
  }

  this.shelf_root.frame.rot[1] = this.shelf_rot + (this.is_shelf_lean_right ? 
      this.shelf_lean_rot : -this.shelf_lean_rot);


  //
  // Panel
  //

  if ( this.is_panel_popup && this.panel_pop_state[this.popup_panel_id] == this.POPING) {
    ++this.popup_panel_count;
    this.panel_move(this.popup_panel_id, this.popup_panel_count);
    if ( this.popup_panel_count >= this.FRAME_PANEL_POPUP) {
      this.is_panel_popup = false;
      this.panel_pop_state[this.popup_panel_id] = this.POPUP;
    }
  }

  if ( this.is_panel_popdown && this.panel_pop_state[this.popdown_panel_id] == this.POPING) {
    --this.popdown_panel_count;
    this.panel_move(this.popdown_panel_id, this.popdown_panel_count);
    if ( this.popdown_panel_count <= 0) {
      this.is_panel_popdown = false;
      this.panel_pop_state[this.popdown_panel_id] = this.POPDOWN;
    }
  }


  //
  // Screen
  //

  if (this.screen_pop_state == this.UPING) {
    ++this.screen_pop_count;
    this.screen_move();
    if (this.screen_pop_count >= this.FRAME_SCREEN_POP) {
      this.screen_pop_state = this.STOP;
    }
  } else if (this.screen_pop_state == this.DOWNING) {
    --this.screen_pop_count;
    this.screen_move();
    if (this.screen_pop_count <= 0) {
      this.screen_pop_state = this.STOP;
    }
  }


  //
  // Camera
  //

  if (this.main_count <= this.FRAME_CAMERA_INIT) {
    var x = this.main_count / this.FRAME_CAMERA_INIT;
    var y = this.easeOut(x);
    this.CAMERA_CAST.cameraAngle = 36 + 30 - 30 * y;
  }

  //
  // Main Count
  //

  if (this.main_count == 0) {
    this.update_statusbar();
  }
  ++this.main_count;

};



/*------------------------------
  Mouse
------------------------------*/

//
// Android版のChromeのバグを考慮したマウス座標を返す
//

Model.prototype.get_mouse_pos = function(e) {
  if (this.is_android) {
    var offset = jQuery("canvas#matrixengine-canvas").offset();
    return new Point2D(e.x - offset.left, e.y - offset.top);
  } else {
    return new Point2D(e.x, e.y);
  }
};


//
// マウスのイベントハンドラの e からパネルのトラック番号を得る
//

Model.prototype.get_panel_track = function(e) {
  var pos = this.get_mouse_pos(e);
  var pickUpTrack = matrixEngine.render.pickUp(pos.x, pos.y);
  if (pickUpTrack != null) {
    var mScore = pickUpTrack.score.index;
    var mTrack = pickUpTrack.index;
    if (mScore == this.SCORE_SHELF_INDEX) {
      if (mTrack in this.PANEL_INDEX_TO_ID) {
        var id = this.PANEL_INDEX_TO_ID[mTrack];
        var min = (this.shelf_rot_state % this.NUM_FACES) * this.NUM_PANEL;
        if ( min <= id && id < min + this.NUM_PANEL) {
          return id;
        } else if (this.is_android) {
          // Androidでは、pickUpTrack() が背面のトラックまで拾ってしまうので補正する。
          //jQuery("div#console").append(id + ",");
          var id2 = id + 16;
          if ( min <= id2 && id2 < min + this.NUM_PANEL) {
            return id2;
          }
        }
      }
    }
  }
  return null;
};


//
//  Mouse Move
//

Model.prototype.mouse_move = function (e) {
  for (var i = 0; i < this.MAX_PANELS; ++i) {
    this.PANEL_TRACKS[i].frame.siz = [0.17, 0.17, 0];
  }

  var id = this.get_panel_track(e);
  if (id != null) {
    this.PANEL_TRACKS[id].frame.siz = [0.18, 0.18, 0.18];
  }

  // ドラッグ中
  this.mouse_pos = this.get_mouse_pos(e);
  if (this.is_mouse_drag) {
    this.mouse_drag_weight = this.mouse_pos.x - this.mouse_drag_start_pos.x;
    this.force_panel_popdown();
    ++this.mouse_drag_count;
  } else {
    this.mouse_drag_weight = 0;
    this.mouse_drag_count = 0;
  }
};


//
//  Mouse Down
//

Model.prototype.mouse_down = function (e) {
  var id = this.get_panel_track(e);
  this.select_panel_id_pre = (id != null) ? id : -1;

  // ドラッグの開始
  this.mouse_drag_start_pos = this.get_mouse_pos(e);
  this.is_mouse_drag = true;
  this.mouse_drag_count = 0;
};


//
//  Mouse Up
//

Model.prototype.mouse_up = function (e) {
  var id = this.get_panel_track(e);
  if (id != null && id == this.select_panel_id_pre &&
      this.mouse_drag_count <= 10 && Math.abs(this.mouse_drag_weight) < 150) {
        this.panel_click(id);
      }

  //
  // ドラッグの終了
  //

  if (Math.abs(this.mouse_drag_weight) >= 150) {
    // マウスが離された時に変位が一定以上なら棚を回転させる
    if (this.mouse_drag_weight >= 0) {
      this.shelf_turn_left();
    } else {
      this.shelf_turn_right();
    }
  } else {
    // 回転させないならば、棚を正常位置に戻す
    this.is_shelf_drag_outing = true;
    this.shelf_drag_end_rot = this.shelf_lean_rot;
    this.shelf_lean_count = this.FRAME_SHELF_OUT_DRAG;
  }

  this.is_mouse_drag = false;
  this.mouse_drag_count = 0;
  this.mouse_drag_weight = 0;
};



/*------------------------------
  Shelf
------------------------------*/

//
// Turn
//

Model.prototype.shelf_jump = function (face_n) {

    this.force_panel_popdown();

    this.is_shelf_rolling = true;
    this.shelf_rot_count = this.easeOut_inv(Math.abs(this.shelf_lean_rot / this.SHELF_ROT)) * this.FRAME_SHELF_ROLL;

    this.shelf_rot_state_pre = this.shelf_rot_state;
    this.shelf_rot_state = face_n;

    this.update_textures(this.shelf_rot_state - 1);
    this.update_textures(this.shelf_rot_state);
    this.update_textures(this.shelf_rot_state + 1);

    this.update_statusbar();
    this.update_caption();
};

Model.prototype.shelf_turn_left = function () {
  if (!this.is_shelf_rolling) {
    if (this.shelf_rot_state > 0) {
      this.shelf_jump(this.shelf_rot_state - 1);
    } else {
      this.shelf_jump(Math.ceil(this.MAX_FACES) - 1);
    }
  }
};

Model.prototype.shelf_turn_right = function () {
  if (!this.is_shelf_rolling) {
    if (this.shelf_rot_state < this.MAX_FACES - 1) {
      this.shelf_jump(this.shelf_rot_state + 1);
    } else {
      this.shelf_jump(0);
    }
  }
};


//
// Lean (傾き)
//

Model.prototype.shelf_lean_right = function () {
  if (!this.is_shelf_leaning && !this.is_shelf_outing && 
      this.shelf_rot_state < this.MAX_FACES - 1) {
        this.force_panel_popdown();
        this.is_shelf_lean_right = true;
        this.is_shelf_leaning = true;
        this.is_shelf_outing = false;
      }
}

Model.prototype.shelf_lean_left = function () {
  if (!this.is_shelf_leaning && !this.is_shelf_outing && 
      this.shelf_rot_state > 0) {
        this.force_panel_popdown();
        this.is_shelf_lean_right = false;
        this.is_shelf_leaning = true;
        this.is_shelf_outing = false;
      }
}

//
// Lean の解除
//

Model.prototype.shelf_out_right = function () {
  this.is_shelf_lean_right = true;
  this.is_shelf_leaning = false;
  this.is_shelf_outing = true;
}

Model.prototype.shelf_out_left = function () {
  this.is_shelf_lean_right = false;
  this.is_shelf_leaning = false;
  this.is_shelf_outing = true;
}



/*------------------------------
  Panel
------------------------------*/

//
// Update Texture
//

Model.prototype.update_textures = function (face_n) {

  if (face_n == this.shelf_texture_loaded_item[face_n % this.NUM_FACES]) {
    return;
  }

  if (face_n < 0 || face_n >= Math.ceil(this.MAX_FACES)) {
    this.invisible_textures(face_n);
    return;
  }

  this.shelf_texture_loaded_item[face_n % this.NUM_FACES] = face_n;
  var item_n = face_n * this.NUM_PANEL;
  var texture_n = (face_n % this.NUM_FACES) * this.NUM_PANEL;

  for (var i = 0; i < this.NUM_PANEL; ++i) {

    var texture_id = texture_n + i;
    var item_id = item_n + i;

    if (item_id < this.ITEM_MAX) {
      var url = this.ITEM_IMAGE_PATH + this.ITEM_DATA[item_id][this.KEY_URL];
      this.contents.textureCasts[this.PANEL_TEXTURE[texture_id]].loadImage(url);
      this.PANEL_TRACKS[texture_id].frame.visible = true;
      //this.PANEL_TRACKS[texture_id].frame.siz = [0.17, 0.17, 0];
    } else {
      this.PANEL_TRACKS[texture_id].frame.visible = false;
    }
  }
};

Model.prototype.invisible_textures = function (face_n) {

  var face_n2 = (face_n + this.NUM_FACES) % this.NUM_FACES;
  this.shelf_texture_loaded_item[face_n2] = -1;
  var texture_n = face_n2 * this.NUM_PANEL;

  for (var i = 0; i < this.NUM_PANEL; ++i) {
    var texture_id = texture_n + i;
    this.PANEL_TRACKS[texture_id].frame.visible = false;
    //this.PANEL_TRACKS[texture_id].frame.siz = [0, 0, 0];
  }
};

//
// Panel Move
//

Model.prototype.panel_move = function(panel_id, count) {
  var x = count / this.FRAME_PANEL_POPUP;// [0 1]の係数
  var z = this.easeOut(x);
  var origin = this.panel_original_pos[panel_id].clone();
  var target = this.POPUP_TARGET_POS.clone();
  var v = target.diff(origin).scale(z);
  this.PANEL_GHOST_TRACKS[panel_id].frame.pos = origin.add(v).vec;
}


//
// PopUpされたPanelの強制PopDown
//

Model.prototype.force_panel_popdown = function () {

  this.is_shelf_leaning = false;
  this.is_shelf_outing = false;
  this.shelf_lean_count = 0;

  var panel_id = this.popup_panel_id;
  if (panel_id == -1 || this.panel_pop_state[panel_id] != this.POPUP) {
    return;
  }

  this.is_panel_popdown = true;
  this.popdown_panel_id = panel_id;
  this.popdown_panel_count = this.FRAME_PANEL_POPUP;
  this.panel_pop_state[panel_id] = this.POPING;

  this.screen_pop_state = this.DOWNING;
}

//
// Panel Click
//

Model.prototype.panel_click = function (panel_id) {

  if (panel_id == -1 || this.is_panel_popup || this.is_panel_popdown) {
    return;
  }

  // PopDown
  if ( this.panel_pop_state[panel_id] == this.POPUP ) {
    this.is_panel_popdown = true;
    this.popdown_panel_id = panel_id;
    this.popdown_panel_count = this.FRAME_PANEL_POPUP;
    this.panel_pop_state[panel_id] = this.POPING;

    // Screen
    this.screen_pop_state = this.DOWNING;
    this.screen_pop_count = this.FRAME_SCREEN_POP;
  }

  // PopUp
  if ( this.panel_pop_state[panel_id] == this.POPDOWN ) {

    this.force_panel_popdown();

    this.is_panel_popup = true;
    this.popup_panel_id = panel_id;
    this.popup_panel_count = 0;
    this.panel_pop_state[panel_id] = this.POPING;

    // Screen
    var item_id = this.shelf_rot_state * this.NUM_PANEL + this.popup_panel_id % this.NUM_PANEL;
    this.contents.textCastsL["NameText"].lines = this.ITEM_DATA[item_id][this.KEY_TITLE].split("\n");
    this.contents.textCastsL["PriceText"].lines[0] = this.sprintf("{0} 円", this.ITEM_DATA[item_id][this.KEY_PRICE]);
    this.contents.textCastsL["NameText"].invalidate();
    this.contents.textCastsL["PriceText"].invalidate();

    this.screen_pop_state = this.UPING;
    this.screen_pop_count = 0;
  }
}



/*------------------------------
  Other
------------------------------*/

//
// Screen
//

Model.prototype.screen_move = function () {
  var x = this.screen_pop_count / this.FRAME_SCREEN_POP;// [0 1]の係数
  var z = this.easeOut(x);
  var up = this.SCREEN_POS_UP.clone();
  var down = this.SCREEN_POS_DOWN.clone();
  var v = up.diff(down).scale(z);
  this.screen_ghost.frame.pos = down.add(v).vec;
}

//
// Caption
//

Model.prototype.limit_panel_id = function (panel_id) {
  if (panel_id >= this.ITEM_MAX) {
    return this.ITEM_MAX - 1;
  } else if (panel_id < 0 ) {
    return 0;
  } else {
    return panel_id;
  }
}

Model.prototype.update_caption = function () {
  var a = this.limit_panel_id(this.shelf_rot_state * this.NUM_PANEL);
  var b = this.limit_panel_id((this.shelf_rot_state + 1) * this.NUM_PANEL - 1);
  var caption = this.sprintf(this.SORT_FORMAT[this.sort_key], 
      this.ITEM_DATA[a][this.sort_key], this.ITEM_DATA[b][this.sort_key]);

  jQuery("div#caption").html(caption);
};


//
// StatusBar
//

Model.prototype.update_statusbar = function () {
  jQuery('#progress').css('width', this.sprintf("{0}%", 100.0 * (this.shelf_rot_state+1) / this.MAX_FACES));

  jQuery(this.sprintf('ul#pagination>li.p{0}', this.shelf_rot_state_pre)).removeClass('active');
  jQuery(this.sprintf('ul#pagination>li.p{0}', this.shelf_rot_state)).addClass('active');
}


//
// Config
//

Model.prototype.config_apply = function () {
  this.config_isEaseOut = jQuery('#configEaseOut').prop('checked');
  this.config_isPagination = jQuery('#statusBarTypePagination').prop('checked');
  this.config_isProgressBar = jQuery('#statusBarTypeProgressBar').prop('checked');

  jQuery('#divPagination').css('display', this.config_isPagination ? 'block' : 'none');
  jQuery('#divProgress').css('display', this.config_isProgressBar ? 'block' : 'none');
}



/*------------------------------
  Sort Items
------------------------------*/

// 比較用関数を返す
Model.prototype.get_compare = function (key, order) {
  switch (order) {
    case this.ASC:
      return function (a,b) { return (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0; };
    case this.DESC:
      return function (a,b) { return (a[key] > b[key]) ? -1 : (a[key] < b[key]) ? 1 : 0; };
    default:
      return null;
  }
};

Model.prototype.sort_items = function (key, order) {

  this.sort_key = key;
  this.sort_order = order;

  var compare = this.get_compare(key, order);

  this.force_panel_popdown();
  this.ITEM_DATA.sort(compare);

  // テスクチャの更新
  this.shelf_texture_loaded_item = [-1, -1, -1, -1];
  this.update_textures(this.shelf_rot_state - 1);
  this.update_textures(this.shelf_rot_state);
  this.update_textures(this.shelf_rot_state + 1);
  //this.invisible_textures(this.shelf_rot_state + 2);

  this.update_caption();
}

Model.prototype.sort_toggle = function (key) {
  var order = (this.sort_orders[key] ^= 1);

  var pre = '&nbsp;&nbsp;';
  var order_str = (order == this.ASC) ? "▲" : "▼";

  for (var ikey in this.KEY_NAMES) {
    var name = this.KEY_NAMES[ikey];
    var id = this.sprintf('#sort_{0}', name);
    if (ikey == key) {
      jQuery(id).html(pre + name + order_str);
      jQuery(id).parent('li').addClass('active');
    } else {
      jQuery(id).html(pre + name);
      jQuery(id).parent('li').removeClass('active');
    }
  }

  this.sort_items(key, order);
};
