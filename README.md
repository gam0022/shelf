# what is it

[COJT SW 5th](http://inf.tsukuba.ac.jp/ET-COJT/)用に作った何か。

HTML5とWebGLを駆使して作成したカバンの商品カタログっぽいものです。

# deploy

一応、次のアドレスにデプロイしています。

[COJT用の何か](http://gam0022.net/app/shelf/)

# ファイル構成

自分用のメモなので、適当な上に書きかけです。

* shelf.mxp ... マトリックスなんとかのプロジェクトファイル。バイナリ。
* shelf.webgl/ ... 上のプロジェクトから作成したHTML5用のランタイムファイルを生成するディレクトリ。
    * assets/ ... bootstrap用のディレクトリ。
    * images/ ... 画像を置くディレクトリ。
    * js/ ... JavaScript用のディレクトリ。
        * matrixengine-controller-skeleton.js  ... MVCでいうCの部分だが、自動生成されたファイルなので使わない。
        * controller.js ... 上を書き換えて使えるようにしたファイル。どこを書き換えたかは後述。
        * model.js ... MVCのMの部分。ほとんどの変更はこのファイル。Modelクラスを定義している。
        * その他の.js ... プロジェクトが自動生成したファイルなので、ランタイムを作るたびに上書きされるので弄らない。
    * index.html　... メインのHTMLファイル。
    * sample.html ... プロジェクトが自動生成したゴミ。基本的には使わない。
    * manual.html ... 取り扱い説明書。
    * deploy ... デプロイ用のシェルスクリプト。
* misc/ ... テスクチャに使えそうな画像を適当に置くディレクトリ。
* bag_images/ ... バックの商品画像置き場。
* bag\_info/ ... バックの情報用のCSVなどを置くディレクトリ。
    * bags.csv ...バックの情報用のCSV
    * csv_to_array.rb ... CSVを入力として JavaScript の Array 風に変換して出力するスクリプト。
    * array.js ... 上のファイルの成果物。
* hls_spot/ ... 画像の色相を計算するためのXcodeのプロジェクト。openCVを利用。
* preview.rb ... WEBrick を利用して localhost:3000 でプレビューするためのスクリプト。

## controller.js の作り方

1. `cp matrixengine-controller-skeleton.js controller.js`
2. vimで、`:%s/(\*\\\//(\*\//g` をする。
3. 1行目に、`var model = new Model();` を追加。
4. 関数`var MxeDefaultController = function(contents) {};` の最後の行に、`model.init(contents); `　を追加。
