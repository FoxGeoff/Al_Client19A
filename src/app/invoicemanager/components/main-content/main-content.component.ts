import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/invoicemanager/models/invoice';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/invoicemanager/services/invoice.service';
import { InvoiceParameterService } from '../../services/invoice-parameter.service';
import { Customer } from 'src/app/customermanager/models/customer';
import { CustomerService } from 'src/app/customermanager/services/customer.service';

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
      console.log("invoice:" + this.id);

      this.service.invoices.subscribe(invoices => {
        if (invoices.length == 0) { return; }

        setTimeout(() => {
          this.invoice = this.service.invoiceById(this.id);
          this.invoiceParameterService.detailedInvoice = this.invoice;
          
          //TODO: not working
          this.custId = this.invoice.associatedCustomerId;
          console.log("Customer:" + this.custId);

          this.customerService.getCustomerById(this.custId);

          if (this.customer == null)
            this.customer = this.customerService.customerById(this.custId);

          if (this.customer == null) console.log("Customer missing");

        }, 500);
      });
    });
  }
}
