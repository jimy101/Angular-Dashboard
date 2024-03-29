import { Component, OnInit } from '@angular/core';
import { IOffer } from '../../interface/offer';
import { OffersService } from '../../services/offers.service';
import { ApiService } from '../../services/Api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProject } from '../../interface/project';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent {
  offers: IOffer[] | undefined = [];
  offer: IOffer | undefined;
  offerID: String = '';
  projectID: String = '';
  searchId: string = '';
  constructor(private ApiServ: ApiService, private route: ActivatedRoute) {
    this.ApiServ.getAllOffers().subscribe({
      next: (res) => {
        console.log(res);
      },
    });
    this.projectID = this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params['id']);
    this.ApiServ.getProjects().subscribe({
      next: (res) => {
        // console.log(res);
        res.data.forEach((pro) => {
          if (pro._id == this.projectID) {
            // this.offers?.push(pro.offer);
            console.log(pro);
            this.offers = [...pro.offer];
            console.log(this.offers);
          }
        });
      },
    });
  }
  showItem(item: IOffer) {
    this.offer = item;
    this.offerID = item._id;
  }
  deleteItem() {
    alert(this.offerID);
    this.ApiServ.deleteOffer(this.offerID).subscribe({
      next: (res) => {
        alert(res.message);
        location.reload();
      },
      error: (err) => {
        alert(err);
      },
    });
  }
  searchItems(id: String) {
    // for (let i = 0; i < this.offers.length; i++) {
    //   if (this.offers[i]._id == id) {
    //     this.offer = this.offers[i];
    //   } else
    //     this.offer = {
    //       _id: '',
    //       project: '',
    //       description: '',
    //       price: 0,
    //       time: 0,
    //       status: '',
    //       //   enum: ["pending", "accepted", "rejected"],
    //       file: ' ',
    //       createdBy: '',
    //       updatedBy: '',
    //     };
    // }
    // this.offer = this.offers.find((pro) => pro._id == id);
    console.log(this.offer);
  }
}
