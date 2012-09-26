jQuery(function($) {
    /**
     * フォームセクション管理。
     *
     * フォームセクションはclass名にform-sectionを指定したdiv要素。
     */
    var formSection = App.namespace('formSection');

    // formSectionオブジェクト実装
    (function() {

        // formのjQueryオブジェクト
        var sectionjQuery;

        /**
         * sectionjQueryを返す。
         *
         * @param {jQuery} セクションのjQueryオブジェクトを返す。
         */
        function getSectionjQuery() {
            return sectionjQuery;
        }

        /**
         * classにform-sectionを付けた要素をsectionjQueryに設定する。
         *
         * @param {String} idName classにform-sectionを指定した要素のid名。<br>
         *
         * @return オブジェクトチェーン用に自身を返す。
         *
         * @throws NotFountElement
         * 引数に対応する要素が見つからない。
         * @throws NullPointException
         * 引数が無いまたは空文字で呼び出れたとき。
         */
        function setFormSection(idName) {
            if (typeof idName === 'undefined' || idName === '') {
                throw new Exception('NullPointException');
            }
            if ($('#' + idName) === false) {
                throw new Exception();
            }
            // form-sectionのjQueryオブジェクト
            sectionjQuery = $('#' + idName);

            formLength = $('form', sectionjQuery).length;
            return this;
        }

        // FORM要素数
        var formLength = 0;

        /**
         * フォームセクション内のフォームの要素数の設定
         */
        var setFormLength = function(currentLength) {
            if (typeof sectionjQuery === "undefined") {
                return 0;
            }
            formLength = currentLength;
        };

        /**
         * フォームセクション内のフォーム要素数のを取得
         *
         * @return {Number} セクション内のフォーム要素の数
         */
        var getFormLength = function() {
            if (typeof sectionjQuery == "undefined") {
                return 0;
            }

            return formLength;
        };

        // 要素の順序をJSONで格納
        var formOrderList = {};

        /**
         * formOrderListを返す
         * テスト用
         */
        function getFormOrderList() {
            return formOrderList;
        }

        /**
         * フォームの順序を設定する。
         * 
         * <input type="hidden" name="meta_order">}をせ設定する。
         * 無いときは追加する。
         * meta_orderは要素追加・並び替え・表示(vnew/client/index.php)のときに必ず設定すべき。
         *
         */
        function setMetaOrder() {
            var formItems = $('form', sectionjQuery);
            formItems.each(function(i) {
                if ($('input[name="meta_order"]', formItems[i]).length !== 0) {
                    $('input[name="meta_order"]', formItems[i]).attr('value', i);
                } else {
                    $(formItems[i]).append('<input type="hidden" name="meta_order" value="' + i + '">');
                }
            });
            return this;
        }

        /*
         * meta_keyとmeta_orderのペアを設定する。
         *
         * <p>要素追加・並び替え・表示(vnew/client/index.php)のときに必ずy呼び出す。</p>
         * <pre>
         * put type="hidden" name="orderhash" value="{"meta_key1": "meta_value2", "meta_key2": "meta_value2"}">
         * </pre>
         */
        function setFormOrderList() {
            var formItems = $('form', sectionjQuery);
            var id;
            var order;
            formItems.each(function(i) {
                id = $(formItems[i]).attr('id');
                order = $('input[name="meta_order"]', formItems[i]);
                formOrderList[id] = $(order).val(); 
            });
        }

        // 公開メソッド
        formSection.getFormLength = getFormLength;
        formSection.setFormLength = setFormLength;
        formSection.getSectionjQuery = getSectionjQuery;
        formSection.setMetaOrder = setMetaOrder;
        formSection.setFormOrderList = setFormOrderList;
        formSection.setFormSection = setFormSection;


        // テスト用
        formSection.getFormOrderList = getFormOrderList;
    }());

});
