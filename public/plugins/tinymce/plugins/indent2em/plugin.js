/*
 * @Author: 陈伟亮 1186723967@qq.com
 * @Date: 2020-09-02 10:01:22
 * @LastEditors: 陈伟亮 1186723967@qq.com
 * @LastEditTime: 2022-08-02 15:59:31
 * @FilePath: \background-front-end\static\plugins\tinymce\plugins\indent2em\plugin.min.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
tinymce.PluginManager.add('indent2em', function(editor, url) {
    var pluginName='首行缩进';
    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
    var indent2em_val = editor.getParam('indent2em_val', '2em');
    var doAct = function () {
        var dom = editor.dom;
        var blocks = editor.selection.getSelectedBlocks();
        var act = '';
        
        // console.log(editor.dom)
        global$1.each(blocks, function (block) {
            var flag=true
            var children=block.children
            //给块级元素加上font-size使em宽度为一个文字大小
            if(children.length!=0&&children[0].style['font-size']){
                block.style['font-size']=children[0].style['font-size']
            }
            // 如果块级元素里有图片不设置text-indent
            while (children.length==1){
                if(children[0].tagName=='IMG'){
                    flag=false
                }
                children=children[0].children
            }
            if(flag||blocks.length==1){
                if(act==''){
                    act = dom.getStyle(block,'text-indent')==indent2em_val ? 'remove' : 'add';
                }
                if( act=='add' ){
                    dom.setStyle(block, 'text-indent', indent2em_val);
                }else{
                    var style=dom.getAttrib(block,'style');
                    var reg = new RegExp('text-indent:[\\s]*' + indent2em_val + ';', 'ig');
                    style = style.replace(reg, '');
                    dom.setAttrib(block,'style',style);
                }
            }
            

        });
    };

    editor.ui.registry.getAll().icons.indent2em || editor.ui.registry.addIcon('indent2em','<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M170.666667 563.2v-102.4H887.466667v102.4zM170.666667 836.266667v-102.4H887.466667v102.4zM512 290.133333v-102.4H887.466667v102.4zM238.933333 341.333333V136.533333l204.8 102.4z" fill="#2c2c2c" p-id="5210"></path></svg>');

    var stateSelectorAdapter = function (editor, selector) {
      return function (buttonApi) {
        return editor.selection.selectorChangedWithUnbind(selector.join(','), buttonApi.setActive).unbind;
      };
    };
    
    editor.ui.registry.addToggleButton('indent2em', {
        icon: 'indent2em',
        tooltip: pluginName,
        onAction: function () {
            doAct();
        },
        onSetup: stateSelectorAdapter(editor, [
          '*[style*="text-indent"]',
          '*[data-mce-style*="text-indent"]',
        ])
    });

    editor.ui.registry.addMenuItem('indent2em', {
        text: pluginName,
        onAction: function() {
            doAct();
        }
    });

    editor.addCommand('indent2em', doAct  );

    return {
        getMetadata: function () {
            return  {
                name: pluginName,
                url: "http://tinymce.ax-z.cn/more-plugins/indent2em.php",
            };
        }
    };
});
