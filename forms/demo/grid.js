import { html, css } from "polylib";
import { PlForm } from "@nfjs/front-pl/components/pl-form.js";

export default class Login extends PlForm {
    static get properties() {
        return {
            formTitle: { type: String, value: 'Демо форма' },
            users: { type: Array, value: () => ([])},
            selectedUser: { type: Object, value: () =>{}}
        };
    }

    static get css() {
        return css`{
           
        }`
    }
    static get template() {
        return html`
            <pl-tabpanel>
                <pl-tab header="Список пользователй">
                <pl-flex-layout fit justify>
                    <pl-grid data="{{users}}" selected="{{selectedUser}}" on-dblclick="[[clickGrid]]">
                        <pl-flex-layout slot="top-toolbar">
                            <pl-button label="Действия" on-click="[[showColumnMenu]]"></pl-button>
                        </pl-flex-layout>
                        <pl-grid-column sortable field="username" header="Имя" width="200" resizable></pl-grid-column>
                        <pl-grid-column sortable field="fullname" header="Возраст"></pl-grid-column>
                        <pl-grid-column sortable field="mobile" header="Номер телефона"></pl-grid-column>
                        <pl-grid-column sortable field="email" header="Эл. почта"></pl-grid-column>
                        <pl-grid-column width="50" action>
                            <template>
                                <pl-flex-layout>
                                    <pl-icon-button iconset="pl-default" size="16" icon="trashcan" on-click="[[deleteRow]]"></pl-icon-button>
                                </pl-flex-layout>
                            </template>
                        </pl-grid-column>
                    </pl-grid>
                </pl-flex-layout>
                </pl-tab>
            </pl-tabpanel>
            <pl-dropdown-menu id="ddMenuActions">
                <pl-dropdown-menu-item label="Добавить" on-click="[[addRow]]"></pl-dropdown-menu-item>
                <pl-dropdown-menu-item label="Редактировать" on-click="[[clickGrid]]"></pl-dropdown-menu-item>
                <pl-dropdown-menu-item label="Удалить" on-click="[[deleteRow]]"></pl-dropdown-menu-item>
            </pl-dropdown-menu>
            
            <pl-dataset id="dsUsersList" data="{{users}}" endpoint="/@nfjs/back/endpoint-sql/demo.users.test" type="sql-endpoint"></pl-dataset>
        `;
    }

    async onConnect(){
        await this.$.dsUsersList.execute()

    }

    async addRow(){
        let res = await this.openModal(
            'demo.modal-grid',
            { row: null}  ,
        )
        if(res){
            this.push('users', res)
        }
    }

    async clickGrid(val){
        console.log(val.model, this.selectedUser)
        let res = await this.openModal(
            'demo.modal-grid',
            { row: (val && val.model ||  this.selectedUser)  ? this.selectedUser : null}  ,
        )
        if(res){
            let idx = this.users.findIndex(v => v.id == res.id)
            this.splice('users',idx, 1, res)

        }
    }
    async deleteRow(item){
        if(!this.selectedUser) return
        let idx = this.users.findIndex(v => v.id == this.selectedUser.id)
        this.splice('users', idx, 1)
        if(this.users.length == 0) this.set('selectedUser', {})
    }
    showColumnMenu(event) {
        this.$.ddMenuActions.open(event.target, undefined, { model: event.model });
    }
}

