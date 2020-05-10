import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    constructor(
        route: ActivatedRoute,
        private router: Router

    ){
    }

    home() {
        this.router.navigate([]);
    }
}