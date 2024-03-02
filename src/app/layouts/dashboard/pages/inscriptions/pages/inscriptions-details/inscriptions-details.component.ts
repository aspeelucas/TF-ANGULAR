import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InscriptionsService } from '../../inscriptions.service';
import { IInscription } from '../../models/inscription.intarface';
import { LoadingService } from '../../../../../../core/services/loading.service';

@Component({
  selector: 'app-inscriptions-details',
  templateUrl: './inscriptions-details.component.html',
  styleUrl: './inscriptions-details.component.scss',
})
export class InscriptionsDetailsComponent {
  displayedColumns: string[] = [
    'id',
    'fullName',
    'email',
    'phone',
    'course',
    'start',
    'end',
    'price',
  ];
  dataSource: IInscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private inscriptionService: InscriptionsService,
    private loadingService: LoadingService
  ) {
    this.loadingService.setLoading(true);
    this.inscriptionService
      .getInscriptionById(this.route.snapshot.params['id'])
      .subscribe({
        next: (findedInscription) => {
          console.log(findedInscription);
          if (findedInscription) {
            this.dataSource = [findedInscription];
          }
        },
        complete: () => this.loadingService.setLoading(false),
      });
  }
}
