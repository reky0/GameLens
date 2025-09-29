import { Component, inject, OnInit, ViewChild, ElementRef } from '@angular/core';

import { FormArray, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

import { QrService } from '../services/qr.service';

import jsQR from 'jsqr';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})

export class Tab3Page implements OnInit {
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  isSupported = false;
  qrResult: string | null = null;

  constructor(public qrService: QrService, private apiService: ApiService) { }

  async onFabClick() {
    if (this.isSupported) {
      // normal qr scan for phone devices
      this.qrService.scan();
    } else {
      // file input for web version
      this.fileInput.nativeElement.value = '';
      this.fileInput.nativeElement.click();
    }
  }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  name = new FormControl('');
  private formBuilder = inject(FormBuilder);

  updateName() {
    this.name.setValue('Nancy');
  }

  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    aliases: this.formBuilder.array([this.formBuilder.control('')])
  });

  onSubmit() {
    console.warn(this.profileForm.value)
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }

  async onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const img = await this.loadImageFromFile(file);

    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d')!;

    // Scale down large images for performance
    const maxDim = 800;
    let { width, height } = img;
    if (Math.max(width, height) > maxDim) {
      const scale = maxDim / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      this.qrResult = code.data;

      const gameID = parseInt(this.qrResult, 10);
      this.apiService.searchGame(gameID).then((gameInfo) => {
        this.qrService.gameInfo = gameInfo;
      })
    } else {
      this.qrResult = 'No QR code found in this image.';
    }
  }

  private loadImageFromFile(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(err);
      };
      img.src = url;
    });
  }
}
