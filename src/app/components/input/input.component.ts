import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent {
    harContent: string;
    constructor(
        private router: Router
    ) {

    }

    parse() {
        if (this.harContent) {
            this.parseText(this.harContent);
        }
    }

    parseText(text: string) {
        let json = JSON.parse(text);
        if (json.log && json.log.entries && json.log.entries.length > 0) {
            this.router.navigate(["/table"],
                {
                    state:
                    {
                        data: json.log.entries,
                        pageUrl: json.log.pages[0].title
                    }
                })
        }
    }

    onFileSelected() {
        const inputNode: any = document.querySelector('#file');

        if (typeof (FileReader) !== 'undefined') {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                this.parseText(e.target.result);
            };

            reader.readAsText(inputNode.files[0]);
        }
    }
}