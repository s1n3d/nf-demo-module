import { html, css } from "polylib";
import { PlForm } from "@nfjs/front-pl/components/pl-form.js";

export default class ModalGrid extends PlForm {
    static get properties() {
        return {
            row:{ type: Object, value: ()=>({})}
        };
    }

    static get css() {
        return css`{
           
        }`
    }
    static get template() {
        return html`
                <pl-tabpanel>
                    <pl-tab header="Основное">
                        <pl-flex-layout vertical fit justify style="padding-top: 10px">
                            <pl-input label="Имя пользователя" value="{{row.username}}" title="[[row.username]]"></pl-input>
                            <pl-input label="Полное имя пользователя" value="{{row.fullname}}" title="[[row.fullname]]"></pl-input>
                            <pl-datetime label="Дата регистрации" value="{{row.extra.date}}"></pl-datetime>
                        </pl-flex-layout>
                    </pl-tab>
                    <pl-tab header="Дополнительно">
                        <pl-flex-layout vertical fit justify style="padding-top: 10px">
                            <pl-input label="Номер телефона" value="{{row.mobile}}">
                                <pl-input-mask mask="+7(000) 000-00-00"></pl-input-mask>
                            </pl-input>
                            <pl-input label="Эл. почта" value="{{row.email}}"></pl-input>
                        </pl-flex-layout>
                        
                    </pl-tab>
                </pl-tabpanel>    
                <pl-flex-layout>
                    <pl-button label="Сохранить" on-click="[[save]]"></pl-button>
                    <pl-button label="Закрыть" on-click="[[close]]"></pl-button>
                </pl-flex-layout>
        `;
    }

    async onConnect(){
        console.log(this.row)
        if(!this.row){
            this.row = {
                username: null,
                fullname: null,
                extra: {
                    date: null
                },
                mobile: null,
                email: null
            }
        }
    }
    async save(){
        this.close(this.row)
    }
}

