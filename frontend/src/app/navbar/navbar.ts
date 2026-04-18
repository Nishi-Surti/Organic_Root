import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
isMenuOpen = false;

toggleMenu()
{
  this.isMenuOpen = !this.isMenuOpen;
}

closeMenu() 
{
  this.isMenuOpen = false;
}
    // showLang = false;

selectedLang = 'EN';
showLang = false;

toggleLang() 
{
  this.showLang = !this.showLang;
}

changeLanguage(lang: string) {

  const select = document.querySelector(
    ".goog-te-combo"
  ) as HTMLSelectElement;

  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event("change"));
    this.selectedLang = lang.toUpperCase();
  }

  this.showLang = false;
}

ngAfterViewInit() {

  const interval = setInterval(() => {

    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;

    if (select) {
      clearInterval(interval);

      // When language changes manually
      select.addEventListener("change", () => {
        this.selectedLang = select.value.toUpperCase();
      });

      // Set initial language on load
      this.selectedLang = select.value.toUpperCase();
    }

  }, 500);
}

}
