import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
/*
  openAddContactDialog(): void {
    let dialogRef = this.dialog.open(NewContactDialogComponent,
      { width: '450px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dailog is closed', result);
    })
  }
  */
}
