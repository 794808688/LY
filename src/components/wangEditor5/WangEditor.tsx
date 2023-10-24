import * as React from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig, DomEditor, SlateElement, createEditor } from '@wangeditor/editor'
import AdminConfig from '~/config'
import store from '~/store'
import '@wangeditor/editor/dist/css/style.css'
import './index.scss'
export default function wangeditor(props: any) {
    const user = store.getState().user
    const [editor, setEditor] = React.useState<any>(null)  

    //富文本
    const toolbar = DomEditor.getToolbar(editor)
    // const editorJson = createEditor({html})
    // console.log(html);
    // console.log(editorJson.children);
    const curToolbarConfig = toolbar?.getConfig()
    // console.log(curToolbarConfig?.toolbarKeys)
    type ImageElement = SlateElement & {
        src: string
        alt: string
        url: string
        href: string
    }
    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {

    }
    //排除菜单
    toolbarConfig.excludeKeys = [
        // "insertTable",
        // "codeBlock",
        "insertLink",
        "code",
        "sup",
        "sub"
    ]
    // // 编辑器配置
    // const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    //     placeholder: '请输入内容...',

    // }
    // 初始化 MENU_CONF 属性
    const editorConfig: any = {  // TS 语法
        MENU_CONF: {}
    }

    // 修改 uploadImage 菜单配置
    type InsertFnType = (url: string, alt: string, href: string) => void
    editorConfig.MENU_CONF['uploadImage'] = {
        server: `${AdminConfig.API_URL}${AdminConfig.LOCAL_PATH}?mod=9&do=901&type=73&uid=${user.uid}&localstore=${user.localstore}`,
        fieldName: 'Filedata',
        maxNumberOfFiles: 10,
        customInsert(res: any, insertFn: InsertFnType) {  // TS 语法
            // res 即服务端的返回结果
            console.log(res)
            // 从 res 中找到 url alt href ，然后插入图片
            insertFn(AdminConfig.API_SOURCE + '/' + res.data.path, res.data.url, res.data.url)
        },
        // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
        allowedFileTypes: [],
        maxFileSize: 10 * 1024 * 1024,
        // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
        meta: {
            token: 'xxx',
            otherKey: 'yyy'
        },
        // 将 meta 拼接到 url 参数中，默认 false
        metaWithUrl: true,
    }

    editorConfig.MENU_CONF['uploadVideo'] = {
        server: `${AdminConfig.API_URL}${AdminConfig.LOCAL_PATH}?mod=9&do=901&type=74&uid=${user.uid}&localstore=${user.localstore}`,
        // form-data fieldName ，默认值 'wangeditor-uploaded-video'
        fieldName: 'Filedata',
        customInsert(res: any, insertFn: any) {  // TS 语法
            // console.log(res)
            insertFn(AdminConfig.API_SOURCE + '/' + res.data.path, AdminConfig.API_SOURCE + '/' + res.data.cover)
        },

        // 最多可上传几个文件，默认为 5
        maxNumberOfFiles: 3,

        // 选择文件时的类型限制，默认为 ['video/*'] 。如不想限制，则设置为 []
        allowedFileTypes: ['video/*'],

        // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
        meta: {
            token: 'xxx',
            otherKey: 'yyy'
        },

        // 将 meta 拼接到 url 参数中，默认 false
        metaWithUrl: false,

        // 自定义增加 http  header
        headers: {
            Accept: 'text/x-json',
            otherKey: 'xxx'
        },


        // 视频不支持 base64 格式插入
    }

    // 及时销毁 editor ，重要！
    React.useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    return (
        <div className='wangeditor'>
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={props.html}
                    onCreated={setEditor}
                    onChange={(editor: any) => props.setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '360px', overflowY: 'hidden' }}
                />
            </div>
        </div>
    )
}