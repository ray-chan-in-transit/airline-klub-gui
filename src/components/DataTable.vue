<!-- eslint-disable -->
<template>
    <div>
        <table :class="tableClass">
            <thead>
                <tr>
                    <slot v-for="column in columns" :name="'table-header-' + column.field" :column="column">
                        <th :class="column.headClass" @click="toggleSort(column)" :width="column.width || ''">
                            <div class="column-controls">
                                <span>{{ column.label }}</span>
                                <span class="icon is-small" v-if="column.sortable">
                                    <i v-if="sort.column == column.field && sort.desc" class="fa fa-sort-desc"></i>
                                    <i v-else-if="sort.column == column.field && !sort.desc" class="fa fa-sort-asc"></i>
                                    <i class="fa fa-sort" v-else></i>
                                </span>
                            </div>
                        </th>
                    </slot>
                </tr>
            </thead>
            <tbody>
                <tr v-if="filterRow">
                    <td v-for="column in columns" v-if="column.filterable" :class="column.bodyClass">
                        <input type="text" class="input" :placeholder="'Filter ' + column.label" @input="filterData(column, $event.target.value.toUpperCase())">
                    </td>
                    <td v-else :class="column.bodyClass"></td>
                </tr>
                <tr v-for="row in showedRows" @click="rowClick(row)">
                    <slot name="table-body" :row="row">
                        <td v-for="column in columns" :class="column.bodyClass"> {{ row[column.field] }} </td>
                    </slot>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    //https://github.com/aislasq/vue-bulma-datatable
    export default{
        props:{
            rows: {
                type: Array,
                required: true
            },
            columns: {
                type: Array,
                required: true
            },
            tableClass: {
                type: String,
                required: false,
                default: 'table'
            },
            click: {
                required: false,
                type: Boolean,
                default: false
            }
        },
        data: function(){
            return {
                sort: {
                    column: '',
                    desc: true
                },
                filters: [],
                showedRows: []
            }
        },
        watch: {
            rows: function(){
                this.showedRows = JSON.parse(JSON.stringify(this.rows));
            }
        },
        mounted: function () {
            this.showedRows = JSON.parse(JSON.stringify(this.rows));
        },
        computed: {
            filterRow: function () {
                return this.columns.findIndex( (e) => e.filterable ) >= 0;
            }
        },
        methods:{
            rowClick: function (row) {
                if (this.click) this.$emit('row-click', row);
            },
            toggleSort: function(column){
                if(column.sortable){
                    if (column.field === this.sort.column) {
                        this.sort.desc = !this.sort.desc;
                    } else {
                        this.sort.column = column.field;
                        this.sort.desc = true;
                    }
                    this.sortData();
                }
            },
            sortData() {
                this.showedRows = this.showedRows.sort(
                    (a, b) => {
                        if(a[this.sort.column] > b[this.sort.column]){
                            return 1;
                        }
                        else if(a[this.sort.column] < b[this.sort.column]){
                            return -1;
                        }
                        return 0;
                    }
                );
                if (!this.sort.desc) {
                    this.showedRows.reverse();
                }
            },
            filterData(column, query) {
                if (column === undefined || this.rows === undefined || query === undefined) {
                    this.filters = [];
                    this.applyFilters();
                    return;
                }
                let index = this.filters.findIndex( (e) => e.field === column.field );
                if(query === ""){
                    if(index !== -1) this.filters.splice(index, 1);
                }
                else{
                    if(index >= 0 ){
                        this.filters[index].query = query;
                    }
                    else{
                        this.filters.push({field: column.field, query: query});
                    }
                }
                this.applyFilters();
            },
            applyFilters: function () {
                this.showedRows = this.rows;
                if(this.filters.length === 0) return;
                this.filteredRows = [];
                this.filters.forEach(
                    (f) =>{
                        this.filteredRows = [];
                        this.showedRows.forEach( (row) => {
                            let search = f.query.toUpperCase().trim();
                            if (row[f.field].toUpperCase().indexOf(search) !== -1) {
                                this.filteredRows.push(row);
                            }
                        });
                        this.showedRows = this.filteredRows;
                    }
                );
                this.sortData();
            }
        }
    }
</script>