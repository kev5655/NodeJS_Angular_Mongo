import {Component, Input} from '@angular/core';
import {Order} from "../../../shared/models/Order";

@Component({
  selector: 'order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.css']
})
export class OrderItemsListComponent {
  @Input()
  order!: Order;

}
