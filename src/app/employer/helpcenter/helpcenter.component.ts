import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-helpcenter',
  templateUrl: './helpcenter.component.html',
  styleUrls: ['./helpcenter.component.css']
})
export class HelpcenterComponent implements OnInit{
  ngOnInit(): void {
    const showDialogButton = document.getElementById('showDialogButton');
    const popupDialog = document.getElementById('popupDialog');
    const closeButton = document.getElementById('closeButton');

    if (showDialogButton && popupDialog && closeButton) {
        showDialogButton.addEventListener('click', () => {
            popupDialog.style.display = 'block';
        });

        closeButton.addEventListener('click', () => {
            popupDialog.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === popupDialog) {
                popupDialog.style.display = 'none';
            }
        });
    }
}

}
