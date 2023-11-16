import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  constructor(private http: HttpClient) {}
  @Output()
  sendToF = new EventEmitter<any>();

  @Input() filtros: any = {};
  @Input() url: string = '';
  @Input() columns: any;
  @Input() actions: any[] = [];
  @Input() actionsShow: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild(MatSort, { static: true }) sort: any;

  data = [];
  displayedColumns: any;
  dataSource: any = [];
  loading = false;

  sortId: string = 'id';
  sortDirection: string = 'desc';

  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  ngOnInit() {
    this.displayedColumns = this.columns.map((t: any) => t.field);
    this.getData(this.filtros);
  }

  ngAfterViewInit() {
    this.initDataSourceTable();
  }

  getData(filtros: any,pageOne = false) {
    this.loading = true;
    let filtrosString = '';
    Object.keys(filtros).forEach((el: any) => {
      filtrosString += `&${el}=${filtros[el]}`;
    });

    this.showButtonsDisable(filtros);
    if(pageOne){
      this.currentPage = 0;
    }
    let url = `${this.url}?page=${this.currentPage + 1}&pageSize=${
      this.pageSize
    }&sortId=${this.sortId}&sortDirection=${
      this.sortDirection
    }${filtrosString}`;

    this.http.get(url).subscribe((r: any) => {
      this.loading = false;
      console.log(r);
      setTimeout(() => {
        this.paginator.pageIndex = r.data.current_page - 1;
        this.paginator.length = r.data.total;
        this.dataSource.data = r.data.data;
        this.dataSource = new MatTableDataSource(r.data.data);
      });
    });
  }

  showButtonsDisable(filtros: any) {
    let actionsShow = this.actions;
    if (filtros?.estado == 'Habilitado') {
      this.actionsShow = actionsShow.filter(
        (el) => el.function != 'modalDelete' && el.function != 'modalEnable'
      );
    } else {
      this.actionsShow = actionsShow.filter(
        (el) => el.function != 'modalDisable' && el.function != 'modalEdit'
      );
    }
    console.log(filtros?.estado);
  }

  initDataSourceTable() {
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Por pág:';
    this.dataSource.paginator = this.paginator;
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getData(this.filtros);
  }

  sortData(event: any) {
    if (event.active == 'actions') {
      return;
    }
    if (!event.direction) {
      this.sortId = 'id';
      this.sortDirection = 'desc';
    } else {
      this.sortId = event.active;
      this.sortDirection = event.direction;
    }
    this.getData(this.filtros);
  }

  sendToAFather(action: any, value: any, i: any = null) {
    this.sendToF.emit({ action: action, value: value });
  }

  new() {
    this.getData(this.filtros);
  }

  update(value: any) {
    let data = this.dataSource.data;
    var index = data.findIndex((x: any) => x.id == value.id);
    data[index] = value;
    this.dataSource.data = data;
  }

  delete(value: any) {
    let data = this.dataSource.data;
    var index = data.findIndex((x: any) => x.id == value.id);
    data.splice(index, 1);
    this.dataSource.data = data;
    this.paginator.length = this.paginator.length - 1;
    this.dataSource = new MatTableDataSource(data);
  }

  formatNumber(n: number) {
    return Number(n).toFixed(2);
  }

  formatDate(d: any) {
    return moment(d).format('DD-MM-YYYY');
  }
}
