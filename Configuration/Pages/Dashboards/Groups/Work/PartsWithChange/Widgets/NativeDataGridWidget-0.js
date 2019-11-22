(function () {
    return {
        config: {
            query: {
                code: 'List_Arrivals',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'category_name',
                    caption: 'Категория'
                },
                {
                    dataField: 'part_name',
                    caption: 'Наименование'
                },
                {
                    dataField: 'articul',
                    caption: 'Артикул'
                },
                {
                    dataField: 'manufacturer',
                    caption: 'Производитель'
                },
                {
                    dataField: 'provider',
                    caption: 'Поставщик'
                },
                {
                    dataField: 'part_price',
                    caption: 'Цена'
                },
                {
                    dataField: 'part_quantity',
                    caption: 'Кол-во'
                },
                {
                    dataField: 'sum_price',
                    caption: 'Стоимость'
                },
                {
                    caption: 'Списать',
                    type: "buttons",
                    buttons: ["edit", {
                        text: "edit",
                        icon: "arrowright",
                        hint: "Выполнить списание",
                        onClick: function (e) {
                            // Execute your command here
                        }
                    }]
                }
            ],
            keyExpr: 'articul',
            scrolling: {
                mode: 'virtual'
            },
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,
            remoteOperations: null,
            allowColumnReordering: null,
            rowAlternationEnabled: null,
            columnAutoWidth: true,
            hoverStateEnabled: true,
            columnWidth: null,
            wordWrapEnabled: true,
            allowColumnResizing: true,
            showFilterRow: true,
            showHeaderFilter: false,
            showColumnChooser: false,
            showColumnFixing: true,
            groupingAutoExpandAll: null,
        },
        init: function () {
            this.loadData(this.afterLoadDataHandler);
            // for example
            // this.subscribeToDataGridActions();
        },
        afterLoadDataHandler: function (data) {
            this.render();
        },
        subscribeToDataGridActions: function () {
            // subscribe to data list actions here
            // this.config.onEditorPreparing = this.onDataGridEditorPreparing.bind(this)
        },
        onDataGridEditorPreparing: function (e) {
            // your logic here
        }
    };
}());
