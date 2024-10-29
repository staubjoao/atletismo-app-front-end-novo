import { Component, OnInit } from '@angular/core';
import { TrainingScheduleService } from '../services/training-schedule.service';
import { EventService } from '../services/event.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.page.html',
  styleUrls: ['./excel-upload.page.scss'],
})
export class ExcelUploadPage implements OnInit {
  selectedFile: File | null = null;
  eventId: number | null = null;
  isUploading = false;
  clubId: number | null = null;
  events: any[] = [];

  constructor(
    private modalController: ModalController,

    private trainingScheduleService: TrainingScheduleService,
    private eventService: EventService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadClubIdAndEvents();
  }

  
  dismiss() {
    this.modalController.dismiss();
  }

  loadClubIdAndEvents() {
    const storedClubId = localStorage.getItem('clubId');
    if (storedClubId) {
      this.clubId = parseInt(storedClubId, 10);
      this.fetchEvents();
    } else {
      this.presentToast('Club ID not found in localStorage');
    }
  }

  fetchEvents() {
    if (this.clubId) {
      this.eventService.findByClubId(this.clubId).subscribe(
        (events) => {
          this.events = events;
        },
        (error) => {
          console.error('Error fetching events:', error);
          this.presentToast('Error fetching events. Please try again.');
        }
      );
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  async uploadFile() {
    if (!this.selectedFile || !this.eventId) {
      await this.presentToast('Please select a file and an event.');
      return;
    }

    this.isUploading = true;

    this.trainingScheduleService.uploadExcelFile(this.selectedFile, this.eventId)
      .subscribe(
        (response) => {
          this.isUploading = false;
          this.presentToast('File uploaded successfully!');
          console.log('Upload response:', response);
        },
        (error) => {
          this.isUploading = false;
          this.presentToast('Error uploading file. Please try again.');
          console.error('Upload error:', error);
        }
      );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}