// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-contact-us',
//   templateUrl: './contact-us.component.html',
//   styleUrls: ['./contact-us.component.css']
// })
// export class ContactUsComponent {
//   order: any = {};

//   contactForm = new FormGroup({
//     name: new FormControl('', [Validators.required]),
//     email: new FormControl('', [Validators.required, Validators.email]),
//     message: new FormControl('', [Validators.required])
//   });
//   constructor(private http: HttpClient) {}

//   onSubmit(): void {
//     if (this.contactForm.valid) {
//       this.http.post('http://127.0.0.1:5000/contact_us', this.contactForm.value).subscribe(
//         response => alert('Message sent successfully'),
//         error => alert('Error occurred while sending message')
//       );
//     } else {
//       alert('Please fill out the form correctly.');
//     }
//   }
// }






import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required])
  });

  selectedFile: File | null = null;  // Make this nullable

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files.length > 0 ? event.target.files[0] : null;
  }

  onSubmit(): void {
    if (this.contactForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.contactForm.get('name')?.value ?? '');
      formData.append('email', this.contactForm.get('email')?.value ?? '');
      formData.append('message', this.contactForm.get('message')?.value ?? '');
      if (this.selectedFile) {
        formData.append('attachment', this.selectedFile, this.selectedFile.name);
      }

      this.http.post('http://127.0.0.1:5000/contact_us', formData).subscribe(
        response => alert('Message sent successfully'),
        error => alert('Error occurred while sending message')
      );
    } else {
      alert('Please fill out the form correctly and include an attachment if necessary.');
    }
  }
}
