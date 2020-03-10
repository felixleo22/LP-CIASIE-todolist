import Vue from 'nativescript-vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import SQLite from 'nativescript-sqlite';

const store = new Vuex.Store({
    state: {
        database: null,
        todoItems: [],
    },
    getters: {
        todoItems(state) {
            return state.todoItems;
        }
    },
    mutations: {
        init(state, data) {
            state.database = data.database;
            state.todoItems = data.todoItems
        },
        insert(state, data) {
            state.todoItems.unshift(data.todoItem);
        },
        update(state, data) {
            const index = state.todoItems.findIndex((item) => item.id === data.todoItem.id);
            state.todoItems.splice(index, 1, data.todoItem);
        },
        delete(state, data) {
            const index = state.todoItems.findIndex((item) => item.id === data.todoItem.id);
            state.todoItems.splice(index, 1);
        }
    },
    actions: {
        init(context) {
            (new SQLite('todolist.db'))
            .then((db) => {
                //create db
                db.execSQL("CREATE TABLE IF NOT EXISTS todoitems (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, done TEXT)")
                .then(id => {

                    //get data
                    if(!db) return;
                    db.all('SELECT * FROM todoitems ORDER BY id DESC', [])
                    .then((result) => {
                       const mapedItems = result.map((item) => {
                           return {id: item[0], name: item[1], done: item[2] === 'true'}
                       });
                       context.commit('init', {database: db, todoItems: mapedItems});
                    })
                    .catch(() => {
                        console.log('CANNOT INSERT TODO ELEMENT IN DB');
                    });
                })
                .catch(() => {
                    console.log('CANNOT CREATE TABLE');
                })
            })
            .catch(() => {
                console.log('CANNOT OPEN DATABASE');
            });
        },
        insert(context, item) {
            const db = context.state.database;
            db.execSQL("INSERT INTO todoitems(name, done) VALUES (?,?)", [item.name, 'false'])
            .then((id) => {
                const newItem = {
                    id: id,
                    name: item.name,
                    done: false,
                }

                context.commit('insert', {todoItem: newItem});
            })
            .catch(() => {
                console.log('CANNOT INSERT TODO ITEM IN DB', error);
            });
        },
        update(context, item) {
            const db = context.state.database;
            if(item.id < 0) return;
            db.execSQL("UPDATE todoitems SET name = ?, done = ? WHERE id = ? ", [item.name, item.done.toString(), item.id])
            .then((id) => {
                context.commit('update', {todoItem: item});
            })
            .catch(() => {
                console.log('CANNOT INSERT TODO ITEM IN DB', error);
            })
        },
        delete(context, item) {
            const db = context.state.database;
            if(item.id < 0 || !item.done) return;
            db.execSQL("DELETE FROM todoitems WHERE id = ?", [item.id])
            .then((id) => {
                if(!id) return;
                context.commit('delete', {todoItem: item});
            })
        }
    },
});


// init db
store.dispatch('init');

export default store;