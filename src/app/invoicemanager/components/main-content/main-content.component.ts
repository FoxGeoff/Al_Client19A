import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/invoicemanager/models/invoice';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/invoicemanager/services/invoice.service';
import { InvoiceParameterService } from '../../services/invoice-parameter.service';
import { Customer } from 'src/app/customermanager/models/customer';
import { CustomerService } from 'src/app/customermanager/services/customer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  invoice: Invoice;
  id: number;
  customer: Customer;
  custId: number;

  constructor(private route: ActivatedRoute,
    private service: InvoiceService,
    private invoiceParameterService: InvoiceParameterService,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = (params['id']) || null;
      this.invoice = null;

      this.service.invoices.subscribe(invoices => {
        if (invoices.length == 0) { return; }

        setTimeout(() => {
          //from local store
          this.invoice = this.service.invoiceById(this.id);
          this.invoiceParameterService.detailedInvoice = this.invoice;

          console.log("invoice:" + this.id);
          this.custId = this.invoice.associatedCustomerId;
          console.log("Customer:" + this.custId);

          //from local store
          this.customer = this.customerService.customerById(this.custId);

        }, 500);
      });
    });
  }
}
