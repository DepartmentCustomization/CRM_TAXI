(function () {
    return {
        config: {
            query: {
                code: 'CarsReport',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'number',
                    caption: 'Госномер автомобиля',
                }, {
                    dataField: 'name',
                    caption: 'Позывной',
                    alignment: 'center' 
                }, {
                    dataField: 'mark',
                    caption: 'Марка автомобиля',
                }, {
                    dataField: 'create_year',
                    caption: 'Год выпуска',
                    alignment: 'center'
                }, {
                    dataField: 'start_period_run',
                    caption: 'Пробег на начало периода',
                    alignment: 'center'
                }, {
                    dataField: 'end_period_run',
                    caption: 'Пробег на конец периода',
                    alignment: 'center'
                }, {
                    dataField: 'pediod_run',
                    caption: 'Пробег за период',
                    alignment: 'center'
                }, {
                    dataField: 'change_price',
                    caption: 'Стоимость расхода',
                    alignment: 'center'
                }
            ],
            // summary: {
            //     totalItems: [
            //         {
            //             column: "questionQty",
            //             summaryType: "sum",
            //             customizeText: function(data) {
            //                 return "Разом: " + data.value;
            //             }
            //         }
            //     ]
            // },        
            keyExpr: 'Id',
            scrolling: {
                mode: 'virtual'
            },
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
            showBorders: false,
            showColumnLines: false,
            showRowLines: true,
            remoteOperations: null,
            allowColumnReordering: null,
            rowAlternationEnabled: null,
            columnAutoWidth: null,
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
            this.dataGridInstance.height = window.innerHeight - 150;
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this);
        },
        showTopQuestionsTable: function () {
            document.getElementById('cars_report').style.display = 'block';
        },
        changeDateTimeValues: function (value) {
            let trueDate;
            if (value !== null) {
                let date = new Date(value);
                let dd = date.getDate();
                let MM = date.getMonth();
                let yyyy = date.getFullYear();
                let HH = date.getUTCHours()
                let mm = date.getMinutes();
                MM += 1;
                if ((dd.toString()).length === 1) { dd = '0' + dd; }
                if ((MM.toString()).length === 1) { MM = '0' + MM; }
                if ((HH.toString()).length === 1) { HH = '0' + HH; }
                if ((mm.toString()).length === 1) { mm = '0' + mm; }
                trueDate = dd + '.' + MM + '.' + yyyy;
            } else {
                trueDate = ' ';
            }
            return trueDate;
        },
        getFiltersParams: function (message) {

            let period = message.package.value.values.find(f => f.name === 'period').value;

            if (period !== null) {
                if (period.dateFrom !== '' && period.dateTo !== '') {
                    this.dateFrom = period.dateFrom;
                    this.dateTo = period.dateTo;

                    this.config.query.parameterValues = [
                        { key: '@dateFrom', value: this.dateFrom },
                        { key: '@dateTo', value: this.dateTo },
                    ];
                    this.loadData(this.afterLoadDataHandler);
                }
            }
        },
        extractOrgValues: function (val) {
            if (val !== '') {
                let valuesList = [];
                valuesList.push(val.value);
                return valuesList.length > 0 ? valuesList : [];
            } else {
                return [];
            };
        },
        afterLoadDataHandler: function (data) {
            this.render();
        },
        destroy: function () {
            this.sub.unsubscribe();
        },
    };
}());
