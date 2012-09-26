動的に作成したフォームをAjaxで送信
=====


開発開始
----------
Since 2012.08.19


確認ブラウザ
----------

Firefox 15.0.1


依存ライブラリ
----------

* jQuery 1.8.1。
* jQuery.uploado
  http://lagoscript.org/jquery/upload


PHPバージョン
----------

5.2.9以上


オブジェクト実装パターン
----------

実装オブジェクトはApp.namespaceで管理する。

* 実装オブジェクトは1つのファイルに１つの1オブジェクトを定義する
* 実装オブジェクトは疎結合にする。 
* 実装オブジェクトの利用はmain.jsで行う。

実装オブジェクトは下記パターンで記述(example.js)。

    jQuery(function() {

        /**
         * オブジェクトの実装パターンの例。
         */
        var example = App.namespace('eample')

        // 実装の定義
        (function() {
            // プライベート変数の例。
            var privateVar;

            // プライベート関数の例。
            function privateFunction() {};

            /**
             * パブリックな関数の例。
             */
            function publicFunction() {};

            // パブリックメソッドの設定
            example.publicFunction = publicFunction;
       }());

    });

* jQuery(function($) {})の変数スコープは閉じている。
  + 上記パターンで変数の重複は起こらない。
  + シングルトンパターンを満たす。
* パブリックな変数は使わない。
  代わりにsetter/getterを提供する。


実装オブジェクトの利用(main.js)

実装オブジェクトはmain.jsでのみ利用する。

    jQuery(function($) {
        var example = App.namespace('example');
        ....
    });


トップレベル
----------

グローバル変数はJQueryとAppだけ


名前空間
----------

App.namespaceは引数に指定されたオブジェクトが内部オブジェクトリストにあるときはそのオブジェクトを返す。
ないときは新たに空オブジェクト{}を作成し内部オブジェクトリストに登録して返す。

App.namespaceを使うことでオブジェクトを重複して定義するのを防ぐ。


構成
----------

* App.js
  トップレベルオブジェクト。
  + 名前空間管理。
* ajax.js
  Ajax通信を行う。
* form_section.js
  classにform-sectionを指定したDIV要素を管理する。
* form_action.js
  FORM要素のアクション(追加・並び替え)制御する。
    + FORM要素の追加。
    + FORM要素の並び替え。
* form_transfer_controller.js
  サーバー通信のコントローラー。
    + 更新
        - テキストデータのみajax.requestを使う(Ajax)。
        - 画像を含むmultipart/form-data
          jQuery.uploadを使ったAjaxの擬似的な送受信。
    + 削除
* form_factory.js
  FORM要素を作成する。
* main.js
  main処理。  
  このファイル以外は疎結合。


注意点
---------

* Macのローカル(XAMP for Mac)で確認するときはパーミションに気をつける。
  XAMPPのデフォルトはApacheをnobodyで実行する。


