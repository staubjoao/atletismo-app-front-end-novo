import * as XLSX from 'xlsx';
import { HorarioTreinamentoDTO } from './../models/horario_treinamento_dto';
import { Component, OnInit } from '@angular/core';
import { TrainingScheduleService } from '../services/training-schedule.service';
import { EventService } from '../services/event.service';
import { ModalController, ToastController } from '@ionic/angular';
import { ExercicioDTO } from '../models/exercicio-dto';
import { TipoExercicio } from '../models/tipo-exercicio.enum';
import { Club } from '../models/club-modal';
import { ClubService } from '../services/club.service';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.page.html',
  styleUrls: ['./excel-upload.page.scss'],
})
export class ExcelUploadPage implements OnInit {
  selectedFile: File | null = null;
  eventId: number = 0;
  isUploading = false;
  clubId: number = 0;
  events: any[] = [];
  clubs: Club[] = [];
  treino: HorarioTreinamentoDTO[] = [];

  constructor(
    private modalController: ModalController,
    private trainingScheduleService: TrainingScheduleService,
    private eventService: EventService,
    private clubService: ClubService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.carregarClubes();
  }

  carregarClubes() {
    this.clubService.getAllClubs().subscribe((response) => {
      this.clubs = response;
    })
  }

  consultaEventosClube() {
    this.eventService.getAllEventsByClube(this.clubId).subscribe((response) => {
      this.events = response;
    })
  }

  dismiss() {
    this.modalController.dismiss();
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const fileContent = e.target?.result;
        if (fileContent instanceof ArrayBuffer) {
          const trainingSchedule = this.readTrainingSchedule(fileContent);
          console.log(trainingSchedule);
          this.treino = trainingSchedule;
        }
      };

      reader.readAsArrayBuffer(this.selectedFile);
    }
  }


  readTrainingSchedule(fileContent: ArrayBuffer): HorarioTreinamentoDTO[] {
    const workbook = XLSX.read(fileContent, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const schedule: HorarioTreinamentoDTO[] = [];

    for (let i = 1; i < data.length; i++) { // Começa da linha 1 para ignorar o cabeçalho
      const row = data[i];
      let date: Date | null = null;

      if (row[0]) {
        date = this.convertExcelDate(row[0]);
      }

      const exercises: ExercicioDTO[] = [];
      let exerciseIndex = 1; // Índice inicial para cada exercício do dia

      if (row[1]) {
        exercises.push(...this.createExercise(row[1], exerciseIndex++));
      }
      if (row[2]) {
        exercises.push(...this.createExercise(row[2], exerciseIndex++));
      }
      if (row[3]) {
        exercises.push(...this.createExercise(row[3], exerciseIndex++));
      }

      if (date) {
        // Converte o dia da semana, onde segunda-feira é 1 e domingo é 7
        const diaSemana = date.getDay() === 0 ? 7 : date.getDay();

        schedule.push(new HorarioTreinamentoDTO(
          diaSemana,
          date,
          exercises[0]?.descricao || '',
          exercises,
          this.eventId
        ));
      }
    }

    return schedule;
  }

  convertExcelDate(excelDate: number): Date {
    const baseDate = new Date(1899, 11, 30);
    baseDate.setDate(baseDate.getDate() + excelDate);
    return baseDate;
  }

  createExercise(description: string, index: number): ExercicioDTO[] {
    const exercises: ExercicioDTO[] = [];
    const [type, desc] = description.split(', ').map(item => item.trim());

    let repetitionsMatch: any;
    if (desc) {
      repetitionsMatch = desc.match(/^(\d+)\s*x\s*(.+)$/i);
    }

    if (repetitionsMatch) {
      const repetitions = parseInt(repetitionsMatch[1], 10);
      const actualDesc = repetitionsMatch[2];

      for (let i = 0; i < repetitions; i++) {
        exercises.push(new ExercicioDTO(
          index + i,
          actualDesc,
          this.getExerciseType(type)
        ));
      }
    } else {
      exercises.push(new ExercicioDTO(
        index,
        desc,
        this.getExerciseType(type)
      ));
    }

    return exercises;
  }

  getExerciseType(input: string): string {
    switch (input.toUpperCase()) {
      case 'AQUECIMENTO':
        return TipoExercicio.AQUECIMENTO;
      case 'TECNICA':
        return TipoExercicio.TECNICA;
      case 'ACADEMIA':
        return TipoExercicio.ACADEMIA;
      case 'DESCANSO':
        return TipoExercicio.DESCANSO;
      case 'VELOCIDADE':
        return TipoExercicio.VELOCIDADE;
      default:
        return TipoExercicio.VELOCIDADE;
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  sendTrain() {
    this.trainingScheduleService.postTreino(this.treino).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
