import { Injectable } from '@angular/core';
import { Barcode, BarcodeScanner, ScanResult } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { ApiService, GameInfo, Developer, Publisher, Genre } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class QrService {
  gameInfo: GameInfo | undefined;
  lastValue: string | null = 'aaaaaaaaaaaaaaa';

  constructor(private alertController: AlertController,
    public apiService: ApiService) { }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }


    const result = await BarcodeScanner.scan();

    let value: string | null = null;

    // Handle new format with barcodes[]
    if (result && Array.isArray(result.barcodes) && result.barcodes.length > 0) {
      // You can pick displayValue or rawValue (usually both contain the decoded text/number)
      value = result.barcodes[0].rawValue || result.barcodes[0].displayValue;
    }

    if (value) {
      this.lastValue = 'detected: ' + value;

      // ✅ Detect number
      if (/^\d+$/.test(value)) {
        const gameID = parseInt(value, 10);
        this.apiService.searchGame(gameID).then((gameInfo) => {
          this.gameInfo = gameInfo;
        })
      } else {
        console.log('Detected text:', value);
      }
    } else {
      this.lastValue = 'nothing (no barcode found)';
    }

    // this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
